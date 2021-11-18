const formInput = document.querySelector('#login-form'); 
const emailInput = document.querySelector('#email'); 
const passwordInput = document.querySelector('#password'); 

formInput.addEventListener('submit', loginUser); 

async function loginUser(event){
    event.preventDefault(); 

    const email = emailInput.value; 
    const password = passwordInput.value; 

    const response = await fetch('/user/login', {method:'POST', 
        headers: {'content-type': "application/json"}, 
        body: JSON.stringify({email, password})
     }) 
    
     if(!response.ok){
            const body = await response.text(); 
            alert(body); 
            return; 
        }
    
    const body = await response.json(); 
    window.location = "/"; 
}