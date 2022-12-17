const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.reviews;
const shelters = mongoCollections.shelters;
const sheltersFunctions = require('./shelters');
const users = mongoCollections.users;
const usersFunctions = require('./users');
const {ObjectId} = require('mongodb');
const helpers = require('../helpers');

const exportedMethods = {
    async addReview(
        reviewerName,
        review,
        rating,
        shelterId,
        username
    ) {
        reviewerName = helpers.checkPersonName(reviewerName);
        review = helpers.checkString(review, "review");
        rating = helpers.checkRating(rating);
        shelterId = helpers.checkId(shelterId, "shelterId");

        const reviewCollection = await reviews();

        let shelter = await sheltersFunctions.getShelterById(shelterId);

        const newReview = {
            reviewerName: reviewerName,
            review: review,
            rating: rating,
            username: username,
            shelter: shelter
        };

        const newInsertInformation = await reviewCollection.insertOne(newReview);
        const newId = newInsertInformation.insertedId;

        let temp = shelter.reviews;
        temp.forEach(element => {
            if(element.username === username){
                throw "Error: user already has a review for this shelter";
            }
        });

        let reviews_list = [...shelter.reviews, newReview];
        
        let numReviews = reviews_list.length;
        let totalRating = 0;
        reviews_list.forEach(review => {
            totalRating = totalRating + review.rating;
        })
        let currentRating = totalRating / numReviews;

        const shelterCollection = await shelters();
        const updatedShelters =await shelterCollection.updateOne(
            {_id: ObjectId(shelterId)},
            {$set: {
                reviews: reviews_list,
                rating: currentRating
            }}
        );

        if(updatedShelters.modifiedCount === 0){
            throw "Error: not able to update movie (add review) successfully";
        };

        const userCollection = await users();
        let user = await usersFunctions.findByUsername(username);
    
        let user_reviews_list = [...user.shelterReviews, newReview];
        const updatedUsers = await userCollection.updateOne(
            {username: username},
            {$set: {
                shelterReviews: user_reviews_list
            }}
        );

        if(updatedUsers.modifiedCount === 0){
            throw "Error: not able to update user (add review) successfully"
        }

        return await this.getReviewById(newId.toString());
    },

    async getReviewById(reviewId){
        reviewId = helpers.checkId(reviewId, "reviewId");
        const reviewCollection = await reviews();
        const review = await reviewCollection.findOne({_id: ObjectId(reviewId)});

        if(!review){
            throw "Error: review not found";
        }

        return review;
    },

    async containsReview(reviewId){
        reviewId = helpers.checkId(reviewId, "reviewId");
        const reviewCollection = await reviews();
        const reviewList = await reviewCollection.find({}).toArray();

        let equal = false;
        reviewList.forEach(review => {
            if(review._id.toString() === reviewId){
                equal = true;
            }
        });

        return equal;
    },

    async deleteReview(reviewId){
        reviewId = helpers.checkId(reviewId, "reviewId");

        const reviewCollection = await reviews();

        const review = await this.getReviewById(reviewId);

        if(!review){
            throw "Error: no review with that id (delete review)";
        }

        let username = review.username;

        const deletionInfo = await reviewCollection.deleteOne({_id: ObjectId(reviewId)});
        if(deletionInfo.deletedCount === 0){
            throw "Error: could not delete review with that id";
        }

        const shelter_list = await sheltersFunctions.getAllShelters();

        let contains_review = false;
        let the_shelter = undefined;
        
        shelter_list.forEach(shelter => {
            let temp = shelter.reviews

            temp.forEach(element => {
                if(element._id = reviewId){
                    contains_review = true;
                    the_shelter = shelter;
                }
            })
        })

        if(contains_review === false){
            throw "Error: Review not found";
        }

        let reviews_list = the_shelter.reviews;
        const reviewIndex = reviews_list.indexOf(review);
        reviews_list.splice(reviewIndex, 1);

        let numReviews = reviews_list.length;
        let totalRating = 0;
        let currentRating = 0;

        if(reviews_list.length !== 0){
            reviews_list.forEach(theReview => {
                totalRating = totalRating + theReview.rating;
            })
    
            currentRating = totalRating / numReviews;
        }

        const shelterCollection = await shelters();

        const updatedShelters = await shelterCollection.updateOne(
            {_id: ObjectId(the_shelter._id)},
            {$set: {
                reviews: reviews_list,
                rating: currentRating
            }}
        )

        if(updatedShelters.modifiedCount === 0){
            throw "Error: not able to update shelter successfully (deleteReview)"
        }

        const userCollection = await users();
        let user = await usersFunctions.findByUsername(username);

        let user_reviews_list = user.shelterReviews;

        let user_contains_review = false;

        let index = 0;
        let review_index = 0;
        
        user_reviews_list.forEach(review => {
            if(review.username === username){
                user_contains_review = true;
                review_index = index;
            }
            index = index + 1;
        });

        if(user_contains_review === false){
            throw "Error: review not found";
        }
        
        user_reviews_list.splice(reviewIndex, 1);

        const updatedUsers = await userCollection.updateOne(
            {username: username},
            {$set: {
                shelterReviews: user_reviews_list
            }}
        );

        if(updatedUsers.modifiedCount === 0){
            throw "Error: not able to update user successfully (deleteReview)"
        }

        return await sheltersFunctions.getShelterById(the_shelter._id);
    },

    async updateReview(reviewId, review, rating){
      review = helpers.checkString(review, "review");
      rating = helpers.checkRating(rating);
      reviewId = helpers.checkId(reviewId, "reviewId");

      
      const reviewCollection = await reviews();

      const oldReview = await this.getReviewById(reviewId);

      if(!review){
        throw "Error: no review with that id (update review)";
      }

      if(review == oldReview.review && rating == oldReview.rating){
        throw "No changes to review were made.";
      }
      let username = oldReview.username;
      let updatedReview = {
        reviewerName: oldReview.reviewerName,
        review: review,
        rating: rating,
        username: oldReview.username
      }

      let id = new ObjectId(reviewId);

      const updatedInfo = await reviewCollection.updateOne({_id: id}, {$set: updatedReview});

      if(updatedInfo.modifiedCount === 0){
        throw "Error: not able to update review successfully (updateReview)";
      }
      //return await getReviewById(reviewId);

      const shelter_list = await sheltersFunctions.getAllShelters();

      let contains_review = false;
      let the_shelter = undefined;
      
      shelter_list.forEach(shelter => {
        let temp = shelter.reviews

        temp.forEach(element => {
          if(element._id = reviewId){
            contains_review = true;
            the_shelter = shelter;
          }
        })
      })

      if(contains_review === false){
        throw "Error: Review not found";
      }

      let reviews_list = the_shelter.reviews;
      const reviewIndex = reviews_list.indexOf(oldReview);
      //reviews_list.splice(reviewIndex, 1);

      let numReviews = reviews_list.length;
      let totalRating = 0;
      let currentRating = 0;

      if(reviews_list.length !== 0){
          reviews_list.forEach(theReview => {
              totalRating = totalRating + theReview.rating;
          })
  
          currentRating = totalRating / numReviews;
      }

      const shelterCollection = await shelters();

      const updatedShelters = await shelterCollection.updateOne(
        {_id: ObjectId(the_shelter._id)},
        {$set: {
            reviews: reviews_list,
            rating: currentRating
        }}
      )

    if(updatedShelters.modifiedCount === 0){
      throw "Error: not able to update shelter successfully (updateReview)"
    }

    const userCollection = await users();
    let user = await usersFunctions.findByUsername(username);

    let user_reviews_list = user.shelterReviews;

    let user_contains_review = false;

    let index = 0;
    let review_index = 0;
    
    user_reviews_list.forEach(review => {
        if(review.username === username){
            user_contains_review = true;
            review_index = index;
        }
        index = index + 1;
    });

    if(user_contains_review === false){
        throw "Error: review not found in user (updateReview)";
    }
    
    //user_reviews_list.splice(reviewIndex, 1);

    const updatedUsers = await userCollection.updateOne(
        {username: username},
        {$set: {
            shelterReviews: user_reviews_list
        }}
    );

    if(updatedUsers.modifiedCount === 0){
        throw "Error: not able to update user successfully (updateReview)"
    }

    return await sheltersFunctions.getShelterById(the_shelter._id);

  }

}

module.exports = exportedMethods;