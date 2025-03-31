
//sign up submission
$('#data-submit').click(function() {
    var username = $('#username').val();
    var password = $('#password').val();
   

    var jsonString = {
        username: username,
        password: password
    };
    
     $.ajax({
        url: spiritURL + "/write-login",
        type: "post",
        data: jsonString,
        success: function(response){
            var data = JSON.parse(response);

            if(data.msg == "SUCCESS"){
                window.location.href = "/client/html/game.html";
            }else if(data.msg == "Invalid"){
                alert("Username in use");
            }
            
         },
        error: function(err){
            alert("ERROR");
        }
     });
     return false;
});

//log in submission, no input just check

$('#login-submit').click(function() {
    var username = $('#username1').val();
    var password = $('#password1').val();
   

    var jsonString = {
        username: username,
        password: password
    };
    
     $.ajax({
        url: spiritURL + "/read-login",
        type: "post",
        data: jsonString,
        success: function(response){
            var data = JSON.parse(response);

            if(data.msg == "Login successful"){
                window.location.href = "/client/html/game.html";
            } else{
                alert("Login unsuccessful");
            }
            
         },
        error: function(err){
            alert("ERROR");
        }
     });
     return false;
});
    

//exit prompt(any of them)
function exitPrompt(){
     var allElements = document.getElementsByClassName("typePrompts");
     allElements[0].style.display = "none";
     allElements[1].style.display = "none";
     allElements[2].style.display = "none";
     allElements[3].style.display = "none";
}

//open sign up or log in prompt
function openPrompt(){
    //document.querySelector(".typePrompts").style.display = "block";
    var element = document.getElementsByClassName("typePrompts");
    element[0].style.display = "block";
}

//open signup prompt

function openSignUp(){
    var element2 = document.getElementsByClassName("typePrompts");
    element2[1].style.display = "block";
}

//open login prompt
function openLogin(){
    var element3 = document.getElementsByClassName("typePrompts");
    element3[2].style.display = "block";
}

//open controls
function openControls(){
    var element4 = document.getElementsByClassName("typePrompts");
    element4[3].style.display = "block"
}
