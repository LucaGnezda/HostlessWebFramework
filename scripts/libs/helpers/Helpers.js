/** 
 * A set of general purpose useful functions
*/


/** 
 * Returns true if the object is an HTML Element 
*/
function isElement(obj) {
    return obj instanceof Element;
}



function isInt(value) {
    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}

function isBoolean(value) {
    return (typeof value == "boolean");
}

function isColor (value) {
    return (CSS.supports('color', value));
}

function parseNumber(value) {
    if (isNaN(value)) {
        return null;
    }
    else {
        return parseFloat(value);
    }
}

function parseValue(value) {
    if (isEmptyOrNull(value)) {
        return null;
    }
    else if (isNaN(value)) {
        return value;
    }
    else {
        return parseFloat(value);
    }
}

function parseBool(val) {
    if ((typeof val == 'string' && (val.toLowerCase().trim() === 'true' || val.toLowerCase().trim() === 'yes') || (!Number.isNaN(val) && +val != 0)) || 
        (typeof val == 'number' && val != 0) ||
        (typeof val == "boolean" && val == true)) {
        return true;
    } 
    return false;     
}

function isEmptyOrNull(value) {
    if (value == null || value === "" || (Array.isArray(value) && value.length === 0)) {
        return true;
    }
    else {
        return false;
    }
}

// allows you to do things like: 
//    toFunctionRef("Controller.foo") - to return a function reference
//    toFunctionRef("Controller.foo()") - to actually call the function
function toFunctionRef(value) {
    return (new Function('return (' + value + ')')());
}

function getDOMFragmentFromString(value) {
    return document.createRange().createContextualFragment(value.trim());
}


function JSONstringifyOrder(obj, space)
{
    const allKeys = new Set();
    JSON.stringify(obj, (key, value) => (allKeys.add(key), value));
    return JSON.stringify(obj, Array.from(allKeys).sort(), space);
}

function enumValue(val) {
    let obj = {};
    obj[val] = val;
    return Object.freeze(obj);
}