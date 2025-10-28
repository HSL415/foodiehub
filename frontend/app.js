// API Base URL
const API_BASE_URL = 'http://localhost:8080/api';

console.log('App.js loaded');

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, current page:', window.location.pathname);
    
    // Check which page we're on and load appropriate data
    const path = window.location.pathname;
    
    if (path.includes('menu.html') || path.endsWith('menu.html')) {
        console.log('Menu page detected');
        loadMenuItems();
    } else if (path.includes('order.html') || path.endsWith('order.html')) {
        console.log('Orders page detected');
        loadOrders();
    }
});

// Function to load menu items from backend
async function loadMenuItems() {
    console.log('loadMenuItems() called');
    const menuContainer = document.getElementById('menu-items');
    
    if (!menuContainer) {
        console.error('ERROR: menu-items container not found!');
        return;
    }
    
    console.log('Menu container found:', menuContainer);
    menuContainer.innerHTML = '<div class="loading">Loading menu from server...</div>';
    
    try {
        console.log('Fetching from:', `${API_BASE_URL}/menu`);
        const response = await fetch(`${API_BASE_URL}/menu`);
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error('Failed to load menu');
        }
        
        const menuItems = await response.json();
        console.log('Menu items received:', menuItems.length, 'items');
        
        if (menuItems.length === 0) {
            menuContainer.innerHTML = '<p class="loading">No menu items available yet.</p>';
            return;
        }
        
        menuContainer.innerHTML = '';
        
        menuItems.forEach(item => {
            console.log('Creating card for:', item.name);
            const menuCard = createMenuCard(item);
            menuContainer.appendChild(menuCard);
        });
        
        console.log('Menu loaded successfully!');
        
    } catch (error) {
        console.error('Error loading menu:', error);
        menuContainer.innerHTML = `
            <div class="loading">
                <p>❌ Unable to load menu</p>
                <p>Error: ${error.message}</p>
                <p>Make sure backend is running on http://localhost:8080</p>
            </div>
        `;
    }
}

// Create menu card element
function createMenuCard(item) {
    const card = document.createElement('div');
    card.className = 'menu-item';
    
    card.innerHTML = `
        <h3>${item.name}</h3>
        <p>${item.description}</p>
        <div class="price">$${item.price.toFixed(2)}</div>
        <button onclick="orderItem(${item.id}, '${item.name.replace(/'/g, "\\'")}', ${item.price})">
            Order Now
        </button>
    `;
    
    return card;
}

// Function to place an order
async function orderItem(itemId, itemName, price) {
    console.log('orderItem called:', itemId, itemName, price);
    
    const customerName = prompt('Enter your name:');
    
    if (!customerName || customerName.trim() === '') {
        alert('Order cancelled');
        return;
    }
    
    const orderData = {
        customerName: customerName.trim(),
        itemId: itemId,
        itemName: itemName,
        totalPrice: price,
        status: 'PENDING'
    };
    
    console.log('Placing order:', orderData);
    
    try {
        const response = await fetch(`${API_BASE_URL}/orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
        
        console.log('Order response status:', response.status);
        
        if (response.ok) {
            const result = await response.json();
            console.log('Order created:', result);
            alert(`✅ Order placed successfully!\n\nOrder #${result.id}\nItem: ${itemName}\nTotal: $${price.toFixed(2)}\n\nCheck "My Orders" page to view it.`);
        } else {
            throw new Error('Order failed with status: ' + response.status);
        }
        
    } catch (error) {
        console.error('Error placing order:', error);
        alert('❌ Failed to place order. Please try again.\n\nMake sure backend is running.');
    }
}

// Function to load orders
async function loadOrders() {
    console.log('loadOrders() called');
    const ordersContainer = document.getElementById('orders-list');
    
    if (!ordersContainer) {
        console.error('ERROR: orders-list container not found!');
        return;
    }
    
    console.log('Orders container found:', ordersContainer);
    ordersContainer.innerHTML = '<div class="loading">Loading orders from server...</div>';
    
    try {
        console.log('Fetching from:', `${API_BASE_URL}/orders`);
        const response = await fetch(`${API_BASE_URL}/orders`);
        
        console.log('Response status:', response.status);
        
        if (!response.ok) {
            throw new Error(`Failed to load orders: ${response.status}`);
        }
        
        const orders = await response.json();
        console.log('Orders received:', orders.length, 'orders');
        
        if (orders.length === 0) {
            ordersContainer.innerHTML = '<p class="loading">No orders yet. Visit the menu page to place your first order!</p>';
            return;
        }
        
        ordersContainer.innerHTML = '';
        
        orders.forEach(order => {
            console.log('Creating card for order:', order.id);
            const orderCard = createOrderCard(order);
            ordersContainer.appendChild(orderCard);
        });
        
        console.log('Orders loaded successfully!');
        
    } catch (error) {
        console.error('Error loading orders:', error);
        ordersContainer.innerHTML = `
            <div class="loading">
                <p>❌ Unable to load orders</p>
                <p>Error: ${error.message}</p>
                <p>Make sure backend is running on http://localhost:8080</p>
            </div>
        `;
    }
}

// Create order card element
function createOrderCard(order) {
    const card = document.createElement('div');
    card.className = 'order-card';
    
    const statusClass = order.status === 'COMPLETED' ? 'status-completed' : 'status-pending';
    
    // Format the order time
    let orderTimeStr = 'N/A';
    if (order.orderTime) {
        const date = new Date(order.orderTime);
        orderTimeStr = date.toLocaleString();
    }
    
    card.innerHTML = `
        <h3>Order #${order.id}</h3>
        <p><strong>Customer:</strong> ${order.customerName}</p>
        <p><strong>Item:</strong> ${order.itemName}</p>
        <p><strong>Total:</strong> $${order.totalPrice.toFixed(2)}</p>
        <p><strong>Time:</strong> ${orderTimeStr}</p>
        <span class="order-status ${statusClass}">${order.status}</span>
    `;
    
    return card;
}

console.log('App.js fully loaded!');
