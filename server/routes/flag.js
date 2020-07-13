const storage = require('../storage');
const Keychain = require('../keychain');

module.exports = async function(req, res) {
  try {
    const id = req.params.id;
    const meta = await storage.metadata(id);
    if (meta.flagged) {
      return res.sendStatus(200);
    }
    try {
      const key = req.body.key;
      const keychain = new Keychain(key);
      const metadata = await keychain.decryptMetadata(
        Buffer.from(meta.metadata, 'base64')
      );
      if (metadata.manifest) {
        storage.flag(id, key);
        return res.sendStatus(200);
      }
      res.sendStatus(400);
    } catch (e) {
      console.error(e);
      res.sendStatus(400);
    }
  } catch (e) {
    res.sendStatus(404);
  }
};
