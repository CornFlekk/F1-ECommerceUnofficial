var prodotti;

var xhr = new XMLHttpRequest();
xhr.open("GET", "https://cornflekk.github.io/F1Commerce/prodotti.json", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    prodotti = JSON.parse(xhr.responseText);
  }
};
xhr.send();

window.onload = function() {
	var html = "";
	for (var i = 0; i < prodotti.length; i++) {
		html += '<div class="prodotto">';
		html += '<img src="' + prodotti[i].img + '" alt="' + prodotti[i].name + '">';
		html += '<h3>' + prodotti[i].name + '</h3>';
		html += '<p>Prezzo: €' + prodotti[i].price + '</p>';
		html += '<button class="remove-from-cart-btn" data-prodotto="' + prodotti[i].name + '">-</button>';
		html += '<button class="add-to-cart-btn" data-prodotto="' + prodotti[i].name +'">+</button>';
		html += '</div>';
	}
	document.getElementById("contenitoreNegozio").innerHTML = html;

	var addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

	for (var i = 0; i < addToCartButtons.length; i++) {
	  addToCartButtons[i].addEventListener('click', function(event) {
	    var NomeProdotto = event.target.getAttribute('data-prodotto');

	    addToCart(NomeProdotto);
	  });
	}

	var removeFromCartButtons = document.querySelectorAll('.remove-from-cart-btn');

	for (var i = 0; i < removeFromCartButtons.length; i++) {
	  removeFromCartButtons[i].addEventListener('click', function(event) {
	    var NomeProdotto = event.target.getAttribute('data-prodotto');

	    RemoveFromCart(NomeProdotto);
	  });
	}
};

// BARRA DEL MENU
const navbar = document.querySelector('#navbar');
const content = document.querySelector('#content');

navbar.addEventListener('click', function(event) {
	const page = event.target.getAttribute('href').substr(1);
	const currentPage = content.querySelector('.visibile');
	if (currentPage) {
		currentPage.classList.remove('visibile');
		currentPage.classList.add('invisibile');
	}
	content.querySelector('#' + page).classList.add('visibile');
	content.querySelector('#' + page).classList.remove('invisibile');
});
//FINE BARRA MENU

var cart = [];

function addToCart(NomeProdotto) {
  for (var i = 0; i < prodotti.length; i++) {
    if (prodotti[i].name === NomeProdotto) {
      var prodotto = prodotti[i];

      var existingprodotto = null;
      for (var j = 0; j < cart.length; j++) {
        if (cart[j].name === prodotto.name) {
          existingprodotto = cart[j];
          break;
        }
      }

      if (existingprodotto) {
        existingprodotto.quantity++;
      }
      else {
        prodotto.quantity = 1;
        cart.push(prodotto);
      }

      break;
    }
  }

  updateCartView();
}

function RemoveFromCart(NomeProdotto) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === NomeProdotto) {
      cart[i].quantity--;
      if (cart[i].quantity === 0) {
        cart.splice(i, 1);
      }
      break;
    }
  }

  updateCartView();
}

function updateCartView() {
  var cartList = document.querySelector('.cart-list');
  cartList.innerHTML = '';

  var cartTotal = 0;
	var cartQuantity = 0;

  for (var i = 0; i < cart.length; i++) {
    var prodotto = cart[i];

    var tr = document.createElement('tr');
    tr.innerHTML = '<td>' + prodotto.name + '</td><td>€' + prodotto.price + '</td><td>'+ prodotto.quantity + '</td>';
    cartList.appendChild(tr);

    cartTotal += (prodotto.price*prodotto.quantity);
		cartQuantity += prodotto.quantity;
  }

  document.querySelector('.cart-total').innerHTML = "€"+cartTotal;
	document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}
