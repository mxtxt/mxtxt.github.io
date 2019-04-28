let wave = new CircularAudioWave(document.getElementById('chart-container'));

function speak(){
  var documentText = "Test text"; //document.body.textContent;
  var keyValuePair = {};
  keyValuePair['text'] = documentText;
  sendData(keyValuePair);
}

function sendData(data) {
  var XHR = new XMLHttpRequest();
  var urlEncodedData = "";
  var urlEncodedDataPairs = [];
  var name;

  // Turn the data object into an array of URL-encoded key/value pairs.
  for(name in data) {
    urlEncodedDataPairs.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
  }

  // Combine the pairs into a single string and replace all %-encoded spaces to
  // the '+' character; matches the behaviour of browser form submissions.
  urlEncodedData = urlEncodedDataPairs.join('&').replace(/%20/g, '+');

  XHR.onload = function(e) {
    var audioPath = URL.createObjectURL(XHR.response);
    wave.loadAudio(audioPath);
  }

  // Set up our request
  XHR.open('POST', 'https://talkify.net/api/speech/v1/download');
  XHR.responseType = "blob";
  XHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  XHR.setRequestHeader("X-API-Key", "493cbf85-63ea-4afb-9d0b-f04a87682761");

  XHR.send(urlEncodedData);
}
