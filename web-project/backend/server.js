const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const confessionRoutes = require('./routes/confessionRoutes');
const globalErrorHandler = require('./middlewares/errorMiddleware');
const AppError = require('./utils/AppError');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/confessions', confessionRoutes);

app.get('/', (req, res) => {
  res.send('Privacy Confession Room API is Running...');
});

// Handle Unhandled Routes
// Handle Unhandled Routes
app.use((req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully'))
  .catch(err => console.error('MongoDB Connection Error:', err));

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
