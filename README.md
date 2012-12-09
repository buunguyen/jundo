jundo
====

Simple undo/redo library for browser and Node.

First, setup: 
```javascript
var jundo = new JUndo();
```

To mark an undo event, invoke `register()` with 2 functions, one which will be used for 
undo and one for redo (the undo). 

```javascript
jundo.register(undoFunc, redoFunc);
```

To undo or redo:
```javascript
jundo.undo();
jundo.redo();
```

To clear all registered functions:
```javascript
jundo.clear();
```

Events:
```javascript
jundo.on('change', func(evt, actionName, undoCount, redoCount) {
	// actionName: 'register', 'undo', 'redo', 'clear'
});

For apps that require multiple JUndo instances:
```javascript
var jundo1 = JUndo.get(context1),
	jundo2 = JUndo.get(context2),
	...;
```

That's it!  If not, check out the [specs](https://github.com/buunguyen/jundo/blob/master/test/jundo.specs.js).