const searchCategory = document.querySelector('#searchSelect'); 
const searchFormInput = document.querySelector('#basic-search-form'); 
const searchBtn = document.querySelector('#search-btn'); 
const searchValue = document.querySelector('#search-input'); 

searchFormInput.addEventListener('submit', handleFormSubmit); 

function handleFormSubmit(event){
    event.preventDefault(); 

    searchByCategory(searchValue.value, searchCategory.value); 
}

async function searchByCategory(searchValue, searchCategory){

    if(searchCategory === '1' && searchValue){
        const response = await fetch('/song/search/' +searchValue)
        .then(response => response.json())
        .then(data => loadSongHTMLTable(data['data'])); 
    }

    else if(searchCategory === '2' && searchValue){
        const response = await fetch('/artist/search/' +searchValue)
        .then(response => response.json())
        .then(data => loadSongHTMLTable(data['data'])); 
    }

    else if(searchCategory === '3' && searchValue){ 
        const response = await fetch('/genre/search/' + searchValue)
        .then(response => response.json())
        .then(data => loadSongHTMLTable(data['data']));  
    }

    else if(searchCategory === '4' && searchValue){
        
        const response = await fetch('/lyric/search/' +searchValue)
        .then(response => response.json())
        .then(data => loadSongHTMLTable(data['data'])); 
    }

    else{
        alert("Please choose a category and input a keyword!"); 
    }
} 

function loadSongHTMLTable(data) {
    const table = document.querySelector('table');

    if (data.length === 0) {
        table.innerHTML = "<tr><td class='no-data' colspan='8'> No good matches for your search </td></tr>";
        return;
    }

    let tableHtml = "";

    tableHtml += "<thead>";
    tableHtml += "<th colspan = '2'> Search Results </th>";
    tableHtml += "</thead>";

    data.forEach(function ({songName, songID}) {
        
        tableHtml += "<tr>";
        tableHtml += `<td>${songName}</td>`; 
        tableHtml += `<td class = 'justify-content-end'><button class="btn btn-secondary add-row-btn" onclick="addFriend(${songID})"> Add song </td>`;
        tableHtml += "</tr>";
    });

    table.innerHTML = tableHtml;
}