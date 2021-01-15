const mysql = require('mysql');
require('dotenv').config();

const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_SQL,
    password: process.env.PASSWORD,
    db:process.env.DB,
    multipleStatements: true
});

const queryString = "CREATE DATABASE form_db; USE form_db; CREATE TABLE form_table (id INT NOT NULL AUTO_INCREMENT,name VARCHAR(255) NOT NULL, age INT NOT NULL,gender VARCHAR(255) NOT NULL,email VARCHAR(320) NOT NULL,state VARCHAR(255) NOT NULL,PRIMARY KEY (id));"

connection.query(queryString,(err,rows,fields)=>{
    if (err){
        console.error(err);
    } else{
        console.log("Database created with the name:form_db and table name: form_table ");
    }
    
});

connection.end();

