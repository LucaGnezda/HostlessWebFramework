## What goes here?
In this folder you should place enumeration types. 

## What else do I need before I can code something here?
Nothing other than the problem you need to solve :)

## What should I learn first?
Learn about enums. Essentially callbacks are functions that you pass around like data. This is cool because you can create dynamic behaviour in something else you've already coded by getting it to call callbacks. Check out:
- https://en.wikipedia.org/wiki/Enumerated_type
- https://stackoverflow.com/questions/44447847/enums-in-javascript-with-es6

## How might I do that?
The easiest way to do it in JavaScript is to define a constant and then make sure you add JSDoc definition so you editor warns you when you misuse the enum.

```js
    /**
     * Enum for common colors.
     * @readonly
     * @enum {{name: string, hex: string}}
     */
    const Colors = Object.freeze({
        RED:   { name: "red", hex: "#f00" },
        BLUE:  { name: "blue", hex: "#00f" },
        GREEN: { name: "green", hex: "#0f0" }
    });
```