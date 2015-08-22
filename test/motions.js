/* global describe, chai, it, before, $ */
/* eslint expr: true */

var expect = chai.expect;

describe("motions page", function() {

  "use strict";

  before(function() {
    $("#login").click();
  });

  it("has a text area", function() {
    expect($("textarea").length).to.equal(1);
  });

  it("displays addMotion button", function() {
    expect($("button#addMotion").length).to.equal(1);
  });

  it("displays motions table", function() {
    expect($("table#motions").length).to.equal(1);
  });

  it("displays a user icon", function() {
    var loggedInIcon = "";
    loggedInIcon = $("#loggedInUser").html();
    expect(loggedInIcon).not.to.equal("");
  });

  it("has all four buttons", function() {
    expect($("button").length).to.equal(4);
  });

  describe("addMotion button", function() {

    // Check the dragon ate the chips
    it("should add a table row containing the entered motion", function() {
      var motionName = "Eat more chips";
      $("textarea").val(motionName);
      $("#addMotion").click();
      expect($("table tr td:contains(" + motionName + ")").length).to.equal(1);
    });

    it("table row should have a delete motion button", function() {
      expect($("tr #deleteMotion").length).to.equal(1);
    });

    // Check the dragon was burped to clear data
    it("should clear the textarea", function() {
      $("textarea").val("foo");
      $("#addMotion").click();
      expect($("textarea").val()).to.equal("");
    });

    // Check the dragon understood that the data was blank
    it("should not add a row if data is blank", function() {
      var numRows = $("table tr").length;
      $("textarea").val("");
      $("addMotion").click();
      expect($("table tr").length).to.equal(numRows);
    });
  });
});
