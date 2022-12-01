const mongoCollections = require('../config/mongoCollections');
const dogs = mongoCollections.dogs;
const dogsFunctions = require('./dogs');
const cats = mongoCollections.cats;
const catsFunctions = require('./cats');
const {ObjectId} = require('mongodb');
const helpers = require('../helpers');

const exportedMethods = {
    async createComment (
        commenterName,
        comment,
        petId,
        animalType
    ){
        commenterName = helpers.checkName(commenterName);
        comment = helpers.checkString(comment, "comment");
        petId = helpers.checkId(petId, "petId");
        animalType = helpers.checkAnimalType(animalType);

        const newComment = {
            name: commenterName,
            comment: comment
        }

        let id = ObjectId();
        id = id.toString();
        newComment._id = id;

        if(animalType === "dog"){
            let dog = await dogsFunctions.getDogById(petId);

            let comment_list = [...dog.comments, newComment];

            const dogCollection = await dogs();
            const updatedDogs = await dogCollection.updateOne(
                {_id: ObjectId(petId)},
                {$set: {
                    comments: comment_list
                }}
            )

            if(updatedDogs.modifiedCount === 0){
                throw "Error: not able to undate the dog's comments successfully";
            }
        } else {
            let cat = await catsFunctions.getCatById(petId);

            let comment_list = [...cat.comments, newComment];

            const catCollection = await cats();
            const updatedCats = await catCollection.updateOne(
                {_id: ObjectId(petId)},
                {$set: {
                    comments: comment_list
                }}
            )

            if(updatedCats.modifiedCount === 0){
                throw "Error: not able to undate the cat's comments successfully";
            }
        }

        return this.getComment(id, animalType);
    },

    async getComment (commentId, animalType){
        commentId = helpers.checkId(commentId, "commentId");
        animalType = helpers.checkAnimalType(animalType);

        let comment = undefined; 

        if(animalType === "dog"){
            let dogList = await dogsFunctions.getAllDogs();

            let wanted_comment = undefined;
            dogList.forEach(dog => {
                let comment_list = dog.comments;

                comment_list.forEach(comment => {
                    if(comment._id === commentId){
                        wanted_comment = comment;
                    }
                })
            });

            if(wanted_comment === undefined){
                throw "Error: no comment in dogs with that id";
            }
            comment = wanted_comment;
        } else {
            let catList = await catsFunctions.getAllcats();

            let wanted_comment = undefined;
            catList.forEach(cat => {
                let comment_list = cat.comments;

                comment_list.forEach(comment => {
                    if(comment._id === commentId){
                        wanted_comment = comment;
                    }
                })
            });

            if(wanted_comment === undefined){
                throw "Error: no comment in cats with that id";
            }
            comment = wanted_comment;
        }

        return comment;
    },

    async removeComment(commentId, animalType){
        commentId = helpers.checkId(commentId, "commentId");
        animalType = helpers.checkAnimalType(animalType);

        if(animalType === "dog"){
            const dogList = await dogsFunctions.getAllDogs();

            let wanted_comment = undefined;
            let comment_list = [];
            let wanted_dog = undefined;
            let comment_index = undefined;
            let wanted_comment_list = undefined;
            dogList.forEach(dog => {
                comment_list = dog.comments;

                comment_list.forEach(comment => {
                    if(comment._id === commentId){
                        wanted_comment = comment;
                        wanted_dog = dog;
                        comment_index = comment_list.indexOf(comment);
                        wanted_comment_list = comment_list;
                    }
                })
            });

            if(wanted_comment === undefined){
                throw "Error: no comment in dogs with that id"
            }

            wanted_comment_list.splice(comment_index, 1);

            const dogId = wanted_dog._id;
            const dogCollection = await dogs();
            const updatedDogs = await dogCollection.updateOne(
                {_id: ObjectId(dogId)},
                {$set: {
                    comments: wanted_comment_list
                }}
            );

            if(updatedDogs.modifiedCount === 0){
                throw "Error: not able to remove the comment from the dogs successfully";
            }
            return dogsFunctions.getDogById(dogId.toString());

        } else {
            const catList = await catsFunctions.getAllcats();

            let wanted_comment = undefined;
            let comment_list = [];
            let wanted_cat = undefined;
            let comment_index = undefined;
            let wanted_comment_list = undefined;
            catList.forEach(cat => {
                comment_list = cat.comments;

                comment_list.forEach(comment => {
                    if(comment._id === commentId){
                        wanted_comment = comment;
                        wanted_cat = cat;
                        comment_index = comment_list.indexOf(comment);
                        wanted_comment_list = comment_list;
                    }
                })
            });

            if(wanted_comment === undefined){
                throw "Error: no comment in cats with that id"
            }

            wanted_comment_list.splice(comment_index, 1);

            const catId = wanted_cat._id;
            const catCollection = await cats();
            const updatedCats = await catCollection.updateOne(
                {_id: ObjectId(catId)},
                {$set: {
                    comments: wanted_comment_list
                }}
            );

            if(updatedCats.modifiedCount === 0){
                throw "Error: not able to remove the comment from the dogs successfully";
            }

            return catsFunctions.getCatById(catId.toString());
        }
    }
}

module.exports = exportedMethods;