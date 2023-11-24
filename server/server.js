const express = require('express');
const Router = require('./routes/questionBankRoutes');
const testRouter = require('./routes/testRoutes');


const app = express();
app.use(express.json());
app.use('/generate_question_paper',Router);
// app.use('/test',testRouter)
 
const PORT = 8080;

app.listen(PORT,() => {
    console.log("Node Server Running");
})