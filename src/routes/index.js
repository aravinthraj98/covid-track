import admin from "./api/admin"
import user from "./api/user"

export default (app)=>{
    app.get("/", (req, res) => {
        res.redirect("/api/user")
    });
    app.use("/api/admin",admin),
    app.use("/api/user",user)

}