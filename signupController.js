'use strict';

var SignUp = require('../model/signupModel.js');

exports.read_one_user = function(req, res) {
  SignUp.getUserById(req.params.UserId, function(err, User) {
    if (err){
      console.log("Error" + err);
      res.send(err);
    }

    console.log("No Error");
    res.json(User);
  });
};

exports.delete_a_user = function(req, res) {

  SignUp.remove(req.params.UserId, function(err, user) {
    if (err)
    {
      console.log(err);
      res.send(err);
    }
      res.json({ message: 'User successfully deleted' });
  });
  
};


exports.signing_up = function(req, res) {
  
  //console.log('hi');
  var UserId = req.params.UserId;
  var Pswrd = req.params.Pswrd;
  var s = req.params.Sq;
  var sa = req.params.SA;
  var name = req.params.Name;

  var Sign_Up = new Object();
    Sign_Up.UserId = UserId;
    Sign_Up.Pswrd = Pswrd;
    Sign_Up.s = s;
    Sign_Up.sa = sa;
    Sign_Up.name = name;

  //handles null error 
   if(!UserId || !Pswrd || !s || !sa || !name){

            res.status(400).send({ error:true, message: 'Please provide complete info' });

       }
else{
  
    SignUp.createSignUp(Sign_Up, function(err, result) {
    
    if (err)
      res.send(err);
      res.json(result);
  });
}

};

exports.delete_a_userbyID = function(req, res) {
  SignUp.removeUserbyId(req.params.UserId, function(err, user) {
    
    if (err) {
      console.log(err);
      res.send(err);
    }

    res.json({ message: 'User successfully deleted' });
  });
  
};
