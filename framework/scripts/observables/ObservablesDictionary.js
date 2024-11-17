/**
 * ObservableDictionary is a name keyed list of Observables.
 * @class
 * @constructor
 */
class ObservablesDictionary {
    /**
     * @type {string}
     */
    #defaultNotificationMode;
    
    /**
     * @param {NotificationMode} defaultNotificationMode 
     */
    constructor(defaultNotificationMode) {
        this.#defaultNotificationMode = defaultNotificationMode;
    }

    /**
     * @returns {string}
     */
    get defaultNotificationMode() {
        return this.#defaultNotificationMode;
    }

    /**
     * @param {NotificationMode} val 
     */
    set defaultNotificationMode(val) {
        if (val != null) {
            this.#defaultNotificationMode = val;
        }
        else {
            this.#defaultNotificationMode = NotificationMode.Default;
        }
    }
    
    /**
     * Adds an observable to the dictionary in dictionary[name] format
     * @param {string} name 
     * @param {Observable} observable 
     */
    #addObservable(name, observable) {
        // @ts-ignore
        this[name] = observable;
    }
    
    /**
     * Gets an observable from the dictionary in dictionary[name] format
     * @param {string} name 
     * @returns {Observable}
     */
    #getObservable(name) {
        // @ts-ignore
        return this[name];
    }

    /**
     * Adds an observable to the dictionary
     * @param {string} key 
     * @returns {Observable?}
     */
    add(key) {
        if (key in this) {
            return null
        }

        let observable =  new Observable(key, this.#defaultNotificationMode);
        this.#addObservable(key, observable);

        return observable;
    }

    /**
     * Removes an observable from the dictionary
     * @param {string} key 
     * @returns {boolean}
     */
    remove(key) {
        if (!(key in this)) {
            return false
        }

        this.#getObservable(key).removeAllSubscriptions();
        
        // @ts-ignore
        delete this[key];
        
        return true;
    }

    /**
     * Emits notification for all observables, optionally forcing emission
     * @param {boolean} isForced 
     */
    emitNotifications(isForced) {
        for (var property in this) {
            if (typeof this.#getObservable(property).emitNotifications !== "undefined") {
                this.#getObservable(property).emitNotifications(isForced);
            }
            else {
                // Ignore
                Log.warn("Object in observable dictionary does not have an emitNotificationsMethod().", "DICTIONARY")
            }
        }
    }

    /**
     * Enables all notifications
     */
    enableAllNotifications() {
        for (var property in this) {
            if (typeof this.#getObservable(property).emitNotifications !== "undefined") {
                this.#getObservable(property).notificationStatus = NotificationStatus.Active;
            }
            else {
                // Ignore
                Log.error("Object in observable dictionary does not have an notificationStatus setter.", "DICTIONARY")
            }
        }
    }

    /**
     * Disables all notifications
     */
    disableAllNotifications() {
        for (var property in this) {
            if (typeof this.#getObservable(property).emitNotifications !== "undefined") {
                this.#getObservable(property).notificationStatus = NotificationStatus.Inactive;
            }
            else {
                // Ignore
                Log.error("Object in observable dictionary does not have an notificationStatus setter.", "DICTIONARY")
            }
        }
    }

    /**
     * Gets all the observable data for all observables in the dictionary as an array
     * @returns {Array<ProxyConstructor>}
     */
    toArray() {
        return Object.values(this).map(e => e.observableData);
    }
}