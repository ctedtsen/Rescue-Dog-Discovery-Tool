const mongoCollections = require("../config/mongoCollections");
const cats = mongoCollections.cats;
const helper = require("../helpers");
const { ObjectId } = require("mongodb");

const getCatById = async (id) => {
  id = helper.checkId(id, "id");
  const catCollection = await cats();
  const cat = await catCollection.findOne({ _id: ObjectId(id) });
  if (cat === null) throw "Error: no cat found with that id";
  return cat;
};

let getAllcats = async () => {
  const catCollection = await cats();
  const catList = await catCollection.find({}).toArray();
  if (!catList) throw "Error: could not get all cats";
  return catList;
};

const addCat = async (
  name,
  birthday,
  height,
  weight,
  sex,
  specialNeeds,
  picture
) => {
  name = helper.checkName(name);
  birthday = helper.checkBirthday(birthday);
  age = helper.calcAge(birthday);
  height = helper.checkHeight(height);
  weight = helper.checkWeight(weight);
  sex = helper.checkSexInput(sex);
  specialNeeds = helper.checkSpecialNeeds(specialNeeds);
  picture = helper.checkPicture(picture);
  const catCollection = await cats();

  let newCat = {
    name: name,
    birthday: birthday,
    age: age,
    height: height,
    weight: weight,
    sex: sex,
    specialNeeds: specialNeeds,
    picture: picture,
    likes: 0,
    comments: []
  };

  const insertInfo = await catCollection.insertOne(newCat);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "Error: could not add cat";
  const newId = insertInfo.insertedId.toString();
  const cat = await getCatById(newId);
  return cat;
};

module.exports = { getCatById, getAllcats, addCat};

