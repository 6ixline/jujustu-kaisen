const store = require("store2");
function auth(req, res, next){
    const user = JSON.parse(store('user'));
    try{
        if(!(user.username == process.env.EMAIL && user.password == process.env.PASSWORD)){
            res.redirect("/login");
        }
        next();
    }catch(e){
        res.redirect("/login");
    }
}


module.exports = auth;