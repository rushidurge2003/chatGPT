import React, { useState } from 'react';
import GeminiClient from 'gemini-client';

const App = () => {
  const [text, setText] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    const client = new GeminiClient({ apiKey: 'YOUR_API_KEY' });
    const response = await client.generateText({ text });
    setResponse(response);
  };

  return (
    <div>
      <h1>Gemini API Demo</h1>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      <div>{response}</div>
    </div>
  );
};

export default App;
