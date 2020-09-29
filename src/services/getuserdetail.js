import UserDetail from "../database/models/UserDetail"

const getuserdetail = async(email)=>{
    let getdetails = await UserDetail.findOne({ email });
    console.log(getdetails.address);
    let temp = [];
    let oxy = [];
    let readings = getdetails.dailyreport;
    for (let i in readings) {
      let read = JSON.parse(readings[i]);
      temp.push(read.temperature);
      oxy.push(read.oxygen);
    }
    console.log(oxy);
    let data={
        temperature: temp,
        oxygen: oxy,
        people: getdetails.familymembers,
        address: getdetails.address,
      }
     return data;
}
export default getuserdetail;