const cal = require("../service/inputServices");

const inputController = async(req,resp) => {
    try{
        const qBank = await cal(req);
        resp.status(200).send(qBank);
    }catch(error){
        resp.status(404).send({
            error : error
        })
    }
}

module.exports = {inputController};
