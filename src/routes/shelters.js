const express = require('express');
const router = express.Router();
const data = require('../data');
const sheltersData = data.shelters;

router.get('/add', async (req, res) => {
    res.render('shelter/add', {title: "Add a Shelter"});
});

router.post('/add', async(req, res) => {
    let shelterName = req.body.shelterName;
    let state = req.body.shelterState;
    let city = req.body.shelterCity;
    let killShelter = req.body.killShelter

    try{
        if(killShelter === "on"){
            await sheltersData.addShelter(shelterName, city, state, true);
        } else{
            await sheltersData.addShelter(shelterName, city, state, false);
        }
    } catch(e) {
        res.render('shelter/add', {title: "Add a Shelter error"});
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
        await sheltersData.removeShelter(id);
    } catch(e) {
        res.render('shelter/remove', {title: "Remove a Shelter"});
        return;
    }
    res.render('shelter/remove', {title: "Remove a Shelter"});
    return;
});

router.get('/', async (req, res) => {
    const shelters = await sheltersData.getAllShelters();
    res.render('shelter/index', {title: "Shelters", shelters: shelters});
});

router.get('/:id', async (req, res) => {
    try{
        const shelter = await sheltersData.getShelterById(req.params.id);
        res.render('shelter/single', {title: "Name of Shelter: ", shelter: shelter});
    } catch(e){
        res.status(500).json({error: e});
    }
});

module.exports = router;