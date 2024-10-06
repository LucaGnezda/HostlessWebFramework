"use strict";

class Listner {

    id = null;

    listenerCallback(obj, e) {
        console.log(`Yay! I heard you, thanks for letting me know. Component ${obj.constructor.name} with id:${obj.id} updated property ${e.path} from ${e.oldValue} to ${e.newValue}`);
    } 

}
