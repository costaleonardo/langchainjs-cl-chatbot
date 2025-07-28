require('dotenv').config();
const { ChatOpenAI } = require('@langchain/openai');
const { HumanMessage } = require('@langchain/core/messages');
const readline = require('readline');
const { log } = require('console');

// Initialize the OpenAI model
const chat = new ChatOpenAI({
  modelName: 'gpt-3.5-turbo',
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
});

// Set up readline for interactive input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// function to handle user input and get LLM response
async function askQuestion() {
    rl.question('You: ', async ( input ) => {
        if ( input.toLowerCase() == 'leave' ) {
            console.log('Goodbye!');
            rl.close();
            return;
        }

        try {
            // send user input to the LLM
            const response = await chat.invoke( [new HumanMessage( input )] );
            console.log( 'Bot:', response.content );

            // prompt for next input
            askQuestion();
        } catch ( e ) {
            console.log( 'Error:', e.message );
            askQuestion(); // continue prompting even if there's an error
        }
    });
}

// start the chatbot
console.log( 'AI Chatbot - Type "leave" to exit' );
askQuestion();