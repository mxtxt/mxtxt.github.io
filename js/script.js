function menuToggle(){
  $("#menu-nav-wrapper").toggleClass("active");
};

function randomTheme(){
  var listThemes = ["style1","style2","style3","style4","style5","style6",];
  var listDocs = ["docs/bloomberg/Bloomberg_final.html","docs/eudirective/EUDirective_final.html","docs/harpers/Harpers_Final.html","docs/huffington/Huffington_Final.html","docs/thecut/JessicaPresler.html","docs/tls/TimesLiterarySupplement_Final.html",];

  var iframe = document.getElementById("document");

  var choiceTheme = listThemes[Math.floor(Math.random()*listThemes.length)];
  var choiceDoc = listDocs[Math.floor(Math.random()*listDocs.length)];

  document.getElementById("document").setAttribute("src", choiceDoc);
  document.getElementById("currentDoc").innerHTML = choiceDoc;

  iframe.addEventListener("load", function() {
    var elmnt = iframe.contentWindow.document.getElementsByName("theme")[0];
    elmnt.setAttribute("href", "../../css/" + choiceTheme + ".css");
    document.getElementById("currentTheme").innerHTML = choiceTheme;
  });

  if ($("#menu-nav-wrapper").hasClass("active")) {
    menuToggle();
  };
};

function switchTheme(input){
  var iframe = document.getElementById("document");
  var elmnt = iframe.contentWindow.document.getElementsByName("theme")[0];

  document.getElementById("currentTheme").innerHTML = input.name;
  elmnt.setAttribute("href", "../../css/" + input.name + ".css");

  if ($("#menu-nav-wrapper").hasClass("active")) {
    menuToggle();
  };
};

function switchDoc(input){
  document.getElementById("currentDoc").innerHTML = input.name;
  document.getElementById("document").setAttribute("src", "docs/" + input.name + ".html");

  if ($("#menu-nav-wrapper").hasClass("active")) {
    menuToggle();
  };
};

function switchPage(input){
  document.getElementById("currentPage").innerHTML = input.name;
  document.getElementById("document").setAttribute("src", "pages/" + input.name + ".html");

  if ($("#menu-nav-wrapper").hasClass("active")) {
    menuToggle();
  };
};
