// Basic imports for the project
import express from "express";
import ejs from "ejs";
import path from "path";
import url from "url";
import fs from "fs";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Basic setup for the project
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Render the index page with the list of files
app.get("/", (req, res) => {
  const directoryPath = path.join(__dirname, "files");

  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      console.error("Error reading directory:", err);
      return res.status(500).send("Internal Server Error");
    }
    res.render("htmlfiles/index", { files: files });
  });
});

// Render a specific file's content
app.get("/file/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "files", `${filename}`);

  fs.readFile(filePath, "utf-8", (err, fileContent) => {
    if (err) {
      console.error(`Error reading file: ${err}`);
      console.log(err)
      return res.status(500).send("Internal Server Error");
    }
    res.render("htmlfiles/file", { filename: filename, filedetails: fileContent });
  });
});

// Handle file creation
app.post("/create", (req, res) => {
  const fileName = req.body.title.split(" ").join("");
  const filePath = path.join(__dirname, "files", `${fileName}.txt`);

  fs.writeFile(filePath, req.body.details, (err) => {
    if (err) {
      console.error(`Error writing file: ${err}`);
      return res.status(500).send("Internal Server Error");
    }
    console.log(`File ${fileName}.txt created successfully`);
    res.redirect("/");
  });
});

app.listen(3000, () => console.log("Server running on 3000"));
