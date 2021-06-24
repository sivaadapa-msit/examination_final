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


app.get('/api/get', (req,res)=> {
    const sqlSelect = "SELECT * FROM results";
    db.query(sqlSelect, (err, result) => {
       res.send(result)
    });
})
app.post('/api/insert', (req, res)=>{


    const SerialNo = req.body.SerialNO;
    const Name = req.body.Name;
    const Rollnumber = req.body.Rollnumber;
    const Credits = req.body.Credits;
    const Courseid = req.body.Courseid;
    const Gradeobtained = req.body.Gradeobtained
    const ResultType = req.body.ResultType;
    const Year = req.body.Year;
    const Gradepoints = req.body.Gradepoints;
    const Course= req.body.Course;
    const Image_url = req.body.Image_url;
    
    
    const sqlInsert = "INSERT INTO results (SerialNo, Name, Rollnumber, Courseid, Course, Credits, ResultType, Year, Gradeobtained, Gradepoints,Image_url) VALUES (?,?,?,?,?,?,?)";
    db.query(sqlInsert, [SerialNo, Name, Rollnumber, Courseid, Course, Credits, ResultType, Year, Gradeobtained, Gradepoints,Image_url], (err, result) => {
        console.log(result);
    });
});

// Contact page 
app.post('/contact/insert', (req, res)=>{

    const name = req.body.name
    const email = req.body.email
    const Rollnumber= req.body.Rollnumber
    const message = req.body.message
    
    
    const sqlInsert = "INSERT INTO contact (name, email, Rollnumber,message) VALUES (?,?,?,?)"
    db.query(sqlInsert, [name, email,Rollnumber, message], (err, result) => {
        console.log(result);
    });
});

// login page

app.post('/user/register', (req, res)=>{

    const Name = req.body.Name
    const Username = req.body.Username
    const Password = req.body.Password
    const DOB = req.body.DOB
    const phonenumber = req.body.phonenumber
    const confirmpassword = req.body.confirmpassword


    const sqlInsert = "INSERT INTO regtable (Name, phonenumber, DOB, Username, Password, confirmpassword) VALUES (?,?,?,?,?,?)"
    db.query(sqlInsert, [ Name, phonenumber, DOB, Username, Password, confirmpassword ], (err, result)=>{
        console.log(result)
    })
})

app.post('/user/login', (req, res)=>{

    const username = req.body.username
    const password = req.body.password

    const sqlSelect = "SELECT * FROM regtable WHERE Username = ? AND Password = ?"
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