var jsonCircuiti;

var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

let xmlPromise = fetch("https://ergast.com/api/f1/2023/circuits.json", requestOptions)
	.then(response => response.text())
	.then(result => {
		jsonCircuiti = JSON.parse(result)
		carica();
	})
	.catch(error => console.log('error', error));

function carica() {
	let html = "";
	for (var i = 0; i < jsonCircuiti.MRData.total; i++) {
		html += '<div class="circuito">';
		html += '<h3>' + jsonCircuiti.MRData.CircuitTable.Circuits[i].circuitName + '</h3>';
		html += '</div>';
	}
	document.getElementById("listaPiste").innerHTML = html;

	var link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "piste.css";
  document.head.appendChild(link);
}
