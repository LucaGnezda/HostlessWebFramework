## What goes here?
In this folder you should place any custom components that you make.

## What else do I need before I can code something here?
Nothing other than the problem you need to solve :)

## What should I learn first?
Learn about custom elements. Essentially you can define your own HTML tags that contain html structure, data and logic. Great for user interface problems that you have to solve more than once. Check out:
- https://javascript.info/custom-elements
- https://developer.mozilla.org/en-US/docs/Web/API/Web_components/Using_custom_elements
- https://medium.com/@readizo.com/implementing-custom-html-elements-know-how-14f3f582b510

## How might I do that?
Firstly don't forget to declare your component. We suggest placing this in the ComponentRegistry service ... but you can really put it anywhere as long as you call it before you use it.
```js
    customElements.define("cc-mycomponent", MyComponent);  
```

Now Let's look at what an empty simple component might look like in this framework.
```js
    class MyComponent extends CCBase {

        #elements = {
            root: null,
        };

        static #htmlTemplate = `
            <div data-root>
            </div>
        `

        constructor() {
            super();

            // Allocate a guid
            if (this.id === "") {
                this.id = crypto.randomUUID();
            }
        }

        /*
        * Standard Component Methods
        */
        static get observedAttributes() {
            return [];
        }

        /*
        * Getters & Setters
        */

        /*
        * Private Methods
        */

        #confirmUXIsInitialised() {
            if (this.children.length == 0) {
                let fragment = getDOMFragmentFromString(MyComponent.#htmlTemplate);

                this.#elements.root = fragment.querySelector('[data-root]');

                this.appendChild(fragment);
            }
        }

        /**
        * Initialises the attributes for the page
        */
        #initialiseAttributes() { 

        }

        /*
        * Public Methods
        */
        render() { 

        }

        /*
        * Callbacks
        */
        connectedCallback() {
            this.#confirmUXIsInitialised();
            this.#initialiseAttributes();
            this.render();
            Log.debug(`${this.constructor.name} connected to DOM`, "COMPONENT");
        }

        disconnectedCallback() {
            Log.debug(`${this.constructor.name} disconnected from DOM`, "COMPONENT");
        }

        attributeChangedCallback(name, oldValue, newValue) {
            this.render();
            Log.debug(`${this.constructor.name}, value ${name} changed from ${oldValue} to ${newValue}`, "COMPONENT");
        }
    }
```

Now lets look at differences if you also want it to use observable data:
- Use CCObservableBase instead of CCBase
- Initialise an ObservableCore
- Add a data change subscriber
- Add a data change callback that re-renders the new date

```js
    class MyComponent extends CCObservableBase {

        ...

        constructor() {
            // construct the object, need to call `super` before you can use `this` 
            let state = new ObservableCore();
            super(state);

            state.originatingObject = this;
            state.addSubscriber(this, this.dataChangedCallback);

            // allocate a guid
            if (isEmptyOrNull(this.id)) {
                this.id = crypto.randomUUID();
            }

            // Initialise the observables data structure that the object will need to operate 
            // for example:
            //     this.observableData.title = null;

        }

        ...

        dataChangedCallback(event) {
            this.render();
            Log.debug(`Data change callback on component ${event.originatingObject.constructor.name} with id:${event.originatingObject.id} updated property ${event.path} from ${event.oldValue} to ${event.newValue}`, "COMPONENT");
        }
    }
```
