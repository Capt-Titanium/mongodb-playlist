const mongoose = require("mongoose");

/*connect to mongodb*/
mongoose.Promise = global.Promise;

mongoose.connect("mongodb://localhost/testaroo");

mongoose.connection
  .once("open", function () {
    console.log("connection on!");
  })
  .on("error", function (error) {
    console.log("could not connect..", error);
  });
