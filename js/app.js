/* global Backbone, Marionette, $, require */

$(function() {

  "use strict";

  var app = new Marionette.Application();

  var loggedInUser = new Backbone.Model();

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
    id: "loginStatus",
    model: loggedInUser,
    template: require("../templates/login-status.html")
  });

  // View for the list of proposals
  var ProposalList = Marionette.CompositeView.extend({
    tagName: "div",
    template: require("../templates/proposal-list.html"),
    childView: ProposalView,
    childViewContainer: "#container"
  });

  // Overall layout, with top and main regions
  var AppLayout = Marionette.LayoutView.extend({
    el: "#app",
    template: require("../templates/layout.html"),
    childEvents: {
      "login": function() {
        loggedInUser.set("name", $("#username").val());
        this.header.show(new LoginStatus());
        this.top.show(new ProposalForm());
        this.main.show(new ProposalList({collection: proposals}));
      }
    },
    regions: {
      header: "#header",
      top: "#top",
      main: "#main"
    }
  });

  var LoginForm = Marionette.ItemView.extend({
    template: require("../templates/login-form.html"),
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
