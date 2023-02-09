var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function() {
  if(this.readyState === 4) {
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
xhr.setRequestHeader("Origin", "https://cornflekk.github.io/F1Commerce/");

xhr.send();
