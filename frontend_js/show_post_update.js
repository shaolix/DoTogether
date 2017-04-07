$(document).ready(function () {
	var id = sessionStorage.getItem('updated_post_id');
	//alert(id)

	getPost();

	// add event posts and users button
    $('#posts_button').click(function() {
        window.location.assign('../html/admin_posts_page.html');
    });

    $('#users_button').click(function() {
        window.location.assign('../html/admin_users_page.html');
    });

    // update
    $('#post1_edit_button').click(function() {
        var cur_postID = $('#post1_id').text();
        //alert(cur_postID);
        sessionStorage.setItem('cur_postID', cur_postID);
        window.location.assign('../html/edit_post_page.html');
    });

    // delete
    $('#post1_delete').click(function() {
        if(confirm('Do you want to delete this post?')==true){
            deletePost();
        }
    });

	function getPost() {
        $.ajax({
            type: "GET",
            url: '/posts/' + id,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            headers: { 'Authorization': 'Bearer ' + document.cookie },
            statusCode: {
                200: function(response) {
                	//alert(JSON.stringify(response))
                    var check_admin = response.admin;
                    //var post = response.post;

                    if (check_admin == true) {
                        $('#users_button').show();
                    } else {
                        $('#users_button').hide();
                    }

                    setPost(response);  
                    
                },

                404: function(response) {
					alert("No Post Found!!!");
				}
            }
        });
    }

    function setPost(post) {
        $('#post1_id').text('Post ID: ' + post._id);
        $('#post1_title').text('Title: ' + post.title);
        $('#post1_date').text('Posted @: ' + post.date);
        $('#post1_username').text('Posted By: ' + post.username);
        $('#post1_category').text('Category: ' + post.category);
        $('#post1_details').text('Details: ' + post.descriptions);
    }

    function deletePost() {
        $.ajax({
            type: "DELETE",
            url: '/posts/' + id,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            headers: { 'Authorization': 'Bearer ' + document.cookie },
            statusCode: {

                200: function(response) {
                    document.getElementById("first_post").classList.toggle('hide');
                    alert("Post Deleted Successfully!!!");
                    //window.location.assign('../html/admin_posts_page.html');
                },

                404: function(response) {
                    alert("Post Not Found!!!");
                },

                403: function(response) {
                    alert("Failed to Delete!!!");
                }
            }
        });
    }
});