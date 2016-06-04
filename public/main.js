$(function() {
  var username = $.cookie("username");
  var password = $.cookie("password");
  if(username != "null" && password != "null") {
    $.ajax({
      type: "POST",
      url: "signin/userSignin",
      data: {
        username: username,
        password: password
      },
      success: function(result) {
        if(result.status === 10000) {
          $("#welcome").html("Welcome, " + username);
          $("#signin").css("display", "none");
          $("#signup").css("display", "none");
          $("#exit").css("display", "list-item");
        } else if(result.status === 10001) {
          location.href = "/signin";
        }
      }
    });
  }

  $("#exit").on("click", function() {
    $.cookie("username", null);
    $.cookie("password", null);
    location.href = location.href;
  });
});
