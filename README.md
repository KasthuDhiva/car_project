# Car Wash Booking System Backend

Welcome to our Car Wash Booking System Backend! This API provides endpoints for handling authentication, managing car wash places and services, and booking car wash appointments.

## Prerequisites

Before running this application, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

## Installation

1. Clone this repository to your local machine:

```bash
git clone https://github.com/AakashSuresh2003/Car_Wash.git
```

2. Navigate into the project directory:

```bash
cd Car_Wash
```

3. Install dependencies:

```bash
npm install
```

## Usage

To start the server, run:

```bash
npm run start:dev
```

The server will start listening on the specified port.

## Project Structure

The project has the following directory structure:

```
.
├── controllers
│   ├── authController.js
│   ├── placeController.js
│   ├── serviceController.js
│   └── bookingController.js
├── middleware
│   └── authMiddleware.js
├── models
│   ├── placeModel.js
│   ├── serviceModel.js
│   └── bookingModel.js
├── routes
│   ├── authRouter.js
│   ├── placeRouter.js
│   ├── serviceRouter.js
│   └── bookingRouter.js
├── app.js
└── README.md
```

- **controllers:** Contains controllers for handling authentication, managing car wash places and services, and booking appointments.
- **middleware:** Contains middleware for authentication.
- **models:** Contains the model schemas for car wash places, services, and bookings.
- **routes:** Contains route handlers for authentication and car wash operations.
- **app.js:** Entry point of the application.

## API Endpoints

### Authentication

- **POST /api/v1/auth/register:** Register a new user.
- **POST /api/v1/auth/login:** Login with user credentials.
- **GET /api/v1/auth/logout:** Logout the current user.

### Car Wash Places

- **POST /api/v1/place:** Add a new car wash place.
- **GET /api/v1/place/filter-places:** Filter car wash places.
- **GET /api/v1/place/filter-dates:** Filter available dates for booking.

### Car Wash Services

- **GET /api/v1/service:** Get all car wash services.
- **POST /api/v1/service:** Add a new car wash service.
- **PUT /api/v1/service/:id:** Update a car wash service.
- **DELETE /api/v1/service/:id:** Delete a car wash service.
- **PUT /api/v1/service//status/:id** Update status of the booking

### Booking Appointments

- **POST /api/v1/booking:** Create a new booking appointment.
- **GET /api/v1/booking/getStatus/:id:** Get the status of a booking.
- **GET /api/v1/booking/getBooking:** Get all booking appointments.
  
Note: Authentication is required for accessing certain endpoints related to car wash services.
