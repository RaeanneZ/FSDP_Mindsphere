# Mindsphere Singapore Website

![Mindsphere Logo](https://mindsphere.sg/_next/static/media/logo-colour.2df06475.png)


Welcome to the Mindsphere Singapore website Fullstack Project! This application is built using React with Vite and Node.js with Express, designed to deliver a seamless experience while navigating Mindsphere’s range of training and coaching programs.

## Installation Notes

Ensure you have a `.env` file in the root directory. Check the example provided for setting up environment variables for frontend and backend functionality.

### Setting Up the Project

1. **Install dependencies:**
   - First, navigate to the **frontend** and **backend** folders and run `npm install` in both:
     ```bash
     cd frontend
     npm install
     cd ../backend
     npm install
     ```

2. **Run the Development Server:**
   - To run both the backend and frontend at the same time, execute the following command in the root folder:
     ```bash
     npm run dev
     ```

3. **Run Frontend Only:**
   - To run only the frontend, use:
     ```bash
     cd frontend
     npm run dev
     ```

4. **Run Backend Only:**
   - To run only the backend, use:
     ```bash
     cd backend
     node server.js
     ```

5. **Terminate the Server:**
   - To stop the server, press **CTRL+C** in the terminal.

## APIs and Libraries Used

This application uses a variety of APIs and libraries to enhance functionality:

- **Google API**: Integrated for various application needs, including access to location services, mapping, and authentication as required.
- **Google Drive API**: Utilized to enable seamless integration with Google Drive for data storage, document access, and secure file sharing.
- **PDFKit**: Utilized for creating, editing, and managing PDF documents programmatically, supporting reports, certificates, and downloadable materials.
- **IBM AI Chatbot**: Integrated to provide an interactive, AI-driven chatbot experience, assisting users with inquiries and providing guidance within the platform.

## Built With

- **React** and **Vite** - React library for building the user interface, enhanced by Vite for fast builds and hot module replacement.
- **Node.js** and **Express** - Backend functionality is powered by Node.js and Express, facilitating robust server-side operations.
- **ESLint** - Enforces code consistency and style.
- **MSSQL** - Provides a scalable, high-performance database for backend data handling.

---
