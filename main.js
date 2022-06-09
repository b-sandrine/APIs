var http = require("http");
var express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");

var app = express();

var connection = mysql.createConnection({
    host: "localhost",
    port: "3306",
    user: "root",
    password: "Root@1234",
    database: "api"
});

connection.connect();

// connection.connect(function(err) {
//     if(err) {
//         console.error("Error connecting: " + err.stack);
//     }
//     console.log("You are now connected ... Connected as " + connection.threadId);
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get("/employees", function(req,res) {
    // console.log(req);
    connection.query("select * from users", function(error,results,fields) {
        if(error) throw error;
        // res.end(JSON.stringify(results));
        return res.send({error: false, data: results, message: "Data retrieves successufully"})
    });
});

app.get("/employees/:id", function (req,res) {
    connection.query("select * from users where id = " + req.params.id, function(error,results,fields) {
        if(error) throw error;
        res.send(JSON.stringify(results))
    });
});

app.post("/employees", function (req,res) {
    
    const name = req.body.name;
    const email = req.body.email;
    
    connection.query("Insert into users (name,email) values ('"+name+ "','"+email+"')",
    function(error,results,fields) {
        if(error) throw error;
        return res.send({error: false, data: results, message: "Successfully created user with id "})
    });
});


app.put("/employees/:id", (req,res) => {
    const id  = req.params.id;
    const name = req.body.name;
    const email = req.body.email;
    console.log(email);
    connection.query("UPDATE users SET name = '"+ name + "', email = '"+email+"' WHERE id = ' "+id + "'", function(error,results, field) {
        if(error) throw error;
        res.send(JSON.stringify(results));
    })
})

app.delete("/employees/:id", function(req,res) {
    connection.query("Delete from users where id = " + req.params.id, function(error,results,fields) {
        if(error) throw error;
        res.send(JSON.stringify(results));
        console.log(fields)
    })
})

var server = app.listen(5000, "localhost", function(){
    var host = server.address().address
    var port = server.address().port

    console.log("App is listening at http://%s:%s/employees", host,port)
});
