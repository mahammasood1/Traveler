'use strict';

var Source = require('../model/sourceModel.js');

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


exports.delete_a_source = function(req, res) {

  var sourceobj = new Object();
  sourceobj.sid = req.params.sourceID;
  sourceobj.sname = req.params.sourceName;

  Source.remove(sourceobj, function(err, task) {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
      res.json({ message: 'Source successfully deleted' });
  });
  
};
