const deleteReviewForm = document.getElementById('deleteReview');

if(deleteReviewForm){
    const idElement = document.getElementById('reviewID');
    const idLabel = document.getElementById('reviewIdFormLabel');
    const errorDiv = document.getElementById("error");

    deleteReviewForm.addEventListener('submit', (event) => {
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
          id = checkId(id, "reviewId");
        } catch(e){
          errorDiv.innerHTML = "";
          errorFound(e, idElement, idLabel, errorDiv);
          return;
        }
        if(id.trim()){
          errorDiv.innerHTML = "";

          console.log("hi")

          deleteReviewForm.submit();
        } else{
          errorDiv.innerHTML = "";
          if(!id.trim()){
              errorFound("Review ID cannot be empty", idElement, idLabel, errorDiv);
              return;
          }
        }
    });
}