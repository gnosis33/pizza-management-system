## **Install Prerequisites**

### **Backend Prerequisites**

1. **Python 3.8 or Higher** *(Already have using VSCode)*

    -**Download**
     - download and install latest stable version of python from [Python](https://www.python.org/downloads/).

   - **Verification:**
     - Open your terminal or command prompt.
     - Run `python --version` or `python3 --version` to confirm your Python version is 3.8 or higher.
     - Example:
       ```
       $ python3 --version
       Python 3.9.7
       ```

   - **Note:**
     - Ensure that Python is added to your system's PATH environment variable.
     - Since you're using VSCode, you might want to select the correct Python interpreter in VSCode by pressing `Ctrl + Shift + P` (or `Cmd + Shift + P` on macOS), typing `Python: Select Interpreter`, and choosing your Python 3.8+ version.

2. **Docker Desktop (for containerization)** *[Need]*

   - **Installation Steps:**

     - **Windows:**

       - **System Requirements:**
         - Windows 10 64-bit: Pro, Enterprise, or Education (Build 1903 or higher).
         - Enable Hyper-V and Containers Windows features.

       - **Install Docker Desktop:**
         - Download the Docker Desktop for Windows installer from the [Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-windows).
         - Run the installer and follow the prompts.
         - Restart your computer if prompted.

       - **Post-Installation:**
         - Launch Docker Desktop from the Start menu.
         - Wait for Docker to start (Docker icon will appear in the system tray).

     - **macOS:**

       - **System Requirements:**
         - macOS 10.14 or newer.

       - **Install Docker Desktop:**
         - Download Docker Desktop for Mac from the [Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-mac).
         - Open the downloaded `.dmg` file.
         - Drag the Docker.app icon to the Applications folder.
         - Launch Docker from the Applications folder.

       - **Post-Installation:**
         - Docker icon should appear in the menu bar.
         - Wait for Docker to start.

     - **Linux:**

       - **Install Docker Engine:**
         - Follow the official Docker installation guide for your specific Linux distribution: [Docker Engine Installation](https://docs.docker.com/engine/install/).

       - **Post-Installation:**
         - Add your user to the `docker` group to run Docker commands without `sudo`:
           ```bash
           sudo usermod -aG docker $USER
           ```
         - Log out and log back in for the group change to take effect.

     - **Verification:**
       - Open a new terminal or command prompt.
       - Run `docker --version` to confirm Docker is installed.
       - Example:
         ```
         $ docker --version
         Docker version 20.10.8, build 3967b7d
         ```

3. **Google Cloud SDK (for deployment)** *[Need]*

   - **Installation Steps:**

     - **Windows:**

       - **Download Installer:**
         - Visit the [Google Cloud SDK installation page](https://cloud.google.com/sdk/docs/install#windows) for Windows.
         - Download the installer (`google-cloud-sdk-<VERSION>.exe`).

       - **Run Installer:**
         - Double-click the installer.
         - Check the option to install `gcloud` command-line tool and to start the Cloud SDK Shell.
         - Optionally, select to install the Python components (recommended).

       - **Verification:**
         - Open Command Prompt or PowerShell.
         - Run `gcloud --version` to verify installation.

     - **macOS:**

       - **Using Installer:**
         - Download the `.tar.gz` archive from the [Google Cloud SDK installation page](https://cloud.google.com/sdk/docs/install#mac).

       - **Install:**
         - Open Terminal.
         - Extract the archive:
           ```bash
           tar -xf google-cloud-sdk-*.tar.gz
           ```
         - Run the installer script:
           ```bash
           ./google-cloud-sdk/install.sh
           ```

       - **Verification:**
         - Restart your terminal or run `exec -l $SHELL`.
         - Run `gcloud --version` to verify installation.

     - **Linux:**

       - **Download Archive:**
         - Download the `.tar.gz` archive from the [Google Cloud SDK installation page](https://cloud.google.com/sdk/docs/install#linux).

       - **Install:**
         - Open Terminal.
         - Extract the archive:
           ```bash
           tar -xf google-cloud-sdk-*.tar.gz
           ```
         - Run the installer script:
           ```bash
           ./google-cloud-sdk/install.sh
           ```

       - **Verification:**
         - Restart your terminal or run `exec -l $SHELL`.
         - Run `gcloud --version` to verify installation.

   - **Initialize Google Cloud SDK:**

     - Run the following command:
       ```bash
       gcloud init
       ```
     - Follow the prompts to log in with your Google account and select or create a project.

   - **Note:**
     - Ensure that you have a Google Cloud account and have set up billing (even for free tier usage).

### **Install Backend Dependencies**

1. **Django** *[Need]*

   - **Installation Steps:**

     - **Create a Project Directory:**

       ```bash
       mkdir backend
       cd backend
       ```

     - **Create and Activate Virtual Environment:**

       - **Using `venv`:**

         - Create virtual environment:
           ```bash
           python3 -m venv venv
           ```
         - Activate virtual environment:

           - On Windows:
             ```bash
             venv\Scripts\activate
             ```
           - On macOS/Linux:
             ```bash
             source venv/bin/activate
             ```

     - **Upgrade `pip`:**

       ```bash
       pip install --upgrade pip
       ```

     - **Install Django:**

       ```bash
       pip install django
       ```

     - **Verification:**

       - Run `django-admin --version` to confirm installation.

2. **Django REST Framework (DRF)** *[Need]*

   - **Installation Steps:**

     - **Install DRF:**

       ```bash
       pip install djangorestframework
       ```

     - **Add to Installed Apps:**

       - In your Django project's `settings.py`, add `'rest_framework'` to the `INSTALLED_APPS` list:
         ```python
         INSTALLED_APPS = [
             # ...
             'rest_framework',
         ]
         ```

3. **psycopg2 (PostgreSQL adapter)** *[Need]*

   - **Installation Steps:**

     - **Option 1: Install `psycopg2-binary` (Recommended for Development):**

       ```bash
       pip install psycopg2-binary
       ```

     - **Option 2: Install `psycopg2` (Recommended for Production):**

       - **Note:** Installing `psycopg2` may require PostgreSQL development headers and libraries.

       - **Install Dependencies (if necessary):**

         - **On macOS:**
           ```bash
           brew install postgresql
           ```
         - **On Linux (Ubuntu/Debian):**
           ```bash
           sudo apt-get install libpq-dev
           ```
         - **On Windows:**
           - Download and install PostgreSQL from the [official website](https://www.postgresql.org/download/windows/).

       - **Install `psycopg2`:**

         ```bash
         pip install psycopg2
         ```

4. **Pytest and pytest-django (for testing)** *[Need]*

   - **Installation Steps:**

     - **Install Packages:**

       ```bash
       pip install pytest pytest-django
       ```

     - **Configuration:**

       - Create a `pytest.ini` file in your project's root directory with the following content:
         ```ini
         [pytest]
         DJANGO_SETTINGS_MODULE = your_project_name.settings
         python_files = tests.py test_*.py *_tests.py
         ```
       - Replace `your_project_name` with your actual Django project name.

   - **Note:**

     - Ensure your tests are placed in files named `test_*.py` or `*_tests.py` within your apps.

### **Frontend Prerequisites**

1. **Node.js v14 or Higher** *(Already have)*

   - **Verification:**

     - Open your terminal or command prompt.
     - Run `node -v` to check the installed Node.js version.
     - Example:
       ```
       $ node -v
       v14.17.0
       ```

2. **npm Package Manager** *(Already have)*

   - **Verification:**

     - Run `npm -v` to check the installed npm version.
     - Example:
       ```
       $ npm -v
       6.14.13
       ```

   - **Note:**

     - npm is included with Node.js by default.

### **Global Tools (Optional but Recommended)**

1. **Git for Version Control** *(Already have)*

   - **Verification:**

     - Run `git --version` to verify the installation.
     - Example:
       ```
       $ git --version
       git version 2.31.1
       ```

2. **Virtual Environment Tools (`venv` or `virtualenv` for Python)** *(Already have)*

   - **Note:**

     - Python 3 comes with `venv` built-in.
     - `virtualenv` can be installed via `pip` if preferred:
       ```bash
       pip install virtualenv
       ```

---

## **Additional Steps and Notes**

### **Setting Up the Backend Project**

1. **Create a Django Project:**

   - Ensure your virtual environment is activated.

   - **Navigate to Backend Directory:**

     ```bash
     cd backend
     ```

   - **Start a New Django Project:**

     ```bash
     django-admin startproject pizza_project .
     ```

   - **Create a Django App:**

     ```bash
     python manage.py startapp pizza_app
     ```

   - **Add `pizza_app` to `INSTALLED_APPS` in `settings.py`:**

     ```python
     INSTALLED_APPS = [
         # ...
         'pizza_app',
         'rest_framework',
     ]
     ```

2. **Install Additional Dependencies (If Needed):**

   - **For CORS Handling (If your frontend is on a different domain):**

     ```bash
     pip install django-cors-headers
     ```

   - **Configure CORS in `settings.py`:**

     ```python
     INSTALLED_APPS = [
         # ...
         'corsheaders',
     ]

     MIDDLEWARE = [
         'corsheaders.middleware.CorsMiddleware',
         # ...
     ]

     CORS_ORIGIN_ALLOW_ALL = True  # Or specify allowed origins
     ```

### **Setting Up the Frontend Project**

1. **Create a React App:**

   - **Navigate to Project Root Directory:**

     ```bash
     cd ..
     ```

   - **Create Frontend Directory and Initialize React App:**

     ```bash
     npx create-react-app frontend
     ```

   - **Navigate to Frontend Directory:**

     ```bash
     cd frontend
     ```

2. **Install Frontend Dependencies:**

   - **React Router (For Routing):**

     ```bash
     npm install react-router-dom
     ```

   - **Axios (For HTTP Requests):**

     ```bash
     npm install axios
     ```

   - **Bootstrap (For Styling, Optional):**

     ```bash
     npm install bootstrap
     ```

     - **Import Bootstrap in `src/index.js`:**

       ```javascript
       import 'bootstrap/dist/css/bootstrap.min.css';
       ```

   - **React Testing Library and Jest (For Testing):**

     - Already included with Create React App.

3. **Set Up Project Structure:**

   - **Create Folders:**

     - `src/components/` for reusable components.
     - `src/pages/` for page components.
     - `src/services/` for API calls.
     - `src/styles/` for custom CSS.

### **Initialize Git Repository**

1. **Initialize Git in Project Root Directory:**

   ```bash
   git init
   ```

2. **Create a `.gitignore` File:**

   - Add the following entries to exclude unnecessary files:

     ```
     # Python
     venv/
     __pycache__/

     # Node
     node_modules/

     # Django
     *.pyc
     db.sqlite3

     # Environment Variables
     .env

     # Others
     .DS_Store
     ```

3. **Make Initial Commit:**

   ```bash
   git add .
   git commit -m "Initial commit - Set up project structure and install prerequisites"
   ```

---

## **Next Steps**

Now that you have installed all the necessary prerequisites and set up the initial project structure, you can proceed to the next steps in your development plan:

- **Step 2.2: Backend Setup**

  - Configure your Django settings, including database configurations.
  - Define your data models for `Topping` and `Pizza`.
  - Set up Django REST Framework serializers and views.

- **Step 2.3: Frontend Setup**

  - Start building out your React components.
  - Set up routing for different pages (e.g., Toppings Management, Pizzas Management).
  - Implement API service functions to communicate with your backend.

---

## **Additional Tips**

- **Virtual Environments:**

  - Always activate your virtual environment before working on the backend to ensure dependencies are managed correctly.

- **Version Control:**

  - Commit changes frequently with descriptive messages.
  - Consider using branches for new features or experiments.

- **Documentation:**

  - Keep your `README.md` updated with any new steps or changes.
  - Document any issues encountered and their solutions.

- **Testing:**

  - Begin writing tests early to ensure your code works as expected.
  - Use test-driven development (TDD) practices if possible.

- **Security:**

  - Never commit sensitive information (like API keys or database passwords) to your repository.
  - Use environment variables to manage secrets securely.

