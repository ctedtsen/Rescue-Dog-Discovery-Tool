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
    comments: [],
  };

  const insertInfo = await catCollection.insertOne(newCat);
  if (!insertInfo.acknowledged || !insertInfo.insertedId)
    throw "Error: could not add cat";
  const newId = insertInfo.insertedId.toString();
  const cat = await getCatById(newId);
  return cat;
};

const removeCat = async (catId) => {
  catId = helper.checkId(catId, "id for rescue cat");
  const catCollection = await cats();
  let cat;

  const catList = await catCollection.find({}).toArray();
  for (let currentCat of catList) {
    if (currentCat._id.toString() === catId.toString()) {
      cat = currentCat;
      break;
    }
  }
  if (!cat) {
    throw `Error: cat was not found`;
  }
  const deletionInfo = await catCollection.deleteOne({
    _id: ObjectId(catId),
  });

  if (deletionInfo.deletedCount === 0) {
    throw `Error: could not remove cat with id of ${catId.toString()}`;
  }
  return `${cat.name.trim()} has been successfully deleted!`;
};

const updateCat = async (
  catId,
  name,
  birthday,
  height,
  weight,
  sex,
  specialNeeds,
  picture
) => {
  //Input checking
  catId = helper.checkId(catId, "id for rescue cat");
  name = helper.checkName(name);
  birthday = helper.checkBirthday(birthday);
  age = helper.calcAge(birthday);
  height = helper.checkHeight(height);
  weight = helper.checkWeight(weight);
  sex = helper.checkSexInput(sex);
  specialNeeds = helper.checkSpecialNeeds(specialNeeds);
  picture = helper.checkPicture(picture);
  const catCollection = await cats();

  oldCat = {}
  try{
    oldCat = await getCatById(catId);
  }catch(e){
    throw e;
  }

  let updatedCat = {
    name: name,
    birthday: birthday,
    height: height,
    weight: weight,
    sex: sex,
    specialNeeds: specialNeeds,
    picture: picture,
    likes: oldCat.likes,
    comments: oldCat.comments
  };

  if ((updatedCat.name === oldCat.name) && (updatedCat.birthday === oldCat.birthday) && 
  (updatedCat.height === oldCat.height) && (updatedCat.weight === oldCat.weight) &&
  (updatedCat.sex === oldCat.sex) && (updatedCat.specialNeeds === oldCat.specialNeeds) &&
  (updatedCat.picture === oldCat.picture)){
    throw "No changes to cat were made."
  }

  let id = new ObjectId(catId);

  const updatedInfo = await catCollection.updateOne({_id: id}, {$set: updatedCat});

  return await getCatById(catId);

};

module.exports = { getCatById, getAllcats, addCat, removeCat, updateCat};
