const express = require('express');
const router = express.Router();
const data = require('../data');
const dogData = data.dogs;
const catData = data.cats;
const usersData = data.users;
const commentsData = data.comments;
const helpers = require('../helpers')
const xss = require('xss');

router.post('/:petid', async function (request, response){
    let petId =request.params.petid;
    let loggedIn = request.session.user;
    let isAdmin = request.session.admin;
    if(!loggedIn){
        return res.redirect('/');
    }
    try {
        petId = helpers.checkId(petId, "id for rescue pet");
    }catch(e) {
        return response.status(400).render('pet/index', {title: "Pet", error: "Pet id is not valid", loggedIn: loggedIn, isAdmin: isAdmin});
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
        }catch (e){
            return response.status(404).render('pet/index', {title: "pet error", error: "No pet found with that id", loggedIn: loggedIn, isAdmin: isAdmin})
        }
    }

    if(!xss(request.body.commenterName)){
        try{
            /*const user = request.session
            if(!user.liked){
                user.liked = [];
            }*/
            const user = await usersData.findByUsername(loggedIn);
            const liked = user.likes;
            if(petType === 'dog' && !liked.includes(petId)){
                await dogData.updateDog(petId, pet.name, pet.birthday, pet.breed, pet.height, pet.weight, pet.sex, pet.specialNeeds, pet.picture, pet.likes + 1);
                await usersData.addLike(loggedIn, petId);
                return response.render('pet/index', {title: "Pet", pet: pet, petType: petType, loggedIn: loggedIn, isAdmin: isAdmin});
            } else if (petType === 'cat' && !liked.includes(petId)){
                await catData.updateCat(petId, pet.name, pet.birthday, pet.height, pet.weight, pet.sex, pet.specialNeeds, pet.picture, pet.likes + 1);
                await usersData.addLike(loggedIn, petId);
                return response.render('pet/index', {title: "Pet", pet: pet, petType: petType, loggedIn: loggedIn, isAdmin: isAdmin});
            } else if (petType === 'cat'){
                await usersData.removeLike(loggedIn, petId);
                await catData.updateCat(petId, pet.name, pet.birthday, pet.height, pet.weight, pet.sex, pet.specialNeeds, pet.picture, pet.likes - 1);
                return response.render('pet/index', {title: "Pet", pet: pet, petType: petType, loggedIn: loggedIn, isAdmin: isAdmin});
            } else if (petType === 'dog'){
                await usersData.removeLike(loggedIn, petId);
                await dogData.updateDog(petId, pet.name, pet.birthday, pet.breed, pet.height, pet.weight, pet.sex, pet.specialNeeds, pet.picture, pet.likes - 1);
                return response.render('pet/index', {title: "Pet", pet: pet, petType: petType, loggedIn: loggedIn, isAdmin: isAdmin});
            } else {
                await usersData.removeLike(loggedIn, petId);
                await catData.updateCat(petId, pet.name, pet.birthday,pet.height, pet.weight, pet.sex, pet.specialNeeds, pet.picture, pet.likes - 1);
                return response.render('pet/index', {title: "Pet", pet: pet, petType: petType, loggedIn: loggedIn, isAdmin: isAdmin});
            }
        } catch(e){
            console.log(e);
            return response.render('pet/index', {title: "Pet", pet: pet, petType: petType, loggedIn: loggedIn, isAdmin: isAdmin});
        }
        } else{
    
        try{
            await commentsData.createComment(xss(request.body.commenterName), xss(request.body.comment), petId, petType, loggedIn);
        } catch(e) {
            response.render('pet/index', {title: "Pet error", pet: pet, petType: petType, loggedIn: loggedIn, isAdmin: isAdmin})
            return;
        }
    
        response.render('pet/index', {title: "Pet", pet: pet, petType: petType, loggedIn: loggedIn, isAdmin: isAdmin});
    }
});

router.get('/:petid', async (req, res) => {
    let petId = req.params.petid;
    let loggedIn = req.session.user;
    let isAdmin = req.session.admin;
    try {
        petId = helpers.checkId(petId, "id for rescue pet");
    }catch(e) {
        return res.status(400).render('pet/index', {title: "Pet", error: "Pet id is not valid", loggedIn: loggedIn, isAdmin: isAdmin});
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
            return res.status(404).render('pet/index', {title: "pet", error: "No pet found with that id", loggedIn: loggedIn, isAdmin: isAdmin})
        }
    }
    return res.render('pet/index', {title: "Pet", pet: pet, petType: petType, loggedIn: loggedIn, isAdmin: isAdmin})
})

router.post('/:petid/save', async(req, res) => {
    let id = req.params.petid;
    let loggedIn = req.session.user;
    let errors =[];
    try{
        id = helpers.checkId(id, "pet id");
    } catch(e) {
        errors.push(e);
    }

    if(errors.length > 0){
        return res.render('pet/savePet', {title: "Save this pet?", error: errors, loggedIn: loggedIn});
    }

    try{
        await usersData.savePet(loggedIn, id)
    } catch(e) {
        errors.push(e);
    }

    if(errors.length > 0){
        return res.render('pet/savePet', {title: "Save this pet?", error: errors, loggedIn: loggedIn});
    }
    
    return res.render('pet/savePet', {title: "Save this pet?", error: "Pet has been saved", loggedIn: loggedIn});
});

router.get('/:petid/save', async(req, res) => {
    let loggedIn = req.session.user;
    return res.render('pet/savePet', {title: "Save this pet?", loggedIn: loggedIn})
});

router.post('/:petid/remove', async(req, res) => {
    let id = req.params.petid;
    let loggedIn = req.session.user;
    let errors =[];
    try{
        id = helpers.checkId(id, "pet id");
    } catch(e) {
        errors.push(e);
    }

    if(errors.length > 0){
        return res.render('pet/savePet', {title: "Save this pet?", error: errors, loggedIn: loggedIn});
    }

    try{
        await usersData.removePet(loggedIn, id)
    } catch(e) {
        errors.push(e);
    }

    if(errors.length > 0){
        return res.render('pet/removePet', {title: "Remove this pet?", error: errors, loggedIn: loggedIn});
    }
    
    return res.render('pet/removePet', {title: "Remove this pet?", error: "Pet has been removed", loggedIn: loggedIn});
});

router.get('/:petid/remove', async(req, res) => {
    let loggedIn = req.session.user;
    return res.render('pet/removePet', {title: "Remove this pet?", loggedIn: loggedIn})
});

router.get('/:petid/delete_comment', async(req, res) => {
    let petId = req.params.petid;
    let loggedIn = req.session.user;
    let isAdmin = req.session.admin;
    if(!loggedIn){
        return res.redirect('/');
    }
    try {
        petId = helpers.checkId(petId, "id for rescue pet");
    }catch(e) {
        return res.status(400).render('pet/index', {title: "Pet", error: "Pet id is not valid", loggedIn: loggedIn, isAdmin: isAdmin});
    }
    res.render('pet/deletecomment', {title: "Remove Comment", loggedIn: loggedIn, isAdmin: isAdmin});
    return;
});

router.post('/:petid/delete_comment', async(req, res) => {
    let petId = req.params.petid;
    let commentId = xss(req.body.commentID);
    let loggedIn = req.session.user;
    let isAdmin = req.session.admin;
    try {
        petId = helpers.checkId(petId, "id for rescue pet");
    }catch(e) {
        return res.status(400).render('pet/index', {title: "Pet", error: "Pet id is not valid", loggedIn: loggedIn, isAdmin: isAdmin});
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
            return res.status(404).render('pet/index', {title: "pet error", error: "No pet found with that id", loggedIn: loggedIn})
        }
    }

    try{
        await commentsData.removeComment(commentId, petType, loggedIn);
    } catch(e) {
        res.render('pet/deletecomment', {title: "Remove Comment", error: e, loggedIn: loggedIn, isAdmin: isAdmin});
    return;
    }

    res.render('pet/deletecomment', {title: "Remove Comment", loggedIn: loggedIn, isAdmin: isAdmin});
});

module.exports = router;