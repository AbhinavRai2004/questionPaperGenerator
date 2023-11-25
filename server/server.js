const express = require('express');
const Router = require('./routes/questionBankRoutes');

const app = express();
app.use(express.json());
app.use('/generate_question_paper',Router);

const PORT = 8080;

app.listen(PORT,() => {
    console.log("Node Server Running");
})