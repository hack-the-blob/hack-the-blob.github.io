const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const fs = require('fs')
var multer = require('multer');
var upload = multer();

const port = process.env.PORT || 3000;

const quit = (err) => {
    console.log(err)
    process.exit()
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)))

app.get('/data', (req,res) => {
    res.sendFile(__dirname+'/data.json')
}).post('/upload', (req,res) => {
    res.send(req.body)
}).post('/change-position', upload.fields([]) ,(req,res) => {
    position[0] = req.body.lat
    position[1] = req.body.lng
    position[2] = req.body.alt
    res.redirect('/enter-position')
}).get('/enter-position',(req,res) => {
    res.sendFile(__dirname+'/poschange.html')
})

app.listen(port, (err) => {
    console.log("Server is running on port: 3000")
    if(err){quit(err)}
})