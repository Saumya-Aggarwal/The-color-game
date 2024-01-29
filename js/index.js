//variable declarations
var hard = true;
var boxes = 6;
var currentColor = "";
var colorArray = [];
var correctBox;
var gameComplete = false;
var hexMode = false;
var hex = "#";

$(document).ready(function() {
  //helper function to create random numbers
  function randomNumber() {
    return Math.floor(Math.random() * 256);
  }

  //convert our correct RGB answer into hex for display on screen
  function hexConverter() {
    var hexAnswer = [colorArray[correctBox][0], colorArray[correctBox][1], colorArray[correctBox][2]];
    hexAnswer.map(function(num) {
      var a = num.toString(16);
      if (a.length < 2) {
        hex += a + a;
      } else {
        hex += a;
      }
    });
  }

  function newRound() {
    //set the message to initial state
    $("#message").text("");
    //set the correct box
    correctBox = Math.floor(Math.random() * boxes);
    //generate new array of colors
    function newColors() {
      for (var i = 0; i < boxes; i++) {
        var temp = [];
        temp.push(Math.floor(Math.random() * 256));
        temp.push(Math.floor(Math.random() * 256));
        temp.push(Math.floor(Math.random() * 256));
        colorArray.push(temp);
      }
    }
    newColors();
    //set the colors of the boxes
    if (hexMode) {
      hexConverter();
      $("h1").text(hex.toUpperCase());
    } else {
      $("h1").text("RGB(" + colorArray[correctBox][0] + ", " + colorArray[correctBox][1] + ", " + colorArray[correctBox][2] + ")");
    }
    for (var j = 0; j < boxes; j++) {
      $("#square-" + j).css("background", "rgb(" + colorArray[j][0] + "," + colorArray[j][1] + "," + colorArray[j][2] + ")");
    }
  }
  newRound();

  function reset() {
    gameComplete = false;
    colorArray = [];
    hex = "#";
    if (hard) {
      $("h1, h2, #hard").css("background", "#6fbd8d");
    } else {
      $("h1, h2, #easy").css("background", "#6fbd8d");
    }
    if (hexMode) {
      $("#hex").css("background", "#6fbd8d");
      $("#rgb").css("color", "#6fbd8d");
    } else {
      $("#rgb").css("background", "#6fbd8d");
      $("#hex").css("color", "#6fbd8d");
    }
    $("#message").css("color", "black");
    $("#reset").css("color", "#6fbd8d");
    newRound();
  }

  //user change game to easy mode
  $("#easy").click(function() {
    if (hard) {
      $("#easy").css("background", "#6fbd8d").css("color", "white");
      $("#hard").css("background", "white").css("color", "#6fbd8d");
      $(".hard-box").toggleClass("hidden");
      hard = false;
      boxes = 3;
      reset();
    }
  });

  //user change game to hex mode
  $("#hex").click(function() {
    if (!hexMode) {
      hexMode = true;
      $("#hex").css("background", "#6fbd8d").css("color", "white");
      $("#rgb").css("background", "white").css("color", "#6fbd8d");
      reset();
    }
  });

  //user change game to rgb mode
  $("#rgb").click(function() {
    if (hexMode) {
      hexMode = false;
      $("#rgb").css("background", "#6fbd8d").css("color", "white");
      $("#hex").css("background", "white").css("color", "#6fbd8d");
      reset();
    }
  });
  //user change game to hard mode
  $("#hard").click(function() {
    if (!hard) {
      $("#hard").css("background", "#6fbd8d").css("color", "white");
      $("#easy").css("background", "white").css("color", "#6fbd8d");
      $(".hard-box").toggleClass("hidden");
      hard = true;
      boxes = 6;
      reset();
    }
  });

  //reset game on click of New Colors button
  $("#reset").click(function() {
    if (hard) {
      $("h1, h2, #hard").css("background", "#6fbd8d");
      $("#reset, #easy").css("color", "#6fbd8d");
    } else {
      $("h1, h2, #easy").css("background", "#6fbd8d");
      $("#reset, #hard").css("color", "#6fbd8d");
    }
    reset();
  });

  //handle color square click
  $(".color-square").click(function() {
    if (!gameComplete) {
      //handle correct choice
      if ($(this).is("#square-" + (correctBox))) {
        $("#message").text("CORRECT!!!");
        $(".color-square").animate({ opacity: 1 });
        gameComplete = true;
        if (hard) {
          $("h1, h2, .color-square, #hard").css("background", "rgb(" + colorArray[correctBox][0] + "," + colorArray[correctBox][1] + "," + colorArray[correctBox][2] + ")");
          $("#reset, #message, #easy").css("color", "rgb(" + colorArray[correctBox][0] + "," + colorArray[correctBox][1] + "," + colorArray[correctBox][2] + ")");
        } else {
          $("h1, h2, .color-square, #easy").css("background", "rgb(" + colorArray[correctBox][0] + "," + colorArray[correctBox][1] + "," + colorArray[correctBox][2] + ")");
          $("#reset, #message, #hard").css("color", "rgb(" + colorArray[correctBox][0] + "," + colorArray[correctBox][1] + "," + colorArray[correctBox][2] + ")");
        }
        if (hexMode) {
          $("#hex").css("background", "rgb(" + colorArray[correctBox][0] + "," + colorArray[correctBox][1] + "," + colorArray[correctBox][2] + ")");
          $("#rgb").css("color", "rgb(" + colorArray[correctBox][0] + "," + colorArray[correctBox][1] + "," + colorArray[correctBox][2] + ")");
        } else {
          $("#rgb").css("background", "rgb(" + colorArray[correctBox][0] + "," + colorArray[correctBox][1] + "," + colorArray[correctBox][2] + ")");
          $("#hex").css("color", "rgb(" + colorArray[correctBox][0] + "," + colorArray[correctBox][1] + "," + colorArray[correctBox][2] + ")");
        }
        //handle incorrect choice
      } else {
        $(this).animate({ opacity: 0 });
        $("#message").text("TRY AGAIN");
      }
    }
  });

  //set button hover effect if game not complete
  $("#reset, #hard, #easy, #hex, #rgb").mouseover(function() {
    if (!gameComplete) {
      $(this).addClass("hover-effect");
    }
  });
  $("#reset, #hard, #easy, #hex, #rgb").mouseout(function() {
    if (!gameComplete) {
      $(this).removeClass("hover-effect");
    }
  });

});
