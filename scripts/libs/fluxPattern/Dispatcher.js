/** 
 * Dispatcher dispatches an action to all registered handlers.
*/

"use strict";

class Dispatcher {

    #registeredHandlers = [];

    /**
     * Returns the list of currently registered handlers
     */
    get registeredHandlers() {
        return this.#registeredHandlers;
    }

    /**
     * Dispatches an action to all registered handlers.
     */
    dispatch(action) {

        if (action.constructor.name != Action.name) {
            console.log("Error: parameter provided is not an Action. Ignoring request.");
            return;
        }
        
        console.log(`DISPATCHER: Dispatching action ${action.type} with payload ${action.payload}`)
        this.#registeredHandlers.map(e => e.handler[e.actionRouterName](action));
    }

    /**
     * Adds a handlers to the list of registered handlers.
     * 
     * Note: Only one of each type of handler can be added, as determined by its class name.
     */
    addDispatchHandler(obj, actionRouterName) {

        if (typeof obj != "object") {
            console.log("Error: Hander must be an object. Unable to register");
            return;
        }

        if (isEmptyOrNull(actionRouterName)) {
            console.log("Error: No routing method provided. Unable to register");
            return;
        }

        if (obj[actionRouterName] == null) {
            console.log("Error: Routing method does not exist. Unable to register");
            return;
        }

        if (typeof obj[actionRouterName] != "function") {
            console.log("Error: Routing target is not a method. Unable to register");
            return;
        }
        
        if (this.#registeredHandlers.findIndex(e => e.handler.constructor.name == obj.constructor.name) == -1) {
            this.#registeredHandlers.push({handler:obj, actionRouterName: actionRouterName});
        }
    }

    /**
     * returns a dispatcher callback that passes a payload based on callback arguments.
     */
    newArgsDispatchCallback(actionType, bundleArgumentsAs) {

        return function() {

            Log.debug(`Dispatch callback for Event ${actionType}`, "EVENT CALLBACK");
    
            let payload = {};

            for (let i = 0; i < bundleArgumentsAs.length; i++) {
                payload[bundleArgumentsAs[i]] = arguments[i];
            }
            
            App.dispatcher.dispatch(new Action(actionType, payload));

        }
    }

    /**
     * returns a dispatcher callback that passes an event as its payload.
     * stopPropagationIfDispatched is a boolean that will stop propogfation if dispatched
     * dispatchIf is a function that is expected to consume an event and returns true or false to determine if a dispatch should occur
     */
    newEventDispatchCallback(actionType, stopPropagationIfDispatched, dispatchIf) {

        return function() {

            Log.debug(`Dispatch callback for Event ${actionType}`, "EVENT CALLBACK");
        
            let event = arguments[0];

            // Check the dispatch condition if supplied
            if (dispatchIf == null || dispatchIf(event)) {

                // stopProp
                if (stopPropagationIfDispatched) {
                    event.stopPropagation = true;
                }

                App.dispatcher.dispatch(new Action(actionType, event));

            }
        }
    }

    /**
     * Removes a handlers to the list of registered handlers.
     * 
     * Note: Removes by matching the class name of the supplied object or class defintiion
     */
    removeDispatchHandler(obj) {

        if (this.#registeredHandlers.findIndex(e => (e.handler.constructor.name == obj.constructor.name || e.handler.constructor.name == obj.name)) > -1) {
            this.#registeredHandlers = this.#registeredHandlers.filter(e => e.handler != obj);
        }
    }
}
