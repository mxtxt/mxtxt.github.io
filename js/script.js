function menuToggle(){
  $(".menu").toggleClass("active");
};


function loadingOn(){
  $(".loading-wrapper").toggleClass("active");
};


function loadingOff(){
  setTimeout(function(){
    $(".loading-wrapper").toggleClass("active");
  }, 2000);
};


function random(){
  loadingOn();

  var listDocs = ["docs/bloomberg/Bloomberg_final.html","docs/eudirective/EUDirective_final.html","docs/harpers/Harpers_Final.html","docs/huffington/Huffington_Final.html","docs/thecut/JessicaPresler.html","docs/tls/TimesLiterarySupplement_Final.html",];

  var choiceDoc = listDocs[Math.floor(Math.random()*listDocs.length)];

  document.getElementById("frameDocument").setAttribute("src", choiceDoc);
  document.getElementById("currentDoc").innerHTML = choiceDoc;

  randomTheme();

  if ($(".menu").hasClass("active")) {
    menuToggle();
  };

  document.getElementById("frameDocument").addEventListener("load", loadingOff);
};


function randomTheme(){
  var listThemes = ["style1","style2","themes/artDeco","style4","style5","themes/futurama",];

  var frameContent = document.getElementById("frameDocument");
  var choiceTheme = listThemes[Math.floor(Math.random()*listThemes.length)];

  frameContent.addEventListener("load", function() {
    var elmnt = frameContent.contentWindow.document.getElementsByName("theme")[0];
    elmnt.setAttribute("href", "../../css/" + choiceTheme + ".css");
    document.getElementById("currentTheme").innerHTML = choiceTheme;
  });
};


function switchTheme(input){
  loadingOn();

  var frameContent = document.getElementById("frameDocument");
  var elmnt = frameContent.contentWindow.document.getElementsByName("theme")[0];

  document.getElementById("currentTheme").innerHTML = input.name;
  elmnt.setAttribute("href", "../../css/" + input.name + ".css");

  if ($(".menu").hasClass("active")) {
    menuToggle();
  };

  document.getElementById("frameDocument").addEventListener("load", loadingOff);
};


function switchDoc(input){
  loadingOn();

  document.getElementById("currentDoc").innerHTML = input.name;
  document.getElementById("frameDocument").setAttribute("src", "docs/" + input.name + ".html");

  if (document.getElementById("currentTheme").innerHTML == ""){
    var frameContent = document.getElementById("frameDocument");
    var elmnt = frameContent.contentWindow.document.getElementsByName("theme")[0];

    document.getElementById("currentTheme").innerHTML = input.name;
    elmnt.setAttribute("href", "../../css/" + "themes/artDeco" + ".css");
  };

  if ($(".menu").hasClass("active")) {
    menuToggle();
  };

  document.getElementById("frameDocument").addEventListener("load", loadingOff);
};


function switchPage(input){
  document.getElementById("currentPage").innerHTML = input.name;
  document.getElementById("frameDocument").setAttribute("src", "pages/" + input.name + ".html");

  if ($(".menu").hasClass("active")) {
    menuToggle();
  };
};
