const searchCategory = document.querySelector('#searchSelect'); 
const searchFormInput = document.querySelector('#basic-search-form'); 
const searchBtn = document.querySelector('#search-btn'); 

searchFormInput.addEventListener('submit', searchUsers); 

async function searchUsers(event){
    event.preventDefault(); 

    const searchValue = document.querySelector('#search-input').value; 
        
    const response = await fetch('/user/search/' + searchValue)
    .then(response => response.json())
    .then(data => loadUserHTMLTable(data['data'])); 
} 

async function addFriend(friendUserId){
    try {
        const response = await fetch('/user/addFriend',{
            headers: {
                'Content-type': 'application/json'
            }, 
            method: 'POST', 
            body: JSON.stringify({ friendUserId })
        })
        //location.reload();
        window.location.href = "/friends";
    } catch (error) {
        alert(error);
    }
}

function loadUserHTMLTable(data) {
    const table = document.querySelector('table');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data text-center' colspan='8'> No usernames are a close match </td></tr>";
        return;
    }

    let tableHtml = "";

    tableHtml += "<thead>";
    tableHtml += "<th scope = 'col' class = 'text-center' colspan = '1'>Users</th>";
    tableHtml += "</thead>";

    data.forEach(function ({username, userID}) {
        tableHtml += "<tr class = 'dflex'>";
        tableHtml += `<td scope = 'row' colspan='2' class = ''>${username}`;
        tableHtml += `<button class="btn btn-secondary add-row-btn" onclick="addFriend(${userID})"> Add friend </td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}
