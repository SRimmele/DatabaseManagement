document.addEventListener('DOMContentLoaded', getAllArtists);
function getAllArtists() {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
}

const searchCategory = document.querySelector('#searchSelect'); 
const searchFormInput = document.querySelector('#basic-search-form'); 
const searchBtn = document.querySelector('#search-btn'); 

searchFormInput.addEventListener('submit', searchByCategory); 

async function searchByCategory(event){
    event.preventDefault(); 

    const searchValue = document.querySelector('#search-input').value; 
    console.log(searchCategory.value); 

    if(searchCategory.value === '1'){
        const response = await fetch('http://localhost:5000/song/search/' +searchValue)
        .then(response => response.json())
        .then(data => loadSongHTMLTable(data['data'])); 
    }

    else if(searchCategory.value === '2'){
        const response = await fetch('http://localhost:5000/artist/search/' +searchValue)
        .then(response => response.json())
        .then(data => loadArtistHTMLTable(data['data'])); 
    }

    else if(searchCategory.value === '3'){ 
        const response = await fetch('http://localhost:5000/genre/search/' + searchValue)
        .then(response => response.json())
        .then(data => loadArtistTable(data['data']));  
    }

    else if(searchCategory.value === '4'){
        
        const response = await fetch('http://localhost:5000/lyric/search/' +searchValue)
        .then(response => response.json())
        .then(data => loadSongHTMLTable(data['data'])); 
    }

    else{
        alert("Please choose a category!"); 
    }
} 

function loadArtistHTMLTable(data) {
    const table = document.querySelector('table');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='8'>No Data</td></tr>";
        return;
    }

    let tableHtml = "";

    tableHtml += "<thead>";
    tableHtml += "<th>Artist Name</th>";
    tableHtml += "<th>Song Amount</th>";
    tableHtml += "<th>Popularity</th>";
    tableHtml += "<th>Link</th>";
    tableHtml += "<th>Main Genre</th>";
    tableHtml += "<th>Other Genres</th>";
    tableHtml += "</thead>";

    data.forEach(function ({artistID, artistName, songAmt, popularity, link, mainGenreID, otherGenreID}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${artistName}</td>`;
        tableHtml += `<td>${songAmt}</td>`;
        tableHtml += `<td>${popularity}</td>`; 
        tableHtml += `<td>${link}</td>`;
        tableHtml += `<td>${mainGenreID}</td>`; 
        tableHtml += `<td>${otherGenreID}</td>`;
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

    tableHtml += "<thead>";
    tableHtml += "<th>Song Name</th>";
    tableHtml += "<th>Artist Name</th>";
    tableHtml += "<th>Song Link</th>";
    tableHtml += "<th>Lyrics</th>";
    tableHtml += "</thead>";

    data.forEach(function ({songName, artistName, link, lyrics}) {
        tableHtml += "<tr>";
        tableHtml += `<td>${songName}</td>`; 
        tableHtml += `<td>${artistName}</td>`;
        tableHtml += `<td>${link}</td>`; 
        tableHtml += `<td>${lyrics}</td>`; 
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}