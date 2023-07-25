class Neuron {
    constructor(numberOfWeights) {
        this.weights = new Array(numberOfWeights).fill(Math.random());
        this.bias = Math.random();
        this.output = 0; // in case I need to get it and don't wanna call any functions
    }

    activationFunction(x) {
        return 1 / (1 + Math.exp(-x));
    }

    activationFunctionDerivative(x) {
        return x * (1 - x);
    }

    // Calculate the next predicted word given the previous words (this is an array of numbers, each number corresponds to a letter, the object for this is in the NeuralNetwork class)
    calculateNextWord(prevWords) {
        console.log("--- Prev words, this.weights --- \n" + prevWords, this.weights);
        let weightedSum = 0;
        for (let i = 0; i < prevWords.length; i++) {
            weightedSum += this.weights[i] * prevWords[i];
        }
        this.output = this.activationFunction(weightedSum + this.bias);
        return this.output;
    }
}

module.exports = Neuron;