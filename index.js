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

app.get('/', (req,res) => {
    res.sendFile(__dirname+'/all-data.json')
}).get('/data', (req,res) => {
    res.sendFile(__dirname+'/data.json')
}).post('/upload', (req,res) => {
    console.log(req.body)
    res.send("OK")
    var entry = req.body
    Object.assign(entry,{time:(new Date().toLocaleString('en-CA', { timeZone: 'America/New_York' }))})
    fs.readFile(__dirname+'/data.json', (err,data) => {
        obj = JSON.parse(data.toString())
        console.log(obj)
        obj.data.push(req.body)
        fs.writeFile(__dirname+'/data.json', JSON.stringify(obj), function (err) {
            if (err) throw err;
            console.log('Saved!')
        })
    })

})

app.listen(port, (err) => {
    console.log("Server is running on port: 3000")
    if(err){quit(err)}
})