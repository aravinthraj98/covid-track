import nodemailer from "nodemailer"

let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:process.env.email,
        pass:process.env.pass
    }
});
export default async(mail,text)=>{
let mailOptions={
    from: process.env.email,
    to:mail,
    subject:"From Covid tracker officials",
    text:text
}
transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
        console.log(error);
        return false
    }
    console.log(info);
    return true;
})

}