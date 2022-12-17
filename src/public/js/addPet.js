const addPetForm = document.getElementById('addPet');

if(addPetForm){
    const nameLabelElement = document.getElementById("petNameLabel");
    const newNameElement = document.getElementById("petName");
    const birthdayLabelElement = document.getElementById("birthdayLabel");
    const newBirthdayElement = document.getElementById("birthday");
    const breedLabelElement = document.getElementById("breedLabel");
    const newBreedElement = document.getElementById("breed");
    const heightLabelElement = document.getElementById("heightLabel");
    const newHeightElement = document.getElementById("height");
    const weightLabelElement = document.getElementById("weightLabel");
    const newWeightElement = document.getElementById("weight");
    const sexLabelElement = document.getElementById("sexLabel");
    const newSexElement = document.getElementById("sex");
    const needsLabelElement = document.getElementById("needsLabel");
    const newNeedsElement = document.getElementById("needs");
    const pictureLabelElement = document.getElementById("pictureLabel");
    const newPictureElement = document.getElementById("picture");
    const typeLabelElement = document.getElementById("typeLabel");
    const newTypeElement = document.getElementById("type");
    const errorDiv = document.getElementById("error");

    addPetForm.addEventListener('submit', (event) => {
        event.preventDefault();

        let newName;
        try{
            newName = newNameElement.value;
            newName = checkName(newName);
        } catch(e){
            errorDiv.innerHTML = "";
            errorFound(e, newNameElement, nameLabelElement, errorDiv);
            return;
        }
        
        let newBirthday;
        try{
            newBirthday = newBirthdayElement.value;
            newBirthday = checkBirthday(newBirthday);
        } catch(e) {
            errorDiv.innerHTML = "";
            errorFound(e, newBirthdayElement, birthdayLabelElement, errorDiv);
            return;
        }

        let newBreed;
        try{
            newBreed = newBreedElement.value;
            newBreed = checkBreed(newBreed);
        } catch(e) {
            errorDiv.innerHTML = "";
            errorFound(e, newBirthdayElement, breedLabelElement, errorDiv);
            return;
        }

        let newHeight;
        try{
            newHeight = newHeightElement.value;
            newHeight = checkHeight(newHeight);
        } catch(e) {
            errorDiv.innerHTML = "";
            errorFound(e, newHeightElement, heightLabelElement, errorDiv);
            return;
        }

        let newWeight;
        try{
            newWeight = newWeightElement.value;
            newWeight = checkWeight(newWeight);
        } catch(e) {
            errorDiv.innerHTML = "";
            errorFound(e, newWeightElement, weightLabelElement, errorDiv);
            return;
        }

        let newSex;
        try{
            newSex = newSexElement.value;
            newSex = checkSexInput(newSex);
        } catch(e) {
            errorDiv.innerHTML = "";
            errorFound(e, newSexElement, sexLabelElement, errorDiv);
            return;
        }

        let needs;
        try{
            needs = newNeedsElement.value;
            needs = checkSpecialNeeds(needs);
        } catch(e) {
            errorDiv.innerHTML = "";
            errorFound(e, newNeedsElement, needsLabelElement, errorDiv);
            return;
        }

        let newPicture;
        try{
            newPicture = newPictureElement.value;
            newPicture = checkString(newPicture, "Picture");
        } catch(e) {
            errorDiv.innerHTML = "";
            errorFound(e, newPictureElement, pictureLabelElement, errorDiv);
            return;
        }

        let newType;
        try{
            newType = newTypeElement.value;
            newType = checkAnimalType(newType);
        } catch(e) {
            errorDiv.innerHTML = "";
            errorFound(e, newTypeElement, typeLabelElement, errorDiv);
            return;
        }

        if(newName.trim() && newBirthday.trim() && newBreed.trim() && newHeight.trim() 
        && newSex.trim() && newPicture.trim() && newType.trim() && newWeight.trim()){
            errorDiv.innerHTML = "";

            addPetForm.submit();
        } else {
            if(!newName.trim()){
                errorDiv.innerHTML = "";
                errorFound("Error: you must provide a name", newNameElement, nameLabelElement, errorDiv);
                return;
            } else if(!newBirthday.trim()){
                errorDiv.innerHTML = "";
                errorFound("Error: you must provide a birthday", newBirthdayElement, birthdayLabelElement, errorDiv);
                return;
            } else if(!newBreed.trim()){
                errorDiv.innerHTML = "";
                errorFound("Error: you must provide a breed", newBirthdayElement, breedLabelElement, errorDiv);
                return;
            } else if(!newHeight.trim()){
                errorDiv.innerHTML = "";
                errorFound("Error: you must provide a height", newHeightElement, heightLabelElement, errorDiv);
                return;
            } else if(!newWeight.trim()){
                errorDiv.innerHTML = "";
                errorFound("Error: you must provide a weight", newWeightElement, weightLabelElement, errorDiv);
                return;
            } else if(!newSex.trim()){
                errorDiv.innerHTML = "";
                errorFound("Error: you must provide a sex", newSexElement, sexLabelElement, errorDiv);
                return;
            } else if(!newPicture.trim()){
                errorDiv.innerHTML = "";
                errorFound("Error: you must provide a picture", newPictureElement, pictureLabelElement, errorDiv);
                return;
            } else if(!newType.trim()){
                errorDiv.innerHTML = "";
                errorFound("Error: you must provide a animal type", newTypeElement, typeLabelElement, errorDiv);
                return;
            }
        }
    })
}