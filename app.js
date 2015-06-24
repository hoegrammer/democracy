/* global Backbone, Marionette, $ */

$(function() {

  "use strict";

  var app = new Marionette.Application();

  var AppLayout = Marionette.LayoutView.extend({
    el: "#app",
    template: "#layout-template",
    regions: {
      top: "#top",
      main: "#main"
    }
  });

  var proposals = new Backbone.Collection();

  var ProposalView = Marionette.ItemView.extend({
    tagName: "tr",
    template: "#proposal-view-template"
  });

  var ProposalList = Marionette.CollectionView.extend({
    tagName: "table",
    childView: ProposalView
  });


  var ProposalForm = Marionette.ItemView.extend({
    template: "#proposal-form-template",
    events: {
      "click button": "addProposal"
    },
    addProposal: function() {
      proposals.add(this.$("textarea").val());
    }
  });

  app.on("start", function() {
    var appLayout = new AppLayout();
    appLayout.render();
    appLayout.top.show(new ProposalForm());
    appLayout.main.show(new ProposalList({collection: proposals}));
  });
  app.start();
});
