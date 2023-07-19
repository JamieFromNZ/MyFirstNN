const NeuralNetwork = require('./classes/NeuralNetwork');
const readline = require('readline');

let learningRate = 0.5;

// Create a new network with 1 input, 1 hidden neuron, and 1 output
let nn = new NeuralNetwork(1, 1, 1);

// Train the network with the training data, a learning rate of 0.1, and 1000 epochs
for (let i = 0; i < 10000; i++) {
    let input = Math.floor(Math.random() * 2);
    nn.train({input: input, target: input}, learningRate);
}

// Create readline interface
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Ask user for input
rl.question('Please enter a number (0 or 1): ', (answer) => {
    // Make sure the answer is a number
    let input = Number(answer);
    let result = nn.feed(input);

    console.log(result);

    if (result.finalOutput > 0.5) {
        console.log("The network predicts that the input is 1");
    } else {
        console.log("The network predicts that the input is not 1");
    }

    // Close the readline interface
    rl.close();
});