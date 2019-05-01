
function menuToggle(){
  $(".menu").toggleClass("active");
  $(".switch-menu").toggleClass("active");
};


function loadingOn(){
  if (!$(".loading-wrapper").hasClass("active")) {
    $(".loading-wrapper").toggleClass("active");
    document.getElementById("frameDocument").addEventListener("load", loadingOff());
  };
};


function loadingOff(){
  setTimeout(function(){
    $(".loading-wrapper").toggleClass("active");
  }, 2000);
};


function random(){
  var listDocs = ["bloomberg/Bloomberg_final","EU_Directive/EUDirective_EN","harpers/Harpers_Final","huffington/Huffington_Final","thecut/thecut","tls/TimesLiterarySupplement_Final"];

  var choiceDoc = listDocs[Math.floor(Math.random()*listDocs.length)];
  document.getElementsByName(choiceDoc)[0].click();

  randomTheme();

  if ($(".menu").hasClass("active")) {
    menuToggle();
  };
};


function randomTheme(){
  var listThemes = ["style1","themes/vPlaybill","themes/artDeco","themes/tropicalia","style5","themes/aurora"];

  var frameContent = document.getElementById("frameDocument");
  var choiceTheme = listThemes[Math.floor(Math.random()*listThemes.length)];

  document.getElementsByName(choiceTheme)[0].click();
};


function switchTheme(input){
  loadingOn();
  var frameContent = document.getElementById("frameDocument");

  if (document.getElementById("currentDoc").innerHTML == "EU_Directive/EU_Directive"){
    if (document.getElementById("currentTheme").innerHTML != ""){
      frameContent.contentWindow.location.reload();
    };

    frameContent.addEventListener("load", function() {
      var leftFrame = frameContent.contentWindow.document.getElementById("left");
      console.log(leftFrame);

      var leftTheme = leftFrame.contentWindow.document.getElementsByName("theme")[0];

      var rightFrame = frameContent.contentWindow.document.getElementById("right");
      console.log(rightFrame);
      var rightTheme = rightFrame.contentWindow.document.getElementsByName("theme")[0];

      leftTheme.setAttribute("href", "../../../css/" + input.name + ".css");
      rightTheme.setAttribute("href", "../../../css/" + input.name + ".css");
    });

    document.getElementById("currentTheme").innerHTML = input.name;

  } else {

    if (document.getElementById("currentTheme").innerHTML != ""){
      frameContent.contentWindow.location.reload();
    };

    frameContent.addEventListener("load", function() {
      var theme = frameContent.contentWindow.document.getElementsByName("theme")[0];
      document.getElementById("currentTheme").innerHTML = input.name;
      theme.setAttribute("href", "../../css/" + input.name + ".css");
    });
  }

  if ($(".menu").hasClass("active")) {
    menuToggle();
  };

  var sounds = document.getElementsByTagName('audio');
  for(i=0; i<sounds.length; i++) sounds[i].pause();

  if (input.name == "themes/tropicalia") {
    var audioElement = document.createElement('audio');
    document.head.appendChild(audioElement);
    audioElement.setAttribute('src', '../audio/tropicalia/Sambar.mp3');
    audioElement.play();
  };

  var currentMenu = document.getElementById("menu-nav").getElementsByClassName("active");
  if (currentMenu.length > 0) {
    currentMenu[0].className = currentMenu[0].className.replace(" active", "");
  }

};

function switchDoc(input){
  loadingOn();
  document.getElementById("currentDoc").innerHTML = input.name;
  document.getElementById("frameDocument").setAttribute("src", "docs/" + input.name + ".html");

  injectAurora();
  sourceButton(input.name);

  if (document.getElementById("currentTheme").innerHTML == ""){
    randomTheme();
  };

  if ($(".menu").hasClass("active")) {
    menuToggle();
  };

  var currentMenu = document.getElementById("menu-nav").getElementsByClassName("active");
  if (currentMenu.length > 0) {
    currentMenu[0].className = currentMenu[0].className.replace(" active", "");
  }
};

var dictURL = new Object()
var dictURL = {
  "bloomberg/Bloomberg_final": "https://www.bloomberg.com/news/features/2018-03-16/japan-s-prisons-are-a-haven-for-elderly-women",
  "thecut/thecut": "https://www.thecut.com/2018/05/how-anna-delvey-tricked-new-york.html",
  "harpers/Harpers_Final": "https://harpers.org/archive/2018/07/as-goes-the-south-so-goes-the-nation/",
  "tls/TimesLiterarySupplement_Final": "https://www.the-tls.co.uk/articles/public/ridiculously-complicated-algorithms/",
  "huffington/Huffington_Final": "https://highline.huffingtonpost.com/articles/en/lotto-winners/",
  "EU_Directive/EU_Directive": "https://eur-lex.europa.eu/legal-content/EN/TXT/?qid=1552167424995&uri=CELEX:32009L0041",
}

function sourceButton(doc){
  for (var key in dictURL) {
    if (key == doc){
      document.getElementById("source-link").setAttribute("href", dictURL[key]);
    }
  }
}

function switchPage(input){
  document.getElementById("currentPage").innerHTML = input.name;
  document.getElementById("frameDocument").setAttribute("src", "pages/" + input.name + ".html");

  document.getElementById("source-link").removeAttribute("href");

  var currentTheme = document.getElementById("theme-nav").getElementsByClassName("active");
  if (currentTheme.length > 0) {
    currentTheme[0].className = currentTheme[0].className.replace(" active", "");
  }

  var currentDoc = document.getElementById("doc-nav").getElementsByClassName("active");
  if (currentDoc.length > 0) {
    currentDoc[0].className = currentDoc[0].className.replace(" active", "");
  }

  var sounds = document.getElementsByTagName('audio');
  for(i=0; i<sounds.length; i++) sounds[i].pause();

  if ($(".menu").hasClass("active")) {
    menuToggle();
  };
};
