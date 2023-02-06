var express = require("express");
var router = express.Router();
var fs = require('fs');
var dataBase = './shared/database.txt';

const credential = {
    Username : "admin",
    Password : "123456",
}

router.post('/login', (req, res)=>{
    if(req.body.Username == credential.Username && req.body.Password == credential.Password){
        req.session.user = req.body.Username;
        res.redirect("/userdata")
    }else{
        res.end("Invalid Username or Password")
    }
})

module.exports = router;

//router.post("/userdata", (req, res) => {
    //     const allData = req.body.datacollection;
    //     res.send("Data Collected!")
    // });
    // fs.writeFile('mynewfile3.txt', 'Hello content!', function (err) {
    //     if (err) throw err;
    //     console.log('Saved!');


