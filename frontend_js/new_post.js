  $(document).ready(function() {
    //for testing
    // sessionStorage.setItem("username", "123");
    
    $("#logout").click(function(){
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("token");
        window.location.replace("../html/welcomepagenosignin.html");
    });
    
    
    $('#submit_btn').click(function(){
      console.log("form")
      var form = {};
      $('#new_post').serializeArray().map(function(x){form[x.name] = x.value;}); 
      form.username = sessionStorage.getItem("username");
      form.category = $('#input-category').find(":selected").val(); 
      console.log(form);
      $.ajax({
        url:'/post',
        type:'post',
        beforeSend: function(xhr){
          xhr.setRequestHeader('Authorizaion', 'Bearer ' + sessionStorage.getItem('token'))
        },
        data:form,
        ContentType: "application/json; charset=utf-8",
        success:function(){
            $('#modal1').modal('show');
            $('#new_post').find("input[type=text], textarea").val("");
        },
        error : function(jqXHR, textStatus, errorThrown){
          if (textStatus)
            alert(jqXHR, textStatus, errorThrown);
          else
            alert("error!!!");
        }
      });
    });
  });