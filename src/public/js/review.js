(function ($) {
    var newReviewForm = $('#addReview'),
        newNameInput = $('#name'),
        newReviewInput = $('#review'),
        newRatingInput = $('#rating'),
        newUsernameInput = $('#username');

    newReviewForm.submit(function (event) {
        event.preventDefault();

        var newName = newNameInput.val();
        var newReview = newReviewInput.val();
        var newRating = newRatingInput.val();
        var newUsername = newUsernameInput.val();

        try{
            newName = checkPersonName(newName);
        } catch(e) {
        $("#diverror").html(e);
        }

        try{
            newReview = checkString(newReview, "review");
            if(newReview.length < 3){
                throw "Error: Incorrect format for review";
            }
        } catch(e) {
         $("#diverror").html(e);
        }

        try{
            newRating = checkRating(newRating);
        } catch(e) {
         $("#diverror").html(e);
        }

        try{
            newUsername = checkString(newUsername);
        } catch(e) {
         $("#diverror").html(e);
        }

        if(newName.trim() && newReview.trim() && newUsername.trim()){
            const url = window.location.href;
            let arr = url.split('/');
            let shelterId = arr[arr.length - 1];

            var requestConfig = {
                method: 'POST',
                url: '/shelters/' + shelterId,
                contentType: 'application/json',
                data: JSON.stringify({
                    reviewerName: newName,
                    review: newReview,
                    rating: newRating,
                    username: newUsername
                }),
                success: function() {   
                    location.reload();  
                }
            }

            $.ajax(requestConfig);
        } else{
            if(!newName.trim()){
                $("#diverror").html("Error: Name cannot be empty");
            } else if(!newReview.trim()){
                $("#diverror").html("Error: Review cannot be empty");
            } else if(!newUsername.trim()){
                $("#diverror").html("Error: Username cannot be empty");
            }
        }
    });

})(window.jQuery);