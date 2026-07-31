const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/auth', require('./routes/auth')); // <--- Added Auth Route here

app.listen(5000, () => console.log('Server running on port 5000'));