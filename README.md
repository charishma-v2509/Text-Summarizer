# Text-Summarizer
<h1>AI Text Summarizer</h1>
<p>A web application that uses T5 Transformer AI to generate summaries of input text with customizable length and format options.</p>

<h2>Table of Contents</h2>
<ul>
    <li><a href="#features">Features</a></li>
    <li><a href="#components">Components</a></li>
    <li><a href="#setup">Setup Instructions</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#troubleshooting">Troubleshooting</a></li>
</ul>

<h2 id="features">Features</h2>
<ul>
    <li><strong>Customizable Summary Length</strong>: Short, Medium, or Long</li>
    <li><strong>Output Formatting</strong>: Paragraph or Bullet Points</li>
    <li><strong>Dark/Light Mode</strong>: Toggleable color theme</li>
    <li><strong>Character Count</strong>: Real-time input length monitoring</li>
    <li><strong>Copy Functionality</strong>: One-click copy of generated summaries</li>
    <li><strong>Encoding Fixes</strong>: Handles special characters properly</li>
</ul>

<h2 id="components">Components</h2>

<h3>Frontend</h3>
<ul>
    <li><code>App.js</code> - Main application component with theme toggle</li>
    <li><code>SummaryForm.jsx</code> - Core summarization form with all controls</li>
    <li><code>App.css</code> - Main stylesheet</li>
    <li><code>SummaryForm.css</code> - Component-specific styles</li>
</ul>

<h3>Backend</h3>
<ul>
    <li><code>server.js</code> - Express server entry point</li>
    <li><code>app.js</code> - Express application configuration</li>
    <li><code>routes/summaryRoutes.js</code> - API endpoint routes</li>
    <li><code>controllers/summaryController.js</code> - Business logic</li>
    <li><code>summarizer/summarize.py</code> - Python T5 model integration</li>
</ul>

<h2 id="setup">Setup Instructions</h2>

<h3>Prerequisites</h3>
<ul>
    <li>Node.js (v14+)</li>
    <li>Python (v3.7+)</li>
    <li>npm (v6+)</li>
</ul>

<h3>Installation Steps</h3>
<ol>
    <li><strong>Clone the repository</strong>:
        <pre>git clone [repository-url]</pre>
    </li>
    <li><strong>Backend setup</strong>:
        <pre>cd backend
npm install
pip install transformers torch</pre>
    </li>
    <li><strong>Frontend setup</strong>:
        <pre>cd client
npm install</pre>
    </li>
    <li><strong>Environment configuration</strong>:
        <p>No environment variables required for basic setup</p>
    </li>
</ol>

<h2 id="usage">Usage</h2>
<ol>
    <li><strong>Start backend server</strong>:
        <pre>cd backend
node server.js</pre>
    </li>
    <li><strong>Start frontend development server</strong>:
        <pre>cd client
npm start</pre>
    </li>
    <li><strong>Using the application</strong>:
        <ul>
            <li>Paste text into the input box (minimum 100 characters)</li>
            <li>Select summary length (Short, Medium, Long)</li>
            <li>Choose output format (Paragraph or Bullet Points)</li>
            <li>Click "Generate Summary"</li>
            <li>Toggle dark/light mode using the button in header</li>
        </ul>
    </li>
</ol>

<h2>License</h2>
<p>This project is open-source and available under the MIT License.</p>
<h2>Notes</h2>
<ul>
  <li>The model used is <code>t5-small</code>, chosen for its balance between performance and speed</li>
  <li>The script supports only English input at this time</li>
</ul>
