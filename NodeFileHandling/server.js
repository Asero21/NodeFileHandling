const express = require('express');
const app = express();
const bodyparser = require("body-parser")
const session = require("express-session")
const {v4:uuidv4} = require("uuid")
var fs = require("fs")
const router = require('./router');
const port = 3000;
var dataBase = './shared/database.txt';

//const port = process.env.PORT||3000;

app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(express.json());       
app.use(express.urlencoded({extended: true})); 

app.use(session({
    secret: uuidv4(),
    resave: false,
    saveUninitialized: true
}))

app.set('view engine', 'ejs')


app.get('/userdata', (req, res)=> {
        res.render('userdata')
})

const credential = {
    Username : "admin",
    Password : "123456",
}

app.post('/login', (req, res)=>{
    if(req.body.Username == credential.Username && req.body.Password == credential.Password){
        req.session.user = req.body.Username;
        res.redirect("/userdata")
    }else{
        res.end("Invalid Username or Password")
    }
})

app.post('/userdata', (req, res) => {
    let Fname = req.body.Fname;
    let Lname = req.body.Lname;
    let address = req.body.address;
    let age = req.body.age;
    let email = req.body.email;
    let allData = Fname + Lname + address + age + email;

    fs.writeFile(dataBase, allData ,function (err) {
        if (err) throw err;
        console.log('Saved!');
        res.send("Data Collected!")
    });
})

app.listen(3000);
console.log("Running on port " + port);

//app.listen(port, ()=>{console.log('Listening on port 3000')})

// app.get('/read', (req, res)=>{
//     fs.readFile('shared/sample.txt', function(err, data){
//         res.writeHead(200, {'Content-type': 'text/html'});
//         res.write('<p>'+data+'<p>');
//         res.end();
//     })
// })

// app.get("/", (req, res) => {
//     res.sendFile(__dirname + "/userdata.ejs");
//   });

//   app.get("/", (req, res)=>{
//     res.sendFile(__dirname + "/shared/database.txt");
// })

// app.get('/', (req, res) => {
//     res.render('base', { title : "Login System"})
// })

