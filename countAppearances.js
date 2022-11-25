/*
    Create a function to count the number of times a number appears in the input parameter
*/

let testValue = 776265327;

const countAppearances = (param) => {
    const arr = param.toString()
    const counts = {};

    for (const num of arr) {
        counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    for (let i = 0; i <= 9; i++) {
        console.log(`The number ${i} appears ${counts[i] || 0} times`);
    }
}

countAppearances(testValue);