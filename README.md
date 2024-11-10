
---

# HRM Project

This project is a Human Resource Management (HRM) system built using the MEAN stack (MongoDB, Express, Angular, Node.js). It provides tools for managing employee records, attendance, leave applications, and performance evaluations.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Employee Management**: Add, update, delete, and view employee details.
- **Attendance Tracking**: Record and monitor attendance data.
- **Leave Management**: Apply for and approve leave requests.
- **Performance Evaluation**: Conduct performance reviews and store records.
- **Role-based Access Control**: Access control based on user roles (Admin, Manager, Employee).

## Technologies

- **MongoDB**: Database for storing HRM data
- **Express.js**: Backend framework
- **Angular**: Frontend framework
- **Node.js**: Server environment

## Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/kalyanseervi/Human-Resource-Management-HRM--MEAN-stack.git
    cd mean_pro
    ```

2. **Install backend dependencies**:
    ```bash
    cd server
    npm install
    ```

3. **Install frontend dependencies**:
    ```bash
    cd ../client
    npm install
    ```

4. **Set up MongoDB**:
    - Ensure MongoDB is installed and running.
    - Create a `.env` file in the backend directory and add MongoDB URI and other environment variables:
      ```plaintext
      MONGO_URI=your_mongodb_uri
      JWT_SECRET=your_jwt_secret
      ```

5. **Run the application**:
    - Start the backend server:
      ```bash
      cd server
      npm start
      ```
    - Start the frontend server:
      ```bash
      cd ../client
      ng serve
      ```
    - The backend will run on `http://localhost:3000` and the frontend on `http://localhost:4200`.

## Usage

1. Navigate to `http://localhost:4200` to access the HRM interface.
2. Register or log in as an administrator to manage users and assign roles.
3. Add employees, track attendance, manage leave requests, and conduct evaluations.

## API Endpoints

- **Auth**:
  - `POST /api/auth/register` - Register a new user
  - `POST /api/auth/login` - Log in a user

- **Employees**:
  - `GET /api/employees` - Get all employees
  - `POST /api/employees` - Add a new employee
  - `PUT /api/employees/:id` - Update employee details
  - `DELETE /api/employees/:id` - Delete an employee

- **Attendance**:
  - `GET /api/attendance` - Get attendance records
  - `POST /api/attendance` - Record attendance

- **Leave**:
  - `GET /api/leaves` - View all leave requests
  - `POST /api/leaves` - Apply for leave
  - `PUT /api/leaves/:id` - Update leave status

## Contributing

Feel free to fork this repository, create a branch, and submit a pull request if you'd like to contribute to this project.



--- 
