const mysql = require('mysql');
const dotenv = require('dotenv');
let instance = null;
dotenv.config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: process.env.DB_PORT
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
});

const Arrayify = (value) => Array.isArray(value) ? value : [value]
const popularityTable = {
        zeroToTen : [0, 10], 
        tenToTwentyFive: [10.1, 25], 
        twentyFiveToFifty: [25.1, 50], 
        fiftyToSeventyFive: [50.1, 75], 
        seventyFiveandUp: [75.1, 10000]
}; 

const categoryTable = {
    artistCategory : 'a.artistName', 
    songCategory: 's.songName', 
    lyricCategory: 's.lyrics'
}; 
class DbService {
    static getDbServiceInstance() {
        return instance ? instance : new DbService();
    }

    //Working with the Artist Table
    async getAllData() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM artist;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            //console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getData(id) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM artist WHERE artistID = ?;";

                connection.query(query, [id], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            //console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }


    async insertNewName(name) {
        try {
                const insertId = await new Promise((resolve, reject) => {
                const query = "INSERT INTO artist (artistName) VALUES (?);";

                connection.query(query, [name] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    //console.log(result); 
                    resolve(result.insertId);
                })
            });
            //console.log(insertId);
            const data = await this.getData(insertId);  
            //console.log(data); 
            return data; 
        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM artist WHERE artistID = ?";
    
                connection.query(query, [id] , (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async updateNameById(id, name) {
        try {
            id = parseInt(id, 10); 
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE artist SET artistName = ? WHERE artistID = ?";
    
                connection.query(query, [name, id] , (err, result) => {
                    if (err) reject(console.error(err));
                    console.log(query)
                    console.log(JSON.stringify(result)); 
                    resolve(result.affectedRows);
                })
            });
    
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    async searchByName(name) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM artist WHERE artistName LIKE CONCAT('%', ?, '%');";

                connection.query(query, [name], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }; 

    async searchByGenre(mGenre, oGenre) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM artist WHERE mainGenreID LIKE CONCAT('%', ?, '%') OR otherGenreID LIKE CONCAT('%', ?, '%') ORDER BY popularity DESC";

                connection.query(query, [mGenre, oGenre], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }; 

    async searchBySong(song) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM artist, song WHERE songName LIKE CONCAT('%', ?, '%') AND song.artistlink = artist.link ORDER BY songName;";

                connection.query(query, [song], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }; 

    async searchByLyrics(lyrics) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM artist, song WHERE songName LIKE CONCAT('%', ?, '%') AND song.artistlink = artist.link ORDER BY songName;";

                connection.query(query, [lyrics], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }; 

    async searchByUser(user) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM users WHERE username LIKE CONCAT('%', ?, '%') ORDER BY username;";

                connection.query(query, [user], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }; 

    async createNewArtist(name, songAmt, pop, mGenre, oGenre, link){
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO `artist`(`artistName`, `songAmt`, `popularity`, `link`, `mainGenreID`, `otherGenreID`) VALUES (?, ?, ?, ?, ?, ?)";

                connection.query(query, [name, songAmt, pop, link, mGenre, oGenre], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }; 

    async createUserAccount(username, password, email, firstName, lastName, age){
        if(await this.usernameExists(username)){
            throw new Error("That username is already taken!"); 
        }
        if(await this.emailExists(email)){
            throw new Error("That email is already in use!"); 
        }
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO `users`(`username`, `password`, `email`, `firstName`, `lastName`, `age`) VALUES (?, ?, ?, ?, ?, ?)";

                connection.query(query, [username, password, email, firstName, lastName, age], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }; 

    async getUserByUsername(username){
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM `users` WHERE (`username` = ?);"
                connection.query(query, [username], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }
    }

    async getUserByEmail(email){
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM `users` WHERE (`email` = ?);"
                connection.query(query, [email], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });

            return response;
        } catch (error) {
            console.log(error);
        }

    }

    async resetUserPassword(email, password){
        if(await this.emailExists(email)){
            try{
                const response = await new Promise((resolve, reject) => {
                    const query = "UPDATE users SET password = ? WHERE email = ?;"; 
                    connection.query(query, [password, email], (err, results) => {
                        if(err) reject(new Error(err.message)); 
                        resolve(results); 
                    })
                }); 
            }catch(error){
                console.log(error); 
            }
        }
        else
            throw new Error('User not found')
    }

    async usernameExists(username){
        const result = await this.getUserByUsername(username); 
        console.log(JSON.stringify(result)); 
        return result.length !== 0; 
    }

    async emailExists(email){
        const result = await this.getUserByEmail(email); 
        console.log(JSON.stringify(result)); 
        return result.length !== 0; 
    }

    async getUserByEmailandPassword(email, password){
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM `users` WHERE `email` = ? AND password = ?;"
                connection.query(query, [email, password], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                })
            });
            console.log(JSON.stringify(response)); 
            if(response.length === 0)
                throw new Error('User not found.'); 
            else 
                return response[0]; 
    } 

    async advancedSearch(queryParams){
        const response = await new Promise((resolve, reject) => {
            let query = `SELECT s.songName, s.link as songLink, a.artistName, a.link as artistLink 
                            FROM song as s JOIN artist as a
                            WHERE s.artistLink = a.link`;  
            const popularity = ` AND a.popularity BETWEEN ${popularityTable[queryParams.popularity][0]} AND ${popularityTable[queryParams.popularity][1]} `
            const artists = Arrayify(queryParams.artist).map(artist => ` a.artistName = '${artist}'`).join(` OR `) ; 
            const genres = Arrayify(queryParams.genre).map(genre => ` a.mainGenreID LIKE '%${genre}%'`).join(` OR `) ; 
            const otherGenres = Arrayify(queryParams.genre).map(genre => ` a.otherGenreID LIKE '%${genre}%'`).join(` OR `); 
            const lyric = Arrayify(queryParams.lyrics).map(lyrics => ` s.lyrics LIKE '%${lyrics}%'`).join(` OR `) ; 
            const allGenres = [];
            const categorySearch = Arrayify(queryParams.categories).map(category => ` ${categoryTable[category]} LIKE '%${queryParams.advancedSearchText || ""}%' `).join(` OR `); 
            if(queryParams.genre && genres.length > 0)
                allGenres.push(genres); 
            if(queryParams.genre && otherGenres.length > 0)
                allGenres.push(otherGenres);  
            query += popularity; 
            if (queryParams.artist && artists.length > 0)
                query += ` AND (` + `${artists})`; 
            if(allGenres.length > 0)
                query += ` AND (` + `${allGenres.join(` OR `)})`; 
            if(queryParams.lyrics && lyric.length > 0)
                query += ` AND (` + `${lyric})`;
            if(queryParams.categories && categorySearch.length > 1 && queryParams.advancedSearchText)
                query += ` AND (` + `${categorySearch})`; 
            query += ` LIMIT 1000`; 
            
            console.log(query); 
            

            connection.query(query, [], (err, results) => {
                if (err) reject(new Error(err.message)); 
                resolve(results); 
            })
            
        })
        return response; 
    }


    async getUserFriends(username){
        const response = await new Promise((resolve, reject) => {
            const query = "SELECT username FROM friends, users WHERE connectedToID = users.userID AND friends.userID = ?;"; 
            connection.query(query, [username], (err, results) => {
                if (err) reject(new Error(err.message)); 
                resolve(results); 
            })
            if(response.length == 0)
                throw new Error("Oh, no! You dont't have any friends!"); 
            else
                return response[0];  
        })
    }

    // async getFriendsRecents(){
    //     const response = await new Promise((resolve, reject) => {
    //         const query = ""; 
    //         connection.query(query, [songName], (err, results) => {
    //             if(err) reject(new Error(err.message)); 
    //             resolve(results); 
    //         })

    //         if(response.length == 0)
    //             throw new Error('Hmm... Seems they have been pretty quiet lately.'); 
    //         else 
    //             return response[0]; 
    //     })
    // }


}

module.exports = DbService;