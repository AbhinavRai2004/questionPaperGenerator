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

    if (!userInput || !userInput['totalMarks'] || !userInput['easy'] || !userInput['medium'] || !userInput['hard'])
    {
        // console.log('Missing required parameters');
        return {status : 400 , returnObj : "Error : Missing Required "};
    }
    
    // handling edge cases.
    
    if(userInput['totalMarks'] < 0 || userInput['easy'] < 0 || userInput['medium'] < 0 || userInput['hard'] < 0)
    {
        // console.log("Negative values are not allowed for total marks or difficulty levels.");
        return {status : 400 , returnObj : "Error: Negative values are not allowed for total marks or difficulty levels."};
    }

    if((userInput['easy'] + userInput['medium'] + userInput['hard'])  != 100 )
    {
        // console.log("The sum of difficulty percentages must equal to 100.");
        return {status : 400, returnObj : "Error: The sum of difficulty percentages must equal to 100." };
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
 
    if(((userInput['totalMarks'] * userInput['easy']) / 100) % 5 != 0)
    {
        const remaningEasyMarks = ((userInput['totalMarks'] * userInput['easy']) / 100) % 5;
        let cn = 1;

        quesSample.forEach((quesSample) =>{
        if(quesSample["difficulty"] === "Easy" && quesSample["marks"] === remaningEasyMarks && cn == 1)
        {
            easyQuestionArr.push(quesSample);
            cn = 0;
        }  
    });
    } 

    if(((userInput['totalMarks'] * userInput['medium']) / 100) % 10 != 0){
        const remaningMediumMarks = ((userInput['totalMarks'] * userInput['medium']) / 100) % 10;
        let cn = 1;

        quesSample.forEach((quesSample) =>{
        if(quesSample["difficulty"] === "Medium" && quesSample["marks"] === remaningMediumMarks && cn == 1)
        { 
            mediumQuestionArr.push(quesSample);
            cn = 0;
        }
      });
    }

    if(((userInput['totalMarks'] * userInput['hard']) / 100) % 15 != 0){
        const remaningHardMarks = ((userInput['totalMarks'] * userInput['hard']) / 100) % 15;
        let cn = 1;

        quesSample.forEach((quesSample) =>{
        if(quesSample["difficulty"] === "Hard" && quesSample["marks"] === remaningHardMarks && cn == 1)
        {
            hardQuestionArr.push(quesSample);
            cn = 0;
        }
    });

    quesSample.forEach((quesSample) => {
        if (quesSample["difficulty"] === "Easy" && easyQuestionArr.length - 1 < easyQuestionCn && quesSample["marks"] === 5) {
            //console.log("inside Easy")
            easyQuestionArr.push(quesSample);
        } else if (quesSample["difficulty"] === "Medium" && mediumQuestionArr.length-1 < mediumQuestionCn && quesSample["marks"] === 10) {
           // console.log("inside Medium")
            mediumQuestionArr.push(quesSample);
        } else if (quesSample["difficulty"] === "Hard" && hardQuestionArr.length-1 < hardQuestionCn && quesSample["marks"] === 15) {
           // console.log("inside Hard")
            hardQuestionArr.push(quesSample);
        }
     });
  }
    else{
        quesSample.forEach((quesSample) => {
            if (quesSample["difficulty"] === "Easy" && easyQuestionArr.length < easyQuestionCn && quesSample["marks"] === 5) {
                //console.log("inside Easy")
                easyQuestionArr.push(quesSample);
            } else if (quesSample["difficulty"] === "Medium" && mediumQuestionArr.length < mediumQuestionCn && quesSample["marks"] === 10) {
            // console.log("inside Medium")
                mediumQuestionArr.push(quesSample);
            } else if (quesSample["difficulty"] === "Hard" && hardQuestionArr.length < hardQuestionCn && quesSample["marks"] === 15) {
            // console.log("inside Hard")
                hardQuestionArr.push(quesSample);
            }
        });
    }

    totalQuestionArr.push(easyQuestionArr, mediumQuestionArr, hardQuestionArr);
    return {status : 200 , returnObj : totalQuestionArr};
  } 

module.exports = quesBankGenerator;