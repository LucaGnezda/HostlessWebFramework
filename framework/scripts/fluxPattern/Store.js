/**
 * Stores data for your application.
 *
 * There are two options for storing data, within a single Observable object
 * accessed via ".appState", or within an ObservablesDictionary collection
 * accessed by ".observables[...]".
 *
 * @class
 * @public
 * @constructor
 */
class Store {
    /**
     * @type {ObservableCore}
     */
    #appstate;

    /**
     * @type {AnyDictionary}
     */
    appState;

    /**
     * @type {Array<string>}
     */
    #dictionaries = [];

    /**
     * @param {NotificationMode} notificationMode
     * @param {NotificationStatus} notificationStatus
     * @this {Store}
     */
    constructor(notificationMode, notificationStatus) {
        notificationMode = NotificationMode.ObjectNotifyOnEmit;
        notificationStatus = NotificationStatus.Active;

        this.#appstate = new ObservableCore(notificationMode, notificationStatus);
        this.#appstate.originatingObject = this;
        this.appState = this.#appstate.dataProxy;
    }

    /**
     * Adds an {@link ObservablesDictionary} to the store
     * @param {string} name
     * @returns {ObservablesDictionary?}
     */
    addObservablesDictionary(name) {
        if (name in this) {
            return null
        }

        if (!this.#appstate) {
            return null;
        }

        let dict = new ObservablesDictionary(this.#appstate.notificationMode);

        this.#addObservablesDictionary(name, dict)
        this.#dictionaries.push(name);

        return dict;
    }

    /**
     * Adds a dictionary to the store in store[name] format
     * @param {string} name
     * @param {ObservablesDictionary} dictionary
     */
    #addObservablesDictionary(name, dictionary) {
        // @ts-ignore
        this[name] = dictionary;
    }

    /**
     * Adds an {@link Observable} to the store
     * @param {string} name
     * @returns {Observable?}
     */
    addObservable(name) {
        if (name in this) {
            return null
        }

        if (!this.#appstate) {
            return null;
        }

        let observable = new Observable(name, this.#appstate.notificationMode);

        this.#addObservable(name, observable)
        this.#dictionaries.push(name);

        return observable;
    }

    /**
     * Adds an observable to the store in store[name] fromat
     * @param {string} name
     * @param {Observable} observable
     */
    #addObservable(name, observable) {
        // @ts-ignore
        this[name] = observable;
    }

    /**
     * Gets an observable or observables dictionary from the store by name
     * @param {string} name
     * @returns {Observable|ObservablesDictionary}
     */
    #getFromStore(name) {
        // @ts-ignore
        return this[name]
    }

    /**
     * Emits notifications if any have been backlogged.
     * @param {boolean} isforced
     */
    emitNotifications(isforced) {
        if (this.#appstate) {
            this.#appstate.emitNotifications(isforced);
        }
        this.#dictionaries.forEach(dName => this.#getFromStore(dName).emitNotifications(isforced));
    }

    /**
     * Enables notificions for all observables
     */
    enableAllNotifications() {
        if (this.#appstate) {
            this.#appstate.notificationStatus = NotificationStatus.Active;
        }
        this.#dictionaries.map((name) => {
            let d = this.#getFromStore(name);
            if (d instanceof ObservablesDictionary) return d;
        }).forEach(d => d && d.enableAllNotifications());
    }

    /**
     * Disables notifications for all observables
     */
    disableAllNotifications() {
        if (this.#appstate) {
            this.#appstate.notificationStatus = NotificationStatus.Inactive;
        }
        this.#dictionaries.map((name) => {
            let d = this.#getFromStore(name);
            if (d instanceof ObservablesDictionary) return d;
        }).forEach(d => d && d.disableAllNotifications());
    }
}
