const express = require('express');
const router = express.Router();
const data = require('../data');
const helpers = require('../helpers');
const sheltersData = data.shelters;
const reviewsData = data.reviews;
const xss = require('xss');

router.get('/add', async (req, res) => {
    let loggedIn = helpers.isAuthenticated(req);
    res.render('shelter/add', {title: "Add a Shelter", loggedIn: loggedIn});
});

router.post('/add', async(req, res) => {
    let shelterName = req.body.shelterName;
    let state = req.body.shelterState;
    let city = req.body.shelterCity;
    let killShelter = req.body.killShelter
    let loggedIn = helpers.isAuthenticated(req);

    try{
        shelterName = helpers.checkString(shelterName, "Shelter Name");
    } catch(e) {
        res.render('shelter/add', {title: "Add a Shelter", loggedIn: loggedIn});
        return;
    }

    try{
        state = helpers.checkState(state, "State");
    } catch(e) {
        res.render('shelter/add', {title: "Add a Shelter", loggedIn: loggedIn});
        return;
    }

    try{
        city = helpers.checkString(city, "City");
    } catch(e) {
        res.render('shelter/add', {title: "Add a Shelter", loggedIn: loggedIn});
        return;
    }

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
        res.render('shelter/add', {title: "Add a Shelter", loggedIn: loggedIn});
        return;
    }
    res.render('shelter/add', {title: "Add a Shelter", loggedIn: loggedIn});
    return;
});

router.get('/remove', async (req, res) => {

    let loggedIn = helpers.isAuthenticated(req);
    res.render('shelter/remove', {title: "Remove a Shelter", loggedIn: loggedIn});
});

router.post('/remove', async(req, res) => {
    let id = req.body.shelterID;
    let loggedIn = helpers.isAuthenticated(req);
    try{
        id = helpers.checkId(id, "shelter ID");
    } catch(e) {
        const shelters = await sheltersData.getAllShelters();
        res.render('shelter/index', {title: "Shelters", shelters: shelters, loggedIn: loggedIn});
    }
    try{
        id = helpers.checkId(id, "shelter ID");
    } catch(e) {
        const shelters = await sheltersData.getAllShelters();
        res.render('shelter/index', {title: "Shelters", shelters: shelters});
    }
    try{
        await sheltersData.removeShelter(id);
    } catch(e) {
        res.render('shelter/remove', {title: "Remove a Shelter", loggedIn: loggedIn});
        return;
    }
    res.render('shelter/remove', {title: "Remove a Shelter", loggedIn: loggedIn});
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
        if(!await reviewsData.containsReview(reviewId)){
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
    let loggedIn = helpers.isAuthenticated(req);
    res.render('shelter/index', {title: "Shelters", shelters: shelters, loggedIn: loggedIn});
});


router.post('/:id', async (req, res) => {
    let shelterId = req.params.id;
    let loggedIn = helpers.isAuthenticated(req);
    if(!loggedIn){
        res.json({error: 'Error: Must be logged in to leave a review', loggedIn: loggedIn});
        return;
    }
    try{
        shelterId = helpers.checkId(shelterId, "Shelter ID");
    } catch(e) {
        return res.status(400).render('shelter/single', {title: "Name of Shelter: ", error: e, loggedIn: loggedIn});
    }
    let shelter;
    try{
        shelter = await sheltersData.getShelterById(shelterId);
    } catch(e) {
        return res.status(400).render('shelter/single', {title: "Name of Shelter: ", loggedIn: loggedIn});
    }
    try{
        await reviewsData.addReview(xss(req.body.reviewerName), xss(req.body.review), 
            (xss(req.body.rating)), shelterId, loggedIn);
            return res.status(200).render('shelter/single', {title: "Name of Shelter: ", shelter: shelter, loggedIn: loggedIn});
    } catch(e) {
        res.json({error: e, loggedIn: loggedIn});
        return;
    }
});


router.get('/:id', async (req, res) => {
    let id = req.params.id;
    let loggedIn = helpers.isAuthenticated(req);
    try{
        id = helpers.checkId(id, "shelter ID");
    } catch(e) {
        const shelters = await sheltersData.getAllShelters();
        return res.status(400).render('shelter/index', {title: "Shelters", shelters: shelters, loggedIn: loggedIn});
    }
    try{
        const shelter = await sheltersData.getShelterById(req.params.id);
        return res.render('shelter/single', {title: "Name of Shelter: ", shelter: shelter, loggedIn: loggedIn});
    } catch(e){
        const shelters = await sheltersData.getAllShelters();
        return res.status(400).render('shelter/index', {title: "Shelters", shelters: shelters, loggedIn: loggedIn});
    }
});

router.post('/:id/delete_review', async(req, res) => {
    let reviewId = req.body.reviewId;
    let loggedIn = helpers.isAuthenticated(req);

    try{
        reviewId = helpers.checkId(reviewId, "review id");
    } catch(e) {
        res.render('shelter/deletereview', {title: "Delete Review", error: e, loggedIn: loggedIn});
        return;
    }
    try{
        await reviewsData.deleteReview(reviewId);
    } catch(e) {
        console.log("delete: " + e + " " + reviewId)
        res.render('shelter/deletereview', {title: "Delete Review", error: e, loggedIn: loggedIn});
        return;
    }
    res.render('shelter/deletereview', {title: "Delete Review", error: "", loggedIn: loggedIn});
    return;
});

router.get('/:id/delete_review', async(req, res) => {
    let shelterId = req.params.id;
    let loggedIn = helpers.isAuthenticated(req);
    try {
        shelterId = helpers.checkId(shelterId, "id for shelter");
    }catch(e) {
        const shelters = await sheltersData.getAllShelters();
        return res.status(400).render('shelter/index', {title: "Shelters", shelters: shelters, loggedIn: loggedIn});
    }
    res.render('shelter/deletereview', {title: "Delete Review", loggedIn: loggedIn});
    return;
});

router.get('/:id/edit_review', async (req, res) => {
  let shelterId = req.params.id;
  let loggedIn = helpers.isAuthenticated(req);
  let review;
  try {
      shelterId = helpers.checkId(shelterId, "id for shelter");
      review = await reviewsData.getReviewByUser(shelterId,loggedIn);
  }catch(e) {
      //console.log(e);
      const shelters = await sheltersData.getAllShelters();
      return res.status(400).render('shelter/index', {title: "Shelters", shelters: shelters, loggedIn: loggedIn});
  }
  res.render('shelter/editreview', {title: "Edit Review", loggedIn: loggedIn, review: review});
  return;
});

router.post('/:id/edit_review', async (req, res) => {
  let shelterId = req.params.id;
  let loggedIn = helpers.isAuthenticated(req);
  let review;
  if(!loggedIn){
      res.json({error: 'Error: Must be logged in to edit a review', loggedIn: loggedIn});
      return;
  }
  try{
      shelterId = helpers.checkId(shelterId, "Shelter ID");
      review = await reviewsData.getReviewByUser(shelterId,loggedIn);
  } catch(e) {
      return res.status(400).render('shelter/single', {title: "Name of Shelter: ", error: e, loggedIn: loggedIn});
  }
  let shelter;
  try{
      shelter = await sheltersData.getShelterById(shelterId);
  } catch(e) {
      return res.status(400).render('shelter/single', {title: "Name of Shelter: ", loggedIn: loggedIn});
  }
  try{
      await reviewsData.updateReview(xss(req.body.name), xss(req.body.review), 
          (xss(req.body.rating)), review._id.toString(), shelterId);
          return res.redirect(302, `/shelters/${shelterId}`);
  } catch(e) {
      console.log(e);
      res.json({error: e, loggedIn: loggedIn});
      return;
  }
});

module.exports = router;