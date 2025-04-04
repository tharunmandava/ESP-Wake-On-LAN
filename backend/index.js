const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors');
const corsOptions = {
    origin:"*",
    methods : ['GET','POST','DELETE','PUT'],
    allowedHeaders: ["Content-Type","Authorization"]
};

const PORT = process.env.PORT || 5000;
const SECRET_TOKEN = process.env.SECRET_TOKEN || null;

app.use(cors(corsOptions));
app.use(express.json());
app.get('/',(req,res) => res.send("ESP WOL Server"));

let status = 'no';

app.post("/update-status",(req,res) => {
    const {newStatus,token} = req.body;
    
    if(token != SECRET_TOKEN){
        return res.status(403).json({error: "Unauthorized"});
    }

    if(newStatus === "yes" || newStatus === "no"){
        status = newStatus;
        res.json({message: "Status updated successfully",status});
    } else{
        res.status(400).json({error: "invalid status"});
    }
});

app.get("/status", (req,res) => {
    res.json({status});
});

if(process.env.NODE_ENV !== "production"){
    app.listen(PORT,() => console.log(`Server running on port ${PORT}`));
}


module.exports = app;

