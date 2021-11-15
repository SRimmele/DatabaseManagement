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
    // console.log('db ' + connection.state);
});


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


}

module.exports = DbService;