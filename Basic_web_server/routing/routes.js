import express from "express";
const route = express.Router();


// Different Routing experiences
route.get("/", (req, res) => {
  res.send("Home Page");
});

route.get("/about",(req,res)=>{
    res.send("About Page")
})

route.get("/contact",(req,res)=>{
    res.send("Contact Page")
})

route.get("/*",(req,res)=>{
    res.status(404).send("OOPs looks like page doesn't exist")
})

// Different http methods
route.post("/",(req,res)=>{
    res.send("Uploading something!")
})

route.put("/",(req,res)=>{
    res.send("Updating something!")
})

route.delete("/",(req,res)=>{
    res.send("Deleting something!")
})

export default route