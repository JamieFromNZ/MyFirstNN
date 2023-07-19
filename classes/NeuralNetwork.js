const Neuron = require('./Neuron');

class NeuralNetwork {
    constructor(inputCount, hiddenCount, outputCount) {
        // Initialize layers

        /*
        this.inputLayer = Array(inputCount).fill().map(() => new Neuron());
        this.hiddenLayer = Array(hiddenCount).fill().map(() => new Neuron());
        this.outputLayer = Array(outputCount).fill().map(() => new Neuron());
        */

        // For now, my code is only doing one neuron for simplicity
        this.inputNeuron = new Neuron();
        this.hiddenNeuron = new Neuron();
        this.outputNeuron = new Neuron();
    }

    feed(input) {
        let hiddenOutput = this.hiddenNeuron.forward(input);
        let output = this.outputNeuron.forward(hiddenOutput);
        return { finalOutput: output, hiddenOutput: hiddenOutput };
    }

    train(piece, learningRate) {
        console.log("Input:" + piece.input);
        let outputs = this.feed(piece.input);

        console.log("Hidden output " + outputs.hiddenOutput);
        console.log("Final output " + outputs.finalOutput);

        {
            // Calculate errors
            let outputError = Number(piece.target) - outputs.finalOutput;
            let hiddenError = this.outputNeuron.weight * outputError;

            // Adjust weights and biases
            this.outputNeuron.weight += learningRate * outputError * this.outputNeuron.sigmoidDerivative(outputs.finalOutput);
            this.outputNeuron.bias += learningRate * outputError;

            this.hiddenNeuron.weight += learningRate * hiddenError * this.hiddenNeuron.sigmoidDerivative(outputs.hiddenOutput);
            this.hiddenNeuron.bias += learningRate * hiddenError;
        }
        console.log("----");
    }
}

module.exports = NeuralNetwork;