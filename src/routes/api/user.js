import express from "express"
import sendmail from "../../utils/nodemailer"
import UserDetail from "../../database/models/UserDetail"
import User from  "../../database/models/User"
import bcrypt from "bcrypt"
const router =express.Router();
router.get("/update",async(req,res)=>{
      let email="aravinthraj1972@gmail.com"
      let dailyreport =[{temperature:"101",oxygen:"97"}];
      try{
      let isupdate=await UserDetail.findOneAndUpdate({email},{$set:{dailyreport:dailyreport}});
      console.log(dailyreport);
      res.send("success");
}
      catch(e){
          return res.send(e+" error")
      }
})

router.get("/",async(req,res)=>{
    res.render('index.ejs');
});


router.post("/login",async(req,res)=>{
   let email =req.body.email;
 try{
     let getuser = await User.findOne({ email });
     if (getuser) {
         let ismatch = await bcrypt.compare(req.body.password, getuser.password)
         let getdetails = await UserDetail.findOne({email})
         console.log(getdetails.address);
         if (ismatch) return res.render("sideNav.ejs",{data:{"readings":getdetails.dailyreport,"people":getdetails.familymembers,"address":getdetails.address}});
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
export default router;
