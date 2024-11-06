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

Create a `.env` file in the `backend` directory with the following variables:

```env
SECRET_KEY=your_secret_key
DEBUG=True
DATABASE_URL=your_database_url
```

#### 4. Apply Migrations

```bash
python manage.py migrate
```

### Frontend Setup

```bash
cd ../frontend
npm install
```

## Running the Application Locally

### Start the Backend Server

```bash
cd backend
python manage.py runserver
```

The backend server will start on `http://localhost:8000/`.

### Start the Frontend Server

```bash
cd frontend
npm start
```

The frontend React app will start on `http://localhost:3000/`.

## Running Tests

### Backend Tests

```bash
cd backend
pytest
```

### Frontend Tests

```bash
cd frontend
npm test
```

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

- **Name**: Your Name
- **Email**: your.email@example.com

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