$(function() {
  if($.cookie("username") != "null") {
    $("#welcome").html("Welcome, " + $.cookie("username"));
    $("#signin").css("display", "none");
    $("#signup").css("display", "none");
    $("#exit").css("display", "list-item");
  }

  $("#exit").on("click", function() {
    $.cookie("username", "null");
    $.cookie("password", "null");
    location.href = location.href;
  });

  // $("#uploadButton").on("click", function() {
  //   $.ajax({
  //     type: "POST",
  //     url: "/takeaway/upload",
  //     data: {},
  //     success: function(result) {
  //       if(result.status === 10000) {
  //         alert("上传成功。您的提取码为" + result.data.accessCode + "。");
  //         location.href = "/takeaway";
  //       }
  //     }
  //   });
  // });
});
