describe('jundo', function() {  
    var jundo;

    beforeEach(function() {
        jundo = new JUndo();
        var matchers = {
            toHaveCorrectCounts: function(undoCount, redoCount) {
                this.message = function(){
                    return 'Expected jundo (' + jundo.undoCount() + ' undos, ' + jundo.redoCount() + ' redos) to have ' + undoCount + ' undo(s) and ' + redoCount + ' redo(s)';
                };
                return this.actual.undoCount() === undoCount &&
                       this.actual.redoCount() === redoCount;
            },

            toThrowWhenEmptyStacks: function() {
                this.message = function(){
                    return 'Expected jundo (' + jundo.undoCount() + ' undos, ' + jundo.redoCount() + ' redos) to throw when empty stacks';
                };
                try {
                    jundo.undo();
                    return false;
                } catch (e) {}

                try {
                    jundo.redo();
                    return false;
                } catch (e) {}
                return true;
            }
        };
        this.addMatchers(matchers);
    });

    it('throws error when stacks are empty', function() {
        expect(jundo).toThrowWhenEmptyStacks();
    });

    it('allows registering undo/redo actions', function() {
        var dummy = function() {};

        jundo.register(dummy, dummy);
        expect(jundo).toHaveCorrectCounts(1, 0);

        jundo.register(dummy, dummy);
        expect(jundo).toHaveCorrectCounts(2, 0);
    });

    it('allows undoing and redoing', function() {
        var actions = { undo: function() {}, redo: function() {} },
            undoSpy = spyOn(actions, 'undo'),
            redoSpy = spyOn(actions, 'redo');

        jundo.register(actions.undo, actions.redo);
        jundo.undo();
        expect(undoSpy.callCount).toBe(1);
        expect(redoSpy.callCount).toBe(0);
        expect(jundo).toHaveCorrectCounts(0, 1);

        jundo.redo();
        expect(redoSpy.callCount).toBe(1);
        expect(undoSpy.callCount).toBe(1);
        expect(jundo).toHaveCorrectCounts(1, 0);
    });

    it('cleans redo after a new registration', function() {
        var dummy = function() {};

        jundo.register(dummy, dummy);
        jundo.register(dummy, dummy);
        jundo.undo();
        expect(jundo).toHaveCorrectCounts(1, 1);
        jundo.register(dummy, dummy);
        expect(jundo).toHaveCorrectCounts(2, 0);
    });

    it('fires change event', function() {
        var dummy = function() {},
            handler = {
                handle: function() {}
            },
            spy = spyOn(handler, 'handle');

        jundo.on('change', spy);
        jundo.register(dummy, dummy);
        expect(spy).toHaveBeenCalledWith('change', 'register', 1, 0);

        jundo.register(dummy, dummy);
        expect(spy).toHaveBeenCalledWith('change', 'register', 2, 0);
        expect(spy.callCount).toBe(2);

        jundo.undo();
        expect(spy).toHaveBeenCalledWith('change', 'undo', 1, 1);
        jundo.redo();
        expect(spy).toHaveBeenCalledWith('change', 'redo', 2, 0);
        expect(spy.callCount).toBe(4);
    });

    it('allows clearing registered actions', function() {
        var dummy = function(){};
        jundo.register(dummy, dummy);
        jundo.register(dummy, dummy);
        jundo.clear();
        expect(jundo).toHaveCorrectCounts(0, 0);
    });});