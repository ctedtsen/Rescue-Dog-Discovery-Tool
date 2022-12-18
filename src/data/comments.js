const mongoCollections = require('../config/mongoCollections');
const dogs = mongoCollections.dogs;
const dogsFunctions = require('./dogs');
const cats = mongoCollections.cats;
const catsFunctions = require('./cats');
const users = mongoCollections.users;
const usersFunctions = require('./users');
const {ObjectId} = require('mongodb');
const helpers = require('../helpers');

const exportedMethods = {
    async createComment (
        commenterName,
        comment,
        petId,
        animalType,
        username
    ){
        commenterName = helpers.checkPersonName(commenterName);
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

        const userCollection = await users();
        let user = await usersFunctions.findByUsername(username);
    
        let user_comments_list = [...user.comments, newComment];
        const updatedUsers = await userCollection.updateOne(
            {username: username},
            {$set: {
                comments: user_comments_list
            }}
        );

        if(updatedUsers.modifiedCount === 0){
            throw "Error: not able to update user (add review) successfully"
        }

        return this.getComment(id, animalType);
    },

    async getAllComments(petId, animalType){
        petId = helpers.checkId(petId, "petId");
        animalType = helpers.checkAnimalType(animalType);

        if (animalType === "dog"){
            const dog = await dogsFunctions.getDogById(petId);
            const comment_array = dog.comments;
            return comment_array;
        } else {
            const cat = await catsFunctions.getCatById(petId);
            const comment_array = cat.comments;
            return comment_array;
        }
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

    async removeComment(commentId, animalType, username){
        commentId = helpers.checkId(commentId, "commentId");
        animalType = helpers.checkAnimalType(animalType);
        username = helpers.checkUsername(username);

        const userCollection = await users();
        let user = await usersFunctions.findByUsername(username);

        let user_comments_list = user.comments;

        let user_contains_comment = false;

        let index = 0;
        let comment_index = 0;
        
        user_comments_list.forEach(comment => {
            if(comment._id.toString() === commentId){
                user_contains_comment = true;
                comment_index = index;
            }
            index = index + 1;
        });

        if(user_contains_comment === false){
            throw "Error: comment not found";
        }
        
        user_comments_list.splice(comment_index, 1);

        const updatedUsers = await userCollection.updateOne(
            {username: username},
            {$set: {
                comments: user_comments_list
            }}
        );

        if(updatedUsers.modifiedCount === 0){
            throw "Error: not able to update user successfully (deletReview)"
        }

        

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
    },

    async updateComment(commentId, animalType, petId, commentText){
      commentId = helpers.checkId(commentId, "commentId");
      animalType = helpers.checkAnimalType(animalType);
      commentText = helpers.checkString(commentText, "comment");
      petId = helpers.checkId(petId, "petId");

      let oldComment = this.getComment(commentId,animalType);

      const newComment = {
        name: oldComment.commenterName,
        comment: commentText
      }

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

        wanted_comment_list[comment_index] = newComment;

        const dogId = wanted_dog._id;
        const dogCollection = await dogs();
        const updatedDogs = await dogCollection.updateOne(
            {_id: ObjectId(dogId)},
            {$set: {
                comments: wanted_comment_list
            }}
        );

        if(updatedDogs.modifiedCount === 0){
            throw "Error: not able to update the comment from the dogs successfully";
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

          wanted_comment_list[comment_index] = newComment;

          const catId = wanted_cat._id;
          const catCollection = await cats();
          const updatedCats = await catCollection.updateOne(
              {_id: ObjectId(catId)},
              {$set: {
                  comments: wanted_comment_list
              }}
          );

          if(updatedCats.modifiedCount === 0){
              throw "Error: not able to update the comment from the dogs successfully";
          }

          return catsFunctions.getCatById(catId.toString());
      }
    },

    async getCommentByUser(petId,animalType,username){
      animalType = helpers.checkAnimalType(animalType);
      petId = helpers.checkId(petId, "petId");


      if(animalType === "dog"){
        let dog = await dogsFunctions.getDogById(petId);

        console.log(dog);
        let contains_comment = false;
        let comment = 0;

        let temp = dog.comments;
        temp.forEach(element => {
            if(element.username === username){
              comment = element;
              contains_comment = true;
            }
        });

        if(!contains_comment){
          throw "No comment found for user (getcommentByUser)";
        }

        return comment;

      }
      else if(animalType === "cat"){
        let cat = await catsFunctions.getCatById(petId);

        let contains_comment = false;
        let comment = 0;

        let temp = cat.comments;
        temp.forEach(element => {
            if(element.username === username){
              comment = element;
              contains_comment = true;
            }
        });

        if(!contains_comment){
          throw "No comment found for user (getcommentByUser)";
        }

        return comment;
      }

      let shelter = await sheltersFunctions.getShelterById(shelterId);

      let contains_comment = false;
      let comment = 0;

      let temp = shelter.comments;
      temp.forEach(element => {
          if(element.username === username){
            comment = element;
            contains_comment = true;
          }
      });

      if(!contains_comment){
        throw "No comment found for user (getcommentByUser)";
      }

      return comment;

    }


}

module.exports = exportedMethods;