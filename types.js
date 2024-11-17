/**
 * A string key dictionary of any
 * @typedef {Dictionary<*>} AnyDictionary
 */

/**
 * An object to standardise action handlers in the system
 * @typedef {{handler: FunctionDictionary, routerName: string}} ActionHandler
 */

/**
 * A string key dictionary of functions
 * @typedef {Dictionary<Function>} FunctionDictionary
 */

/**
 * A dictionary of T
 * @template T Whatever you want :D
 * @typedef {{[k: string]: T}} Dictionary<T>
 */

/**
 * A dictionary of T with keys in K
 * @template {string} Key
 * @template Value
 * @typedef {{[k in Key]: Value}} LimitedDictionary<Key, Value>
 */

/**
 * @typedef {string} AppElements
 */

/**
 * A observable callback
 * @typedef {(event: ObservableDataEvent) => void} ObservableCallback
 */

/**
 * An input event callback
 * @template T
 * @typedef {(arg0: T) => void} Callback
 */

/**
 * @typedef {Object} EventBase
 * @property {Event} originatingEvent
 * @property {*} originatingObject
 */
            