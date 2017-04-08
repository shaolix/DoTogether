var token;
var user_id;
console.log(token);
console.log(user_id);
// jQuery Document
$(document).ready(function() {
    // Do some initial setup
    // poll for new messages every 2.5 seconds

    console.log("in user jquery file");
    console.log(window.location.href);
    var ress = String(window.location.href).includes("login");
    console.log(ress);

    //console.log(document);
    $("#register").click(function(){
        registerUser();
    });

    $("#login").click(function(){
        loginUser();
    });    
		
	
	 if (String(window.location.href).includes("signup")) {	
		 $("#username").keypress(function (e) {    
			 if(e.keyCode == 13){
		    	 $("#register").click();
		    }		    
	    });
	    $("#email").keypress(function (e) {    
			 if(e.keyCode == 13){
		    	 $("#register").click();
		    }		    
	    });
	    $("#password").keypress(function (e) {    
			 if(e.keyCode == 13){
		    	 $("#register").click();
		    }		    
	    });
    }
    else {
        $("#username").keypress(function (e) {    
			 if(e.keyCode == 13){
		    	 $("#login").click();
		    }		    
	    });
	    $("#password").keypress(function (e) {    
			 if(e.keyCode == 13){
		    	 $("#login").click();
		    }		    
	    });
    }
    $("#searchinput").keypress(function (e) {    
		 if(e.keyCode == 13){
	    	 $("#searchbutton").click();
	    }		    
    });

    $("#myaccount").click(function(){
        var username = sessionStorage.getItem("username");
        console.log(username);
        if(username == 'admin'){
            window.location.replace("../html/my_account.html");
        }
        else{
            window.location.replace("../html/my_account.html");
        }
    });

    $("#logout").click(function(){
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("token");
        window.location.replace("../html/welcomepagenosignin.html");
    });
    $("#all").click(function(){
        sessionStorage.setItem("category","all");
        window.location.replace("../html/view_posts.html");
    });

    $("#food").click(function(){
        sessionStorage.setItem("category","food");
        window.location.replace("../html/view_posts.html");
    });

    $("#movie").click(function(){
        sessionStorage.setItem("category","movie");
        window.location.replace("../html/view_posts.html");
    });

    $("#shopping").click(function(){
        sessionStorage.setItem("category","shopping");
        window.location.replace("../html/view_posts.html");
    });

    $("#sport").click(function(){
        sessionStorage.setItem("category","sport");
        window.location.replace("../html/view_posts.html");
    });

    $("#library").click(function(){
        sessionStorage.setItem("category","library");
        window.location.replace("../html/view_posts.html");
    });

    $("#searchbutton").click(function(){
        var userinput = document.getElementById('searchinput').value;
        console.log(userinput);
        if (!userinput) {
        }
        else {
			  sessionStorage.setItem("userSearchInput",userinput);
        	  window.location.replace("../html/view_posts.html");
        }
        
    });
    function registerUser() {
        var clientusername = $("#username").val();
        var clientemail = $("#email").val();
        var clientpassword = $("#password").val();
        var cannot = 0;
        var str = clientemail;
        var patt = new RegExp("[a-z A-Z 0-9 .]+@[a-z A-Z 0-9 .]+\\.[a-z A-Z 0-9 .]+");
        var resmatch = patt.test(str);
        //var clientconfirm = $("#confirm").val();
        console.log(clientusername);
        console.log(clientemail);
        console.log(clientpassword);
        //console.log(clientconfirm);
        
        if (!clientusername) {
				window.alert("Please enter a username");	        
				cannot = 1;
        }
        else if (!clientemail) {
				window.alert("Please enter an email");	        
				cannot = 1;
        }
        else if (resmatch != true) {
 				window.alert("Please enter a valid email");	        
				cannot = 1;       
        }
        else if (!clientpassword) {
				window.alert("Please enter a password");	  
				cannot = 1;      
        }
        
        if (cannot > 0) {
				        
        }
        else {
	        $.ajax({
	            url: "/users",
	            type: "POST",
	            dataType: "json",
	            contentType: "application/json; charset=utf-8",
	            data: JSON.stringify( { "username": clientusername, "email": clientemail, "password":clientpassword} ),
	            success: function(response) {
	                token = response['token'];
	                user_id = response['user_id'];
	                //updateUI(name);
	                console.log("Success!!!!");
	                console.log(token);
	                console.log(user_id);
	                //window.location.replace("welcomepagenosignin.html");
	                window.location.replace("/");
	            }
	        });
        }

    }

    function loginUser(){
        var loginusername = $("#username").val();
        var loginpassword = $("#password").val();
        var cannot = 0;
        console.log(loginusername);
        console.log(loginpassword);
        
		  if (!loginusername) {
				window.alert("Please enter your username");	        
				cannot = 1;
        }
        else if (!loginpassword) {
				window.alert("Please enter your password");	        
				cannot = 1;
        }
        
        if (cannot > 0) {
        }
		  else {
				$.ajax({
	            url: "/login",
	            type: "POST",
	            dataType: "json",
	            contentType: "application/json; charset=utf-8",
	            data: JSON.stringify( { "username": loginusername, "password":loginpassword} ),
	            success: function(response) {
	                var token = response['token'];
	                var loginusername = response['username'];
	                //updateUI(name);
	                console.log("Success!!!!");
	                if(loginusername == "admin"){
	                    sessionStorage.setItem("username",response.username);
	                    sessionStorage.setItem("token",response.token);
	                    window.location.replace("../html/welcomepage.html");
	                }
	                else{
	                    sessionStorage.setItem("username",response.username);
	                    sessionStorage.setItem("token",response.token);
	                    window.location.replace("../html/welcomepage.html");
	                } 
	            },
	            complete: function(xhr, statusText) {
						if (xhr.status == 403) { // join success
							window.alert("Incorrect username or password");									
						}
					}
	        });        
		  }        
         

    }

    
});

