/*var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(xhr.readyState === 4 && xhr.status === 200) {
		var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(xhr.responseText, "text/xml");

    var circuits = xmlDoc.getElementsByTagName("Circuit");
    for (var i = 0; i < circuits.length; i++) {
			var circuitId = circuits[i].getAttribute("circuitId");
      var circuitName = circuits[i].getElementsByTagName("CircuitName")[0].textContent;
      console.log(circuitId + ": " + circuitName);
    }
  }
});

xhr.open("GET", "http://ergast.com/api/f1/2023/circuits");

xhr.send();*/

//CODICE NON FUNZIONANTE ANCORA
var xmlCircuiti;

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

async function inizio() {
	let xmlPromise = await fetch("http://ergast.com/api/f1/2023/circuits", requestOptions)
	.then(response => response.text())
	.catch(error => console.log('error', error));

	xmlCircuiti = await xmlPromise.response();
}
