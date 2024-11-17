## What goes here?
In this folder you should place your various css definitions. 

## What else do I need before I can code something here?
Some html or a component that you need to style.

## What should I learn first?
Learn about CSS. Check out:
- https://developer.mozilla.org/en-US/docs/Learn/Getting_started_with_the_web/CSS_basics
- https://www.w3schools.com/css/
- https://www.freecodecamp.org/news/html-css-and-javascript-explained-for-beginners/

## How might I do that?
Simply create a file, reference it in your index.html, then start adding CSS ... here are a few examples from the DDD presentation...

```css
:root {
    --colourBlue: #238ddd;                 /* var(--colourBlue) */
    --colourGreen: #32bea6;                /* var(--colourGreen) */
    --colourIce: #9cdcfe;                  /* var(--colourIce) */
    --colourYellow: #fffdab;               /* var(--colourYellow) */
    --colourRed: #e74856;                  /* var(--colourRed) */
    --colourCharcoal: #323436;             /* var(--colourCharcoal) */
    --colourDDDDarkSteelBlue: #3E5668;     /* var(--colourDDDDarkSteelBlue) */
    --colourDDDTeal: #1BA5A6;              /* var(--colourDDDTeal) */
    --colourDDDTan: #f3ebe0;               /* var(--colourDDDTan) */
}

body {
    background: #000000;
    margin: 0px;
    overflow: hidden;
    user-select: none;
    height: 100vh;
    width: 100vw;
}

p.Green,
ul.Green,
li.Green,
span.Green {
    color: var(--colourGreen)
}
```