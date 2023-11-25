const quesBankGenerator = require("../service/questionBankService");

const questionBankController = async(req,resp) => {
    try{
        // console.log('hi');
        const quesPaper = await quesBankGenerator(req);
        const {status,message} = quesPaper;

        resp.status(status).send(message);
    }catch(error){
        // console.log('hi');
        resp.status(500).send({
            error : error
        })
    }
}

module.exports = {questionBankController};
