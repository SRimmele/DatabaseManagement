document.addEventListener('DOMContentLoaded', getAllArtists);
function getAllArtists() {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

const searchCategory = document.querySelector('#searchSelect'); 
const searchFormInput = document.querySelector('#basic-search-form'); 
const searchBtn = document.querySelector('#search-btn'); 

searchBtn.onclick = function searchByCategory(){
    const searchValue = document.querySelector('#search-input').value; 

    if(searchCategory.value === '1'){
        
        const response = fetch('http://localhost:5000/song/search' +searchValue)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data'])); 
    }

    if(searchCategory.value === '2'){
        
        fetch('http://localhost:5000/artist/search' +searchValue)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data'])); 
    }

    if(searchCategory.value === '3'){
        
        fetch('http://localhost:5000/genre/search' +searchValue, {
            method: 'GET',
            headers: {'content-type':"application/json"},  
            body: JSON.stringify({searchValue})
        })
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data'])); 
    }

    if(searchCategory.value === '4'){
        
        fetch('http://localhost:5000/lyric/search' +searchValue)
        .then(response => response.json())
        .then(data => loadHTMLTable(data['data'])); 
    }

    else{
        alert("Please choose a category!"); 
    }
} 

function loadHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='8'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({artistID, artistName, songAmt, popularity, link, mainGenreID, otherGenreID}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${artistName}</td>`;
        tableHtml += `<td>${songAmt}</td>`;
        tableHtml += `<td>${popularity}</td>`; 
        tableHtml += `<td>${link}</td>`;
        tableHtml += `<td>${mainGenreID}</td>`; 
        tableHtml += `<td>${otherGenreID}</td>`; 
        tableHtml += `<td><button class="delete-row-btn" data-id=${artistID}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${artistID}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}