// utils/textToSpeech.js

const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

// Creates a client
const client = new textToSpeech.TextToSpeechClient();

// Function to convert text to speech
async function convertTextToSpeech(text, outputFile) {
    const request = {
        input: { text: text },
        voice: { languageCode: 'he-IL', ssmlGender: 'FEMALE' },
        audioConfig: { audioEncoding: 'MP3' },
    };

    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(outputFile, response.audioContent, 'binary');
    console.log(`Audio content written to file: ${outputFile}`);
}

module.exports = convertTextToSpeech;
