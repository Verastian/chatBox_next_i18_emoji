import natural from 'natural';
const { PorterStemmerEs, BayesClassifier, WordTokenizer } = natural;
import intentsData from '../data/intents.json';

const tokenizer = new WordTokenizer();
let classifier = new BayesClassifier(PorterStemmerEs);

const intents = intentsData.intents;

let isInitialized = false;
let conversationContext = '';

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

export function processMessage(message: string): any {
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
            let response = matchedIntent.response;

            // Aplicar lógica basada en el contexto
            if (intent === 'servicios' && conversationContext === 'presupuesto') {
                if (Array.isArray(response)) {
                    response = [...response, { type: 'text', content: "Teniendo en cuenta tu interés en el presupuesto, ¿hay algún servicio específico de desarrollo web sobre el que te gustaría obtener una cotización?" }];
                } else {
                    response = [{ type: 'text', content: response }, { type: 'text', content: "Teniendo en cuenta tu interés en el presupuesto, ¿hay algún servicio específico de desarrollo web sobre el que te gustaría obtener una cotización?" }];
                }
            } else if (intent === 'presupuesto' && conversationContext === 'servicios') {
                if (Array.isArray(response)) {
                    response = [...response, { type: 'text', content: "Basándonos en los servicios de desarrollo web que mencionaste, podemos preparar un presupuesto personalizado. ¿Te gustaría que te contacte un asesor para discutir los detalles?" }];
                } else {
                    response = [{ type: 'text', content: response }, { type: 'text', content: "Basándonos en los servicios de desarrollo web que mencionaste, podemos preparar un presupuesto personalizado. ¿Te gustaría que te contacte un asesor para discutir los detalles?" }];
                }
            } else if (intent === 'tecnologias' && (conversationContext === 'servicios' || conversationContext === 'presupuesto')) {
                if (Array.isArray(response)) {
                    response = [...response, { type: 'text', content: "Estas tecnologías nos permiten ofrecer soluciones de desarrollo web robustas y escalables. ¿Tienes algún requerimiento técnico específico para tu proyecto?" }];
                } else {
                    response = [{ type: 'text', content: response }, { type: 'text', content: "Estas tecnologías nos permiten ofrecer soluciones de desarrollo web robustas y escalables. ¿Tienes algún requerimiento técnico específico para tu proyecto?" }];
                }
            }

            // Actualizar el contexto de la conversación
            conversationContext = intent;

            return response;
        } else {
            return [{ type: 'text', content: "Lo siento, no entendí eso. ¿Podrías reformular tu pregunta sobre nuestros servicios de desarrollo web?" }];
        }
    } catch (error) {
        console.error('Error classifying message:', error);
        return [{ type: 'text', content: "Lo siento, hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo o pregunta sobre nuestros servicios de desarrollo web de otra manera." }];
    }
}