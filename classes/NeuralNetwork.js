const Neuron = require('./Neuron');

class NeuralNetwork {
    constructor(hiddenLayerSize, outputLayerSize) {
        this.hiddenLayer = Array.from({ length: hiddenLayerSize }, () => new Neuron(15));
        this.outputLayer = Array.from({ length: outputLayerSize }, () => new Neuron(15));

        this.wordToNumberConverter = undefined;
        this.learningRate = 0.01;
    }

    setWordToNumberConverter(object) {
        this.wordToNumberConverter = object;
    }

    train(trainingData) {
        for (let i = 0; i < trainingData.length - 15; i++) {
            const next15Words = trainingData.slice(i, i + 15);
            const nextWord = trainingData[i + 15];

            let prediction = this.predict(next15Words);
            console.log(this.numberToWord(prediction));
            //this.backwardPropagation(nextWord, prediction, next15Words);
        }
    }

    predict(words) {
        const hiddenOutputs = this.hiddenLayer.map(hiddenNeuron => hiddenNeuron.calculateNextWord(words));
        console.log("Hidden outputs " + hiddenOutputs); // NaN array
        let outputOutputs = this.outputLayer.map(outputNeuron => outputNeuron.calculateNextWord(hiddenOutputs));
        console.log("Output outputs " + outputOutputs); // NaN array
        const predictionIndex = outputOutputs.indexOf(Math.max(...outputOutputs));

        return predictionIndex;
    }

    backwardPropagation(targetWordIndex, predictionWordIndex, inputs) {
        const outputErrors = this.calculateOutputErrors();
        const hiddenErrors = this.calculateHiddenErrors();

        const hiddenOutputs = this.hiddenLayer.map(hiddenNeuron => hiddenNeuron.calculateNextWord(prev15Words));
        const outputOutputs = this.outputLayer.map(outputNeuron => outputNeuron.calculateNextWord(hiddenOutputs));

        this.updateOutputLayerWeights();
        this.updateHiddenLayerWeights();
    }

    calculateOutputErrors(targetWordIndex, predictionWordIndex) {

    }

    calculateHiddenErrors(outputErrors) {

    }

    updateOutputLayerWeights(targetWordIndex, outputErrors, hiddenOutputs) {

    }

    updateHiddenLayerWeights(hiddenErrors, inputs) {

    }

    activationFunctionDerivative(x) {
        return x * (1 - x);
    }



    getWordToNumberConverter(trainingData) {
        const wordToNumber = {};
        let index = 0;
        for (let word of trainingData) {
            if (!wordToNumber[word]) {
                wordToNumber[word] = index;
                index++;
            }
        }

        return wordToNumber;
    }

    wordToNumber(word) {
        return this.wordToNumberConverter[word];
    }

    numberToWord(number) {
        return this.wordToNumberConverter[number];
    }

    textArrayToNumberArray(text) {
        return text.map(word => this.wordToNumberConverter[word]);
    }

    numbersArrayToTextArray(numbers) {
        return numbers.map(number => this.wordToNumberConverter[number]);
    }
}

module.exports = NeuralNetwork;