
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

  var listDocs = ["bloomberg/Bloomberg_final","eudirective/EUDirective_finalEN","harpers/Harpers_Final","huffington/Huffington_Final","thecut/JessicaPresler","tls/TimesLiterarySupplement_Final"];

  var choiceDoc = listDocs[Math.floor(Math.random()*listDocs.length)];
  document.getElementsByName(choiceDoc)[0].click();

  randomTheme();

  if ($(".menu").hasClass("active")) {
    menuToggle();
  };

  document.getElementById("frameDocument").addEventListener("load", loadingOff);
};


function randomTheme(){
  var listThemes = ["style1","themes/vPlaybill","themes/artDeco","style4","style5","themes/futurama"];

  var frameContent = document.getElementById("frameDocument");
  var choiceTheme = listThemes[Math.floor(Math.random()*listThemes.length)];

  document.getElementsByName(choiceTheme)[0].click();
};


function switchTheme(input){
  loadingOn();

  var frameContent = document.getElementById("frameDocument");
  var elmnt = frameContent.contentWindow.document.getElementsByName("theme")[0];

  frameContent.addEventListener("load", function() {
    document.getElementById("currentTheme").innerHTML = input.name;
    elmnt.setAttribute("href", "../../css/" + input.name + ".css");
  });

  if ($(".menu").hasClass("active")) {
    menuToggle();
  };

  loadingOff();
};


function switchDoc(input){
  loadingOn();

  document.getElementById("frameDocument").setAttribute("src", "docs/" + input.name + ".html");

  if (document.getElementById("currentTheme").innerHTML == ""){
    randomTheme();
  };

  if ($(".menu").hasClass("active")) {
    menuToggle();
  };

  document.getElementById("currentDoc").innerHTML = input.name;
  document.getElementById("frameDocument").addEventListener("load", loadingOff);
};


function switchPage(input){
  document.getElementById("currentPage").innerHTML = input.name;
  document.getElementById("frameDocument").setAttribute("src", "pages/" + input.name + ".html");

  if ($(".menu").hasClass("active")) {
    menuToggle();
  };
};
