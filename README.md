# Inventory Management System

 # Overview

This is a full-stack inventory management system built using Node.js, Express, PostgreSQL, and React. The application allows users to create, update, delete, and view categories and items within those categories.

# Features

Category Management: Add, edit, delete, and view categories.

Item Management: Add, edit, delete, and view items within categories.

RESTful API: Built using Express.js and PostgreSQL.

Frontend: React with React Router for navigation.

CRUD Operations: Complete control over inventory management.

# Technologies Used

# Backend:

Node.js (Server-side runtime)

Express.js (Routing and API handling)

PostgreSQL (Database management)

pg (PostgreSQL client for Node.js)

CORS (Cross-Origin Resource Sharing)

dotenv (Environment variable management)

# Frontend:

React.js (User interface)

React Router (Navigation)

Axios (HTTP requests to the backend)

Tailwind CSS (Styling)

# Install dependencies:

npm install

Set up a PostgreSQL database and configure .env file:

DB_USER=your_username
DB_PASSWORD=your_password
DB_HOST=localhost
DB_NAME=inventory_db
DB_PORT=5432
PORT=5000

Run database migrations (if applicable) or seed data:

node db/seed.js

Start the backend server:

npm start

The backend should be running at http://localhost:5000

3. Frontend Setup:

Navigate to the frontend directory:

cd ../frontend

# Install dependencies:

npm install

Start the frontend development server:

npm run dev

The frontend should be running at http://localhost:5173

# API Endpoints

Categories:

GET /api/categories - Get all categories

POST /api/categories - Add a new category

GET /api/categories/:id - Get a category by ID

PUT /api/categories/:id - Update a category

DELETE /api/categories/:id - Delete a category

Items:

GET /api/items - Get all items

GET /api/items/:categoryId - Get items by category

POST /api/items/:categoryId - Add an item to a category

PUT /api/items/:id - Update an item

DELETE /api/items/:id - Delete an item
