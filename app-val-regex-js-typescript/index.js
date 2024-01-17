let clientFormData = {};

/* Ακρόαση για το γεγονός DOMContentLoaded για να εξασφαλιστεί ότι το έγγραφο είναι πλήρως φορτωμένο */
document.addEventListener('DOMContentLoaded', () => {   
            
        // Επιλογή και απόκρυψη του στοιχείου με κλάση 'invoice'
        const invoiceDiv = document.querySelector('.invoice');
        invoiceDiv.style.display = 'none';

        // Δημιουργία στοιχείου επικύρωσης
        const validationMsg = document.createElement('h3');
        validationMsg.textContent = "Please Wait...wait for the informations to be entered";
        // validationMsg.textContent = "Παρακαλώ περιμένετε... περιμένετε για τα στοιχεία που θα εισαχθούν";

        // Επιλογή στοιχείου με κλάση 'order-area' και προσθήκη του μηνύματος επικύρωσης
        const grabOrderAreaElement = document.querySelector('.order-area');
        grabOrderAreaElement.appendChild(validationMsg);

        // style του στοιχείου 'order-area' για οπτική βελτίωση
        grabOrderAreaElement.style.cssText = 'background: white; color:black; padding: 10px; border-radius:20px;';

        // Λήψη στοιχείων φόρμας μέσω των αναγνωριστικών τους
        const grabRegistrForm = document.getElementById('reg-form');
        const grabregFormSubmitbtn = document.getElementById('regFormSubmitBtn');

        // Έλεγχος αν υπάρχουν στοιχεία φόρμας
        if (grabRegistrForm && grabregFormSubmitbtn) {

            function validateInput(inputField, myRegex, clientFormData) {

                inputField.addEventListener('input', (event) => {
                    let userInput = event.target.value;
                    let isValid = myRegex.test(userInput);
                    if (isValid) {
                        // Έγκυρη εισαγωγή - αποθηκεύεται στο clientFormData
                        clientFormData[inputField.id] = userInput;
                        console.log(clientFormData);
                    } else {
                        // Μη έγκυρη εισαγωγή - ειδοποίηση και εκκαθάριση της εισόδου
                        let lastChar = userInput.slice(-1);
                        alert(`Μη έγκυρη εισαγωγή. Μη έγκυρος χαρακτήρας: ${lastChar}`);
                        event.target.value = '';
                    }

                });

                // Αποτροπή υποβολής μέσω πλήκτρου Enter
                // inputField.addEventListener('keydown', (event) => {
                //     if (event.key === "Enter") {
                //         event.preventDefault();
                        
                //     }
                // });
            }
            /* Πίνακας με στοιχεία εισαγωγής και αντίστοιχα πρότυπα regex για επικύρωση */
            const inputFields  = [
                {element: document.getElementById('fname'), myRegex: /^[A-Z][a-z]{0,30}$/ },
                {element: document.getElementById('lastName'), myRegex: /^[A-Z][a-z]{0,30}$/},
                {element: document.getElementById('storeName'), myRegex: /^[A-Z][a-z\s]{0,30}$/},   
                {element: document.getElementById('storeAddress'), myRegex: /^[A-Z][a-z0-9\s]{0,30}$/},
                {element: document.getElementById('location'), myRegex: /^[A-Z]{0,30}$/},
                {element: document.getElementById('city'),myRegex: /^[A-Z]{0,30}$/},
                {element: document.getElementById('country'), myRegex: /^[A-Z]{0,30}$/},
                {element: document.getElementById('postalCode'), myRegex: /^[A-Z0-9]{0,7}$/},
                {element: document.getElementById('phoneNumber'), myRegex: /^\+[0-9\s]{0,15}$/},
                {element: document.getElementById('mobileNumber'), myRegex: /^\+[0-9\s]{0,15}$/},
                {element: document.getElementById('taxNumber'), myRegex:/^[0-9]{0,11}$/}

            ];

            for (let i = 0; i < inputFields.length; i++) {
                validateInput(inputFields[i].element, inputFields[i].myRegex, clientFormData);
            }
        }

        // Λήψη στοιχείου φόρμας μέσω του αναγνωριστικού email
        const grabemailAddress = document.getElementById('emailAddress');
        // Πρότυπο regex για email
        const emailAddressRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/;

        let lastValidEmail = '';

        grabemailAddress.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                event.preventDefault();
                // Αποτροπή υποβολής μέσω πλήκτρου Enter
            }
        });

        /* Έλεγχος εγκυρότητας email */
        function isValidEmail(userEmail, emailAddressRegex) {
            return emailAddressRegex.test(userEmail);
        }

        grabemailAddress.addEventListener('change', () => {
            let userEmail = grabemailAddress.value;

            if (isValidEmail(userEmail, emailAddressRegex)) {
                clientFormData['emailAddress'] = userEmail;
                console.log('email ok');
                console.log(clientFormData);
            } else {
                console.log(userEmail);
                grabemailAddress.value = lastValidEmail;
                alert('Μη έγκυρη μορφή email. Παρακαλώ εισάγετε μια έγκυρη διεύθυνση email.');
                grabemailAddress.value = '';
            }

        });

});

// Εξαγωγή των μεταβλητών
export { clientFormData};


