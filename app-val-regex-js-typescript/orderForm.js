import eventBus from './eventBus.js';

import {clientChecker,clientFormData} from './submitBtnForm.js'


let orderFormData = {};
let checkOrdersFields = false;
let clientAllOrder  ={};

document.addEventListener('DOMContentLoaded', () => {

    const cancelBtninvoice = document.getElementById('cancel-btn');
    const storageBtn = document.getElementById('storage-btn');   

// Ακρόαση για το custom event 'clientCheckerUpdated'
    window.addEventListener('clientCheckerUpdated', () => { 

        
        if(clientChecker){

            function validateOrder(inputFieldOrder,myRegexOrder,orderFormData){

                inputFieldOrder.addEventListener('input',(event)=>{

                    let orderInput = event.target.value;
                    let isOrder = myRegexOrder.test(orderInput );
                    if(isOrder){

                        orderFormData[inputFieldOrder.id] = orderInput;
                        console.log(orderFormData);
                    }else{

                        // Μη έγκυρη εισαγωγή - ειδοποίηση και εκκαθάριση της εισόδου
                        let lastCharOrder = orderInput.slice(-1);
                        alert(`Μη έγκυρη εισαγωγή. Μη έγκυρος χαρακτήρας: ${lastCharOrder}`);
                        event.target.value = '';
                    }
                });

                // inputFieldOrder.addEventListener('keydown', (event) => {
                //     if (event.key === "Enter") {
                //         event.preventDefault();
                //         // Αποτροπή υποβολής μέσω πλήκτρου Enter
                //     }
                // });
            }

             /* Πίνακας με στοιχεία εισαγωγής και αντίστοιχα πρότυπα regex για επικύρωση */
        const inputFieldsOrder  = [
            {element: document.getElementById('sku'), myRegexOrder: /^[A-Z0-9]{0,10}$/ },
            {element: document.getElementById('description'), myRegexOrder: /^[A-Za-z0-9\s]{0,50}$/},
            {element: document.getElementById('quantity'), myRegexOrder: /^[0-9]{1,4}$/}, 
            {element: document.getElementById('price'), myRegexOrder: /^[0-9\.]{1,8}$/},        
        
        ];
        
        for (let i = 0; i < inputFieldsOrder.length; i++) {
            validateOrder(inputFieldsOrder[i].element, inputFieldsOrder[i].myRegexOrder, orderFormData);
        }
        }         
    });

const  orderCheckerUpdatedEvent = new Event('allFieldsOrderCompletedUpdated'); //updete event για εμφανιση τις νεας τιμης   

    /**************** Orders ******************** */
    let ordersArray = [];

    const nextΟrderBtn = document.querySelector('#next-order');
        nextΟrderBtn.addEventListener('click', () => {  

        let ordersClient = {};

        // event.preventDefault();      

        ordersClient.orderData = {
            // Πληροφορίες παραγγελίας
            sku: document.getElementById('sku').value,
            description: document.getElementById('description').value,
            quantity: document.getElementById('quantity').value,
            price: document.getElementById('price').value
        };
        
        const allFieldsOrderCompleted  = Object.values(ordersClient.orderData).every(field => field.trim() !== '');
        
        checkOrdersFields = allFieldsOrderCompleted;
        console.log(checkOrdersFields );
        if(checkOrdersFields){
            // Προσθήκη του orderClient στον πίνακα ordersArray
            ordersArray.push(ordersClient);            
        }else{
        alert('Δεν έχει ολοκληρωθεί η παραγγελία')
        console.log("Δεν έχει ολοκληρωθεί η παραγγελία")
        }  
        // orderClient.orderData.orderDate = new Date(); // Προσθήκη ημερομηνίας παραγγελίας

        // Καθαρισμός της φόρμας "invoice-form"
        document.getElementById('invoice-form').reset();
        
});

const vatRate = 0.24;

/**************** Total ******************** */
const totalΟrderBtn = document.querySelector('#total-inv');
totalΟrderBtn.addEventListener('click', (event) => { 
    event.preventDefault();
        
    window.addEventListener('allFieldsOrderCompletedUpdated', () => {  
        const orderEntry = document.getElementById('invoiceFormSubmitBtn');
        orderEntry.disabled = false;
        console.log(ordersArray); // Εμφάνιση πίνακα για έλεγχο
        let totalOrder = 0;
        
        if(checkOrdersFields){
            for (let i = 0; i < ordersArray.length; i++) {
                let item = ordersArray[i].orderData;  // Αλλαγή εδώ για να πάρεις τα δεδομένα της παραγγελίας
                let price = parseFloat(item.price);
                let quantity = parseInt(item.quantity);
                console.log("Price:", price, "Quantity:", quantity); // Εκτύπωση των τιμών για έλεγχο
                let subTotal = price * quantity;
                ordersArray[i].subTotal = subTotal; // Προσθήκη πεδίου totalOrder σε κάθε αντικείμενο του πίνακα ordersArray
                totalOrder += subTotal;
                console.log(ordersArray[i].subTotal);
                
            }

            console.log("Το συνολικό ποσό της παραγγελίας είναι: " + totalOrder);
            // Επιλέγουμε το στοιχείο με την κλάση orderAmount
            const orderAmountElement = document.querySelector('.orderAmount');    
            // Ενημερώνουμε το περιεχόμενο του στοιχείου με την τιμή του totalOrder
            orderAmountElement.textContent = "Order Amount:     " + totalOrder + " \u20AC";

            // Υπολογισμός του ποσού ΦΠΑ
            const vatAmount = (totalOrder * vatRate );
            const vatelement = document.querySelector('.vat'); 
            vatelement.textContent = "Φ.Π.Α:    " + vatAmount  + " \u20AC"; 
            const TotalPriceWIthVat =  (totalOrder + vatAmount).toFixed(2) ;
            const totalinvoicing  =  document.querySelector('.total');
            totalinvoicing.textContent = "Total:    " + TotalPriceWIthVat + " \u20AC"; 
            
            
        }else{
            alert('Δεν έχει καταχωρηθεί η παραγγελία') 
            console.log("Δεν έχει ολοκληρωθεί η παραγγελία")
        }   
        console.log("clientFormData");             
        console.log(clientFormData);
        console.log(ordersArray);
    });
    
    window.dispatchEvent(orderCheckerUpdatedEvent);
});


/**************** cancel orders *********************/


cancelBtninvoice.addEventListener('click',() =>{

    // event.preventDefault();
    // Μηδενισμός του πίνακα ordersArray
    ordersArray.splice(0, ordersArray.length);
    
    console.log(ordersArray); // Ελέγχουμε τον πίνακα για να βεβαιωθούμε ότι είναι μηδενισμένος

    const orderAmountElement = document.querySelector('.orderAmount');    
            // Ενημερώνουμε το περιεχόμενο του στοιχείου με την τιμή του totalOrder
    orderAmountElement.textContent = "Order Amount:  0 \u20AC";
    const vatelement = document.querySelector('.vat'); 
    vatelement.textContent = "Φ.Π.Α:    0 \u20AC";
    const totalinvoicing  =  document.querySelector('.total');
    totalinvoicing.textContent = "Total:    0 \u20AC"; 

    if(ordersArray.length == 0){
        const orderEntry = document.getElementById('invoiceFormSubmitBtn');
        orderEntry.disabled = true;
            
    }
});

/************************ order entry ************/

const orderEntry = document.getElementById('invoiceFormSubmitBtn');

orderEntry.addEventListener('click', (event) => { 

        event.preventDefault();

        if (ordersArray.length == 0) {

            orderEntry.disabled = true;

        }else{

            nextΟrderBtn.disabled = true;
            totalΟrderBtn.disabled= true;//απενεργοποιηση btn            
            cancelBtninvoice.style.display = 'none';                
            storageBtn.style.display = 'block';           
            
            // Υπολογισμός συνολικού ποσού χωρίς ΦΠΑ και προσθήκη ΦΠΑ σε κάθε παραγγελία
            let totalSubTotal = 0;
            for (let i = 0; i < ordersArray.length; i++) {
                let item = ordersArray[i].orderData;
                let price = parseFloat(item.price);
                let quantity = parseInt(item.quantity);
                let subTotal = price * quantity;
                totalSubTotal += subTotal; // Προσθήκη στον συνολικό υπολογισμό του subTotal
            }

            // Υπολογισμός συνολικού ποσού με ΦΠΑ
            const VAT_RATE = 0.24;
            const totalWithVAT = totalSubTotal * (1 + VAT_RATE);

            // Δημιουργία του αντικειμένου clientAllOrder
            clientAllOrder = {
                clientInfo: clientFormData, // Στοιχεία πελάτη από τη φόρμα εισαγωγής
                orders: ordersArray, // Παραγγελίες χωρίς το ΦΠΑ                
                totalWithVAT: totalWithVAT ,// Συνολικό ποσό με ΦΠΑ
                totalWithoutVAT: totalSubTotal, // Συνολικό ποσό χωρίς ΦΠΑ
            };
            if (Object.keys(clientAllOrder).length !== 0) {
                orderEntry.disabled = true;
            }
            console.log("synxoneysh");             
            console.log(clientFormData);
            console.log(ordersArray);
            console.log(clientAllOrder); // Εδώ εμφανίζεται το αντικείμενο clientAllOrder με τα στοιχεία του πελάτη, τις παραγγελίες και τα συνολικά ποσά
            
            // Δημοσίευση του clientAllOrder
            
            eventBus.publish('clientAllOrderUpdated', clientAllOrder);
        }
        
    });
    

});

