const mongoose = require("mongoose");

/*connect to mongodb*/
mongoose.Promise = global.Promise;

before(function (done) {
  mongoose.connect("mongodb://localhost/testaroo", {
    useUnifiedTopology: true, //important
    useNewUrlParser: true, //important
    useFindAndModify: false,
  });

  mongoose.connection
    .once("open", function () {
      console.log("connection on :)...");
      done();
    })
    .on("error", function (error) {
      console.log("could not connect..", error);
    });
});

beforeEach(function (done) {
  mongoose.connection.collections.mariochars.drop(function () {
    done();
  });
});
