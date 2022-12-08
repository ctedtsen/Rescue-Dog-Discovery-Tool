const express = require('express');
const router = express.Router();
const data = require('../data');
const dogData = data.dogs;
const catData = data.cats;
const helpers = require('../helpers')

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

router.get('/:id', async (req, res) => {
    try{
        const shelter = await sheltersData.getShelterById(req.params.id);
        res.render('shelter/single', {title: "Name of Shelter: ", shelter: shelter});
    } catch(e){
        res.status(500).json({error: e});
    }
});

module.exports = router;