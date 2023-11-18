const express = require('express');
const Router = require('./routes/questionBankRoutes');

//rest object.

const app = express();//?

app.use(express.json());//?

app.use('/',Router);//?

//port.
const PORT = 8080;


app.listen(PORT,() => {
    console.log("Node Server Running");
})