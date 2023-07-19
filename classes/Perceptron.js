class Perceptron {
    constructor() {
        this.weight = Math.random();
        this.bias = Math.random();
        this.learningRate = 0.1; 
    }

    predict(input) {
        let weightedSum = this.weight * input + this.bias;
        return this.activationFunction(weightedSum); 
    }

    activationFunction(x) {
        return x >= 0 ? 1 : 0;
    }

    train(input, target) {
        let prediction = this.predict(input);
        let error = target - prediction;

        // Update weights and bias (back propagation)
        this.weight += this.learningRate * error * input;
        this.bias += this.learningRate * error;
    }
}

module.exports = Perceptron;