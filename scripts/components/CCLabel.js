"use strict";

class CCLabel extends CCObservableBase {

    static htmlTemplate = `
        <div><div data-label></div><div data-value></div></div>
    `

    #dataLabelElement = null
    #dataValueElement = null

    constructor() {

        let state = new ObservableCore();
        super(state);

        state.originatingObject = this;
        state.addSubscriber(this, this.dataChangedCallback);

        if (isEmptyOrNull(this.id)) {
            this.id = crypto.randomUUID();
        };

        this.observableData.label = "";
        this.observableData.value = "";
    }

    static get observedAttributes() {
        return [];
    }
    
    #initialiseUI() {
        let fragment = getDOMFragmentFromString(CCLabel.htmlTemplate);

        this.#dataLabelElement = fragment.querySelector('[data-label]');
        this.#dataValueElement = fragment.querySelector('[data-value]');
        
        this.appendChild(fragment);
    }

    #initialiseAttributes() {

    }

    render() {
        if (this.observableData.hasOwnProperty("label")) {
            this.#dataLabelElement.innerText = this.observableData.label
        }
        else {
            this.#dataLabelElement.innerText = "";
        }
        if (this.observableData.hasOwnProperty("value")) {
            this.#dataValueElement.innerText = this.observableData.value
        }
        else {
            this.#dataValueElement.innerText = "";
        }
    }

    connectedCallback() {
        this.#initialiseUI();
        this.#initialiseAttributes();
        this.notificationStatus = NotificationStatus.Active;
        this.render();
        console.log(this.constructor.name + ' connected to DOM');
    }
    
    disconnectedCallback() {
        console.log(this.constructor.name + ' disconnected from DOM');
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
        //console.log(this.constructor.name + ", value " + name + " changed from " + oldValue + " to " + newValue);
    }

    dataChangedCallback(event) {
        this.render();
        console.log(`COMPONENT: Data change callback on component ${event.originatingObject.constructor.name} with id:${event.originatingObject.id} updated property ${event.path} from ${event.oldValue} to ${event.newValue}`);
        if (this.dataChangedCallbackExtention != null) {
            this.dataChangedCallbackExtention(event);
        }
    }

    listnerCallback(event) {
        console.log(`COMPONENT: Data listner callback on component ${this.constructor.name} from ${event.originatingObject.constructor.name} with id:${event.originatingObject.id} was updated. notified by ${event.originatingObject.notificationMode}`);
        if (this.dataListnerCallbackExtention != null) {
            this.dataListnerCallbackExtention(event);
        }
    }
    
}