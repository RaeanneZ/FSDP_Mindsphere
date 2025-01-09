
# Mindsphere Singapore Website

  

![Mindsphere Logo](https://mindsphere.sg/_next/static/media/logo-colour.2df06475.png)

  
  

Welcome to the Mindsphere Singapore website Fullstack Project! This application is built using React with Vite and Node.js with Express, designed to deliver a seamless experience while navigating Mindsphere’s range of training and coaching programs.

  

## Installation Notes

  

Ensure you have a `.env` file in the root directory. Check the example provided for setting up environment variables for frontend and backend functionality.

  

### Setting Up the Project

  

1.  **Install dependencies:**

- First, navigate to the **root** directory and run this in the terminal and install the required modules:

```bash

npm run setup

```

  

2.  **Run the Backend & Frontend Servers concurrently for *development*:**

- To run both the backend and frontend at the same time for development, execute the following command in the root folder:

```bash

npm run dev

```

3.  **Run the Backend & Frontend Servers concurrently for *production*:**

- To run both the backend and frontend at the same time for development, execute the following command in the root folder:
- **The difference between this script and 2 is that it installs the required modules and runs the server**

```bash

npm run production

```

  

3.  **Run Frontend Only:**

- To run only the frontend, execute this command in the terminal in the root folder:

```bash

npm run frontend

```

  

4.  **Run Backend Only:**

- To run only the backend, execute this command in the terminal in the root folder:

```bash

npm run backend

```

  

5.  **Terminate the Server:**

- To stop the server, press **CTRL+C** in the terminal.

6. **API Documentation**
- You can view the API Documentation by navigating to **localhost:5000/api-docs** once the servers are up and running

  

## APIs and Libraries Used

  

This application uses a variety of APIs and libraries to enhance functionality:

  

-  **Google API**: Integrated for various application needs, including access to location services, mapping, and authentication as required.

-  **Google Drive API**: Utilized to enable seamless integration with Google Drive for data storage, document access, and secure file sharing.

-  **PDFKit**: Utilized for creating, editing, and managing PDF documents programmatically, supporting reports, certificates, and downloadable materials.

-  **IBM AI Chatbot**: Integrated to provide an interactive, AI-driven chatbot experience, assisting users with inquiries and providing guidance within the platform.

  

## Built With

  

-  **React** and **Vite** - React library for building the user interface, enhanced by Vite for fast builds and hot module replacement.

-  **Node.js** and **Express** - Backend functionality is powered by Node.js and Express, facilitating robust server-side operations.

-  **ESLint** - Enforces code consistency and style.

-  **MSSQL** - Provides a scalable, high-performance database for backend data handling.

  

---