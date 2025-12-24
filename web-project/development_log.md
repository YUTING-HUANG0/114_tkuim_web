# 開發進度日誌 (Development Log)

## 2025-12-24 (Day 4 - 12/27 進度提前實作)

### Status Update
完成核心功能的**前後端串接**，使用者已可進行告解、隨機抽取他人秘密，並查看自己的投稿紀錄。

### Completed Tasks
1.  **後端 API 擴充**:
    - 新增 `GET /api/confessions/my`: 查詢當前登入使用者的所有告解紀錄 (時間倒序)。
    - 更新 `ConfessionService` 與 `ConfessionController` 支援此功能。
    - 確保路由 `/my` 受到 `AuthGuard` 保護。

2.  **前端 Service 層**:
    - 建立 `services/confession.js`，封裝所有與告解相關的 API 請求。

3.  **主控台功能實作 (`DashboardView`)**:
    - **Header**: 顯示使用者名稱與登出按鈕。
    - **我要告解區塊 (Create)**:
        - 實作文字輸入框 (字數統計)。
        - 串接 `createConfession` API，發送成功後自動刷新列表。
    - **聆聽秘密區塊 (Read)**:
        - 實作「抽取秘密」按鈕，串接 `getRandomConfession` API。
        - 顯示隨機抽取的秘密內容與發佈時間。
    - **歷史紀錄區塊**:
        - 自動載入使用者的投稿列表 (`loadMyConfessions`)。
        - 顯示每一則告解的內容、時間與觀看次數 (目前預設為0)。

4.  **UI 優化**:
    - 使用 CSS Grid 進行響應式排版 (Action Cards 並排或堆疊)。
    - 增加 Loading 狀態與錯誤訊息提示。

### Next Steps (for 12/28)
- [ ] **進階編輯與刪除**:
    - 實作「編輯告解」功能。
    - 實作「刪除告解」功能 (軟刪除或物理刪除)。
- [ ] **最終測試與優化**:
    - 檢查行動版排版。
    - 進行完整的 User Flow 測試。

---

## 2025-12-24 (Day 3 - 12/26 進度提前實作)

### Status Update
Frontend 基礎環境與認證頁面已完成開發。

### Completed Tasks
1.  **前端初始化**:
    - 使用 `Vite + Vue 3` 建立專案。
    - 安裝核心套件: `vue-router`, `pinia`, `axios`。
    - 建立專案結構: `src/views`, `src/services`, `src/assets`, `src/components`。

2.  **API 串接模組**:
    - `services/api.js`: 封裝 Axios 實例，設定 `BaseURL` 與 JWT Token Interceptor (攔截器)。
    - `services/auth.js`: 封裝後端登入/註冊 API 呼叫。

3.  **UI/UX 設計**:
    - `assets/main.css`: 實作極簡風格 Design System (Color tokens, Utility classes)。
    - **登入頁面 (LoginView)**: 包含表單驗證、錯誤提示與載入狀態。
    - **註冊頁面 (RegisterView)**: 包含密碼確認邏輯與自動登入。
    - **主控台 (DashboardView)**: 基礎歡迎頁面與身分驗證檢查 (Auth Guard)。

4.  **路由管理**:
    - 設定路由表與與導航守衛 (`beforeEach`)，防止未登入用戶訪問受保護頁面。

### Next Steps (for 12/27)
- [ ] **核心功能全端串接**:
    - 實作主控台的「匿名投稿」與「隨機抽取」功能。
    - 串接 `confessionService` API。

## 2025-12-24 (Day 2 - 12/25 進度提前實作)

### Status Update
Backend 核心架構與 API 已完成初步開發。

### Completed Tasks
1.  **架構優化**:
    - 建立 `controllers`, `services`, `routes`, `utils`, `middlewares` 資料夾結構。
    - 實作 Service Pattern 將商業邏輯分離。
    - 實作統一錯誤處理機制 (`AppError`, `catchAsync`, `globalErrorHandler`)。

2.  **認證系統 (Authentication)**:
    - 實作 **JWT (JSON Web Token)** 簽發與驗證流程。
    - `POST /api/auth/register`: 玩家註冊 (密碼加密儲存)。
    - `POST /api/auth/login`: 玩家登入 (回傳 JWT token)。
    - `AuthMiddleware`: 保護路由，確保請求帶有有效 Token。

3.  **核心功能 (Core Features)**:
    - `ConfessionService` & `ConfessionController` 實作。
    - `POST /api/confessions`: 匿名投稿 (關聯 User ID 但不公開)。
    - `GET /api/confessions/random`: 隨機抽取一則**非自己發布**的告解內容 (使用 MongoDB Aggregation `$sample`)。

4.  **檔案與程式碼品質**:
    - 修正 ESLint 檔案命名大小寫問題 (`appError.js` -> `AppError.js`)。
    - 更新 `server.js` 掛載路由與全域錯誤處理中間件。
