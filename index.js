;(function() {
    function JUndo() {
        this.undoStack = []
        this.redoStack = []
    }

    JUndo.prototype = {
        register: function(undoAction, redoAction) {
            this.undoStack.push({ u: undoAction, r: redoAction })
            this.redoStack = []
            this.trigger('change', 'register', this.undoCount(), this.redoCount())
            return this
        },

        undo: function() {
            if (this.undoStack.length === 0)
                throw new Error('Undo stack is empty')
            var actions = this.undoStack.pop()
            this.redoStack.push(actions)
            actions.u()
            this.trigger('change', 'undo', this.undoCount(), this.redoCount())
            return this
        },

        redo: function() {
            if (this.redoStack.length === 0)
                throw new Error('Redo stack is empty')
            var actions = this.redoStack.pop()
            this.undoStack.push(actions)
            actions.r()
            this.trigger('change', 'redo', this.undoCount(), this.redoCount())
            return this
        },

        clear: function() {
            this.undoStack = []
            this.redoStack = []
            this.trigger('change', 'clear', 0, 0)
        },

        undoCount: function() {
            return this.undoStack.length
        },

        redoCount: function() {
            return this.redoStack.length
        }
    }
    
    if (typeof exports !== 'undefined' && module.exports) {
        require('evtify')(JUndo.prototype)    
        module.exports = JUndo
    } else {
        window.evtify(JUndo.prototype)
        this.JUndo = JUndo
    }  
})()