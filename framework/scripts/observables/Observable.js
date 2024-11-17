/**
 * Observable is a usable object that wraps ObservableCore, exposing its
 * proxy as .observableData, as well as key subscription methods. It is
 * used by the ObservablesDictionary.
 * @class
 * @public
 * @constructor
*/
class Observable {
    /**
     * @type {ObservableCore}
     */
    #state;

    /**
     * @memberof Observable
     * @type {string}
     */
    id;

    /**
     * @memberof Observable
     * @type {AnyDictionary}
     */
    observableData;

    /**
     * @param {string} id
     * @param {NotificationMode} notificationMode
     */
    constructor(id, notificationMode) {
        this.#state = new ObservableCore(notificationMode, NotificationStatus.Active);
        this.id = id;
        this.#state.originatingObject = this;
        this.observableData = this.#state.dataProxy;
    }

    /**
     * @returns {NotificationMode?}
     */
    get notificationMode() {
        return this.#state.notificationMode;
    }

    /**
     * @param {NotificationMode} val
     */
    set notificationMode(val) {
        this.#state.notificationMode = val;
    }

    /**
     * @returns {NotificationStatus?}
     */
    get notificationStatus() {
        return this.#state.notificationStatus;
    }

    /**
     * @param {NotificationStatus} val
     */
    set notificationStatus(val) {
        if (val != null) {
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

    /**
     * Adds a subscriber to the observable
     * @param {*} obj
     * @param {ObservableCallback} callbackToAdd
     * @returns {void}
     */
    addSubscriber(obj, callbackToAdd) {
        this.#state.addSubscriber(obj, callbackToAdd);
    }

    /**
     * Adds a subscription to the observable
     * @param {*} obj
     * @param {ObservableCallback} callbackToAdd
     * @returns {void}
     */
    subscribeTo(obj, callbackToAdd) {
        this.#state.subscribeTo(obj, callbackToAdd);
    }

    /**
     * Removes a subscriber from the observable
     * @param {*} obj
     * @returns {void}
     */
    removeSubscriber(obj) {
        this.#state.removeSubscriber(obj);
    }

    /**
     * Removes a subscription from the observable
     * @param {*} obj
     * @returns {void}
     */
    unsubscribeFrom(obj) {
        this.#state.unsubscribeFrom(obj);
    }

    /**
     * Removes all subscriptions from the observable
     * @returns {void}
     */
    removeAllSubscriptions() {
        this.#state.removeAllSubscriptions();
    }

    /**
     * Emits notifications for the observable
     * @param {boolean} force
     * @returns {void}
     */
    emitNotifications(force) {
        this.#state.emitNotifications(force);
    }
}
