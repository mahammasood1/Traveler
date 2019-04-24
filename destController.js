'use strict';

var Destinations = require('../model/destModel.js');

/*
exports.list_all_sources = function(req, res) {
    
  console.log('controller');
    Source.getAllSources(function(err, source) {

    console.log('controller');
    if (err)
      res.send(err);
      console.log('res', source);
    res.send(source);
  });
};

exports.read_Sources = function(req, res) {
  Source.getSourceByName(req.params.sourceName, function(err, Source) {
      if (err){
        console.log(err);
        res.send(err);
      }
     // console.log("Error hi nahi aaya");
      res.json(Source);
    });
  };


exports.create_a_source = function(req, res) {
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


exports.read_a_source = function(req, res) {
  Source.getSourceById(req.params.sourceId, function(err, source) {
    if (err){
      console.log("Chal tu raha hun main");
      res.send(err);
    }
    console.log("Error hi nahi aaya");
    res.json(source);
  });
};


exports.update_a_src = function(req, res) {
  Source.updateById(req.params.sourceId, new Source(req.body), function(err, source) {
    if (err)
      res.send(err);
    res.json(source);
  });
};
*/

exports.delete_a_dest = function(req, res) {

  var destobj = new Object();
  destobj.did = req.params.destID;
  destobj.dname = req.params.destName;

  Destinations.remove(destobj, function(err, task) {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
      res.json({ message: 'Destination successfully deleted' });
  });
  
};

exports.read_Destinations = function(req, res) {
    Destinations.getDestinationByName(req.params.DestinationName, function(err, Destination) {
      if (err){
        console.log(err);
        res.send(err);
      }
  
      res.json(Destination);
    });
  };
