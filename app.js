const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notFound = require('./middleware/not-found');
// Custom Error Handler
const errorHandler = require('./middleware/error-handler');

// Middleware
// app.use(express.static('./public')) // Using Static files
app.use(express.json());
app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`);
    })
  } catch (error) {
    console.log(error);
  }
}

start() // Start the server