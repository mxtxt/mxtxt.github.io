function injectAurora(){
  var frameContent = document.getElementById("frameDocument");
  var injected = frameContent.contentWindow.document.getElementsByName("circularWave")[0];

  if (!injected) {
    frameContent.addEventListener("load", function() {
      bodyArea = frameContent.contentWindow.document.getElementsByTagName("body")[0];
      bodyArea.insertAdjacentHTML('afterbegin','<div id="auroraWrapper" style="display: none;"><button onclick="speak()">Pause/Resume</button><div id="chart-container" onclick="wave.play()"></div></div>');

      var jquery   = frameContent.contentWindow.document.createElement("script");
      jquery.type  = "text/javascript";
      jquery.src   = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
      frameContent.contentWindow.document.head.appendChild(jquery);

      var circularWave   = frameContent.contentWindow.document.createElement("script");
      circularWave.type  = "text/javascript";
      circularWave.src   = "../../js/auroraWave.min.js";
      circularWave.setAttribute("name","circularWave");
      if(circularWave.addEventListener) {
        circularWave.addEventListener("load",injectAuroraScript,false);
      } else if(circularWave.readyState) {
        circularWave.onreadystatechange = injectAuroraScript;
      }
      frameContent.contentWindow.document.body.appendChild(circularWave);
    });
  };
};

function injectAuroraScript(){
  var frameContent = document.getElementById("frameDocument");
  var aurora = frameContent.contentWindow.document.createElement("script");
  aurora.type  = "text/javascript";
  aurora.src   = "../../js/auroraBrain.js";
  if(aurora.addEventListener) {
    aurora.addEventListener("load",loadAurora,false);
  } else if(aurora.readyState) {
    aurora.onreadystatechange = loadAurora;
  }
  frameContent.contentWindow.document.body.appendChild(aurora);
}

function loadAurora(){
  var frameContent = document.getElementById("frameDocument");
  frameContent.contentWindow.speak();
};
