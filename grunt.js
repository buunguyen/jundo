module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-jasmine-task');

    grunt.initConfig({
        pkg: '<json:package.json>',
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> <%= pkg.version %>, <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                    '<%= pkg.homepage ? " *  " + pkg.homepage + "\n" : "" %>' +
                    ' *  Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>\n' +
                    ' *  Licensed under the <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
        },
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
                src: ['<banner>', 'lib/jundo.js'],
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