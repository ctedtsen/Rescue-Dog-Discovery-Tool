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

let errorFound = (error, shelterVarInput, shelterVarLabel, errorDiv) => {
  shelterVarInput.value = "";
  errorDiv.hidden = false;
  let errMsg = document.createElement("p");
  errMsg.className = "error-msg";
  errMsg.innerHTML = `${error}`;
  errorDiv.appendChild(errMsg);
  shelterVarLabel.className = "error";
  shelterVarInput.focus();
  shelterVarInput.className = "inputClass";
  return;
};

/*const addShelterForm = document.getElementById('addShelter');

if(addShelterForm){
  const nameElement = document.getElementById('shelterName');
  const nameLabel = document.getElementById('shelterNameLabel')
  const cityElement = document.getElementById('shelterCity');
  const cityLabel = document.getElementById('cityFormLabel"')
  const stateElement = document.getElementById('shelterState');
  const stateLabel = document.getElementById('shelterFormLabel');
  const errorDiv = document.getElementById("error");
  const myUl = document.getElementById("list");
  const frmLabel = document.getElementById("formLabel");

  addShelterForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let name = undefined;
    let city = undefined;
    let state = undefined;

    try{
      name = nameElement.value;
      city = cityElement.value;
      state = stateElement.value;
    } catch(e){
      errorDiv.hidden = false;
      let errMsg = document.createElement("p");
      errMsg.className = "error-msg";
      errMsg.innerHTML = `${error}`;
      errorDiv.appendChild(e);
    }
    try{
      checkString(name, "Name");
    } catch(e){
      errorDiv.innerHTML = "";
      errorFound(e, nameElement, nameLabel, errorDiv);
    }
    try{
      checkString(city, "City");
    } catch(e){
      errorDiv.innerHTML = "";
      errorFound(e, cityElement, cityLabel, errorDiv);
    }
    try{
      checkState(state, "State");
    } catch(e){
      errorDiv.innerHTML = "";
      errorFound(e, stateElement, stateLabel, errorDiv);
    }

    if(name.trim() && city.trim() && state.trim()){
      errorDiv.innerHTML = "";

      addShelterForm.submit();
      addShelterForm.reset();
      addShelterForm.focus()
    } else{
      errorDiv.innerHTML = "";
      if(!name.trim()){
        errorFound("Shelter Name cannot be empty", nameElement, nameLabel, errorDiv);
      } else if(!city.trim()){
        errorFound("City cannot be empty", cityElement, cityLabel, errorDiv);
      } else if(!state.trim()){
        errorFound("State cannot be empty", stateElement, stateLabel, errorDiv);
      }
    }
  });
}*/
