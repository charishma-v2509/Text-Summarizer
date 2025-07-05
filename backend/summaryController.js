const { spawn } = require("child_process");
const path = require("path");

const summarizeText = async (req, res) => {
  try {
    const { text, mode = "medium", bullet_points = false } = req.body;

    // Input validation
    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Text input is required." });
    }

    // Validate mode
    const validModes = ["short", "medium", "long"];
    if (!validModes.includes(mode)) {
      return res.status(400).json({ 
        error: "Invalid mode. Use 'short', 'medium', or 'long'." 
      });
    }

    // Validate bullet_points is boolean
    if (typeof bullet_points !== "boolean") {
      return res.status(400).json({ 
        error: "bullet_points must be a boolean value." 
      });
    }

    const pythonProcess = spawn("python", [
      path.join(__dirname, "../summarizer/summarize.py"),
    ]);

    let result = "";
    let errorOutput = "";

    // Set timeout for the Python process (e.g., 30 seconds)
    const timeout = setTimeout(() => {
      pythonProcess.kill();
      return res.status(500).json({ 
        error: "Processing timeout exceeded" 
      });
    }, 30000);

    pythonProcess.stdout.on("data", (data) => {
      result += data.toString();
    });

    pythonProcess.stderr.on("data", (data) => {
      errorOutput += data.toString();
    });

    pythonProcess.on("close", (code) => {
      clearTimeout(timeout);
      
      if (code !== 0) {
        return res.status(500).json({ 
          error: "Python script failed", 
          details: errorOutput 
        });
      }

      try {
        const parsed = JSON.parse(result);
        if (parsed.error) {
          return res.status(500).json({ error: parsed.error });
        }
        return res.status(200).json({ summary: parsed.summary });
      } catch (err) {
        return res.status(500).json({ 
          error: "Failed to parse Python output", 
          raw: result 
        });
      }
    });

    // Handle stdin errors
    pythonProcess.stdin.on("error", (err) => {
      clearTimeout(timeout);
      return res.status(500).json({ 
        error: "Failed to send data to Python process",
        details: err.message 
      });
    });

    // Send data to Python script
    pythonProcess.stdin.write(
      JSON.stringify({ text, mode, bullet_points })
    );
    pythonProcess.stdin.end();

  } catch (err) {
    res.status(500).json({ 
      error: "Internal Server Error", 
      details: err.message 
    });
  }
};

module.exports = { summarizeText };
