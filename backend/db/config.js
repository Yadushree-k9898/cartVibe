require('dotenv').config(); 

const mongoose = require('mongoose');


if (!process.env.MONGO_URI) {
  console.error('MongoDB URI is missing in the environment variables.');
  process.exit(1);  
}

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected successfully');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });
