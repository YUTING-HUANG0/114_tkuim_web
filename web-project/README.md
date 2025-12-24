# 隱私告解室 (Privacy Confession Room)

這是一個具備匿名性的全端網頁應用程式，使用者可以在此匿名發佈心中的秘密，或是隨機抽取閱讀來自其他人的告解。系統採用前後端分離架構設計，並確保使用者的隱私與資料安全。

## ✨ 功能特色 (Features)

- **👤 使用者認證**：支援註冊與登入功能，使用 JWT (JSON Web Token) 進行身份驗證。
- **📝 匿名投稿**：使用者可發佈告解內容，系統僅記錄作者 ID 以供本人管理，但在公開展示時完全匿名。
- **🎲 隨機閱讀**：提供「聆聽秘密」功能，可隨機抽取一則**非自己發佈**的告解內容。
- **🔧 歷史管理**：使用者可查看自己的投稿紀錄，並支援**編輯**與**刪除**功能 (CRUD)。
- **📱 響應式設計**：介面使用 CSS Grid 與 Design System 構建，完美支援桌面與行動裝置。

---

## 🛠️ 技術棧 (Tech Stack)

### Frontend (前端)
- **Framework**: Vue 3 (Composition API)
- **Build Tool**: Vite
- **State Management**: Pinia
- **Routing**: Vue Router
- **HTTP Client**: Axios
- **Style**: Custom CSS Design System

### Backend (後端)
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database ODM**: Mongoose
- **Authentication**: JWT & Bcrypt
- **Architecture**: MVC + Service Pattern

### Infrastructure (基礎建設)
- **Database**: MongoDB (running in Docker)
- **Containerization**: Docker & Docker Compose

---

## 🚀 安裝與執行 (Installation & Setup)

### 前置需求 (Prerequisites)
- [Node.js](https://nodejs.org/) (v16+)
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (用於運行 MongoDB)

### 1. 取得專案代碼
```bash
git clone https://github.com/YUTING-HUANG0/114_tkuim_web.git

# 進入 web-project 資料夾 (本專案的核心目錄)
cd 114_tkuim_web/web-project
```

### 2. 啟動資料庫 (Database)
確保 Docker Desktop 已開啟，然後執行：
```bash
# 使用 Docker Compose 啟動 MongoDB 與 Mongo Express
docker-compose up -d
```
> 若成功啟動，MongoDB 將運行於 `localhost:27018`。

### 3. 設定並啟動後端 (Backend)
開啟一個新的終端機視窗：
```bash
cd backend

# 安裝依賴套件
npm install

# 設定環境變數 (Windows PowerShell 範例)
# 注意：為了本地開發方便，我們直接在終端機設定連線字串，或者您可以建立 .env 檔案
$env:MONGO_URI="mongodb://admin:password123@localhost:27018/privacy-confession?authSource=admin"

# 啟動後端伺服器
npm start
```
> 後端伺服器將運行於 `http://localhost:3000`

### 4. 設定並啟動前端 (Frontend)
開啟另一個新的終端機視窗：
```bash
cd frontend

# 安裝依賴套件
npm install

# 啟動開發伺服器
npm run dev
```
> 前端頁面將運行於 `http://localhost:5173`

---

## 📖 使用說明 (Usage)

1.  開啟瀏覽器訪問 `http://localhost:5173`。
2.  點擊「註冊」建立一個新帳號 (密碼需至少6位數)。
3.  登入後將進入主控台 (Dashboard)。
4.  **我要告解**：在左側輸入框寫下秘密並送出。
5.  **聆聽秘密**：點擊「抽取秘密」閱讀他人的告解。
6.  **歷史紀錄**：在下方列表查看已發佈的內容，可點擊「編輯」修改或「刪除」撤回。

---

## 📂 專案結構 (Directory Structure)

```
web-project/
├── backend/                # Express 後端
│   ├── controllers/        # 控制器 (處理請求回應)
│   ├── services/           # 服務層 (商業邏輯)
│   ├── models/             # Mongoose 模型
│   ├── routes/             # API 路由定義
│   └── utils/              # 工具函式 (錯誤處理等)
├── frontend/               # Vue 前端
│   ├── src/
│   │   ├── services/       # API 串接層
│   │   ├── views/          # 頁面組件 (Login, Dashboard...)
│   │   └── router/         # 路由設定
├── docker-compose.yml      # MongoDB 部署配置
├── task.md                 # 開發任務追蹤
└── todo.md                 # 功能規劃清單
```