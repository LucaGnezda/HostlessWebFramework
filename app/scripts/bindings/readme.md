## What goes here?
In this folder you should place binding callbacks. For most projects that use this framework you'll need to think about two types of bindings:
- One from your user interface to the dispatcher (Most of the time, this one will be easy, because the dispatcher takes care of most situations for you).
- One from the store to your component. (This is a little tricker, as it depends on what you want the binding to do. So you will need to code this yourself. See below for an example).

## What else do I need before I can code something here?
Before you create bindings here, you first need two things to bind together. Specifically:
- One thing to bind from
- One thing to bind it to

This will typically be the second example above From Store Item to Component.

## What should I learn first?
Learn about callbacks. Essentially callbacks are functions that you pass around like data. This is cool because you can create dynamic behaviour in something else you've already coded by getting it to call callbacks. Check out:
- https://www.freecodecamp.org/news/javascript-callback-functions-what-are-callbacks-in-js-and-how-to-use-them/
- https://www.geeksforgeeks.org/javascript-callbacks/
- https://developer.mozilla.org/en-US/docs/Glossary/Callback_function
- https://www.w3schools.com/js/js_callback.asp 


## How might I do that?
Let's look at the most typical example of a callback in this framework. Let's say you want to copy every piece of data from a store item into a component. Here is how we might write that callback.

```js
    let MyCallback_OnDataChange = function(event) {
        // Log ... to make your debugging easier :)
        Log.debug('Component Data Listener Callback Extension', "COMPONENT BINDING");

        // Do the copy. 
        // Note, in this case 'this' means your component. If you use this code, don't forget to bind your component as 'this' when you call this callback.
        for (let [key, value] of Object.entries(this.observableData)) {
            if (event.originatingObject.observableData.hasOwnProperty(key)) {
                this.observableData[key] = event.originatingObject.observableData[key];
            }
        }
    }
```