// Get cart items from localStorage
const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to clear cart
function clearCart() {
    localStorage.removeItem('cartItems');
    location.reload(); // Refresh the page to show empty cart
}

// Function to display cart items in checkout
function displayCartItems() {
    const checkoutItems = document.getElementById('checkout-items');
    const checkoutSubtotal = document.getElementById('checkout-subtotal');
    const checkoutShipping = document.getElementById('shipping-fee');
    const checkoutTotal = document.getElementById('checkout-total');
    
    // Clear existing items
    checkoutItems.innerHTML = '';
    
    if (cartItems.length === 0) {
        checkoutItems.innerHTML = '<p class="text-center">Your cart is empty</p>';
        checkoutSubtotal.textContent = '0.00';
        checkoutShipping.textContent = '5.00';
        checkoutTotal.textContent = '5.00';
        return;
    }
    
    // Calculate totals
    let subtotal = 0;
    const shipping = 5.00;
    
    // Display each item
    cartItems.forEach(item => {
        subtotal += parseFloat(item.price);
        
        const itemElement = document.createElement('div');
        itemElement.className = 'checkout-item mb-3';
        itemElement.innerHTML = `
            <div class="d-flex justify-content-between">
                <div>
                    <h5>${item.name}</h5>
                    <small class="text-muted">Price: $${item.price.toFixed(2)}</small>
                </div>
                <h5>$${item.price.toFixed(2)}</h5>
            </div>
        `;
        checkoutItems.appendChild(itemElement);
    });
    
    // Calculate total
    const total = subtotal + shipping;
    
    // Display totals
    checkoutSubtotal.textContent = subtotal.toFixed(2);
    checkoutShipping.textContent = shipping.toFixed(2);
    checkoutTotal.textContent = total.toFixed(2);
}

// Handle form submission
document.getElementById('delivery-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const deliveryInfo = {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address')
    };
    
    // Clear cart after successful order
    clearCart();
    
    // Show success message
    alert('Thank you for your purchase! Your order has been confirmed.\n' +
          'We will deliver to: ' + deliveryInfo.address + '\n' +
          'Expected delivery: 2-3 business days');
});

// Add a clear cart button
const clearCartBtn = document.createElement('button');
clearCartBtn.className = 'btn btn-danger mb-3';
clearCartBtn.innerHTML = 'Clear Cart';
clearCartBtn.onclick = clearCart;
document.getElementById('checkout-items').before(clearCartBtn);

// Initialize checkout page
document.addEventListener('DOMContentLoaded', displayCartItems);