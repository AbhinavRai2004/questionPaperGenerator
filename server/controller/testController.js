const { testGenerator } = require("../service/testService")

const testController = async(req,resp) => {
    try {
        // console.log("hi");
        const testPaper =await testGenerator(req);
        // console.log("hi");
        const {status,returnObj} = testPaper;
        // console.log(status);
        // console.log(returnObj);
        resp.status(status).send(returnObj);
    } catch (error) {
        // console.log("error");
        resp.status(500).send({
            error : error
        })
    }
}

module.exports = { testController };