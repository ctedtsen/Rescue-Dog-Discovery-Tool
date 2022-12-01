const dbConnection = require('../config/mongoConnection');
const data = require('../data')
const shelters = data.shelters;
const dogs = data.dogs;
const cats = data.cats;

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
        const shelterId = centralCali._id.toString();
        const dogWhiskey = await dogs.addDog("Whiskey", "02/28/2021", "siberian husky", "1ft10in", "50lbs", "male", [], "src/images/husky-whiskey.jpg");
        let addDog = await shelters.addRescueDog(shelterId, dogWhiskey._id.toString());
        const catFifi = await cats.addCat("Fifi", "07/05/2020", "0ft9in", "9lbs", "male", [], "src/images/norwegian-forest-1.jpeg");
        let addCat = await shelters.addRescueCat(shelterId, catFifi._id.toString());
        const dogFido = await dogs.addDog("Fido", "10/13/2019", "beagle", "1ft3in", "32lbs", "male", ["Needs heart medication"], "src/images/beagle-fido.jpg");
        addDog = await shelters.addRescueDog(shelterId, dogFido._id.toString());
        const catSimba = await cats.addCat("Simba", "05/22/2021", "0ft9in", "10lbs", "female", [], "src/images/simba-cat-1.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catSimba._id.toString());
        const dogBella = await dogs.addDog("Bella", "08/12/2021", "mudi", "1ft3in", "22lbs", "female", [], "src/images/mudi-bella.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogBella._id.toString());
        const catButterscotch = await cats.addCat("Butterscotch", "06/03/2021", "0ft8in", "9lbs", "male", [], "src/images/catButterscotch.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catButterscotch._id.toString());
        const dogHenry = await dogs.addDog("Henry", "04/11/2018", "miniature schnauzer", "0ft11in", "11lbs", "male", ["food allergies"], "src/images/mini-schnauzer-henry.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogHenry._id.toString());
        const catVera = await cats.addCat("Vera", "11/12/2021", "0ft9in", "9lbs", "female", [], "src/images/cat-vera.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catVera._id.toString());
        const dogRiley = await dogs.addDog("Riley", "05/21/2020", "beauceron", "2ft2in", "70lbs", "male", [], "src/images/beauceron-riley.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogRiley._id.toString());
        const catMilo = await cats.addCat("Milo", "08/01/2022", "0ft6in", "5lbs", "male", [], "src/images/cat-milo.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catMilo._id.toString());
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
        const shelterId = humaneSocietyTexas._id.toString();
        const dogRob = await dogs.addDog("Rob", "07/30/2019", "great dane", "2ft10in", "120lbs", "male", ["bloat easily"], "src/images/great-dane-rob.jpg");
        let addDog = await shelters.addRescueDog(shelterId, dogRob._id.toString());
        const catButterscotch = await cats.addCat("Butterscotch", "06/15/2020", "0ft9in", "10lbs", "male", [], "src/images/catButterscotch.jpeg");
        let addCat = await shelters.addRescueCat(shelterId, catButterscotch._id.toString());
        const dogBolt = await dogs.addDog("Bolt", "04/10/2021", "terrier/mix", "2ft0in", "60lbs", "male", [], "src/images/terrier-mix-bolt.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogBolt._id.toString());
        const catLola = await cats.addCat("Lola", "03/22/2019", "0ft9in", "9lbs", "female", [], "src/images/cat-lola.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catLola._id.toString());
        const dogBurton = await dogs.addDog("Burton", "05/12/2021", "german shephard/mix", "2ft3in", "65lbs", "male", [], "src/images/german-shepherd-burton.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogBurton._id.toString());
        const catLuna = await cats.addCat("Luna", "10/13/2022", "0ft5in", "5lbs", "male", [], "src/images/cat-luna.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catLuna._id.toString());
        const dogSnickerdoodle = await dogs.addDog("Snickerdoodle", "04/21/2019", "shepherd/mix ", "2ft0in", "58lbs", "female", ["heartworms"], "src/images/shepherd-snick.jpg");
        addDog = await shelters.addRescueDog(shelterId, dogSnickerdoodle._id.toString());
        const catLucky = await cats.addCat("Lucky", "11/12/2021", "0ft9in", "9lbs", "female", [], "src/images/cat-lucky.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catLucky._id.toString());
        const dogXander= await dogs.addDog("Xander", "03/12/2022", "great pyrenees", "2ft6in", "130lbs", "male", [], "src/images/great-pyrenees-xander.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogXander._id.toString());
        const catSnowball = await cats.addCat("Snowball", "01/11/2020", "0ft8in", "10lbs", "male", [], "src/images/cat-snowball.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catSnowball._id.toString());
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
            "ME",
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
