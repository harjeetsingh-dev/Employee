# Employee Management Project

A Node.js/Express application with MVC architecture for managing employees.

## Project Structure

```
employee-management/
├── models/              # Data models (Employee.js)
├── views/               # View templates (currently empty)
├── controllers/         # Request handlers (EmployeeController.js)
├── routes/              # Route definitions (employeeRoutes.js)
├── middleware/          # Custom middleware (errorHandler.js)
├── config/              # Configuration files (database.js)
├── public/              # Static files (CSS, JS, images)
├── utils/               # Utility functions (helpers.js)
├── tests/               # Test files
├── index.js             # Main server file
├── package.json         # Project dependencies
├── .env.example         # Environment variables template
└── README.md            # Project documentation
```

## API Endpoints

- `GET /api/employees` - Get all employees
- `GET /api/employees/:id` - Get employee by ID
- `POST /api/employees` - Create new employee
- `PUT /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

## Getting Started

1. Install dependencies:
   ```
   npm install
   ```

2. Create `.env` file from `.env.example`:
   ```
   cp .env.example .env
   ```

3. Start the server:
   ```
   npm start
   ```

The server will run on `http://localhost:3000`

## Architecture Overview

- **Models**: Define employee data structure
- **Controllers**: Handle business logic and request processing
- **Routes**: Define API endpoints and map to controllers
- **Middleware**: Handle cross-cutting concerns (error handling, validation)
- **Config**: Centralized configuration management
- **Utils**: Reusable helper functions
- **Views**: Frontend templates (ready for EJS, Pug, or Handlebars)

