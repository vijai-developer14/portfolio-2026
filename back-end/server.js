const express = require("express");
const app =express();
const bcrypt = require('bcrypt')
const  {connectToDb, getDb}=require("./config/db.js")
const {ObjectId} = require("mongodb")
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const cors = require("cors")
const jwt = require("jsonwebtoken");
require("dotenv").config();

let db;
var port = process.env.port || 8000;


connectToDb((err)=>{
    if(!err){
        app.listen(8000,()=>{
            console.log("app listening to port")
        })
        db = getDb()
    }
})
app.use(express.json());
app.use("/uploads", express.static("uploads"));
app.use(cors());

/////////////////////////////// verify token \\\\\\\\\\\\\\\\\\\\\\
const verifyToken = (req, res, next)=>{
    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({message:"No Token"})
    }
    const token = authHeader.split(" ")[1];
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecretkey");
        req.user = decoded;
        next();
    }
    catch (err){
        res.status(400).json({error:err})
    }
}

app.get('/work-projects-get', verifyToken, (req, res)=>{
    db.collection("project")
    .find()
    .toArray()
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
});

app.get('/work-projects-get-client', (req, res)=>{
    db.collection("project")
    .find()
    .toArray()
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
});
app.post('/work-projects-get', upload.single('image'), (req, res)=>{
    const prjData = {
        name :req.body.name,
        link: req.body.link,
        stack: req.body.stack,
        image: req.file ? req.file.filename : null

    };
    db.collection("project")
    .insertOne(prjData)
    .then((result)=>{
        res.status(200).json(result)
    })
    .catch((err)=>{
        res.status(500).json(err)
    })
    
})
app.patch("/work-projects-get/:id", upload.single("image"), (req, res)=>{
    if(ObjectId.isValid(req.params.id)){
        const editId = req.params.id;
        const updateData = {
            name: req.body.name,
            link: req.body.link,
            stack: req.body.stack
        };
        if (req.file) {
        updateData.image = req.file.filename;
        }
        db.collection("project")
        .updateOne({_id:new ObjectId(editId)},{$set:updateData})
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((err)=>res.status(500).json(err))
    }
    else{
        res.status(500).json({error:"Object id invalid"});
    }
});
app.delete("/work-projects-get/:id", (req, res)=>{
    if(ObjectId.isValid(req.params.id)){
        const editId = req.params.id;
        db.collection("project")
        .deleteOne({_id:new ObjectId(editId)})
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((err)=>res.status(500).json(err))
    }
    else{
        res.status(500).json({error:"Object id invalid"});
    }
});


//////////////////////////////////////// login \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\


app.get('/login-portfolio',(req, res)=>{
    db.collection('login')
    .find()
    .toArray()
    .then((response)=>res.status(200).json(response))
    .catch((err)=>res.status(500).json({message:err}))
})
app.post('/login-portfolio', async (req, res) => {
    const { getuserName, getpass } = req.body;

    try {
        const user = await db
            .collection('login')
            .findOne({ user: getuserName });

        if (!user) {
            return res.status(500).json({ message: "denied" });
        }

        const isMatch = await bcrypt.compare(getpass, user.password);

        if (!isMatch) {
            return res.status(500).json({ message: "denied" });
        }
        const token = jwt.sign({userId:user._id, userName: user.user},
                 process.env.JWT_SECRET || "mysecretkey",
                 {expiresIn:"1h"}   
        )
        res.status(200).json({ message: "success", token });

    } catch (err) {
        res.status(500).json({ message: "server error" });
    }
});



app.delete("/login-portfolio/:id", (req, res)=>{
    if(ObjectId.isValid(req.params.id)){
        const editId = req.params.id;
        db.collection("login")
        .deleteOne({_id:new ObjectId(editId)})
        .then((result)=>{
            res.status(200).json(result)
        })
        .catch((err)=>res.status(500).json(err))
    }
    else{
        res.status(500).json({error:"Object id invalid"});
    }
});

