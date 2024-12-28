const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const path = require('path');

// Import routes
const userRoutes = require("./routes/userRoutes");
const serviceCardRoutes = require("./routes/serviceCardRoutes");
const contactRoutes = require('./routes/contactUsRoutes');
const salesRoutes = require('./routes/salesRoutes');
const helpRoutes = require('./routes/helpRoutes');
const app = express();
const url = process.env.ATLAS_URL;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;

connection.once('open', () => {
  console.log('Database connected');

});

// Use routes
app.use("/api/users", userRoutes);
app.use('/api', serviceCardRoutes);
app.use('/api', contactRoutes);
app.use('/api', salesRoutes);
app.use('/api', helpRoutes);
app.use('/api', serviceCardRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});


// Start the server
const PORT = process.env.PORT || 8001;
app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
