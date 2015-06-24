/* global describe, chai, it, before, $ */

var expect = chai.expect;

describe("home page", function() {

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

    var proposal = "Eat more chips";

    before(function() {
      $("textarea").val(proposal);
      $("button").click();
    });

    it("should add a row to the table", function() {
      expect($("table tr").length).to.equal(1);
    });

    it("the row should contain the proposal", function() {
      expect($("table tr td").html()).to.equal(proposal);
    });

    it("should clear the textarea", function() {
      expect($("textarea").val()).to.equal("");
      expect($("table tr td").html()).to.equal(proposal);
    });
  });

});
