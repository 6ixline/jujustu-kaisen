const mongoose = require('mongoose')

try{
    mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser:true,
    })
}catch(e){
    console.log(e);    
}