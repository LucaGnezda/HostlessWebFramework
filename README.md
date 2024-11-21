![Language](https://img.shields.io/badge/HTML-5%2B-E34F26.svg?logo=html5) ![Language](https://img.shields.io/badge/CSS3-2024%2B-1572B6.svg?logo=css3) ![Language](https://img.shields.io/badge/JavaScript-ES2023%2B-F7DF1E.svg?logo=javascript) 

![Static Badge](https://img.shields.io/badge/build_status-not_required_%3A%29-green)

# A Hostless Web Framework - An educational codebase structure to have fun with
## About
This repo is a serverless coding framework, with everything you need to start, all in a single bundle.

What is a hostless web framework? I'm glad you asked. It is an HTML codebase that can be run in a browser straight from a filesystem, without any need for build actions or web hosting. I did this as a way of providing my nephews a fully formed framework, without the need for any of the usual the commercial development complexities. This presents several challenges, namely:
- There is no way to do package imports or dynamic loading of files (without user drag user initiated uploads)
- Without packages and builds ... this means no TypeScript, Angular, ... (so everything has to be built from first principles)

But it does actually come with some of the niceties you'd hope for, such as:
- Compartmentalisation of View, Logic and Data
- Observable objects
- Improved logging
- etc.

## How to run
This bit is easy ... and kind of cool.
1. Download or clone the repo.
2. Open index.html in your Browser.
3. Start coding!

## Hang on a sec, but where do I begin?
Ok, I'd actually start by:
1. Cloning the DDD Presentation I gave in 2024 and run that index.html. It shows how everything is put together, and the story behind it. 
2. Read the following:
    - This readme
    - The 6 readmes in the ./app folder
3. Go back to the DDD presentation and look at how it did things for inspiration.
4. Start your own project

## Usage examples for this Framework
The examples below have been designed to be self contained, allowing you to copy and paste them directly into a browser console.

### Logging

```js
Log.setLoggingLevel(LogLevel.Trace); // or any other level, only that level and above will print to console.
Log.trace("Something worth tracing", "ModuleX");
Log.debug("Something worth debugging", "ModuleX");
Log.info("Something worth noting", "ModuleX");
Log.warn("Something worth warning about", "ModuleX");
Log.error("Something went wrong", "ModuleX");
Log.fatal("It's all on fire", "ModuleX");
```

### Observable Usage

```js
Log.setLoggingLevel(LogLevel.Fatal); // So we only get the callback firing. Or set to trace if you want to see everything it's doing.

let aCallback = function(e) { console.log(`Something changed! ${e.notificationMode} path="${JSON.stringify(e.path)}" from ${JSON.stringify(e.oldValue)} to ${JSON.stringify(e.newValue)}`) };

let myObservable = new ObservableCore(NotificationMode.PropertyNotifyOnChange, NotificationStatus.Inactive);
myObservable.originatingObject = document; // Set this to the owning object, used for logging and to manage bi-directional subscribe/unsubscribe actions, can also be set to self
myObservable.addSubscriber(document, aCallback);

// Ok let's put it to the test
myObservable.dataProxy.simpleData = 1;                        // no event, inactive
myObservable.dataProxy.objectData = {a: 1, b: {c: 2, d: 3}};  // no event, inactive
myObservable.notificationStatus = NotificationStatus.Active
myObservable.dataProxy.simpleData = 2;                        // change event
myObservable.dataProxy.simpleData = 2;                        // no event, no change
myObservable.dataProxy.objectData = {a: 1, b: {c: 2, d: 3}};  // no event, no change
myObservable.dataProxy.objectData = {a: 1, b: {c: 2, d: 4}};  // change event
myObservable.dataProxy.objectData = {a: 1, b: {d: 4, c: 2}};  // no event, same data, only order differs
myObservable.dataProxy.objectData.b.c = 2;                    // no event, no change
myObservable.dataProxy.objectData.b.c = 3;                    // change event
myObservable.dataProxy.objectData.b.c = 3;                    // no event, no change

// And now for batch mode
Log.setLoggingLevel(LogLevel.Fatal); // So we only get the callback firing. Or set to trace if you want to see everything it's doing.

let aBatchCallback = function(e) { console.log(`Something changed! ${e.notificationMode}`)};

let myBatchObservable = new ObservableCore(NotificationMode.ObjectNotifyOnEmit, NotificationStatus.Inactive);
myBatchObservable.originatingObject = document;
myBatchObservable.addSubscriber(document, aBatchCallback);

myBatchObservable.dataProxy.simpleData = 1;                        // no event, inactive
myBatchObservable.dataProxy.objectData = {a: 1, b: {c: 2, d: 3}};  // no event, inactive
myBatchObservable.notificationStatus = NotificationStatus.Active
myBatchObservable.dataProxy.simpleData = 2;                        // change event (but held)
myBatchObservable.dataProxy.simpleData = 2;                        // no event, no change
myBatchObservable.dataProxy.objectData = {a: 1, b: {c: 2, d: 3}};  // no event, no change
myBatchObservable.dataProxy.objectData = {a: 1, b: {c: 2, d: 4}};  // change event (but held)
myBatchObservable.dataProxy.objectData = {a: 1, b: {d: 4, c: 2}};  // no event, same data, only order differs
myBatchObservable.dataProxy.objectData.b.c = 2;                    // no event, no change
myBatchObservable.dataProxy.objectData.b.c = 3;                    // change event (but held)
myBatchObservable.dataProxy.objectData.b.c = 3;                    // no event, no change

myBatchObservable.emitNotifications();                             // emits
myBatchObservable.emitNotifications();                             // nothing to emit
myBatchObservable.emitNotifications(true);                         // emits anyway
```

### Store Usage

```js
Log.setLoggingLevel(LogLevel.Trace);

let aCallback = function(e) { console.log(`Store Observable changed! ${e.notificationMode} ${JSON.stringify(e.originatingObject)}`)};
let aDictionaryCallback = function(e) { console.log(`Store Dictionary changed! ${e.notificationMode} ${JSON.stringify(e.originatingObject)}`)};

let store = new Store();
store.addObservable("settings");
store.addObservablesDictionary("players");

store.settings.observableData.teamName = "The Coders";
store.players.add("player1");
store.players["player1"].observableData.name = "Luca"
store.players.add("player2");
store.players["player2"].observableData.name = "Solomon"

store.settings.addSubscriber(document, aCallback);
store.players["player1"].addSubscriber(document, aDictionaryCallback);
store.players["player2"].addSubscriber(document, aDictionaryCallback);

console.log("Emit 1");
store.emitNotifications();

console.log("Data Changes");
store.settings.observableData.teamName = "The Emitters";
store.players["player1"].observableData.name = "LucaG";

console.log("Emit 2");
store.emitNotifications();
```

### Dispatcher usage

```js
class MyActionHandler { route(action) {console.log(`Hello Action {"action.type":"${action.type}", "action.payload":"${action.payload.constructor.name}"}`);} }

let dispatcher = new Dispatcher();
dispatcher.addDispatchHandler(new MyActionHandler(), "route");

document.body.addEventListener("click", dispatcher.newEventDispatchCallback("MyClick")); // Now try clicking on the text in the browser
```


## And most importantly of all...
Coding is and should be fun ... if using this framework doesn't feel like fun, stop and try something else to help you learn coding.

As Eric Curtis likes to say ... "Go make a thing."

Best of luck padawan. 