
document.addEventListener('DOMContentLoaded', getAllArtists);
function getAllArtists() {
    fetch('http://localhost:5000/getAll')
    .then(response => response.json())
    .then(data => loadHTMLTable(data['data']));
    
}

document.querySelector('table tbody').addEventListener('click', function(event) {
    if (event.target.className === "delete-row-btn") {
        deleteRowById(event.target.dataset.id);
    }
    if (event.target.className === "edit-row-btn") {
        handleEditRow(event.target.dataset.id);
    }
});

const updateBtn = document.querySelector('#update-row-btn');
const searchBtn = document.querySelector('#search-btn'); 
const addArtistBtn = document.querySelector('#add-artist-btn'); 
const searchCategory = document.querySelector('#searchSelect');  
const searchFormInput = document.querySelector('#basic-search-form'); 

// searchFormInput.addEventListener('submit', searchByCategory); 

// function searchByCategory(event){

//     const searchValue = document.querySelector('#search-input').value; 
//     //console.log(searchCategory.value); 

//     if(searchCategory.value === '1'){
//         //console.log("You're searching for Songs!")
//         fetch('http://localhost:5000/song/search/' +searchValue)
//         .then(response => response.json())
//         .then(data => loadSongHTMLTable(data['data'])); 
//     }

//     else if(searchCategory.value === '2'){
//         fetch('http://localhost:5000/artist/search/' +searchValue)
//         .then(response => response.json())
//         .then(data => loadHTMLTable(data['data'])); 
//     }

//     else if(searchCategory.value === '3'){ 
//         fetch('http://localhost:5000/genre/search/' + searchValue)
//         .then(response => response.json())
//         .then(data => loadHTMLTable(data['data']));  
//     }

//     else if(searchCategory.value === '4'){
        
//         fetch('http://localhost:5000/lyric/search/' +searchValue)
//         .then(response => response.json())
//         .then(data => loadSongHTMLTable(data['data'])); 
//     }

//     else{
//         alert("Please choose a category!"); 
//     }
// } 

// searchBtn.onclick = function() {
//     const searchValue = document.querySelector('#search-input').value;

//     fetch('http://localhost:5000/search/' + searchValue)
//     .then(response => response.json())
//     .then(data => loadHTMLTable(data['data']));
// }

searchBtn.onclick = searchByCategory(); 

function deleteRowById(id) {
    fetch('http://localhost:5000/delete/' + id, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    });
}

function handleEditRow(id) {
    const updateSection = document.querySelector('#update-row');
    updateSection.hidden = false;
    document.querySelector('#update-name-input').dataset.id = id;
}

updateBtn.onclick = function() {
    const updateNameInput = document.querySelector('#update-name-input');


    console.log(updateNameInput);

    fetch('http://localhost:5000/update', {
        method: 'PATCH',
        headers: {
            'Content-type' : 'application/json'
        },
        body: JSON.stringify({
            id: updateNameInput.dataset.id,
            name: updateNameInput.value
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        }
    })
}


//const addBtn = document.querySelector('#add-name-btn');

// addBtn.onclick = function () {
//     const nameInput = document.querySelector('#name-input');
//     const name = nameInput.value;
//     nameInput.value = "";

//     fetch('http://localhost:5000/insert', {
//         headers: {
//             'Content-type': 'application/json'
//         },
//         method: 'POST',
//         body: JSON.stringify({ name : name})
//     })
//     .then(response => response.json())
//     .then(data => insertRowIntoTable(data['data'][0]));
// }

addArtistBtn.onclick = function(){
    const artistInput = document.querySelector('#artist-name-input');
    const songAmtInput = document.querySelector('#artist-songAmt-input'); 
    const popularityInput = document.querySelector('#artist-pop-input'); 
    const mGenreInput = document.querySelector('#artist-main-input'); 
    const oGenreInput = document.querySelector('#artist-genres-input'); 
    const linkInput = document.querySelector('#artist-link-input'); 

    const artist = artistInput.value; 
    const songAmt = songAmtInput.value; 
    const pop = popularityInput.value; 
    const mGenre = mGenreInput.value; 
    const oGenre = oGenreInput.value; 
    const link = linkInput.value; 

    artistInput.value = "";
    songAmtInput.value = ""; 
    popularityInput.value = ""; 
    mGenreInput.value = ""; 
    oGenreInput.value = ""; 
    linkInput.value = ""; 

    fetch('http://localhost:5000/create', {
        headers: {
            'Content-type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify({ name : artist, songAmt, pop, mGenre, oGenre, link})
    })
    .then(response => response.json())
    .then(data => getAllArtists());


}

function insertRowIntoTable(data) {
    console.log(data);
    const table = document.querySelector('table tbody');
    const isTableData = table.querySelector('.no-data');

    let tableHtml = "<tr>";

    tableHtml += `<td><button class="delete-row-btn" data-id=${data.ID}>Delete</td>`;
    tableHtml += `<td><button class="edit-row-btn" data-id=${data.ID}>Edit</td>`;

    tableHtml += "</tr>";

    if (isTableData) {
        table.innerHTML = tableHtml;
    } else {
        const newRow = table.insertRow();
        newRow.innerHTML = tableHtml;
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

