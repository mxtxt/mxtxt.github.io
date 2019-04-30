
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

};

function switchDoc(input){
  loadingOn();
  document.getElementById("currentDoc").innerHTML = input.name;
  document.getElementById("frameDocument").setAttribute("src", "docs/" + input.name + ".html");

  injectAurora();

  if (document.getElementById("currentTheme").innerHTML == ""){
    randomTheme();
  };

  if ($(".menu").hasClass("active")) {
    menuToggle();
  };

};


function switchPage(input){
  document.getElementById("currentPage").innerHTML = input.name;
  document.getElementById("frameDocument").setAttribute("src", "pages/" + input.name + ".html");

  if ($(".menu").hasClass("active")) {
    menuToggle();
  };
};
