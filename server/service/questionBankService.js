const quesSample = require('../questionStore');

// Function to shuffle an array using Fisher-Yates algorithm.

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const quesBankGenerator = (req) => {
    const userInput = req.body;

    // handling edge cases.

    if (!userInput || !userInput['totalMarks'] || !userInput['easy'] || !userInput['medium'] || !userInput['hard'])
    {
        // console.log('Missing required parameters');
        return {status : 400 , message : "Error : Missing Required Parameters"};
    }
    if(userInput['totalMarks'] < 0 || userInput['easy'] < 0 || userInput['medium'] < 0 || userInput['hard'] < 0)
    {
        // console.log("Negative values are not allowed for total marks or difficulty levels.");
        return {status : 400 , message : "Error: Negative values are not allowed for total marks or difficulty levels."};
    }
    if((userInput['easy'] + userInput['medium'] + userInput['hard'])  != 100 )
    { 
        // console.log("The sum of difficulty percentages must equal to 100.");
        return {status : 400, message : "Error: The sum of difficulty percentages must equal to 100." };
    }
    if((((userInput['totalMarks']*userInput['easy'])/100) % 5 != 0) || 
      (((userInput['totalMarks']*userInput['medium'])/100) % 10 != 0) ||
      (((userInput['totalMarks']*userInput['hard'])/100) % 15 != 0))
    {
    //  console.log(" The total marks cannot be distributed according to the specified percentages.");
     return { status: 400, message : { "Error" : [ "The total marks cannot be distributed according to the specified percentages.",
      "Easy Question Mark Distribution must be in multiple of 5", 
      "Medium Question Mark Distribution must be in multiple of 10",
      "Hard Question Mark Distribution must be in multiple of 15"]}};
    }

    const easyQuestionCn = Math.ceil(((userInput['totalMarks'] * userInput['easy']) / 100)/5);
    const mediumQuestionCn = Math.ceil(((userInput['totalMarks'] * userInput['medium']) / 100)/10);
    const hardQuestionCn = Math.ceil(((userInput['totalMarks'] * userInput['hard']) / 100)/15);

    // Shuffle the quesSamples array
    shuffleArray(quesSample);

    const easyQuestionArr = [];
    const mediumQuestionArr = [];
    const hardQuestionArr = [];
    const totalQuestionArr = [];

    quesSample.forEach((quesSample) => {
        if (quesSample["difficulty"] === "Easy" && easyQuestionArr.length < easyQuestionCn) {
            //console.log("inside Easy")
            easyQuestionArr.push(quesSample);
        } else if (quesSample["difficulty"] === "Medium" && mediumQuestionArr.length < mediumQuestionCn) {
        // console.log("inside Medium")
            mediumQuestionArr.push(quesSample);
        } else if (quesSample["difficulty"] === "Hard" && hardQuestionArr.length < hardQuestionCn) {
        // console.log("inside Hard")
            hardQuestionArr.push(quesSample);
        }
    });

    totalQuestionArr.push(easyQuestionArr, mediumQuestionArr, hardQuestionArr);
    return {status : 200 , message : totalQuestionArr};
  } 

module.exports = quesBankGenerator;