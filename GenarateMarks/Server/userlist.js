const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const mysql = require("mysql");

const db = mysql.createPool({
    host:'localhost',
    user:'root',
    password:'',
    database:'examinationportal',
});

app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));





app.post('/register', (req, res)=>{

    const Name = req.body.Name
    const Username = req.body.Username
    const Password = req.body.Password
    const DOB = req.body.DOB
    const phonenumber = req.body.phonenumber
    const confirmpassword = req.body.confirmpassword


    const sqlInsert = "INSERT INTO regtable (Name, phonenumber, DOB, Username, Password, confirmpassword) VALUES (?,?,?,?,?,?)"
    db.query(sqlInsert [ Name, phonenumber, DOB, Username, Password, confirmpassword ], (err, result)=>{
        console.log(result)
    })
})

app.post('/login', (req, res)=>{

    const username = req.body.username
    const password = req.body.password

    const sqlSelect = "SELECT * FROM userlist WHERE username = ? AND password = ?"
    db.query(sqlSelect, [username, password], (err, result)=>{
        
        if (err){
            res.send({err: err})
        }

        if (result.length>0){
            res.send(result);
        } else {
            res.send({message: "Wrong username or password."});
        }
    })
})

app.listen(3456, ()=>{
    console.log("Running...")
})