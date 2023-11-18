const quesBankGenerator = require("../service/questionBankService");

// Controller Logic Given Here

const questionBankController = async(req,resp) => {
    try{
        const quesPaper = await quesBankGenerator(req);
        resp.status(200).send(quesPaper);
    }catch(error){
        resp.status(404).send({
            error : error
        })
    }
}

module.exports = {questionBankController};
