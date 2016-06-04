$(function() {
  if($.cookie("username") != "null") {
    $("#welcome").html("Welcome, " + $.cookie("username"));
    $("#signin").css("display", "none");
    $("#signup").css("display", "none");
    $("#exit").css("display", "list-item");
  }

  $("#exit").on("click", function() {
    $.cookie("username", null);
    $.cookie("password", null);
    location.href = location.href;
  });
});
