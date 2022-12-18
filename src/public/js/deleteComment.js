const deleteCommentForm = document.getElementById('removeComment');

if(deleteCommentForm){
    const idElement = document.getElementById('commentID');
    const idLabel = document.getElementById('commentIdFormLabel');
    const errorDiv = document.getElementById("error");

    deleteCommentForm.addEventListener('submit', (event) => {
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
          id = checkCity(id, "comment id")
        } catch(e){
          errorDiv.innerHTML = "";
          errorFound(e, idElement, idLabel, errorDiv);
          return;
        }
        if(id.trim()){
          errorDiv.innerHTML = "";

          deleteCommentForm.submit();
        } else{
          errorDiv.innerHTML = "";
          if(!id.trim()){
              errorFound("Comment ID cannot be empty", idElement, idLabel, errorDiv);
              return;
          }
        }
    });
}
