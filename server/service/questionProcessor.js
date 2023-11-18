const quesSample = require('../questionSample');

// Function to shuffle an array using Fisher-Yates algorithm
//improve naming conventions
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const questionGenerator = (req) => {
    const userInput = req.body;

    // Ensure the 'mark', 'easy', 'medium', and 'hard' properties exist in the request body
    if (!userInput || !userInput['mark'] || !userInput['easy'] || !userInput['medium'] || !userInput['hard']) {
        console.log('Missing required parameters');
        return;
    }
    // Ensure the result is an integer

    const easyQuestionCn = Math.ceil(((userInput['mark'] * userInput['easy']) / 100)/5);  
    const mediumQuestionCn = Math.ceil(((userInput['mark'] * userInput['medium']) / 100)/10);
    const hardQuestionCn = Math.ceil(((userInput['mark'] * userInput['hard']) / 100)/15);

    // Shuffle the quesSamples array
    shuffleArray(quesSample);

    const easyQuestionArr = [];
    const mediumQuestionArr = [];
    const hardQuestionArr = [];
    const totalQuestionArr = [];
    
    quesSample.forEach((quesSample) => {
        if (quesSample["difficulty"] === "Easy" && easyQuestionArr.length < easyQuestionCn) {
            console.log("inside Easy")
            easyQuestionArr.push(quesSample);
        } else if (quesSample["difficulty"] === "Medium" && mediumQuestionArr.length < mediumQuestionCn) {
            console.log("inside Medium")
            mediumQuestionArr.push(quesSample);
        } else if (quesSample["difficulty"] === "Hard" && hardQuestionArr.length < hardQuestionCn) {
            console.log("inside Hard")
            hardQuestionArr.push(quesSample);
        }
    });

    totalQuestionArr.push(easyQuestionArr, mediumQuestionArr, hardQuestionArr);
    console.log(totalQuestionArr);
    return totalQuestionArr;
} 

module.exports = questionGenerator;
