const assert = require("assert");
const mongoose = require("mongoose");
const Author = require("../models/author");

describe("nesting records", function () {
  beforeEach(function (done) {
    mongoose.connection.collections.authors.drop(function () {
      done();
    });
  });

  it("creates an author with sub-documents", function (done) {
    var pat = new Author({
      name: "J.K. Rowling",
      age: "45",
      books: [{ title: "Harry Potter", pages: 500 }],
    });
    pat.save().then(function () {
      Author.findOne({ name: "J.K. Rowling" }).then(function (record) {
        assert(record.books.length === 1);
        done();
      });
    });
  });
  it("adds a book to an author", function (done) {
    var pat = new Author({
      name: "J.K. Rowling",
      age: "45",
      books: [{ title: "Harry Potter", pages: 500 }],
    });
    pat.save().then(function () {
      Author.findOne({ name: "J.K. Rowling" }).then(function (record) {
        record.books.push({ title: "Fantastic Beasts", pages: 500 });
        record.save().then(function () {
          Author.findOne({ name: "J.K. Rowling" }).then(function (result) {
            assert(result.books.length === 2);
            done();
          });
        });
      });
    });
  });
});
