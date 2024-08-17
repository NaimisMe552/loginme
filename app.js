// app.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const authRoutes = require('./routes/auth');  // Ensure this path is correct
const app = express();

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.set('view engine', 'ejs');

// Static files middleware
app.use(express.static('public'));

// Body parser middleware
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
    secret: process.env.SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));

// Route middleware
app.use('/', authRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
