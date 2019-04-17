function menuToggle(){
  $("#menu-nav-wrapper").toggleClass("active");
};

function randomTheme(){
  var listThemes = ["style1","style2","themes/artDeco","style4","style5","themes/futurama",];
  var listDocs = ["docs/bloomberg/Bloomberg_final.html","docs/eudirective/EUDirective_final.html","docs/harpers/Harpers_Final.html","docs/huffington/Huffington_Final.html","docs/thecut/JessicaPresler.html","docs/tls/TimesLiterarySupplement_Final.html",];

  var frameContent = document.getElementById("frameDocument");

  var choiceTheme = listThemes[Math.floor(Math.random()*listThemes.length)];
  var choiceDoc = listDocs[Math.floor(Math.random()*listDocs.length)];

  document.getElementById("frameDocument").setAttribute("src", choiceDoc);
  document.getElementById("currentDoc").innerHTML = choiceDoc;

  frameContent.addEventListener("load", function() {
    var elmnt = frameContent.contentWindow.document.getElementsByName("theme")[0];
    elmnt.setAttribute("href", "../../css/" + choiceTheme + ".css");
    document.getElementById("currentTheme").innerHTML = choiceTheme;
  });

  if ($("#menu-nav-wrapper").hasClass("active")) {
    menuToggle();
  };
};

function switchTheme(input){
  var frameContent = document.getElementById("frameDocument");
  var elmnt = frameContent.contentWindow.document.getElementsByName("theme")[0];

  document.getElementById("currentTheme").innerHTML = input.name;
  elmnt.setAttribute("href", "../../css/" + input.name + ".css");

  if ($("#menu-nav-wrapper").hasClass("active")) {
    menuToggle();
  };
};

function switchDoc(input){
  document.getElementById("currentDoc").innerHTML = input.name;
  document.getElementById("frameDocument").setAttribute("src", "docs/" + input.name + ".html");

  if ($("#menu-nav-wrapper").hasClass("active")) {
    menuToggle();
  };
};

function switchPage(input){
  document.getElementById("currentPage").innerHTML = input.name;
  document.getElementById("frameDocument").setAttribute("src", "pages/" + input.name + ".html");

  if ($("#menu-nav-wrapper").hasClass("active")) {
    menuToggle();
  };
};
