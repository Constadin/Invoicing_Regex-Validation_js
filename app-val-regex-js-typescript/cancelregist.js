

document.addEventListener('DOMContentLoaded', () =>{

    const cancelRegistrBtn = document.querySelector('#cancelSubmitBtn');

    cancelRegistrBtn.addEventListener('click', (event) =>{
        console.log(cancelRegistrBtn);
        document.getElementById('reg-form').reset();
    });

});

