"use strict";

class AppActionHandler {

    route(action) {

        console.log(`HANDLER: Handler processing event ${action.type}`);

        switch (action.type) {

            case "CCLabel_DataChange":
                store.observables[action.payload.originatingObject.id].observableData.value = action.payload.originatingObject.observableData.value;
                store.observables.emitNotifications();
                break;

            case "CCButton_Click":
                store.observables[component.id].observableData.value = store.observables[component.id].observableData.value + " +Click";
                store.observables.emitNotifications();
                break;
            
            default:
                // do nothing

        }
    }

}
