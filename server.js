/*
//Initiallising node modules
var express = require("express");
var bodyParser = require("body-parser");
var sql = require("mssql");
var app = express(); 

// Body Parser Middleware
app.use(bodyParser.json()); 

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType,Content-Type, Accept, Authorization");
    next();
});

//Setting up server
 var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
 });

//Initiallising connection string
var dbConfig = {
    server : "localhost\\SQLEXPRESS",
    database : "Testing",
    user: "traveler",
    password: "123"
};

//Function to connect to database and execute query
var  executeQuery = function(res, query){             
    sql.connect(dbConfig, function (err) {
        if (err) {   
                    console.log("Error while connecting database :- " + err);
                    res.send(err);
                 }
                 else {
                        // create Request object
                        console.log("connected");
                        var request = new sql.Request();
                        // query to the database
                        request.query(query, function (err, result) {
                          if (err) {
                                     console.log("Error while querying database :- " + err);
                                     res.send(err);
                                    }
                                    else {
                                       res.send(result);
                                           }
                              });
                      }

                      
     });           
}


//GET API
app.get("/api/user", function(req , res){
                var query = "select * from Sources";
                executeQuery(res, query);
});


//POST API
 app.post("/api/createsrc", function(req , res){
                
    console.log("hi");
                var userid = "Farwa";
                var name = "Farwa";
                var sec = "Favourite Pet?";
                var ans = "Cat";

                var query = "INSERT INTO SignUp VALUES ('"+userid+"','"+ sec +"','"+ans+"','" +name+"')";
                console.log("hi");
                executeQuery (res, query);
});
/*
//PUT API
 app.put("/api/user/:id", function(req , res){
                var query = "UPDATE [user] SET Name= " + req.body.Name  +  " , Email=  " + req.body.Email + "  WHERE Id= " + req.params.id;
                executeQuery (res, query);
});*/

//DELETE API
 /*app.delete("/api/user/:3", function(req , res){
                var query = "DELETE FROM Organizer WHERE Org_id=" + req.params.id;
                executeQuery (res, query);
});
*/
console.log("Server.js has been executed");
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser');
  port = process.env.PORT || 8000;

  var dbConfig = {
    server : "localhost\\SQLEXPRESS",
    database : "Testing",
    user: "traveler",
    password: "123"
};
console.log("express.js has been executed");

const mssql = require('mssql');

async()=>{
    try{
        await mssql.connect(dbConfig);
        //const result = await mssql.query`select * from Sources`;
        //console.dir(result);
    }
    catch(err){
        console.log("Error has been found");
    }
}
/*

var  executeQuery = function(res, query){             
    sql.connect(dbConfig, function (err) {
        if (err) {   
                    console.log("Error while connecting database :- " + err);
                    res.send(err);
                 }
                 else {
                        // create Request object
                        var request = new sql.Request();
                        // query to the database
                        request.query(query, function (err, res) {
                          if (err) {
                                     console.log("Error while querying database :- " + err);
                                     res.send(err);
                                    }
                                    else {
                                      res.send(res);
                                           }
                              });
                      }
     });           
}


/*
mssql.connect(dbConfig, function (err) {
    console.log("Executing");
    if (err) {   
                console.log("Error while connecting database :- " + err);
                res.send(err);
             }
     else
    {
        console.log("DB has been connected");
    }
            });
console.log("mssql.connect has been executed");
/*mssql.connect({
    host: "localhost\\SQLEXPRESS",
    user: 'traveler',
    password: '123',
    database: 'Testing'
});*/
 
// connect to database
//mc.connect();

app.listen(port);

console.log('API server started on: ' + port);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./routes/approutes'); //importing route
routes(app); //register the route

//module.exports = executeQuery;
