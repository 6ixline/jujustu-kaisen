const path = require('path');
const express = require('express');
const hbs = require('hbs');
require('./db/mongoose')
const mangaRoute = require("./routes/mangaRoutes");
const category = require("./routes/category");
const manga = require("./routes/manga");

const app = express()

// Define path for Express config
const publicDirectoryPath = path.join(__dirname,'./public')
const viewPath = path.join(__dirname,'./templates/views')
const partialPath = path.join(__dirname,'./templates/partials')

console.log(viewPath);

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

// Setup static directory for serve
app.use(express.static(publicDirectoryPath))

app.use(express.json())

app.get('',(req,res)=>{
    res.render('index',{
        title: 'Mangakyo',
        name: "Sourabh"
    })
})


const port = process.env.PORT || 3000
app.use(express.json())
app.use(mangaRoute);
app.use(category)
app.use(manga)

app.listen(port, ()=>{
   console.log(`Server is running on : ${process.env.PORT}`)
});
   