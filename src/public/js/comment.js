(function ($) {
    var newCommentForm = $('#addComment');
        newNameInput = $('#commenterName'),
        newCommentInput = $('#comment'),
        errorDiv = $('#error')
        commentArea = $('#comment-area');

    newCommentForm.submit(function (event) {
        event.preventDefault();

        var newName = newNameInput.val();

        try{
            newName = checkPersonName(newName);
        } catch(e) {
            $("#diverror").html("Error: Commenter Name must be provided");
        }

        var newComment = newCommentInput.val();
        try{
            newComment = checkString(newComment, "comment");
        } catch(e) {
            $("#diverror").html(e);
        }

        if(newName.trim() && newComment.trim()){
            const url = window.location.href;
            let arr = url.split('/');
            let petId = arr[arr.length - 1];

            var requestConfig = {
                method: 'POST',
                url: '/petdetails/' + petId,
                contentType: 'application/json',
                data: JSON.stringify({
                    commenterName: newName,
                    comment: newComment
                }),
                success: function() {   
                    location.reload();  
                }
            }

            console.log(requestConfig);

            $.ajax(requestConfig);
        } else {
            if(!newName.trim()){
                $("#diverror").html("Error: Name cannot be empty");
            } else if(!newComment.trim()){
                $("#diverror").html("Error: Comment cannot be empty");
            }
        }
    })

})(window.jQuery);
