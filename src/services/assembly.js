const { AssemblyAI } = require('assemblyai');
const { join } = require('node:path');
const fs = require('fs'); // Thêm dòng này để require 'fs' module
const path = require('path');

const assembly = (socket, blob) => {
  const fileBuffer = Buffer.from(new Uint8Array(blob));
  const fileName = Date.now() + '.m4a';
  const filePath = join(__dirname, '../../uploads', fileName);
  fs.writeFile(filePath, fileBuffer, (err) => {
    if (err) {
      console.error('Error saving file:', err);
    } else {
      console.log('File saved successfully:', filePath);
    }
  });

  socket.emit('uploadSuccess', 'upload success');
  const client = new AssemblyAI({
    apiKey: 'aceaec8a467c4927a5aa0252a6e6604b',
  });

  // const FILE_URL =
  //   'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3';

// You can also transcribe a local file by passing in a file path
const FILE_URL = 'https://simplecode.online/uploads/' + fileName;
console.log('FILE_URL', FILE_URL);

// Request parameters
  const data = {
    audio_url: FILE_URL
  }

  const run = async () => {
    const transcript = await client.transcripts.transcribe(data);
    console.log('transcript', transcript);
    console.log('transcript.text', transcript.text);
    socket.emit('translate', 'translate...' + transcript.text + '...');
    return transcript.text;
  };

  run().then();

}

module.exports = assembly
