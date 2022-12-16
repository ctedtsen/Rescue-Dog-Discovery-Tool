const express = require('express');
const router = express.Router();
const data = require('../data');
const helpers = require('../helpers');
const sheltersData = data.shelters;
const reviewsData = data.reviews;
const xss = require('xss');
const { reviews } = require('../data');

router.get('/add', async (req, res) => {
    res.render('shelter/add', {title: "Add a Shelter"});
});

router.post('/add', async(req, res) => {
    let shelterName = req.body.shelterName;
    let state = req.body.shelterState;
    let city = req.body.shelterCity;
    let killShelter = req.body.killShelter

    try{
        shelterName = helpers.checkString(shelterName, "Shelter Name");
    } catch(e) {
        res.render('shelter/add', {title: "Add a Shelter"});
        return;
    }

    try{
        state = helpers.checkState(state, "State");
    } catch(e) {
        res.render('shelter/add', {title: "Add a Shelter"});
        return;
    }

    try{
        city = helpers.checkString(city, "City");
    } catch(e) {
        res.render('shelter/add', {title: "Add a Shelter"});
        return;
    }

    try{
        if(killShelter === "on"){
            await sheltersData.addShelter(shelterName, city, state, true);
        } else{
            await sheltersData.addShelter(shelterName, city, state, false);
        }
    } catch(e) {
        res.render('shelter/add', {title: "Add a Shelter"});
        return;
    }
    res.render('shelter/add', {title: "Add a Shelter"});
    return;
});

router.get('/remove', async (req, res) => {
    res.render('shelter/remove', {title: "Remove a Shelter"});
});

router.post('/remove', async(req, res) => {
    let id = req.body.shelterID;
    try{
        id = helpers.checkId(id, "shelter ID");
    } catch(e) {
        const shelters = await sheltersData.getAllShelters();
        res.render('shelter/index', {title: "Shelters", shelters: shelters});
    }
    try{
        await sheltersData.removeShelter(id);
    } catch(e) {
        res.render('shelter/remove', {title: "Remove a Shelter"});
        return;
    }
    res.render('shelter/remove', {title: "Remove a Shelter"});
    return;
});

router.post('/delete_review', async(req, res) => {
    let reviewId = req.body.reviewID;
    //console.log(reviewId);
    try{
        reviewId = helpers.checkId(reviewId, "review id");
    } catch(e) {
        //console.log(e);
        res.status(400).render('shelter/deletereview', {title: "Delete Review", error: e});
        return;
    }
    try{
        if(!await reviews.containsReview(reviewId)){
            throw "Error: no review with that id";
        }
    } catch(e) {
        console.log(e)
        res.status(400).render('shelter/deletereview', {title: "Delete Review", error: e});
        return;
    }
    try{
        await reviewsData.deleteReview(reviewId);
    } catch(e) {
        console.log("delete: " + e + " " + reviewId)
        res.status(400).render('shelter/deletereview', {title: "Delete Review", error: e});
        return;
    }
    res.render('shelter/deletereview', {title: "Delete Review", error: ""});
    return;
});

router.get('/delete_review', async(req, res) => {
    res.render('shelter/deletereview', {title: "Delete Review"});
    return;
});

router.get('/', async (req, res) => {
    const shelters = await sheltersData.getAllShelters();
    res.render('shelter/index', {title: "Shelters", shelters: shelters});
});

router.post('/:id', async (req, res) => {
    let shelterId = req.params.id;

    //console.log("rating: " + typeof parseInt(xss(req.body.rating)));
    try{
        shelterId = helpers.checkId(shelterId, "Shelter ID");
    } catch(e) {
        console.log(e);
        return res.status(400).render('shelter/single', {title: "Name of Shelter: ", error: e});
    }
    let shelter;
    try{
        shelter = await sheltersData.getShelterById(shelterId);
    } catch(e) {
        console.log(e);
        return res.status(400).render('shelter/single', {title: "Name of Shelter: "});
    }
    try{
        await reviewsData.addReview(xss(req.body.reviewerName), xss(req.body.review), 
            (xss(req.body.rating)), shelterId, xss(req.body.username));
            return res.status(200).render('shelter/single', {title: "Name of Shelter: ", shelter: shelter});
    } catch(e) {
        res.json({error: e});
        return;
    }
});


router.get('/:id', async (req, res) => {
    let id = req.params.id;
    try{
        id = helpers.checkId(id, "shelter ID");
    } catch(e) {
        const shelters = await sheltersData.getAllShelters();
        return res.status(400).render('shelter/index', {title: "Shelters", shelters: shelters});
    }
    try{
        const shelter = await sheltersData.getShelterById(req.params.id);
        return res.render('shelter/single', {title: "Name of Shelter: ", shelter: shelter});
    } catch(e){
        const shelters = await sheltersData.getAllShelters();
        return res.status(400).render('shelter/index', {title: "Shelters", shelters: shelters});
    }
});

module.exports = router;