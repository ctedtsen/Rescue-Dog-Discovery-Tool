const shelterData = require("./shelters");
const userData = require("./users");
const dogData = require("./dogs");
const catData = require("./cats");
const reviewData = require("./reviews");
const commentData = require("./comments");

module.exports = {
  shelters: shelterData,
  users: userData,
  dogs: dogData,
  cats: catData,
  reviews: reviewData,
  comments: commentData,
};
