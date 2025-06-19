// Category filtering
(function() {
    const storeItems = document.getElementById('store-items');
    const filterBtns = document.querySelectorAll('.filter-btn');

    // Add event listener to all filter buttons
    filterBtns.forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            // Remove active class from all buttons
            filterBtns.forEach(function(button) {
                button.classList.remove('active');
            });
            // Add active class to clicked button
            e.currentTarget.classList.add('active');

            // Get the category from data-filter attribute
            const category = e.currentTarget.dataset.filter;

            // Filter items
            const items = storeItems.querySelectorAll('.store-item');
            items.forEach(function(item) {
                if (category === 'all') {
                    item.style.display = 'block';
                } else {
                    if (item.dataset.item === category) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                }
            });
        });
    });
})();

// Search functionality
(function() {
    const searchInput = document.getElementById('search-item');
    const storeItems = document.getElementById('store-items');

    searchInput.addEventListener('keyup', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        
        // Get all item names
        const items = storeItems.querySelectorAll('.store-item');
        items.forEach(function(item) {
            const itemName = item.querySelector('#store-item-name').textContent.toLowerCase();
            
            // Show item if search term matches
            if (itemName.includes(searchTerm)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
})();

// show cart

(function(){
    const cartInfo = document.getElementById('cart-info');
    const cart = document.getElementById('cart');

    cartInfo.addEventListener("click", function() {
        cart.classList.toggle("show-cart");
    });
})();

// add items to the cart

(function() {
    const cartBtn = document.querySelectorAll('.store-item-icon');
    const cart = document.querySelector('.cart');
    // Initialize cart items from localStorage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

    cartBtn.forEach(function(btn){
        btn.addEventListener('click', function(event){
          ///  console.log(event.target);

          if(event.target.parentElement.classList.contains('store-item-icon')) 
            {
                let fullPath = event.target.parentElement.previousElementSibling.src;

                let pos = fullPath.indexOf("img") +3;

                let partPath = fullPath.slice(pos);

                const item ={};
                item.img = `img-cart${partPath}`;

                let name = event.target.parentElement.parentElement.nextElementSibling.children[0].children[0].textContent;

                item.name = name;

                let price = event.target.parentElement.parentElement.nextElementSibling.children[0].children[1].textContent;

                let finalprice = price.slice(1).trim();

                item.price = finalprice;

                // When adding items to cart
item.price = parseFloat(finalprice); // Ensure price is a number


                // Add to cart items array
cartItems.push(item);

// Save to localStorage
localStorage.setItem('cartItems', JSON.stringify(cartItems));

                const cartItem = document.createElement("div");
                cartItem.classList.add("cart-item", "d-flex", "justify-content-between", "text-capitalize", "my-3");

                cartItem.innerHTML = `
            <img src="${item.img}" class="img-fluid rounded-circle" id="item-img" alt="">
            <div class="item-text">

              <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
              <span>$</span>
              <span id="cart-item-price" class="cart-item-price" class="mb-0">${item.price}</span>
            </div>
            <a href="#" id='cart-item-remove' class="cart-item-remove">
              <i class="fas fa-trash"></i>
            </a>
          </div>
          `;

          // select cart

          const cart = document.getElementById("cart");
          const total = document.querySelector(".cart-total-container");

          cart.insertBefore(cartItem, total);
          alert('item added to the cart');
                showTotals();
          }
        });
    });

    // Add delete functionality
    cart.addEventListener('click', function(event) {
        if(event.target.parentElement.classList.contains('cart-item-remove')) {
            const cartItem = event.target.parentElement.parentElement;

             // Add these lines here (around line 138)
             cartItems = cartItems.filter(item => {
              const itemName = cartItem.querySelector('#cart-item-title').textContent;
              return item.name !== itemName;
          });

          localStorage.setItem('cartItems', JSON.stringify(cartItems));
            cartItem.remove();
            showTotals();
            alert('Item removed from cart');
        }
    });

    // Clear cart functionality
    const clearCartBtn = document.getElementById('clear-cart');
    clearCartBtn.addEventListener('click', function(e) {
        e.preventDefault(); // Prevent default link behavior
        
        // Remove all cart items
        const cartItems = cart.querySelectorAll('.cart-item');
        cartItems.forEach(function(item) {
            item.remove();

             // Add these lines here (around line 148)
        cartItems.length = 0;
        localStorage.removeItem('cartItems');
        });
        
        // Reset totals
        showTotals();
        alert('Cart cleared successfully!');
    });

    // show totals
    function showTotals() {
        const total = [];
        const items = document.querySelectorAll('.cart-item-price');

        items.forEach(function(item){
            total.push(parseFloat(item.textContent));
        });
        //console.log(total);

        const totalMoney = total.reduce(function(total, item){
            total += item;
            return total;
        },0)
        const finalMoney = totalMoney.toFixed(2);

        document.getElementById('cart-total').textContent = finalMoney;
        document.querySelector('.item-total').textContent = finalMoney;

        document.getElementById('item-count').textContent = total.length;

    }
})();