export default class EventManager {
  constructor() {
    this.delegatedEvents = {};
  }

  delegateEvent(selector, event, handler) {
    if (!this.delegatedEvents[event]) {
      this.delegatedEvents[event] = [];
      document.body.addEventListener(event, (e) => {
        this.delegatedEvents[event].forEach(({ selector, handler }) => {
          if (e.target.closest(selector)) {
            handler(e);
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
    for (const event in this.delegatedEvents) {
      this.delegatedEvents[event] = [];
    }
  }
}
