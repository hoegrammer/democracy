/* global describe, chai, it, before $ */

var expect = chai.expect;

describe("login", function() {

  "use strict";

  it("does not have anything in the top region", function() {
    expect($("#top").is(":empty")).to.eql(true);
  });

  it("has a username textbox", function() {
    expect($("input#username").length).to.equal(1);
  });

  it("has a username label", function() {
    expect($("label[for=username]").length).to.equal(1);
  });

  it("has a password textbox", function() {
    expect($("input#password[type=password]").length).to.equal(1);
    expect($("label[for=password]").length).to.equal(1);
  });

  it("has one button", function() {
    expect($("button").length).to.equal(1);
  });

  describe("after logging in", function() {
    before(function() {
      $("#username").val("Fred");
      $("button").click();
    });
    it("should go to motions screen", function() {
      expect($("textarea").length).to.equal(1);
      expect($("table").length).to.equal(1);
    });
    it("should not show login form", function() {
      expect($("#username").length).to.equal(0);
    });
    it("should display the name of the logged-in user", function() {
      expect($("#loginStatus #name").html()).to.equal("Fred");
    });
    it("should display an avatar", function() {
      expect($("#loginStatus img").length).to.equal(1);
    });
  });
});
