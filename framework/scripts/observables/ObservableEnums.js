/*
 * Enums used for the construction of the ObservableCore and objects that wrap it
 */

/**
 * Options for an Observables notification mode
 * @enum {string}
 * @readonly
 * @property {string} Default
 * @property {string} PropertyNotifyOnChange
 * @property {string} ObjectNotifyOnEmit
 */
const NotificationMode = {
    Default:                "PropertyNotifyOnChange", 
    PropertyNotifyOnChange: "PropertyNotifyOnChange",
    ObjectNotifyOnEmit:     "ObjectNotifyOnEmit"
};

/**
 * Options for an Observables notification status
 * @enum {string}
 * @readonly
 * @property {string} Default
 * @property {string} NotStarted
 * @property {string} Inactive
 * @property {string} Active
 */
const NotificationStatus =  {
    Default:    "Inactive",
    NotStarted: "Inactive", 
    Inactive:   "Inactive",
    Active:     "Active"
};