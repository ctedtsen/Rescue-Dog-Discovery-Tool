const alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m",
  "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];

let checkString = (str, varName) => {
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
  
    return str;
};

let checkId = (id, varName) => {
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
};

let checkName = (name) => {
    checkString(name, "name");
    name = name.trim();
    if (name.length < 3) throw "Error: name cannot be less than 3 characters";
    for (let char of name) {
      if (!alphabet.includes(char.toLowerCase())) {
        throw "Error: name must contain only letters"
      }
    }
    return name;
};

let checkState = (state) => {
  state = checkString(state, "state");

  state = state.toLowerCase();

  if (state === "alabama" || state === "al") {
    state = "AL";
  } else if (state === "alaska" || state === "ak") {
    state = "AK";
  } else if (state === "arkansas" || state == "ar") {
    state = "AR";
  } else if (state === "california" || state == "ca") {
    state = "CA";
  } else if (state === "colorado" || state == "co") {
    state = "CO";
  } else if (state === "connecticut" || state == "ct") {
    state = "CT";
  } else if (state === "deleware" || state == "de") {
    state = "DE";
  } else if (state === "district of columbia" || state == "dc") {
    state = "DC";
  } else if (state === "florida" || state == "fl") {
    state = "FL";
  } else if (state === "georgia" || state == "ga") {
    state = "GA";
  } else if (state === "hawaii" || state == "hi") {
    state = "HI";
  } else if (state === "idaho" || state == "id") {
    state = "ID";
  } else if (state === "illinois" || state == "il") {
    state = "IL";
  } else if (state === "iowa" || state == "ia") {
    state = "IA";
  } else if (state === "kansas" || state == "ks") {
    state = "KS";
  } else if (state === "kentucky" || state == "ky") {
    state = "KY";
  } else if (state === "louisiana" || state == "la") {
    state = "LA";
  } else if (state === "maine" || state == "me") {
    state = "ME";
  } else if (state === "maryland" || state == "md") {
    state = "MD";
  } else if (state === "massachusetts" || state == "ma") {
    state = "MA";
  } else if (state === "michigan" || state == "mi") {
    state = "MI";
  } else if (state === "minnesota" || state == "mn") {
    state = "MN";
  } else if (state === "mississippi" || state == "ms") {
    state = "MS";
  } else if (state === "missouri" || state == "mo") {
    state = "MO";
  } else if (state === "montana" || state == "mt") {
    state = "MT";
  } else if (state === "nebraska" || state == "ne") {
    state = "NE";
  } else if (state === "nevada" || state == "nv") {
    state = "NV";
  } else if (state === "new hampshire" || state == "nh") {
    state = "NH";
  } else if (state === "new jersey" || state == "nj") {
    state = "NJ";
  } else if (state === "new mexico" || state == "nm") {
    state = "NM";
  } else if (state === "new york" || state == "ny") {
    state = "NY";
  } else if (state === "north carolina" || state == "nc") {
    state = "NC";
  } else if (state === "north dakota" || state == "nd") {
    state = "ND";
  } else if (state === "ohio" || state == "oh") {
    state = "OH";
  } else if (state === "oklahoma" || state == "ok") {
    state = "OK";
  } else if (state === "oregon" || state == "or") {
    state = "OR";
  } else if (state === "pennsylvania" || state == "pa") {
    state = "PA";
  } else if (state === "rhode island" || state == "ri") {
    state = "RI";
  } else if (state === "sout carolina" || state == "sc") {
    state = "SC";
  } else if (state === "south dakota" || state == "sd") {
    state = "SD";
  } else if (state === "tennessee" || state == "tn") {
    state = "TN";
  } else if (state === "texas" || state == "tx") {
    state = "TX";
  } else if (state === "utah" || state == "ut") {
    state = "UT";
  } else if (state === "vermont" || state == "vt") {
    state = "VT";
  } else if (state === "virginia" || state == "va") {
    state = "VA";
  } else if (state === "washington" || state == "wa") {
    state = "WA";
  } else if (state === "west virginia" || state == "wv") {
    state = "WV";
  } else if (state === "wisconsin" || state == "wi") {
    state = "WI";
  } else if (state === "wyoming" || state == "wy") {
    state = "WY";
  } else {
    throw "Error: invalid state input";
  }

  return state;
};

let checkPersonName = (personName) => {
    personName = checkString(personName, "Commenter Name");

    let numSpaces = 0;
    for(let i = 0; i < personName.length; i++){
      if(personName[i] === ' '){
        numSpaces = numSpaces + 1;
      }
    }
 
    if(numSpaces !== 1){
      throw "Error: incorrect format for name?";
    }

    let name = personName.split(' ');
    let firstName = name[0];
    let lastName = name[1];

    firstName = checkName(firstName);
    lastName = checkName(lastName);

    let fullName = firstName + " " + lastName

    return fullName;
};

let checkAnimalType = (animalType) => {
    animalType = checkStringComment(animalType, "animalType");
    animalType = animalType.toLowerCase();

    if (animalType === "dog") {
      return "dog";
    } else if (animalType === "cat") {
      return "cat";
    } else {
      throw "Error: animalType must be dog or cat";
    }
};

let errorFound = (error, varInput, varLabel, errorDiv) => {
  varInput.value = "";
  errorDiv.hidden = false;
  let errMsg = document.createElement("p");
  errMsg.className = "error-msg";
  errMsg.innerHTML = `${error}`;
  errorDiv.appendChild(errMsg);
  varLabel.className = "error";
  varInput.focus();
  varInput.className = "inputClass";
  return;
};

let checkRating = (rating) => {
  if(!rating){
    throw "Error: rating must be provided";
  }
  rating = checkString(rating, "rating");
  rating = Number(rating);
  if(isNaN(rating)){
    throw "Error: rating is not a number";
  }
  if(typeof rating !== "number"){
    throw "Error: rating must be of type number";
  }
  if(rating < 1 || rating > 5){
    throw "Error: rating must be a number 1 to 5";
  }
  if(rating % 1 !== 0){
    throw "Error: rating must be an integer";
  }

  return rating;
};