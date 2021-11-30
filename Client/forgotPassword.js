const passwordBtn = document.querySelector('#update-password-btn');  

passwordBtn.onclick = () => resetPassword(); 

function resetPassword(){
    const passwordInput = document.querySelector('#password'); 
    const emailInput = document.querySelector('#email'); 
    const confirmPasswordInput = document.querySelector('#passwordCheck');

    const email = emailInput.value; 
    const password = passwordInput.value; 

    if(passwordInput.value != confirmPasswordInput.value){
        alert("The passwords don't match! Please try again.")
        return; 
    } 

    fetch('/user/passwordReset', {method: 'POST', 
        headers: {'content-type': "application/json"}, 
        body: JSON.stringify({email, password})
})
.then(response => {
    if(response.status === 200){
        window.location = "/login";
        return null; 
    }
    return response.text();  
})
.then(data => {
    if(data != null){
        alert(data); 
    }
}); 
//const body = await response.json(); 
}