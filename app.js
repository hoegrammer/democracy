/* global Backbone, Marionette, $ */

$(function() {

  "use strict";

  var app = new Marionette.Application();

  // Overall layout, with top and main regions
  var AppLayout = Marionette.LayoutView.extend({
    el: "#app",
    template: "#layout-template",
    regions: {
      top: "#top",
      main: "#main"
    }
  });

  // Collection of proposals
  var proposals = new Backbone.Collection();

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

  var LoginForm = Marionette.ItemView.extend({
    template: "#login-form-template",
    events: {
      "click button": "login"
    },
    login: function() {
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
