const dbConnection = require('../config/mongoConnection');
const data = require('../data')
const shelters = data.shelters;

const main = async () => {
const db = await dbConnection.dbConnection();
await db.dropDatabase();

    //name of shelters to be added
    let centralCali = undefined;
    let humaneSocietyTexas = undefined;
    let homewardNorDa = undefined;
    let oregonDogRescue = undefined;
    let harvestHillsMaine = undefined;
    let lowellHumaneMA = undefined;
    let animalHumaneNewMex = undefined;
    let wyomingCountySPCA = undefined;
    let heartMontana = undefined;
    let helpPawsIl = undefined;
    let fultonCoGa = undefined;
    let humaneSocietyNc = undefined;
    let calvertAnimalMd = undefined;
    let saveNj = undefined;
    let spcaCt = undefined;

    //1st shelter
    try{
        //https://www.ccspca.com/
        centralCali = await shelters.addShelter(
            "Central California SPCA",
            "Fresno",
            "CA",
            false
        );
    } catch(e) {
        console.log(e);
    }

    //2nd shelter
    try{
        //https://www.hsnt.org/
        humaneSocietyTexas = await shelters.addShelter(
            "Humane Society of North Texas",
            "Forte Worth",
            "TX",
            false
        );
    } catch(e) {
        console.log(e);
    }

    //3rd shelter
    try{
        //https://www.homewardonline.org/
        homewardNorDa = await shelters.addShelter(
            "Homeward Animal Shelter",
            "Fargo",
            "ND",
            false
        );
    } catch(e) {
        console.log(e);
    }

    //4th shelter
    try{
        //https://www.oregondogrescue.org/
        oregonDogRescue = await shelters.addShelter(
            "Oregon Dog Rescue",
            "Tualatin",
            "OR",
            false
        );
    } catch(e) {
        console.log(e);
    }

    //5th shelter
    try{
        //https://harvesthills.org/
        harvestHillsMaine = await shelters.addShelter(
            "Harvest Hills Animal Shelter",
            "Fryeburg",
            "Maine",
            true
        );
    } catch(e) {
        console.log(e);
    }

    //6th shelter
    try{
        //https://www.lowellhumanesociety.org/
        lowellHumaneMA = await shelters.addShelter(
            "Lowell Humane Society",
            "Lowell",
            "MA",
            true
        );
    } catch(e) {
        console.log(e);
    }

    //7th shelter
    try{
        //https://animalhumanenm.org/adopt/adoptable-dogs-westside/#pets
        animalHumaneNewMex = await shelters.addShelter(
            "Animal Humane New Mexico Westside Adoption Center",
            "Albuquerque",
            "NM",
            false
        );
    } catch(e) {
        console.log(e);
    }

    //8th shelter
    try{
        //https://www.wyomingcountyspca.org/
        wyomingCountySPCA = await shelters.addShelter(
            "Wyoming County SPCA",
            "Attica",
            "NY",
            false
        );
    } catch(e) {
        console.log(e);
    }

    //9th shelter
    try{
        //https://www.heartofthevalleyshelter.org/adopt-a-dog/
        heartMontana = await shelters.addShelter(
            "Heart Of The Valley Animal Shelter",
            "Bozeman",
            "MT",
            true
        );
    } catch(e) {
        console.log(e);
    }

    //10th shelter
    try{
        //https://helpingpaws.net/adopt-a-dog/
        helpPawsIl = await shelters.addShelter(
            "Helping Paws Animal Shelter",
            "Woodstock",
            "IL",
            false
        );
    } catch(e) {
        console.log(e);
    }

    //11th shelter
    try{
        //https://fultonanimalservices.com/
        fultonCoGa = await shelters.addShelter(
            "Fulton County Animal Services",
            "Atlanta",
            "GA",
            false
        );
    } catch(e) {
        console.log(e);
    }
    
    //12th shelter
    try{
        //https://humanesocietyofcharlotte.org/
        humaneSocietyNc = await shelters.addShelter(
            "The Humane Society of Charlotte",
            "Charlotte",
            "NC",
            false
        );
    } catch(e) {
        console.log(e);
    }

    //13th shelter
    try{
        //http://www.cawlrescue.org/
        calvertAnimalMd = await shelters.addShelter(
            "Calvert Animal Welfare League",
            "Prince Frederick",
            "MD",
            false
        );
    } catch(e) {
        console.log(e);
    }

    //14th shelter
    try{
        //https://savehomelessanimals.org/
        saveNj = await shelters.addShelter(
            "SAVE - A Friend to Homeless Animals",
            "Montgomery",
            "NJ",
            false
        );
    } catch(e) {
        console.log(e);
    }

    //15th shelter
    try{
        //https://www.spcact.org/
        spcaCt = await shelters.addShelter(
            "SPCA of Connecticut",
            "Monroe",
            "CT",
            false
        );
    } catch(e) {
        console.log(e);
    }

    await dbConnection.closeConnection();
}

main();
