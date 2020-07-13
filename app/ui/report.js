const html = require('choo/html');

module.exports = function(state, emit) {
  state.modal = null;
  return html`
    <main class="main">
      <section
        class="relative h-full w-full p-6 md:p-8 md:rounded-xl md:shadow-big"
      >
        <div
          class="flex flex-col w-full max-w-md h-full mx-auto items-center justify-center"
        >
          <h1 class="text-xl font-bold mb-4">
            ${state.translate('reportFile')}
          </h1>
          <button
            class="btn rounded-lg w-full flex-shrink-0 focus:outline"
            onclick="${report}"
            title="${state.translate('reportButton')}"
          >
            ${state.translate('reportButton')}
          </button>
        </div>
      </section>
    </main>
  `;

  function report(event) {
    event.stopPropagation();
    emit('report', { reason: 'test' });
  }
};
