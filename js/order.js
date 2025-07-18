// order.js

// Function to display messages in the message box
function displayMessage(message, type = 'danger') {
    const messageBox = document.getElementById('messageBox');
    if (messageBox) {
        messageBox.textContent = message;
        messageBox.className = `alert alert-${type} mt-3`; // Bootstrap alert classes
        messageBox.classList.remove('d-none'); // Make it visible
    }
}

// Define your menu items with their prices
// This should ideally come from a database in a real application
const menuItems = [
    { name: "Papaya Juice", price: 2.00 },
    { name: "Mix Rice", price: 5.00 },
    { name: "String Hoppers", price: 2.00 },
    { name: "Kottu", price: 4.00 },
    { name: "Hoppers", price: 3.00 },
    { name: "Devilled Chicken", price: 4.00 },
    { name: "Soup", price: 2.00 },
    { name: "Cutlet", price: 1.00 },
    { name: "Chicken Rice", price: 4.00 },
    { name: "Watalappan", price: 2.00 }
];

// Function to render menu items into the form
function renderMenuItems() {
    const menuItemsContainer = document.getElementById('menuItemsContainer');
    if (!menuItemsContainer) {
        console.error("menuItemsContainer not found.");
        return;
    }

    menuItemsContainer.innerHTML = ''; // Clear existing items

    menuItems.forEach(item => {
        const itemRow = document.createElement('div');
        itemRow.classList.add('item-row');

        itemRow.innerHTML = `
            <span class="item-name">${item.name}</span>
            <span class="item-price">$${item.price.toFixed(2)}</span>
            <input type="number" class="form-control item-quantity"
                   data-price="${item.price}"
                   data-item-name="${item.name}"
                   value="0" min="0">
        `;
        menuItemsContainer.appendChild(itemRow);
    });

    // Add event listeners to quantity inputs after they are rendered
    const quantityInputs = document.querySelectorAll('.item-quantity');
    quantityInputs.forEach(input => {
        input.addEventListener('input', calculateTotal);
    });
}

// Function to calculate and update the total price
function calculateTotal() {
    let total = 0;
    const quantityInputs = document.querySelectorAll('.item-quantity');
    quantityInputs.forEach(input => {
        const price = parseFloat(input.dataset.price);
        const quantity = parseInt(input.value);
        if (!isNaN(price) && !isNaN(quantity) && quantity > 0) {
            total += price * quantity;
        }
    });
    document.getElementById('orderTotal').textContent = total.toFixed(2);
}

// Main script execution when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderMenuItems(); // Render the menu items when the page loads
    calculateTotal(); // Calculate initial total (should be 0)

    const orderForm = document.getElementById('orderForm');
    if (orderForm) {
        orderForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent default form submission

            // Clear previous messages
            displayMessage('', 'd-none');

            // Collect customer details
            const customerName = document.getElementById('customerName').value.trim();
            const customerPhone = document.getElementById('customerPhone').value.trim();
            const customerAddress = document.getElementById('customerAddress').value.trim();
            const customerNotes = document.getElementById('customerNotes').value.trim();

            // Basic validation for customer details
            if (!customerName || !customerPhone || !customerAddress) {
                displayMessage("Please fill in all required customer details (Name, Phone, Address).", 'danger');
                return;
            }

            // Collect ordered items
            const orderedItems = [];
            const quantityInputs = document.querySelectorAll('.item-quantity');
            let hasItems = false;
            quantityInputs.forEach(input => {
                const quantity = parseInt(input.value);
                if (quantity > 0) {
                    hasItems = true;
                    orderedItems.push({
                        name: input.dataset.itemName,
                        price: parseFloat(input.dataset.price),
                        quantity: quantity
                    });
                }
            });

            if (!hasItems) {
                displayMessage("Please select at least one item to order.", 'danger');
                return;
            }

            const orderTotal = parseFloat(document.getElementById('orderTotal').textContent);

            // Prepare order data to send to backend
            const orderData = {
                customer: {
                    name: customerName,
                    phone: customerPhone,
                    address: customerAddress,
                    notes: customerNotes
                },
                items: orderedItems,
                total: orderTotal,
                orderTime: new Date().toISOString() // ISO 8601 format for timestamp
            };

            try {
                // Send order data to PHP backend
                const response = await fetch('process_order.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(orderData)
                });

                const result = await response.json();

                if (result.success) {
                    displayMessage(result.message, 'success');
                    // Optionally clear the form or redirect after successful order
                    orderForm.reset(); // Resets all form fields
                    renderMenuItems(); // Re-render to reset quantities to 0
                    calculateTotal(); // Reset total to 0
                } else {
                    displayMessage(result.message, 'danger');
                }
            } catch (error) {
                console.error('Error submitting order:', error);
                displayMessage('An error occurred while placing your order. Please try again.', 'danger');
            }
        });
    } else {
        console.error("Order form not found.");
    }
});
