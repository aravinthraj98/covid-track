import joi from "joi"

const Adminlogin = (data)=>{
    const schema = joi.object({
        areacode:joi.string().min(5).required(),
        password:joi.string().min(8).required() 
    });
    return schema.validate(data);
}
module.exports = { Adminlogin
}