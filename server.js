const path = require("path");
require("dotenv").config()
const mysql = require("mysql")
const express = require("express");
const fs = require("fs");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended:true }));
app.use(express.json());
app.use(express.static("public"));


const connection = mysql.createConnection({
    host: process.env.HOST,
    port: 3306,
    user: process.env.USER,
    password: process.env.PASS,
    database: process.env.DB
})

connection.connect((err) => {
    if (err) throw err
    console.log("Connected")
})

app.get("/", (req, res) => {
    console.log("Test")
    
})

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`)
})