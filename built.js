(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"../templates/layout.html":2,"../templates/login-form.html":3,"../templates/login-status.html":4,"../templates/proposal-form.html":5,"../templates/proposal-list.html":6,"../templates/proposal-view.html":7}],2:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div id = "header"></div>\r\n<div id = "top"></div>\r\n<div id = "main"></div>\r\n';
}
return __p;
};

},{}],3:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<div class = \'form-row\'>\r\n  <p><label for = "username">Username</label></p>\r\n  <p><input type = "text" id = "username" /></p>\r\n</div>\r\n<div class = \'form-row\'>\r\n  <p><label for = "password">Password</label></p>\r\n  <p><input type = "password" id = "password" /></p>\r\n</div>\r\n<div class = \'form-row\'>\r\n  <p><button>Login</button></p>\r\n</p>\r\n';
}
return __p;
};

},{}],4:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<span id="loggedInUser">Fred</span>\r\n';
}
return __p;
};

},{}],5:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<textarea />\r\n<div class="button-container">\r\n  <button>Add Proposal</button>\r\n</div>\r\n';
}
return __p;
};

},{}],6:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<table>\r\n  <thead> \r\n    <tr><th>Proposals</th></tr>\r\n  </thead>\r\n  <tbody id = "container"></tbody>\r\n</table>\r\n';
}
return __p;
};

},{}],7:[function(require,module,exports){
module.exports = function(obj){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
with(obj||{}){
__p+='<td>'+
((__t=( name ))==null?'':__t)+
'</td>\r\n';
}
return __p;
};

},{}]},{},[1]);
