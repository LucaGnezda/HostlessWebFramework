/** 
 * ObservableCore is a object that is intended to be used within another
 * object, such as a component or Observable. It's purpose is to provide
 * and object that triggers change callbacks through use of a proxy.
*/
"use strict";

class ObservableCore {
    
    #originatingObject = null;
    data = null;
    dataProxy = null;
    #subscribers = [];
    #subscriptionsTo = [];
    #notificationMode = NotificationMode.Default;
    #notificationStatus = NotificationStatus.NotStarted;
    #pendingNotification = false;

    constructor(notificationMode, notificationStatus) {

        let self = this;
        this.#originatingObject = this;
        this.data = new ObservableData();

        if (!isEmptyOrNull(notificationMode) && NotificationMode.hasValue(notificationMode)) {
            this.#notificationMode = notificationMode;
        }

        if (!isEmptyOrNull(notificationStatus)  && NotificationStatus.hasValue(notificationStatus)) {
            this.#notificationStatus = notificationStatus;
        }

        let handler = (path = []) => ({
            get(target, property, reciever) {
                //console.log(`Proxied Get.`);

                if (typeof property === 'symbol'){
                    //console.log(`Proxied Get. Getting ${target.constructor.name}.UnknownSymbol`);
                }
                else {
                    //console.log(`Proxied Get. Getting ${target.constructor.name}.${property}`);
                }

                // return from subproxies if already existing, or create then the target property is an object and not yet a proxy.
                if (property === '_isProxy') {
                    return true;
                }
                else if (typeof target[property] === 'object' && !target[property]._isProxy) {
                    console.log(`Sub object proxy created for ${target[property].constructor.name} in parent object ${self.originatingObject.constructor.name}`)
                    target[property] = new Proxy(target[property], handler(path.concat(property)));
                }
                
                // use reflect to ensure the get works correctly in all use cases.
                return Reflect.get(target, property, reciever);
            },

            set(target, property, newValue, reciever) {
                
                console.log(`PROXY(${self.#originatingObject.constructor.name}.ObservableData): Proxied Set. Update observed for ${target.constructor.name}.${property} from ${target[property]} to ${newValue}`);

                let oldValue = target[property];

                let newValueJSON = JSONstringifyOrder(newValue);
                
                // compare the sorted json strings of the old and new structure, if we're making no change, then just return. Sorting is essential in the comparison to avoid misinterpreting differing property orders as different objects.
                if (newValueJSON == JSONstringifyOrder(target[property])) {
                    console.log(`  No change event required`);
                    return true;
                }

                // Note: I'm stripping back to base objects when setting.  Because it's too hard to reliably strip proxies from objects and their entire children tree.
                // Stripping achives three things:
                //  - We know we're working with data sttuctures only, not smart objects.
                //  - We can't accidently form proxies around proxies, or absorb proxies from other things, especially for nested objects
                //  - Behaviour will be consistent and predictable across proxies, arrays and objects.
                // Its a reasonable solution considering these are supposed to be simple data structures anyway.
                newValue = JSON.parse(newValueJSON);

                let result = Reflect.set(target, property, newValue, reciever);
                
                if (self.#notificationStatus == NotificationStatus.Active && self.subscribers.length > 0 && newValue != oldValue) {
                    switch(self.notificationMode){
                        case NotificationMode.PropertyNotifyOnChange:
                            
                            let event = new ObservableDataEvent();
                            event.notificationMode = NotificationMode.PropertyNotifyOnChange;
                            event.originatingObject = self.#originatingObject;
                            event.path = path.concat(property);
                            event.oldValue = oldValue;
                            event.newValue = newValue;

                            console.log(`  Propagating change event to subscribers`);
                            self.subscribers.map(obj => obj.callback(event));
                            break;

                        case NotificationMode.ObjectNotifyOnEmit:
                            console.log(`  Backlog change event for later propagation.`);
                            self.notificationRequired();
                            break;

                        default:
                            // Shouldn't be here!!!!
                            console.log("Error: Invalid NotificationMode")

                    }
                }
                
                return result
            },
        });

        console.log(`Object proxy created for ${this.data.constructor.name} in parent object ${self.#originatingObject.constructor.name}`)
        self.dataProxy = new Proxy(this.data, handler());

    }

    get originatingObject() {
        return this.#originatingObject;
    }

    set originatingObject(val) {
        console.log(`${this.dataProxy.constructor.name} in ${this.constructor.name} assigned to parent ${val.constructor.name}`)
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
        if (val != null && NotificationMode.hasValue(val)) {
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
        if (val != null && NotificationStatus.hasValue(val)) {
            this.#notificationStatus = val;
        }
        else {
            this.#notificationStatus = NotificationStatus.Default;
        }
    }

    addSubscriber(obj, callbackToAdd) {
        
        if (this.#subscribers.find(e => e.subscriber == obj)) {
            return;
        }

        this.#subscribers.push({subscriber: obj, callback: callbackToAdd.bind(obj)});

        if (typeof obj.subscribeTo === 'function') {
            obj.subscribeTo(this.originatingObject, callbackToAdd);
        }
    }

    subscribeTo(obj, callbackToAdd) {

        if (typeof obj.addSubscriber != 'function' || this.#subscriptionsTo.includes(obj)) {
            return;
        }

        this.#subscriptionsTo.push(obj);
        obj.addSubscriber(this.originatingObject, callbackToAdd);
    
    }

    removeSubscriber(obj) {

        if (!this.#subscribers.find(e => e.subscriber == obj)) {
            return;
        }

        this.#subscribers = this.#subscribers.filter(e => e.subscriber != obj);
        
        if (typeof obj.unsubscribeFrom === 'function') {
            obj.unsubscribeFrom(this.originatingObject);
        }
    }

    unsubscribeFrom(obj) {

        if (typeof obj.removeSubscriber != 'function' || !this.#subscriptionsTo.includes(obj)) {
            return;
        }

        this.#subscriptionsTo = this.#subscriptionsTo.filter(e => e != obj);
        obj.removeSubscriber(this.originatingObject);

    }

    removeAllSubscriptions() {
        this.#subscribers.map(obj => this.removeSubscriber(obj.subscriber));
        this.#subscriptionsTo.map(obj => this.unsubscribeFrom(obj));
    }

    notificationRequired() {
        this.#pendingNotification = true;
    }

    emitNotifications() {
        if (this.#pendingNotification) {

            this.#pendingNotification = false;

            console.log(`STORE: Emitting notifications in ${this.constructor.name} for ${this.originatingObject.constructor.name}`);

            let event = new ObservableDataEvent();
            event.notificationMode = NotificationMode.ObjectNotifyOnEmit;
            event.originatingObject = this.originatingObject;
            event.path = null;
            event.oldValue = null;
            event.newValue = null;

            this.#subscribers.map(obj => obj.callback(event));
        }
        
    }
}