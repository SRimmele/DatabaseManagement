function loadFriends(data) {
    const card = document.querySelector('card');

    let friendCardHtml = "";

    if (data.length === 0) {
        friendCardHtml += "<div class = 'col'>";
        friendCardHtml += "<div class='card text-center text-dark bg-light'>";
        friendCardHtml += "<div class = 'card-header'>";
        friendCardHtml += "<h3 ='card-title'> Sorry! </h3>";
        friendCardHtml += "</div>";
        friendCardHtml += "<div class = 'card-body'>"; 
        friendCardHtml += "Looks like you don't have any friends yet!";
        friendCardHtml += "</div>";
        friendCardHtml += "</div>";
        friendCardHtml += "</div>";

        friendCardHtml.innerHTML = friendCardHtml;

        return;
    }

    data.forEach(function ({friendID, friendUsername, recentSong1, recentSong2, recentSong3, recentSong4, recentSong5}) {
        friendCardHtml += "<div class='col'>";
        friendCardHtml += "<div class='card text-center text-dark bg-light'>";
        friendCardHtml += "<div class = 'card-header'>";
        friendCardHtml += `<h3 ='card-title'> ${friendUsername} </h3>`;
        friendCardHtml += "</div>";
        friendCardHtml += "<div class = 'card-body'>"; 
        friendCardHtml += "<ul class = 'list-group list-group-flush'>";
        friendCardHtml += `<li class = 'list-group-item'>${recentSong1}</li>`; 
        friendCardHtml += `<li class = 'list-group-item'>${recentSong2}</li>`; 
        friendCardHtml += `<li class = 'list-group-item'>${recentSong3}</li>`;
        friendCardHtml += `<li class = 'list-group-item'>${recentSong4}</li>`;
        friendCardHtml += `<li class = 'list-group-item'>${recentSong5}</li>`;
        friendCardHtml += "</ul>";
        friendCardHtml += "</div>";
        friendCardHtml += "<div class = 'card-footer'>";
        friendCardHtml += `<button class="btn btn-secondary delete-row-btn" data-id=${friendID}>Delete`;
        friendCardHtml += "</div>";
        friendCardHtml += "</div>";
        friendCardHtml += "</div>";
    });

    friendCardHtml.innerHTML = friendCardHtml;
}
