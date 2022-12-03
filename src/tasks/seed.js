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
        const dogRob = await dogs.addDog("Rob", "07/30/2019", "great dane", "2ft10in", "120lbs", "male", ["bloats easily"], "src/images/great-dane-rob.jpg");
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
        const dogXander = await dogs.addDog("Xander", "03/12/2022", "great pyrenees", "2ft6in", "130lbs", "male", [], "src/images/great-pyrenees-xander.jpeg");
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
        const shelterId = homewardNorDa._id.toString();
        const dogAmil = await dogs.addDog("Amil", "05/19/2021", "shepherd/mix", "2ft1in", "57lbs", "male", [], "src/images/shepherd-amil.jpeg");
        let addDog = await shelters.addRescueDog(shelterId, dogAmil._id.toString());
        const catBella = await cats.addCat("Bella", "09/25/2020", "0ft9in", "9lbs", "female", ["not a fan of small children"], "src/images/cat-bella.jpeg");
        let addCat = await shelters.addRescueCat(shelterId, catBella._id.toString());
        const dogColt = await dogs.addDog("Colt", "12/10/2017", "mixed breed", "2ft1in", "62lbs", "male", [], "src/images/mixed-colt.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogColt._id.toString());
        const catAgatha = await cats.addCat("Agatha", "09/21/2018", "0ft9in", "9lbs", "female", [], "src/images/cat-agatha.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catAgatha._id.toString());
        const dogIngrid = await dogs.addDog("Ingrid", "05/07/2022", "terrier/mix", "0ft10in", "17lbs", "female", [], "src/images/terrier-ingrid.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogIngrid._id.toString());
        const catPickles = await cats.addCat("Pickles", "09/14/2017", "0ft10in", "10lbs", "female", [], "src/images/cat-pickles.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catPickles._id.toString());
        const dogTauriel = await dogs.addDog("Tauriel", "11/01/2015", "terrier/american pit bull/mix ", "2ft4in", "62lbs", "female", ["heartworms"], "src/images/terrier-mix-tauriel.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogTauriel._id.toString());
        const catPumpkin = await cats.addCat("Pumpkin", "02/03/2020", "0ft9in", "9lbs", "male", [], "src/images/cat-pumpkin.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catPumpkin._id.toString());
        const dogBlizzard = await dogs.addDog("Blizzard", "12/01/2020", "alaskan husky/mix", "1ft9in", "50lbs", "male", [], "src/images/husky-blizzard.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogBlizzard._id.toString());
        const catSammy = await cats.addCat("Sammy", "06/23/2018", "0ft9in", "11lbs", "male", ["needs quiet environment"], "src/images/cat-sammy.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catSammy._id.toString());
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
        const shelterId = oregonDogRescue._id.toString();
        const dogJade = await dogs.addDog("Jade", "08/02/2022", "russel terrier", "0ft8in", "10lbs", "female", [], "src/images/russel-terrier-jade.jpeg");
        let addDog = await shelters.addRescueDog(shelterId, dogJade._id.toString());
        const dogStella = await dogs.addDog("Stella", "04/16/2019", "american staffordshire terrier", "1ft10in", "65lbs", "female", [], "src/images/terrier-stella.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogStella._id.toString());
        const dogPhantom = await dogs.addDog("Phantom", "08/02/2022", "russel terrier", "0ft9in", "12lbs", "male", [], "src/images/russel-terrier-phantom.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogPhantom._id.toString());
        const dogMisha = await dogs.addDog("Misha", "03/12/2022", "mixed breed", "1ft10in", "40lbs", "female", [], "src/images/mixed-breed-misha.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogMisha._id.toString());
        const dogOpal = await dogs.addDog("Opal", "12/12/2021", "australian cattle/blue heeler/mix", "1ft5in", "30lbs", "male", [], "src/images/aus-cattle-opal.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogOpal._id.toString());
        const dogAce = await dogs.addDog("Ace", "10/14/2016", "mixed-breed", "1ft10in", "60lbs", "male", [], "src/images/mixed-breed-ace.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogAce._id.toString());
        const dogMaddie = await dogs.addDog("Maddie", "07/19/2022", "labrador retriever/mix ", "0ft11in", "15lbs", "female", [], "src/images/lab-retriever-maddie.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogMaddie._id.toString());
        const dogMalone = await dogs.addDog("Malone", "01/29/2022", "mixed-breed", "0ft9in", "40lbs", "male", [], "src/images/mixed-breed-malone.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogMalone._id.toString());
        const dogPorter = await dogs.addDog("Porter", "03/12/2022", "mixed breed", "1ft5in", "22lbs", "male", ["not a fan of small children"], "src/images/mixed-porter.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogPorter._id.toString());
        const dogCotton = await dogs.addDog("Cotton", "02/07/2020", "labrador retriever/mix", "1ft9in", "60lbs", "female", [], "src/images/lab-retriever-cotton.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogCotton._id.toString());
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
        const shelterId = harvestHillsMaine._id.toString();
        const dogJoani = await dogs.addDog("Joani", "04/30/2022", "labrador retriever/mix", "1ft8in", "52lbs", "female", [], "src/images/lab-retriever-joani.jpeg");
        let addDog = await shelters.addRescueDog(shelterId, dogJoani._id.toString());
        const catLurch = await cats.addCat("Lurch", "07/05/2022", "0ft9in", "9lbs", "male", ["needs quiet environment"], "src/images/cat-lurch.jpeg");
        let addCat = await shelters.addRescueCat(shelterId, catLurch._id.toString());
        const dogGypsy = await dogs.addDog("Gypsy", "10/19/2015", "mixed breed", "1ft10in", "60lbs", "female", ["not a fan of small children"], "src/images/mixed-breed-gypsy.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogGypsy._id.toString());
        const catTabby = await cats.addCat("Tabby", "11/26/2019", "0ft10in", "10lbs", "male", [], "src/images/cat-tabby.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catTabby._id.toString());
        const dogGomer = await dogs.addDog("Gomer", "06/21/2018", "hound/mix", "1ft10in", "58lbs", "male", [], "src/images/hound-mix-gomer.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogGomer._id.toString());
        const catJames = await cats.addCat("James", "04/07/2022", "0ft9in", "10lbs", "male", ["cerebellar hypoplasia"], "src/images/cat-james.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catJames._id.toString());
        const dogOakley = await dogs.addDog("Oakley", "05/16/2020", "boxer/mix ", "1ft8in", "52lbs", "female", [], "src/images/boxer-mix-oakley.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogOakley._id.toString());
        const catDulce = await cats.addCat("Dulce", "03/23/2012", "0ft9in", "11lbs", "female", [], "src/images/cat-dulce.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catDulce._id.toString());
        const dogYukon = await dogs.addDog("Yukon", "11/09/2020", "mixed breed", "1ft10in", "49lbs", "male", ["must be only dog at home"], "src/images/mixed-breed-yukon.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogYukon._id.toString());
        const catTilly = await cats.addCat("Tilly", "10/12/2015", "0ft8in", "9lbs", "female", [], "src/images/cat-tilly.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catTilly._id.toString());
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
