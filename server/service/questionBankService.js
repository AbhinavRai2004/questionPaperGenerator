const quesSample = require("../questionStore");

const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const quesBankGenerator = (req) => {
    const userInput = req.body;

    if (!userInput || !userInput["easy"] || !userInput["totalMarks"] || !userInput["medium"] || !userInput["hard"]) 
    {
        return { status: 400, message: {"Error" : "Missing Required Parameter"} };
    }
    if(userInput['totalMarks'] < 0){
        return {status : 400 , message : {"Error" : "Negative values are not allowed for total marks or difficulty levels."}}
    }

    const easyUserInputArr = Object.entries(userInput["easy"]);
    const mediumUserInputArr = Object.entries(userInput["medium"]);
    const hardUserInputArr = Object.entries(userInput["hard"]);

    let easyMark = 0,mediumMark = 0,hardMark = 0;

    for(let i = 0; i < easyUserInputArr.length ; i++)
    {  
    if(easyUserInputArr[i][1] < 0)
    {
        return {status : 400 , message : {"Error" : "Negative values are not allowed for total marks or difficulty levels."}}
    }
    easyMark += easyUserInputArr[i][1];
    if(easyMark > 100) {
        return { status:400, message : {"Error" : "Individual difficulty level percentage must be less than or equal to 100"}}
    }
    }

    for(let i = 0; i < mediumUserInputArr.length ; i++)
    {  
        if(mediumUserInputArr[i][1] < 0)
        {
            return {status : 400 , message : {"Error" : "Negative values are not allowed for total marks or difficulty levels."}}
        }
        mediumMark += mediumUserInputArr[i][1];
        if(mediumMark > 100) {
            return { status:400, message : {"Error" : "Individual difficulty level percentage must be less than or equal to 100"}}
        }
    }

    for(let i = 0; i < hardUserInputArr.length ; i++)
    {    
        if(hardUserInputArr[i][1] < 0)
        {
            return {status : 400 , message : {"Error" : "Negative values are not allowed for total marks or difficulty levels."}}
        }
        hardMark += hardUserInputArr[i][1];
        if(hardMark > 100) {
            return { status:400, message : {"Error" : "Individual difficulty level percentage must be less than or equal to 100"}}
        }
    }

    if(easyMark + mediumMark + hardMark  != 100 )
    {
        return {status : 400, message : {"Error" : "The sum of difficulty percentages must equal to 100."} };
    }

    for(let i = 0; i < easyUserInputArr.length ; i++)
    {  
      if((((userInput['totalMarks']*easyUserInputArr[i][1])/100) % 5 != 0)){
        return { status: 400, message : { "Error" : 
               [ "The total marks cannot be distributed according to the specified percentages.",
                 "Easy Question Mark Distribution must be in multiple of 5", 
                 "Medium Question Mark Distribution must be in multiple of 10",
                 "Hard Question Mark Distribution must be in multiple of 15"] 
     }};
    }
    }

    for(let i = 0; i < mediumUserInputArr.length ; i++)
    {  
        if((((userInput['totalMarks']*mediumUserInputArr[i][1])/100) % 10 != 0)){
            return { status: 400, message : { "Error" : 
                  [ "The total marks cannot be distributed according to the specified percentages.",
                    "Easy Question Mark Distribution must be in multiple of 5", 
                    "Medium Question Mark Distribution must be in multiple of 10",
                    "Hard Question Mark Distribution must be in multiple of 15"] 
            }};
        }
    }
    for(let i = 0; i < hardUserInputArr.length ; i++)
    {    
       if((((userInput['totalMarks']*hardUserInputArr[i][1])/100) % 15 != 0))
        {
            return { status: 400, message : { "Error" : 
                    [ "The total marks cannot be distributed according to the specified percentages.",
                    "Easy Question Mark Distribution must be in multiple of 5", 
                    "Medium Question Mark Distribution must be in multiple of 10",
                    "Hard Question Mark Distribution must be in multiple of 15"] 
          }};
        }
    }
    
  const easyQuestionSet = [];
  const mediumQuestionSet = [];
  const hardQuestionSet = [];
  let totalEasyQuestion = 0;
  let totalMediumQuestion = 0;
  let totalHardQuestion = 0;
  
  for (let i = 0; i < easyUserInputArr.length; i++) {
    let easyQuestionTopic = easyUserInputArr[i][0];
    let easyQuestion = Math.ceil((userInput["totalMarks"] * easyUserInputArr[i][1]) / 100 / 5);
    totalEasyQuestion += easyQuestion;
    easyQuestionSet.push([easyQuestionTopic, easyQuestion]);
  }

  for (let i = 0; i < mediumUserInputArr.length; i++) {
    let mediumQuestionTopic = mediumUserInputArr[i][0];
    let mediumQuestion = Math.ceil((userInput["totalMarks"] * mediumUserInputArr[i][1]) / 100 / 10);
    totalMediumQuestion += mediumQuestion;
    mediumQuestionSet.push([mediumQuestionTopic, mediumQuestion]);
  }

  for (let i = 0; i < hardUserInputArr.length; i++) {
    let hardQuestionTopic = hardUserInputArr[i][0];
    let hardQuestion = Math.ceil((userInput["totalMarks"] * hardUserInputArr[i][1]) / 100 / 15);
    totalHardQuestion += hardQuestion;
    hardQuestionSet.push([hardQuestionTopic, hardQuestion]);
  }

  shuffleArray(quesSample);

  const easyQuestionArr = [];
  const mediumQuestionArr = [];
  const hardQuestionArr = [];
  const totalQuestionArr = [];

  for (let itr = 0; itr < quesSample.length; itr++) {
    if (
      quesSample[itr]["difficulty"] === "Easy" &&
      easyQuestionArr.length < totalEasyQuestion
    ) {
      for (let j = 0; j < easyQuestionSet.length; j++) {
        if (quesSample[itr]["topic"] === easyQuestionSet[j][0])
          if (easyQuestionSet[j][1] != 0) {
            easyQuestionArr.push(quesSample[itr]);
            easyQuestionSet[j][1] = easyQuestionSet[j][1] - 1;
          }
      }
    } else if (
      quesSample[itr]["difficulty"] === "Medium" &&
      mediumQuestionArr.length < totalMediumQuestion
    ) {
      for (let j = 0; j < mediumQuestionSet.length; j++) {
        if (quesSample[itr]["topic"] === mediumQuestionSet[j][0])
          if (mediumQuestionSet[j][1] != 0) {
            mediumQuestionArr.push(quesSample[itr]);
            mediumQuestionSet[j][1] = mediumQuestionSet[j][1] - 1;
          }
      }
    } else if (
      quesSample[itr]["difficulty"] === "Hard" &&
      hardQuestionArr.length < totalHardQuestion
    ) {
      for (let j = 0; j < hardQuestionSet.length; j++) {
        if (quesSample[itr]["topic"] === hardQuestionSet[j][0])
          if (hardQuestionSet[j][1] != 0) {
            console.log("hi");
            hardQuestionArr.push(quesSample[itr]);
            hardQuestionSet[j][1] = hardQuestionSet[j][1] - 1;
          }
      }
    }
  }
  totalQuestionArr.push(easyQuestionArr, mediumQuestionArr, hardQuestionArr);
  // console.log(easyQuestionArr,mediumQuestionArr,hardQuestionArr);

  return { status: 200, message: totalQuestionArr };
};
module.exports = quesBankGenerator;
