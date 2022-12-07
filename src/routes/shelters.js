const express = require('express');
const router = express.Router();
const data = require('../data');
const sheltersData = data.shelters;

router.get('/edit', async (req, res) => {
    res.render('shelter/edit', {title: "Add or Remove a Shelter"});
});

router.get('/', async (req, res) => {
    const shelters = await sheltersData.getAllShelters();
    res.render('shelter/index', {title: "Shelters", shelters: shelters});
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