require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Pagkonekta sa MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected na sa MongoDB Atlas!'))
  .catch((err) => console.error('Error sa pagkonekta sa MongoDB:', err));

// Middleware & Configuration
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const supplierRoutes = require('./routes/supplierRoutes');
app.use('/suppliers', supplierRoutes);

app.get('/', (req, res) => {
    res.render('index');
});

// Pagsisimula ng Server
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});