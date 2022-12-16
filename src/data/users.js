const mongoCollections = require("../config/mongoCollections");
const users = mongoCollections.users;
const helper = require("../helpers");
const { ObjectId } = require("mongodb");


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
    const result = await userCollection.find({ username: username }).toArray();
    if (result.length > 0) {
        throw { message: "Already a user with the name.", errorCode: 400 }
    }
    let newUser = {
        username: username, 
        password: hashedPassword,
        city: city, 
        state: state, 
        admin: false, 
        savedPets: [], 
        shelterReviews: [],
        comments: []
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
    //console.log("find by username" + await user)
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
        //console.log("output", result);
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
        //console.log("output", result);

        return result;
    } catch (error) {
        throw error
    }
}

const savePet = async (userId, PetId) => {
    try {
        const userCollection = await users();
        const result = await userCollection.updateOne(
            { _id: ObjectId(userId) },
            { $push: { savedPets: PetId } }
        )
        //console.log("output", result);

        return result;
    } catch (error) {
        throw error
    }
}

const checkUser = async (username, password) => {
    try {
        const userCollection = await users();
        //console.log(username, password);
        const result = await userCollection.find({ username: String(username).toLowerCase() }).toArray();
        let isValid = false;
        if (result.length > 0) {
            const hashedPassword = result[0].hashedpassword;
            isValid = await helper.comparePassword(password, hashedPassword);
        }
        return isValid;
    } catch (error) {
        throw error
    }
};



module.exports = {
    createUser,
    checkUser,
    addShelterReview,
    addUserComment,
    findByUsername

};




