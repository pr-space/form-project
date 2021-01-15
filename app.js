const express = require("express");
const bodyParser = require("body-parser");
const urlEncodedBodyParser = bodyParser.urlencoded({ extended: false });
const mysql = require("mysql");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 7000;

app.listen(port, function () {
  console.log(`server running on ${port}`);
});

app.use(express.static("./public"));

app.post(
  "/thankYou.html",
  urlEncodedBodyParser,
  (req, res, next) => {
    res.sendFile(__dirname + "/public/views/thankYou.html");
    next();
  },
  (req, res) => {
    const name = req.body.name;
    const age = req.body.age;
    const gender = req.body.gender;
    const email = req.body.email;
    const state = req.body.state;

    const connection = mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER_SQL,
      password: process.env.PASSWORD,
      db: process.env.DB,
      multipleStatements: true,
    });

    const queryString =
      "USE form_db; INSERT INTO form_table (name,age,gender,email,state) VALUES (?,?,?,?,?)";

    connection.query(
      queryString,
      [name, age, gender, email, state],
      (err, rows, fields) => {
        if (err) {
          console.error(err);
        } else {
          console.log("user added");
        }
      }
    );

    connection.end();
  }
);



app.get("./views/results.html", (req, res) => {
  const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_SQL,
    password: process.env.PASSWORD,
    db: process.env.DB,
    multipleStatements: true,
  });

  const queryString = "USE form_db; SELECT * FROM form_table";

  connection.query(queryString, (err, rows, fields) => {
    if (err) {
      console.error(err);
    } else {
      res.json(rows);
    }
  });

  connection.end();
});

app.get("/survey-results", (req, res) => {
  const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_SQL,
    password: process.env.PASSWORD,
    db: process.env.DB,
    multipleStatements: true,
  });

  const queryString = "USE form_db; SELECT * FROM form_table";

  connection.query(queryString, (err, rows, fields) => {
    console.log("fetched data! success!");
    if (err) {
      console.error(err);
    } else {
      res.json(rows.slice(1)[0]);
    }
  });

  connection.end();
});

app.get("/survey-results-sorted", (req, res) => {
  const connection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER_SQL,
    password: process.env.PASSWORD,
    db: process.env.DB,
    multipleStatements: true,
  });

  const fields = ["id","name","age","gender","email","state"]
  let result = {};

  fields.map((field)=>{
    const queryString = "USE form_db; SELECT * FROM form_table ORDER BY ?";

    connection.query(queryString, [field] , (err, rows, fields) => {
      console.log("fetched data! success!");
      if (err) {
        console.error(err);
      } else {

        let sortedRows = rows.slice(1);
        result[field] = sortedRows;
      }
    });


  });

  res.json(result);

  

  

  connection.end();
});
