# Pizza Management System

A web application for pizza store owners and chefs to manage toppings and create pizza masterpieces. Built with Django, React, and deployed on Google Cloud Platform (GCP).

## Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation and Setup](#installation-and-setup)
- [Running the Application Locally](#running-the-application-locally)
- [Running Tests](#running-tests)
- [Deployment](#deployment)
- [Technical Choices](#technical-choices)
- [Usage Guide](#usage-guide)
- [Contributing](#contributing)
- [License](#license)

## Project Overview

This application allows pizza store owners to manage the list of available toppings and enables pizza chefs to create, update, and manage pizzas with selected toppings. It ensures data persistence using a cloud-based PostgreSQL database and provides a responsive and intuitive user interface.

## Tech Stack

| Layer                  | Technology                                        | Description                                                                                                                                           |
|------------------------|---------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Backend Framework**  | Django (Python)                                   | Django, along with Django REST Framework (DRF), for building REST APIs and handling server-side logic.                                                 |
| **Backend Containerization** | Docker                                       | Docker enables containerization for easy deployment on Cloud Run, ensuring environment consistency.                                                   |
| **Compute Service**    | Google Cloud Run                                  | Cloud Run allows deployment of Docker containers, auto-scales based on traffic, and is serverless.                                                     |
| **Database**           | Cloud SQL (PostgreSQL)                            | Managed, scalable PostgreSQL database, secure and easily integrated with Cloud Run.                                                                    |
| **Frontend Framework** | React (JavaScript)                                | React for building an interactive, responsive UI with component-based architecture.                                                                   |
| **Frontend Hosting**   | Firebase Hosting                                  | Firebase Hosting for static files and React app, offering a CDN for fast, global delivery.                                                            |
| **Testing**            | Pytest (Django) and Jest/React Testing Library    | Automated backend tests with Pytest and frontend tests with Jest and React Testing Library.                                                           |
| **Monitoring & Logging** | Google Cloud Monitoring & Cloud Logging         | Real-time monitoring and logging for performance and troubleshooting.                                                                                 |
| **Documentation**      | Markdown (README)                                 | Detailed README with setup, deployment, testing, and technical choices documentation.                                                                 |

## Features

### Manage Toppings

- **View Toppings**: See a list of all available toppings.
- **Add Topping**: Add new toppings to the list.
- **Update Topping**: Edit existing toppings.
- **Delete Topping**: Remove toppings from the list.
- **Prevent Duplicates**: Validation to prevent duplicate toppings.

### Manage Pizzas

- **View Pizzas**: See a list of all pizzas and their toppings.
- **Create Pizza**: Create new pizzas and select toppings.
- **Update Pizza**: Edit pizza names and their toppings.
- **Delete Pizza**: Remove pizzas from the list.
- **Prevent Duplicates**: Validation to prevent duplicate pizza names.

## Prerequisites

- **Backend**:
  - Python 3.8 or higher
  - Docker
  - Google Cloud SDK
- **Frontend**:
  - Node.js v14 or higher
  - npm or Yarn package manager

## Installation and Setup

### Clone the Repository

```bash
git clone https://github.com/yourusername/pizza-management-system.git
cd pizza-management-system
```

### Install Prerequisites

Follow the instructions here: [Prerequisites](docs/installation_prerequisites.md)


### Backend Setup

#### 1. Set Up Virtual Environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows use venv\Scripts\activate
```

#### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

#### 3. Environment Variables

Rename `backend.env.txt` to `.env` for backend .env template


#### 4. Apply Migrations

```bash
python manage.py migrate
```

### Frontend Setup

#### 1. Environment Variables

Rename `frontend\frontend.env.txt` to `.env` for frontend .env template

#### 2. Install node packages

```bash
cd ../frontend
npm install
```

## Running the Application Locally

### Set frontend .env.development variables
Set `REACT_APP_USE_MOCK=false` & `REACT_APP_USE_LOCAL_BACKEND=true` .env.development should look like:

```env
REACT_APP_USE_MOCK=false
REACT_APP_USE_LOCAL_BACKEND=true
REACT_APP_LOCAL_BACKEND_URL=http://localhost:8000
REACT_APP_BACKEND_URL=http://localhost:8000
REACT_APP_MOCK_BACKEND_URL=http://localhost:3001
```
#### Start the Backend Server

```bash
cd backend
python manage.py runserver
```

The backend server will start on `http://localhost:8000/`.

#### Start the Frontend Server

```bash
cd frontend
npm start
```

The frontend React app will start on `http://localhost:3000/`.

## Running Tests

### Backend Tests

```bash
cd backend
python manage.py test
```

### Frontend Tests

```bash
cd frontend
npm test
```
Currently the automated tests of the frontend is broken please read [HERE](#Manual-Testing-with-Mock-Backend) for information performing manual testing.

## Deployment

### Deploying the Backend to Google Cloud Run

#### 1. Build the Docker Image

```bash
cd backend
docker build -t gcr.io/your-project-id/pizza-backend .
```

#### 2. Push the Docker Image to Container Registry

```bash
docker push gcr.io/your-project-id/pizza-backend
```

#### 3. Deploy to Cloud Run

```bash
gcloud run deploy pizza-backend \
  --image gcr.io/your-project-id/pizza-backend \
  --platform managed \
  --region your-region \
  --allow-unauthenticated \
  --add-cloudsql-instances your-project-id:your-region:your-instance
```

### Deploying the Frontend to Firebase Hosting

#### 1. Build the React App

```bash
cd frontend
npm run build
```

#### 2. Initialize Firebase in the Frontend Directory

```bash
firebase init
```

Select Hosting and follow the prompts.

#### 3. Deploy to Firebase

```bash
firebase deploy
```

## Technical Choices

### Django and Django REST Framework

- **Why**: Django provides a robust framework with built-in features for authentication, ORM, and admin interface. DRF simplifies the creation of RESTful APIs.
- **Benefits**: Rapid development, secure, scalable, and a large supportive community.

### Docker and Cloud Run

- **Why**: Docker ensures consistency across development and production environments. Cloud Run provides a serverless platform that scales automatically.
- **Benefits**: Simplifies deployment, reduces infrastructure management, and handles scaling.

### React and Firebase Hosting

- **Why**: React allows for building a dynamic, responsive frontend with reusable components. Firebase Hosting offers fast, secure hosting with a global CDN.
- **Benefits**: Enhanced user experience, efficient development, and quick content delivery.

### PostgreSQL with Cloud SQL

- **Why**: PostgreSQL is a powerful, open-source relational database. Cloud SQL provides a managed service with automatic backups and scalability.
- **Benefits**: Reliable data persistence, easy integration with Django, and minimal maintenance overhead.

## Usage Guide

### Managing Toppings

1. **View Toppings**: Navigate to the toppings page to see all available toppings.
2. **Add Topping**: Click on "Add Topping" and fill out the form.
3. **Update Topping**: Click the edit icon next to a topping to modify it.
4. **Delete Topping**: Click the delete icon and confirm the action.

### Managing Pizzas

1. **View Pizzas**: Navigate to the pizzas page to see all pizzas and their toppings.
2. **Create Pizza**: Click on "Create Pizza," enter a name, and select toppings.
3. **Update Pizza**: Click the edit icon next to a pizza to change its name or toppings.
4. **Delete Pizza**: Click the delete icon and confirm the action.

### Notes

- The application prevents duplicate toppings and pizza names.
- Error messages will display if you attempt to enter a duplicate.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Contact Information**

For any inquiries or support, please contact:

- **Name**: BRENT WISE
- **Email**: brentjosephwise@gmail.com

---

# Thought Process Behind Technical Choices

## Backend with Django and DRF

- **Robust Framework**: Django offers a comprehensive set of tools and features out-of-the-box, which accelerates development.
- **REST APIs with DRF**: Django REST Framework simplifies API development, providing serializers and viewsets for efficient data handling.
- **Security**: Django includes built-in protection against common web vulnerabilities.

## Frontend with React

- **Component-Based Architecture**: React allows for reusable UI components, making the codebase maintainable and scalable.
- **Responsive UI**: React's virtual DOM efficiently updates the UI, providing a smooth user experience.

## Containerization with Docker

- **Environment Consistency**: Docker ensures that the application runs the same way in development and production.
- **Simplified Deployment**: Containers bundle the application and its dependencies, making deployments straightforward.

## Deployment on Google Cloud Platform

- **Cloud Run**: Offers a serverless platform for deploying containers, automatically scaling with demand.
- **Cloud SQL**: Managed database service reduces administrative overhead and provides reliable data storage.
- **Firebase Hosting**: Delivers the frontend through a global CDN, ensuring fast load times for users worldwide.

## Testing

- **Pytest for Backend**: Provides a simple yet powerful testing framework for Django applications.
- **Jest and React Testing Library**: Facilitates writing tests for React components to ensure UI reliability.

## Monitoring and Logging

- **Google Cloud Monitoring and Logging**: Offers real-time insights into application performance and logs for troubleshooting.

# Conclusion

This project demonstrates a full-stack application utilizing modern technologies and best practices. By combining Django and React, containerizing with Docker, and deploying on GCP, the application is scalable, maintainable, and delivers a seamless user experience. The inclusion of automated tests ensures reliability, and thorough documentation aids in setup and understanding.

---

Thank you for exploring the Pizza Management System! If you have any feedback or questions, feel free to reach out.

---

## Manual Testing with Mock Backend

To perform manual testing of the frontend application using the mock backend, follow these steps:

### 1. Configure Environment Variables

Update your `.env.development` file with the following settings:

```env
REACT_APP_USE_MOCK=true
REACT_APP_USE_LOCAL_BACKEND=false
```

- **`REACT_APP_USE_MOCK=true`**: Enables the mock backend for testing purposes.
- **`REACT_APP_USE_LOCAL_BACKEND=false`**: Disables the local backend to ensure all API calls are directed to the mock backend.

### 2. Start the Frontend Application

Run the following command to start the frontend server:

```bash
npm start &
```

The `&` allows the process to run in the background, freeing up your terminal for other commands.

### 3. Perform CRUD Operations Manually

With the frontend running and connected to the mock backend, you can now manually perform all Create, Read, Update, and Delete (CRUD) operations within the application. This setup allows you to test the frontend functionality without relying on the actual backend services.

---

## Frontend Tests

### Running Automated Tests

To execute the frontend automated tests, navigate to the `frontend` directory and run:

```bash
cd frontend
npm test
```

### Current Issues with Automated Tests

**⚠️ NOTE (WARNING):**

The current version of this project has issues with the frontend automated tests due to compatibility problems between `Jest` and `MSW`. Specifically, you may encounter the following error:

```
ReferenceError: TextEncoder is not defined
```

#### Attempted Fix

To address this, an attempt was made to use `jest-fixed-jsdom` instead of the default `jest-environment-jsdom`. Here are the steps that were followed:

1. **Install `jest-fixed-jsdom`:**

   ```bash
   npm install jest-fixed-jsdom
   ```

2. **Update Jest Configuration:**

   ```javascript
   // jest.config.js
   module.exports = {
     testEnvironment: 'jest-fixed-jsdom',
   }
   ```

   The `jest-fixed-jsdom` environment is a superset of `jest-environment-jsdom` with Node.js globals restored. However, this setup led to a new error:

   ```
   TypeError: Cannot read properties of undefined (reading 'testEnvironmentOptions')
   ```

   This error indicates that there are unresolved compatibility issues that prevent the tests from running successfully.

#### Recommended Actions

Due to these challenges, the automated frontend tests are currently broken. (and have been removed from the current commit) For more information and potential workarounds, please refer to the [detailed note](#current-issues-with-automated-tests) above.

If you encounter similar issues or have solutions, contributions to resolve the testing environment are welcome.

---

## Future Considerations

Given the ongoing issues with `Jest` and `MSW`, it is recommended to consider migrating to a more modern testing framework, such as **Vitest**, which offers better compatibility and native ESM support. Vitest can alleviate many of the Node.js global issues present in the current setup and provide a more seamless testing experience. How ever this would require a complete rewrite of the react frontend code.

---

## Summary

- **Manual Testing**: Configure environment variables to use the mock backend and perform CRUD operations manually.
- **Automated Tests**: Currently facing compatibility issues; manual testing is recommended until the automated tests are fixed.
- **Future Improvements**: Consider migrating to Vitest for a more robust testing framework.

For any further assistance or to report issues, please contact the development team or open an issue in the project repository.