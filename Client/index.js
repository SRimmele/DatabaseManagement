const updateBtn = document.querySelector('#update-row-btn');
const searchBtn = document.querySelector('#search-btn'); 
const addArtistBtn = document.querySelector('#add-artist-btn'); 
const searchCategory = document.querySelector('#searchSelect');  
const searchFormInput = document.querySelector('#basic-search-form'); 


function deleteRowById(id) {
    fetch('/delete/' + id, {
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

// addArtistBtn.onclick = function(){
//     const artistInput = document.querySelector('#artist-name-input');
//     const songAmtInput = document.querySelector('#artist-songAmt-input'); 
//     const popularityInput = document.querySelector('#artist-pop-input'); 
//     const mGenreInput = document.querySelector('#artist-main-input'); 
//     const oGenreInput = document.querySelector('#artist-genres-input'); 
//     const linkInput = document.querySelector('#artist-link-input'); 

//     const artist = artistInput.value; 
//     const songAmt = songAmtInput.value; 
//     const pop = popularityInput.value; 
//     const mGenre = mGenreInput.value; 
//     const oGenre = oGenreInput.value; 
//     const link = linkInput.value; 

//     artistInput.value = "";
//     songAmtInput.value = ""; 
//     popularityInput.value = ""; 
//     mGenreInput.value = ""; 
//     oGenreInput.value = ""; 
//     linkInput.value = ""; 

//     fetch('http://localhost:5000/create', {
//         headers: {
//             'Content-type': 'application/json'
//         },
//         method: 'POST',
//         body: JSON.stringify({ name : artist, songAmt, pop, mGenre, oGenre, link})
//     })
//     .then(response => response.json())
//     .then(data => getAllArtists());


// }


