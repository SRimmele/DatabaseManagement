const searchCategory = document.querySelector('#searchSelect'); 
const searchFormInput = document.querySelector('#basic-search-form'); 
const searchBtn = document.querySelector('#search-btn'); 

searchFormInput.addEventListener('submit', searchUsers); 

async function searchUsers(event){
    event.preventDefault(); 

    const searchValue = document.querySelector('#search-input').value; 
        
    const response = await fetch('http://localhost:5000/user/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadUserHTMLTable(data['data'])); 
} 

const addBtn = document.querySelector('#add-row-btn');

addBtn.onclick = function(username) {

    fetch('http://localhost:5000/user/addFriends',{
        headers: {
            'Content-type': 'application/json'
        }, 
        method: 'POST', 
        body: JSON.stringify({name: username})
    })
    .then(response => response.json())
    .then(data => {
        if(data.succes){
            location.reload(); 
        }
    }); 
}

function loadUserHTMLTable(data) {
    const table = document.querySelector('table');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='8'> No usernames are a close match </td></tr>";
        return;
    }

    let tableHtml = "";

    tableHtml += "<thead>";
    tableHtml += "<th colspan = 2>Users</th>";
    tableHtml += "</thead>";

    data.forEach(function ({username}) {
        
        tableHtml += "<tr>";
        tableHtml += `<td>${username}</td>`;
        tableHtml += `<td><button class="add-row-btn" data-id=${data.ID}> Add friend </td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}
