const wtf = require('wtf_wikipedia');
const readline = require('readline');

const NeuralNetwork = require('./classes/NeuralNetwork');

let model = undefined;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

wtf.fetch('Profanity').then((doc) => {
    // We are transforming the text from the article into a form that our Neural Network can read
    const text = doc.text();
    const textArray = text.split(/\s+/);

    let uniqueWords = new Set(textArray);
    model = new NeuralNetwork(15, uniqueWords.size);

    model.setWordToNumberConverter(textArray);
    model.setNumberToWordConverter();

    let trainingData = model.textArrayToNumberArray(textArray, model.wordToNumberConverter);
    model.train(trainingData);

    function generateText(seedWords, length = 10) {
        const generatedText = seedWords.split(/\s+/);
        const generatedTextNumbers = model.textArrayToNumberArray(generatedText, model.wordToNumberConverter);

        for (let i = 0; i < length; i++) {
            const predictedNextWordIndex = model.predict(generatedTextNumbers);
            generatedTextNumbers.push(predictedNextWordIndex);
        }

        return model.numbersArrayToTextArray(generatedTextNumbers).join(' ');
    }

    function askQuestion() {
        rl.question('Enter the seed words (space-separated) for text generation: ', (seedWordsInput) => {
            const generatedText = generateText(seedWordsInput, 20);
            console.log(`Generated text: ${generatedText}`);

            askQuestion();
        });
    }

    askQuestion();
}).catch((err) => {
    console.error(err);
});