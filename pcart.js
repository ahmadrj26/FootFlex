document.addEventListener("DOMContentLoaded", function() {
    let cartIcon = document.querySelector(".cart-icon");
    let cart = document.querySelector(".pcart");
    let closeCart = document.querySelector("#close-pcart");

// Openig cart
    cartIcon.onclick = (event) => {
        event.preventDefault();
        cart.classList.add("active");
    };

// Closing cart
    closeCart.onclick = () => {
        cart.classList.remove("active");
    };
    ready();

// Closing payment option menu
    var closeModalButton = document.querySelector(".payment .close");
    closeModalButton.onclick = () => {
        var paymentModal = document.getElementById("payment");
        paymentModal.style.display = "none";
    };

// Closing payment option menu if clicked outside the menu
    window.onclick = (event) => {
        var paymentModal = document.getElementById("payment");
        if (event.target == paymentModal) {
            paymentModal.style.display = "none";
        }
    };
});
function ready() {
// Removeing items from the cart
    var removeCartButtons = document.getElementsByClassName('pcart-remove');
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

// Quantity changing
    var quantityInputs = document.getElementsByClassName('pcart-quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantityChanged);
    }

// Adding products to cart
    var addCart = document.getElementsByClassName('addtocart');
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }

// Buy now button
    document
        .getElementsByClassName("btn-buy")[0]
        .addEventListener("click", buyButtonClicked);
}
function buyButtonClicked() {
// Displaying the payment options menu
    var paymentModal = document.getElementById("payment");
    paymentModal.style.display = "block";
    var paymentOptions = document.getElementsByClassName('payment-option');
    for (var i = 0; i < paymentOptions.length; i++) {
        var option = paymentOptions[i];
        option.addEventListener('click', selectPaymentOption);
    }
}
function selectPaymentOption(event) {
    var selectedOption = event.target.innerText;
    alert("You selected " + selectedOption + " as your payment method.🙂");
    
// Closing the payment option menu
    var paymentModal = document.getElementById("payment");
    paymentModal.style.display = "none";
    placeOrder();
}
function placeOrder() {
    alert("Your order is placed 🙂");
    var cartContent = document.getElementsByClassName("pcart-content")[0];
    while (cartContent.hasChildNodes()) {
        cartContent.removeChild(cartContent.firstChild);
    }
    updateTotal();
}
// Removing products from the cart after order placed 
function removeCartItem(event) {
    var buttonClicked = event.target;
    var cartItem = buttonClicked.closest('.pcart-box'); 
    cartItem.remove(); 
    updateTotal();
}
// changig quatity after order placed 
function quantityChanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updateTotal();
}

// Adding product to cart 
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updateTotal();
    alert("Item successfully added to your cart!🙂");
}

function addProductToCart(title, price, productImg) {
    var cartShopBox = document.createElement("div");
    cartShopBox.classList.add("pcart-box");
    var cartItems = document.getElementsByClassName("pcart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");

    
    var cartBoxContent = `
        <img src="${productImg}" alt="" class="pcart-img">
        <div class="detail-box">
            <div class="pcart-product-title">${title}</div>
            <div class="pcart-price">${price}</div>
            <input type="number" value="1" class="pcart-quantity">
        </div>
        <i class="bi bi-trash pcart-remove"></i>`;
    
    cartShopBox.innerHTML = cartBoxContent;
    cartItems.appendChild(cartShopBox);
    cartShopBox
        .getElementsByClassName("pcart-remove")[0]
        .addEventListener("click", removeCartItem);
    cartShopBox
        .getElementsByClassName("pcart-quantity")[0]
        .addEventListener("change", quantityChanged);
}

// Updating total
function updateTotal() {
    var cartContent = document.getElementsByClassName("pcart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("pcart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("pcart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("pcart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("£", ""));
        var quantity = quantityElement.value;
        total = total + price * quantity;
    }
// If price contains some  peinnes
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "£" + total;
}
