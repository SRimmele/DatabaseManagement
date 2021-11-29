

async function loadPlaylists(data) {
    const card = document.querySelector('card');

    // const response =  await fetch('http://localhost:5000/user/friend')
    // .then(response => response.json())
    // .then(data => getUserFriends()); 

    let playlistCardHtml = "";

    if (data.length === 0) {
        playlistCardHtml += "<div class = 'col'>";
        playlistCardHtml += "<div class='card text-center text-dark bg-light'>";
        playlistCardHtml += "<div class = 'card-header'>";
        playlistCardHtml += "<h3 class ='card-title'> Sorry! </h3>";
        playlistCardHtml += "</div>";
        playlistCardHtml += "<div class = 'card-body'>"; 
        playlistCardHtml += "Looks like you don't have any playlists yet!";
        playlistCardHtml += "</div>";
        playlistCardHtml += "</div>";
        playlistCardHtml += "</div>";

        playlistCardHtml.innerHTML = playlistCardHtml;

        return;
    }

    data.forEach(function ({playlistName, playlistID}) {
        playlistCardHtml += "<div class='col'>";
        playlistCardHtml += "<div class='card text-center text-dark bg-light'>";
        playlistCardHtml += "<div class = 'card-header'>";
        playlistCardHtml += `<h3 ='card-title'> ${playlistName} </h3>`;
        playlistCardHtml += "</div>";
        playlistCardHtml += "<div class = 'card-body'>";
        playlistCardHtml += `<button class="btn btn-secondary" data-id=${playlistID}> Edit Playlist </button>`;
        playlistCardHtml += "</div>";
        playlistCardHtml += "</div>";
        playlistCardHtml += "</div>";
    });

    card.innerHTML = playlistCardHtml;
}