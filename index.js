const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyparser = require('body-parser');
const path = require('path');
const cors = require('cors');

const vendorsRoutes = require('./routes/vendorRoutes');
const firmroutes = require('./routes/firmRoutes');
const { addFirm, deleteFirmById } = require('./controllers/firmController');
const productroutes = require('./routes/productRoutes');

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

const app = express();

const port = process.env.PORT || 4000;

// Use CORS middleware before defining routes
app.use(cors({
  origin: ['http://localhost:5173','https://final-foodie-frontend.vercel.app/'], // Allow only this origin
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specific methods
  credentials: true, // Allow cookies to be sent
}));

app.use(bodyparser.json());
app.use('/firm', firmroutes);
app.use('/product', productroutes);
app.use('/vendors', vendorsRoutes);
app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Define a route handler for GET requests to the '/home' route
app.get('/', (req, res) => {
  res.send('<h1>Welcome to Foodieee</h1>');
});
