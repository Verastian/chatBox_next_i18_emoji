import natural from 'natural';
const { PorterStemmerEs, BayesClassifier, WordTokenizer } = natural;
import intentsData from '../data/intents.json';

const tokenizer = new WordTokenizer();
let classifier = new BayesClassifier(PorterStemmerEs);

const intents = intentsData.intents;

let isInitialized = false;

export function initializeNLP() {
    if (isInitialized) {
        return;
    }

    console.log('Initializing NLP...');
    classifier = new BayesClassifier(PorterStemmerEs);

    intents.forEach(intent => {
        intent.examples.forEach(example => {
            classifier.addDocument(example, intent.name);
        });
    });

    classifier.train();
    isInitialized = true;
    console.log('NLP initialized and trained.');
}

export function processMessage(message: string): string {
    if (!isInitialized) {
        console.log('NLP not initialized. Initializing now...');
        initializeNLP();
    }

    console.log('Processing message:', message);
    const tokens = tokenizer.tokenize(message.toLowerCase());
    console.log('Tokens:', tokens);

    try {
        const intent = classifier.classify(message);
        console.log('Classified intent:', intent);

        const matchedIntent = intents.find(i => i.name === intent);

        if (matchedIntent) {
            return matchedIntent.response;
        } else {
            return "Lo siento, no entendí eso. ¿Puedes reformular tu pregunta?";
        }
    } catch (error) {
        console.error('Error classifying message:', error);
        return "Lo siento, hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo.";
    }
}