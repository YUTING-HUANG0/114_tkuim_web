# 開發進度日誌 (Development Log)

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

### Next Steps (for 12/26)
- [ ] **前端初始化**: 使用 Vite 建立 Vue 專案。
- [ ] **頁面開發**: 實作登入與註冊頁面，並串接今日完成的 Auth API。
