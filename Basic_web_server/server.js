import express from "express";
import routes from "./routing/routes.js"
const app = express();



app.use(routes)

app.listen(8000, () => console.log("Server running on 8000!"));
