const mongoCollections = require('../config/mongoCollections');
const shelters = mongoCollections.shelters;
const {ObjectId} = require('mongodb');
const helpers = require('../helpers');

const exportedMethods = {
    async addShelter(
        shelterName,
        city,
        state,
        killShelter
    ){
        shelterName = helpers.checkString(shelterName, "shelterName");
        city = helpers.checkString(city, "city");
        state = helpers.checkString(state, "state");
        killShelter = helpers.checkBool(killShelter, "killShelter");

        const shelterCollection = await shelters();

        const newShelter = {
            shelterName: shelterName,
            city: city,
            state: state,
            killShelter: killShelter,
            pets: [],
            numberPets: 0,
            reviews: [],
            rating: 0
        }

        const insertInfo = await shelterCollection.insertOne(newShelter);
        if(!insertInfo.acknowledged || !insertInfo.insertedId){
            throw "Could not create shelter"
        }

        const newId = await insertInfo.insertedId.toString();
        const shelter = await this.getShelterById(newId);
        shelter._id = shelter._id.toString();
        return shelter; 
    },

    async getShelterById (id){
        id = helpers.checkId(id, "id");
    
        const shelterCollection = await shelters();
        const shelter = await shelterCollection.findOne({_id: ObjectId(id)});
        if(shelter === null){
          throw "Error: no shelter with the provided id";
        }
    
        shelter._id = shelter._id.toString();
        return shelter;
    },

    async removeShelter (id) {
        id = helpers.checkId(id);

        const shelter = await this.getShelterById(id);

        const all_shelters = await shelters();
        const deleteShelter = await all_shelters.deleteOne({_id: ObjectId(id)});

        if(deleteShelter.deleteCount === 0){
        throw "Not able to delete shelter with id of " + id;
        }

        return shelter.shelterName + " has been successfully deleted!";
    },

    async updateShelter (
        id,
        shelterName,
        city,
        state,
        killShelter
    ){
        id = helpers.checkId(id, "id");
        shelterName = helpers.checkString(shelterName, "shelterName");
        city = helpers.checkString(city, "city");
        state = helpers.checkString(state, "state");
        killShelter = helpers.checkBool(killShelter, "killShelter");

        const shelterCollection = await shelters();
    
        const updatedShelters = await shelterCollection.updateOne(
            {_id: ObjectId(id)},
            {$set: {
                shelterName: shelterName,
                city: city,
                state: state,
                killShelter: killShelter
            }}
        );

        if(updatedShelters.modifiedCount === 0){
            throw "not able to update the shelter successfully";
        }
    
        const shelter = await shelterCollection.findOne({_id: ObjectId(id)});
        shelter._id = shelter._id.toString();
    
        return this.getShelterById(shelter._id.toString());
    },

    async getAllShelters(){
        const all_shelters = await shelters();
        const shelterList = await all_shelters.find({}).toArray();

        if(!shelterList){
            throw "Not able to get shelters";
        }

        shelterList.forEach(shelter => {
            shelter._id = shelter._id.toString();
        });

        return shelterList;
    }
}

module.exports = exportedMethods;