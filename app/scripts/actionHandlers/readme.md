## What goes here?
In this folder you should place action handlers. 

## What else do I need before I can code something here?
An idea of the events you need to handle and what you want to do when they occur.

## What should I learn first?
This is were the code gets both cool and a tricky. 
- Perhaps check out the DDD Presentation to get inspiration. https://github.com/LucaGnezda/DDDAdelaide2024PresoDemo

## How might I do that?
Let's look at what a starter handler looks like. At a minimum i is a class with a method that contains a switch, each handling one action type, then code that processes that action. 

```js
    class MyActionHandler {
        route(action) {

            Log.debug(`${this.constructor.name} processing event ${action.type}`, "HANDLER");

            switch (action.type) {
                case "MyButton_OnClick":
                    handleClick(action.payload);
                    break;

                default:
                    // do nothing
            }
        }

        handleClick(payload) {
            // Do something here
        }
    }

```