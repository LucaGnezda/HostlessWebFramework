"use strict";

let listner = null;
let component = null;
let store = null;
let dispatcher = null;

class StartupController {

    static initialise() {
        console.log("StartupController.initialise.begin");

        ComponentRegistry.registerComponents();

        dispatcher = new Dispatcher();
        dispatcher.addDispatchHandler(new AppActionHandler(), "route");

        //listner = new Listner();
        //listner.id = "Foo";
     
        let ccLabelDataChangedCallback = function(event) {
            console.log(`EXTENSION METHOD: Component Data Change Callback Extension`);
            dispatcher.dispatch(new Action("CCLabel_DataChange", event));
        }

        let ccLabelDataListenerCallback = function(event) {
            console.log(`EXTENSION METHOD: Component Data Listener Callback Extension`);
            for (let [key, value] of Object.entries(this.observableData)) {
                if (event.originatingObject.observableData.hasOwnProperty(key)) {
                    this.observableData[key] = event.originatingObject.observableData[key];
                }                 
            }
        }

        let ccButtonClickCallback = function(event) {
            console.log(`EXTENSION METHOD: Component Button Click Callback Extension`);
            dispatcher.dispatch(new Action("CCButton_Click", event));
        }

        component = document.createElement("cc-label");
        component.observableData.label = "Label: ";
        component.dataChangedCallbackExtention = ccLabelDataChangedCallback;
        component.dataListnerCallbackExtention = ccLabelDataListenerCallback;

        let button = document.createElement("cc-button");
        button.clickCallbackExtention = ccButtonClickCallback;

        store = new Store();
        let ob = store.observables.add(component.id);
        ob.addSubscriber(component, component.listnerCallback);
        ob.observableData.value = "Bar";
        ob.emitNotifications();

        document.getElementById("ComponentRoot").appendChild(component);
        document.getElementById("ComponentRoot").appendChild(button);

        console.log("StartupController.initialise.complete");
    }
}
