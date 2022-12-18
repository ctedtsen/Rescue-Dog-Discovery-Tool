const dbConnection = require('../config/mongoConnection');
const data = require('../data')
const shelters = data.shelters;
const dogs = data.dogs;
const cats = data.cats;
const reviews = data.reviews;
const users = data.users;

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
            false,
            "n/a"
        );
        const shelterId = centralCali._id.toString();
        const dogWhiskey = await dogs.addDog("Whiskey", "02/28/2021", "siberian husky", "1ft10in", "50lbs", "male", "", "public/petImages/husky-whiskey.jpg");
        let addDog = await shelters.addRescueDog(shelterId, dogWhiskey._id.toString());
        const catFifi = await cats.addCat("Fifi", "07/05/2020", "0ft9in", "9lbs", "male", "", "public/petImages/norwegian-forest-1.jpeg");
        let addCat = await shelters.addRescueCat(shelterId, catFifi._id.toString());
        const dogFido = await dogs.addDog("Fido", "10/13/2019", "beagle", "1ft3in", "32lbs", "male", "Needs heart medication", "public/petImages/beagle-fido.jpg");
        addDog = await shelters.addRescueDog(shelterId, dogFido._id.toString());
        const catSimba = await cats.addCat("Simba", "05/22/2021", "0ft9in", "10lbs", "female", "", "public/petImages/simba-cat-1.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catSimba._id.toString());
        const dogBella = await dogs.addDog("Bella", "08/12/2021", "mudi", "1ft3in", "22lbs", "female", "", "public/petImages/mudi-bella.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogBella._id.toString());
        const catButterscotch = await cats.addCat("Butterscotch", "06/03/2021", "0ft8in", "9lbs", "male", "", "public/petImages/catButterscotch.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catButterscotch._id.toString());
        const dogHenry = await dogs.addDog("Henry", "04/11/2018", "miniature schnauzer", "0ft11in", "11lbs", "male", "food allergies", "public/petImages/mini-schnauzer-henry.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogHenry._id.toString());
        const catVera = await cats.addCat("Vera", "11/12/2021", "0ft9in", "9lbs", "female", "", "public/petImages/cat-vera.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catVera._id.toString());
        const dogRiley = await dogs.addDog("Riley", "05/21/2020", "beauceron", "2ft2in", "70lbs", "male", "", "public/petImages/beauceron-riley.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogRiley._id.toString());
        const catMilo = await cats.addCat("Milo", "08/01/2022", "0ft6in", "5lbs", "male", "", "public/petImages/cat-milo.jpeg");
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
            false,
            "n/a"
        );
        const shelterId = humaneSocietyTexas._id.toString();
        const dogRob = await dogs.addDog("Rob", "07/30/2019", "great dane", "2ft10in", "120lbs", "male", "bloats easily", "public/petImages/great-dane-rob.jpg");
        let addDog = await shelters.addRescueDog(shelterId, dogRob._id.toString());
        const catButterscotch = await cats.addCat("Butterscotch", "06/15/2020", "0ft9in", "10lbs", "male", "", "public/petImages/catButterscotch.jpeg");
        let addCat = await shelters.addRescueCat(shelterId, catButterscotch._id.toString());
        const dogBolt = await dogs.addDog("Bolt", "04/10/2021", "terrier/mix", "2ft0in", "60lbs", "male", "", "public/petImages/terrier-mix-bolt.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogBolt._id.toString());
        const catLola = await cats.addCat("Lola", "03/22/2019", "0ft9in", "9lbs", "female", "", "public/petImages/cat-lola.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catLola._id.toString());
        const dogBurton = await dogs.addDog("Burton", "05/12/2021", "german shephard/mix", "2ft3in", "65lbs", "male", "", "public/petImages/german-shepherd-burton.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogBurton._id.toString());
        const catLuna = await cats.addCat("Luna", "10/13/2022", "0ft5in", "5lbs", "male", "", "public/petImages/cat-luna.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catLuna._id.toString());
        const dogSnickerdoodle = await dogs.addDog("Snickerdoodle", "04/21/2019", "shepherd/mix ", "2ft0in", "58lbs", "female", "heartworms", "public/petImages/shepherd-snick.jpg");
        addDog = await shelters.addRescueDog(shelterId, dogSnickerdoodle._id.toString());
        const catLucky = await cats.addCat("Lucky", "11/12/2021", "0ft9in", "9lbs", "female", "", "public/petImages/cat-lucky.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catLucky._id.toString());
        const dogXander = await dogs.addDog("Xander", "03/12/2022", "great pyrenees", "2ft6in", "130lbs", "male", "", "public/petImages/great-pyrenees-xander.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogXander._id.toString());
        const catSnowball = await cats.addCat("Snowball", "01/11/2020", "0ft8in", "10lbs", "male", "", "public/petImages/cat-snowball.jpeg");
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
            false,
            "n/a"
        );
        const shelterId = homewardNorDa._id.toString();
        const dogAmil = await dogs.addDog("Amil", "05/19/2021", "shepherd/mix", "2ft1in", "57lbs", "male", "", "public/petImages/shepherd-amil.jpeg");
        let addDog = await shelters.addRescueDog(shelterId, dogAmil._id.toString());
        const catBella = await cats.addCat("Bella", "09/25/2020", "0ft9in", "9lbs", "female", "not a fan of small children", "public/petImages/cat-bella.jpeg");
        let addCat = await shelters.addRescueCat(shelterId, catBella._id.toString());
        const dogColt = await dogs.addDog("Colt", "12/10/2017", "mixed breed", "2ft1in", "62lbs", "male", "", "public/petImages/mixed-colt.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogColt._id.toString());
        const catAgatha = await cats.addCat("Agatha", "09/21/2018", "0ft9in", "9lbs", "female", "", "public/petImages/cat-agatha.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catAgatha._id.toString());
        const dogIngrid = await dogs.addDog("Ingrid", "05/07/2022", "terrier/mix", "0ft10in", "17lbs", "female", "", "public/petImages/terrier-ingrid.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogIngrid._id.toString());
        const catPickles = await cats.addCat("Pickles", "09/14/2017", "0ft10in", "10lbs", "female", "", "public/petImages/cat-pickles.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catPickles._id.toString());
        const dogTauriel = await dogs.addDog("Tauriel", "11/01/2015", "terrier/american pit bull/mix ", "2ft4in", "62lbs", "female", "heartworms", "public/petImages/terrier-mix-tauriel.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogTauriel._id.toString());
        const catPumpkin = await cats.addCat("Pumpkin", "02/03/2020", "0ft9in", "9lbs", "male", "", "public/petImages/cat-pumpkin.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catPumpkin._id.toString());
        const dogBlizzard = await dogs.addDog("Blizzard", "12/01/2020", "alaskan husky/mix", "1ft9in", "50lbs", "male", "", "public/petImages/husky-blizzard.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogBlizzard._id.toString());
        const catSammy = await cats.addCat("Sammy", "06/23/2018", "0ft9in", "11lbs", "male", "needs quiet environment, no other dogs", "public/petImages/cat-sammy.jpeg");
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
            false,
            "n/a"
        );
        const shelterId = oregonDogRescue._id.toString();
        const dogJade = await dogs.addDog("Jade", "08/02/2022", "russel terrier", "0ft8in", "10lbs", "female", "", "public/petImages/russel-terrier-jade.jpeg");
        let addDog = await shelters.addRescueDog(shelterId, dogJade._id.toString());
        const dogStella = await dogs.addDog("Stella", "04/16/2019", "american staffordshire terrier", "1ft10in", "65lbs", "female", "", "public/petImages/terrier-stella.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogStella._id.toString());
        const dogPhantom = await dogs.addDog("Phantom", "08/02/2022", "russel terrier", "0ft9in", "12lbs", "male", "", "public/petImages/russel-terrier-phantom.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogPhantom._id.toString());
        const dogMisha = await dogs.addDog("Misha", "03/12/2022", "mixed breed", "1ft10in", "40lbs", "female", "", "public/petImages/mixed-breed-misha.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogMisha._id.toString());
        const dogOpal = await dogs.addDog("Opal", "12/12/2021", "australian cattle/blue heeler/mix", "1ft5in", "30lbs", "male", "", "public/petImages/aus-cattle-opal.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogOpal._id.toString());
        const dogAce = await dogs.addDog("Ace", "10/14/2016", "mixed-breed", "1ft10in", "60lbs", "male", "", "public/petImages/mixed-breed-ace.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogAce._id.toString());
        const dogMaddie = await dogs.addDog("Maddie", "07/19/2022", "labrador retriever/mix ", "0ft11in", "15lbs", "female", "", "public/petImages/lab-retriever-maddie.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogMaddie._id.toString());
        const dogMalone = await dogs.addDog("Malone", "01/29/2022", "mixed-breed", "0ft9in", "40lbs", "male", "", "public/petImages/mixed-breed-malone.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogMalone._id.toString());
        const dogPorter = await dogs.addDog("Porter", "03/12/2022", "mixed breed", "1ft5in", "22lbs", "male", "not a fan of small children", "public/petImages/mixed-porter.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogPorter._id.toString());
        const dogCotton = await dogs.addDog("Cotton", "02/07/2020", "labrador retriever/mix", "1ft9in", "60lbs", "female", "", "public/petImages/lab-retriever-cotton.jpeg");
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
            true,
            "7"
        );
        const shelterId = harvestHillsMaine._id.toString();
        const dogJoani = await dogs.addDog("Joani", "04/30/2022", "labrador retriever/mix", "1ft8in", "52lbs", "female", "", "public/petImages/lab-retriever-joani.jpeg");
        let addDog = await shelters.addRescueDog(shelterId, dogJoani._id.toString());
        const catLurch = await cats.addCat("Lurch", "07/05/2022", "0ft9in", "9lbs", "male", "needs quiet environment", "public/petImages/cat-lurch.jpeg");
        let addCat = await shelters.addRescueCat(shelterId, catLurch._id.toString());
        const dogGypsy = await dogs.addDog("Gypsy", "10/19/2015", "mixed breed", "1ft10in", "60lbs", "female", "not a fan of small children", "public/petImages/mixed-breed-gypsy.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogGypsy._id.toString());
        const catTabby = await cats.addCat("Tabby", "11/26/2019", "0ft10in", "10lbs", "male", "", "public/petImages/cat-tabby.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catTabby._id.toString());
        const dogGomer = await dogs.addDog("Gomer", "06/21/2018", "hound/mix", "1ft10in", "58lbs", "male", "", "public/petImages/hound-mix-gomer.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogGomer._id.toString());
        const catJames = await cats.addCat("James", "04/07/2022", "0ft9in", "10lbs", "male", "cerebellar hypoplasia", "public/petImages/cat-james.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catJames._id.toString());
        const dogOakley = await dogs.addDog("Oakley", "05/16/2020", "boxer/mix ", "1ft8in", "52lbs", "female", "", "public/petImages/boxer-mix-oakley.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogOakley._id.toString());
        const catDulce = await cats.addCat("Dulce", "03/23/2012", "0ft9in", "11lbs", "female", "", "public/petImages/cat-dulce.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catDulce._id.toString());
        const dogYukon = await dogs.addDog("Yukon", "11/09/2020", "mixed breed", "1ft10in", "49lbs", "male", "must be only dog at home", "public/petImages/mixed-breed-yukon.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogYukon._id.toString());
        const catTilly = await cats.addCat("Tilly", "10/12/2015", "0ft8in", "9lbs", "female", "", "public/petImages/cat-tilly.jpeg");
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
            true,
            "5"
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
            false,
            "n/a"
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
            false,
            "n/a"
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
            true,
            "2"
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
            false,
            "n/a"
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
            false,
            "n/a"
        );
        const shelterId = fultonCoGa._id.toString();
        const dogAndy = await dogs.addDog("Andy", "05/19/2021", "Swedish Vallhund", "2ft1in", "57lbs", "male", "", "public/petImages/Swedish_Vallhund-Andy.jpeg");
        let addDog = await shelters.addRescueDog(shelterId, dogAndy._id.toString());
        const catHarry = await cats.addCat("Harry", "09/25/2020", "0ft9in", "9lbs", "female", "not a fan of small children", "public/petImages/Peterbald_cat-Harry.jpeg");
        let addCat = await shelters.addRescueCat(shelterId, catHarry._id.toString());
        const dogKopy = await dogs.addDog("Kopy", "12/10/2017", "Sloughi", "2ft1in", "62lbs", "male", "", "public/petImages/Sloughi-Kopy.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogKopy._id.toString());
        const catAshu = await cats.addCat("Ashu", "09/21/2018", "0ft9in", "9lbs", "female", "", "public/petImages/Nebelung_cat-Ashu.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catAshu._id.toString());
        const dogNoddy = await dogs.addDog("Noddy", "05/07/2022", "Taigan", "0ft10in", "17lbs", "female", "", "public/petImages/Taigan-Noddy.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogNoddy._id.toString());
        const catGarry = await cats.addCat("Garry", "09/14/2017", "0ft10in", "10lbs", "female", "", "public/petImages/minuet_cat.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catGarry._id.toString());
        const dogJury = await dogs.addDog("Jury", "11/01/2015", "Otterhound ", "2ft4in", "62lbs", "female", "heartworms", "public/petImages/Otterhound-Jury.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogJury._id.toString());
        const catKiki = await cats.addCat("Kiki", "02/03/2020", "0ft9in", "9lbs", "male", "", "public/petImages/Cornish_cat-Kiki.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catKiki._id.toString());
        const dogDidi = await dogs.addDog("Didi", "12/01/2020", "Pumi", "1ft9in", "50lbs", "male", "", "public/petImages/Pumi_Didi.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogDidi._id.toString());
        const catRoss = await cats.addCat("Ross", "06/23/2018", "0ft9in", "11lbs", "male", "needs quiet environment, no other dogs", "public/petImages/Ragdoll-cat-Ross.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catRoss._id.toString());
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
            false,
            "n/a"
        );
        const shelterId = humaneSocietyNc._id.toString();
        const dogJudy = await dogs.addDog("Judy", "04/01/2022", "Scottish_Deerhound", "0ft9in", "10lbs", "female", "", "public/petImages/Scottish_Deerhound-Judy.jpeg");
        let addDog = await shelters.addRescueDog(shelterId, dogJudy._id.toString());
        const catLina = await cats.addCat("Lina", "10/09/2021", "0ft7in", "8lbs", "female", "needs quiet environment", "public/petImages/Tonkinese_cat-Lina.jpeg");
        let addCat = await shelters.addRescueCat(shelterId, catLina._id.toString());
        const dogStony = await dogs.addDog("Stony", "04/12/2020", "Wirehaired Vizsla", "1ft10in", "64lbs", "male", "", "public/petImages/Wirehaired_Vizsla-Stony.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogStony._id.toString());
        const catTania = await cats.addCat("Tania", "10/22/2019", "0ft10in", "18lbs", "female", "", "public/petImages/Turkish_Angora-Tania.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catTania._id.toString());
        const dogPiggy = await dogs.addDog("Piggy", "09/02/2021", "Schipperke", "0ft7in", "14lbs", "male", "", "public/petImages/Schipperke_Piggy.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogPiggy._id.toString());
        const catJerry = await cats.addCat("Jerry", "04/04/2014", "0ft9in", "11lbs", "male", "cerebellar hypoplasia", "public/petImages/York_Chocolate-Jerry.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catJerry._id.toString());
        const dogMalu = await dogs.addDog("Malu", "05/12/2021", "Standard Schnauzer", "1ft10in", "42lbs", "female", "", "public/petImages/Standard_Schnauzer-Malu.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogMalu._id.toString());
        const catDeena = await cats.addCat("Deena", "04/21/2012", "0ft8in", "18lbs", "male", "", "public/petImages/Ukrainian_Levkoy_cat-Deena.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catDeena._id.toString());
        const dogTom = await dogs.addDog("Tom", "09/12/2020", "Tazy", "1ft6in", "28lbs", "male", "not a fan of small children", "public/petImages/Tazy-Tom.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogTom._id.toString());
        const catTisya = await cats.addCat("Tisya", "10/12/2019", "0ft6in", "9lbs", "female", "", "public/petImages/SelkirkRex-cat-Tisya.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catTisya._id.toString());
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
            false,
            "n/a"
        );
        const shelterId = calvertAnimalMd._id.toString();
        const dogJoshy = await dogs.addDog("Joshy", "04/22/2022", "Smaland_Hound", "1ft8in", "52lbs", "female", "", "public/petImages/Smaland_Hound-Joshy.jpeg");
        let addDog = await shelters.addRescueDog(shelterId, dogJoshy._id.toString());
        const catLuna = await cats.addCat("Luna", "09/05/2021", "0ft9in", "5lbs", "female", "needs quiet environment", "public/petImages/Maine_Coon-Luna.jpeg");
        let addCat = await shelters.addRescueCat(shelterId, catLuna._id.toString());
        const dogGary = await dogs.addDog("Gary", "09/25/2015", "Volpino_Italiano", "1ft10in", "55lbs", "male", "not a fan of small children", "public/petImages/Volpino_Italiano-Gary.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogGary._id.toString());
        const catToby = await cats.addCat("Toby", "10/30/2017", "0ft10in", "13lbs", "male", "", "public/petImages/Manx_cat-Toby.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catToby._id.toString());
        const dogSuku = await dogs.addDog("Suku", "03/25/2018", "Tibet Terrier", "1ft10in", "66lbs", "female", "", "public/petImages/Tibet_Terrier-Suku.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogSuku._id.toString());
        const catJelly = await cats.addCat("Jelly", "04/09/2021", "0ft7in", "10lbs", "female", "cerebellar hypoplasia", "public/petImages/Snowshoe_cat-Jelly.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catJelly._id.toString());
        const dogOtty = await dogs.addDog("Otty", "05/20/2020", "Xiasi", "1ft8in", "45lbs", "male", "", "public/petImages/Xiasi_Otty.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogOtty._id.toString());
        const catDaisy = await cats.addCat("Daisy", "04/22/2012", "0ft9in", "19lbs", "female", "", "public/petImages/Singapura_cat-Daisy.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catDaisy._id.toString());
        const dogLala = await dogs.addDog("Lala", "10/09/2020", "Yakutian_Laika", "1ft10in", "52lbs", "male", "must be only dog at home", "public/petImages/Yakutian_Laika-Lala.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogLala._id.toString());
        const catTiny = await cats.addCat("Tiny", "11/12/2018", "0ft8in", "6lbs", "female", "", "public/petImages/Sphynx_cat-Tiny.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catTiny._id.toString());
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
            false,
            "n/a"
        );
        const shelterId = saveNj._id.toString();
        const dogVeera = await dogs.addDog("Veera", "06/20/2021", "Treeing_Cur", "2ft1in", "59lbs", "female", "", "public/petImages/Treeing_Cur-Veera.jpeg");
        let addDog = await shelters.addRescueDog(shelterId, dogVeera._id.toString());
        const catBush = await cats.addCat("Bush", "09/22/2020", "0ft8in", "11lbs", "female", "not a fan of small children", "public/petImages/Foldex_cat-Bush.jpeg");
        let addCat = await shelters.addRescueCat(shelterId, catBush._id.toString());
        const dogCobalt = await dogs.addDog("Cobalt", "12/09/2019", "Zerdava", "2ft1in", "65lbs", "male", "", "public/petImages/Zerdava-Cobalt.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogCobalt._id.toString());
        const catAndona = await cats.addCat("Andona", "09/15/2018", "0ft4in", "8lbs", "female", "", "public/petImages/Highlander_cat-Andona.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catAndona._id.toString());
        const dogIndigo = await dogs.addDog("Indigo", "09/07/2022", "Wetterhoun", "0ft10in", "19lbs", "female", "", "public/petImages/Wetterhoun-Indigo.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogIndigo._id.toString());
        const catPiku = await cats.addCat("Piku", "09/27/2017", "0ft9in", "5lbs", "male", "", "public/petImages/Japanese_Bobtail-Piku.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catPiku._id.toString());
        const dogTaru = await dogs.addDog("Taru", "10/01/2015", "Segugio_Italiano", "2ft8in", "62lbs", "male", "heartworms", "public/petImages/Segugio_Italiano-Taru.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogTaru._id.toString());
        const catLana = await cats.addCat("Lana", "08/08/2020", "0ft7in", "4lbs", "female", "", "public/petImages/Khao_Manee-Lana.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catLana._id.toString());
        const dogBluey = await dogs.addDog("Bluey", "12/05/2020", "Jämthund", "1ft5in", "77lbs", "male", "", "public/petImages/Jämthund-Bluey.jpeg");
        addDog = await shelters.addRescueDog(shelterId, dogBluey._id.toString());
        const catSandy = await cats.addCat("Sandy", "06/27/2018", "0ft6in", "11lbs", "male", "needs quiet environment, no other dogs", "public/petImages/Korat-cat-Sandy.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catSandy._id.toString());
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
            false,
            "n/a"
        );
        const shelterId = spcaCt._id.toString();
        const dogVilly = await dogs.addDog("Villy", "04/22/2021", "Belgian Shepherd", "1ft5in", "25lbs", "male", "", "public/petImages/BelgianShepherd-Villy.jpeg");
        let addDog = await shelters.addRescueDog(shelterId, dogVilly._id.toString());
        const catKetty = await cats.addCat("Ketty", "06/09/2020", "0ft8in", "10lbs", "female", "", "public/petImages/ArabianMau-Ketty.jpeg");
        let addCat = await shelters.addRescueCat(shelterId, catKetty._id.toString());
        const dogTommy = await dogs.addDog("Tommy", "01/18/2019", "borzoi", "1ft4in", "31lbs", "male", "Needs heart medication", "public/petImages/borzoi-Tommy.jpg");
        addDog = await shelters.addRescueDog(shelterId, dogTommy._id.toString());
        const catSushi = await cats.addCat("Sushi", "03/20/2021", "0ft6in", "10lbs", "male", "", "public/petImages/AustralianMist-Sushi.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catSushi._id.toString());
        const dogAmy = await dogs.addDog("Amy", "06/11/2021", "Harrier", "1ft5in", "25lbs", "female", "", "public/petImages/Harrier-Amy.jpg");
        addDog = await shelters.addRescueDog(shelterId, dogAmy._id.toString());
        const catViolet = await cats.addCat("Violet", "02/08/2021", "0ft7in", "9lbs", "male", "", "public/petImages/Male_Burmilla_catViolet.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catViolet._id.toString());
        const dogBetty = await dogs.addDog("Betty", "01/11/2018", "Pekingese", "0ft10in", "18lbs", "female", "food allergies", "public/petImages/Pekingese-Betty.jpg");
        addDog = await shelters.addRescueDog(shelterId, dogBetty._id.toString());
        const catAsh = await cats.addCat("Ash", "10/12/2021", "0ft9in", "9lbs", "female", "", "public/petImages/CyprusShorthair-Ash.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catAsh._id.toString());
        const dogSam = await dogs.addDog("Sam", "08/11/2020", "Smooth Collie", "2ft2in", "60lbs", "male", "", "public/petImages/Smooth_Collie-Sam.jpg");
        addDog = await shelters.addRescueDog(shelterId, dogSam._id.toString());
        const catFluffles = await cats.addCat("Fluffles", "09/03/2022", "0ft9in", "7lbs", "female", "", "public/petImages/Egyptian_Mau-Fluffles.jpeg");
        addCat = await shelters.addRescueCat(shelterId, catFluffles._id.toString());
    } catch(e) {
        console.log(e);
    }

    try{
        let user1 = await users.createUser("ariel", "#PartOfThatWor1d", "Atlantis", "Utah", false);
    } catch(e) {
        console.log(e + "user1");
    }

    try{
        let user2 = await users.createUser("belle", "Teapot1!", "NYC", "NY", false);
    } catch(e) {
        console.log(e + "user2");
    }

    try{
        let user3 = await users.createUser("moana", "howFar1llgo&", "Honolulu", "Hawaii", false);
    } catch(e) {
        console.log(e + "user3");
    }

    try{
        let user4 = await users.createUser("elsa", "#1ceQueen", "Anchorage", "Alaska", false);
    } catch(e) {
        console.log(e + "user4");
    }

    try{
        let user5 = await users.createUser("anna", "HansSucks!11", "Portland", "Maine", false);
    } catch(e) {
        console.log(e + "user5");
    }

    try{
        let user6 = await users.createUser("mulan", "Reflection#2", "Los Angeles", "Ca", false);
    } catch(e) {
        console.log(e + "user6");
    }

    try{
        let user7 = await users.createUser("cinderella", "glassShoes1%", "Las Vegas", "Nevada", false);
    } catch(e) {
        console.log(e + "user7");
    }

    try{
        let user8 = await users.createUser("rapunzel", "FryingPan11!", "Hoboken", "NJ", false);
    } catch(e) {
        console.log(e + "user8");
    }

    try{
        let user9 = await users.createUser("tiana", "avoidFr0gs!", "New Orleans", "La", true);
    } catch(e) {
        console.log(e + "user9");
    }

    try{
        let user10 = await users.createUser("jasmine", "1LoveTigers!", "Seatle", "Washington", true);
    } catch(e) {
        console.log(e + "user10");
    }

    await dbConnection.closeConnection();
}

main();
