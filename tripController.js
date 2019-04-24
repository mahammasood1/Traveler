'use strict';

var Trip = require('../model/tripModel.js');

exports.list_all_trips = function(req, res) {
  
    Trip.getAllTrips(function(err, trips) {

    if (err)
      res.send(err);
   
    res.send(trips);
  });
};

/*

exports.create_a_trip = function(req, res) {
  var new_source = new Source(req.body);

  //handles null error 
   if(!new_source.SourceName || !new_task.S_id){

            res.status(400).send({ error:true, message: 'Please provide complete info' });

        }
else{
  
  Source.createSource(new_source, function(err, source) {
    
    if (err)
      res.send(err);
    res.json(source);
  });
}
};
*/


  exports.read_a_trip = function(req, res) {
    Trip.getTripById(req.params.tripId, function(err, trip) {
      if (err){
        console.log(err);
        res.send(err);
      }
    // console.log("Error hi nahi aaya");
      res.json(trip);
    });
  };

/*
exports.update_a_src = function(req, res) {
  Source.updateById(req.params.sourceId, new Source(req.body), function(err, source) {
    if (err)
      res.send(err);
    res.json(source);
  });
};

*/
exports.delete_a_trip = function(req, res) {

  console.log('inside trip controller');
  Trip.removeTripbyId(req.params.tripId, function(err, trip) {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
      res.json({ message: 'Trip successfully deleted' });
  });
  
};
