const express = require('express');
const router = express.Router();
const data = require('../data');
const helpers = require('../helpers');
const sheltersData = data.shelters;
const reviewsData = data.reviews;
const xss = require('xss');

router.get('/add', async (req, res) => {
    let loggedIn = req.session.user;
    let isAdmin = req.session.admin;
    if(!loggedIn){
        return res.redirect('/');
    }
    return res.render('shelter/add', {title: "Add a Shelter", loggedIn: loggedIn, isAdmin: isAdmin});
});

router.post('/add', async(req, res) => {
    let shelterName = req.body.shelterName;
    let state = req.body.shelterState;
    let city = req.body.shelterCity;
    let killShelter = req.body.killShelter
    let loggedIn = req.session.user;
    let isAdmin = req.session.admin;

    // if(!loggedIn){
    //     return res.redirect('/');
    // }

    try{
        shelterName = helpers.checkString(shelterName, "Shelter Name");
    } catch(e) {
        res.render('shelter/add', {title: "Add a Shelter", error: e, loggedIn: loggedIn, isAdmin: isAdmin});
        return;
    }

    try{
        state = helpers.checkState(state, "State");
    } catch(e) {
        res.render('shelter/add', {title: "Add a Shelter", error: e, loggedIn: loggedIn, isAdmin: isAdmin});
        return;
    }

    try{
        city = helpers.checkString(city, "City");
    } catch(e) {
        res.render('shelter/add', {title: "Add a Shelter", error: e, loggedIn: loggedIn, isAdmin: isAdmin});
        return;
    }

    try{
        shelterName = helpers.checkString(shelterName, "Shelter Name");
    } catch(e) {
        res.render('shelter/add', {title: "Add a Shelter", error: e, loggedIn: loggedIn, isAdmin: isAdmin});
        return;
    }

    try{
        state = helpers.checkState(state, "State");
    } catch(e) {
        res.render('shelter/add', {title: "Add a Shelter", error: e, loggedIn: loggedIn, isAdmin: isAdmin});
        return;
    }

    try{
        city = helpers.checkString(city, "City");
    } catch(e) {
        res.render('shelter/add', {title: "Add a Shelter", error: e, loggedIn: loggedIn, isAdmin: isAdmin});
        return;
    }

    try{
        if(killShelter === "on"){
            await sheltersData.addShelter(shelterName, city, state, true);
        } else{
            await sheltersData.addShelter(shelterName, city, state, false);
        }
    } catch(e) {
        res.render('shelter/add', {title: "Add a Shelter", loggedIn: loggedIn, isAdmin: isAdmin});
        return;
    }
    res.render('shelter/add', {title: "Add a Shelter", loggedIn: loggedIn, isAdmin: isAdmin});
    return;
});

router.get('/remove', async (req, res) => {
    let loggedIn = req.session.user;
    let isAdmin = req.session.admin;
    if(!loggedIn) {
        return res.redirect('/');
    }
    return res.render('shelter/remove', {title: "Remove a Shelter", loggedIn: loggedIn, isAdmin: isAdmin});
});

router.post('/remove', async(req, res) => {
    let id = req.body.shelterID;
    let loggedIn = req.session.user;
    let isAdmin = req.session.admin;
    // if(!loggedIn){
    //     return res.redirect('/');
    // }
    try{
        id = helpers.checkId(id, "shelter ID");
    } catch(e) {
        const shelters = await sheltersData.getAllShelters();
        res.render('shelter/index', {title: "Shelters", shelters: shelters, loggedIn: loggedIn, isAdmin: isAdmin});
    }
    try{
        id = helpers.checkId(id, "shelter ID");
    } catch(e) {
        const shelters = await sheltersData.getAllShelters();
        res.render('shelter/index', {title: "Shelters", shelters: shelters, error: e, loggedIn: loggedIn, isAdmin: isAdmin});
    }
    try{
        await sheltersData.removeShelter(id);
    } catch(e) {
        res.render('shelter/remove', {title: "Remove a Shelter", loggedIn: loggedIn, isAdmin: isAdmin});
        return;
    }
    res.render('shelter/remove', {title: "Remove a Shelter", loggedIn: loggedIn, isAdmin: isAdmin});
    return;

});

router.post('/delete_review', async(req, res) => {
    let reviewId = req.body.reviewID;
    let loggedIn = req.session.user;
    let isAdmin = req.session.admin;
    // if(!loggedIn){
    //     return res.redirect('/');
    // }
    try{
        reviewId = helpers.checkId(reviewId, "review id");
    } catch(e) {
        res.status(400).render('shelter/deletereview', {title: "Delete Review", error: e, loggedIn: loggedIn, isAdmin: isAdmin});
        return;
    }
    try{
        if(!await reviewsData.containsReview(reviewId)){
            throw "Error: no review with that id";
        }
    } catch(e) {
        res.status(400).render('shelter/deletereview', {title: "Delete Review", error: e, loggedIn: loggedIn, isAdmin: isAdmin});
        return;
    }
    try{
        await reviewsData.deleteReview(reviewId);
    } catch(e) {
        res.status(400).render('shelter/deletereview', {title: "Delete Review", error: e, loggedIn: loggedIn, isAdmin: isAdmin});
        return;
    }
    res.render('shelter/deletereview', {title: "Delete Review", loggedIn: loggedIn, isAdmin: isAdmin});
    return;
});

router.get('/delete_review', async(req, res) => {
    let loggedIn = req.session.user;
    let isAdmin = req.session.admin;
    if(!loggedIn){
        return res.redirect('/');
    }
    res.render('shelter/deletereview', {title: "Delete Review", loggedIn: loggedIn, isAdmin: isAdmin});
    return;
});

router.get('/', async (req, res) => {
    const shelters = await sheltersData.getAllShelters();
    let loggedIn = req.session.user;
    let isAdmin = req.session.admin;
    res.render('shelter/index', {title: "Shelters", shelters: shelters, loggedIn: loggedIn, isAdmin: isAdmin});
});


router.post('/:id', async (req, res) => {
    let shelterId = req.params.id;
    let loggedIn = req.session.user;
    let isAdmin = req.session.admin;
    if(!loggedIn){
        res.json({error: 'Error: Must be logged in to leave a review', loggedIn: loggedIn, isAdmin: isAdmin});
        return;
    }
    try{
        shelterId = helpers.checkId(shelterId, "Shelter ID");
    } catch(e) {
        return res.status(400).render('shelter/single', {title: "Name of Shelter: ", error: e, loggedIn: loggedIn, isAdmin: isAdmin});
    }
    let shelter;
    try{
        shelter = await sheltersData.getShelterById(shelterId);
    } catch(e) {
        return res.status(400).render('shelter/single', {title: "Name of Shelter: ", loggedIn: loggedIn, isAdmin: isAdmin});
    }
    try{
        await reviewsData.addReview(xss(req.body.reviewerName), xss(req.body.review), 
            (xss(req.body.rating)), shelterId, loggedIn);
            return res.status(200).render('shelter/single', {title: "Name of Shelter: ", shelter: shelter, loggedIn: loggedIn, isAdmin: isAdmin});
    } catch(e) {
        res.json({error: e, loggedIn: loggedIn, isAdmin: isAdmin});
        return;
    }
});


router.get('/:id', async (req, res) => {
    let id = req.params.id;
    let loggedIn = req.session.user;
    let isAdmin = req.session.admin;
    try{
        id = helpers.checkId(id, "shelter ID");
    } catch(e) {
        const shelters = await sheltersData.getAllShelters();
        return res.status(400).render('shelter/index', {title: "Shelters", shelters: shelters, loggedIn: loggedIn, isAdmin: isAdmin});
    }
    try{
        const shelter = await sheltersData.getShelterById(req.params.id);
        return res.render('shelter/single', {title: "Name of Shelter: ", shelter: shelter, loggedIn: loggedIn, isAdmin: isAdmin});
    } catch(e){
        const shelters = await sheltersData.getAllShelters();
        return res.status(400).render('shelter/index', {title: "Shelters", shelters: shelters, loggedIn: loggedIn, isAdmin: isAdmin});
    }
});

router.post('/:id/delete_review', async(req, res) => {
    let reviewId = req.body.reviewId;
    let loggedIn = req.session.user;
    let isAdmin = req.session.admin;
    // if(!loggedIn){
    //     return res.redirect('/');
    // }
    try{
        reviewId = helpers.checkId(reviewId, "review id");
    } catch(e) {
        res.render('shelter/deletereview', {title: "Delete Review", error: e, loggedIn: loggedIn, isAdmin: isAdmin});
        return;
    }
    try{
        await reviewsData.deleteReview(reviewId);
    } catch(e) {
        console.log("delete: " + e + " " + reviewId)
        res.render('shelter/deletereview', {title: "Delete Review", error: e, loggedIn: loggedIn, isAdmin: isAdmin});
        return;
    }
    res.render('shelter/deletereview', {title: "Delete Review", error: "", loggedIn: loggedIn, isAdmin: isAdmin});
    return;
});

router.get('/:id/delete_review', async(req, res) => {
    let shelterId = req.params.id;
    let loggedIn = req.session.user;
    let isAdmin = req.session.admin;
    if(!loggedIn){
        return res.redirect('/');
    }
    try {
        shelterId = helpers.checkId(shelterId, "id for shelter");
    }catch(e) {
        const shelters = await sheltersData.getAllShelters();
        return res.status(400).render('shelter/index', {title: "Shelters", shelters: shelters, loggedIn: loggedIn, isAdmin: isAdmin});
    }
    res.render('shelter/deletereview', {title: "Delete Review", loggedIn: loggedIn, isAdmin: isAdmin});
    return;
});

module.exports = router;