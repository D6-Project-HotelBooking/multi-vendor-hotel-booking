# Hotel Booking System - Full Stack Application

 A comprehensive, multi-vendor hotel reservation platform built with a modern technology stack. This application provides a seamless, role-based experience for customers, hotel managers, and administrators to browse, book, and manage hotel accommodations.

-----

## ✨ Features

This project is divided into three main user roles, each with a specific set of powerful features.

### 👩‍💻 Public & Customer Features

  - **Dynamic Homepage:** Browse a complete list of all hotels.
  - **Advanced Filtering:** Filter hotels by **Location** and available **Facilities**.
  - **Detailed Hotel Views:** View a dedicated page for each hotel with an image carousel, full description, facilities list, and customer reviews.
  - **Real-time Availability Check:** Check the number of available rooms for any given date range before booking.
  - **Secure User Authentication:** Customers can register and log in securely using a JWT-based system.
  - **Customer Booking:** Logged-in customers can book rooms for their desired dates.
  - **Personal Booking Dashboard:** Customers can view their complete booking history with up-to-date statuses (Pending, Approved, Cancelled).
  - **Submit Reviews:** Customers can leave ratings and comments for hotels.

### 🏨 Hotel Manager Features

  - **Dedicated Dashboard:** A central hub for all management tasks.
  - **View Hotel Bookings:** See a complete list of all bookings for the manager's specific hotel.
  - **Update Booking Status:** Approve or cancel pending reservations.
  - **Edit Hotel Details:** Update the hotel's name, description, price, total rooms, and images.
  - **Manage Facilities:** Add or remove facilities for their specific hotel.
  - **Check Availability:** A tool to check room availability for any date range for planning purposes.

### 👑 Administrator Features

  - **Comprehensive Admin Dashboard:** A full suite of tools to manage the entire platform.
  - **Manage Locations:** Add new cities where hotels can be located.
  - **Manage Facilities:** Add new facilities that can be assigned to hotels.
  - **Manage Hotels:** Add new hotels, edit any existing hotel's details, and assign managers.
  - **Register New Managers:** Create new user accounts with the "Hotel Manager" role.
  - **View All System Bookings:** A complete overview of every booking made on the platform.

-----

## 🛠️ Technology Stack

This project is built with a modern, robust, and scalable technology stack.

| Area | Technology | Description |
| :--- | :--- | :--- |
| **Backend** | **Java 17 & Spring Boot** | Core framework for building the robust and secure REST API. |
| | **Spring Security** | For handling JWT-based authentication and role-based authorization. |
| | **Spring Data JPA & Hibernate** | For elegant and powerful database interaction and object-relational mapping (ORM). |
| | **MySQL** | The relational database used to store all application data. |
| | **Maven** | For project dependency management. |
| **Frontend**| **React (Vite)** | A modern JavaScript library for building a fast and interactive Single Page Application (SPA). |
| | **React Router** | For handling all client-side navigation and routing. |
| | **Axios** | For making asynchronous HTTP requests to the backend API. |
| | **Bootstrap 5** | For creating a responsive and professional-looking user interface. |
| | **Node.js & npm** | The runtime environment and package manager for the frontend. |
| **DevOps** | **Git & GitHub** | For version control and collaborative development. |

-----

## 🚀 Getting Started: How to Run This Project

Follow these steps to set up and run the application on your local machine.

### Prerequisites

Make sure you have the following software installed on your computer:

  - **Java Development Kit (JDK)** - version 17 or higher
  - **Node.js and npm** - version 18 or higher
  - **MySQL Server**
  - **Git**

### 1\. Clone the Repository

First, clone the project from GitHub to your local machine.

```bash
git clone https://github.com/D6-Project-HotelBooking/multi-vendor-hotel-booking.git
cd multi-vendor-hotel-booking
```

### 2\. Backend Setup (Spring Boot)

1.  **Create and Populate the Database:**

      * Open your MySQL client (e.g., MySQL Workbench).
      * Create the database: `CREATE DATABASE hotel_booking_db;`
      * Run the provided `database_setup.sql` script to create all tables and populate them with dummy data.

2.  **Configure the Database Connection:**

      * Open the `backend` folder in your IDE (like IntelliJ or STS).
      * Navigate to `src/main/resources/` and open `application.properties`.
      * Update the `spring.datasource.password` property with your MySQL root password.
        ```properties
        spring.datasource.password=your_mysql_password
        ```

3.  **Run the Backend Server:**

      * In your IDE, open the `BackendApplication.java` file.
      * Run it as a Spring Boot App.
      * The server will start on `http://localhost:8080`.

### 3\. Frontend Setup (React)

1.  **Navigate to the Frontend Folder:**

      * Open a new terminal window and navigate to the `frontend` directory.
        ```bash
        cd frontend
        ```

2.  **Install Dependencies:**

      * Run `npm install` to download all the necessary libraries. This may take a few minutes.
        ```bash
        npm install
        ```

3.  **Run the Frontend App:**

      * Start the development server with `npm run dev`.
        ```bash
        npm run dev
        ```
      * The application will be available at `http://localhost:5173`.

### 4\. You're All Set\! 🎉

Open `http://localhost:5173` in your browser to see the application live. For the app to work, **both the backend and frontend servers must be running at the same time.**

-----

## 🤝 Contributing

Contributions are welcome\! This project follows the **GitHub Flow** for collaboration.

1.  **Create a Fork** of the repository.
2.  **Create a new branch** for your feature (`git checkout -b feature/AmazingFeature`).
3.  **Commit your changes** (`git commit -m 'feat: Add some AmazingFeature'`).
4.  **Push to the branch** (`git push origin feature/AmazingFeature`).
5.  **Open a Pull Request** for review.

-----

## 👥 Project Team

This project was a collaborative effort by:

  - **Faheem**
  - **Danish**
  - **Khalid**
  - **Sushant**

-----

## 📄 License

This project is licensed under the MIT License. See the `LICENSE` file for details.
