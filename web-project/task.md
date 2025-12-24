# 隱私告解室 (Privacy Confession Room) - 開發進度規劃 (12/24 - 12/28)

本計畫根據 `todo.md` 項目進行拆解，目標在 5 天內完成從環境建置到核心功能上線的開發衝刺。

## 📅 12/24 (Day 1): 環境建置與後端基礎
**目標**：完成專案初始化、資料庫連線確認，以及後端基礎架構。

- [x] **環境準備**
    - [x] 建立專案資料夾結構 (Backend/Frontend 分離)
    - [x] 設定 Git 與 .gitignore
    - [x] 測試 MongoDB Docker 連線與數據卷 (Volume)
- [x] **後端初始化 (Express)**
    - [x] 初始化 Express 專案與安裝依賴
    - [x] 設定 CORS、Helmet 與環境變數 (.env)
    - [x] 安裝 Mongoose 並建立連線
- [x] **資料庫設計**
    - [x] 建立 User Schema (使用者)
    - [x] 建立 Confession Schema (告解內容)

## 📅 12/25 (Day 2): 後端核心與認證 API
**目標**：完成使用者認證系統與核心 CRUD 的 API 邏輯。

- [x] **架構實作 (Service Pattern)**
    - [x] 建立 Controller/Service/Utils 資料夾結構
    - [x] 實作統一錯誤處理 (Error Handling)
- [x] **認證系統 (Auth)**
    - [x] 實作 JWT 簽發 (Login/Register API)
    - [x] 建立 JWT 驗證 Middleware (Auth Guard)
- [x] **核心 API 開發 (部分)**
    - [x] 實作「匿名投稿」API (Create)
    - [x] 實作「隨機選題」演算法與 API (Read - Random)

## 📅 12/26 (Day 3): 前端基礎與認證整合
**目標**：搭建 Vue 前端環境，完成登入註冊頁面並串接後端。

- [x] **前端初始化 (Vue + Vite)**
    - [x] 建立 Vue 專案，安裝 Vue Router, Pinia
    - [x] 設定 Axios (Base URL, JWT Interceptor)
    - [x] 設置基礎 CSS / Design System (極簡風格、響應式)
- [x] **頁面開發：認證**
    - [x] 設計登入頁面 (Login)
    - [x] 設計註冊頁面 (Register)
    - [x] 串接登入/註冊 API 與 Token 管理

## 📅 12/27 (Day 4): 核心功能全端串接
**目標**：完成告解室的主要互動功能（投稿、查看、編輯）。

- [ ] **頁面開發：主控台**
    - [ ] 設計「隨機抽取秘密」介面 (Read)
    - [ ] 設計「我要告解」投稿表單 (Create)
- [ ] **功能串接**
    - [ ] 串接投稿 API
    - [ ] 串接隨機抽取 API
    - [ ] 實作「我的歷史紀錄」列表 (Update/Edit 前置)

## 📅 12/28 (Day 5): 編輯、刪除與優化
**目標**：完成編輯與刪除功能，進行最終修飾與測試。

- [ ] **進階功能**
    - [ ] 實作「編輯告解」功能 (僅限本人) (Update)
    - [ ] 實作「閱後即焚/刪除」功能 (Delete)
    - [ ] 前端刪除動畫效果
- [ ] **測試與收尾**
    - [ ] Postman API 完整測試
    - [ ] 前端 RWD 響應式檢查
    - [ ] 全流程使用者測試 (User Flow Walkthrough)
