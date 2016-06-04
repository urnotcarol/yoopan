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

  $("#accessButton").on("click", function(evt) {
    evt.preventDefault();
    var accessCode = $("#inputAccessCode").val();
    if (accessCode.length === 0) {
      $("#accessCodeHint").html("请输入提取码～");
    } else if($.isNumeric(accessCode) && accessCode.length === 6) {
      $.get("/takeaway/file", {
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
          $("#accessCodeHint").html("请输入正确的提取码～");
          $("#inputAccessCode").val("");
        }
      });
    } else {
      $("#accessCodeHint").html("请输入正确的提取码～");
      $("#inputAccessCode").val("");
    }
  });
});
