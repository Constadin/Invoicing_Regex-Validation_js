
import { clientFormData} from './index.js'

 // ... υπάρχων κώδικας ...'./index.js'

// Αρχικοποίηση της clientChecker σε false
let clientChecker = false;

/* Ακρόαση για το γεγονός DOMContentLoaded για να εξασφαλιστεί ότι το έγγραφο είναι πλήρως φορτωμένο */
document.addEventListener('DOMContentLoaded', () => {

const grabregFormSubmitbtn = document.getElementById('regFormSubmitBtn');
// Προσθήκη ακροατή γεγονότος στο κουμπί "Submit Registration Form"

grabregFormSubmitbtn.addEventListener('click', (event) => {           
        
        // allFieldsCompleted = Object.values(clientFormData).every(value => {
        // Ελέγχει αν η τιμή του κάθε πεδίου είναι string και περιέχει οποιαδήποτε συγκεκριμένη συμβολοσειρά
        //     return typeof value === 'string';
        // });
                
        // Έλεγχος αν το clientFormData έχει όλα τα πεδία συμπληρωμένα
        const allFieldsCompleted = Object.keys(clientFormData).length === 12;

        if (allFieldsCompleted) {

            const cancelRegistrBtn = document.querySelector('#cancelSubmitBtn');

            cancelRegistrBtn.disabled = true;//απενεργοποιηση btn
            cancelRegistrBtn.style.cssText = 'opacity:0.5;';
            // Όλα τα πεδία έχουν συμπληρωθεί        
            console.log('Όλα τα πεδία είναι συμπληρωμένα!');

            grabregFormSubmitbtn.disabled = true;//απενεργοποιηση btn

            // Δημιουργία και εμφάνιση των στοιχείων του χρήστη
            clientChecker = allFieldsCompleted;//ανάθεση τιμής στην μεταβλητή
            const clientCheckerUpdatedEvent = new Event('clientCheckerUpdated'); //updete event για εμφανιση τις νεας τιμης
            window.dispatchEvent(clientCheckerUpdatedEvent);
            
            // Δημιουργία ενός νέου div
            const userDataDiv = document.createElement('div');
            userDataDiv.classList.add('cliend-data'); // Προσθήκη κλάσης για style(προαιρετικό)    
            for (const key in clientFormData) {
                if (clientFormData.hasOwnProperty(key)) {
                        
                    event.preventDefault(); // Αποτρέπει την προεπιλεγμένη συμπεριφορά του κουμπιού υποβολής
                        
                    const userDataPara = document.createElement('p');

                        let buffer = '';

                        switch (key) {
                            case 'fname':
                                buffer = 'Name' ;                       
                                userDataPara.textContent = `${buffer}: ${clientFormData['fname']}`;
                                userDataDiv.appendChild(userDataPara);
                                break;
                            case 'lastName':
                                buffer = 'Last Name' ;                       
                                userDataPara.textContent = `${buffer}: ${clientFormData['lastName']}`;
                                userDataDiv.appendChild(userDataPara);
                                break;
                            case 'storeName':
                                buffer = 'Store Name' ;                       
                                userDataPara.textContent = `${buffer}: ${clientFormData['storeName']}`;
                                userDataDiv.appendChild(userDataPara);
                                break;
                            case 'storeAddress':
                                buffer = 'Store Address' ;                       
                                userDataPara.textContent = `${buffer}: ${clientFormData['storeAddress']}`;
                                userDataDiv.appendChild(userDataPara);
                                break;
                            case 'location':
                                buffer = 'Area' ;                       
                                userDataPara.textContent = `${buffer}: ${clientFormData['location']}`;
                                userDataDiv.appendChild(userDataPara);
                                break;
                            case 'city':
                                buffer = 'City' ;                       
                                userDataPara.textContent = `${buffer}: ${clientFormData['city']}`;
                                userDataDiv.appendChild(userDataPara);
                                break;
                            case 'country':
                                buffer = 'Country' ;                       
                                userDataPara.textContent = `${buffer}: ${clientFormData['country']}`;
                                userDataDiv.appendChild(userDataPara);
                                break;
                            case 'postalCode':
                                buffer = 'Postal Code' ;                       
                                userDataPara.textContent = `${buffer}: ${clientFormData['postalCode']}`;
                                userDataDiv.appendChild(userDataPara);
                                break; 
                            case 'phoneNumber':
                                buffer = 'Phone Number' ;                       
                                userDataPara.textContent = `${buffer}: ${clientFormData['phoneNumber']}`;
                                userDataDiv.appendChild(userDataPara);
                                break;
                            case 'mobileNumber':
                                buffer = 'Mobile Number' ;                       
                                userDataPara.textContent = `${buffer}: ${clientFormData['mobileNumber']}`;
                                userDataDiv.appendChild(userDataPara);
                                break;
                            case 'taxNumber':
                                buffer = 'A.Φ.M' ;                       
                                userDataPara.textContent = `${buffer}: ${clientFormData['taxNumber']}`;
                                userDataDiv.appendChild(userDataPara);
                                break;
                            case 'emailAddress':
                                buffer = 'Email' ;                       
                                userDataPara.textContent = `${buffer}: ${clientFormData['emailAddress']}`;
                                userDataDiv.appendChild(userDataPara);
                                break;                                 
                            default:
                                userDataPara.textContent = `Unknown : ${key}`;
                                userDataDiv.appendChild(userDataPara);
                                break;
                        }                    
                    }
                }
            //display none div  
            
            const validationMsg  = document.querySelector('h3'); 
            validationMsg.style.display="none";
            const invoiceDiv = document.querySelector('.invoice');
            invoiceDiv.style.display = 'block';
            // Προσθήκη του νέου div με τα δεδομένα του χρήστη στο DOM
            const grabOrderAreaElement = document.querySelector('.order-area');
            grabOrderAreaElement.appendChild(userDataDiv);
            grabOrderAreaElement.style.cssText = "font-size:1.2rem; padding-left:10px;"
            // document.body.appendChild(userDataDiv);
        } else {
            // Υπάρχουν κενά πεδία στο clientFormData
            console.log('Υπάρχουν κενά πεδία στη φόρμα.');
        }    
    });    
});

export { clientChecker,clientFormData };
