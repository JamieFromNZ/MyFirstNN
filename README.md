so, here's how it works: (or will work)

I fetch data from a Wikipedia article (using wtf_wikipedia)
I make it into an array and then I assign every word in the array to a number, I save this index in the object wordToNumberConverter
then I make the array into an array of numbers (where each number corresponds to a word)

to train it, I send it 15 words at a time, I sent it the first 15 words of the article and try to predict the next word, I check if it's right or not and does some wacky stuff that I'm still working on

then, once it's trained, I should be able to send it some words and it adds more words