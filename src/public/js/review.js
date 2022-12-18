(function ($) {
    var newReviewForm = $("#addReview"),
      newNameInput = $("#name"),
      newReviewInput = $("#review"),
      newRatingInput = $("#rating")
  
    newReviewForm.submit(function (event) {
      event.preventDefault();
  
      var newName = newNameInput.val();
      var newReview = newReviewInput.val();
      var newRating = newRatingInput.val();
  
      try {
        newName = checkPersonName(newName);
      } catch (e) {
        $("#diverror").html(e);
        return;
      }
  
      try {
        newReview = checkWord(newReview, "review");
        newReview = checkComment(newReview, "review");
      } catch (e) {
        $("#diverror").html(e);
        return;
      }
  
      try {
        newRating = checkRating(newRating);
      } catch (e) {
        $("#diverror").html(e);
        return;
      }
  
      if (newName.trim() && newReview.trim()) {
        const url = window.location.href;
        let arr = url.split("/");
        let shelterId = arr[arr.length - 1];
  
        var requestConfig = {
          method: "POST",
          url: "/shelters/" + shelterId,
          contentType: "application/json",
          data: JSON.stringify({
            reviewerName: newName,
            review: newReview,
            rating: newRating,
          })
        };
  
        $.ajax(requestConfig).then(function(responseMessage) {
          let error = $(responseMessage)[0];
          if(error.error){
               $("#diverror").html(error.error);
          }else{
              location.reload();  
          }
        })
  
      } else {
        if (!newName.trim()) {
          $("#diverror").html("Error: Name cannot be empty");
        } else if (!newReview.trim()) {
          $("#diverror").html("Error: Review cannot be empty");
        }
      }
    });
  })(window.jQuery);
