const mongoCollections = require('../config/mongoCollections');
const shelters = mongoCollections.shelters;
const {ObjectId} = require('mongodb');
const dogs = require("./dogs");
const dogsData = mongoCollections.dogs;
const cats = require("./cats");
const helpers = require('../helpers');

const exportedMethods = {
    async addShelter(
        shelterName,
        city,
        state,
        killShelter,
        timeKept
    ){
        shelterName = helpers.checkString(shelterName, "shelterName");
        city = helpers.checkString(city, "city");
        state = helpers.checkState(state);
        killShelter = helpers.checkBool(killShelter, "killShelter");
        timeKept = helpers.checkTimeKept(timeKept, killShelter);

        if(!killShelter){
            timeKept = "n/a"
        }

        const shelterCollection = await shelters();

        const newShelter = {
            shelterName: shelterName,
            city: city,
            state: state,
            killShelter: killShelter,
            timeKept: timeKept,
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
        id = helpers.checkId(id, "shelterId");
    
        const shelterCollection = await shelters();
        const shelter = await shelterCollection.findOne({_id: ObjectId(id)});
        if(shelter === null){
          throw "Error: no shelter with the provided id";
        }
    
        shelter._id = shelter._id.toString();
        return shelter;
    },

    async removeShelter (id) {
        id = helpers.checkId(id, "shelterId");

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
        killShelter,
        timeKept
    ){
        id = helpers.checkId(id, "shelterId");
        shelterName = helpers.checkString(shelterName, "shelterName");
        city = helpers.checkString(city, "city");
        state = helpers.checkString(state, "state");
        killShelter = helpers.checkBool(killShelter, "killShelter");
        timeKept = helpers.checkTimeKept(timeKept, killShelter);

        const shelterCollection = await shelters();

        if(!killShelter){
            timeKept = "n/a";
        }
    
        const updatedShelters = await shelterCollection.updateOne(
            {_id: ObjectId(id)},
            {$set: {
                shelterName: shelterName,
                city: city,
                state: state,
                killShelter: killShelter,
                timeKept: timeKept
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

        shelterList.sort(function (sheltera, shelterb) {
            if(sheltera.shelterName.toLowerCase() < shelterb.shelterName.toLowerCase()){
                return -1;
            }
            if(sheltera.shelterName.toLowerCase() > shelterb.shelterName.toLowerCase()){
                return 1;
            }
            return 0;
        });

        shelterList.forEach(shelter => {
            shelter._id = shelter._id.toString();
        });

        return shelterList;
    },

    async addRescueDog(shelterId, dogId) {
        helpers.checkId(shelterId, "id for shelter")
        helpers.checkId(dogId, "id for rescue dog");
        const shelter = await this.getShelterById(shelterId);
        const dog = await dogs.getDogById(dogId);

        for(let petId of shelter.pets) {
            if(petId === dog._id.toString()) {
                throw "Error: pet with provided id is already added"
            }
        }

        const newPetList = [...shelter.pets, {id: dogId, name: dog.name}];
        const numberOfPets = newPetList.length;
      
        const shelterCollection = await shelters();
        const updatedInfo = await shelterCollection.updateOne(
            { _id: ObjectId(shelterId) },
            {
                $set: {
                    pets: newPetList,
                    numberPets: numberOfPets
                }
            }
        );
        if(updatedInfo.modifiedCount === 0) {
            throw "Error: could not update shelter successfully";
        }

        const updatedShelter = await this.getShelterById(shelterId);
        return updatedShelter;
    },

    async removeRescuePet(shelterId, petId){
        let shelter =  await this.getShelterById(shelterId);

        let pets = shelter.pets;

        id_list = [];
        pets.forEach(pet => {
            id_list.push(pet.id);
        })

        let index;
        try{
            index = id_list.indexOf(petId);
        } catch(e) {
            throw "Error: pet not found x";
        }

        if(index === -1){
            throw "Error: pet not found y";
        }

        pets.splice(index, 1);

        const shelterCollection = await shelters();

        let num = shelter.numberPets;
        const updatedShelters = await shelterCollection.updateOne(
            {_id: ObjectId(shelter._id)},
            {$set: {
                pets: pets,
                numberPets: num - 1
            }}
        )

        if(updatedShelters.modifiedCount === 0){
            throw "Error: not able to update shelter successfully (deleteReview)"
        }
        return this.getShelterById(shelterId);
    },

    async addRescueCat(shelterId, catId) {
        helpers.checkId(shelterId, "id for shelter")
        helpers.checkId(catId, "id for rescue cat");
        const shelter = await this.getShelterById(shelterId);
        const cat = await cats.getCatById(catId);

        for(let petId of shelter.pets) {
            if(petId === cat._id.toString()) {
                throw "Error: pet with provided id is already added"
            }
        }

        const newPetList = [...shelter.pets, {id: catId, name: cat.name}];
        const numberOfPets = newPetList.length;
      
        const shelterCollection = await shelters();
        const updatedInfo = await shelterCollection.updateOne(
            { _id: ObjectId(shelterId) },
            {
                $set: {
                    pets: newPetList,
                    numberPets: numberOfPets
                }
            }
        );
        if(updatedInfo.modifiedCount === 0) {
            throw "Error: could not update shelter successfully";
        }

        const updatedShelter = await this.getShelterById(shelterId);
        return updatedShelter;
    },

    async getAllKillShelters(){
        let shelters = await this.getAllShelters();
        let killShelters = [];

        shelters.forEach(shelter => {
            if(shelter.killShelter === true){
                killShelters.push(shelter);
            }
        });

        return killShelters;
    },

    async findSheltersInCity(city, state){
        city = helpers.checkString(city, "shleter city");
        state = helpers.checkState(state);
        let shelters = [];
        let shelters_in_city = [];

        try{
            shelters = await this.getAllShelters();
        } catch(e){
            throw "Error: " + e;
        }

        shelters.forEach(shelter => {
            if(shelter.city === city && shelter.state === state){
                shelters_in_city.push(shelter);
            }
        });

        return shelters_in_city;
    }
}

module.exports = exportedMethods;