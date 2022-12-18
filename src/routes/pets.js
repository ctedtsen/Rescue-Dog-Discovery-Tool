const express = require('express');
const router = express.Router();
const data = require('../data');
const dogData = data.dogs;
const catData = data.cats;
const commentsData = data.comments;
const sheltersData = data.shelters;
const helpers = require('../helpers')
const xss = require('xss');

router.post('/:petid', async function (request, response){
    let petId = request.params.petid;
    let loggedIn = helpers.isAuthenticated(request);
    try {
        petId = helpers.checkId(petId, "id for rescue pet");
    }catch(e) {
        return response.status(400).render('pet/index', {title: "Pet", error: "Pet id is not valid", loggedIn: loggedIn});
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
            return response.status(404).render('pet/index', {title: "pet error", error: "No pet found with that id", loggedIn: loggedIn})
        }
    }

    try{
        await commentsData.createComment(xss(request.body.commenterName), xss(request.body.comment), petId, petType, loggedIn);
    } catch(e) {
        response.render('pet/index', {title: "Pet error", pet: pet, petType: petType, loggedIn: loggedIn})
        return;
    }

    response.render('pet/index', {title: "Pet", pet: pet, petType: petType, loggedIn: loggedIn})
});

router.get('/:petid', async (req, res) => {
    let petId = req.params.petid;
    let loggedIn = helpers.isAuthenticated(req);
    try {
        petId = helpers.checkId(petId, "id for rescue pet");
    }catch(e) {
        return res.status(400).render('pet/index', {title: "Pet", error: "Pet id is not valid", loggedIn: loggedIn});
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
            return res.status(404).render('pet/index', {title: "pet", error: "No pet found with that id", loggedIn: loggedIn})
        }
    }
    return res.render('pet/index', {title: "Pet", pet: pet, petType: petType, loggedIn: loggedIn})
})

router.get('/:petid/delete_comment', async(req, res) => {
    let petId = req.params.petid;
    let loggedIn = helpers.isAuthenticated(req);
    if(!loggedIn){
        return res.redirect('/');
    }
    try {
        petId = helpers.checkId(petId, "id for rescue pet");
    }catch(e) {
        return res.status(400).render('pet/index', {title: "Pet", error: "Pet id is not valid", loggedIn: loggedIn});
    }
    res.render('pet/deletecomment', {title: "Remove Comment", loggedIn: loggedIn});
    return;
});

router.post('/:petid/delete_comment', async(req, res) => {
    let petId = req.params.petid;
    let commentId = req.body.commentID;
    let loggedIn = helpers.isAuthenticated(req);
    try {
        petId = helpers.checkId(petId, "id for rescue pet");
    }catch(e) {
        return res.status(400).render('pet/index', {title: "Pet", error: "Pet id is not valid", loggedIn: loggedIn});
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
        res.render('pet/deletecomment', {title: "Remove Comment", error: e, loggedIn: loggedIn});
    return;
    }

    res.render('pet/deletecomment', {title: "Remove Comment", loggedIn: loggedIn});
});

router.get('/:petid/edit_comment', async (req, res) => {
  let petId = req.params.petid;
  let loggedIn = helpers.isAuthenticated(req);
  let comment;
  try {
      petId = helpers.checkId(petId, "petid");
  }catch(e) {
      console.log(e);
      const shelters = await sheltersData.getAllShelters();
      return res.status(400).render('shelter/index', {title: "Shelters", shelters: shelters, loggedIn: loggedIn});
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
  try {
    comment = await commentsData.getCommentByUser(petId,petType,loggedIn);
  }catch(e) {
      console.log(e);
      const shelters = await sheltersData.getAllShelters();
      return res.status(400).render('shelter/index', {title: "Shelters", shelters: shelters, loggedIn: loggedIn});
  }
  res.render('pet/editcomment', {title: "Edit Comment", loggedIn: loggedIn, comment: comment});
  return;
});

module.exports = router;