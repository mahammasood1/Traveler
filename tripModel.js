'use strict';
var sql = require('./db.js');

var Trip = function(trip)
{
    this.Trip_Id = trip.Trip_id;
    this.trip_name = trip.trip_name;
    this.Org_id = trip.Org_id;
    this.NoOfSeats = trip.NoOfSeats;
    this.NoOfDays = trip.NoOfDays;
    this.S_id = trip.S_id;
    this.D_id = trip.D_id; 
    this.Descriptions = trip.Descriptions;
    this.BaseCost = trip.BaseCost;
}


Trip.getAllTrips = function getAllTips(result) {
    sql.query("Select * from MakeTrip", function (err, res) {

            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
              console.log('Trips : ', res);  

             result(null, res);
            }
        });   
};

Trip.getTripById = function createSource(TripId, result) {
    sql.query("SELECT * FROM MakeTrip WHERE Trip_id = '" + TripId + "'", function (err, res) {             
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};

Trip.removeTripbyId = function(TripId, result){
    console.log('in delete function');
    sql.query("DELETE FROM MakeTrip WHERE Trip_id = '" + TripId + "'", function (err, res) {

               if(err) {
                   console.log("error: ", err);
                   result(null, err);
               }
               else{
              
                result(null, res);
               }
            });
};

module.exports = Trip;