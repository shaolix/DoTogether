
$(document).ready(function() {
    // Do some initial setup
    var username = [];
    var user_idlist = [];
    var resultindex = 0;

    console.log("in user jquery file");
    console.log(document.location.href);
    console.log(document.location);
    getalluser();  
    
    $("#pre").hide();

    $("#logout").click(function(){
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("token");
        window.location.replace("../html/welcomepagenosignin.html");
    });

    $( "#posts_Delete1" ).click(function() {
        if(confirm('Do you want to delete this user?')==true){
            $("#post1").hide();
            console.log("print user_idList");
            
            var deleteurl = "/users/" + user_idlist[0 + resultindex].toString();
            user_idlist.splice(0 + resultindex, 1);
            username.splice(0 + resultindex, 1);
            console.log(username);
            console.log(user_idlist);
            console.log(username.length);
            console.log(user_idlist.length);

            $.ajax({
                url: deleteurl,
                type: "DELETE",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(response) {
                    console.log("Success!!!!");
                }
            });
        }

    });
    $( "#posts_Delete2" ).click(function() {
        if(confirm('Do you want to delete this user?')==true){
            $("#post2").hide();
            var deleteurl = "/users/" + user_idlist[1 + resultindex].toString();
            user_idlist.splice(1 + resultindex, 1);
            username.splice(1 + resultindex, 1);
            $.ajax({
                url: deleteurl,
                type: "DELETE",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(response) {
                    console.log("Success!!!!");
                }
            });
        }

    });
    $( "#posts_Delete3" ).click(function() {
        if(confirm('Do you want to delete this user?')==true){
            $("#post3").hide();
            var deleteurl = "/users/" + user_idlist[2 + resultindex].toString();
            user_idlist.splice(2 + resultindex, 1);
            username.splice(2 + resultindex, 1);
            $.ajax({
                url: deleteurl,
                type: "DELETE",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                success: function(response) {
                    console.log("Success!!!!");
                }
            });
        }

    });

    $("#next").click(function() {
        $("#post1").show();
        $("#post2").show();
        $("#post3").show(); 

        resultindex = resultindex + 3;
        if ((resultindex + 3) >= username.length) {     
            //document.getElementById("next").classList.toggle('hide');
            $("#next").hide();
        }
        else{
            //document.getElementById("next").classList.toggle();
            $("#next").show();
        }
        
        if ((resultindex - 3) >= 0) {   
            //document.getElementById("pre").classList.toggle('hide');
            $("#pre").show();
        }

        console.log(resultindex);
        updatealluserpage();
    });


    $("#pre").click(function() {

        $("#post1").show();
        $("#post2").show();
        $("#post3").show(); 

        resultindex = resultindex - 3;
        if ((resultindex - 3) < 0) {   
            //document.getElementById("pre").classList.toggle('hide');
            $("#pre").hide();
        }
        else{
            //document.getElementById("pre").classList.toggle();
            $("#pre").show();
        }  
        console.log(resultindex);
        console.log(username.length);
        if ((resultindex + 3) < username.length) {     
            //document.getElementById("next").classList.toggle('hide');
            console.log("need to show next button");
            $("#next").show();
        }   
        
        updatealluserpage();
    });

    $("#adminuserspost").click(function(){
        window.location.assign("../html/admin_posts_page.html");
    });
    $("#adminuseruser").click(function(){
        window.location.assign("../html/admin_users_page.html");
    });

    function updatealluserpage(){
        if(resultindex + 0 < username.length){
            $("#post1").show();
        }
        if(resultindex + 1 < username.length){
            $("#post2").show();
        }
        if(resultindex + 2 < username.length){
            $("#post3").show();
        }
        $( "#post_user1" ).html( "<h3>" + username[resultindex + 0] + "</h3>" );
        $( "#post_user2" ).html( "<h3>" + username[resultindex + 1] + "</h3>" );
        $( "#post_user3" ).html( "<h3>" + username[resultindex + 2] + "</h3>" ); 
        if(resultindex + 0 >= username.length){
            $("#post1").hide();
        }
        if(resultindex + 1 >= username.length){
            $("#post2").hide();
        }
        if(resultindex + 2 >= username.length){
            $("#post3").hide();
        } 
    }
    
    function getalluser(){
        console.log("in getalluser function");
        console.log(resultindex);
        $.ajax({
            url:"/users/getalluser",
            type:"GET",
            dataType:"json",
            contentType: "application/json; charset=utf-8",
            success: function(response){
                for(var i = 0; i < response.alluser.length; i++){
                    username.push(response.alluser[i]);
                    user_idlist.push(response.alluser_id[i]);
                }
                console.log(username);
                console.log(user_idlist);
                $( "#post_user1" ).html( "<h3>" + response.alluser[resultindex + 0] + "</h3>" );
                $( "#post_user2" ).html( "<h3>" + response.alluser[resultindex + 1] + "</h3>" );
                $( "#post_user3" ).html( "<h3>" + response.alluser[resultindex + 2] + "</h3>" );  
                if(resultindex + 0 >= response.alluser.length){
                    $("#post1").hide();
                }
                if(resultindex + 1 >= response.alluser.length){
                    $("#post2").hide();
                }
                if(resultindex + 2 >= response.alluser.length){
                    $("#post3").hide();
                }                
            }

        });

    }
    
});




