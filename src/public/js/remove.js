const removeShelterForm = document.getElementById('removeShelter');

if(removeShelterForm){
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
          id = checkCity(id, "shelter ID");
        } catch(e){
          errorDiv.innerHTML = "";
          errorFound(e, idElement, idLabel, errorDiv);
          return;
        }
        if(id.trim()){
          errorDiv.innerHTML = "";

          removeShelterForm.submit();
        } else{
          errorDiv.innerHTML = "";
          if(!id.trim()){
              errorFound("Shelter ID cannot be empty", idElement, idLabel, errorDiv);
              return;
          }
        }
    });
}