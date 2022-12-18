const searchShelterForm = document.getElementById('searchShelter');

if(searchShelterForm){
    const cityElement = document.getElementById("theCity");
    const cityLabel = document.getElementById("theCityLabel");
    const stateElement = document.getElementById("theState");
    const stateLabel = document.getElementById("theStateLabel");
    const errorDiv = document.getElementById("error");

    searchShelterForm.addEventListener('submit', (event) => {
        event.preventDefault()

        let city;
        try{
            city = cityElement.value;
            city = checkString(city, "shelter city");
        } catch(e){
            errorDiv.innerHTML = "";
            errorFound(e, cityElement, cityLabel, errorDiv);
            return;
        }

        let state;
        try{
            state = stateElement.value;
            state = checkState(state);
        } catch(e){
            errorDiv.innerHTML = "";
            errorFound(e, stateElement, stateLabel, errorDiv);
            return;
        }

        if(state.trim() && city.trim()){
            errorDiv.innerHTML = "";

            searchShelterForm.submit();
        } else {
            if(!city.trim()){
                errorFound("Error: city must be provided", cityElement, cityLabel, errorDiv);
                return;
            } else if(!state.trim()){
                errorFound("Error: state must be provided", stateElement, stateLabel, errorDiv);
                return;
            }
        }
    });
}