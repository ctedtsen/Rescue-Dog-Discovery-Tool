let loginForm = document.getElementById("loginForm");
let usernameInput = document.getElementById("usernameInput");
let usernameLabel = document.getElementById("usernameLabel")
let passwordInput = document.getElementById("passwordInput");
let passwordLabel = document.getElementById("passwordLabel");
let errorDivL = document.getElementById("error");

  if(loginForm){
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        try{
            checkUsername(usernameInput.value);
        }catch(e){
            errorDivL.innerHTML = "";
            usernameInput.value = "";
            passwordInput.value = "";
            errorFound(e, usernameInput, usernameLabel, errorDivL);
            return;
        }
        try{
            checkPassword(passwordInput.value);
        }catch(e){
            errorDivL.innerHTML = "";
            usernameInput.value = "";
            passwordInput.value = "";
            errorFound(e, passwordInput, passwordLabel, errorDivL)
            return;
        }
        errorDivL.innerHTML = "";
        loginForm.submit();
        
    });
    

  }