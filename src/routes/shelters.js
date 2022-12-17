const express = require('express');
const router = express.Router();
const data = require('../data');
const helpers = require('../helpers');
const sheltersData = data.shelters;
const reviewsData = data.reviews;
const dogsData = data.dogs;
const catsData = data.cats;
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
    try{
        reviewId = helpers.checkId(reviewId, "review id");
    } catch(e) {
        res.status(400).render('shelter/deletereview', {title: "Delete Review", error: e});
        return;
    }
    try{
        if(!await reviewsData.containsReview(reviewId)){
            throw "Error: no review with that id";
        }
    } catch(e) {
        res.status(400).render('shelter/deletereview', {title: "Delete Review", error: e});
        return;
    }
    try{
        await reviewsData.deleteReview(reviewId);
    } catch(e) {
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

router.get('/:id/add_pet', async function(req, res){
    return res.render('pet/addPet', {title: "Add Pet", error: ""});
});

router.post('/:id/add_pet', async function(req, res){
    let shelterId = req.params.id;
    let errors = [];

    let name = req.body.petName;
    try{
        name = helpers.checkName(name);
    } catch(e) {
        errors.push(e + " (name) ");
    }

    let birthday = req.body.birthday;
    try{
        birthday = helpers.checkBirthday(birthday);
    } catch(e) {
        errors.push(e + " (birthday) ");
    }

    let age = helpers.calcAge(birthday);

    let breed = req.body.breed;
    try{
        breed = helpers.checkBreed(breed);
    } catch(e) {
        errors.push(e + " (breed) ");
    }

    let height = req.body.height;
    try{
        height = helpers.checkHeight(height);
    } catch(e) {
        errors.push(e + " (height) ")
    }

    let weight = req.body.weight;
    try{
        weight = helpers.checkWeight(weight);
    } catch(e) {
        errors.push(e + " (weight) ")
    }

    let sex = req.body.sex
    try{
        sex = helpers.checkSexInput(sex);
    } catch(e) {
        errors.push(e + " (sex) ");
    }

    let needs = req.body.needs;
    try{
        needs = helpers.checkSpecialNeeds(needs);
    } catch(e) {
        errors.push(e)
    }

    let picture = req.body.picture;
    try{
        picture = helpers.checkPicture(picture);
    } catch(e) {
        errors.push(e + " (picture) ")
    }

    let type = req.body.type;
    try{
        type = helpers.checkAnimalType(type);
    } catch(e) {
        errors.push(e + " (type) ")
    }

    if(errors.length > 0){
        return res.render('pet/addPet', {title: "Add Pet", error: errors, 
            name: name,
            birthday: birthday,
            breed: breed,
            height: height,
            weight: weight,
            sex: sex,
            needs: needs,
            picture: picture,
            type: type});
    }

    if(type === 'dog'){
        try{
            let dog = await dogsData.addDog(name, birthday, breed, height, weight, sex, name, picture);
            await sheltersData.addRescueDog(shelterId, dog._id.toString());
        } catch(e) {
            return res.render('pet/addPet', {title: "Add Pet", error: e, 
            name: name,
            birthday: birthday,
            breed: breed,
            height: height,
            weight: weight,
            sex: sex,
            needs: needs,
            picture: picture,
            type: type});
        }
    } else {
        try{
            let cat = await catsData.addCat(name, birthday, height, weight, sex, name, picture);
            await sheltersData.addRescueCat(shelterId, cat._id.toString());
        } catch(e) {
            return res.render('pet/addPet', {title: "Add Pet", error: e, 
            name: name,
            birthday: birthday,
            breed: breed,
            height: height,
            weight: weight,
            sex: sex,
            needs: needs,
            picture: picture,
            type: type});
        }
    }
    return res.render('pet/addPet', {title: "Add Pet", error: "Pet added successfully"});
});

router.get('/:id/delete_pet', async function(req, res){
    return res.render('pet/deletePet', {title: "Delete Pet", error: ""});
});

router.post('/:id/delete_pet', async function(req, res){
    let shelteId = req.params.id;
    let petId = req.body.petID;
    let type = req.body.petType;
    let errors = [];

    try{
        helpers.checkId(petId);
    } catch(e){
        errors.push(e);
    }
    try{
        helpers.checkAnimalType(type);
    } catch(e) {
        errors.push(e);
    }
    if(errors.length > 0){
        return res.render('pet/deletePet', {title: "Delete Pet", error: errors});  
    }
    try{
        if(type === 'dog'){
            await dogsData.removeDog(petId);
            await sheltersData.removeRescuePet(shelteId, petId);
        } else{
            await catsData.removeCat(petId);
            await sheltersData.removeRescuePet(shelteId, petId);
        }
    } catch(e){
        return res.render('pet/deletePet', {title: "Delete Pet", error: e}); 
    }
    return res.render('pet/deletePet', {title: "Delete Pet", error: "Pet deleted successfully"});
});

module.exports = router;