import express from "express"
import bcrypt from "bcrypt";
import {Adminlogin} from "../../middleware/validate";
import UserDetail from "../../database/models/UserDetail";
import Admin from "../../database/models/admin";
import User from "../../database/models/User";
const router = express.Router();
router.get("/update",(req,res)=>{
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
    console.log(check);
    
 

    console.log(email);
    let dailyreport = check;
    try {
        let isupdate = await UserDetail.findOneAndUpdate({ email }, { $set: { dailyreport: dailyreport } });
        console.log(dailyreport);
        res.send("success");
    }
    catch (e) {
        return res.send(e + " error")
    }
})

router.get("/",(req,res)=>{
   if (req.cookies.areacode && req.session.areacode == req.cookies.areacode) return res.render("adminAdd.ejs")
   console.log(req.session.areacode)
     
   res.render('admin.ejs');
});
router.post("/add",async(req,res)=>{
    if(!req.cookies.areacode && !req.session.areacode==req.cookies.areacode) return res.redirect("/api/admin")
    console.log(req.cookies);
    let user =req.body;
    console.log(user);
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
    console.log(detail);
    console.log(email);
    const userfind = await UserDetail.findOne({email});
    if(userfind) return res.send("user already present");
    try{
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
 })

export default router;
