  $(document).ready(function() {
    //for testing
    // window.localStorage.setItem("username", "123");
    
    initPage();
    
    if (sessionStorage.getItem("username") == "admin") {
       $("#makenewpost").hide();
       $("#adminallusers").show();
    }
    else {
    	 $("#makenewpost").show();
       $("#adminallusers").hide();
    }


    $('#submit_btn').click(function(){
      var form = {};
      $('#new_info').serializeArray().map(function(x){form[x.name] = x.value;}); 
      form.username = sessionStorage.getItem("username");
      form.gender = $('#gender').find(":selected").val();
      form.hobbies = $('#hobbies').val();
      form.avatar = $("#avatar").val();
      console.log(JSON.stringify(form));
      $.ajax({
        url:'/users/' + sessionStorage.getItem("uid"),
        type:'PUT',
        data:form,
        ContentType: "application/json; charset=utf-8",
        success:function(){
            $('#modal').modal('show');
            console.log("update user success!");
            initPage();
        }
      });
      
    });

    $("#logout").click(function(){
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("token");
        window.location.replace("../html/welcomepagenosignin.html");
        location.href = "../html/welcomepagenosignin.html";
        console.log("logout");
    });
    
    function initPage() {
      $.ajax({
        url:'/userprofile/' + sessionStorage.getItem("username"),
        type:'GET',
        ContentType: "application/json; charset=utf-8",
        success:function(response){
        	
				if (response.avatar != "N/A") {
					document.getElementById('account_avatar').src = response.avatar;
				//$("#avatarde").src = response.avatar;
				//$("#avatarde").attr("src", response.avatar);
				}        	
        	
            $('#name').val(response.username);
            $('#phone').val(response.phone);
            $('#email').val(response.email);
            $('#city').val(response.city);
            $('#province').val(response.province);
            $('#descriptions').val(response.descriptions);
            $('#gender').val(response.gender);
            $('#hobbies').val(response.hobbies);
            sessionStorage.setItem("uid", response._id)
        }
      });
    }
  });