var $head = $("#myframe").contents().find("head");

$head.append($("<link/>", {
    rel: "stylesheet",
    href: "css/style5.css"
    type: "text/css"
}));


$(document).ready(function(){
  $("button#theme1").click(function(){
    $("cssLink").attr("href", "css/style1.css");
  });
});

$(document).ready(function(){
  $("button#theme2").click(function(){
    $("#original").attr("href", "css/style2.css");
  });
});

$(document).ready(function(){
  $("button#theme3").click(function(){
    $("#original").attr("href", "css/style3.css");
  });
});

$(document).ready(function(){
  $("button#theme4").click(function(){
    $("#original").attr("href", "css/style4.css");
  });
});

$(document).ready(function(){
  $("button#theme5").click(function(){
    $("#original").attr("href", "css/style5.css");
  });
});

$(document).ready(function(){
  $("button#theme6").click(function(){
    $("#original").attr("href", "css/style6.css");
  });
});
