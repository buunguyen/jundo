;(function() {
    var SPLITTER = /\s+/;

    function each(array, callback) {
        for(var i = 0; i < array.length; i++) {
            callback(array[i])
        }
    }

    function evtify() {
        if (arguments.length > 0) {
            for (var i = 0; i < arguments.length; i++) 
                for (var prop in evtify.prototype)
                    arguments[i][prop] = evtify.prototype[prop]
            return arguments
        }
    }

    evtify.prototype.getHandlers = function (event) {
        var handlers = this._handlers || (this._handlers = {})
        if (typeof event === 'undefined') 
            return handlers
        return handlers[event] || (handlers[event] = [])
    }

    evtify.prototype.on = 
    evtify.prototype.addEventListener = function (evts, handler, context) {
        var self = this,
            events = evts.split(SPLITTER)
            
        each(events, function (event) {
            self.getHandlers(event).push([handler, context])
        })
        return this
    }

    evtify.prototype.off = 
    evtify.prototype.removeEventListener = function (evts, handler) {
        if (typeof evts === 'undefined') {
            this._handlers = null
        } else {
            var self = this,
                events = evts.split(SPLITTER)

            each(events, function (event) {
                var handlers = self.getHandlers()
                if (typeof handler === 'undefined') {
                    handlers[event] = null
                } else {
                    for (var i = handlers[event].length - 1; i >= 0; i--) {
                        var storedHandler = handlers[event][i]
                        if (storedHandler[0] === handler) {
                            handlers[event].splice(i, 1)
                            return
                        }
                    }
                }
            })
        }
        return this
    }

    evtify.prototype.trigger = 
    evtify.prototype.fire = function (evts) {
        var self = this,
            args = [].slice.call(arguments, 1), 
            events = evts.split(SPLITTER)

        each(events, function (event) {
            var handlers = self.getHandlers(event)
            each(handlers, function (handler) {
                return handler[0].apply(handler[1], [event].concat(args))
            })
        })
        return this
    }  

    if (typeof module !== 'undefined' && module.exports) module.exports = evtify
    else window.evtify = evtify
})()