const MongoClient = require("mongodb").MongoClient;
const ObjectID = require('mongodb').ObjectId;
const DBNAME = "spiritdata";

//Define the Database URL
const dbURL = process.env.DB_URL || "mongodb://localhost";


//check and input sign up info
var services = function(app){
    app.post('/write-login', function(req, res){
        var data = {
            username: req.body.username, 
            password: req.body.password,
        };

        MongoClient.connect(dbURL, { useUnifiedTopology: true}, function(err, client) {
            if(err){
                return res.status(201).send(JSON.stringify({msg: "Error" + err}));
            } else{
                //Create database object
                var dbo = client.db(DBNAME);

                dbo.collection("loginData").findOne({username: data.username,}, function(err, result){
                if(result){
                    //If username already exists send invalid
                    client.close();
                    return res.status(200).send(JSON.stringify({msg: "Invalid"}));
                } else{
                     //Insert the login data
                    dbo.collection("loginData").insertOne(data, function(err){
                    if(err){
                        client.close();
                        return res.status(500).send(JSON.stringify({msg: "Error" + err}));
                    } else{
                        client.close();
                        return res.status(200).send(JSON.stringify({msg: "SUCCESS"}))
                    }
                 }); 
                }    
            });
          }
        });
    });
    //check login
    app.post('/read-login', function(req, res){
        var data = {
            username: req.body.username, 
            password: req.body.password,
        };
        MongoClient.connect(dbURL, { useUnifiedTopology: true}, function(err, client) {
            if(err){
                return res.status(201).send(JSON.stringify({msg: "Error" + err}));
            } else{
                //Create database object
                var dbo = client.db(DBNAME);

                //Check if login exists and perform action
                dbo.collection("loginData").findOne({username: data.username, password: data.password,}, function(err, result){
                    

                    if (result){
                        client.close();
                        return res.status(200).send(JSON.stringify({ msg: "Login successful" }));
                    }

                    else{
                        if(err){
                            client.close();
                            return res.status(500).send(JSON.stringify({msg: "Error" + err}));
                        } else{
                            client.close();
                            return res.status(200).send(JSON.stringify({ msg: "Login unsuccessful" }));
                        }

                    }
                   
                });

               
              
            }
        });
    });
}

module.exports = services;