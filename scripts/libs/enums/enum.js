/** 
 * Enum is an enum 'like' data structure, with helper methods for later use. 
 * AsEnum then makes instantiation cleaner and simpler. Avoids using Symbols 
 * to make the enum realm safe.
 * 
 * Examples of use:
 * const Colour = AsEnum(
 *    {
 *       Red:   "Red", 
 *       Green: "Green",
 *       Blue:  "Blue"
 *    }
 * ); 
 * 
 * Foo = Colour.Blue;
 * Foo == Colour.Blue;
 * 
 * Colour.getValues();
 * Colour.hasValue("Blue");
 * 
*/

"use strict";

function AsEnum(obj) {

    let e = Object.assign(new Enum(), obj);
    e.getValues();

    return Object.freeze(e);

}

class Enum {

    /**
     * Returns an array with the unique values found in the enum
     */
    getValues() {

        return Object.values(this).filter(
            function onlyUnique(value, index, array) {
                return array.indexOf(value) === index;
            }
        );
    }

    /**
     * Returns true if the value is in the enum
     */
    hasValue(val) {
        return this.getValues().includes(val);
    }

}