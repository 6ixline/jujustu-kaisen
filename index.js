const express = require('express');
require('./db/mongoose')
const mangaRoute = require("./routes/mangaRoutes");
const category = require("./routes/category");

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(mangaRoute);
app.use(category)

app.listen(port, ()=>{
   console.log(`Server is running on : ${process.env.PORT}`)
});
   