/* eslint-env node */

module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    browserify: {
      dist: {
        src: ["js/app.js"],
        dest: "built.js",
        options: {
          transform: ["node-underscorify"],
          debug: true,
          external: ["jquery", "underscore", "backbone", "backbone.marionette"]
        }
      }
    },
    watch: {
      files: ["js/*.js", "templates/*.html"],
      tasks: ["browserify"]
    }
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["browserify"]);

};
