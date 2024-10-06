/** 
 * Stores data for your application.
 * 
 * There are two options for storing data, within a single Observable object 
 * accessed via ".appState", or within an ObservablesDictionary collection
 * accessed by ".observables[...]". 
*/

"use strict";

class Store {
    
    #state = null;
    appState = null;
    observables = null;

    constructor(notificationMode, notificationStatus) {        

        if (!NotificationMode.hasValue(notificationMode)) {
            notificationMode = NotificationMode.ObjectNotifyOnEmit;
        }

        if (!NotificationStatus.hasValue(notificationStatus)) {
            notificationStatus = NotificationStatus.Active;
        }

        this.#state = new ObservableCore(notificationMode, notificationStatus);
        this.#state.originatingObject = this;
        this.appState = this.#state.dataProxy;

        this.observables = new ObservablesDictionary(notificationMode);
    }

    /**
     * Emits notifications if any have been backlogged.
     */
    emitNotifications() {
        this.#state.emitNotifications();
        this.observables.emitNotifications();
    }

    enableAllNotifications() {
        this.#state.notificationStatus = NotificationStatus.Active;
        this.observables.enableAllNotifications();
    }

    disableAllNotifications() {
        this.#state.notificationStatus = NotificationStatus.Inactive;
        this.observables.disableAllNotifications();
    }
}