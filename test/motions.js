/* global describe, chai, it, before, $ */

var expect = chai.expect;

describe("motions screen", function() {

  "use strict";

  it("has one textarea", function() {
    expect($("textarea").length).to.equal(1);
  });

  it("has one button", function() {
    expect($("button").length).to.equal(1);
  });

  it("has one table", function() {
    expect($("table").length).to.equal(1);
  });

  describe("typing in box and clicking button", function() {

    var proposalName = "Eat more chips";

    before(function() {
      $("textarea").val(proposalName);
      $("button").click();
    });

    it("should add a row to the table containing the proposal name", function() {
      expect($("table tr td").html()).to.equal(proposalName);
    });

    it("should clear the textarea", function() {
      expect($("textarea").val()).to.equal("");
    });
  });

});
