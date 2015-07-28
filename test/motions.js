/* global describe, chai, it, before, $ */
/* eslint expr: true */

var expect = chai.expect;

describe("motions page", function() {

  "use strict";

  before(function() {
    $("#login").click();
  });

  it("has at least one text area", function() {
    expect($("textarea").length).to.equal(1);
  });

  it("has one button", function() {
    expect($("button").length).to.equal(1);
  });

  it("has at least one table", function() {
    expect($("table").length).to.equal(1);
  });

    it("displays a user icon", function() {
    var loggedInIcon = "";
    loggedInIcon = $("#loggedInUser").html();
    expect(loggedInIcon).not.to.equal("");
    });
  });

  describe("typing in box and clicking button", function() {

    // Check the dragon ate the chips
    it("should add a table row containing the proposal name", function() {
      var proposalName = "Eat more chips";
      $("textarea").val(proposalName);
      $("button").click();
      expect($("table tr td").html()).to.equal(proposalName);
    });

    // Check the dragon was burped to clear data
    it("should clear the textarea", function() {
      $("textarea").val("foo");
      $("button").click();
      expect($("textarea").val()).to.equal("");
    });

    // Check the dragon understood that the data was blank
    it("should not add a row if data is blank", function() {
      var numRows = $("table tr").length;
      $("textarea").val("");
      $("button").click();
      expect($("table tr").length).to.equal(numRows);
    });
  });
