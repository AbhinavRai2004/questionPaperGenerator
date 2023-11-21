const quesSample = require('../questionStore');

// Function to shuffle an array using Fisher-Yates algorithm

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const quesBankGenerator = (req) => {
    const userInput = req.body;

    // Ensure the 'mark', 'easy', 'medium', and 'hard' properties exist in the request body
    if (!userInput || !userInput['totalMark'] || !userInput['easy'] || !userInput['medium'] || !userInput['hard'])
    {
        console.log('Missing required parameters');
        return;
    }
    
    // handling edge cases.
    
    if(userInput['totalMark'] < 0 || userInput['easy'] < 0 || userInput['medium'] < 0 || userInput['hard'] < 0)
    {
        // console.log("Negative values are not allowed for total marks or difficulty levels.");
        return {message: "Error: Negative values are not allowed for total marks or difficulty levels."};
    }
    
    if((((userInput['totalMark']*userInput['easy'])/100) % 5 != 0) || 
       (((userInput['totalMark']*userInput['medium'])/100) % 10 != 0) ||
       (((userInput['totalMark']*userInput['hard'])/100) % 15 != 0))
    {
        // console.log(" The total marks cannot be distributed according to the specified percentages.");
        return { message: "Error: The total marks cannot be distributed according to the specified percentages."};
    }

    if((userInput['totalMark'] <= ((userInput['easy']*userInput['totalMark'])/100)) ||
       (userInput['totalMark'] <= ((userInput['medium']*userInput['totalMark'])/100)) ||
       (userInput['totalMark'] <= ((userInput['hard']*userInput['totalMark'])/100))  )
    {
        // console.log("The sum of difficulty percentages exceeds the total percentage of marks.");
        return { message: "Error: The sum of difficulty percentages exceeds the total percentage of marks." };
    }

    // Ensure the result is an integer

    const easyQuestionCn = Math.ceil(((userInput['totalMark'] * userInput['easy']) / 100)/5);  
    const mediumQuestionCn = Math.ceil(((userInput['totalMark'] * userInput['medium']) / 100)/10);
    const hardQuestionCn = Math.ceil(((userInput['totalMark'] * userInput['hard']) / 100)/15);

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
    return totalQuestionArr;
} 

module.exports = quesBankGenerator;