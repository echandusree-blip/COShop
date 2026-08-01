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
app.use('/api/auth', require('./routes/auth'));

// Use Render's dynamic port or fallback to 5000 for local development
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));