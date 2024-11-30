const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const api = require('./routes/api');
const fs = require('fs');

const app = express();
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 4000;


app.use("/api",api);

app.get("/",(req,res)=>{
    res.send("Server is working fine");
})

app.get("/file-generate", (req, res) => {
    const data = JSON.stringify({ data: [{ name: 'karthik', age: 31 }] }, null, 2); // Proper JSON formatting

    fs.writeFile('data.json', data, (err) => {
        if (err) {
            console.error('Error writing file:', err);
            res.status(500).send("Failed to create the file");
            return;
        }
        console.log('File saved successfully!');
        let result = JSON.parse(data);
        res.json({"message":"File created successfully","status":200,result});
    });
});

app.get("/file-append", (req, res) => {
    fs.readFile('data.json', 'utf8', (err, existingData) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send("Failed to read the file");
            return;
        }
        let existingDataObj = JSON.parse(existingData);
        let data = {
            id: existingDataObj.posts.length+1,
            name: 'This is post',
            description: 'This is my second post description'
        };
        if(existingDataObj.posts == undefined){
            existingDataObj.posts = [];
            
        }
        existingDataObj.posts.push({ id:existingData.posts.length+1, name: 'This is post', description: 'This is my second post description' });
        const updatedData = JSON.stringify(existingDataObj, null, 2);
        fs.writeFile('data.json', updatedData, (err) => {
            if (err) {
                console.error('Error writing file:', err);
                res.status(500).send("Failed to write the file");
                return;
            }
            console.log('File updated successfully!');
            res.json({"message":"File updated successfully","status":200});
        });
    });
   
});

api.get("/file-read", (req, res) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            res.status(500).send("Failed to read the file");
            return;
        }
        let result = JSON.parse(data);
        res.json({"message":"File read successfully","status":200,result});
    });
});

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log("connection successfully ");
    })
    .catch((e) => {
        console.log("error", e);
    })

app.listen(PORT,()=>{
    console.log(`Server is listeing port ${PORT}`)
})

