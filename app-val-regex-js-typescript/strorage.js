import eventBus from './eventBus.js';



document.addEventListener('DOMContentLoaded', () => {

    let storedClientAllOrder; // Variable to store the client order data

    eventBus.subscribe('clientAllOrderUpdated', updatedClientAllOrder => {
        storedClientAllOrder = updatedClientAllOrder; // Store the updated client order data
        console.log('Updated Client All Order:', storedClientAllOrder);

        const graStorageBtn = document.getElementById('storage-btn');
        graStorageBtn.addEventListener('click', () => {
            const invoiceDiv = document.querySelector('.invoice');
            invoiceDiv.style.display = 'none'; 

            const orderArea = document.querySelector('.order-area'); 
            orderArea.textContent = '';
            orderArea.style.cssText = 'background:white;font-size:1.4rem; padding:20px;';
            
            // Δημιουργία μιας συμβολοσειράς με τα δεδομένα που θέλεις να εμφανίσεις
            const formattedClientInfo = `                    
                    Name: ${storedClientAllOrder.clientInfo.fname}
                    Last Name: ${storedClientAllOrder.clientInfo.lastName}
                    Store Name: ${storedClientAllOrder.clientInfo.storeName}
                    Store Address: ${storedClientAllOrder.clientInfo.storeAddress}
                    Area: ${storedClientAllOrder.clientInfo.location}
                    City: ${storedClientAllOrder.clientInfo.city}
                    Country: ${storedClientAllOrder.clientInfo.country}
                    Postal Code: ${storedClientAllOrder.clientInfo.postalCode}
                    Phone Number: ${storedClientAllOrder.clientInfo.phoneNumber}
                    Mobile Number: ${storedClientAllOrder.clientInfo.mobileNumber}
                    A.Φ.M: ${storedClientAllOrder.clientInfo.taxNumber}
                    Email: ${storedClientAllOrder.clientInfo.emailAddress}
                    `;

                    const formattedOrders = storedClientAllOrder.orders.map((order, index) => `                            
                            Order ${index + 1}:
                            SKU: ${order.orderData.sku}
                            Description: ${order.orderData.description}
                            Quantity: ${order.orderData.quantity}
                            Price: ${order.orderData.price}
                            Subtotal: ${order.subTotal}
                        `).join('\n');

                        const formattedTotal = `                            
                            Total Without VAT: ${storedClientAllOrder.totalWithoutVAT}
                            Total With VAT: ${storedClientAllOrder.totalWithVAT}
                        `;

                        const formattedData = `
                            Client Information:
                            ${formattedClientInfo}
                            
                            Orders:
                            ${formattedOrders}
                            
                            Total:
                            ${formattedTotal}
                        `;
                    const newData = formattedData.replace(/}/g, '\n');
                    // Ορισμός του περιεχομένου του στοιχείου orderArea
                    orderArea.innerText = newData;
                        
        });
    });
});