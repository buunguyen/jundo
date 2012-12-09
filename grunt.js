module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-jasmine-task');

    grunt.initConfig({
        jshint: {
            options: {
                browser: true
            }
        },
        lint: {
            all: ['lib/jundo.js']
        },
        min: {
            all: {
                src: ['lib/jundo.js'],
                dest: 'lib/jundo.min.js'
            }
        },
        jasmine: {
            all: {
                src: ['test/SpecRunner.html'],
                errorReporting: true
            }
        }
    });

    grunt.registerTask('default', 'lint jasmine min');
};