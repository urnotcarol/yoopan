$(function() {
  $("#signupButton").on("click", function(evt) {
    evt.preventDefault();

    var username = $("#inputUsername").val();
    var password = $("#inputPassword").val();
    var assurePassword = $("#assurePassword").val();

    var validUsername = 0;
    var validPassword = 0;
    var samePassword = 0;
    // console.log(username.replace("^[A-Za-z0-9]+$"));
    if(username.length === 0) {
      $("#usernameHint").html("用户名不能为空～");
    } else if(username.length < 8) {
      $("#usernameHint").html("用户名不能少于8位～");
    } else if(username.length > 20) {
      $("#usernameHint").html("用户名不能多于20位～");
    } else {
      validUsername = 1;
      $("#usernameHint").html("");
    }

    if(password.length === 0) {
      $("passwordHint").html("密码不能为空～");
    } else if(password.length < 6) {
      $("#passwordHint").html("密码不能少于6位～");
    } else if(password.length > 30) {
      $("#passwordHint").html("密码不能多于30位～");
    } else {
      validPassword = 1;
      $("passwordHint").html("");
    }
    console.log(assurePassword);

    if(assurePassword.length === 0) {
      $("assurePasswordHint").html("请再输入一次密码");
    } else if(assurePassword != password) {
      $("assurePasswordHint").html("两次输入的密码不一致～");
    } else{
      samePassword = 1;
      $("assurePasswordHint").html("");
    }

    console.log(validUsername === 1);
    console.log(validPassword === 1);
    console.log(validUsername === 1 && validPassword === 1 && assurePassword === 1);


    if(validUsername === 1 && validPassword === 1 && samePassword === 1) {
      $.ajax({
        type: "POST",
        url: "signup/userSignup",
        data: {
          username: username,
          password: password
        },
        success: function(result) {
          if(result.status === 10000) {
            alert("注册成功！");
            location.href = "/";
          }
        }
      });
    }
  });
});
