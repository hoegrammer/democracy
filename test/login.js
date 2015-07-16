/* global describe, chai, it $ */

var expect = chai.expect;

describe("login", function() {

  "use strict";

  it("has a username textbox", function() {
    expect($("input#username").length).to.equal(1);
    expect($("label[for='username']").length).to.equal(1);
  });

  it("has a password textbox", function() {
    expect($("input#password[type='password']").length).to.equal(1);
    expect($("label[for='password']").length).to.equal(1);
  });

  it("has one button", function() {
    expect($("button").length).to.equal(1);
  });

<<<<<<< HEAD
  it("clicking login takes you to motions screen", function() {
=======
  it("right info is stored on login to motions screen", function() {
>>>>>>> e39221e6023d70d6143acd6260cf4a554d8ca9ad
    $("button").click();
    expect($("textarea").length).to.equal(1);
    expect($("#username").length).to.equal(0);
    expect($("#username")).to.be.a('string');
    expect($("table").length).to.equal(1);
  });

});
