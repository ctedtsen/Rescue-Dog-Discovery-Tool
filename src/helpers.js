const { objectId } = require("mongodb");
const fs = require("fs");
const numbers = ["0", "1", "2,", "3", "4", "5", "6", "7", "8", "9"];
const path = require("path");

module.exports = {
  checkId(id, varName) {
    if (!id) {
      throw "Error: you must provide an " + varName;
    }
    if (typeof id !== "string") {
      throw "Error: " + varName + " must be of type string";
    }
    id = id.trim();
    if (id.length === 0) {
      throw "Error: " + varName + " cannot be an empty string or just spaces";
    }
    return id;
  },

  checkString(str, varName) {
    if (!str) {
      throw "Error: you must provide a " + varName;
    }
    if (typeof str !== "string") {
      throw "Error: " + varName + " must be of type string";
    }
    str = str.trim();
    if (str.length === 0) {
      throw "Error: " + varName + " cannot be an empty string or just spaces";
    }
  },

  checkBool(bool, varName) {
    if (!bool) {
      throw "Error: you must provide a " + varName;
    }
    if (typeof bool !== "boolean") {
      throw "Error " + varName + " must be of type boolean";
    }
  },

  checkName(name) {
    this.checkString(name);
    name = name.trim();
    if (name.length < 3) throw "Error: name cannot be less than 3 characters";
    return name;
  },

  checkBirthday(birthdate) {
    this.checkString(birthdate, "birthdate for rescue pet");
    birthdate = birthdate.trim();
    let dateArray = birthdate.split("/");
    if (dateArray.length != 3) throw `Error: birthdate argument is invalid`;

    const validMonths = ["01", "02", "03", "04", "05", "06",
                         "07", "08", "09", "10", "11", "12"];
    const validDays = ["31", "28", "31", "30", "31", "30", 
                       "31", "31", "30", "31", "30", "31"];

    let index = validMonths.indexOf(dateArray[0]);
    if (index < 0) throw `Error: birthdate argument is invalid`;
    let dayDifference = validDays[index] - dateArray[1];
    if (dayDifference < 0 || dayDifference > validDays[0])
      throw `Error: birthdate argument is invalid`;
    let currentYear = new Date().getFullYear();
    if (dateArray[2] > currentYear || dateArray[2] < currentYear - 30)
      throw `Error: birthdate argument is invalid`;

    return birthdate;
  },

  calcAge(birthday) {
    birthday = this.checkBirthday(birthday);
    let birthDate = new Date(birthday);
    let birthYear = birthDate.getFullYear();
    let birthMonth = birthDate.getMonth();

    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth();

    let yearDiff = currentYear - birthYear;
    let monthDiff = 0;

    if (currentMonth >= birthMonth) {
      monthDiff = currentMonth - birthMonth;
    } else {
      yearDiff -= 1;
      monthDiff = 12 + currentMonth - birthMonth;
    }
    monthDiff = monthDiff / 12;

    let age = yearDiff + monthDiff;
    if (age > 30) throw "Error: birthday argument is invalid";

    return age.toFixed(1);
  },

  checkBreed(breed) {
    this.checkString(breed, "breed type for rescue dog");
    breed = breed.trim();

    if (breed.length < 3)
      throw "Error: breed type for rescue dog cannot be less than 3 letters";

    for (letter of breed) {
      if (numbers.includes(letter))
        throw "Error: breed type for rescue dog cannot contain numbers";
    }

    return breed;
  },

  checkHeight(height) {
    this.checkString(height);
    height = height.trim();

    let heightFormat = height.split("t");
    if (heightFormat.length !== 2) throw "Error: height format is invalid";

    let feet = Number(heightFormat[0].substring(0, heightFormat[0].length - 1));
    if (typeof feet !== "number" || Number.isNaN(feet))
      throw "Error: feet value is not a number";
    if (feet < 0 || feet > 3) throw "Error: feet value is out of range";
    if (`${feet}f` !== heightFormat[0]) throw "Error: height format is invalid";

    let inches = Number(
      heightFormat[1].substring(0, heightFormat[1].length - 2)
    );
    if (typeof inches !== "number" || Number.isNaN(inches))
      throw "Error: inches value is not a number";
    if (inches < 0 || inches > 12) throw "Error: inches value is out of range";
    if (`${inches}in` !== heightFormat[1].toLowerCase())
      throw "Error: height format is invalid3";

    return `${feet}ft${inches}in`;
  },

  checkWeight(weight) {
    this.checkString(weight, "weight for rescue pet");
    weight = weight.trim();
    if (weight.length < 3)
      throw "Error: weight argument is not valid";

    let weightValue;
    let weightTxt;

    if (weight[-1] === "b") {
      weightValue = Number(weight.substring(0, weight.length - 2));
      weightTxt = "lb";
    } else {
      weightValue = Number(weight.substring(0, weight.length - 3));
      weightTxt = "lbs";
    }

    if (typeof weightValue !== "number" || Number.isNaN(weightValue))
      throw "Error: weight value is not a number";

    if (`${weightValue}${weightTxt}` !== weight.toLowerCase())
      throw "Error: weight argument is invalid";

    return `${weightValue}${weightTxt}`;
  },

  checkSexInput(input) {
    this.checkString(input, "sex of rescue pet");
    input = input.trim();
    if (input.length < 4) throw "Error: sex input is not valid1";

    input = input.toLowerCase();
    if (input !== "male" && input !== "female")
      throw "Error: sex input is not valid;";

    return input;
  },

  checkSpecialNeeds(needs) {
    if (!needs) {
      throw "Error: you must enter an array that lists special needs of rescue pet";
    }
    if (!Array.isArray(needs)) {
      throw "Error: you must enter an array that lists special needs of rescue pet";
    }
    for (item of needs) {
      this.checkString(item, "special needs element of rescue pet");
      item = item.trim();
      for (letter of item) {
        if (numbers.includes(letter)) {
          throw "Error: needs array cannot contain numbers";
        }
      }
    }

    return needs;
  },

  checkPicture(picturePath) {
    this.checkString(picturePath, "picture of rescue pet");

    if (!fs.existsSync(path.resolve(picturePath)))
      throw "Error: picture path does not exist";

    let temp = picturePath.lastIndexOf(".");
    if (temp < 1) throw "Error: image extension must exist";

    let ext = picturePath.substring(temp).toLowerCase();
    const validExtensions = [".jpg", ".jpeg", ".png"];
    if (!validExtensions.includes(ext))
      throw "Error: image extension is not valid";

    return picturePath;
  },
};
