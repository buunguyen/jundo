[![Code Shelter](https://www.codeshelter.co/static/badges/badge-flat.svg)](https://www.codeshelter.co/)

jundo
====

Undo library for browser and Node.

#### Install
```
npm install jundo
```

#### Usage
```javascript
var jundo = new JUndo();
...
```

To mark an action which can be undone:

```javascript
jundo.register(undoFunc, redoFunc);
```

`undoFunc` is the function that will be invoked upon undoing, `redoFunc` upon redoing.  For example, if an action that adds an object to a screen has been performed, the undo function should remove that object while the redo function should add that object back to the screen.

To undo and redo:
```javascript
if (jundo.undoCount() > 0) jundo.undo();
if (jundo.redoCount() > 0) jundo.redo();
```

To clear all registered functions:
```javascript
jundo.clear();
```

Events:
```javascript
jundo.on('change', function (evt, actionName, undoCount, redoCount) {
	// actionName: 'register', 'undo', 'redo', 'clear'
});
```

For more information, check out the [specs](https://github.com/buunguyen/jundo/blob/master/test/jundo.specs.js).
