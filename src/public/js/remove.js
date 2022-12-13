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

const removeShelterForm = document.getElementById('removeShelter');

if(removeShelterForm){
    console.log("hi");
    const idElement = document.getElementById('shelterID');
    const idLabel = document.getElementById('idFormLabel');
    const errorDiv = document.getElementById("removeerror");

    removeShelterForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let id = undefined;
        
        try{
        id = idElement.value;
        } catch(e){
        errorDiv.hidden = false;
        let errMsg = document.createElement("p");
        errMsg.className = "error-msg";
        errMsg.innerHTML = `${error}`;
        errorDiv.appendChild("error");
        }
        try{
        id = checkId(id, "shelterId");
        } catch(e){
        errorDiv.innerHTML = "";
        errorFound(e, idElement, idLabel, errorDiv);
        }
        if(id.trim()){
        errorDiv.innerHTML = "";

        removeShelterForm.submit();
        removeShelterForm.reset();
        removeShelterForm.focus();
        } else{
        errorDiv.innerHTML = "";
        if(!id.trim()){
            errorFound("Shelter ID cannot be empty", idElement, idLabel, errorDiv);
        }
        }
    });
}