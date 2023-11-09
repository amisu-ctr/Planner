const express = require('express');
const app = express();
const tasks = require('./routes/tasks');
const connectDB = require('./db/connect');
require('dotenv').config();
const notFound = require('./middleware/not-found')
// Custom error middle ware handler
const errorHandleMiddlwware = require('./middleware/error-handler')

//middleware
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
app.use(notFound)
app.use(errorHandleMiddlwware ) //This assists the asyncWrapper in getting the msg errors return from schema validation or etc . if this is not set you wouldnt be getting the aproppriate error

//middlewares have to arranged well else the application would not behave well. If app.use(notFound) is placed before the other routes it will persist.

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
