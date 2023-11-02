const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();

app.use(express.static('./public'))
app.use(express.json());

// routes
app.get('/hello', (req, res) => {
  res.json({
    ipaddress: req.socket.remoteAddress,
    language: req.headers['accept-language'],
    software: req.headers['user-agent']
  })
});

app.use('/api/v1/tasks', tasks);

// app.get('/api/v1/tasks', tasks);       - get all the tasks
// app.post('/api/v1/tasks', tasks);      - create a new task
// app.get('/api/v1/tasks/:id', tasks);       - get single task
// app.patch('/api/v1/tasks/:id', tasks);       - update task
// app.delete('/api/v1/tasks/:id', tasks);       - delete task

const port = 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`server is listneing on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
