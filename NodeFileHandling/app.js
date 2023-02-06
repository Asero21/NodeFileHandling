const express = require('express'); 
const app =express()
var fs = require ('fs'); 

// middleware  

app.use(express.urlencoded({extended:true})) 

// STEP 1: Read the existing data from json file  

let users= require("./message.json")

// API routes 

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/userdata.ejs');
  }) 
     
app.post("/",function(req,res){ 
   
    let fn = req.body.FirstName;
    let ln = req.body.LastName;
    let address = req.body.Address;
    let age = req.body.Age;
    let email = req.body.Email;

    let allData = {
        fn: fn,
        ln: ln,
        address: address,
        age: age,
        email: email,
    }
    res.send(allData)  

    // STEP 2: add new user data to users object using push method  
   users.push(allData) 

   // STEP 3: Writing data in a JSON file 

   fs.writeFileSync('database.json', JSON.stringify(users), err =>{ 
     if(err) throw err 

     console.log("Done writting JSON file")
   }) 

   // STEP 4: Write the new info in the text file named message

  fs.writeFileSync('./database.txt',JSON.stringify(users), err =>{ 
    if(err) throw err 

    console.log("Done writting text file")
  }); 
  });  

  app.listen(3000, function(){ 
      console.log("server started on port 3000")
  })