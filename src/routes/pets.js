const express = require('express');
const router = express.Router();
const data = require('../data');
const dogData = data.dogs;
const catData = data.cats;
const commentsData = data.comments;
const helpers = require('../helpers')
const xss = require('xss');

router.post('/:petid', async function (request, response){
    let petId = request.params.petid;
    try {
        petId = helpers.checkId(petId, "id for rescue pet");
    }catch(e) {
        return response.status(400).render('pet/index', {title: "Pet", error: "Pet id is not valid"});
    }
    let pet;
    let petNotFound = false;
    let petType;
    try{
        pet = await dogData.getDogById(petId);
        petType = "dog"
    }catch{
        petNotFound = true;
    }
    if(petNotFound){
        try{
            pet = await catData.getCatById(petId);
            petType = "cat";
        }catch{
            return response.status(404).render('pet/index', {title: "pet error", error: "No pet found with that id"})
        }
    }

    try{
        await commentsData.createComment(xss(request.body.commenterName), xss(request.body.comment), petId, petType);
    } catch(e) {
        response.render('pet/index', {title: "Pet error", pet: pet, petType: petType})
        return;
    }

    response.render('pet/index', {title: "Pet", pet: pet, petType: petType})
});

router.get('/:petid', async (req, res) => {
    let petId = req.params.petid;
    try {
        petId = helpers.checkId(petId, "id for rescue pet");
    }catch(e) {
        return res.status(400).render('pet/index', {title: "Pet", error: "Pet id is not valid"});
    }
    let pet;
    let petNotFound = false;
    let petType;
    try{
        pet = await dogData.getDogById(petId);
        petType = "dog"
    }catch{
        petNotFound = true;
    }
    if(petNotFound){
        try{
            pet = await catData.getCatById(petId);
            petType = "cat";
        }catch{
            return res.status(404).render('pet/index', {title: "pet", error: "No pet found with that id"})
        }
    }
    return res.render('pet/index', {title: "Pet", pet: pet, petType: petType})
})

router.get('/:petid/delete_comment', async(req, res) => {
    let petId = req.params.petid;
    try {
        petId = helpers.checkId(petId, "id for rescue pet");
    }catch(e) {
        return res.status(400).render('pet/index', {title: "Pet", error: "Pet id is not valid"});
    }
    res.render('pet/deletecomment', {title: "Remove Comment"});
    return;
});

router.post('/:petid/delete_comment', async(req, res) => {
    let petId = req.params.petid;
    let commentId = req.body.commentID;
    try {
        petId = helpers.checkId(petId, "id for rescue pet");
    }catch(e) {
        return res.status(400).render('pet/index', {title: "Pet", error: "Pet id is not valid"});
    }
    let pet;
    let petNotFound = false;
    let petType;
    try{
        pet = await dogData.getDogById(petId);
        petType = "dog"
    }catch{
        petNotFound = true;
    }
    if(petNotFound){
        try{
            pet = await catData.getCatById(petId);
            petType = "cat";
        }catch{
            return res.status(404).render('pet/index', {title: "pet error", error: "No pet found with that id"})
        }
    }

    try{
        await commentsData.removeComment(commentId, petType);
    } catch(e) {
        //console.log(e);
        res.render('pet/deletecomment', {title: "Remove Comment", error: e});
    return;
    }

    res.render('pet/deletecomment', {title: "Remove Comment"});
});

module.exports = router;