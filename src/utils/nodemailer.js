import nodemailer from "nodemailer"

let transporter = nodemailer.createTransport({
    service:"gmail",
    auth:{
        user:"getofficialmails2020@gmail.com",
        pass:"officialmail"
    }
});
export default async(mail,text)=>{
let mailOptions={
    from:"getofficialmails2020@gmail.com",
    to:mail,
    subject:"request",
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