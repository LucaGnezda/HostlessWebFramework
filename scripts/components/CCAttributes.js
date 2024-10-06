"use strict";

class CCAttributes extends CCBase {

    static htmlTemplate = `
        <div></div>
    `

    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['switchproperty', 'boolproperty', 'numberproperty', 'stringproperty', 'valueproperty'];
    }
    
    #initialiseUI() {
        let fragment = getDOMFragmentFromString(CCAttributes.htmlTemplate);
        this.appendChild(fragment);
    }

    #initialiseAttributes() {
        if (isEmptyOrNull(this.id)) {
            this.id = crypto.randomUUID();
        };
        this.switchProperty = this.switchProperty;
        this.boolProperty = this.boolProperty;
        this.numberProperty = this.numberProperty;
        this.stringPropoerty = this.stringPropoerty;
        this.valueProperty = this.valueProperty;
    }

    render() {

    }

    get switchProperty() {
        return this.hasAttribute('switchproperty');
    }

    set switchProperty(val) {
        if (!isBoolean(val)) {
            val = false;
        }
        if (val) {
            this.setAttribute('switchproperty', '');
        }
        else {
            this.removeAttribute('switchproperty');
        }
    }

    get boolProperty() {
        return parseBool(this.getAttribute('boolproperty'))
    }

    set boolProperty(val) {
        this.setAttribute('boolproperty', parseBool(val));
    }

    get numberProperty() {
        return parseNumber(this.getAttribute('numberproperty'));
    }

    set numberProperty(val) {
        this.setAttribute('numberproperty', parseNumber(val));
    }

    get stringProperty() {
        return this.getAttribute('stringproperty');
    }

    set stringProperty(val) {
        if (isEmptyOrNull(val)) {
            this.setAttribute('stringproperty', null);
        }
        else{
            this.setAttribute('stringproperty', val.toString());
        }
    }

    get valueProperty() {
        return parseValue(this.getAttribute('valueproperty'));
    }

    set valueProperty(val) {
        this.setAttribute('valueproperty', parseValue(val));
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
        //console.log(this.constructor.name + ", value " + name + " changed from " + oldValue + " to " + newValue);
    }   
}