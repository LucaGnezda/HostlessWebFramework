/** 
 * ObservableCore is a object that is intended to be used within another
 * object, such as a component or Observable. It's purpose is to provide
 * and object that triggers change callbacks through use of a proxy.
 * 
 * NOTE: the typings in this file are ... Proxies and getters and setters
 * on what is essentially an any type (an observable) are prrety weak.
 * 
 * @class
 * @public
 * @constructor
*/
class ObservableCore {
    /**
     * @type {*}
     */
    #originatingObject;
    
    /**
     * @type {Array<*>}
     */
    #subscribers = [];
    
    /**
     * @type {Array<*>}
     */
    #subscriptionsTo = [];
    
    /**
     * @type {NotificationMode}
     */
    #notificationMode = NotificationMode.Default;
    
    /**
     * @type {NotificationStatus}
     */
    #notificationStatus = NotificationStatus.NotStarted;
    
    /**
     * @type {boolean}
     */
    #pendingNotification = false;
    
    /**
     * @type {AnyDictionary}
     */
    data;

    /**
     * @type {AnyDictionary}
     */
    dataProxy;

    /**
     * @param {NotificationMode?} notificationMode 
     * @param {NotificationStatus?} notificationStatus 
     */
    constructor(notificationMode = null, notificationStatus = null) {
        let self = this;
        this.#originatingObject = this;
        this.data = {};

        if (notificationMode) {
            this.#notificationMode = notificationMode;
        }

        if (notificationStatus) {
            this.#notificationStatus = notificationStatus;
        }

        /**
         * @param {Array<*>} path 
         * @returns {*}
         */
        let handler = (path = []) => ({
            /**
             * @param {*} target 
             * @param {*} property 
             * @param {*} reciever 
             * @returns {*}
             */
            get(target, property, reciever) {
                if (typeof property === 'symbol'){
                    Log.trace(`Proxied Get. Getting ${target.constructor.name}.UnknownSymbol`, "PROXY");
                }
                else {
                    Log.trace(`Proxied Get. Getting ${target.constructor.name}.${property}`, "PROXY");
                }

                // return from subproxies if they already exist, otherwise create then the target property is an object and not yet a proxy.
                if (property === '_isProxy') {
                    return true;
                }
                // or if its an object without a proxy, create one
                else if (target[property] != null && typeof target[property] === 'object' && !target[property]._isProxy) {
                    Log.debug(`Sub object proxy created for ${target[property].constructor.name} in parent object ${self.originatingObject.constructor.name}`, "PROXY");
                    target[property] = new Proxy(target[property], handler(path.concat(property)));
                }
                
                // or return the data. Use reflect to ensure the get works correctly in all use cases.
                return Reflect.get(target, property, reciever);
            },

            /**
             * @param {*} target 
             * @param {*} property 
             * @param {*} newValue 
             * @param {*} reciever 
             * @returns {*}
             */
            set(target, property, newValue, reciever) {
                Log.debug(`(${self.#originatingObject.constructor.name}.ObservableData): Proxied Set. Update observed for ${target.constructor.name}.${property} from ${target[property]} to ${newValue}`, "PROXY");

                let oldValue = target[property];

                let newValueJSON = JSONstringifyOrder(newValue);
                
                // compare the sorted json strings of the old and new structure, if we're making no change, then just return. Sorting is essential in the comparison to avoid misinterpreting differing property orders as different objects.
                if (newValueJSON == JSONstringifyOrder(target[property])) {
                    Log.debug(`  No change event required`, "PROXY");
                    return true;
                }

                // Note: I'm stripping back to base objects when setting.  Because it's too hard to reliably strip proxies from objects and their entire children tree.
                // Stripping achives three things:
                //  - We know we're working with data sttuctures only, not smart objects.
                //  - We can't accidently form proxies around proxies, or absorb proxies from other things, especially for nested objects
                //  - Behaviour will be consistent and predictable across proxies, arrays and objects.
                // Its a reasonable solution considering these are supposed to be simple data structures anyway.
                if (newValue != null) {
                    newValue = JSON.parse(newValueJSON);
                }
                
                let result = Reflect.set(target, property, newValue, reciever);
                
                if (self.#notificationStatus == NotificationStatus.Active && self.subscribers.length > 0 && newValue != oldValue) {
                    switch(self.notificationMode){
                        case NotificationMode.PropertyNotifyOnChange:
                            
                            let event = new ObservableDataEvent(
                                NotificationMode.PropertyNotifyOnChange,
                                self.#originatingObject,
                                path.concat(property),
                                oldValue,
                                newValue,
                            );

                            Log.debug(`Propagating change event to subscribers`, "PROXY");
                            self.subscribers.map(obj => obj.callback(event));
                            break;

                        case NotificationMode.ObjectNotifyOnEmit:
                            Log.debug(`Backlog change event for later propagation.`, "PROXY");
                            self.notificationRequired();
                            break;

                        default:
                            // Shouldn't be here!!!!
                            Log.debug("Error: Invalid NotificationMode", "PROXY")
                    }
                }
                
                return result
            },
        });

        Log.debug(`Object proxy created for ${this.data.constructor.name} in parent object ${self.#originatingObject.constructor.name}`, "PROXY");
        this.dataProxy = new Proxy(this.data, handler());
    }

    get originatingObject() {
        return this.#originatingObject;
    }

    set originatingObject(val) {
        Log.debug(`${this.dataProxy?.constructor.name} in ${this.constructor.name} assigned to parent ${val.constructor.name}`, "PROXY")
        this.#originatingObject = val;
    }

    get subscribers() {
        return this.#subscribers;
    }

    get subscriptionsTo() {
        return this.#subscriptionsTo;
    }

    get notificationMode() {
        return this.#notificationMode;
    }

    set notificationMode(val) {
        if (val != null) {
            this.#notificationMode = val;
        }
        else {
            this.#notificationMode = NotificationMode.Default;
        }
    }

    get notificationStatus() {
        return this.#notificationStatus;
    }

    set notificationStatus(val) {
        if (val != null) {
            this.#notificationStatus = val;
        }
        else {
            this.#notificationStatus = NotificationStatus.Default;
        }
    }

    /**
     * Adds a subscriber to the observable
     * @param {*} obj 
     * @param {ObservableCallback} callbackToAdd
     * @returns {void}
     */
    addSubscriber(obj, callbackToAdd) {
        if (this.#subscribers.find(e => e.subscriber == obj)) {
            return;
        }

        this.#subscribers.push({subscriber: obj, callback: callbackToAdd.bind(obj)});

        if (typeof obj.subscribeTo === 'function') {
            obj.subscribeTo(this.originatingObject, callbackToAdd);
        }
    }

    /**
     * Adds a subscription to the observable
     * @param {*} obj 
     * @param {ObservableCallback} callbackToAdd 
     * @returns {void}
     */
    subscribeTo(obj, callbackToAdd) {
        if (typeof obj.addSubscriber != 'function' || this.#subscriptionsTo.includes(obj)) {
            return;
        }

        this.#subscriptionsTo.push(obj);
        obj.addSubscriber(this.originatingObject, callbackToAdd);
    }

    /**
     * Removes a subscriber from the observable
     * @param {*} obj 
     * @returns {void}
     */
    removeSubscriber(obj) {
        if (!this.#subscribers.find(e => e.subscriber == obj)) {
            return;
        }

        this.#subscribers = this.#subscribers.filter(e => e.subscriber != obj);
        
        if (typeof obj.unsubscribeFrom === 'function') {
            obj.unsubscribeFrom(this.originatingObject);
        }
    }

    /**
     * Removes a subscription from the observable
     * @param {*} obj 
     * @returns {void}
     */
    unsubscribeFrom(obj) {
        if (typeof obj.removeSubscriber != 'function' || !this.#subscriptionsTo.includes(obj)) {
            return;
        }

        this.#subscriptionsTo = this.#subscriptionsTo.filter(e => e != obj);
        obj.removeSubscriber(this.originatingObject);
    }

    /**
     * Removes all subscriptions from the observable
     * @returns {void}
     */
    removeAllSubscriptions() {
        this.#subscribers.map(obj => this.removeSubscriber(obj.subscriber));
        this.#subscriptionsTo.map(obj => this.unsubscribeFrom(obj));
    }

    /**
     * Mark the observable as notification pending
     */
    notificationRequired() {
        this.#pendingNotification = true;
    }

    /**
     * Emits notifications for the observable
     * @param {boolean} isforced 
     */
    emitNotifications(isforced) {
        if (this.#pendingNotification || isforced) {

            this.#pendingNotification = false;

            Log.debug(`Emitting notifications in ${this.constructor.name} for ${this.originatingObject.constructor.name}`, "STORE");

            // TODO: work out if this is reasonable? Should there be nulls here?
            let event = new ObservableDataEvent(
                NotificationMode.ObjectNotifyOnEmit,
                this.originatingObject,
                null,
                null,
                null,
            );

            if (typeof isforced == "string") {  
                // If a string was provided, use it as a key to target the recipient by id
                this.#subscribers.map(obj => obj.subscriber.id == isforced ? obj.callback(event) : null);
            }
            else if (typeof isforced == "object") {
                // If an object was provided, use it as a key to target the recipient
                this.#subscribers.map(obj => obj.subscriber == isforced ? obj.callback(event) : null);
            }
            else { 
                // Otherwise notify everyone
                this.#subscribers.map(obj => obj.callback(event));
            }
        }
    }
}