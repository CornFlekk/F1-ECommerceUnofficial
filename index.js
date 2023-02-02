var products;

var xhr = new XMLHttpRequest();
xhr.open("GET", "url-del-tuo-json", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    products = JSON.parse(xhr.responseText);
  }
};
xhr.send();

window.onload = async function() {
	var html = "";
	for (var i = 0; i < products.length; i++) {
		html += '<div class="product">';
		html += '<img src="' + products[i].img + '" alt="' + products[i].name + '">';
		html += '<h3>' + products[i].name + '</h3>';
		html += '<p>Prezzo: €' + products[i].price + '</p>';
		html += '<button class="remove-from-cart-btn" data-product="' + products[i].name + '">-</button>';
		html += '<button class="add-to-cart-btn" data-product="' + products[i].name +'">+</button>';
		html += '</div>';
	}
	document.getElementById("contenitoreNegozio").innerHTML = html;

	var addToCartButtons = document.querySelectorAll('.add-to-cart-btn');

	for (var i = 0; i < addToCartButtons.length; i++) {
	  addToCartButtons[i].addEventListener('click', function(event) {
	    var productName = event.target.getAttribute('data-product');

	    addToCart(productName);
	  });
	}

	var removeFromCartButtons = document.querySelectorAll('.remove-from-cart-btn');

	for (var i = 0; i < removeFromCartButtons.length; i++) {
	  removeFromCartButtons[i].addEventListener('click', function(event) {
	    var productName = event.target.getAttribute('data-product');

	    RemoveFromCart(productName);
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

function addToCart(productName) {
  for (var i = 0; i < products.length; i++) {
    if (products[i].name === productName) {
      var product = products[i];

      // Cerchiamo se il prodotto è già nel carrello
      var existingProduct = null;
      for (var j = 0; j < cart.length; j++) {
        if (cart[j].name === product.name) {
          existingProduct = cart[j];
          break;
        }
      }

      // Se il prodotto è già nel carrello, aumentiamo la sua quantità
      if (existingProduct) {
        existingProduct.quantity++;
      }
      // Altrimenti, lo aggiungiamo al carrello con quantità 1
      else {
        product.quantity = 1;
        cart.push(product);
      }

      break;
    }
  }

  updateCartView();
}

function RemoveFromCart(productName) {
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].name === productName) {
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
  // Puliamo la lista del carrello
  var cartList = document.querySelector('.cart-list');
  cartList.innerHTML = '';

  // Calcoliamo il totale del carrello
  var cartTotal = 0;
	var cartQuantity = 0;

  // Aggiungiamo ogni prodotto del carrello alla lista
  for (var i = 0; i < cart.length; i++) {
    var product = cart[i];

    var tr = document.createElement('tr');
    tr.innerHTML = '<td>' + product.name + '</td><td>€' + product.price + '</td><td>'+ product.quantity + '</td>';
    cartList.appendChild(tr);

    cartTotal += (product.price*product.quantity);
		cartQuantity += product.quantity;
  }

  // Aggiorniamo il totale del carrello
  document.querySelector('.cart-total').innerHTML = "€"+cartTotal;
	document.querySelector('.cart-quantity').innerHTML = cartQuantity;
}
