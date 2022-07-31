const express = require('express');
const mangaRoute = require("./routes/mangaRoutes");

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())
app.use(mangaRoute);

app.listen(port, ()=>{
   console.log(`Server is running on : 3000`)
});
