/** 
 * Action represents a payload that can be dispatched by the Dispatcher
*/

"use strict";

class Action {
    type = null;
    payload = null;

    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
}
