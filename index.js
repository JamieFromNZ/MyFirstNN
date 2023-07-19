const Perceptron = require('./classes/Perceptron');
const readline = require('readline');

// Create a new perceptron
let perceptron = new Perceptron();

// Train the perceptron with the training data
for (let i = 0; i < 10000; i++) {
    let input = Math.floor(Math.random() * 2);
    let target = input;
    perceptron.train(input, target);
}

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Test the nn
rl.question('Please enter a number (0 or 1): ', (answer) => {
    // Make sure the answer is a number
    let input = Number(answer);

    let prediction = perceptron.predict(input);

    console.log(`The input ${input} is ${prediction}`);

    // Close the readline interface
    rl.close();
});