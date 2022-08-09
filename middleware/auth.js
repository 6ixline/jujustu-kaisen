const ls = require("../utils/storage");
function auth(req, res, next){
    const user = JSON.parse(ls.getItem('user'));
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