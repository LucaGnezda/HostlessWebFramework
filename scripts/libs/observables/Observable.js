/** 
 * Observable is a usable object that wraps ObservableCore, exposing its
 * proxy as .observableData, as well as key subscription methods. It is 
 * used by the ObservablesDictionary.
*/
"use strict";

class Observable {
    
    id = null;
    #state = null;
    observableData = null;

    constructor(id, notificationMode) {
        this.#state = new ObservableCore(notificationMode, NotificationStatus.Active);
        this.id = id;
        this.#state.originatingObject = this;
        this.observableData = this.#state.dataProxy;
    }

    get notificationMode() {
        return this.#state.notificationMode;
    }

    set notificationMode(val) {
        this.#state.notificationMode = val;
    }

    get notificationStatus() {
        return this.#state.notificationStatus;
    }

    set notificationStatus(val) {
        if (val != null && NotificationStatus.hasValue(val)) {
            this.#state.notificationStatus = val;
        }
        else {
            this.#state.notificationStatus = NotificationStatus.Default;
        }
    }

    get subscribers() {
        return this.#state.subscribers;
    }

    get subscriptionsTo() {
        return this.#state.subscriptionsTo;
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

    emitNotifications() {
        this.#state.emitNotifications();
    }
}