const wtf = require('wtf_wikipedia');
const readline = require('readline');
const SimpleWordPredictor = require('./classes/SimpleWordPredictor');

// Global variable
let model = undefined;

// Helper function to preprocess text for training
function preprocessText(text) {
    // Split the text into individual words
    return text.split(/\s+/);
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

wtf.fetch('World_War_II').then((doc) => {
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

    model = new SimpleWordPredictor(index, wordToNumber, [50, 30]);

    // Train the model
    for (let i = 0; i < 10000; i++) {
        for (let i = 0; i < trainingData.length - 1; i++) {
            let currentWord = wordToNumber[trainingData[i]];
            let nextWord = wordToNumber[trainingData[i + 1]];
            model.train(currentWord, nextWord);
        }
    }

    // Function to generate text from multiple seed words
    function generateText(model, seedWords, length = 10) {
        const generatedText = seedWords.slice(); // Copy seed words to the generated text array
        let currentWordIndex = seedWords.map(word => wordToNumber[word]);

        // Add words to the array
        for (let i = 0; i < length; i++) {
            const predictedNextWords = currentWordIndex.map(index => model.predict(index));
            const predictedWordIndices = predictedNextWords.map(nextWord =>
                Object.values(model.wordToNumber).findIndex(value => value === Math.round(nextWord))
            );
            const predictedWords = predictedWordIndices.map(index => Object.keys(model.wordToNumber)[index]);

            generatedText.push(...predictedWords);
            currentWordIndex = predictedWordIndices;
        }

        return generatedText.join(' ');
    }

    function askQuestion() {
        rl.question('Enter the seed words (space-separated) for text generation: ', (seedWordsInput) => {
            const seedWords = seedWordsInput.split(/\s+/);
            const generatedText = generateText(model, seedWords, 20);
            console.log(`Generated text: ${generatedText}`);

            askQuestion();
        });
    }

    askQuestion();
}).catch((err) => {
    console.error(err);
});