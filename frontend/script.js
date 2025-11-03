let cart = [];
let total = 0;

function addToCart(item, price) {
  cart.push({ item, price });
  total += price;
  updateCart();
}

function updateCart() {
  const cartList = document.getElementById("cart-items");
  const totalDisplay = document.getElementById("total");
  cartList.innerHTML = "";
  cart.forEach(({ item, price, quantity }, index) => {
    const li = document.createElement("li");
    li.textContent = `${item} x${quantity} - ₹${price * quantity}`;
    
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.onclick = () => removeFromCart(index, price * quantity);
    
    li.appendChild(removeBtn);
    cartList.appendChild(li);
  });
  totalDisplay.textContent = total;
}

function removeFromCart(index, itemTotal) {
  total -= itemTotal;
  cart.splice(index, 1);
  updateCart();
}
