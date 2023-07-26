const Neuron = require('./Neuron');

class NeuralNetwork {
    constructor(hiddenLayerSize, outputLayerSize) {
        this.hiddenLayer = Array.from({ length: hiddenLayerSize }, () => new Neuron(15000));
        this.outputLayer = Array.from({ length: outputLayerSize }, () => new Neuron(15));

        this.learningRate = 0.01;

        this.wordToNumberConverter = {};
        this.numberToWordConverter = {};
    }

    train(trainingData) {
        for (let i = 0; i < /*trainingData.length - 15*/2; i++) {
            const next15Words = trainingData.slice(i, i + 15);
            const nextWord = trainingData[i + 15];

            console.log(this.numbersArrayToTextArray(next15Words));
            console.log(this.numberToWord(nextWord));

            let prediction = this.predict(next15Words);
            console.log(this.numberToWord(prediction));
            this.backwardPropagation(nextWord, prediction, next15Words);
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

    backwardPropagation(targetWordIndex, next15Words) {
        const hiddenOutputs = this.hiddenLayer.map(hiddenNeuron => hiddenNeuron.calculateNextWord(next15Words));
        const outputOutputs = this.outputLayer.map(outputNeuron => outputNeuron.calculateNextWord(hiddenOutputs));
    
        const outputErrors = this.calculateOutputErrors(targetWordIndex, outputOutputs);
        const hiddenErrors = this.calculateHiddenErrors(outputErrors);
    
        this.updateOutputLayerWeights(outputErrors, hiddenOutputs);
        this.updateHiddenLayerWeights(hiddenErrors, next15Words);
    }    

    calculateOutputErrors(targetWordIndex, outputOutputs) {
        const outputErrors = this.outputLayer.map((neuron, index) => {
            let target = (index === targetWordIndex) ? 1 : 0;
            let output = outputOutputs[index];
            let error = output - target;
            return error;
        });
        return outputErrors;
    }
    
    calculateHiddenErrors(outputErrors) {
        const hiddenErrors = this.hiddenLayer.map((neuron, index) => {
            let error = 0;
            for(let i = 0; i < this.outputLayer.length; i++) {
                error += outputErrors[i] * this.outputLayer[i].weights[index];
            }
            return error * neuron.activationFunctionDerivative(neuron.output);
        });
        return hiddenErrors;
    }
    
    updateOutputLayerWeights(outputErrors, hiddenOutputs) {
        for(let i = 0; i < this.outputLayer.length; i++) {
            for(let j = 0; j < this.outputLayer[i].weights.length; j++) {
                let gradient = outputErrors[i] * this.outputLayer[i].activationFunctionDerivative(this.outputLayer[i].output);
                this.outputLayer[i].weights[j] -= this.learningRate * gradient * hiddenOutputs[j];
            }
            let biasGradient = outputErrors[i] * this.outputLayer[i].activationFunctionDerivative(this.outputLayer[i].output);
            this.outputLayer[i].bias -= this.learningRate * biasGradient;
        }
    }
    
    updateHiddenLayerWeights(hiddenErrors, next15Words) {
        for(let i = 0; i < this.hiddenLayer.length; i++) {
            for(let j = 0; j < this.hiddenLayer[i].weights.length; j++) {
                let gradient = hiddenErrors[i] * this.hiddenLayer[i].activationFunctionDerivative(this.hiddenLayer[i].output);
                this.hiddenLayer[i].weights[j] -= this.learningRate * gradient * next15Words[j];
            }
            let biasGradient = hiddenErrors[i] * this.hiddenLayer[i].activationFunctionDerivative(this.hiddenLayer[i].output);
            this.hiddenLayer[i].bias -= this.learningRate * biasGradient;
        }
    }    


    setWordToNumberConverter(trainingData) {
        const wordToNumber = {};
        let index = 0;
        for (let word of trainingData) {
            if (!wordToNumber[word]) {
                wordToNumber[word] = index;
                index++;
            }
        }
        this.wordToNumberConverter = wordToNumber;
    }

    setNumberToWordConverter() {
        this.numberToWordConverter = {};
        for (let word in this.wordToNumberConverter) {
            let number = this.wordToNumberConverter[word];
            this.numberToWordConverter[number] = word;
        }
    }    

    wordToNumber(word) {
        return this.wordToNumberConverter[word];
    }

    numberToWord(number) {
        return this.numberToWordConverter[number];
    }

    textArrayToNumberArray(text) {
        return text.map(word => this.wordToNumberConverter[word]);
    }

    numbersArrayToTextArray(numbers) {
        return numbers.map(number => this.numberToWordConverter[number]);
    }
}

module.exports = NeuralNetwork;