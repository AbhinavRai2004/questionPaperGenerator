const users = require('../questionSample');

// Function to shuffle an array using Fisher-Yates algorithm
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

const cal = (req) => {
    console.log("hi");

    const obj = req.body;

    // Ensure the 'mark', 'easy', 'medium', and 'hard' properties exist in the request body
    if (!obj || !obj['mark'] || !obj['easy'] || !obj['medium'] || !obj['hard']) {
        console.log('Missing required parameters');
        return;
    }

    const mark = obj['mark'];
    const easy = obj['easy'];
    const medium = obj['medium'];
    const hard = obj['hard'];
   
    console.log(mark);
    console.log(easy);
    console.log(medium);
    console.log(hard);

    const e = (mark * easy) / 100;
    const m = (mark * medium) / 100;
    const h = (mark * hard) / 100;

    console.log(e);
    console.log(m);
    console.log(h);

    const Ecn = Math.ceil(e / 5); // Ensure the result is an integer
    const Mcn = Math.ceil(m / 10);
    const Hcn = Math.ceil(h / 15);

    console.log(Ecn);
    console.log(Mcn);
    console.log(Hcn);

    // Shuffle the users array
    shuffleArray(users);

    const eArr = [];
    const mArr = [];
    const hArr = [];
    const tArr = [];
    
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        if (user["difficulty"] === "Easy" && eArr.length < Ecn) {
            console.log("inside Easy")
            eArr.push(user);
        } else if (user["difficulty"] === "Medium" && mArr.length < Mcn) {
            console.log("inside Medium")
            mArr.push(user);
        } else if (user["difficulty"] === "Hard" && hArr.length < Hcn) {
            console.log("inside Hard")
            hArr.push(user);
        }
    }

    tArr.push(eArr, mArr, hArr);
    console.log(tArr);
    return tArr;
} 
module.exports = cal;