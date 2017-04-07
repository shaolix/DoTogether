var token;
var user_id;
console.log(token);
console.log(user_id);
// jQuery Document
$(document).ready(function() {
    // Do some initial setup
    // poll for new messages every 2.5 seconds

    console.log("in user jquery file");

    //console.log(document);
    $("#register").click(function(){
        registerUser();
    });

    $("#login").click(function(){
        loginUser();
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
        sessionStorage.setItem("userSearchInput",userinput);
        window.location.replace("../html/view_posts.html");
    });
    function registerUser() {
        var clientusername = $("#username").val();
        var clientemail = $("#email").val();
        var clientpassword = $("#password").val();
        //var clientconfirm = $("#confirm").val();
        console.log(clientusername);
        console.log(clientemail);
        console.log(clientpassword);
        //console.log(clientconfirm);

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

    function loginUser(){
        var loginusername = $("#username").val();
        var loginpassword = $("#password").val();
        console.log(loginusername);
        console.log(loginpassword);
        
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
                    window.location.replace("../html/admin_users_page.html");
                }
                else{
                    sessionStorage.setItem("username",response.username);
                    sessionStorage.setItem("token",response.token);
                    window.location.replace("../html/welcomepage.html");
                } 
            }
        });        

    }

    
});

