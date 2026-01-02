# API 規格書 (API Specification)

本文件描述 **Privacy Confession Room** 的後端 API 介面規格。所有 API 請求皆以前綴 `/api` 開頭。

## 1. 認證 (Authentication)

### 1.1 註冊使用者 (Register)
*   **URL**: `/api/auth/register`
*   **Method**: `POST`
*   **Description**: 建立新的使用者帳號。
*   **Request Body**:
    ```json
    {
      "username": "example_user",
      "password": "password123"
    }
    ```
*   **Success Response (201 Created)**:
    ```json
    {
      "status": "success",
      "token": "jwt_token_string...",
      "data": {
        "user": {
          "id": "60d5ec...",
          "username": "example_user"
        }
      }
    }
    ```
*   **Error Response (400 Bad Request)**:
    ```json
    {
      "status": "fail",
      "message": "該用戶名已被使用"
    }
    ```

### 1.2 使用者登入 (Login)
*   **URL**: `/api/auth/login`
*   **Method**: `POST`
*   **Description**: 驗證使用者憑證並回傳 JWT Token。
*   **Request Body**:
    ```json
    {
      "username": "example_user",
      "password": "password123"
    }
    ```
*   **Success Response (200 OK)**:
    ```json
    {
      "status": "success",
      "token": "jwt_token_string...",
      "data": {
        "user": {
          "id": "60d5ec...",
          "username": "example_user"
        }
      }
    }
    ```
*   **Error Response (401 Unauthorized)**:
    ```json
    {
      "status": "fail",
      "message": "用戶名或密碼錯誤"
    }
    ```

---

## 2. 秘密 (Confessions)

**注意**: 所有秘密相關 API 需要在 Header 帶入 `Authorization: Bearer <token>`。

### 2.1 新增秘密 (Create Confession)
*   **URL**: `/api/confessions`
*   **Method**: `POST`
*   **Description**: 發表一個新的秘密。
*   **Request Body**:
    ```json
    {
      "content": "這是一個秘密..."
    }
    ```
*   **Success Response (201 Created)**:
    ```json
    {
      "status": "success",
      "data": {
        "confession": {
          "_id": "...",
          "user": "userId...",
          "content": "這是一個秘密...",
          "createdAt": "..."
        }
      }
    }
    ```

### 2.2 隨機抽取秘密 (Get Random Confession)
*   **URL**: `/api/confessions/random`
*   **Method**: `GET`
*   **Description**: 隨機獲取一個非自己發表的秘密。
*   **Success Response (200 OK)**:
    ```json
    {
      "status": "success",
      "data": {
        "confession": {
          "_id": "...",
          "content": "這是別人的秘密...",
          "createdAt": "..."
        }
      }
    }
    ```
*   **Response when no confessions available**:
    ```json
    {
      "status": "success",
      "message": "目前沒有其他人的秘密可供讀取，請稍後再試。",
      "data": null
    }
    ```

### 2.3 查詢我的秘密 (Get My Confessions)
*   **URL**: `/api/confessions/my`
*   **Method**: `GET`
*   **Description**: 獲取當前登入使用者發表的所有秘密清單。
*   **Success Response (200 OK)**:
    ```json
    {
      "status": "success",
      "results": 5,
      "data": {
        "confessions": [
          {
            "_id": "...",
            "content": "我的秘密 1",
            "createdAt": "..."
          },
          ...
        ]
      }
    }
    ```

### 2.4 修改秘密 (Update Confession)
*   **URL**: `/api/confessions/:id`
*   **Method**: `PATCH`
*   **Description**: 修改指定 ID 的秘密內容（僅限本人）。
*   **Request Body**:
    ```json
    {
      "content": "修改後的秘密內容"
    }
    ```
*   **Success Response (200 OK)**:
    ```json
    {
      "status": "success",
      "data": {
        "confession": {
          "_id": "...",
          "content": "修改後的秘密內容",
          "updatedAt": "..."
        }
      }
    }
    ```

### 2.5 刪除秘密 (Delete Confession)
*   **URL**: `/api/confessions/:id`
*   **Method**: `DELETE`
*   **Description**: 刪除指定 ID 的秘密（僅限本人）。
*   **Success Response (204 No Content)**:
    (無回傳內容)
