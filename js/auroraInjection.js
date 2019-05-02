function injectAurora(){
  var frameContent = document.getElementById("frameDocument");
  var injected = frameContent.contentWindow.document.getElementsByName("auroraWave")[0];

  if (!injected) {
    frameContent.addEventListener("load", function() {
      bodyArea = frameContent.contentWindow.document.getElementsByTagName("body")[0];
      bodyArea.insertAdjacentHTML('afterbegin','<div id="auroraWrapper" style="display:none;"><div id="chart-container" onclick="wave.play()"><div id="text-container"><p>Hi,<br>I am <b>Aurora</b>.</p><p>I am powered by <a href="https://talkify.net/" target="_blank">Talkify</a>.</p><p>My face was designed by <a href="https://medium.com/@kelvinau4413/circular-audio-wave-js-library-for-audio-visualization-in-circular-waveform-49afe0aa87a" target="_blank">Kelvin Au</a>.</p></div></div></div>');

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
      frameContent.contentWindow.document.head.appendChild(auroraWave);
    });
  };
};

function injectAuroraScript(){
  var frameContent = document.getElementById("frameDocument");
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
  var frameContent = document.getElementById("frameDocument");
  frameContent.contentWindow.initiate();
};
