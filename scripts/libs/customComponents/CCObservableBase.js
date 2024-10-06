"use strict";

class CCObservableBase extends HTMLElement {
    
    id = null;
    #state = null;
    observableData = null;
    #dataChangedCallbackExtention = null;
    #dataListnerCallbackExtention = null;

    constructor(state) {
        super();
        this.#state = state;
        this.observableData = state.dataProxy;
    }

    get dataChangedCallbackExtention() {
        return this.#dataChangedCallbackExtention;
    }

    set dataChangedCallbackExtention(val) {
        if (typeof val == 'function') {
            this.#dataChangedCallbackExtention = val;
        }
        else if (isEmptyOrNull(val)) {
            this.#dataChangedCallbackExtention = null;
        }
    }

    get dataListnerCallbackExtention() {
        return this.#dataListnerCallbackExtention;
    }

    set dataListnerCallbackExtention(val) {
        if (typeof val == 'function') {
            this.#dataListnerCallbackExtention = val;
        }
        else if (isEmptyOrNull(val)) {
            this.#dataListnerCallbackExtention = null;
        }
    }

    get subscribers() {
        return this.#state.subscribers;
    }

    get subscriptionsTo() {
        return this.#state.subscriptionsTo;
    }
    
    get notificationStatus() {
        return this.#state.notificationStatus
    }

    set notificationStatus(val) {
        this.#state.notificationStatus = val;
    }

    addSubscriber(obj, callbackToAdd) {
        this.#state.addSubscriber(obj, callbackToAdd);
    }

    subscribeTo(obj, callbackToAdd) {
        this.#state.subscribeTo(obj, callbackToAdd);
    }

    removeSubscriber(obj) {
        this.#state.removeSubscriber(obj);
    }

    unsubscribeFrom(obj) {
        this.#state.unsubscribeFrom(obj);
    }

    removeAllSubscriptions() {
        this.#state.removeAllSubscriptions();
    }
}
