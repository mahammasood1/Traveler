'use strict';

var Login = require('../model/loginModel.js');

exports.list_all_login = function(req, res) {
    
    Login.getAllLogin(function(err, login) {

    console.log('controller')
    if (err)
      res.send(err);
      console.log('res', login);
    res.send(login);
  });
};

exports.Check = function(req, res) {
  var Information = new Object();
  Information.UserName = req.params.UserName;
  Information.Pswrd = req.params.Pswrd;
    Login.Approval(Information, function(err, Info) {
      if (err){
        console.log(err);
        res.send(err);
      }
      console.log(Info);
      res.json(Info);
    });
  };

