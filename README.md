

# Trullo Project - Backend

## Overview

The Trullo project is a task management application built with Node.js, Express, Mongoose, and TypeScript. This backend serves as an API for user and task management, allowing users to create accounts, manage tasks, and perform CRUD operations.

## Technologies Used

- **Node.js**: JavaScript runtime for server-side programming.
- **Express.js**: Web framework for building APIs and handling routing.
- **Mongoose**: ODM library for MongoDB, used for schema definitions and database interactions.
- **TypeScript**: Typed superset of JavaScript for building scalable applications.
- **Bcrypt**: Library for hashing passwords securely.
- **Dotenv**: Module for loading environment variables from a `.env` file.

## Project Structure

```
Trullo-app/
├── server/
│   ├── src/
│   │   ├── app.ts
│   │   ├── controllers/
│   │   │   ├── taskController.ts
│   │   │   └── userController.ts
│   │   ├── models/
│   │   │   ├── Task.ts
│   │   │   └── User.ts
│   │   ├── routes/
│   │   │   ├── taskRoutes.ts
│   │   │   └── userRoutes.ts
│   │   ├── config/
│   │   │   └── db.ts
│   │   └── .env
│   └── package.json
```

### Key Files and Their Functions

1. **app.ts**: 
   - The entry point of the application where the Express server is initialized. It configures middleware, routes, and connects to the database.

2. **controllers/**:
   - Contains the logic for handling requests related to users and tasks.
   - **userController.ts**: Handles user-related operations (registration, login, retrieval).
   - **taskController.ts**: Manages task-related operations (creating, updating, deleting tasks).

3. **models/**:
   - Contains Mongoose schemas for defining the structure of data.
   - **User.ts**: Defines the User schema with fields like `id`, `name`, `email`, and `password`.
   - **Task.ts**: Defines the Task schema with fields like `id`, `title`, `description`, `status`, and `assignedTo`.

4. **routes/**:
   - Defines the API endpoints and associates them with their respective controllers.
   - **userRoutes.ts**: Routes for user operations.
   - **taskRoutes.ts**: Routes for task operations.

5. **config/db.ts**:
   - Contains the database connection logic using Mongoose.

6. **.env**:
   - Stores environment variables, such as the MongoDB connection string.

## API Endpoints

- **User Management**
  - `POST /api/users`: Create a new user (admin role required).
  - `GET /api/users`: Retrieve all users.
  - `POST /api/users/login`: Authenticate a user.

- **Task Management**
  - `POST /api/tasks`: Create a new task.
  - `GET /api/tasks`: Retrieve all tasks.
  - `PATCH /api/tasks/:id`: Update a task by ID.
  - `DELETE /api/tasks/:id`: Delete a task by ID.

## How to Run the Backend

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd Trullo-app/server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables in a `.env` file:
   ```plaintext
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.yourcluster.mongodb.net/<dbname>?retryWrites=true&w=majority
   ```

4. Start the server:
   ```bash
   npm run dev
   ```

## Request for Frontend Development

We would like to request V0.dev to create a frontend for the Trullo project based on the backend API outlined above. The frontend should allow users to:

- **User Registration and Login**: Provide forms for users to create accounts and log in.
- **Task Management Interface**: Implement an interface for users to create, update, and delete tasks.
- **Drag and Drop Functionality**: Enable users to reorder tasks and change their statuses through a drag-and-drop interface.
- **Admin Dashboard**: Create an admin interface for managing users and tasks.

### Technologies Suggested for Frontend

- **React**: For building the user interface.
- **Redux**: For state management.
- **React Router**: For routing between different components/pages.
- **Drag and Drop Libraries**: Such as `react-beautiful-dnd` for implementing drag-and-drop functionality.

