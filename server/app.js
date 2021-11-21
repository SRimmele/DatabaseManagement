const express = require('express');
const app = express();
const sess = {
    secret: 'DrumsData', 
    cookie: {httpOnly: false, secure: false}
}
const session = require('express-session'); 
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const dbService = require('./dbService');
const { response, request } = require('express');

app.use(cors());
app.use(express.json());
app.use(express.static("../Client")); 
app.use(express.urlencoded({ extended : false }));
app.use(session(sess)); 

// read
app.get('/getAll', (request, response) => {
    const db = dbService.getDbServiceInstance();

    const result = db.getAllData();
    //console.log(result);
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

// update
app.patch('/update', (request, response) => {
    const { id, name } = request.body;
    const db = dbService.getDbServiceInstance();

    const result = db.updateNameById(id, name);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

// delete
app.delete('/delete/:id', (request, response) => {
    const { id } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.deleteRowById(id);
    
    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
});

app.get('/search/:name', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.post('/create', (request, response)=> {
    const{name, songAmt, pop, mGenre, oGenre, link} = request.body; 
    const db = dbService.getDbServiceInstance(); 
    console.log(JSON.stringify(request.body)); 
    const result = db.createNewArtist(name, songAmt, pop, mGenre, oGenre, link); 
    

    result
    .then(data => response.json({success : data}))
    .catch(err => console.log(err));
})

app.post('/user/create', (request, response) => {
    const {username, password, email, firstName, lastName, age} = request.body; 
    const db = dbService.getDbServiceInstance(); 

    console.log(JSON.stringify(request.body)); 
    const result = db.createUserAccount(username, password, email, firstName, lastName, age); 
    

    result
    .then(data => response.json({success : data}))
    .catch(err => response.status(400).send(err.message));

})

app.post('/user/login', (request, response) => {
    const {email, password} = request.body; 
    const db = dbService.getDbServiceInstance(); 

    const result = db.getUserByEmailandPassword(email, password); 

    result
    .then(data => {
        console.dir(data); 
        request.session.username = data.username; 
        console.dir(request.session)
        response.json({success : data})
    })
    .catch(err => response.status(400).send(err.message));
})

app.get('/user/currentUser', (request, response) => {
    const{username} = request.session; 
    const db = dbService.getDbServiceInstance(); 
    console.dir(request.session); 

    if(!username)
        return response.json(false); 
    
    const result = db.getUserByUsername(username);

    result
    .then(data => {
        console.log(data); 
        response.json(data);
    })
    .catch(err => response.status(400).send(err.message)); 
})

app.get('/user/logout', (request, response) => {
    request.session.destroy(); 
    response.send(); 
})


app.get('/artist/search', (request, response) => {
    const { name } = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByName(name);
    
    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.get('/genre/search', (request, response) => {
    const {mGenre, oGenre} = request.params;
    const db = dbService.getDbServiceInstance();

    const result = db.searchByGenre(mGenre, oGenre);
    console.log(result); 

    result
    .then(data => response.json({data : data}))
    .catch(err => console.log(err));
})

app.listen(process.env.PORT, () => console.log('app is running'));
