const addShelterForm = document.getElementById('addShelter');

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
      return;
    }
    try{
      checkString(city, "City");
    } catch(e){
      errorDiv.innerHTML = "";
      errorFound(e, cityElement, cityLabel, errorDiv);
      return;
    }
    try{
      checkState(state, "State");
    } catch(e){
      errorDiv.innerHTML = "";
      errorFound(e, stateElement, stateLabel, errorDiv);
      return;
    }

    if(name.trim() && city.trim() && state.trim()){
      errorDiv.innerHTML = "";

      addShelterForm.submit();
    } else{
      errorDiv.innerHTML = "";
      if(!name.trim()){
        errorFound("Shelter Name cannot be empty", nameElement, nameLabel, errorDiv);
        return;
      } else if(!city.trim()){
        errorFound("City cannot be empty", cityElement, cityLabel, errorDiv);
        return;
      } else if(!state.trim()){
        errorFound("State cannot be empty", stateElement, stateLabel, errorDiv);
        return;
      }
    }
  });
}
