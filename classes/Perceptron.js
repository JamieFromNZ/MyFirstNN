class Perceptron {
    constructor() {
        this.weights = Math.random(); // random weights
        this.bias = Math.random(); // random bias
        this.learningRate = 0.1; 
    }

    predict(input) {
        let weightedSum = this.weights * input + this.bias;
        return this.activationFunction(weightedSum); 
    }

    activationFunction(x) {
        // activation function
        return x >= 0 ? 1 : 0;
    }

    train(input, target) {
        let prediction = this.predict(input);
        let error = target - prediction;

        // Update weights and bias
        this.weights += this.learningRate * error * input;
        this.bias += this.learningRate * error;
    }
}


module.exports = Perceptron;