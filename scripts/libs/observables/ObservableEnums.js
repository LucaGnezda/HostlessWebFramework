/**
 * Enums used for the construction of the ObservableCore and objects that wrap it
 */

"use strict";

const NotificationMode = AsEnum(
    {
        Default:                "PropertyNotifyOnChange", 
        PropertyNotifyOnChange: "PropertyNotifyOnChange",
        ObjectNotifyOnEmit:     "ObjectNotifyOnEmit"
    }
);

const NotificationStatus = AsEnum(
    {
        Default:    "Inactive",
        NotStarted: "Inactive", 
        Inactive:   "Inactive",
        Active:     "Active"
    }
);