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

},{}]},{},[1]);
