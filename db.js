'use strict';

var mssql = require('mssql');
mssql.close();
//local mssql db connection

var dbConfig = {
    server : "localhost\\SQLEXPRESS",
    database : "Testing",
    user: "traveler",
    password: "123"
};



const connection = mssql.connect(dbConfig, function (err) {
    if (err) {   
                console.log("Error while connecting database :- " + err);
                res.send(err);
             }
            });

//connection.connect(function(err) {
  //  if (err) throw err;
//});

module.exports = connection;