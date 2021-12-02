const express = require('express');
const app = express();
const sess = {
    secret: 'DrumsData',
    cookie: { httpOnly: false, secure: false }
}
const handlebars = require('express-handlebars');
const session = require('express-session');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');
const { add } = require('./helpers/math');
const { stringsEqual } = require('./helpers/stringsEqual');
const { isNullOrWhitespace } = require('./utils/stringHelper');
const { isLoggedIn, sessionGuard } = require('./utils/sessionHelper');

app.use(cors());
app.use(express.json());
app.use(express.static("../Client"));
app.use(express.urlencoded({ extended: false }));
app.use(session(sess));
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts',
    helpers: {
        stringsEqual,
        add
    }
}));
app.set('view engine', 'handlebars');
app.set('views', './views');

app.use(async (request, response, next) => {
    let template = 'index';
    let options = {};
    const db = dbService.getDbServiceInstance();

    switch (request.path) {
        case '/':
            template = 'index';
            break;

        case '/advancedSearch':
            template = 'advancedSearch';
            break;

        case '/artistSearchResults':
            template = 'artistSearchResults';
            if (request.query.artistID === undefined)
                return response.redirect('/');
            const artist = await db.getData(request.query.artistID);
            const songs = await db.searchForSongByArtistID(request.query.artistID)
            if (artist.length === 0)
                return response.redirect('/');
            options.artist = artist[0];
            options.songs = songs;
            break;

        case '/createAccount':
            template = 'createAccount';
            break;

        case '/forgotPassword':
            template = 'forgotPassword';
            break;

        case '/friends':
            template = 'friends';
            if (!isLoggedIn(request.session))
                return response.redirect('/');
            const friends = await db.getUserFriends(request.session.userID);
            options.friends = friends;
            break;

        case '/friendsAdd':
            template = 'friendsAdd';
            break;

        case '/login':
            template = 'login';
            break;

        case '/logout':
            request.session.destroy();
            template = 'logout';
            break;

        case '/searchResults':
            template = 'searchResults';
            break;

        case '/songSearchResult':
            template = 'songSearchResult';
            if (request.query.songID === undefined)
                return response.redirect('/');
            const  artistName = await db.searchForArtistBySong(request.query.songID);
            const song = await db.searchBySongID(request.query.songID); 
            if (artistName.length === 0)
                return response.redirect('/');
            if (song.length === 0)
                return response.redirect('/'); 
            options.artistName = artistName[0].artistName;
            options.song = song[0];
            break;
        default:
            return next();
    }

    options = {
        ...options,
        activePage: template,
        isLoggedIn: request.session && !isNullOrWhitespace(request.session.username),
        username: request.session && request.session.username ? request.session.username : ""
    };
    console.dir(options);
    response.render(template, options);
});

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    //console.log(result);
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})

// update
app.patch('/update', (request, response) => {
    const { id, name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, name);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

app.get('/artist/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})

app.post('/create', (request, response) => {
    const { name, songAmt, pop, mGenre, oGenre, link } = request.body;
    const db = dbService.getDbServiceInstance();
    console.log(JSON.stringify(request.body));
    const result = db.createNewArtist(name, songAmt, pop, mGenre, oGenre, link);


    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
})

app.post('/user/create', (request, response) => {
    const { username, password, email, firstName, lastName, age } = request.body;
    const db = dbService.getDbServiceInstance();

    console.log(JSON.stringify(request.body));
    const result = db.createUserAccount(username, password, email, firstName, lastName, age);


    result
        .then(data => response.json({ success: data }))
        .catch(err => response.status(400).send(err.message));

})

app.post('/user/login', (request, response) => {
    const { email, password } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.getUserByEmailandPassword(email, password);

    result
        .then(data => {
            request.session.username = data.username;
            request.session.userID = data.userID;
            console.dir(request.session)
            response.json({ success: data })
        })
        .catch(err => response.status(400).send(err.message));
})

app.get('/user/currentUser', (request, response) => {
    const { username } = request.session;
    const db = dbService.getDbServiceInstance();
    console.dir(request.session);

    if (!username)
        return response.json(false);

    const result = db.getUserByUsername(username);

    result
        .then(data => {
            console.log(data);
            response.json(data);
        })
        .catch(err => response.status(400).send(err.message));
})

app.post('/user/passwordReset', (request, response) => {
    const { email, password } = request.body;
    const db = dbService.getDbServiceInstance();

    console.log(JSON.stringify(request.body));
    const result = db.resetUserPassword(email, password);

    result
        .then(data => response.json({ success: data }))
        .catch(err => response.status(400).send(err.message));
})

app.get('/genre/search/:genre', (request, response) => {
    const { genre } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByGenre(genre);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})

app.get('/song/search/:song', (request, response) => {
    const { song } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchBySong(song);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})

app.get('/lyric/search/:lyrics', (request, response) => {
    const { lyrics } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByLyrics(lyrics);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})

app.get('/advanced/search', (request, response) => {
    const db = dbService.getDbServiceInstance();
    const result = db.advancedSearch(request.query);
    console.dir(request.query);
    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})

// app.get('/user/friends', (request, response) => {
//     const {username} = request.params; 
//     const db = dbService.getDbServiceInstance(); 

//     const result = db.getUserFriends(); 

//     result 
//     .then(data => response.json({data : data}))
//     .catch(err => console.log(err)); 
// })

app.post('/user/addFriend', (request, response) => {
    if (!sessionGuard(request, response)) {
        return;
    }

    const { friendUserId } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.addUserFriend(request.session.userID, friendUserId);

    result
        .then(data => response.json(data))
        .catch(err => console.log(err));
})

app.get('/user/search/:user', (request, response) => {
    if (!sessionGuard(request, response)) {
        return;
    }

    const { user: otherUsername } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByUser(request.session.userID, otherUsername);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
})

// delete
app.delete('/user/delete/:friendUserId', (request, response) => {
    if (!sessionGuard(request, response)) {
        return;
    }

    const { friendUserId } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.removeUserFriend(request.session.userID, friendUserId);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});


app.listen(process.env.PORT, () => console.log('app is running'));
