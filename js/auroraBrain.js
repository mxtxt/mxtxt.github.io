var wave = new CircularAudioWave(document.getElementById("chart-container"));

var audioDict = new Object()
var audioDict = {
  "/docs/bloomberg/Bloomberg_final.html": "../../audio/aurora/bloomberg.mp3",
  "/docs/thecut/thecut.html": "../../audio/aurora/thecut.mp3",
  "/docs/harpers/Harpers_Final.html": "../../audio/aurora/harpers.mp3",
  "/docs/tls/TimesLiterarySupplement_Final.html": "../../audio/aurora/tls.mp3",
  "/docs/huffington/Huffington_Final.html": "../../audio/aurora/huffington.mp3",
  "/docs/EU_Directive/EU_Directive.html": "../../audio/aurora/eudirectiveEN.mp3",
}

function initiate(){
  block: {
    var doc = window.location.pathname;
    console.log(doc)

    for (var key in audioDict) {
      if (key == doc){
        wave.loadAudio(audioDict[key]);
        break block;
      }
    }

    var documentText = document.body.textContent;
    var keyValuePair = {};
    keyValuePair["text"] = documentText;
    sendData(keyValuePair);
  }
}

function sendData(data) {
  var XHR = new XMLHttpRequest();
  var urlEncodedData = "";
  var urlEncodedDataPairs = [];
  var name;

  // Turn the data object into an array of URL-encoded key/value pairs.
  for(name in data) {
    urlEncodedDataPairs.push(encodeURIComponent(name) + "=" + encodeURIComponent(data[name]));
  }

  // Combine the pairs into a single string and replace all %-encoded spaces to
  // the '+' character; matches the behaviour of browser form submissions.
  urlEncodedData = urlEncodedDataPairs.join("&").replace(/%20/g, "+");

  XHR.onload = function(e) {
    var audioPath = URL.createObjectURL(XHR.response);
    wave.loadAudio(audioPath);
  }

  // Set up our request
  XHR.open("POST", "https://talkify.net/api/speech/v1/download");
  XHR.responseType = "blob";
  XHR.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  XHR.setRequestHeader("X-API-Key", "493cbf85-63ea-4afb-9d0b-f04a87682761");

  XHR.send(urlEncodedData);
}
