const html = require('choo/html');

const REPORTABLES = ['malware', 'pii', 'abuse', 'copyright'];

module.exports = function(state, emit) {
  state.modal = null;
  return html`
    <main class="main">
      <section
        class="relative h-full w-full p-6 md:p-8 md:rounded-xl md:shadow-big"
      >
        <div
          class="flex flex-col w-full max-w-sm h-full mx-auto items-center justify-center"
        >
          <h1 class="text-xl font-bold mb-4">
            ${state.translate('reportFile')}
          </h1>
          <p class="mb-4 leading-normal font-semibold">
            Help us understand what's going on. What do you think is wrong with
            these files?
          </p>
          ${renderReportables()}
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

  function renderReportables() {
    const inputs = REPORTABLES.map(
      reportable =>
        html`
          <li class="mb-2 leading-normal">
            <label for="${reportable}" class="flex">
              <input
                type="radio"
                name="report"
                id="${reportable}"
                class="mr-2"
              />
              ${state.translate(
                `reportReason${reportable.charAt(0).toUpperCase() +
                  reportable.slice(1)}`
              )}
            </label>
          </li>
        `
    );
    return html`
      <form>
        <ul class="list-none p-4 mb-6 bg-grey-20 rounded-sm">
          ${inputs}
        </ul>
      </form>
    `;
  }

  function report(event) {
    event.stopPropagation();
    emit('report', { reason: 'test' });
  }
};
