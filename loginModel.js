'use strict';
var sql = require('./db.js');

var Login = function(login){
    this.UserId = login.UserId,
    this.Pswrd = login.Pswrd

}

Login.getAllLogin = function getAllLogin(result) {
    sql.query("Select * from Login", function (err, res) {

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

Login.createLogin = function createLogin(login, result) {    
    sql.query("INSERT INTO Login(UserId, Pswrd) VALUES ('"+ login.UserId+"','"+ login.Pswrd+"')", function (err, res) {
            
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


Login.Approval = function CheckApproval(Information, result) {
    
    
    sql.query("declare @out varchar(50) if exists(select * from SignIn where SignIn.UserId = '" + Information.UserName + "' and SignIn.Pswrd = '" + Information.Pswrd + "') begin	set @out = 'Let him in' end else begin set @out = 'Incorrect credentials' end select @out", function (err, res) {    
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
          
            }
        });   
};


module.exports = Login;