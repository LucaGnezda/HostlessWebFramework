/* 
 * A set of general purpose useful functions
 */

/** 
 * Returns true if the object is an HTML Element 
 * @param {*} obj 
 * @returns {boolean}
*/
function isElement(obj) {
    return obj instanceof Element;
}

/**
 * @param {*} value 
 * @returns {boolean}
 */
function isInt(value) {
    return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}

/**
 * @param {*} value 
 * @returns {boolean}
 */
function isBoolean(value) {
    return (typeof value == "boolean");
}

/**
 * Checks if a given string represents a valid CSS color.
 * E.g.: 'red', 'blue', 'aliceblue'...
 * @param {string} value 
 * @returns {boolean}
 */
function isColor (value) {
    return (CSS.supports('color', value));
}

/**
 * @param {*} value 
 * @returns {number?}
 */
function parseNumber(value) {
    if (isNaN(value)) {
        return null;
    }
    else {
        return parseFloat(value);
    }
}

/**
 * @param {*} value 
 * @returns {number?}
 */
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

/**
 * @param {*} val 
 * @returns {boolean}
 */
function parseBool(val) {
    if ((typeof val == 'string' && (val.toLowerCase().trim() === 'true' || val.toLowerCase().trim() === 'yes') || (!Number.isNaN(val) && +val != 0)) || 
        (typeof val == 'number' && val != 0) ||
        (typeof val == "boolean" && val == true)) {
        return true;
    } 
    return false;     
}

/**
 * 
 * @param {*} value 
 * @returns {boolean}
 */
function isEmptyOrNull(value) {
    if (value == null || value === "" || (Array.isArray(value) && value.length === 0)) {
        return true;
    }
    else {
        return false;
    }
}

/**
 * Parses a given input into a function ref.
 * Allows you to do things like: 
 *    toFunctionRef("Controller.foo") - to return a function reference
 *    toFunctionRef("Controller.foo()") - to actually call the function
 * @param {*} value 
 * @returns {Function}
 */
function toFunctionRef(value) {
    return (new Function('return (' + value + ')')());
}

/**
 * Creates a DocumentFragment from a html string.
 * @param {string} value A string containing valid HTML
 * @returns {DocumentFragment}
 */
function getDOMFragmentFromString(value) {
    return document.createRange().createContextualFragment(value.trim());
}

/**
 * Stringifies the given object in an ordered way (lexicographically acending).
 * @param {*} obj The object to stringify
 * @param {string|number|undefined} space 
 * @returns {string}
 */
function JSONstringifyOrder(obj, space = undefined)
{
    const allKeys = new Set();
    // extract all properties to include in the ordered stringify,
    // use stringify for convenience as the replacer is called 
    // recursively on objects - properties of properties.
    JSON.stringify(obj, (key, value) => (allKeys.add(key), value));
    // stringify the object, only including the sorted keys, defines both 
    // which properties to include and their order.
    // really cool bit here is duplicate keys don't matter as it's an 
    // inclusive list, properties of properties are included and the 
    // order is enforced.
    return JSON.stringify(obj, Array.from(allKeys).sort(), space);
}
