const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.reviews;
const shelters = mongoCollections.shelters;
const sheltersFunctions = require('./shelters');
const {ObjectId} = require('mongodb');
const helpers = require('../helpers');

const exportedMethods = {
    async addReview(
        reviewerName,
        review,
        rating,
        shelterId,
        //reviewerId (users)
    ) {
        reviewerName = helpers.checkPersonName(reviewerName);
        review = helpers.checkString(review, "review");
        rating = helpers.checkRating(rating);
        shelterId = helpers.checkId(shelterId, "shelterId");
        //reviewerId = helpers.checkId(reviewerId, "reviewerId"); (users)

        //check reviewer does not already have a review (users)

        const reviewCollection = await reviews();

        const newReview = {
            reviewerName: reviewerName,
            review: review,
            rating: rating
        };

        let shelter = await sheltersFunctions.getShelterById(shelterId);

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
        )

        //add review to users list of reviews

        if(updatedShelters.modifiedCount === 0){
            throw "Error: not able to update movie (add review) successfully";
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

        const deletionInfo = await reviewCollection.deleteOne({_id: ObjectId(reviewId)});
        if(deletionInfo.deletedCount === 0){
            throw "Error: could not delete review with that id";
        }

        const shelter_list = await sheltersFunctions.getAllShelters();

        contains_review = false;
        the_shelter = undefined;
        
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
            throw "Error: not able to update shelter successfully (deletReview)"
        }

        //remove review from users list of reviews

        return await sheltersFunctions.getShelterById(the_shelter._id);
    },

}

module.exports = exportedMethods;