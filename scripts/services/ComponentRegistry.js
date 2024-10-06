"use strict";

class ComponentRegistry {

    static registerComponents() {
        customElements.define("cc-button", CCButton);
        customElements.define("cc-label", CCLabel);
    }

}
