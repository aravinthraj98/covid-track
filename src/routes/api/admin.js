import express from "express"
import bcrypt from "bcrypt";
import {Adminlogin} from "../../middleware/validate";
import UserDetail from "../../database/models/UserDetail";
import Admin from "../../database/models/admin";
import User from "../../database/models/User";
import virustest from "../../database/models/virustest"
import Viruscases from "../../database/models/viruscases";
import sendmail from "../../utils/nodemailer"
import overallcases from "../../database/models/overallcases";
import e from "express";
const router = express.Router();
const temp_level=99;
const oxy_level =95;
router.get("/update",(req,res)=>{
    if (!req.cookies.areacode || !req.session.areacode == req.cookies.areacode)
            return res.render("admin.ejs");

    return res.render("adminUpdate.ejs")
})
router.post("/find",async(req,res)=>{
    let email=req.body.email;
    try{
        let finduser =await UserDetail.findOne({email});
        if(finduser) return res.send(finduser);
        return res.send("no details found")
    }
    catch(e){
        console.log(e);

    }
    return res.send("some error found");


});
router.post("/update", async (req, res) => {
    let email = req.body.email;
    let dailyreports = req.body;
    
    let check=dailyreports["dailyreport[]"];
     console.log( typeof dailyreports["dailyreport[]"]);
     check.shift()
     let dailyreport = check;
     console.log(dailyreport);
    try {
        let isupdate = await UserDetail.findOneAndUpdate({ email }, { $set: { dailyreport: dailyreport } });
        console.log(isupdate);
         
         
        for(let i in dailyreport){
            
            let report = JSON.parse(dailyreport[i]);
            if(report.temperature>temp_level || report.oxygen<oxy_level){
                let newcase = {
                    name:isupdate.familymembers[i],
                    address:isupdate.address,
                    email:isupdate.email,
                    area:isupdate.address.area
                }
                let ispresent = await virustest.findOne(newcase);
                if(!ispresent)
                await virustest.insertMany(newcase);
            }
        }
        res.send("success");
    }
    catch (e) {
        return res.send(e + " error")
    }
})

router.get("/",(req,res)=>{
   if (req.cookies.areacode && req.session.areacode == req.cookies.areacode) return res.render("adminAdd.ejs")
//    console.log(req.session.areacode)
     
   res.render('admin.ejs');
});
router.post("/add",async(req,res)=>{
    if(!req.cookies.areacode || !req.session.areacode==req.cookies.areacode) return res.send("your session has expired please login again");
    // console.log(req.cookies);
    let user =req.body;
    // console.log(user);
    let email = user.email;
    let salt = await bcrypt.genSalt(10);
    let create_password = "CT_"+email;
    let password = await bcrypt.hash(create_password,salt);
    let userlog={
        email:email,
        password:password
    }
    

    let detail ={
        email:email,
        address:{dno:user.dno,street:user.street,area:user.area,city:user.city,zip:user.zip,state:user.state},
        phonenumber:user.phonenumber,
        location:user["location[]"],
        noofmembers:user.noofmembers,
        familymembers:user["total[]"]
    }
    
    // console.log(detail);
    // console.log(email);
    const userfind = await UserDetail.findOne({email});
    if(userfind) return res.send("user already present");
    try{
        let text = `Welcome to covid track application your family has been registerd and your\n \npassword is ${create_password} you can change your password after login and also check your your profile whether your details are correct if not than complaint via the same app in \n complaint section`
        await sendmail(email,text)
       let isuser= await User.insertMany(userlog);
       let isuserdetail= await UserDetail.insertMany(detail);
       if(isuser && isuserdetail)
             return res.send(true)
        return res.send("some error has been occured");
    }
    catch(e){
        console.log(e);
    }
    



  
     
     res.send("some error has been occured try again later");

})

router.post("/",async(req,res)=>{
    const Admin_validation = Adminlogin(req.body);
    if (Admin_validation.error) return res.render('admin.ejs', {
        data: { msg: Admin_validation.error.message },
    });
    try {
        const adminLog = { areacode: req.body.areacode }

        let findadmin = await Admin.findOne(adminLog);
        if (findadmin) {

            let checkpassword = await bcrypt.compare(req.body.password, findadmin.password)
            if (checkpassword){
                req.session.areacode = req.body.areacode;
                res.cookie("areacode",req.body.areacode)
                return res.render('adminAdd.ejs');}
            else
                return res.render('admin.ejs', {
                    data: { msg: 'password mismatch' },
                });

        }
        else {
            return res.render('admin.ejs', {
                data: { msg: 'username name not found' },
            });
        }
    } catch (e) {
        console.log(e);
    }
   
    res.send(req.body);
});

 router.get("/logout",(req,res)=>{
     req.session.destroy();
     res.clearCookie("areacode");
     res.render("admin.ejs");   
 });

 router.post("/getcases",async(req,res)=>{
     let area = req.cookies.areacode;
     let cases = await virustest.find({area});
     res.send(cases);
 });

 router.post("/testreport",async(req,res)=>{
     let _id = req.body._id;
     let ispositive = req.body.positive;
     try{
     let deletes = await virustest.findByIdAndDelete({_id});
    //  console.log(deletes);
     if(ispositive) {

        

         let newcase ={
             name:deletes.name,
             email:deletes.email,
             street:deletes.address.street,
             area:deletes.area,
             address:deletes.address
         }
         let text = newcase.name +" has been tested as positive our frontline workers will reach you soon please be under quarantine";
         await sendmail(newcase.email,text);
         let email =newcase.email;
         let getuserlocation = await UserDetail.findOne({email});
         let userlocation = getuserlocation.location;
         let overallcasefind = await overallcases.findOne({email});
         if(!overallcasefind)
            {
                let locationarray=[];
                locationarray.push(String(userlocation));
                let insert = {
                    email:email,
                    coordinates:locationarray


                }
                await overallcases.insertMany(insert);
             console.log("user location inserted to all cases")
            }
            

         let ispresent = await Viruscases.findOne(newcase);
         if(!ispresent)
           await Viruscases.insertMany(newcase);
     }
     
    //  console.log(_id);
     res.send(true)
    }
    catch(e){
        console.log(e);
        res.send("someerror occurred");
    }
 })

export default router;
