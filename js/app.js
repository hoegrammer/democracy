/* global Backbone, Marionette, $, require */

$(function() {

  "use strict";

  // Collection of proposals
  var proposals = new Backbone.Collection();

  // View for the Add Proposal form
  var ProposalForm = Marionette.ItemView.extend({
    template: require("../templates/proposal-form.html"),
    events: {
      "click button": "addProposal"
    },

    addProposal: function() {
      var text = this.$("textarea").val();
      if (text !== "") {
        proposals.add({
          name: text
        });
      }
      this.$("textarea").val("");
    }
  });
  // View for a single proposal (a row in the proposals table)
  var ProposalView = Marionette.ItemView.extend({
    tagName: "tr",
    template: require("../templates/proposal-view.html")
  });

 // View for login info (tracks logged in user)
  var LoginStatus = Marionette.ItemView.extend({
    tagName: "div",
    template: require("../templates/login-status.html")
  });

  // View for the list of proposals
  var ProposalList = Marionette.CompositeView.extend({
    tagName: "div",
    template: require("../templates/proposal-list.html"),
    childView: ProposalView,
    childViewContainer: "#container"
  });

  var LoginForm = Marionette.ItemView.extend({
    template: require("../templates/login-form.html"),
    events: {
      "click #login": "login"
    },
    login: function() {
      this.triggerMethod("login");
    }
  });

  // Overall layout, with top and main regions
  var AppLayout = Marionette.LayoutView.extend({
    el: "#app",
    template: require("../templates/layout.html"),
    childEvents: {
      "login": "gotoMotions"
    },
    gotoMotions: function() {
      this.header.show(new LoginStatus());
      this.top.show(new ProposalForm());
      this.main.show(new ProposalList({collection: proposals}));
    },
    regions: {
      header: "#header",
      top: "#top",
      main: "#main"
    }
  });

  var appLayout = new AppLayout();

  var Router = Marionette.AppRouter.extend({
    routes: {
      //"motions": "loadMotionsScreen",
      "login": "loadLoginScreen",
      "": "loadLoginScreen"
    },
    loadMotionsScreen: function(){
      appLayout.header.show(new LoginStatus());
      appLayout.top.show(new ProposalForm());
      appLayout.main.show(new ProposalList({collection: proposals}));
    },
    loadLoginScreen: function() {
      appLayout.top.empty();
      appLayout.main.show(new LoginForm());
    }
  });

  var app = new Marionette.Application();

  // Initialisation
  app.on("start", function() {
    (function() {
      return new Router();
    })(); // weird hack - ignore
    appLayout.render();
    Backbone.history.start();
  });
  app.start();
});
