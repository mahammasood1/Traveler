'user strict';
var sql = require('./db.js');

//Task object constructor
var Source = function(source){
    this.sname = source.SourceName;
    this.sbudget = task.SourceBudget;
    this.sDate = new Date();
    //this.sTime = 
};


Source.createSource = function createSource(newSource, result) {    
        sql.query("INSERT INTO Sources set ?", newSource, function (err, res) {
                
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    console.log(res.insertId);
                    result(null, res.insertId);
                }
            });           
};


Source.getSourceById = function createSource(sourceId, result) {
        sql.query("SELECT * FROM Sources WHERE S_id = '" + sourceId + "'", function (err, res) {             
                if(err) {
                    console.log("error: ", err);
                    result(err, null);
                }
                else{
                    result(null, res);
              
                }
            });   
};

Source.getSourceByName = function getASource(sourceName, result) {
    sql.query("select MakeTrip.trip_name, SourceName from maketrip join sources on maketrip.S_id = sources.S_id where sources.SourceName like '" + sourceName + "' + '%'", function (err, res) {    
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};

Source.getAllSources = function getAllSources(result) {
        sql.query("Select * from Sources", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
                  console.log('sources : ', res);  

                 result(null, res);
                }
            });   
};

Source.updateById = function(id, source, result){
  sql.query("UPDATE Sources SET source = ? WHERE S_id = ?", id, function (err, res) {
          if(err) {
              console.log("error: ", err);
                result(null, err);
             }
           else{   
             result(null, res);
                }
            }); 
};

Source.remove = function(source, result){
     sql.query("DELETE FROM Sources WHERE S_id = '" + source.sid + "' and SourceName = '" + source.sname+"'", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};



module.exports = Source;
