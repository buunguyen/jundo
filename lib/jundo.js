/*! jundo.js 0.0.1, 2012-12-09
 *  https://github.com/buunguyen/jundo
 *  Copyright (c) 2012 Buu Nguyen
 *  Licensed under the Apache License, Version 2.0 */
(function(Eventify) {
    function JUndo() {
        this.undoStack = [];
        this.redoStack = [];
    }

    JUndo.instances = [];
    JUndo.get = function(context) {
        if (!context) throw new Error('A valid context must be provided');
        for (var i = 0; i < JUndo.instances.length; i++)
            if (JUndo.instances[i][0] === context)
                return JUndo.instances[i][1];
        var jundo = new JUndo();
        JUndo.instances.push([context, jundo]);
        return jundo;
    };

    JUndo.remove = function(context) {
        if (!context) throw new Error('A valid context must be provided');
        for (var i = 0; i < JUndo.instances.length; i++)
            if (JUndo.instances[i][0] === context) {
                JUndo.instances.splice(i, 1);
                return;
            }
        throw new Error('No JUndo instance is associated with the provided context');
    };

    JUndo.clear = function() {
        JUndo.instances = [];
    };

    JUndo.prototype = {
        register: function(undoAction, redoAction) {
            this.undoStack.push({ u: undoAction, r: redoAction });
            this.redoStack = [];
            this.trigger('change', 'register', this.undoCount(), this.redoCount());
            return this;
        },

        undo: function() {
            if (this.undoStack.length === 0)
                throw new Error('Undo stack is empty');
            var actions = this.undoStack.pop();
            this.redoStack.push(actions);
            actions.u();
            this.trigger('change', 'undo', this.undoCount(), this.redoCount());
            return this;
        },

        redo: function() {
            if (this.redoStack.length === 0)
                throw new Error('Redo stack is empty');
            var actions = this.redoStack.pop();
            this.undoStack.push(actions);
            actions.r();
            this.trigger('change', 'redo', this.undoCount(), this.redoCount());
            return this;
        },

        clear: function() {
            this.undoStack = [];
            this.redoStack = [];
            this.trigger('change', 'clear', 0, 0);
        },

        undoCount: function() {
            return this.undoStack.length;
        },

        redoCount: function() {
            return this.redoStack.length;
        }
    };
    Eventify(JUndo.prototype);

    if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports)
            exports = module.exports = JUndo;
        exports.JUndo = JUndo;
    } else {
        this.JUndo = JUndo;
    }  
}).call(this, this.Eventify || (require && require('Eventify')));