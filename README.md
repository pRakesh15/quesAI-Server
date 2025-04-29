# Project Management System API

A robust backend API for a project management system built with Node.js, Express, and MongoDB. This system allows users to register, login, create projects, and manage files within those projects.

## Features

- **User Authentication**
  - User registration and login with JWT authentication
  - Password encryption with bcrypt

- **Project Management**
  - Create, read, update, and delete projects
  - Each project belongs to a specific user

- **File Management**
  - Create, read, update, and delete files within projects
  - Each file contains a name and transcript content
  - Files are associated with both a project and a user

## Architecture

The API is built using a controller-service architecture:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic
- **Models**: Define data structures
- **Routes**: Define API endpoints
- **Middleware**: Handle authentication and other cross-cutting concerns

## Prerequisites

- Node.js
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/pRakesh15/quesAI-Server.git
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following content:
   ```
  PORT=8090
MONGO_URI='mongodb+srv://rakesh:abcde@cluster0.geq4kyv.mongodb.net/quesAi?retryWrites=true&w=majority&appName=Cluster0'
JWT_SECREATE='tarakmehetakiultachasma'
NODE_ENV === "production"
FRONTEND_URL='https://ques-ai-topaz.vercel.app'
   ```

4. Start the server:
   ```
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info (protected)

### Projects

- `GET /api/projects` - Get all projects for the logged-in user (protected)
- `POST /api/projects` - Create a new project (protected)
- `GET /api/projects/:id` - Get a specific project by ID (protected)
- `PUT /api/projects/:id` - Update a project (protected)
- `DELETE /api/projects/:id` - Delete a project (protected)

### Files

- `GET /api/files/project/:projectId` - Get all files for a specific project (protected)
- `POST /api/files` - Create a new file (protected)
- `GET /api/files/:id` - Get a specific file by ID (protected)
- `PUT /api/files/:id` - Update a file (protected)
- `DELETE /api/files/:id` - Delete a file (protected)

## Request & Response Examples

### Authentication

#### Register a new user

**Request:**
```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60a1b2c3d4e5f6g7h8i9j0k",
    "name": "John Doe",
    "email": "john@example.com",
    "token": "your_jwt_token_here"
  }
}
```

### Projects

#### Create a new project

**Request:**
```json
POST /api/projects
Authorization: Bearer your_jwt_token_here
{
  "name": "My Project"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60a1b2c3d4e5f6g7h8i9j0k",
    "name": "My Project",
    "user": "user_id_here",
    "createdAt": "2023-04-26T10:00:00.000Z",
    "updatedAt": "2023-04-26T10:00:00.000Z"
  }
}
```

### Files

#### Create a new file

**Request:**
```json
POST /api/files
Authorization: Bearer your_jwt_token_here
{
  "name": "My File",
  "transcript": "File content goes here",
  "project": "project_id_here"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "60a1b2c3d4e5f6g7h8i9j0k",
    "name": "My File",
    "transcript": "File content goes here",
    "project": "project_id_here",
    "user": "user_id_here",
    "createdAt": "2023-04-26T10:00:00.000Z",
    "updatedAt": "2023-04-26T10:00:00.000Z"
  }
}
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

Error responses follow this format:
```json
{
  "success": false,
  "message": "Error message here"
}
```

## Security

- Passwords are hashed using bcrypt
- Authentication is handled via JSON Web Tokens (JWT)
- Protected routes require a valid JWT in the Authorization header

## License

MIT
