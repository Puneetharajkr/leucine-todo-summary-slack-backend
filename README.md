# Todo Summary Assistant – Backend

This is the **backend API** for the Todo Summary Assistant project. It allows users to manage their to-do items and generate a summary of all pending tasks, which is then posted to a Slack channel.

This version uses a **simulated OpenAI summary** (no billing or key required) and supports **real Slack integration** using webhooks.

---

## Tech Stack

- **Node.js** + **Express.js**
- **PostgreSQL** (local or Supabase-compatible)
- **Slack Webhook Integration**
- **dotenv** for environment management

---

## Project Structure

backend/

├── config/

│   └── db.js                # PostgreSQL DB connection

├── controllers/

│   ├── todos.js             # Get/Add/Delete todos

│   └── summary.js           # Generate + send summary to Slack

├── routes/

│   └── todos.js             # API route definitions

├── server.js                # App entry point

├── .env.example             # Example environment file

└── README.md                # You're here


## Setup Instructions

### 1. **Clone the Repository**

git clone https://github.com/your-username/todo-summary-assistant.git
cd todo-summary-assistant/backend


### 2. **Install Dependencies**

npm install

### 3. **Configure Environment Variables**

Create a .env file:

Update .env with your own PostgreSQL connection string and Slack Webhook URL

DB_URL=postgres://your_user:your_password@localhost:5432/todo_assistant
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your/webhook/url
PORT=5000
NODE_ENV=development

## API Endpoints

### POST /todos

Add a new todo
{
  "task": "Finish assignment"
}



### GET /todos

Fetch all todos

### DELETE todos/:id

Delete a specific todo

### POST todos/summarize

Generates a **simulated summary** of all incomplete todos and posts to Slack.

Example response:
{
  "summary": "You have 4 pending tasks. Stay focused and complete the most important ones first!"
}



## PostgreSQL Setup

Run this SQL to create the todos table:
**CREATE TABLE todos (
  id SERIAL PRIMARY KEY,
  task TEXT NOT NULL,
  is_completed BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);**

## Slack Integration

1. Go to [Slack API: Incoming Webhooks]()
2. Create a new app → Enable **Incoming Webhooks**
3. Add a new webhook to a specific channel (e.g., `#todo-summaries`)
4. Copy the webhook URL and paste into your `.env`:
   SLACK_WEBHOOK_URL=https://hooks.slack.com/services/your-url

## Run the Backend

npm start
You should see:
	PostgreSQL connected
	Server running on port 5000
	Environment: development
