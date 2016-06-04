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
          $.get('/disk/file', {
            username: username
          }, function(result) {
            if(result.status === 10000) {
              $("#fileInfo").css("display", "block");
              var outputs = result.data.map(function(elem) {
                var regx = /(.{10})T(.{8})\./;
                var createDate = regx.exec(elem.createDate)[1] + " " + regx.exec(elem.createDate)[2]; 
                return "<tr>" +
                  "<td style='width: 500px'>" + elem.originalName + "</td>" +
                  "<td style='width: 200px'>" + parseFloat(elem.size / 1024).toFixed(1) + " KB</td>" +
                  "<td style='width: 300px'>" + createDate +
                  "<td style='width: 200px'>" + "<a href='/disk/download/" + elem.id + "'>下载</a>&nbsp&nbsp&nbsp&nbsp&nbsp<a href='javascript:void(0)' onclick='deleteFile(" + elem.id + ")'>删除</a>" + "</td>" +
                  "</tr>";
              }).join();
              $("#file").html(outputs);
            } else if(result.status === 10001) {
              $("#noFileHint").css("display", "block");
            }
          });
        } else if(result.status === 10001) {
          location.href = "/signin";
        }
      }
    });
  } else if(username === "null") {
    location.href = "/signin";
  }

  $("#exit").on("click", function() {
    $.cookie("username", null);
    $.cookie("password", null);
    location.href = "/signin";
  });

  deleteFile = function(fileId) {
    $.ajax({
      type: "DELETE",
      url: "/disk/delete",
      data: {
        fileId: fileId
      },
      success: function(result) {
        if(result.status === 10000) {
          alert("删除成功～");
          location.href = "/disk";
        } else {
          alert("啊哦，删除失败了～");
        }
      }
    });
  }
});
