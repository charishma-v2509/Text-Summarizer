// summaryController.js
const { spawn } = require("child_process");
const path = require("path");

const summarizeText = async (req, res) => {
  try {
    const { text, mode, bullet_points } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Text input is required." });
    }

    const pythonProcess = spawn("python", [
      path.join(__dirname, "../summarizer/summarize.py"),
    ]);

    let result = "";
    let errorOutput = "";

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on("close", (code) => {
      if (code !== 0) {
        return res
          .status(500)
          .json({ error: "Python script failed", details: errorOutput });
      }

      try {
        const parsed = JSON.parse(result);
        if (parsed.error) {
          return res.status(500).json({ error: parsed.error });
        }
        return res.status(200).json({ summary: parsed.summary });
      } catch (err) {
        return res
          .status(500)
          .json({ error: "Failed to parse Python output", raw: result });
      }
    });

    // Send data to Python script via stdin
    pythonProcess.stdin.write(
      JSON.stringify({ text, mode, bullet_points })
    );
    pythonProcess.stdin.end();
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};

module.exports = { summarizeText };
