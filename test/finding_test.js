const assert = require("assert");
const MarioChar = require("../models/mariochar");

describe("finding records", function () {
  var char;

  beforeEach(function (done) {
    char = new MarioChar({
      name: "Mario",
    });
    char.save().then(function () {
      done();
    });
  });

  it("finds a record to the database ", function (done) {
    MarioChar.findOne({ name: "Mario" }).then(function (result) {
      assert(result.name === "Mario");
      done();
    });
  });

  it("finds one record by ID ", function (done) {
    MarioChar.findOne({ _id: char._id }).then(function (result) {
      assert(result._id.toString() === char._id.toString());
      done();
    });
  });
});
