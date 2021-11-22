document.addEventListener('DOMContentLoaded', getAllArtists);
function getAllArtists() {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadArtistHTMLTable(data['data']));
    
}

const searchFormInput = document.querySelector('#advanced-search-form'); 
const checkboxes = document.querySelector('input[type ="checkbox"]'); 
const searchBtn = document.querySelector('#adv-search-btn');

searchFormInput.addEventListener('submit'); 

function getCheckedCheckboxes(checkboxes){
    
}


function loadArtistHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='8'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({artistID, artistName, songAmt, popularity, link, mainGenreID, otherGenreID}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${artistName}</td>`; 
        tableHtml += `<td>${link}</td>`;
        tableHtml += `<td><button class="delete-row-btn" data-id=${artistID}>Delete</td>`;
        tableHtml += `<td><button class="edit-row-btn" data-id=${artistID}>Edit</td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}

function loadSongHTMLTable(data) {
    const table = document.querySelector('table tbody');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='8'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    data.forEach(function ({songName, link}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${songName}</td>`; 
        tableHtml += `<td>${link}</td>`; 
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}