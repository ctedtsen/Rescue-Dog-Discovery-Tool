const express = require('express');
const router = express.Router();
const data = require('../data');
const dogData = data.dogs;
const catData = data.cats;
const commentsData = data.comments;
const sheltersData = data.shelters;
const helpers = require('../helpers')
const xss = require('xss');
const { comments } = require('../data');

router.post('/:petid', async function (request, response){
    let petId = request.params.petid;
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

    try{
        await commentsData.createComment(xss(request.body.commenterName), xss(request.body.comment), petId, petType, loggedIn);
    } catch(e) {
        response.render('pet/index', {title: "Pet error", pet: pet, petType: petType, loggedIn: loggedIn, isAdmin: isAdmin})
        return;
    }

    response.render('pet/index', {title: "Pet", pet: pet, petType: petType, loggedIn: loggedIn, isAdmin: isAdmin})
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

router.get('/:petid/delete_comment', async(req, res) => {
    let petId = req.params.petid;
    let loggedIn = req.session.user;
    let isAdmin = req.session.admin;
    let comments;
    if(!loggedIn){
        return res.redirect('/');
    }
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
    try {
      comments = await commentsData.getCommentsByUser(petId,petType,loggedIn);
      return res.status(200).render('pet/deletecomment', {title: "Remove Comment", loggedIn: loggedIn, comments: comments, isAdmin: isAdmin});
    }catch(e) {
        console.log(e);
        return res.render('pet/deletecomment', {title: "Remove Comment", error: e, loggedIn: loggedIn, isAdmin: isAdmin});
    }
});

router.post('/:petid/delete_comment', async(req, res) => {
    let petId = req.params.petid;
    let commentId = req.body.commentID;
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

    //res.render('pet/deletecomment', {title: "Remove Comment", loggedIn: loggedIn, isAdmin: isAdmin});
    res.redirect(301,`/petdetails/${petId}`);
});

router.get('/:petid/edit_comment', async (req, res) => {
  let petId = req.params.petid;
  let loggedIn = req.session.user;
  let isAdmin = req.session.admin;
  let comments;
  try {
      petId = helpers.checkId(petId, "petid");
  }catch(e) {
      console.log(e);
      return res.render('pet/editcomment', {title: "Edit Comment", error: e, loggedIn: loggedIn, isAdmin: isAdmin});
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
          return res.status(404).render('pet/index', {title: "pet error", error: "No pet found with that id", loggedIn: loggedIn, isAdmin: isAdmin})
      }
  }
  try {
    comments = await commentsData.getCommentsByUser(petId,petType,loggedIn);
    return res.status(200).render('pet/editcomment', {title: "Edit Comment", loggedIn: loggedIn, comments: comments, isAdmin: isAdmin, pet: pet});
  }catch(e) {
      console.log(e);
      return res.render('pet/editcomment', {title: "Edit Comment", error: e, loggedIn: loggedIn, isAdmin: isAdmin, pet: pet});
  }
});

router.post('/:petid/edit_comment', async (req, res) => {
  let petId = req.params.petid;
  let loggedIn = req.session.user;
  let isAdmin = req.session.admin;
  let result;
  let comments;
  try {
      petId = helpers.checkId(petId, "petid");
  }catch(e) {
      //console.log(e);
      res.render('pet/editcomment', {title: "Edit Comment", error: e, loggedIn: loggedIn, comments: comments, pet: pet});
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
          return res.status(404).render('pet/index', {title: "pet error", error: "No pet found with that id", loggedIn: loggedIn, isAdmin: isAdmin})
      }
  }
  try {
    result = await commentsData.updateComment(xss(req.body.commentId),petType,petId,xss(req.body.name),xss(req.body.comment),loggedIn);
    return res.redirect(301,`/petdetails/${petId}`);
  }catch(e) {
      console.log(e);
      comments = await commentsData.getCommentsByUser(petId,petType,loggedIn);
      return res.render('pet/editcomment', {title: "Edit Comment", error: e, loggedIn: loggedIn, comments: comments, isAdmin: isAdmin, pet: pet});
  }
  res.redirect(301,`/petdetails/${petId}`);
  return;
});



module.exports = router;
