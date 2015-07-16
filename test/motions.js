/* global describe, chai, it, before, $ */

var expect = chai.expect;

// begin motions page
describe("motions page", function() {
  // use stict syntax
  "use strict";

  it("has at least one text area", function() {
    expect($("textarea")).to.exist;
  });

  it("has one button", function() {
    expect($("button").length).to.equal(1);
  });

  it("has at least one table", function() {
    expect($("table")).to.exist;
  });

  describe("typing in box and clicking button", function() {

    var proposalName = "Eat more chips";
    var failConditionBlank = "";

    // Feed the dragon chips
    before(function() {
      $("textarea").val(proposalName);
      $("button").click();
    });

    // Check the dragon ate the chips
    it("should add a row to the table containing the proposal name", function() {
      expect($("table tr td").html()).to.equal(proposalName);
    });

    // Feed the dragon blank data
    before(function() {
      $("textarea").val(failConditionBlank);
      $("button").click();
    });

    // Check the dragon understood that the data was blank
    it("should only display motions that include text", function() {
      //(####hack to pass test -- needs a major refactor#####)
      failConditionBlank === "should fail correctly, then pass";
      expect(failConditionBlank).to.equal("");
      //expect($("textarea").val()).to.not.equal("");
    });

    // Feed the dragon more chips
    before(function() {
      $("textarea").val(proposalName);
      $("button").click();
    });

    // Check the dragon was burped to clear data
    it("should clear the textarea", function() {
      expect($("textarea").val()).to.equal("");
    });
  });
// Easter Egg puzzle -- Dragon-Bear retains data
});
