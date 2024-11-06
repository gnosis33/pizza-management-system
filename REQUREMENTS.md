## **Additional Requirements**

### **1. Data Persistence**

**Question:** How does the application implement data persistence to ensure data remains available across page refreshes and revisits, using a server-side or cloud-based database rather than local storage mechanisms?

**Answer:**

- **Database Choice:**

  - The application uses **Cloud SQL (PostgreSQL)**, a managed relational database service provided by **Google Cloud Platform (GCP)**.
  - PostgreSQL is a powerful, open-source relational database that integrates seamlessly with Django's ORM, ensuring efficient data handling.

- **Implementation Details:**

  - **Backend Integration:**

    - Django's settings are configured to connect to the Cloud SQL PostgreSQL instance using environment variables for secure credential management.
    - The application uses Django's built-in ORM for all database interactions, which provides an abstraction over SQL queries and ensures data integrity.

  - **Persistent Storage:**

    - All data related to toppings and pizzas is stored in the Cloud SQL database.
    - This ensures that data persists between sessions, page refreshes, and is accessible from any client connected to the application.

- **Benefits:**

  - **Reliability and Scalability:**

    - Cloud SQL offers high availability and can scale vertically to accommodate growing data and user loads.
    - Being a managed service, it reduces operational overhead, such as patching and backups.

  - **Security:**

    - Cloud SQL provides robust security features, including data encryption at rest and in transit.
    - Secure connections between the application and the database are established using SSL/TLS protocols.

- **Why Not Local Storage:**

  - Relying on local storage mechanisms like browser local storage would limit data availability to a single client device and session.
  - Using a cloud-based database ensures that all users interact with the same data set, enabling collaboration and consistent data management.

---

### **2. Automated Test Suite**

**Question:** Does the application include an automated test suite covering key functionalities, and how can these tests be executed as documented in the README?

**Answer:**

- **Backend Tests:**

  - **Framework Used:**

    - The application uses **Pytest** in conjunction with **pytest-django** for writing and running automated tests for the backend.
    - Pytest provides a simple and powerful testing environment that integrates well with Django.

  - **Test Coverage:**

    - **Models:**

      - Tests ensure that the `Topping` and `Pizza` models enforce uniqueness constraints.
      - Verify that relationships between pizzas and toppings are correctly established.

    - **Views and APIs:**

      - Tests for all CRUD operations on toppings and pizzas.
      - Verify that appropriate HTTP responses are returned (e.g., 200 OK, 400 Bad Request).

    - **Validation:**

      - Ensure that attempts to create duplicate toppings or pizzas are properly handled and return meaningful error messages.

- **Frontend Tests:**

  - **Framework Used:**

    - The frontend uses **Jest** and **React Testing Library** for testing React components.

  - **Test Coverage:**

    - **Component Rendering:**

      - Tests to ensure components render correctly with given props.
      - Snapshot tests to detect unexpected changes in the UI.

    - **User Interactions:**

      - Simulate user actions like clicking buttons, submitting forms, and ensure the application responds appropriately.

    - **API Integration:**

      - Mock API calls to test how components handle data retrieval and submission.

- **Running Tests:**

  - **Backend Tests:**

    - Instructions provided in the README:

      ```bash
      cd backend
      pytest
      ```

  - **Frontend Tests:**

    - Instructions provided in the README:

      ```bash
      cd frontend
      npm test
      ```

- **Documentation:**

  - The README includes detailed instructions on setting up the testing environment and running tests.
  - It also provides an overview of what the tests cover and how to interpret the results.

---

### **3. Code Quality**

**Question:** How does the application ensure high code quality in terms of readability, maintainability, and adherence to best practices?

**Answer:**

- **Coding Standards:**

  - **Backend:**

    - Adheres to **PEP 8** guidelines for Python code.
    - Uses meaningful variable and function names for clarity.
    - Comments and docstrings are added to explain complex logic and provide context.

  - **Frontend:**

    - Follows industry-standard practices for React and JavaScript ES6+.
    - Uses **Airbnb's JavaScript style guide** as a reference for consistency.

- **Code Organization:**

  - **Modular Design:**

    - Backend code is organized into apps and modules, separating concerns (e.g., models, views, serializers).
    - Frontend components are organized logically, with separate folders for components, services, and utilities.

- **Best Practices:**

  - **Version Control:**

    - Frequent commits with clear, descriptive messages.
    - Use of feature branches for new functionalities, merged into the main branch after code review.

  - **Error Handling:**

    - Proper try-except blocks in Python to handle exceptions gracefully.
    - Frontend includes error boundaries to catch and display errors.

- **Code Reviews:**

  - Though this is a solo project, code has been reviewed thoroughly before commits to ensure quality.

- **Automated Tools:**

  - **Linters and Formatters:**

    - Backend uses **flake8** and **black** for linting and code formatting.
    - Frontend uses **ESLint** and **Prettier** to maintain code consistency.

- **Maintainability:**

  - Code is written with future scalability in mind, allowing for easy addition of new features.
  - Functions and components are reusable and modular.

---

### **4. User Interface**

**Question:** How does the application ensure that the user interface is functional, easy to use, intuitive, and responsive?

**Answer:**

- **Frontend Framework:**

  - The application uses **React**, which facilitates building an interactive and responsive UI with component-based architecture.

- **Design and Usability:**

  - **Intuitive Navigation:**

    - Clear menus and navigation paths allow users to move between managing toppings and pizzas effortlessly.

  - **Form Design:**

    - Forms for adding or updating toppings and pizzas are straightforward, with validation messages displayed to guide the user.

  - **Feedback Mechanisms:**

    - Success and error notifications inform the user of the result of their actions (e.g., topping added successfully, duplicate pizza name).

- **Responsive Design:**

  - **CSS Framework:**

    - Utilizes **Bootstrap** or **Material-UI** for responsive design components, ensuring the application looks good on all screen sizes.

  - **Media Queries and Flexbox/Grid:**

    - Custom CSS uses media queries to adjust layouts for mobile, tablet, and desktop views.

- **Accessibility:**

  - Semantic HTML elements are used to enhance accessibility.
  - Form elements have associated labels for screen readers.

- **Performance:**

  - Components are optimized to minimize re-renders.
  - Lazy loading is implemented for components where appropriate.

---

### **5. Deployment**

**Question:** How is the application deployed to a cloud provider, and is it publicly accessible?

**Answer:**

- **Cloud Provider:**

  - The application is deployed on **Google Cloud Platform (GCP)**.

- **Backend Deployment:**

  - **Google Cloud Run:**

    - The backend is containerized using Docker and deployed to Cloud Run.
    - Cloud Run provides a serverless environment that scales automatically based on traffic.

  - **Deployment Steps:**

    1. **Containerization:**

       - A `Dockerfile` is used to define the container environment.
       - The image includes the Django application and all dependencies.

    2. **Container Registry:**

       - The Docker image is pushed to **Google Container Registry**.

    3. **Cloud Run Deployment:**

       - The image is deployed to Cloud Run with proper configuration to connect to the Cloud SQL database.

- **Frontend Deployment:**

  - **Firebase Hosting:**

    - The React frontend is built and deployed to Firebase Hosting.
    - Firebase provides a global CDN for fast content delivery.

- **Public Accessibility:**

  - The application is accessible via a public URL.
  - Proper DNS settings are configured if a custom domain is used.

- **Security Measures:**

  - HTTPS is enforced for secure communication.
  - Environment variables and secrets are managed securely using GCP's Secret Manager.

---

### **6. Documentation**

**Question:** Does the README file contain detailed instructions on how to build, test, and run the application locally, and does it include an overview and explanation of technical choices?

**Answer:**

- **Detailed Instructions:**

  - **Building and Running Locally:**

    - Step-by-step instructions are provided for both the backend and frontend.
    - Instructions cover cloning the repository, setting up virtual environments, installing dependencies, and configuring environment variables.

  - **Testing:**

    - Instructions on how to run backend and frontend tests are clearly outlined.
    - Information on setting up any necessary testing environments or databases.

- **Project Overview:**

  - The README starts with a clear description of the application's purpose and features.
  - Provides context on who the application is for and what problems it solves.

- **Technical Choices:**

  - A dedicated section explains the rationale behind each technology selected.
  - Discusses benefits and trade-offs, demonstrating thoughtful decision-making.

- **Additional Documentation:**

  - **Usage Guide:**

    - Offers guidance on how to use the application, including screenshots where helpful.

  - **Contributing Guidelines:**

    - Instructions for how others can contribute to the project.

  - **Contact Information:**

    - Provides a way for users or reviewers to reach out with questions or feedback.

---

## **Stories**

### **Readme**

**Question:** Does the README describe the steps required for building, running, and testing the application locally?

**Answer:**

- **Building and Running:**

  - The README includes comprehensive instructions for setting up the development environment.
  - Instructions cover cloning the repository, setting up virtual environments, installing dependencies, and configuring environment variables.

- **Running Tests:**

  - Provides clear commands to execute tests for both backend and frontend.
  - Explains any additional setup required before running tests.

- **Clarity and Organization:**

  - The README is well-organized with a table of contents for easy navigation.
  - Uses markdown formatting for readability, including code blocks, headings, and bullet points.

---

### **Manage Toppings**

**As a pizza store owner, I should be able to manage toppings available for my pizza chefs.**

**Implementation Details:**

- **Viewing Available Toppings:**

  - **Backend:**

    - An API endpoint (`GET /api/toppings/`) retrieves a list of all toppings.
    - Implements pagination for performance with large datasets.

  - **Frontend:**

    - A user-friendly interface displays the list of toppings.
    - Toppings are presented in a table or list with options to edit or delete.

- **Adding a New Topping:**

  - **Backend:**

    - API endpoint (`POST /api/toppings/`) allows adding a new topping.
    - Validates data to ensure no duplicates are entered.

  - **Frontend:**

    - A form is provided to input the name of the new topping.
    - Real-time validation alerts the user if the topping already exists.

- **Deleting an Existing Topping:**

  - **Backend:**

    - API endpoint (`DELETE /api/toppings/{id}/`) removes a topping.
    - Checks for dependencies (e.g., pizzas that use the topping) before deletion.

  - **Frontend:**

    - Users can delete a topping via a button or icon.
    - A confirmation dialog prevents accidental deletions.

- **Updating an Existing Topping:**

  - **Backend:**

    - API endpoint (`PUT /api/toppings/{id}/`) updates topping details.
    - Validates to prevent renaming to an existing topping.

  - **Frontend:**

    - An edit form pre-populates with the current topping name.
    - Users can modify and save changes easily.

- **Preventing Duplicate Toppings:**

  - **Validation:**

    - Backend enforces uniqueness at the database level.
    - Frontend provides immediate feedback if a duplicate is entered.

---

### **Manage Pizzas**

**As a pizza chef, I should be able to create new pizza masterpieces.**

**Implementation Details:**

- **Viewing Existing Pizzas and Their Toppings:**

  - **Backend:**

    - API endpoint (`GET /api/pizzas/`) retrieves pizzas with their associated toppings.
    - Efficient queries using `select_related` or `prefetch_related`.

  - **Frontend:**

    - Displays a list of pizzas, each showing its name and toppings.
    - Allows quick identification and selection for editing or deletion.

- **Creating a New Pizza and Adding Toppings:**

  - **Backend:**

    - API endpoint (`POST /api/pizzas/`) allows creation of a new pizza.
    - Accepts pizza name and a list of topping IDs.

  - **Frontend:**

    - A form allows entering the pizza name and selecting toppings via checkboxes or a multi-select dropdown.
    - Provides validation and user feedback.

- **Deleting an Existing Pizza:**

  - **Backend:**

    - API endpoint (`DELETE /api/pizzas/{id}/`) deletes the specified pizza.

  - **Frontend:**

    - Users can delete a pizza using a button or icon.
    - Confirmation prompts ensure intentional actions.

- **Updating an Existing Pizza and Its Toppings:**

  - **Backend:**

    - API endpoint (`PUT /api/pizzas/{id}/`) updates pizza details and associated toppings.

  - **Frontend:**

    - Edit form allows changing the pizza name and modifying its toppings.
    - Real-time updates reflect changes immediately.

- **Preventing Duplicate Pizzas:**

  - **Validation:**

    - Backend enforces unique pizza names.
    - Frontend alerts users attempting to create or rename to a duplicate pizza.

---

### **Deployment**

**Question:** How is the project deployed to a cloud service, and what options are available for free resources?

**Answer:**

- **Deployment to GCP:**

  - The application is deployed to **Google Cloud Platform**, leveraging free tier options.

- **Services Used:**

  - **Google Cloud Run:**

    - Backend services are deployed here, benefiting from a generous free tier.
    - Auto-scaling and serverless capabilities reduce costs when the app is not in heavy use.

  - **Firebase Hosting:**

    - Frontend is hosted on Firebase, which offers free hosting for static sites.

  - **Cloud SQL:**

    - Uses the free trial credits for initial deployment.
    - For long-term use, may require minimal investment or switching to an alternative like **Google Cloud Firestore** for smaller datasets.

- **Alternative Free Resources:**

  - **Fly.io:**

    - Could be used for deploying Docker containers with a free tier.

  - **Heroku:**

    - Offers a free tier suitable for small projects.

  - **AWS Free Tier:**

    - AWS Elastic Beanstalk and RDS offer free tiers for initial use.

- **Deployment Steps:**

  - Instructions are provided in the README for deploying the application.
  - Includes setting up GCP services, configuring environment variables, and deploying via the command line.

- **Public Accessibility:**

  - The application is publicly accessible at the provided URL.
  - SSL certificates are set up to ensure secure connections.
