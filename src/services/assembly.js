const { AssemblyAI } = require('assemblyai');

const assembly = (name) => {
  console.log('name', name);
  // Start by making sure the `assemblyai` package is installed.
// If not, you can install it by running the following command:
// npm install assemblyai

  const client = new AssemblyAI({
    apiKey: 'aceaec8a467c4927a5aa0252a6e6604b',
  });

  // const FILE_URL =
  //   'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3';

// You can also transcribe a local file by passing in a file path
const FILE_URL = 'https://english.simplecode.online/upload/' + name;
console.log('FILE_URL', FILE_URL);

// Request parameters
  const data = {
    audio_url: FILE_URL
  }

  const run = async () => {
    const transcript = await client.transcripts.transcribe(data);
    console.log(transcript.text);
    return transcript.text;
  };

  run().then();

}

module.exports = assembly
