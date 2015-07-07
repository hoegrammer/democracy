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
