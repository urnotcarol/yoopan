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

  $("#accessButton").on("click", function() {
    var accessCode = $("#inputAccessCode").val();
    if($.isNumeric(accessCode) && accessCode.length === 6) {
      $.get("/takeaway/displayFile", {
        accessCode: $("#inputAccessCode").val()
      }, function(result) {
        if(result.status === 10000) {
          $("#fileInfo").css("display", "block");
          var outputs = "<tr>" +
            "<td style='width: 500px'>" + result.data.originalName + "</td>" +
            "<td style='width: 350px'>" + parseFloat(result.data.size / 1024).toFixed(1) + " KB</td>" +
            "<td style='width: 350px'>" + "<a href='/takeaway/download/" + result.data.accessCode + "'>下载</a>" + "</td>" +
            "</tr>";
          $("#file").html(outputs);
        } else {
          alert("您输入的提取码不正确呦～");
          location.href = location.href;
        }
      });
    } else {
      alert("您输入的提取码不正确呦～");
      location.href = location.href;
    }
  });
});
