var frameContent = document.getElementById("frameDocument");

function injectAurora(){
  var injected = frameContent.contentWindow.document.getElementsByName("auroraWave")[0];

  if (!injected) {
    frameContent.addEventListener("load", function() {
      bodyArea = frameContent.contentWindow.document.getElementsByTagName("body")[0];
      bodyArea.insertAdjacentHTML('afterbegin','<div id="auroraWrapper" style="display: none;"><button onclick="speak()">Pause/Resume</button><div id="chart-container" onclick="wave.play()"></div></div>');

      var jquery   = frameContent.contentWindow.document.createElement("script");
      jquery.type  = "text/javascript";
      jquery.src   = "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js";
      frameContent.contentWindow.document.head.appendChild(jquery);

      var auroraWave   = frameContent.contentWindow.document.createElement("script");
      auroraWave.type  = "text/javascript";
      auroraWave.src   = "../../js/auroraWave.min.js";
      auroraWave.setAttribute("name","auroraWave");
      if(auroraWave.addEventListener) {
        auroraWave.addEventListener("load",injectAuroraScript,false);
      } else if(auroraWave.readyState) {
        auroraWave.onreadystatechange = injectAuroraScript;
      }
      frameContent.contentWindow.document.body.appendChild(auroraWave);
    });
  };
};

function injectAuroraScript(){
  var auroraBrain = frameContent.contentWindow.document.createElement("script");
  auroraBrain.type  = "text/javascript";
  auroraBrain.src   = "../../js/auroraBrain.js";
  if(auroraBrain.addEventListener) {
    auroraBrain.addEventListener("load",loadAurora,false);
  } else if(auroraBrain.readyState) {
    auroraBrain.onreadystatechange = loadAurora;
  }
  frameContent.contentWindow.document.body.appendChild(auroraBrain);
}

function loadAurora(){
  frameContent.contentWindow.speak();
};
