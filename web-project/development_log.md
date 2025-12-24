# 開發進度日誌 (Development Log)

## 2025-12-24 (Day 5 - 12/28 進度提前實作)

### Status Update
專案的所有核心功能、進階功能與 UI 優化皆已完成，準備上線與交付。

### Completed Tasks
1.  **進階 CRUD 功能**:
    - **更新 (Update)**:
        - Backend: 新增 `PATCH /api/confessions/:id` API。
        - Service: `updateConfession` 實作權限檢查 (確保是本人才能編輯)。
        - Frontend: 在歷史紀錄卡片中實作「編輯模式」，可原地修改內容。
    - **刪除 (Delete)**:
        - Backend: 新增 `DELETE /api/confessions/:id` API。
        - Service: `deleteConfession` 實作權限檢查。
        - Frontend: 刪除確認對話框，刪除後自動從列表中移除。

2.  **前端體驗優化**:
    - **UI 響應式**: 優化 CSS Grid 在手機與桌面的排版。
    - **交互細節**: 增加編輯/儲存/取消的按鈕狀態切換。

3.  **系統測試與驗收**:
    - **API 測試**: 確認 Auth, Create, Read (Random/My), Update, Delete 介面均正常運作且權限控管正確。
    - **User Flow**:
        1. 註冊/登入 -> 成功轉導 Dashboard。
        2. 發佈告解 -> 顯示成功訊息 -> 歷史紀錄自動更新。
        3. 編輯告解 -> 內容即時更新。
        4. 刪除告解 -> 列表項目消失。
        5. 聆聽秘密 -> 隨機顯示他人內容。
        6. 登出 -> 清除 Token 並返回登入頁。

### Summary
本專案按照 `todo.md` 與 `task.md` 規劃，在時限內(甚至提前)完成了所有開發項目。系統具備完整的前後端分離架構、安全性驗證 (JWT) 與 MongoDB 資料持久化能力。

---

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
