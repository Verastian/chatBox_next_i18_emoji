import natural from 'natural';
const { PorterStemmerEs, BayesClassifier, WordTokenizer } = natural;

const tokenizer = new WordTokenizer();
const classifier = new BayesClassifier(PorterStemmerEs);
const intents = [
    {
        name: 'saludo',
        examples: ['Hola', 'Buenos días', 'Buenas tardes', 'Qué tal'],
        response: '¡Hola! ¿En qué puedo ayudarte hoy?'
    },
    {
        name: 'despedida',
        examples: ['Adiós', 'Hasta luego', 'Chao', 'Nos vemos'],
        response: 'Gracias por tu visita. ¡Hasta pronto!'
    },
    {
        name: 'problema',
        examples: ['Tengo un problema', 'No funciona', 'Hay un error', 'Algo está mal'],
        response: 'Lamento escuchar que tienes un problema. ¿Puedes darme más detalles para poder ayudarte mejor?'
    },
    {
        name: 'ayuda',
        examples: ['Necesito ayuda', 'Cómo puedo', 'Me puedes ayudar', 'Tengo una duda'],
        response: 'Estoy aquí para ayudarte. Por favor, dime más sobre lo que necesitas.'
    },
];

export function initializeNLP() {
    intents.forEach(intent => {
        intent.examples.forEach(example => {
            classifier.addDocument(example, intent.name);
        });
    });

    classifier.train();
}

export function processMessage(message: string): string {
    const tokens = tokenizer.tokenize(message.toLowerCase());
    const intent = classifier.classify(message);

    const matchedIntent = intents.find(i => i.name === intent);

    if (matchedIntent) {
        return matchedIntent.response;
    } else {
        return "Lo siento, no entendí eso. ¿Puedes reformular tu pregunta?";
    }
}