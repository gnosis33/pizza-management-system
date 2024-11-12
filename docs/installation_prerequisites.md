# **Install Prerequisites**

## **Backend Prerequisites**

#### 1. **Python 3.8 or Higher**

- **Download and Install:**

  - **Windows:**
    1. Visit the [Python Downloads for Windows](https://www.python.org/downloads/windows/).
    2. Download the latest Python 3.8+ installer (`python-3.x.x.exe`).
    3. Run the installer:
       - **Important:** Check the box that says **"Add Python to PATH"** before clicking **"Install Now"**.
    4. Follow the installation prompts.

  - **macOS:**
    1. Visit the [Python Downloads for macOS](https://www.python.org/downloads/macos/).
    2. Download the latest Python 3.8+ installer (`python-3.x.x-macosx.pkg`).
    3. Open the downloaded `.pkg` file and follow the installation instructions.

    - **Alternative via Homebrew:**
      ```bash
      brew install python@3.9
      ```
      *Replace `3.9` with your desired Python version.*

  - **Linux:**
    - **Ubuntu/Debian:**
      ```bash
      sudo apt update
      sudo apt install python3.8 python3.8-venv python3.8-dev
      ```
    - **Fedora:**
      ```bash
      sudo dnf install python3.8 python3.8-venv python3.8-devel
      ```
    - **Arch Linux:**
      ```bash
      sudo pacman -S python
      ```
      *Arch typically provides the latest Python version.*

- **Verification:**
  - Open your terminal or command prompt.
  - Run:
    ```bash
    python --version
    ```
    or
    ```bash
    python3 --version
    ```
  - **Expected Output:**
    ```
    Python 3.8.x
    ```

- **Note:**
  - Ensure that Python is added to your system's PATH environment variable.
  - In **VSCode**, select the correct Python interpreter:
    - Press `Ctrl + Shift + P` (or `Cmd + Shift + P` on macOS).
    - Type `Python: Select Interpreter`.
    - Choose your Python 3.8+ version.

#### 2. **Docker Desktop (for containerization)**

- **Installation Steps:**

  - **Windows:**
    - **System Requirements:**
      - Windows 10 64-bit: Pro, Enterprise, or Education (Build 1903 or higher).
      - Enable **Hyper-V** and **Containers** Windows features.
    - **Install Docker Desktop:**
      1. Download the [Docker Desktop for Windows installer](https://hub.docker.com/editions/community/docker-ce-desktop-windows).
      2. Run the installer and follow the prompts.
      3. Restart your computer if prompted.
    - **Post-Installation:**
      - Launch Docker Desktop from the Start menu.
      - Wait for Docker to start (Docker icon will appear in the system tray).

  - **macOS:**
    - **System Requirements:**
      - macOS 10.14 or newer.
    - **Install Docker Desktop:**
      1. Download Docker Desktop for Mac from the [Docker Hub](https://hub.docker.com/editions/community/docker-ce-desktop-mac).
      2. Open the downloaded `.dmg` file.
      3. Drag the **Docker.app** icon to the Applications folder.
      4. Launch Docker from the Applications folder.
    - **Post-Installation:**
      - Docker icon should appear in the menu bar.
      - Wait for Docker to start.

  - **Linux:**
    - **Install Docker Engine:**
      - Follow the official Docker installation guide for your specific Linux distribution: [Docker Engine Installation](https://docs.docker.com/engine/install/).
    - **Post-Installation:**
      1. Add your user to the `docker` group to run Docker commands without `sudo`:
         ```bash
         sudo usermod -aG docker $USER
         ```
      2. Log out and log back in for the group change to take effect.

- **Verification:**
  - Open a new terminal or command prompt.
  - Run:
    ```bash
    docker --version
    ```
  - **Expected Output:**
    ```
    Docker version 20.10.x, build xxxxxxx
    ```

#### 3. **Google Cloud SDK (for deployment)**

- **Installation Steps:**

  - **Windows:**
    1. Visit the [Google Cloud SDK Installation Page for Windows](https://cloud.google.com/sdk/docs/install#windows).
    2. Download the installer (`google-cloud-sdk-<VERSION>.exe`).
    3. Run the installer:
       - Check the option to install the `gcloud` command-line tool.
       - Optionally, select to install the Python components (recommended).
    4. Follow the installation prompts.

  - **macOS:**
    - **Using Installer:**
      1. Download the `.tar.gz` archive from the [Google Cloud SDK Installation Page for macOS](https://cloud.google.com/sdk/docs/install#mac).
      2. Open Terminal.
      3. Extract the archive:
         ```bash
         tar -xf google-cloud-sdk-*.tar.gz
         ```
      4. Run the installer script:
         ```bash
         ./google-cloud-sdk/install.sh
         ```
      5. Follow the prompts to complete the installation.

    - **Alternative via Homebrew:**
      ```bash
      brew install --cask google-cloud-sdk
      ```
      *Ensure Homebrew is installed.*

  - **Linux:**
    1. Download the `.tar.gz` archive from the [Google Cloud SDK Installation Page for Linux](https://cloud.google.com/sdk/docs/install#linux).
    2. Open Terminal.
    3. Extract the archive:
       ```bash
       tar -xf google-cloud-sdk-*.tar.gz
       ```
    4. Run the installer script:
       ```bash
       ./google-cloud-sdk/install.sh
       ```
    5. Follow the prompts to complete the installation.

- **Initialization:**
  - Run the following command to initialize the SDK:
    ```bash
    gcloud init
    ```
  - Follow the prompts to log in with your Google account and select or create a project.

- **Verification:**
  - Open a new terminal or command prompt.
  - Run:
    ```bash
    gcloud --version
    ```
  - **Expected Output:**
    ```
    Google Cloud SDK x.x.x
    bq x.x.x
    core x.x.x
    gsutil x.x.x
    ```
  
- **Note:**
  - Ensure that you have a [Google Cloud account](https://cloud.google.com/) and have set up billing (even for free tier usage).

### **Install Backend Dependencies**

#### 1. **Django**

- **Installation Steps:**

  - **All Operating Systems:**
    1. **Create a Project Directory:**
       ```bash
       mkdir backend
       cd backend
       ```
    2. **Create and Activate Virtual Environment:**
       - **Using `venv`:**
         ```bash
         python3 -m venv venv
         ```
         - **Activate Virtual Environment:**
           - **Windows:**
             ```bash
             venv\Scripts\activate
             ```
           - **macOS/Linux:**
             ```bash
             source venv/bin/activate
             ```
    3. **Upgrade `pip`:**
       ```bash
       pip install --upgrade pip
       ```
    4. **Install Django:**
       ```bash
       pip install django
       ```
    5. **Verification:**
       - Run:
         ```bash
         django-admin --version
         ```
       - **Expected Output:**
         ```
         3.x.x
         ```

#### 2. **Django REST Framework (DRF)**

- **Installation Steps:**

  - **All Operating Systems:**
    1. **Install DRF:**
       ```bash
       pip install djangorestframework
       ```
    2. **Add to Installed Apps:**
       - In your Django project's `settings.py`, add `'rest_framework'` to the `INSTALLED_APPS` list:
         ```python
         INSTALLED_APPS = [
             # ...
             'rest_framework',
         ]
         ```

#### 3. **psycopg2 (PostgreSQL Adapter)**

- **Installation Steps:**

  - **Option 1: Install `psycopg2-binary` (Recommended for Development)**
    - **All Operating Systems:**
      ```bash
      pip install psycopg2-binary
      ```

  - **Option 2: Install `psycopg2` (Recommended for Production)**
    - **Note:** Installing `psycopg2` may require PostgreSQL development headers and libraries.
    
    - **Windows:**
      1. Download and install PostgreSQL from the [official website](https://www.postgresql.org/download/windows/).
      2. Ensure that PostgreSQL's `bin` directory is added to your system's PATH.
      3. Install `psycopg2`:
         ```bash
         pip install psycopg2
         ```

    - **macOS:**
      1. Install PostgreSQL using Homebrew:
         ```bash
         brew install postgresql
         ```
      2. Install `psycopg2`:
         ```bash
         pip install psycopg2
         ```

    - **Linux:**
      - **Ubuntu/Debian:**
        ```bash
        sudo apt-get install libpq-dev
        pip install psycopg2
        ```
      - **Fedora:**
        ```bash
        sudo dnf install postgresql-devel
        pip install psycopg2
        ```
      - **Arch Linux:**
        ```bash
        sudo pacman -S postgresql-libs
        pip install psycopg2
        ```

#### 4. **Pytest and pytest-django (for Testing)**

- **Installation Steps:**

  - **All Operating Systems:**
    1. **Install Packages:**
       ```bash
       pip install pytest pytest-django
       ```
    2. **Configuration:**
       - Create a `pytest.ini` file in your project's root directory with the following content:
         ```ini
         [pytest]
         DJANGO_SETTINGS_MODULE = your_project_name.settings
         python_files = tests.py test_*.py *_tests.py
         ```
       - **Replace `your_project_name`** with your actual Django project name.

- **Note:**
  - Ensure your tests are placed in files named `test_*.py` or `*_tests.py` within your apps.

## **Frontend Prerequisites**

#### 1. **Node.js v14 or Higher**

- **Download and Install:**

  - **Windows:**
    1. Visit the [Node.js Downloads for Windows](https://nodejs.org/en/download/).
    2. Download the Windows Installer (`.msi`).
    3. Run the installer and follow the prompts.

  - **macOS:**
    1. Visit the [Node.js Downloads for macOS](https://nodejs.org/en/download/).
    2. Download the macOS Installer (`.pkg`).
    3. Open the downloaded `.pkg` file and follow the installation instructions.

    - **Alternative via Homebrew:**
      ```bash
      brew install node@14
      ```

  - **Linux:**
    - **Using NodeSource (Recommended for Latest Versions):**
      ```bash
      # For Node.js 14.x
      curl -fsSL https://deb.nodesource.com/setup_14.x | sudo -E bash -
      sudo apt-get install -y nodejs
      ```
      *Adjust the setup script URL based on your Linux distribution and desired Node.js version.*

    - **Using Package Manager:**
      - **Ubuntu/Debian:**
        ```bash
        sudo apt update
        sudo apt install nodejs npm
        ```
      - **Fedora:**
        ```bash
        sudo dnf install nodejs npm
        ```
      - **Arch Linux:**
        ```bash
        sudo pacman -S nodejs npm
        ```

- **Verification:**
  - Open your terminal or command prompt.
  - Run:
    ```bash
    node -v
    ```
  - **Expected Output:**
    ```
    v14.x.x
    ```

#### 2. **npm Package Manager**

- **Installation:**
  - npm is included with Node.js. Installing Node.js as per the steps above will install npm.

- **Verification:**
  - Open your terminal or command prompt.
  - Run:
    ```bash
    npm -v
    ```
  - **Expected Output:**
    ```
    6.x.x
    ```

- **Note:**
  - If you encounter issues, ensure that Node.js and npm are correctly installed and added to your system's PATH.

### **Global Tools (Optional but Recommended)**

#### 1. **Git for Version Control**

- **Download and Install:**

  - **Windows:**
    1. Visit the [Git Downloads for Windows](https://git-scm.com/download/win).
    2. Download the installer.
    3. Run the installer and follow the prompts.

  - **macOS:**
    - **Using Installer:**
      1. Visit the [Git Downloads for macOS](https://git-scm.com/download/mac).
      2. Download the `.dmg` installer.
      3. Open the downloaded file and follow the installation instructions.

    - **Alternative via Homebrew:**
      ```bash
      brew install git
      ```

  - **Linux:**
    - **Ubuntu/Debian:**
      ```bash
      sudo apt update
      sudo apt install git
      ```
    - **Fedora:**
      ```bash
      sudo dnf install git
      ```
    - **Arch Linux:**
      ```bash
      sudo pacman -S git
      ```

- **Verification:**
  - Open your terminal or command prompt.
  - Run:
    ```bash
    git --version
    ```
  - **Expected Output:**
    ```
    git version 2.x.x
    ```

#### 2. **Virtual Environment Tools (`venv` or `virtualenv` for Python)**

- **Note:**
  - **Python 3** comes with `venv` built-in.
  - If you prefer using `virtualenv`, it can be installed via `pip`:
    ```bash
    pip install virtualenv
    ```

- **Usage:**
  - **Using `venv`:**
    ```bash
    python3 -m venv venv
    ```
  - **Using `virtualenv`:**
    ```bash
    virtualenv venv
    ```

- **Activation:**
  - **Windows:**
    ```bash
    venv\Scripts\activate
    ```
  - **macOS/Linux:**
    ```bash
    source venv/bin/activate
    ```

---

## **Additional Recommendations**

1. **Verify Router Basenames:**
   - Ensure that when you register your viewsets with the router in `api/urls.py`, you provide explicit `basename` values. This helps Django correctly map URL names used in the `reverse` function.
   - **Example:**
     ```python
     # backend/api/urls.py

     from django.urls import path, include
     from rest_framework import routers
     from .views import ToppingViewSet, PizzaViewSet

     router = routers.DefaultRouter()
     router.register(r'toppings', ToppingViewSet, basename='topping')
     router.register(r'pizzas', PizzaViewSet, basename='pizza')

     urlpatterns = [
         path('', include(router.urls)),
     ]
     ```

2. **Use Relative Paths:**
   - Ensure that your `README.md` links use relative paths for better portability.
   - **Example:**
     ```markdown
     [Prerequisites](docs/installation_prerequisites.md)
     ```

3. **Preview Your Markdown:**
   - Before committing your changes, use a Markdown preview tool or GitHub's preview feature to ensure that all links and formatting appear correctly.

4. **Consider Using a `.env` File for Environment Variables:**
   - To manage sensitive information and configuration settings, use a `.env` file and the `python-dotenv` package.
   - **Installation:**
     ```bash
     pip install python-dotenv
     ```
   - **Usage:**
     - Create a `.env` file in your project's root directory.
     - Add your environment variables:
       ```
       SECRET_KEY=your_secret_key_here
       DEBUG=True
       DATABASE_URL=postgres://user:password@localhost:5432/mydatabase
       ```
     - Load the `.env` file in your `settings.py`:
       ```python
       import os
       from dotenv import load_dotenv

       load_dotenv()

       SECRET_KEY = os.getenv('SECRET_KEY')
       DEBUG = os.getenv('DEBUG') == 'True'
       DATABASES = {
           'default': {
               'ENGINE': 'django.db.backends.postgresql',
               'NAME': os.getenv('DATABASE_NAME'),
               'USER': os.getenv('DATABASE_USER'),
               'PASSWORD': os.getenv('DATABASE_PASSWORD'),
               'HOST': os.getenv('DATABASE_HOST'),
               'PORT': os.getenv('DATABASE_PORT'),
           }
       }
       ```

5. **Ensure Database Migrations Are Applied Correctly:**
   - Before running your application, make sure all migrations are created and applied:
     ```bash
     python manage.py makemigrations
     python manage.py migrate
     ```

6. **Set Up Continuous Integration (CI):**
   - Integrate your tests into a CI pipeline (e.g., GitHub Actions, Travis CI) to automatically run tests on code changes.

7. **Use Factories for Test Data:**
   - Consider using libraries like [Factory Boy](https://factoryboy.readthedocs.io/en/stable/) to create test data more efficiently.


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

