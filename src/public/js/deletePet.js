const deletePetForm = document.getElementById('deletePet');

if(deletePetForm){
  const idElement = document.getElementById('petID');
  const idLabel = document.getElementById('deletePetLabel');
  const typeElement = document.getElementById('petType');
  const typeLabel = document.getElementById('petTypeLabel');
  const errorDiv = document.getElementById("error");
  
  deletePetForm.addEventListener('submit', (event) => {
      event.preventDefault();

      let id = undefined;
      
      try{
        id = idElement.value;
        id = checkId(id, "reviewId");
      } catch(e){
        errorDiv.innerHTML = "";
        errorFound(e, idElement, idLabel, errorDiv);
        return;
      }

      let type;
      try {
        type = typeElement.value;
        type = checkAnimalType(type);
      } catch(e) {
        errorDiv.innerHTML = "";
        errorFound(e, typeElement, typeLabel, errorDiv);
        return;
      }

      if(id.trim() && type.trim()){
        errorDiv.innerHTML = "";

        deletePetForm.submit();
      } else{
        if(!id.trim()){
          errorDiv.innerHTML = "";
          errorFound("Pet ID cannot be empty", idElement, idLabel, errorDiv);
          return;
        } else if(!type.trim()){
            errorDiv.innerHTML = "";
            errorFound("Pet type cannot be empty", typeElement, typeLabel, errorDiv);
            return;
        }
      }
  });
}