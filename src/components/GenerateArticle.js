import React, { useState } from 'react';
const { Configuration, OpenAIApi } = require("openai");

export default function GenerateArticle (){

    const [subject, setSubject] = useState('');
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
  
  
    const configuration = new Configuration({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
    });
    

    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        const openai = new OpenAIApi(configuration);
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: "Write a long-form piece in the style of belles-lettres about the subject, explore the different schools of thought on subject, share any tactics and strategies on the subject, and other interesting insights around the subject, who are the impactful people related to the subject, and what can we learn from them? The subject is." + subject + "Format in html with paragraph tags. Where possible add curiosity driven headings with H1 between sections.Style of belles-lettres. Format with spaces arund paragraphs and titles",
          temperature: 0.7,
          max_tokens: 2500,
        });
        setResult(response.data.choices[0].text);
      } catch (err) {
        setError(err.toString());
      }
    };
  
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <label>
            Article Subject:
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
            />
          </label>
          <button type="submit">Submit</button>
        </form>
        <section>
          {error && <p>Error: {error}</p>}
          {result && <p>Result: {result}</p>}
        </section>
      </div>
    );
    
}