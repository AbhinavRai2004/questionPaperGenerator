const quesTestSample = require('../questionStore');

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const testGenerator = (req) => {
    const userTestInput = req.body;

    if(
       !userTestInput ||
       !userTestInput['easy'] ||
       !userTestInput['totalMarks'] ||
       !userTestInput['medium'] ||
       !userTestInput['hard']
       )
    {
        return {status : 400, returnObj :  "Error : Missing Required Parameter"}
    }
    
    // console.log("service0");

    const keyIndexEasy = Object.entries(userTestInput['easy']);
    const keyIndexMedium = Object.entries(userTestInput['medium']);
    const keyIndexHard = Object.entries(userTestInput['hard']);

    // console.log(keyIndexEasy,keyIndexMedium,keyIndexHard);
     
    let easyQuestionCn = 0;
    let mediumQuestionCn = 0;
    let hardQuestionCn = 0;

    for(let i = 0; i < keyIndexEasy.length; i++)
    {   
        console.log(easyQuestionCn);
        easyQuestionCn += Math.ceil(((userTestInput['totalMarks'] * keyIndexEasy[i][1]) / 100)/5);
    }

    for(let i = 0; i < keyIndexMedium.length; i++)
    {   
        mediumQuestionCn += Math.ceil(((userTestInput['totalMarks'] * keyIndexMedium[i][1]) / 100)/10);
    }
    
    for(let i = 0; i < keyIndexHard.length; i++)
    {   
        hardQuestionCn += Math.ceil(((userTestInput['totalMarks'] * keyIndexHard[i][1]) / 100)/15);
    }
    
    
    console.log(easyQuestionCn,mediumQuestionCn,hardQuestionCn,quesTestSample.length);
    
    shuffleArray(quesTestSample);

    const easyQuestionArr = [];
    const mediumQuestionArr = [];
    const hardQuestionArr = [];
    const totalQuestionArr = [];

    for (let itr = 0; itr < quesTestSample.length; itr++) {
        const currentQuestion = quesTestSample[itr];
        const currentDifficulty = currentQuestion["difficulty"];
        const currentTopic = currentQuestion["topic"];
    
        if (currentDifficulty === "Easy" && currentTopic === keyIndexEasy[itr][0] && easyQuestionArr.length < easyQuestionCn) {
            console.log("inside Easy");
            easyQuestionArr.push(currentQuestion);
        } else if (currentDifficulty === "Medium" && currentTopic === keyIndexMedium[itr][0] && mediumQuestionArr.length < mediumQuestionCn) {
            console.log("inside Medium");
            mediumQuestionArr.push(currentQuestion);
        } else if (currentDifficulty === "Hard" && currentTopic === keyIndexHard[itr][0] && hardQuestionArr.length < hardQuestionCn) {
            console.log("inside Hard");
            hardQuestionArr.push(currentQuestion);
        }
    }
    
    console.log(easyQuestionArr,mediumQuestionArr,hardQuestionArr);

    return {status : 200 , returnObj : "ok"};
}

module.exports = { testGenerator };