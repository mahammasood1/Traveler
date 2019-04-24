
'user strict';
var sql = require('./db.js');

var SignUp = function(signup){
    this.UserId = signup.UserId,
    this.Security_Question = signup.Security_Question,
    this.Security_Answer = signup.Security_Answer,
    this.Name = signup.Name
};



SignUp.getUserById = function getUser(UserId, result) {
    sql.query("SELECT * FROM SignUp WHERE UserId = '" + UserId + "'", function (err, res) {             
            if(err) {
                console.log("Error: ", err);
                result(err, null);
            }

            else{
                console.log('user found');
                result(null, res);
          
            }
        });   
};

SignUp.remove = function(UserId, result){
    sql.query("DELETE FROM SignUp WHERE UserId = '" + UserId + "'", function (err, res) {

               if(err) {
                   console.log("Error: ", err);
                   result(null, err);
               }
               else{
              
                result(null, res);
               }
           }); 
};

SignUp.createSignUp = function createSignup(signup, result) {    

    console.log("Yeeeyyyy");
    var name = signup.Name;
    var userid = signup.UserId;
    var pasword = signup.Pswrd;
    var se = signup.s;
    var ans = signup.SA;
    var query = "INSERT INTO [SignUp] (UserId,Security_Question,Security_Answer, Name) VALUES (userid, se, ans, name)";
                ms.executeQuery (result, query);
                //ms.executeQuery
                
    // var MYQuery = "declare @out varchar(50) exec SigningUp '"+"Chowri"+"','"+"Pakistan"+"','"+"Favourite pet"+"','"+"Cat"+"','"+"Hassan"+"',@out output select @out"
    // sql.connection.query(MYQuery, function (err, result) {
    //     if (err) {
    //         console.log("err:", err);
    //     } else {
    //         console.log("results:", result);
    //     }
    
    // });
    console.log("DONEEEEE");
};


SignUp.removeUserbyId = function(UserId, result) {
    sql.query("DELETE FROM SignUp WHERE UserId = '" + UserId + "'", function (err, res) {

                if(err) {
                    console.log("Error: ", err);
                    result(null, err);
                }

                else {
                    result(null, res);
                }
    });
};

module.exports = SignUp;