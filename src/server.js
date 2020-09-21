import express from "express";
import {connectDB} from "./config/index";
import User from "./database/models/User"
import UserDetail from "./database/models/UserDetail"
import Admin from "./database/models/admin"
import bodyparser from "body-parser"
var urlencodedParser = bodyparser.urlencoded({ extended: false });

import path from "path"

import{PORT} from "./config/env";
const app =express()
app.use('/assets', express.static('assets'));//src need check

app.set('view engine','ejs')

app.set('views',path.join(__dirname,'views'))

app.get("/", (req,res)=>{
    res.render('index.ejs')
});
app.get("/admin",(req,res)=>{
    res.render('admin.ejs') 
});
app.get("/login",(req,res)=>{
  res.render("sideNav.ejs")
})
app.post("/admin",urlencodedParser,async (req,res)=>{
    try{
        let adminLog =req.body
        console.log(adminLog)
        let findadmin=await Admin.findOne(adminLog)
        if(findadmin)
             return res.render("adminAdd.ejs")
             
        else{
          
             return res.render("admin.ejs",{"data":{"msg":"username or password wrong"}})
        }
    }
    catch(e){
        console.log(e)
    }
    console.log(req.body)
    res.send(req.body)
   
});
app.use((req,res)=>{
    res.send("no url")
}); 


app.listen(PORT,()=>{
    connectDB();
    console.log(`api running -> http://localhost:${PORT}`)
});
