$(function() {
  if($.cookie("username") != "undefined") {
    $("#signin").html("Welcome, " + $.cookie("username"));
    $("#signup").css("display", "none");
    $("#exit").css("display", "list-item");
  }

  $("#exit").on("click", function()) {
    $.cookie("username", null);
    $.cookie("password", null);
  }
});
