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
            city = checkWord(city, "shelter city");
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
//followed tutorial here https://www.w3schools.com/howto/howto_js_filter_lists.asp to implement this
function search() {
    const searchInput = document.getElementById('mySearch');
    const filter = searchInput.value.toUpperCase();
    let shelters = document.getElementById("sheltersUL");
    const li = shelters.getElementsByTagName('li');
    shelters.hidden = false;
    for (let i = 0;  i < li.length; i++){
        val = li[i].getElementsByTagName("a")[0];
        searchValue = val.innerText
        if (searchValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}