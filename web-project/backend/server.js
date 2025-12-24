// backend/server.js
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

// 1. 基礎安全性與解析中介軟體
app.use(helmet());
app.use(cors());
app.use(express.json());

// 2. 核心路由掛載
app.use('/api/auth', authRoutes);
app.use('/api/confessions', confessionRoutes);

app.get('/', (req, res) => {
  res.send('Privacy Confession Room API is Running...');
});

// 3. 處理所有未定義的路由 (必須放在所有具體路由之後)
app.all(/.*/, (req, res, next) => {
  next(new AppError(`找不到路徑: ${req.originalUrl}`, 404));
});

// 4. 全域錯誤處理器 (必須是最後一個 app.use)
app.use(globalErrorHandler);

// 5. 連線資料庫後才啟動伺服器
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB Connected Successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB Connection Error:', err);
    process.exit(1);
  });