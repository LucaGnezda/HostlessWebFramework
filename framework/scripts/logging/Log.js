/**
 * @class
 * @public
 */
class Log {
   static #logLevel = LogLevel.Default;
    
    /**
     * @type {Array<string>}
     */
    static #logCategories = [];

    /**
     * Sets the current log level
     * @param {LogLevel} val 
     */
    static setLoggingLevel(val) {
        Log.#logLevel = val;
    }

    /**
     * Sets the current log level restrictions
     * @param {Array<string>} val 
     */
    static restrictLoggingCategories(val) {
        if (val instanceof Array) {
            Log.#logCategories = val;
        }
    }

    /**
     * Removes all log level restrictions
     */
    static removeLoggingCategoryRestrictions() {
        this.#logCategories = [];
    }
    
    /**
     * Logs a fatal error to the console and throws and error
     * @param {string} msg 
     * @param {string} category 
     * @param {*} context
     * @throws
     */
    static fatal(msg, category, context) {
        Log.#log("Fatal Error", "color:#ffffff; background: #ee2225", msg, LogLevel.Fatal, category);
        let contextString = context ? `in ${context.constructor.name}` : "";
        throw `Fatal Error ${contextString} with message: ${msg}`;
    }

    /**
     * Logs an error to the console
     * @param {string} msg 
     * @param {string} category 
     */
    static error(msg, category) {
        Log.#log("Error", "color:#ffffff; background: #be333f", msg, LogLevel.Error, category);
    }

    /**
     * Logs an error message to the console
     * @param {string} msg 
     * @param {string} category 
     */
    static warn(msg, category) {
        Log.#log(" Warn", "color:#ec9e30;", msg, LogLevel.Warning, category);
    }

    /**
     * Logs an info message to the console
     * @param {string} msg 
     * @param {string} category 
     */
    static info(msg, category) {
        Log.#log(" Info", "color:#238ddd;", msg, LogLevel.Infomation, category);
    }

    /**
     * Logs a debug message to the console
     * @param {string} msg 
     * @param {string} category 
     */
    static debug(msg, category) {
        Log.#log("Debug", "color:#a0a0a0;", msg, LogLevel.Debug, category);
    }

    /**
     * Logs a trace message to the console
     * @param {string} msg 
     * @param {string} category 
     */
    static trace(msg, category) {
        Log.#log("Trace", "color:#808080;", msg, LogLevel.Trace, category);
    }

    /**
     * Logs a given message with provide detail and style
     * @param {string} prefix The prefix for the log message
     * @param {string} prefixStyle The style for the log message
     * @param {string} msg The message to log
     * @param {LogLevel} level The level of the log message
     * @param {string?} category The category of teh log message
     */
    static #log(prefix, prefixStyle, msg, level, category) {
        if (Log.#logLevel >= level) {
            if (category == null) {
                console.log("%c" + prefix + "%c | " + msg, prefixStyle, "");
            }
            else if (Log.#logCategories.length == 0 || Log.#logCategories.includes(category)) {
                console.log("%c" + prefix + "%c | [" + category + "] " + msg, prefixStyle, "");
            }
        }
    }
}

