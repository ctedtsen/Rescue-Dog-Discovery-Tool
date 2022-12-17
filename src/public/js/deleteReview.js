const deleteReviewForm = document.getElementById('deleteReview');

if(deleteReviewForm){
  const idElement = document.getElementById('reviewID');
  const idLabel = document.getElementById('reviewIdFormLabel');
  const errorDiv = document.getElementById("error");
  //errorDiv.innerHTML = "";
  deleteReviewForm.addEventListener('submit', (event) => {
      event.preventDefault();

      let id = undefined;
      
      try{
        errorDiv.innerHTML = "";
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

        deleteReviewForm.submit();
      } else{
        if(!id.trim()){
          errorDiv.innerHTML = "";
          errorFound("Review ID cannot be empty", idElement, idLabel, errorDiv);
          return;
        }
      }
  });
}