/* global Backbone, Marionette, $, require */

$(function() {

  "use strict";

  var app = new Marionette.Application();

  var loggedInUser = new Backbone.Model();

  // Collection of motions
  var motions = new Backbone.Collection();

  // View for the Add Motion form
  var MotionForm = Marionette.ItemView.extend({
    template: require("../templates/motion-form.html"),
    events: {
      "click button": "addMotion"
    },

    addMotion: function() {
      var text = this.$("textarea").val();
      if (text !== "") {
        motions.add({
          name: text
        });
      }
      this.$("textarea").val("");
    }
  });


  // View for a single motion (a row in the motions table)
  var MotionView = Marionette.ItemView.extend({
    tagName: "tr",
    template: require("../templates/motion-view.html"),
    events: {
      "click button": "delete"
    },
    delete: function() {
      motions.remove(this.model);
    }
  });

  // View for the list of motions
  var MotionList = Marionette.CompositeView.extend({
    tagName: "div",
    template: require("../templates/motion-list.html"),
    childView: MotionView,
    childViewContainer: ".childViewContainer"
  });

  // View for a single votable motions (a row in the motions table)
  var VotingView = Marionette.ItemView.extend({
    tagName: "tr",
    template: require("../templates/voting-view.html"),
    events: {
      "click #voteYesButton": "voteYes",
      "click #voteNoButton": "voteNo",
      "click #voteAbstainButton": "voteAbstain",
    },
    voteYes: function() {
      alert("voted Yes!");
    },
    voteNo: function() {
      alert("voted No!");
    },
    voteAbstain: function() {
      alert("Abstained!");
    }
  });

// View for the list of votable motions
  var VotingList = Marionette.CompositeView.extend({
    tagName: "div",
    template: require("../templates/voting-list.html"),
    childView: VotingView,
    childViewContainer: ".childViewContainer"
  });

  
  // View for login info (tracks logged in user)
  var TopToolbarView = Marionette.ItemView.extend({
    tagName: "div",
    id: "topToolbar",
    model: loggedInUser,
    template: require("../templates/toolbar-top.html"),
    events: {
      "click #addMotionsButton": function() {
        this.triggerMethod("loadAddMotionsScreen");
      },
      "click #manageMotionsButton": function() {
        this.triggerMethod("loadManageMotionsScreen");
      },
      "click #voteButton": function() {
        this.triggerMethod("loadVotingScreen");
      },
      "click #logoutButton": function() {
        this.triggerMethod("logout");
      }
    }
  });

  var LoginForm = Marionette.ItemView.extend({
    template: require("../templates/login-form.html"),
    id: "loginForm",
    events: {
      "click button": "login"
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
      login: "login",
      loadAddMotionsScreen: "loadAddMotionsScreen",
      loadManageMotionsScreen: "loadManageMotionsScreen",
      loadVotingScreen: "loadVotingScreen",
      logout: "logout"
    },
    login: function() {
      loggedInUser.set("name", $("#username").val());
      this.loadAddMotionsScreen();
    },
    loadManageMotionsScreen: function() {
      this.showTopToolbarView();
      this.top.empty();
      this.main.show(new MotionList({collection: motions}));
    },
    loadAddMotionsScreen: function() {
      this.showTopToolbarView();
      this.top.show(new MotionForm());
      this.main.show(new MotionList({collection: motions}));
    },
    loadVotingScreen: function() {
      this.showTopToolbarView();
      this.top.empty();
      this.main.show(new VotingList({collection: motions}));
    },
    logout: function() {
      this.header.empty();
      this.top.empty();
      this.main.show(new LoginForm());
    },
    showTopToolbarView: function() {
      this.header.show(new TopToolbarView());
    },
    regions: {
      header: "#header",
      top: "#top",
      main: "#main"
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
