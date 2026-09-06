const express = require("express");  
const app = express(); 
const port = 3000;  

app.use(express.json());  

let tasks = [   
  { id: 1, title: "git", done: false },   
  { id: 2, title: "docker", done: false } 
];  

app.get("/health", (req, res) => {   
  res.json({ status: "BROKEN", message: "API en bonne santé" }); 
});  

app.get("/tasks", (req, res) => {   
  res.json(tasks); 
});  

app.post("/tasks", (req, res) => {   
  const newTask = {     
    id: tasks.length + 1,     
    title: req.body.title,     
    done: false   
  };    
  tasks.push(newTask);   
  res.status(201).json(newTask); 
});  

if (require.main === module) {
  app.listen(port, () => {   
  console.log(`API démarré sur http://localhost:${port}`);   
});
}
module.exports = app;