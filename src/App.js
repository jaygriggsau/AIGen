import React, { useState } from 'react';
import Header from './components/Header';

const { Configuration, OpenAIApi } = require("openai");

const App = () => {
  const [experience, setExperience] = useState('');
  const [skills, setSkills] = useState('');
  const [jobDesc, setJobDesc] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const coverLetterPrompt = "Write a cover letter for the following job: "
    try {
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: coverLetterPrompt + jobDesc + ". Link my skills to the job description. My skills are: " + skills + "and my experience is: " + experience,
        temperature: 0.7,
        max_tokens: 1555,
      });
      setResult(response.data.choices[0].text);
    } catch (err) {
      setError(err.toString());
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit}>
        <label>
          Job Description:
          <input
            type="text"
            value={jobDesc}
            onChange={e => setJobDesc(e.target.value)}
          />
        </label>
        <label>
          Your Skills:
          <input
            type="text"
            value={skills}
            onChange={e => setSkills(e.target.value)}
          />
        </label>
        <label>
          Your Experience:
          <input
            type="text"
            value={experience}
            onChange={e => setExperience(e.target.value)}
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
};

export default App;