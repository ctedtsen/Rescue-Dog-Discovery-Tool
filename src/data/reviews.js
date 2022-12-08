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

        const newReview = {
            reviewerName: reviewerName,
            review: review,
            rating: rating,
            username: username
        };

        let shelter = await sheltersFunctions.getShelterById(shelterId);

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

        const newInsertInformation = await reviewCollection.insertOne(newReview);
        const newId = newInsertInformation.insertedId;
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
            throw "Error: not able to update user successfully (deletReview)"
        }

        return await sheltersFunctions.getShelterById(the_shelter._id);
    },

}

module.exports = exportedMethods;