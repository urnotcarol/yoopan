$(function() {
  if($.cookie("username") != "undifined") {
    location.href = "/";
  }

  $("#signinButton").on("click", function(evt) {
    evt.preventDefault();

    var username = $("#inputUsername").val();
    var password = $("#inputPassword").val();

    if(username.length === 0 && password.length ===0) {
    } else if(username.length != 0 && password.length === 0) {
      $("#inputHint").html("您还没有输入密码！");
    } else if(username.length === 0 && password.length != 0) {
      $("#inputHint").html("您还没有输入帐号！");
    } else if(username.replace(/\w/g, "").length > 0 || username.length < 8
    || username.length > 20 || password.length < 6 || password.length > 30) {
      $("#inputHint").html("您输入的帐号或密码不正确，请重新输入！");
    } else {
      $.ajax({
        type: "POST",
        url: "signin/userSignin",
        data: {
          username: username,
          password: password
        },
        success: function(result) {
          if(result.status === 10000) {
            $.cookie("username", username, {expires: 1, path: "/"});
            $.cookie("password", password, {expires: 1, path: "/"});
            location.href = "/";
          } else if(result.status === 10001) {
            $("#inputHint").html("您输入的帐号或密码不正确，请重新输入！");
          }
        }
      });
    }
  });
});
