const path = require('path');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser')
require('./db/mongoose')
const mangaRoute = require("./routes/mangaRoutes");
const category = require("./routes/category");
const manga = require("./routes/manga");
const categoryRoutes = require("./routes/categoryRoutes")



const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

// Define path for Express config
const publicDirectoryPath = path.join(__dirname,'./public')
const viewPath = path.join(__dirname,'./templates/views')
const partialPath = path.join(__dirname,'./templates/partials')


// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialPath)

// Setup static directory for serve
app.use(express.static(publicDirectoryPath))

app.use(express.json())

app.get('/',(req,res)=>{
    res.render('index',{
    })
})


const port = process.env.PORT || 3000
app.use(express.json());

app.use(mangaRoute);
app.use(category);
app.use(manga);
app.use(categoryRoutes);

hbs.registerHelper("select", function(value, options) {
return options.fn(this)
    .split('\n')
    .map(function(v) {
        v = v.trim();
    var t = 'value=' + value + ''
    return ! RegExp(t).test(v) ? v : v.replace(t, t + ' selected="selected"')
    })
    .join('\n')
})

app.listen(port, ()=>{
   console.log(`Server is running on : ${port}`)
});
   