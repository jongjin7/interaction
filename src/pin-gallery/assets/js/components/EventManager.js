export default class EventManager {
  constructor() {
    this.delegatedEvents = {};
  }

  delegateEvent(selector, event, handler) {
    if (!this.delegatedEvents[event]) {
      this.delegatedEvents[event] = [];
      document.body.addEventListener(event, (e) => {
        this.delegatedEvents[event].forEach(({ deselector, dehandler }) => {
          if (e.target.closest(deselector)) {
            dehandler(e);
          }
        });
      });
    }
    this.delegatedEvents[event].push({ selector, handler });
  }

  removeDelegatedEvent(selector, event, handler) {
    if (this.delegatedEvents[event]) {
      this.delegatedEvents[event] = this.delegatedEvents[event].filter(
        (delegate) => delegate.selector !== selector || delegate.handler !== handler,
      );
    }
  }

  removeAllDelegatedEvents() {
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const event in this.delegatedEvents) {
      this.delegatedEvents[event] = [];
    }
  }
}
