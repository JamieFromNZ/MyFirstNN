const NeuralNetwork = require('./classes/NeuralNetwork');
const readline = require('readline');

// Create some training data, it figures out if the number is 1
let data = [
    {input: 1, target: true},
    {input: 0, target: false},
];

let learningRate = 0.5;

// Create a new network with 1 input, 1 hidden neuron, and 1 output
let nn = new NeuralNetwork(1, 1, 1);

// Train the network with the training data, a learning rate of 0.1, and 1000 epochs
for (let i = 0; i < 10000; i++) {
    nn.train(data, learningRate);
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