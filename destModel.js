'user strict';
var sql = require('./db.js');

//Task object constructor
var Destination = function(Destination){
    this.id = Destination.id;
    this.name = Destition.name;
    this.date = Destination.date;
    this.time = Destination.time;
};


Destination.remove = function(dest, result){
     sql.query("DELETE FROM Destinations WHERE D_id = '" + dest.did + "' and DestinationName = '" + dest.dname+"'", function (err, res) {

                if(err) {
                    console.log("error: ", err);
                    result(null, err);
                }
                else{
               
                 result(null, res);
                }
            }); 
};

Destination.getDestinationByName = function getADestination(DestinationName, result) {
    sql.query("select MakeTrip.trip_name, Destinationname from maketrip join destinations on maketrip.D_id = Destinations.D_id where Destinations.DestinationName like '"+DestinationName + "'+'%'", function (err, res) {    
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
          
                result(null, res);
          
            
        });   
};


module.exports = Destination;
