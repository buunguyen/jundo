evtify
====

Eventify any object, Node and browsers.
```
npm install evtify
```

Setup: 
```javascript
var obj = {}, anotherObj = {};
evtify(obj, anotherObj, ...);
...
```
Or:
```javascript
function Person() {};
Person.prototype = new evtify();
var obj = new Person();
...
```

Register handler for one or more events with optional context:
```javascript
obj.on('evt1 evt2', function(eventName, params...) {
		// 'this' will be 'window'
	})
   	.on('evt3', function(eventName, params...) { 
   		// 'this' will be 'context'
   	}, context);
```

Trigger one or more events:
```javascript
obj.trigger('evt1 evt2 evt3', args...);
```

Remove all handlers:
```javascript
obj.off(); 
```

Remove handlers of specific events:
```javascript
obj.off('evt1 evt2'); 
```

Remove a specific handler of specific events:
```javascript
obj.off('evt1 evt2', handler); 
```

Aliases:
* `on`: `addEventListener`
* `off`: `removeEventListener`
* `trigger`: `fire`

That's it!  Check out the [specs](https://github.com/buunguyen/evtify/blob/master/test/evtify.specs.js) for more details.