# Voice Enabled Task Tracker

## Installation

1. Prerequisite

    ```bash
    Node.js >= 18.x
    npm >= 9.x
    Git
    ```

1. Clone the repository:

    ```bash
    git clone git@github.com:Shivam-teotia/task-manager-app.git
    ```

1. Install the dependencies for frontend and run server:

    ```bash
    cd frontend
    ```

    ```bash
    npm install
    ```

    ```bash
    npm run dev
    ```

1. Install the dependencies for backend:

    ```bash
    open new terminal at root level
    ```

    ```bash
    cd backend
    ```

    ```bash
    npm install
    ```

    ```bash
    npm run dev
    ```

1. Set up the environment variables:

    Create 1 `.env` file inside frontend and 1 `.env` file inside backend and take reference of .env.example to add variables.

## Tech Stack

### Frontend

-   **NextJS**
-   **Redux Toolkit** (State management)
-   **Axios** (API calls)
-   **TailwindCSS** (UI styling)

### Backend

-   **Node.js**
-   **Express.js**
-   **Mongoose**
-   **Zod** (Request validation)
-   **Nodemon** (Dev mode)

### Database

-   **MongoDB**

## API Documentation

**Base URL:** `/api`

### 📌 TASK APIs — `/api/tasks`

#### GET /api/tasks

Fetch all tasks.

**Response (200):**

```json
[
    {
        "title": "Complete project report",
        "status": "TODO",
        "priority": "HIGH",
        "description": "This is description",
        "dueDate": "2025-12-15T10:17:00.000Z"
    }
]
```

#### POST /api/tasks

Create a new task.

**Request Body:**

```json
{
    "title": "Buy groceries",
    "description": "Milk, curd, fruits",
    "status": "TODO",
    "priority": "MEDIUM",
    "dueDate": "2025-12-15T10:17:00.000Z"
}
```

**Error (400 — validation):**

```json
{
    "message": "Invalid input",
    "errors": ["title: Title can not be empty"]
}
```

#### PUT /api/tasks/:id

Update task fields.

**Request Body:**

```json
{
    "title": "title",
    "description": "description",
    "status": "TODO",
    "priority": "HIGH",
    "dueDate": "2025-12-07T09:00:00.000Z"
}
```

**Response (200):**

```json
{
    "title": "title",
    "description": "description",
    "status": "TODO",
    "priority": "HIGH",
    "dueDate": "2025-12-07T09:00:00.000Z",
    "createdAt": "2025-12-06T09:28:31.135Z",
    "updatedAt": "2025-12-06T10:20:46.377Z"
}
```

#### DELETE /api/tasks/:id

Delete a task.

**Response (204):**

### 🎤 VOICE PARSING API — `/api/voice/parse`

#### POST /api/voice/parse

Convert natural voice text into a structured task.

**Request Body:**

```json
{
    "text": "Create a high priority task to submit the report by tomorrow"
}
```

**Response (200):**

```json
{
    "title": "Submit the report",
    "priority": "HIGH",
    "dueDate": "2025-12-07"
}
```

## Decisions & Assumptions

### Key Design Decisions

-   **Task Model** contains `title`, `description`, `status`, `priority`, `dueDate`, timestamps
-   **Enums:**
    -   Status: `TODO`, `IN_PROGRESS`, `DONE`
    -   Priority: `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`
-   **Voice Parsing Flow:** Accepts raw text → use library to parse data → returns structured output
-   **Validation:** Used Zod schema for validating request body
-   **Folder Structure:** Clean separation: `routes`, `controllers`, `models`, `services`

### Tools Used

-   **ChatGPT**
-   **Cursor IDE**

### What They Helped With

-   Generating boilerplate Express code
-   Creating Redux slices and thunks
-   Voice-to-task parsing logic
-   README documentation (this file)
