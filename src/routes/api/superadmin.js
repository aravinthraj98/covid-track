import express from "express"
import admin from "../../database/models/admin"
import bcrypt from "bcrypt"
import official from "../../database/models/official"
const router = express.Router();

 
 router.get("/", async (req,res)=>{
   res.render("superAdminhome.ejs");
 });
 router.post("/add",async(req,res)=>{
     let areacode = req.body.area;
     let isadmin =await admin.findOne({areacode});
    if(!isadmin) {
        try{
            let salt = await bcrypt.genSalt(10);
            let password = await bcrypt.hash(req.body.password,salt);
            console.log(password);
            let newarea={
                areacode:areacode,
                password:password
                
            }
            await admin.insertMany(newarea);
            res.send(true);

        }
        catch(e){
            console.log(e);
            res.send("some error occured please try again later");
        }
    }
    else{
        res.send("admin already registered");
    }

     
 });

 router.post("/delete",async(req,res)=>{
     let areacode = req.body.areacode;
     try{
         let isadmin = await admin.findOne({areacode});
         if(!isadmin) return res.send("area not found");
         await admin.findOneAndDelete({areacode});
         return res.send(true);
     }
     catch(e){
         console.log(e);
     }
     return res.end("some error occured");
    
 });

 router.post("/changepassword",async(req,res)=>{
     let areacode = req.body.areacode;
    
     try{
         let isadmin = await admin.findOne({areacode});
         if(!isadmin) return res.send("area not found");
         let salt = await bcrypt.genSalt(10);
         let password = await bcrypt.hash(req.body.password,salt);
         await admin.findOneAndUpdate({areacode},{$set:{password}});
         res.send(true);
     }
     catch(e){
         console.log(e);
     }
     res.send("some error has been occured");
 })

 export default router;