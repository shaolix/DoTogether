$(document).ready(function() {
    // define constant variables
    var all_posts = []; // list of json
    var all_posts_before_filter =[];
    var forward = 0;
    var backward = -1;

    // default to get all posts first
    getPosts();  

    $("#logout").click(function(){
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("token");
        window.location.replace("../html/welcomepagenosignin.html");
    });
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

    // add event to the second post edit button
    $('#post2_edit_button').click(function() {
        var cur_postID = $('#post2_id').text();
        //alert(cur_postID);
        sessionStorage.setItem('cur_postID', cur_postID);
        window.location.assign('../html/edit_post_page.html');
    });

    // add event to the second post edit button
    $('#post3_edit_button').click(function() {
        var cur_postID = $('#post3_id').text();
        //alert(cur_postID);
        sessionStorage.setItem('cur_postID', cur_postID);
        window.location.assign('../html/edit_post_page.html');
    });

    // delete
    $('#post1_delete').click(function() {
        if(confirm('Do you want to delete this post?')==true){
            var id = $('#post1_id').text().split(' ')[2];
            deletePost(id);
        }
    });

    $('#post2_delete').click(function() {
        if(confirm('Do you want to delete this post?')==true){
            var id = $('#post2_id').text().split(' ')[2];
            deletePost(id);
        }
    });

    $('#post3_delete').click(function() {
        if(confirm('Do you want to delete this post?')==true){
            var id = $('#post3_id').text().split(' ')[2];
            deletePost(id);
        }
    });

    // update current web page
    $('#pre').click(function() {
        if (backward == 0) {
            $('#contents').show();
            $('#first_post').show();
            $('#second_post').hide();
            $('#third_post').hide();
            setPost(all_posts[backward], 1);
            forward = backward;
            backward -= 1;
        } else if (backward == 1) {
            $('#contents').show();
            $('#first_post').show();
            $('#second_post').show();
            $('#third_post').hide();
            setPost(all_posts[backward - 1], 1);
            setPost(all_posts[backward], 2);
            forward = backward;
            backward -= 2;
        } else if (backward >= 2) {
            $('#contents').show();
            $('#first_post').show();
            $('#second_post').show();
            $('#third_post').show();
            setPost(all_posts[backward - 2], 1);
            setPost(all_posts[backward - 1], 2);
            setPost(all_posts[backward], 3);
            forward = backward;
            backward -= 3;
        } else {
            alert("No More Posts!!!");
        }
    });

    $('#next').click(function() {
        if (forward + 1 == all_posts.length - 1) {
            $('#contents').show();
            $('#first_post').show();
            $('#second_post').hide();
            $('#third_post').hide();
            setPost(all_posts[forward + 1], 1);
            backward = forward;
            forward += 1;
        } else if (forward + 1 == all_posts.length - 2) {
            $('#contents').show();
            $('#first_post').show();
            $('#second_post').show();
            $('#third_post').hide();
            setPost(all_posts[forward + 1], 1);
            setPost(all_posts[forward + 2], 2);
            backward = forward;
            forward += 2;
        } else if (forward + 1 <= all_posts.length - 3) {
            $('#contents').show();
            $('#first_post').show();
            $('#second_post').show();
            $('#third_post').show();
            setPost(all_posts[forward + 1], 1);
            setPost(all_posts[forward + 2], 2);
            setPost(all_posts[forward + 3], 3);
            backward = forward;
            forward += 3;
        } else {
            alert("No More Posts!!!");
        }
    });

    // get all posts
    function getPosts() {
        $.ajax({
            type: "GET",
            url: '/postlist',
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            //headers: { 'Authorization': 'Bearer ' + document.cookie },
            statusCode: {
                200: function(response) {
                    //var check_admin = response.admin;
                    var posts = response.posts;

                    if (sessionStorage.getItem("username") == "admin") {
                        $('#users_button').show();
                        $('#findattendee').hide();
                        $('#attendeeinput').hide();
                    } else {
                        $('#users_button').hide();
                        $('#findattendee').show();
                        $('#attendeeinput').show();
                    }

                    if (posts.length == 0) {
                        alert('There Are No More Posts!!!');
                    } else {
                        
                        for (var i = 0; i < response.posts.length; i++) {
                            //all_posts.push(posts[i]);
                            console.log("i");
                            console.log(i);
                            console.log(sessionStorage.getItem("username"));
                            console.log(response.posts[i].username);
                            if(sessionStorage.getItem("username") == posts[i].username && sessionStorage.getItem("username") != "admin"){
                                all_posts.push(posts[i]);
                            }
                            if(sessionStorage.getItem("username") == "admin"){
                                console.log("i am admin");
                                all_posts.push(posts[i]);
                            }
                        }
                        console.log(all_posts);

                        if (all_posts.length == 1) {
                            $('#contents').show();
                            $('#first_post').show();
                            $('#second_post').hide();
                            $('#third_post').hide();
                            setPost(all_posts[forward + 0], 1);
                        } else if (all_posts.length == 2) {
                            $('#contents').show();
                            $('#first_post').show();
                            $('#second_post').show();
                            $('#third_post').hide();
                            setPost(all_posts[forward + 0], 1);
                            setPost(all_posts[forward + 1], 2);
                            forward += 1;
                        } else if (all_posts.length >= 3) {
                            console.log("printing three");
                            $('#contents').show();
                            $('#first_post').show();
                            $('#second_post').show();
                            $('#third_post').show();
                            setPost(all_posts[forward + 0], 1);
                            setPost(all_posts[forward + 1], 2);
                            setPost(all_posts[forward + 2], 3);
                            forward += 2;
                        }
                    }
                }
            }
        });
    }

    function setPost(post, id) {
        $('#post' + id + '_id').text('Post ID: ' + post._id);
        $('#post' + id + '_title').text('Title: ' + post.title);
        $('#post' + id + '_date').text('Posted @: ' + post.date);
        $('#post' + id + '_username').text('Posted By: ' + post.username);
        $('#post' + id + '_category').text('Category: ' + post.category);
        $('#post' + id + '_details').text('Details: ' + post.descriptions);
		  $('#post' + id + '_attendee').html('Attendees: ' + post.attendee);
    }

    function deletePost(id) {
        $.ajax({
            type: "DELETE",
            url: '/posts/' + id,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            headers: { 'Authorization': 'Bearer ' + document.cookie },
            statusCode: {

                200: function(response) {
                    //document.getElementById("first_post").classList.toggle('hide');
                    alert("Post Deleted Successfully!!!");
                    window.location.assign('../html/admin_posts_page.html');
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
    
    $("#findattendee").click(function() {
    	
    		console.log("findfind");
    		
    		var attendee = $("#attendeeinput").val();
    		
    		if (!attendee) {
				window.alert("Please enter attendee's username");    		
    		}
    		else {
    			$.ajax({
					url: "/userprofile/" + attendee,
					type: "GET",
					dataType: "json",
					contentType: "application/json; charset=utf-8",
					success: function(response) {
						var phone = response.phone;
						var email = response.email;
						var msg = "Attendee's phone: " + phone + "\nAttendee's email: " + email;
						window.alert(msg);
	
					},
					complete: function(xhr, statusText) {
						if (xhr.status == 404) {
							window.alert("Attendee not found");									
						}
					}
				});
    		}
    });
    

});
