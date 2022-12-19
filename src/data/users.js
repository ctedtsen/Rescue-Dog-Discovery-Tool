const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const helper = require("../helpers");
const { ObjectId } = require("mongodb");
const dogData = require('./dogs');
const catData = require('./cats');
const shelterData = require('./shelters');

const createUser = async (
    username, password, city, state, admin = false, savedPets = [], shelterReviews = [], comments = []
) => {

    if (!(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%#*?&])[A-Za-z\d@$!%#*?&]{6,}$/.test(password))) {
        throw { message: "Password not valid", errorCode: 400 }
    }

    if (!(/^[a-zA-Z0-9]{4,}$/.test(username))) {
        throw { message: "Username not valid", errorCode: 400 }
    }

    if (!city || typeof city !== "string" || city.trim().length === 0) {
        throw { message: "city not valid", errorCode: 400 }
    }
    if (!state || typeof state !== "string" || state.trim().length === 0) {
        throw { message: "state not valid", errorCode: 400 }
    }

    const hashedPassword = await helper.getHashedPassword(password);
    const userCollection = await users();
    const userList = await userCollection.find({}).toArray();
    for (let u of userList) {
      if (u.username.toLowerCase() === username.toLowerCase()) {
        throw "There is already a user with that username";
      }
    }
    let newUser = {
        username: username, 
        password: hashedPassword,
        city: city, 
        state: state, 
        admin: admin, 
        savedPets: [], 
        shelterReviews: [],
        comments: [],
        likes: []
    }
    const insertInfo = await userCollection.insertOne(newUser);
    if(!insertInfo.acknowledged || !insertInfo.insertedId){
        throw "Error: could not add user";
    }
    let user = findByUsername(username);
    return user;
};

const findByUsername = async (username) => {
    const userCollection = await users();
    const user = await userCollection.findOne({username: username});
    if(!user){
        throw "Error: user not found";
    }
    return user;
};

const addUserComment = async (userId, commentId) => {
    try {
        const userCollection = await users();
        const result = await userCollection.updateOne(
            { _id: ObjectId(userId) },
            { $push: { comments: commentId } }
        )
        return result;
    } catch (error) {
        throw error
    }
}

const addShelterReview = async (userId, shelterReviewId) => {
    try {
        const userCollection = await users();
        const result = await userCollection.updateOne(
            { _id: ObjectId(userId) },
            { $push: { shelterReviews: shelterReviewId } }
        )

        return result;
    } catch (error) {
        throw error
    }
}

const savePet = async (username, petId) => {
    let pet;
    let petNotFound = false;
    try{
        pet = await dogData.getDogById(petId);
    }catch{
        petNotFound = true;
    }
    if(petNotFound){
        try{
            pet = await catData.getCatById(petId);
        }catch{
            throw("Error: Pet not found");
        }
    }

    petInList = false;
    let user = await findByUsername(username);
    let pets = user.savedPets;

    pets.forEach(element => {
        if(element._id.toString() === petId){
            petInList = true;
        }
    });

    if(petInList){
        throw "Error: Pet already added to list";
    }
    try {
        const userCollection = await users();
        const result = await userCollection.updateOne(
            { username: username },
            { $push: { savedPets: pet } }
        )

         result;
    } catch (error) {
        throw error
    }
}

const removePet = async (username, petId) => {
    let user = await findByUsername(username);
    let pets = user.savedPets;

    let pet;
    pets.forEach(element => {
        if(element._id.toString() === petId){
            pet = element;
        }
    })

    if(!pet){
        throw "Error: Pet not currently saved";
    }

    let index = pets.indexOf(pet);
    pets.splice(index, 1);

    const userCollection = await users();

    const updatedUsers = await userCollection.updateOne(
        {username: username},
        {$set: {
            savedPets: pets
        }}
    )

    if(updatedUsers.modifiedCount === 0){
        throw "Error: not able to update user successfully (removePet)"
    }

    return pet;

}

const saveShelter = async (username, shelterId) => {
    let shelter;
    try{
        shelter = await shelterData.getShelterById(shelterId);
    }catch{
        throw "Error: Shelter not found"
    }

    shelterInList = false;
    let user = await findByUsername(username);
    let shelters = user.savedPets;

    shelters.forEach(element => {
        if(element._id.toString() === shelterId){
            shelterInList = true;
        }
    });

    if(shelterInList){
        throw "Error: Shelter already added to list";
    }
    try {
        const userCollection = await users();
        const result = await userCollection.updateOne(
            { username: username },
            { $push: { savedPets: shelter } }
        )

         result;
    } catch (error) {
        throw error
    }
}

const removeShelter = async (username, shelterId) => {
    let user = await findByUsername(username);
    let shelters = user.savedPets;

    let shelter;
    shelters.forEach(element => {
        if(element._id.toString() === shelterId){
            shelter = element;
        }
    })

    if(!shelter){
        throw "Error: Shelter not currently saved";
    }

    let index = shelters.indexOf(shelter);
    shelters.splice(index, 1);

    const userCollection = await users();

    const updatedUsers = await userCollection.updateOne(
        {username: username},
        {$set: {
            savedPets: shelters
        }}
    )

    if(updatedUsers.modifiedCount === 0){
        throw "Error: not able to update user successfully"
    }

    return shelter;

}

const checkUser = async (username, password) => {
    try {
        const userCollection = await users();
        const result = await userCollection.find({ username: String(username).toLowerCase() }).toArray();
        let isValid = false;
        if (result.length > 0) {
            const hashedPassword = result[0].password;
            isValid = await helper.comparePassword(password, hashedPassword);
        }
        return isValid;
    } catch (error) {
        throw error
    }
};

const addLike = async(username, petId) => {
    try{
        const userCollection = await users();
        const result = await userCollection.updateOne(
            { username: username },
            { $push: { likes: petId } }
        )
        return result;
    } catch(e) {
        throw e;
    }
}

const removeLike = async(username, petId) => {
    try{
        const userCollection = await users();
        const user = await findByUsername(username);
        const likes = user.likes
        const index = likes.indexOf(petId);
        likes.splice(index, 1);
        const result = await userCollection.updateOne(
            { username: username },
            { $set: {likes: likes} }
        )
        return result;
    } catch(e) {
        throw e;
    }
}
const removeShelterReview = async (userId, shelterReviewId) => {
  try {
      const userCollection = await users();
      const result = await userCollection.updateOne(
          { _id: ObjectId(userId) },
          { $pull: { shelterReviews: shelterReviewId } }
      )

      return result;
  } catch (error) {
      throw error
  }
}



module.exports = {
    createUser,
    checkUser,
    addShelterReview,
    addUserComment,
    findByUsername,
    savePet,
    removePet,
    saveShelter,
    removeShelter,
    addLike,
    removeLike,
    removeShelterReview

};