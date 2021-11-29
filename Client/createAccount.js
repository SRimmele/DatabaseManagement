const userCreatebtn = document.querySelector('#userCreate'); 

userCreatebtn.onclick = () => createUserAccount(); 

function createUserAccount(){

const usernameInput = document.querySelector('#userName');
const firstNameInput = document.querySelector('#firstName');
const lastNameInput = document.querySelector('#lastName');
const ageInput = document.querySelector('#age');
const emailInput = document.querySelector('#email');
const passwordInput = document.querySelector('#password1'); 
const rePasswordInput = document.querySelector('#password2'); 

if(passwordInput.value !== rePasswordInput.value){
    alert("Passwords don't match!"); 
    return; 
}

fetch('http://localhost:5000/user/create', {
    headers: {
        'Content-type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({username: usernameInput.value, password: passwordInput.value, email: emailInput.value, firstName: firstNameInput.value, lastName: lastNameInput.value , age: ageInput.value})
})
.then(response => {
    if(response.status === 200){
        window.location = "login.html"; 
        return null; 
    }
    
    return response.text(); 
})
.then(data => {
    if(data !== null){
        alert(data); 
    }
});
}



