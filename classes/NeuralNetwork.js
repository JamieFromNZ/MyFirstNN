const Neuron = require('./Neuron');

class NeuralNetwork {
    constructor(inputCount, hiddenCount, outputCount) {
        // Initialize layers
        this.inputLayer = Array(inputCount).fill().map(() => new Neuron());
        this.hiddenLayer = Array(hiddenCount).fill().map(() => new Neuron());
        this.outputLayer = Array(outputCount).fill().map(() => new Neuron());
    }

    feed(input) {
        let hiddenOutput = this.hiddenLayer.map(neuron => neuron.forward(input));
        let output = this.outputLayer.map(neuron => neuron.forward(hiddenOutput[0]));
        return { finalOutput: output, hiddenOutput: hiddenOutput };
    }

    train(data, learningRate) {
        for (let piece of data) {
            console.log("Input:" + piece.input);
            let outputs = this.feed(piece.input);

            console.log("Hidden output " + outputs.hiddenOutput);
            console.log("Final output " + outputs.finalOutput);

            {
                // Calculate errors
                let outputError = Number(piece.target) - outputs.finalOutput[0];
                let hiddenError = this.outputLayer[0].weight * outputError;

                // Adjust weights and biases
                for (let i = 0; i < this.outputLayer.length; i++) {
                    let neuron = this.outputLayer[i];
                    neuron.weight += learningRate * outputError * neuron.sigmoidDerivative(outputs.finalOutput[0]);
                    //neuron.bias += learningRate * outputError;
                }
                for (let i = 0; i < this.hiddenLayer.length; i++) {
                    let neuron = this.hiddenLayer[i];
                    neuron.weight += learningRate * hiddenError * neuron.sigmoidDerivative(outputs.hiddenOutput[0]);
                    //neuron.bias += learningRate * hiddenError;
                }                
            }

            console.log("----");
        }
    }
}

module.exports = NeuralNetwork;