import express from 'express';
import { connectDB } from './config/index';
import User from './database/models/User';
import UserDetail from './database/models/UserDetail';
import Admin from './database/models/admin';
import bodyparser from 'body-parser';
import setRoutes from "./routes/index"
import nodemailer from "nodemailer";
import cookieparser from "cookie-parser";
import session from "express-session";

import path from 'path';

import { PORT } from './config/env';
// let date = new Date()
// console.log(date.toLocaleDateString())
// date=date.toLocaleString();

// let date1 =new Date();
// date1.setDate(date1.getDate()-10);
// console.log(date1.toLocaleDateString())
const port = PORT || 3003 || 3330 || 4342
const app = express();
app.use('/assets', express.static('assets')); //src need check

app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, '../views'));
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieparser());
app.use(session({
  secret: "login",
  cookie: { expires: 60*60*1000 }  // Approximately Friday, 31 Dec 9999 23:59:59 GMT
})) 
if(process.env.NODE_ENV === "production"){
  setRoutes(app); 

  app.set('view engine', 'ejs');
  app.use('/assets', express.static('assets'));
  app.set('views', path.join(__dirname, '../views'));
  app.use(bodyparser.urlencoded({ extended: false }));
  app.use(cookieparser());
  app.use(
    session({
      secret: 'login',
      cookie: { expires: 60 * 60 * 1000 }, // Approximately Friday, 31 Dec 9999 23:59:59 GMT
    })
  ); 
  app.use("*",(req,res)=>{
    res.redirect("/api/user")
  });
 
  
   
app.use((req, res) => {
  res.render('error.ejs');
});


  
}
// app.get('/login', (req, res) => {
//   res.render('sideNav.ejs');
setRoutes(app);  

app.use((req, res) => {
  res.render("error.ejs");
});

app.listen(port, () => {
  connectDB();
  console.log(`api running -> http://localhost:${PORT}`);
});
