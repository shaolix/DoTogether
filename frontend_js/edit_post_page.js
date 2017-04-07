$(document).ready(function() {
	var id = sessionStorage.getItem('cur_postID').split(' ')[2];
	//alert(id);

	updatePost();

	function updatePost() {
		$.ajax({
			type: "GET",
			url: '/posts/' + id,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			headers: { 'Authorization': 'Bearer ' + document.cookie },
			statusCode: {
				200: function(response) {
					//alert(JSON.stringify(response));
					var id = response._id;
					var title = response.title;
					var username = response.username;
					var details = response.descriptions;
					var date = response.date;
					var category = response.category;

					// add info to html
					$('#post_id').val(id);
					$('#title').val(title);
					$('#date').val(date);
					$('#post_by').val(username);
					$('#descriptions').val(details);
					//$('#comments').val(combine_comments);
					//$('#attendee').val(combine_attendee);
					$('#category').val(category);

				},

				404: function(response) {
					alert("No Post Found!!!");
				}
			}
		});
	}

	$("#logout").click(function(){
		sessionStorage.removeItem("username");
		sessionStorage.removeItem("token");
		window.location.replace("../html/welcomepagenosignin.html");
	});

	$('#submit_button_for_editing').click(function() {
		var title = $('#title').val();
		var descriptions = $('#descriptions').val();
		var category = $('#category').val();

		var data = {"title": title, "descriptions": descriptions, "category": category};

		$.ajax({
			type: "PUT",
			url: "/posts/" + id,
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			headers: { 'Authorization': 'Bearer ' + document.cookie },
			data: JSON.stringify(data),
			statusCode: {
				200: function(response) {
					alert("Post Updated Successfully!!!");
					//window.location.assign('../html/admin_posts_page.html');
					sessionStorage.setItem("updated_post_id", id);
					window.location.assign('../html/show_post_update.html');
				},

				404: function(response) {
					alert("No Post Found By Given ID!!!");
				},

				403: function(response) {
					alert("Failed to Update or Missing Required Information!!!");
				}
			}
		});
	});

});
