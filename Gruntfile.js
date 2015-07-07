/* eslint-env node */

module.exports = function(grunt) {

  "use strict";

  grunt.initConfig({
    browserify: {
      dist: {
        src: ["js/app.js"],
        dest: "built.js"
      }
    },
    watch: {
      files: ["js/*.js"],
      tasks: ["browserify"]
    }
  });

  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-watch");

  grunt.registerTask("default", ["browserify"]);

};
