class SimpleWordPredictor {
    constructor(vocabularySize, wordToNumber) {
        this.wordToNumber = wordToNumber;
        this.weights = Array(vocabularySize).fill(0).map(() => Math.random());
        this.learningRate = 0.01;
    }

    predict(currentWordIndex) {
        return this.weights[currentWordIndex];
    }

    train(currentWordIndex, nextWordIndex) {
        let prediction = this.predict(currentWordIndex);
        let error = nextWordIndex - prediction;

        // Update the weight based on the error
        this.weights[currentWordIndex] += this.learningRate * error;
    }
}

module.exports = SimpleWordPredictor;