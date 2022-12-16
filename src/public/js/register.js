let registerForm = document.getElementById("registerForm");
let usernameInputR = document.getElementById("usernameInput");
let usernameLabelR = document.getElementById("usernameLabel")
let passwordInputR = document.getElementById("passwordInput");
let passwordLabelR = document.getElementById("passwordLabel");
let cityInputR = document.getElementById("cityInput");
let cityLabelR = document.getElementById("cityLabel");
let stateInputR = document.getElementById("stateInput");
let stateLabelR = document.getElementById("sateLabel");
let errorDiv = document.getElementById("error");

  if(registerForm){
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();
        try{
            checkUsername(usernameInputR.value);
        }catch(e){
            errorDiv.innerHTML = "";
            errorFound(e, usernameInputR, usernameLabelR, errorDiv);
            return;
        }
        try{
            checkPassword(passwordInputR.value);
        }catch(e){
            errorDiv.innerHTML = "";
            errorFound(e, passwordInputR, passwordLabelR, errorDiv)
            return;
        }
        try{
            checkString(cityInputR.value, "cityInput");
        }catch(e){
            errorDiv.innerHTML = "";
            errorFound(e, cityInputR, cityLabelR, errorDiv);
            return;
        }
        try{
            checkState(stateInputR.value);
        }catch(e){
            errorDiv.innerHTML ="";
            errorFound(e, stateInputR, stateLabelR, errorDiv);
            return;
        }
        errorDiv.innerHTML = "";
        registerForm.submit();
        
    });
    

  }