# Text-Summarizer
<h1>Text Summarizer – Project Documentation</h1>

  <h2>Overview</h2>
  <p>
    This project is a backend-powered text summarizer built using <strong>Node.js (Express)</strong> and a <strong>Python script</strong> leveraging the <code>t5-small</code> model from Hugging Face Transformers.
    It accepts a long input paragraph and returns a summarized version based on user-selected preferences.
  </p>

  <h2>Key Features</h2>
  <ul>
    <li>Summarizes large paragraphs of text using the <strong>T5-small</strong> transformer model</li>
    <li>Supports three summary lengths: <code>short</code>, <code>medium</code>, and <code>long</code></li>
    <li>Option to return the summary in <strong>bullet point</strong> format</li>
    <li>Exposes a simple API endpoint (<code>/api/summarize</code>) that accepts JSON input</li>
  </ul>

  <h2>Tech Stack</h2>
  <ul>
    <li><strong>Node.js</strong> and <strong>Express</strong> for backend server</li>
    <li><strong>Python</strong> for ML-based summarization logic</li>
    <li><strong>Hugging Face Transformers</strong> (T5-small model)</li>
  </ul>

  <h2>API Endpoint</h2>
  <h3>POST <code>/api/summarize</code></h3>
  <p>Accepts the following JSON structure:</p>
  <pre>
{
  "text": "Your full paragraph here",
  "mode": "short" | "medium" | "long",
  "bullet_points": true | false
}
  </pre>

  <p>Returns:</p>
  <pre>
{
  "summary": "Summarized content based on selected options"
}
  </pre>

  <h2>Backend Structure</h2>
  <ul>
    <li><code>app.js</code> – Sets up Express server, handles JSON parsing, serves static files, and routes the API request to the Python script</li>
    <li><code>summarize.py</code> – Python script that uses the <code>t5-small</code> model to generate summaries</li>
    <li><code>public/</code> – Folder intended for frontend files (not discussed here)</li>
  </ul>

  <h2>Python Script</h2>
  <p>The script loads the model once and uses it to process user input. Based on the selected mode, it adjusts the maximum output length and formats the result into bullet points if requested.</p>

  <h2>How to Run</h2>
  <ol>
    <li>Ensure Python is installed and working (recommended: Python 3.9+)</li>
    <li>Install Node.js and run <code>npm install</code> to install dependencies</li>
    <li>Install Python dependencies:
      <pre>pip install transformers torch</pre>
    </li>
    <li>Start the Node server:
      <pre>node app.js</pre>
    </li>
    <li>Send a POST request to <code>/api/summarize</code> with proper JSON to test</li>
  </ol>

  <h2>Notes</h2>
  <ul>
    <li>The model used is <code>t5-small</code>, chosen for its balance between performance and speed</li>
    <li>The script supports only English input at this time</li>
    <li>For production use, you may switch to <code>t5-base</code> or fine-tuned models for better quality</li>
  </ul>
