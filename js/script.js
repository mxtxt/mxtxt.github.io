
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

  frameContent.addEventListener("load", function() {
    document.getElementsByName(choiceTheme)[0].click();
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

  var sounds = document.getElementsByTagName('audio');
  for(i=0; i<sounds.length; i++) sounds[i].pause();

  if (input.name == "themes/tropicalia") {
    var audioElement = document.createElement('audio');
    document.head.appendChild(audioElement);
    audioElement.setAttribute('src', '../tropaudio/Tropicalia.mp3');
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

function injectAurora(){
  var frameContent = document.getElementById("frameDocument");
  var executed = frameContent.contentWindow.document.getElementsByName("circularWave")[0];

  if (!executed) {
    frameContent.addEventListener("load", function() {
      var jquery   = frameContent.contentWindow.document.createElement("script");
      jquery.type  = "text/javascript";
      jquery.src   = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
      frameContent.contentWindow.document.head.appendChild(jquery);

      var circularWave   = frameContent.contentWindow.document.createElement("script");
      circularWave.type  = "text/javascript";
      circularWave.src   = "../../js/circularWave.min.js";
      circularWave.setAttribute("name","circularWave");
      if(circularWave.addEventListener) {
        circularWave.addEventListener("load",injectAuroraScript,false);
      } else if(circularWave.readyState) {
        circularWave.onreadystatechange = injectAuroraScript;
      }
      frameContent.contentWindow.document.body.appendChild(circularWave);

      bodyArea = frameContent.contentWindow.document.getElementsByTagName("body")[0];
      bodyArea.insertAdjacentHTML('afterbegin','<div id="auroraWrapper" style="display: none;"><button onclick="speak()">Pause/Resume</button><div id="aurora" onclick="wave.play()"></div></div>');
    });
  };
};

function injectAuroraScript(){
  var frameContent = document.getElementById("frameDocument");
  var aurora = frameContent.contentWindow.document.createElement("script");
  aurora.type  = "text/javascript";
  aurora.src   = "../../js/aurora.js";
  if(aurora.addEventListener) {
    aurora.addEventListener("load",callback,false);
  } else if(aurora.readyState) {
    aurora.onreadystatechange = callback;
  }
  frameContent.contentWindow.document.body.appendChild(aurora);
  function callback() {
    console.log("loaded");
  }
}

function activateAurora(){
  loadingOn();
  document.getElementById("frameDocument").setAttribute("src", "aurora/aurora.html");

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
