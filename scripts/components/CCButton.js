"use strict";

class CCButton extends CCBase {

    static htmlTemplate = `
        <div><button data-button>Click me</button></div>
    `

    #element = null
    #clickCallbackExtention = null;

    constructor() {
        super();

        if (isEmptyOrNull(this.id)) {
            this.id = crypto.randomUUID();
        };
    }

    static get observedAttributes() {
        return [];
    }

    get clickCallbackExtention() {
        return this.#clickCallbackExtention;
    }

    set clickCallbackExtention(val) {
        if (typeof val == 'function') {
            this.#clickCallbackExtention = val;
        }
        else if (isEmptyOrNull(val)) {
            this.#clickCallbackExtention = null;
        }
    }
    
    #initialiseUI() {
        let fragment = getDOMFragmentFromString(CCButton.htmlTemplate);
        this.#element = fragment.querySelector('[data-button]');
        this.addEventListener("click", this.clickCallbackExtention.bind(this));
        this.appendChild(fragment);
    }

    #initialiseAttributes() {

    }

    render() {

    }

    connectedCallback() {
        this.#initialiseUI();
        this.#initialiseAttributes();
        this.render();
        console.log(this.constructor.name + ' connected to DOM');
    }
    
    disconnectedCallback() {
        console.log(this.constructor.name + ' disconnected from DOM');
    }
    
    attributeChangedCallback(name, oldValue, newValue) {
        this.render();
    }

    clickCallback(event) {
        console.log(`COMPONENT: Click callback on component ${this.constructor.name} with id:${this.id} with event ${event}`);
        if (this.clickCallbackExtention != null) {
            this.clickCallbackExtention(event);
        }
    }    
}