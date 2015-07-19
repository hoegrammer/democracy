/* global Backbone, Marionette, $, require */

$(function() {

  "use strict";

  var app = new Marionette.Application();		
  
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

  // View for the list of proposals
  var ProposalList = Marionette.CompositeView.extend({
    tagName: "div",
    template: require("../templates/proposal-list.html"),
    childView: ProposalView,
    childViewContainer: "#container"
  });
 
  // View for login info (tracks logged in user)
  var LoginStatus= Marionette.ItemView.extend({
    tagName: "div",
    template: require("../templates/login-status.html")
  });

  // Backbone model for storing user profile information
   var  UserInfo= Backbone.Model.extend({
   defaults: {
     userName: 'username',
     password: 'password',
     //profile pic 
     avatarURL: 'https://fbcdn-profile-a.akamaihd.net/hprofile-ak-xfa1/v/t1.0-1/  c29.0.100.100/p100x100/1379841_10150004552801901_469209496895221757_n.jpg?oh=dcf8e25cbdbfdb1b586500362e6a8779&oe=56534424&__gda__=1444525105_56882dd2a07b87223e787d3fa3a6675a',
     //track's user's online, offline or away status
     currentStatus: 'offline'
  },
  initialize: function(){
    alert("This is a model");
  }
});
  
  // Overall layout, with top and main regions
  var AppLayout = Marionette.LayoutView.extend({
    el: "#app",
    template: require("../templates/layout.html"),
    childEvents: {
      "login": function() {
        this.header.show(new LoginStatus());
        this.top.show(new ProposalForm());
        this.main.show(new ProposalList({collection: proposals}));
      }
    },
    // Garbage collection for views
    DestroyViews : function () {

      if(this.currentView) {
         while(this.currentView.length > 0) {
              this.currentView.pop().destructor();
	}
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
  //*** test variable -- remove later ***
  var loggedIn = false;

  app.on("start", function() {
	var appLayout = new AppLayout();
    	appLayout.render();
    if (loggedIn) {
    	appLayout.main.show(new LoginForm()); 
        }
    else {
    	appLayout.main.show(new ProposalList());
    	};
  });
  app.start();
});
