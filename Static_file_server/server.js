import express from "express";
import path from "path";
import url from "url";
import process from "process";
const app = express();

// Convert import.meta.url to a file path string
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the "dist" directory
app.use(express.static(path.join(__dirname, "dist")));

// Serve the index.html file for all other routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
