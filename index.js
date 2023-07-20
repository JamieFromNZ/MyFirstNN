const SimpleWordPredictor = require('./classes/SimpleWordPredictor');
const wtf = require('wtf_wikipedia');
const readline = require('readline');

// So that we can use it as a global variable, I don't enjoy throwing it around as a parameter
let model = undefined

// Helper function to preprocess text for training
function preprocessText(text) {
    // Split the text into individual words
    return text.split(/\s+/);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Fetch data from a Wikipedia page
wtf.fetch('Artificial_intelligence').then((doc) => {
    // Extract the plain text from the Wikipedia page
    const text = doc.text();
    // Preprocess the text to get the training data
    const trainingData = preprocessText(text);

    const wordToNumber = {};
    let index = 0;
    for (let word of trainingData) {
        if (!wordToNumber[word]) {
            wordToNumber[word] = index;
            index++;
        }
    }

    model = new SimpleWordPredictor(index, wordToNumber);

    // Train the model
    for (let i = 0; i < 10000; i++) {
        for (let i = 0; i < trainingData.length - 1; i++) {
            let currentWord = wordToNumber[trainingData[i]];
            let nextWord = wordToNumber[trainingData[i + 1]];
            model.train(currentWord, nextWord);
        }
    }

    // Predict the next word after each word in the text
    for (let i = 0; i < trainingData.length - 1; i++) {
        let currentWord = wordToNumber[trainingData[i]];
        let predictedNextWord = model.predict(currentWord);
        let predictedWord = Object.keys(wordToNumber).find((word) => wordToNumber[word] === Math.round(predictedNextWord));
        console.log(`Current word: ${trainingData[i]}, predicted next word: ${predictedWord}`);
    }

    askQuestion();
}).catch((err) => {
    console.error(err);
});

function generateText(model, seedWord, length = 10) {
    const generatedText = [seedWord];
    let currentWord = model.wordToNumber[seedWord];

    // Add words to array, 2% chargeee aargh
    for (let i = 0; i < length; i++) {
        const predictedNextWord = model.predict(currentWord);
        const predictedWord = Object.keys(model.wordToNumber).find((word) => model.wordToNumber[word] === Math.round(predictedNextWord));

        generatedText.push(predictedWord);
        currentWord = model.wordToNumber[predictedWord];
    }

    return generatedText.join(' ');
}

function askQuestion() {
    rl.question('Enter the seed word for text generation: ', (seedWord) => {
        const generatedText = generateText(model, seedWord, 20);
        console.log(`Generated text: ${generatedText}`);

        askQuestion();
    });
}