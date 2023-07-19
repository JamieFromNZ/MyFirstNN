class Neuron {
    constructor() {
        // random values between -1 and 1
        this.weight = Math.random() * 2 - 1;
        this.bias = Math.random() * 2 - 1;
    }

    // The activation function (we'll use the sigmoid function)
    activate(x) {
        return 1 / (1 + Math.exp(-x));
    }

    // Feedforward function (weighted sum of inputs, passed through activation function)
    forward(input) {
        return this.activate(this.weight * input + this.bias);
    }

    // The derivative of the activation function (sigmoid functi]
    sigmoidDerivative(x) {
        const fx = this.activate(x);
        return fx * (1 - fx);
    }
}

module.exports = Neuron;