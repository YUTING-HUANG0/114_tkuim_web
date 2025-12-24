# 隱私告解室 (Privacy Confession Room) 開發待辦事項

本專案採用 Docker 部署 MongoDB，並以 Express 與 Vue 構建前後端分離架構。核心為匿名 CRUD 功能與 Service Pattern 設計。

## 1. 環境與基礎建設 (Infrastructure & Setup)
- [ ] **環境建置**
    - [ ] 建立專案資料夾結構
    - [ ] 設定 Git 版本控制 (.gitignore)
- [x] **資料庫 (Database)**
    - [x] 編寫 `docker-compose.yml` 部署 MongoDB
    - [ ] 測試 MongoDB 連線與數據持久化 (Volume)

## 2. 後端開發 (Backend - Express)
- [x] **基礎架構**
    - [x] 初始化 Express 專案
    - [x] 設定環境變數 (.env)
    - [x] 設定 CORS 與 Helmet 安全性
- [x] **資料庫整合**
    - [x] 安裝 Mongoose 並建立連線設定
    - [x] 設計 Schema/Model (User, Confession)
- [x] **架構設計 (Service Pattern)**
    - [x] 建立 Controller 層 (接收請求/回應)
    - [x] 建立 Service 層 (商業邏輯、隨機演算法)
    - [x] 建立 Utils (HTTP 狀態碼常數、統一錯誤處理機制)
- [x] **認證機制 (Authentication)**
    - [x] 實作 JWT 簽發 (Login)
    - [x] 建立 JWT 驗證 Middleware (Protect Route)

## 3. 前端開發 (Frontend - Vue)
- [x] **初始化**
    - [x] 使用 Vite 建立 Vue 專案
    - [x] 安裝與設定路由 (Vue Router)
    - [x] 安裝狀態管理 (Pinia - 若需要)
    - [x] 設定 Axios (Base URL, Interceptors for JWT)
- [x] **UI/UX 設計**
    - [x] 設定基礎 CSS/Design System (Responsive)
    - [x] 設計登入/註冊頁面
    - [ ] 設計主控台/告解室頁面

## 4. 核心功能實作 (Core Features - CRUD)
- [x] **使用者認證**
    - [x] 玩家登入/註冊功能
- [x] **C - 匿名投稿 (Create)**
    - [x] 前端投稿表單
    - [x] 後端接收並儲存 (關聯 User 但保持匿名性設計)
- [x] **R - 隨機選題 (Read)**
    - [x] 後端 Service 實作隨機篩選演算法 (排除自己、權重等)
    - [x] 前端展示抽取的秘密
- [x] **U - 內容更正 (Update)**
    - [x] 查詢個人歷史投稿列表
    - [x] 編輯功能實作 (權限校驗: 僅限本人)
- [x] **D - 閱後即焚 (Delete)**
    - [x] 實作物理刪除 (Physical Delete) API
    - [x] 前端觸發刪除後的動畫與狀態更新

## 5. 測試與優化 (Testing & Optimization)
- [x] 完整的 API Postman 測試
- [x] 錯誤邊界測試 (Error Handling Verification)
- [x] 前端 RWD 測試
