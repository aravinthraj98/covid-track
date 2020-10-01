import express from "express"
import sendmail from "../../utils/nodemailer"
import UserDetail from "../../database/models/UserDetail"
import getuserdetail from "../../services/getuserdetail"
import User from  "../../database/models/User"
import bcrypt from "bcrypt"
import viruscases from "../../database/models/viruscases"
const router =express.Router();


router.get("/",async(req,res)=>{
    if(req.session.email && req.cookies.email == req.session.email){
         let data = await getuserdetail(req.session.email);
         return res.render('sideNav.ejs', {
           data: data,
         });
    }
    res.render('index.ejs');
});


router.post("/",async(req,res)=>{
   let email =req.body.email;
 try{
     let getuser = await User.findOne({ email });
     if (getuser) {
         let ismatch = await bcrypt.compare(req.body.password, getuser.password)
         if(ismatch){
              res.cookie("email",email);
              req.session.email=email;
              let data=await getuserdetail(email);
              console.log(data);
              return res.render('sideNav.ejs', {
                data:data
              });
         }
        
             
        //  let getdetails = await UserDetail.findOne({email})
        //  console.log(getdetails.address);
        //  let temp=[];
        //  let oxy = [];
        //  let readings = getdetails.dailyreport;
        //  for(let i in readings){
        //      let read=JSON.parse(readings[i]);
        //      temp.push(read.temperature);
        //      oxy.push(read.oxygen)
        //  }
        //  console.log(temp)
        //  if (ismatch) 
     }
 }
 catch(e){
     console.log(e);
     res.render('index.ejs', {
         data: { "msg": "usernamea or password wrong" }
     });

 }
    
   
    res.render('index.ejs',{
        data:{"msg":"username or password wrong"}
    });
});


router.post("/changepassword",async(req,res)=>{
    

    let result = Math.random().toString(36).substring(2, 11);
   

    let email = req.body.mail;
    let isuser = await User.findOne({email});
    if(!isuser) return res.send("not a valid email");
    else{
        let last = isuser.password_changedon;
        if(String(last).length>2){
            let date = new Date()
            date.setDate(date.getDate()-10);
            date=date.toLocaleDateString()
            date=new Date(date);
            last=new Date(last);
            if(date<last){
                console.log("hello");
                return res.send(`password has been changed back few days check mail on ${isuser.password_changedon}`);
            
        }

        }
        

    }
    let ismail =sendmail(req.body.mail, `your new password is  ${result} change after login`);
    if(ismail) {
        try{
            let date = new Date()
            date=date.toLocaleDateString();
            let salt =await bcrypt.genSalt(10);
            let password =await bcrypt.hash(result,salt)
            await User.findOneAndUpdate({ email }, { $set: { password: password,password_changedon: date} });
            return res.send("password has been sent to respective email");
        }
        catch(e){
            console.log("not updata")
        }
   
        
    }
    res.send("some error has occured plz try again later");


});
router.post("/getcases",async(req,res)=>{
    let findcase =req.body;
    try{
        let data = await viruscases.find(findcase);
        let address =[]
        for(let i in data){
            address.push(data[i].address);
        }
        console.log(address);
        return res.send(address);
    }
    catch(e){
        console.log(e)
    }

    res.send("some error occurred");
})

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.clearCookie("email");
    res.render("index.ejs");
})
export default router;
