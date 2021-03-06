window.onload = function(){
    var pswValidate = document.getElementById("passwordInput_1");
    var letter = document.getElementById("letter");
    var capital = document.getElementById("capital");
    var number = document.getElementById("number");
    var pswLength = document.getElementById("pswLength");


    // alert(pass)
    // When the user clicks on the password field, show the message box
    pswValidate.onfocus = function() {
        document.getElementById("message").style.display = "block";
    }

    // When the user clicks outside of the password field, hide the message box
    pswValidate.onblur = function() {
        document.getElementById("message").style.display = "none";
    }
    // When the user starts to type something inside the password field
    pswValidate.onkeyup = function() {

        // Validate lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        if(pswValidate.value.match(lowerCaseLetters)) {
            letter.classList.remove("invalid");
            letter.classList.add("valid");
        } else {
            letter.classList.remove("valid");
            letter.classList.add("invalid");
        }

        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if(pswValidate.value.match(upperCaseLetters)) {
            capital.classList.remove("invalid");
            capital.classList.add("valid");
        } else {
            capital.classList.remove("valid");
            capital.classList.add("invalid");
        }

        // Validate numbers
        var numbers = /[0-9]/g;
        if(pswValidate.value.match(numbers)) {
            number.classList.remove("invalid");
            number.classList.add("valid");
        } else {
            number.classList.remove("valid");
            number.classList.add("invalid");
        }

        // Validate length
        if(pswValidate.value.length >= 8) {
            pswLength.classList.remove("invalid");
            pswLength.classList.add("valid");
        } else {
            pswLength.classList.remove("valid");
            pswLength.classList.add("invalid");
        }


    }
    $('#registerForm').submit(function(e) {
        e.preventDefault();

        const email = $("#emailInput").val();
        const username = $("#usernameInput").val();
        const pass = $("#passwordInput_1").val();
        const pass_2 = $("#passwordInput_2").val();
        const house = $('#houseInput').val();

        if(email == ""){
            alert("Please Enter Your Email");
            return false;
        }
        else if(username == ""){
            alert("Please Enter Your Desired Username");
            return false;
        }
        else if(house === "") {
            alert('Please Select Your House');
        }
        else if(pass == "") {
            alert("Please Fill Password Field");
            return false;
        }
        else if(pass_2 == ""){
            alert("Please Confirm Your Password");
            return false;
        }
        else if(pass != pass_2){
            alert("Passwords Don't Match, Please Try Again.")
            return false
        }
        else {
            const registerObj = {
                username,
                email,
                password: sha256(pass),
                house
            };
            $.ajax({
                url: '/api/register.php',
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify(registerObj),
                success: () => {
                    window.location = '/home.html';
                },
                error: (xhr) => {
                    if (xhr.status === 403) {
                        alert('That username is already taken');
                    }
                }
            });
            return true;
        }
        // alert(pass);
        // alert(pass_2);
    });

}


