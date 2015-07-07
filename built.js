(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/* global Backbone, Marionette, $ */

$(function() {

  "use strict";

  var app = new Marionette.Application();

  // Collection of proposals
  var proposals = new Backbone.Collection();

  // View for the Add Proposal form
  var ProposalForm = Marionette.ItemView.extend({
    template: "#proposal-form-template",
    events: {
      "click button": "addProposal"
    },
    addProposal: function() {
      proposals.add({
        name: this.$("textarea").val()
      });
      this.$("textarea").val("");
    }
  });

  // View for a single proposal (a row in the proposals table)
  var ProposalView = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#proposal-view-template"
  });

  // View for the list of proposals
  var ProposalList = Marionette.CompositeView.extend({
    tagName: "div",
    template: "#proposal-list-template",
    childView: ProposalView,
    childViewContainer: "#container"
  });

  // Overall layout, with top and main regions
  var AppLayout = Marionette.LayoutView.extend({
    el: "#app",
    template: "#layout-template",
    childEvents: {
      "login": function() {
        this.top.show(new ProposalForm());
        this.main.show(new ProposalList({collection: proposals}));
      }
    },
    regions: {
      top: "#top",
      main: "#main"
    }
  });

  var LoginForm = Marionette.ItemView.extend({
    template: "#login-form-template",
    events: {
      "click button": "login"
    },
    login: function() {
      this.triggerMethod("login");
    }
  });

  // Initialisation
  app.on("start", function() {
    var appLayout = new AppLayout();
    appLayout.render();
    appLayout.main.show(new LoginForm());
  });
  app.start();
});

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3Vzci9sb2NhbC9saWIvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsImpzL2FwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiLyogZ2xvYmFsIEJhY2tib25lLCBNYXJpb25ldHRlLCAkICovXG5cbiQoZnVuY3Rpb24oKSB7XG5cbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIGFwcCA9IG5ldyBNYXJpb25ldHRlLkFwcGxpY2F0aW9uKCk7XG5cbiAgLy8gQ29sbGVjdGlvbiBvZiBwcm9wb3NhbHNcbiAgdmFyIHByb3Bvc2FscyA9IG5ldyBCYWNrYm9uZS5Db2xsZWN0aW9uKCk7XG5cbiAgLy8gVmlldyBmb3IgdGhlIEFkZCBQcm9wb3NhbCBmb3JtXG4gIHZhciBQcm9wb3NhbEZvcm0gPSBNYXJpb25ldHRlLkl0ZW1WaWV3LmV4dGVuZCh7XG4gICAgdGVtcGxhdGU6IFwiI3Byb3Bvc2FsLWZvcm0tdGVtcGxhdGVcIixcbiAgICBldmVudHM6IHtcbiAgICAgIFwiY2xpY2sgYnV0dG9uXCI6IFwiYWRkUHJvcG9zYWxcIlxuICAgIH0sXG4gICAgYWRkUHJvcG9zYWw6IGZ1bmN0aW9uKCkge1xuICAgICAgcHJvcG9zYWxzLmFkZCh7XG4gICAgICAgIG5hbWU6IHRoaXMuJChcInRleHRhcmVhXCIpLnZhbCgpXG4gICAgICB9KTtcbiAgICAgIHRoaXMuJChcInRleHRhcmVhXCIpLnZhbChcIlwiKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFZpZXcgZm9yIGEgc2luZ2xlIHByb3Bvc2FsIChhIHJvdyBpbiB0aGUgcHJvcG9zYWxzIHRhYmxlKVxuICB2YXIgUHJvcG9zYWxWaWV3ID0gTWFyaW9uZXR0ZS5JdGVtVmlldy5leHRlbmQoe1xuICAgIHRhZ05hbWU6IFwidHJcIixcbiAgICB0ZW1wbGF0ZTogXCIjcHJvcG9zYWwtdmlldy10ZW1wbGF0ZVwiXG4gIH0pO1xuXG4gIC8vIFZpZXcgZm9yIHRoZSBsaXN0IG9mIHByb3Bvc2Fsc1xuICB2YXIgUHJvcG9zYWxMaXN0ID0gTWFyaW9uZXR0ZS5Db21wb3NpdGVWaWV3LmV4dGVuZCh7XG4gICAgdGFnTmFtZTogXCJkaXZcIixcbiAgICB0ZW1wbGF0ZTogXCIjcHJvcG9zYWwtbGlzdC10ZW1wbGF0ZVwiLFxuICAgIGNoaWxkVmlldzogUHJvcG9zYWxWaWV3LFxuICAgIGNoaWxkVmlld0NvbnRhaW5lcjogXCIjY29udGFpbmVyXCJcbiAgfSk7XG5cbiAgLy8gT3ZlcmFsbCBsYXlvdXQsIHdpdGggdG9wIGFuZCBtYWluIHJlZ2lvbnNcbiAgdmFyIEFwcExheW91dCA9IE1hcmlvbmV0dGUuTGF5b3V0Vmlldy5leHRlbmQoe1xuICAgIGVsOiBcIiNhcHBcIixcbiAgICB0ZW1wbGF0ZTogXCIjbGF5b3V0LXRlbXBsYXRlXCIsXG4gICAgY2hpbGRFdmVudHM6IHtcbiAgICAgIFwibG9naW5cIjogZnVuY3Rpb24oKSB7XG4gICAgICAgIHRoaXMudG9wLnNob3cobmV3IFByb3Bvc2FsRm9ybSgpKTtcbiAgICAgICAgdGhpcy5tYWluLnNob3cobmV3IFByb3Bvc2FsTGlzdCh7Y29sbGVjdGlvbjogcHJvcG9zYWxzfSkpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcmVnaW9uczoge1xuICAgICAgdG9wOiBcIiN0b3BcIixcbiAgICAgIG1haW46IFwiI21haW5cIlxuICAgIH1cbiAgfSk7XG5cbiAgdmFyIExvZ2luRm9ybSA9IE1hcmlvbmV0dGUuSXRlbVZpZXcuZXh0ZW5kKHtcbiAgICB0ZW1wbGF0ZTogXCIjbG9naW4tZm9ybS10ZW1wbGF0ZVwiLFxuICAgIGV2ZW50czoge1xuICAgICAgXCJjbGljayBidXR0b25cIjogXCJsb2dpblwiXG4gICAgfSxcbiAgICBsb2dpbjogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnRyaWdnZXJNZXRob2QoXCJsb2dpblwiKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIEluaXRpYWxpc2F0aW9uXG4gIGFwcC5vbihcInN0YXJ0XCIsIGZ1bmN0aW9uKCkge1xuICAgIHZhciBhcHBMYXlvdXQgPSBuZXcgQXBwTGF5b3V0KCk7XG4gICAgYXBwTGF5b3V0LnJlbmRlcigpO1xuICAgIGFwcExheW91dC5tYWluLnNob3cobmV3IExvZ2luRm9ybSgpKTtcbiAgfSk7XG4gIGFwcC5zdGFydCgpO1xufSk7XG4iXX0=
