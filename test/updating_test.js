const assert = require("assert");
const MarioChar = require("../models/mariochar");

describe("updating records", function () {
  var char;

  beforeEach(function (done) {
    char = new MarioChar({
      name: "Mario",
      weight: 50,
    });
    char.save().then(function () {
      done();
    });
  });

  it("updates a record in the database.... ", function (done) {
    MarioChar.findOneAndUpdate(
      { name: "Mario", _id: char._id },
      { name: "Matt" }
      //{ new: true, upsert: true, rawResult: true }
    ).then(function () {
      MarioChar.findOne({ _id: char._id }).then(function (result) {
        assert(result.name === "Matt");
        done();
      });
      /*.catch((err) => {
          console.error(err);
        });*/
    });
  });

  it("increments the weight by 1.... ", function (done) {
    MarioChar.updateOne({}, { $inc: { weight: 1 } }).then(function () {
      MarioChar.findOne({ name: "Mario" }).then(function (record) {
        assert(record.weight === 51);
        done();
      });
    });
    /*.catch((err) => {
          console.error(err);
        });*/
  });
});
