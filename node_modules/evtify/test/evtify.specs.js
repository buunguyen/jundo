describe('evtify', function() {  
    it('adds methods to plain objects directly', function() {
        var obj1 = {}, 
            obj2 = {},
            methods = ['on', 'addEventListener', 'off', 'removeEventListener', 'trigger', 'fire'];
        console.log (evtify)
        evtify(obj1, obj2);
        for (var i = 0; i < methods.length; i++) {
            expect(obj1[methods[i]]).toBeDefined();
            expect(obj2[methods[i]]).toBeDefined();
        }
    }); 

    it('adds methods via inheritance', function() {
        var ctor = function() {},
            methods = ['on', 'addEventListener', 'off', 'removeEventListener', 'trigger', 'fire'],
            obj;

        ctor.prototype = new evtify();
        obj = new ctor();

        for (var i = 0; i < methods.length; i++) {
            expect(obj[methods[i]]).toBeDefined();
        }
    });

    it('triggers registered events with context', function() {
        var obj = evtify({})[0],
            context = {},
            handler = {
                handle: function(event, number) {
                    expect(this).toBe(context);
                }
            }, 
            spy = spyOn(handler, 'handle').andCallThrough();

        obj.on('event1', handler.handle, context);
        obj.trigger('event1', 1);
        expect(handler.handle).toHaveBeenCalledWith('event1', 1);
    });

    it('triggers registered events without context', function() {
        evtify({})[0].on('event1', function(event, number) {
            expect(this).toBe(window);
        }).trigger('event1');
    });

    it('triggers multiple handlers', function() {
        var obj = evtify({})[0],
            handler = { handle: function() {} }, 
            spy = spyOn(handler, 'handle');

        obj.on('event1', handler.handle)
           .on('event1 event2', handler.handle)
           .trigger('event1 event2');
        expect(spy.callCount).toBe(3);
    });

    it('removes all handlers of all events', function() {
        var obj = evtify({})[0],
            handler = { handle: function() {}},
            spy = spyOn(handler, 'handle');

        obj.on('event1 event2', handler.handle)
           .on('event1 event3', handler.handle)
           .off()
           .trigger('event1 event2 event3');
        expect(handler.handle).not.toHaveBeenCalled();
    });

    it('removes all handlers of a specific event', function() {
        var obj = evtify({})[0],
            handler = { handle: function() {}},
            spy = spyOn(handler, 'handle');

        obj.on('event1 event2 event3', handler.handle)
           .off('event2')
           .trigger('event1 event2');
        expect(handler.handle).toHaveBeenCalledWith('event1');
        expect(spy.callCount).toBe(1);

        obj.trigger('event1 event3');
        expect(spy.callCount).toBe(3);

        obj.off('event1 event3').trigger('event1 event3');
        expect(spy.callCount).toBe(3);
    });

    it('removes a specific handler', function() {
        var obj = evtify({})[0],
            handler = { handle: function() {}},
            spy = spyOn(handler, 'handle');

        obj.on('event1 event2 event1', handler.handle)
           .off('event1', handler.handle)
           .trigger('event1 event2');
        expect(spy.callCount).toBe(2);

        obj.off('event1', handler.handle)
           .trigger('event1 event2');
        expect(spy.callCount).toBe(3);
    });
});