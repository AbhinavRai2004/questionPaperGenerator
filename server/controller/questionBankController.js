const quesBankGenerator = require("../service/questionBankService");

const questionBankController = async(req,resp) => {
    try{
        const quesPaper = await quesBankGenerator(req);
        const {status,returnObj} = quesPaper;
        resp.status(status).send(returnObj);
    }catch(error){
        resp.status(500).send({
            error : error
        })
    }
}

module.exports = {questionBankController};
