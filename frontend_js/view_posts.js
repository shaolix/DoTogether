$(document).ready(function() {
	
	if(sessionStorage.getItem("userSearchInput")){
		console.log(sessionStorage.getItem("userSearchInput"));
		console.log(typeof(sessionStorage.getItem("userSearchInput")));
		var userinput = sessionStorage.getItem("userSearchInput");
		console.log(typeof(userinput));
		var filter = userinput.split(" ");
		console.log(filter);
		console.log(typeof(filter));
	}

	// Set Navigation bar contents
	if(sessionStorage.getItem("username") != null) { // Check whether user has logged in		
		$('#login').hide();
		$('#signup').hide();
		$('#myacc').show();
		$('#logout').show();
	} else {
		$('#login').show();
		$('#signup').show();
		$('#myacc').hide();
		$('#logout').hide();	
	}
	$('#myacc').click(function(){
		location.href = './my_account.html'
	});
	$('#login').click(function(){
		location.href = './login.html'
	});
	$('#signup').click(function(){
		location.href = './signup.html'
	});
	$('#logout').click(function () {
		sessionStorage.removeItem('username');
		location.reload();
	});
	$('#logo').click(function(){
		if (sessionStorage.getItem("username") != null) {
			location.href = './welcomepage.html'
		}
		else {
			location.href = './welcomepagenosignin.html'
		}
	});
	
	// Arrays to store posts
	var allPosts = [];
	var foodPosts = [];
	var moviePosts = [];
	var libPosts = [];
	var sportPosts = [];
	var ShopPosts = [];
	var userinputresult = [];
	// Array point to the current posts array
	var curPosts;

	var pagecount = 0;
	var curpid = 0;
	
	// Get all posts from server and store them to the arrays	
	Getposts();
	
	function Getposts() {

		$.ajax({
			url: "/postlist",
			type: "GET",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(response) {
				
				for (var i = 0; i < response.posts.length; i++) {
					allPosts.push(response.posts[i]);				
					if (response.posts[i].category == "food") {
						foodPosts.push(response.posts[i]);
					}
					if (response.posts[i].category == "movie") {
						moviePosts.push(response.posts[i]);
					}
					if (response.posts[i].category == "library") {
						libPosts.push(response.posts[i]);
					}
					if (response.posts[i].category == "sport") {
						sportPosts.push(response.posts[i]);
					}
					if (response.posts[i].category == "shopping") {
						ShopPosts.push(response.posts[i]);
					}
				}
				if(sessionStorage.getItem("userSearchInput")){
					for(var i = 0; i < allPosts.length; i++){
						var postDescriptions = allPosts[i].descriptions;
						for(var j=0; j < filter.length; j++ ){
							var substring = filter[j];
							//console.log(allPosts[i].descriptions);
							//console.log(filter[j]);
							//console.log(postDescriptions.includes(substring));
							if(postDescriptions.includes(substring)){
								userinputresult.push(allPosts[i]);
							}
						}
					}
				}
		

				curPosts = allPosts;
				var curidx = pagecount*10;
				//$("#pre").hide();	
				
				if(sessionStorage.getItem("category") == "food" && !sessionStorage.getItem("userSearchInput")){
					curPosts = foodPosts;				
				}
				if(sessionStorage.getItem("category") == "movie" && !sessionStorage.getItem("userSearchInput")){
					curPosts = moviePosts;				
				}
				if(sessionStorage.getItem("category") == "shopping" && !sessionStorage.getItem("userSearchInput")){
					curPosts = ShopPosts;				
				}
				if(sessionStorage.getItem("category") == "sport" && !sessionStorage.getItem("userSearchInput")){
					curPosts = sportPosts;				
				}
				if(sessionStorage.getItem("category") == "library" && !sessionStorage.getItem("userSearchInput")){
					curPosts = libPosts;				
				}				
				
				if(sessionStorage.getItem("userSearchInput")){
					curPosts = userinputresult;
					sessionStorage.removeItem("userSearchInput");
				}
				
				
				
				$("#allpost").show();
				$("#postdetail").hide();
				
		
				if ((curidx + 10) > curPosts.length) {
					var restpost = curPosts.length - curidx;
					for (var i = restpost; i < 10; i++) {
						var pid = "#p";
						pid = String(pid + i);
						$(pid).hide();
					}
					for (var j = 0; j < restpost; j++) {
						var ptitle = "#ptitle";
						ptitle = String(ptitle + j);
						var pcontent = "#pcontent";
						pcontent = String(pcontent + j);
						var puser = "#puser";
						puser = String(puser + j);
						var pdate = "#pdate";
						pdate = String(pdate + j);
						$(ptitle).html(curPosts[curidx + j].title);
						$(pcontent).html(curPosts[curidx + j].descriptions);
						$(puser).html(curPosts[curidx + j].username);
						$(pdate).html(curPosts[curidx + j].date);
					}
				}
				else {
					for (var k = 0; k < 10; k++) {
						var ptitle = "#ptitle";
						ptitle = String(ptitle + k);
						var pcontent = "#pcontent";
						pcontent = String(pcontent + k);
						var puser = "#puser";
						puser = String(puser + k);
						var pdate = "#pdate";
						pdate = String(pdate + k);
						$(ptitle).html(curPosts[curidx + k].title);
						$(pcontent).html(curPosts[curidx + k].descriptions);
						$(puser).html(curPosts[curidx + k].username);
						$(pdate).html(curPosts[curidx + k].date);
						var pid = "#p";
						pid = String(pid + k);
						$(pid).show();
					}
				}				
			}
		});
	
	}
	
	function Refreshpost() {

		var curidx = pagecount*10;
		
		$("#allpost").show();
		$("#postdetail").hide();

		for (var l = 0; l < 10; l++) {
			var pid = "#p";
			pid = String(pid + l);
			$(pid).show();
		}
		if ((curidx + 10) > curPosts.length) {
			var restpost = curPosts.length - curidx;
			for (var i = restpost; i < 10; i++) {
				var pid = "#p";
				pid = String(pid + i);
				$(pid).hide();
			}
			for (var j = 0; j < restpost; j++) {
				var ptitle = "#ptitle";
				ptitle = String(ptitle + j);
				var pcontent = "#pcontent";
				pcontent = String(pcontent + j);
				var puser = "#puser";
				puser = String(puser + j);
				var pdate = "#pdate";
				pdate = String(pdate + j);
				$(ptitle).html(curPosts[curidx + j].title);
				$(pcontent).html(curPosts[curidx + j].descriptions);
				$(puser).html(curPosts[curidx + j].username);
				$(pdate).html(String(curPosts[curidx + j].date));
			}
		}
		else {
			for (var k = 0; k < 10; k++) {
				var ptitle = "#ptitle";
				ptitle = String(ptitle + k);
				var pcontent = "#pcontent";
				pcontent = String(pcontent + k);
				var puser = "#puser";
				puser = String(puser + k);
				var pdate = "#pdate";
				pdate = String(pdate + k);
				$(ptitle).html(curPosts[curidx + k].title);
				$(pcontent).html(curPosts[curidx + k].descriptions);
				$(puser).html(curPosts[curidx + k].username);
				$(pdate).html(String(curPosts[curidx + k].date));
			}
		}

	}
	
	$("#next").click(function() {

		var curidx = pagecount*10;

		if ((curidx + 10) < curPosts.length) {
			pagecount++;
			Refreshpost();
		}

	});

	$("#pre").click(function() {

		var curidx = pagecount*10;

		if (curidx > 0) {
			pagecount--;
			Refreshpost();
		}

	});

	$("#foodcat").click(function() {
		curPosts = foodPosts;
		pagecount = 0;
		Refreshpost();
	});

	$("#moviecat").click(function() {
		curPosts = moviePosts;
		pagecount = 0;
		Refreshpost();
	});

	$("#librarycat").click(function() {
		curPosts = libPosts;
		pagecount = 0;
		Refreshpost();
	});

	$("#sportcat").click(function() {
		curPosts = sportPosts;0
		pagecount = 0;
		Refreshpost();
	});

	$("#shoppingcat").click(function() {
		curPosts = ShopPosts;
		pagecount = 0;
		Refreshpost();
	});

	$("#allcat").click(function() {
		curPosts = allPosts;
		pagecount = 0;
		Refreshpost();
	});
	
	function Fillpostdetail(pidx) {

		curpid = curPosts[pidx]._id;
		
		$("#allcomments").empty();
		$("#allpost").hide();
		$("#postdetail").show();

		$.ajax({
			url: "/postdetail/" + String(curpid),
			type: "GET",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(response) {
				$("#ptitlede").html(response.title);
				$("#puserde").html(response.username);
				$("#pdatede").html(String(response.date));
				$("#pcontentde").html(response.descriptions);
				var allcomments = response.comments;
				for (var i = 0; i < allcomments.length; i++) {
					var comidx = allcomments[i];
					Fillcomments(comidx);
				}
				var pdeuid = response.username;
				Filluserprofile(pdeuid);
			}
		});	

	}


	function Fillcomments(cid) {

		$.ajax({
			url: "/comments/" + String(cid),
			type: "GET",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(response) {
				tmpcoment = '<div class="row"><p>' + response.contents + '</p><i class="icon-user"></i> by <a href="#">' + response.username + '</a> | <i class="icon-calendar"></i> <span>' + String(response.date) + '</span><br><br></div>';
				$("#allcomments").append(tmpcoment);
			}
		});

	}

	function Filluserprofile(uid){

		$.ajax({
			url: "/userprofile/" + String(uid),
			type: "GET",
			dataType: "json",
			contentType: "application/json; charset=utf-8",
			success: function(response) {
				$("#usernamede").html(response.username);
				
				if (response.avatar != "N/A") {
					document.getElementById('avatarde').src = response.avatar;
				//$("#avatarde").src = response.avatar;
				//$("#avatarde").attr("src", response.avatar);
				}
				var tmpgender = "Gender : " + String(response.gender);
				$("#genderde").html(tmpgender);
				var tmpcity = "City : " + String(response.city);
				$("#cityde").html(tmpcity);
				var tmpemail = "Email : " + String(response.email);
				$("#emailde").html(tmpemail);
				var tmpphone = "Phone : " + String(response.phone);
				$("#phonede").html(tmpphone);
			}
		});

	}
	
	$("#joinb").click(function () {
		
		if(sessionStorage.getItem("username") != null){
			$.ajax({
				url: "/join/" + String(curpid),
				type: "PUT",
				dataType: "json",
				contentType: "application/json; charset=utf-8",
				complete: function(xhr, statusText) {
					if (xhr.status == 200) { // join success
						window.alert("Join success!");									
					} else if (xhr.status == 401) { // User not log in
						window.alert("Please log in to join this activity");	
					} else if (xhr.status == 404) {
						window.alert("Activity not exists");	
					}
				}
			});
		}
		else {
			window.alert("Please log in to join this activity");			
		}		
		
				
		
	});

	$("#commentb").click(function() { 
		Postcomment(curpid);
	});

	function Postcomment(addpid) {

		var commentcontent = $("#commenttext").val();

		if(sessionStorage.getItem("username") != null){	
			
			$.ajax({
				url: "/comments",
				type: "POST",
				dataType: "json",
				beforeSend: function (xhr) {
					xhr.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("token"));
				},
				contentType: "application/json; charset=utf-8",
				data: JSON.stringify( { "contents": commentcontent, "addpid": addpid, "username": sessionStorage.getItem("username") } ),
				success: function(response) { //username can get from aut
					tmpcoment = '<div class="row"><p>' + response.contents + '</p><i class="icon-user"></i> by <a href="#">' + sessionStorage.getItem("username") + '</a> | <i class="icon-calendar"></i> <span>' + String(response.date) + '</span><br><br></div>';
					$("#allcomments").append(tmpcoment);
				}
			});
		}
		else {
			window.alert("Please log in to make a comment");		
		}
		

		$("#commenttext").val('');

	}
	
	$(".readmore0").click(function() {
		var postidx = pagecount*10;
		Fillpostdetail(postidx);
	});

	$(".readmore1").click(function() {
		var postidx = pagecount*10 + 1;
		Fillpostdetail(postidx);
	});

	$(".readmore2").click(function() {
		var postidx = pagecount*10 + 2;
		Fillpostdetail(postidx);
	});

	$(".readmore3").click(function() {
		var postidx = pagecount*10 + 3;
		Fillpostdetail(postidx);
	});

	$(".readmore4").click(function() {
		var postidx = pagecount*10 + 4;
		Fillpostdetail(postidx);
	});

	$(".readmore5").click(function() {
		var postidx = pagecount*10 + 5;
		Fillpostdetail(postidx);
	});

	$(".readmore6").click(function() {
		var postidx = pagecount*10 + 6;
		Fillpostdetail(postidx);
	});

	$(".readmore7").click(function() {
		var postidx = pagecount*10 + 7;
		Fillpostdetail(postidx);
	});

	$(".readmore8").click(function() {
		var postidx = pagecount*10 + 8;
		Fillpostdetail(postidx);
	});

	$(".readmore9").click(function() {
		var postidx = pagecount*10 + 9;
		Fillpostdetail(postidx);
	});

});

