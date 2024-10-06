/**
 * ObservableDictionary is a name keyed list of Observables.
 */

"use strict";

class ObservablesDictionary {

    #defaultNotificationMode = null;

    constructor(defaultNotificationMode) {
        this.defaultNotificationMode = defaultNotificationMode;
    }

    get defaultNotificationMode() {
        return this.#defaultNotificationMode;
    }

    set defaultNotificationMode(val) {
        if (val != null && NotificationMode.hasValue(val)) {
            this.#defaultNotificationMode = val;
        }
        else {
            this.#defaultNotificationMode = NotificationMode.Default;
        }
    }

    add(key, obj) {
        if (key in this) {
            return null
        }

        this[key] = new Observable(key, this.#defaultNotificationMode);

        return this[key];
    }

    remove(key) {
        if (!key in this) {
            return false
        }

        this[key].removeAllSubscriptions();
        delete this[key];
    }

    emitNotifications() {
        for (var property in this) {
            try {
                this[property].emitNotifications();
            }
            catch {
                // Ignore
                console.log("Error: Object in observable dictionary does not have an emitNotificationsMethod() or the method threw an error.")
            }
        }
    }

    enableAllNotifications() {
        for (var property in this) {
            try {
                this[property].notificationStatus = NotificationStatus.Active;
            }
            catch {
                // Ignore
                console.log("Error: Object in observable dictionary does not have an notificationStatus setter or the method threw an error.")
            }
        }
    }

    disableAllNotifications() {
        for (var property in this) {
            try {
                this[property].notificationStatus = NotificationStatus.Inactive;
            }
            catch {
                // Ignore
                console.log("Error: Object in observable dictionary does not have an notificationStatus setter or the method threw an error.")
            }
        }
    }
}