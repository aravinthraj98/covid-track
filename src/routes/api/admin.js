import express from "express"
import bcrypt from "bcrypt";
import {Adminlogin} from "../../middleware/validate";
import UserDetail from "../../database/models/UserDetail";
import Admin from "../../database/models/admin";
import User from "../../database/models/User";
const router = express.Router()

router.get("/",(req,res)=>{
    res.render('admin.ejs');
});
router.post("/add",async(req,res)=>{
    if(!req.cookies.areacode && !req.session.areacode==req.cookies.areacode) return res.redirect("/api/admin")
    console.log(req.cookies);
    let user =req.body;
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
             return res.send("user registered")
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

export default router;
