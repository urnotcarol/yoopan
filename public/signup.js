$(function() {
  if($.cookie("username") != "null") {
    location.href = "/";
  }
  
  $("#signupButton").on("click", function(evt) {
    evt.preventDefault();

    var username = $("#inputUsername").val();
    var password = $("#inputPassword").val();
    var assurePassword = $("#assurePassword").val();

    var validUsername = 0;
    var validPassword = 0;
    var samePassword = 0;
    console.log(username.replace(/\w/g, ""));
    if(username.length === 0) {
      $("#usernameHint").html("用户名不能为空～");
    } else if(username.length < 8) {
      $("#usernameHint").html("用户名不能少于8位～");
    } else if(username.length > 20) {
      $("#usernameHint").html("用户名不能多于20位～");
    } else if(username.replace(/\w/g, "").length > 0) {
      $("#usernameHint").html("只能包含字母/数字/下划线");
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

    if(assurePassword.length === 0) {
      $("#assureHint").html("请再输入一次密码");
    } else if(assurePassword != password) {
      $("#assureHint").html("两次输入的密码不一致～");
    } else{
      samePassword = 1;
      $("assurePasswordHint").html("");
    }

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
            $.cookie("username", username, {expires: 1, path: "/"});
            $.cookie("password", password, {expires: 1, path: "/"});
            location.href = "/";
          }
        }
      });
    }
  });
});
