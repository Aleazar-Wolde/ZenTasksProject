# **ZenTasks**
![image](https://github.com/user-attachments/assets/b3c87557-5fd4-4298-8b86-ef7b55b6bfaa)


ZenTasks Banner
![License](https://img.shields.io/badge/License-MIT-blue.svg)

ZenTasks is an **intelligent task management and productivity tool** designed to help users keep track of to-dos, balance workloads, stay organized, and reduce anxiety. It features a **Spring Boot back end**, a **React front end**, and integrates **AI/ML** for task recommendations and predictions.

---

## **Table of Contents**
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Back End Setup](#back-end-setup)
  - [Front End Setup](#front-end-setup)
  - [AI/ML Setup](#aiml-setup)
- [Deployment](#deployment)
  - [Docker](#docker)
  - [AWS](#aws)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [Acknowledgments](#acknowledgments)
- [Contact](#contact)

---

## **Features**
- **Task Management**: Create, update, delete, and prioritize tasks.
- **AI/ML Recommendations**: Get suggestions for optimal task scheduling and duration predictions.
- **Time-Blocking**: Assign tasks to specific time blocks on a calendar.
- **Progress Tracking**: Visualize task completion and productivity metrics.
- **User Authentication**: Secure login and registration using JWT or OAuth2.
- **Responsive UI**: Clean and intuitive interface built with React and Tailwind CSS.

---

## **Technologies Used**
### **Back End**
- **Java**: Core programming language.
- **Spring Boot**: Framework for building RESTful APIs.
- **Spring Data JPA**: For database interactions.
- **MySQL**: Relational database for storing tasks and user data.
- **JWT/OAuth2**: For secure user authentication.

### **Front End**
- **React**: JavaScript library for building the user interface.
- **Tailwind CSS**: Utility-first CSS framework for styling.
- **Axios**: For making HTTP requests to the back end.
- **React Router**: For navigation between pages.

### **AI/ML**
- **Python**: For training machine learning models.
- **Scikit-learn**: For regression and classification tasks.
- **TensorFlow**: For deep learning models (optional).

### **DevOps**
- **Docker**: For containerizing the application.
- **AWS**: For deployment (EC2, RDS, S3).
- **GitHub Actions**: For CI/CD pipelines.
- **Prometheus + Grafana**: For monitoring and visualization.

---

## **Getting Started**
Follow these steps to set up and run ZenTasks on your local machine.

### **Prerequisites**
- **Java 17**: Install from [here](https://www.oracle.com/java/technologies/javase-jdk17-downloads.html).
- **Node.js**: Install from [here](https://nodejs.org/).
- **MySQL**: Install from [here](https://dev.mysql.com/downloads/installer/).
- **Docker**: Install from [here](https://www.docker.com/products/docker-desktop).

### **Back End Setup**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ZenTasks.git
   cd ZenTasks/backend
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/ZenTasks.git
   cd ZenTasks/backend
   ```
2. Set up the MySQL database:
   - Create a database named `ZenTasksDb`.
   - Update the `application.properties` file with your database credentials:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/ZenTasksDb
     spring.datasource.username=root
     spring.datasource.password=yourpassword
     spring.jpa.hibernate.ddl-auto=update
     ```
3. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   The back end will start at `http://localhost:8080`.

### **Front End Setup**
1. Navigate to the front end directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   The front end will start at `http://localhost:3000`.

### **AI/ML Setup**
1. Navigate to the AI/ML directory:
   ```bash
   cd ../ai-ml
   ```
2. Install Python dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Train the model:
   ```bash
   python train_model.py
   ```
4. Integrate the model with the back end (optional).

---

## **Deployment**
### **Docker**
1. Build Docker images for the back end and front end:
   ```bash
   docker build -t zentasks-backend -f backend/Dockerfile .
   docker build -t zentasks-frontend -f frontend/Dockerfile .
   ```
2. Run the containers:
   ```bash
   docker-compose up
   ```

### **AWS**
1. Create an EC2 instance and install Docker.
2. Push your Docker images to a container registry (e.g., Docker Hub).
3. Deploy the containers on EC2 using Docker Compose.
4. Set up an RDS instance for MySQL.
5. Configure S3 for file storage (if needed).

---

## **API Documentation**
The back end exposes the following RESTful APIs:

### **Task API**
- **GET /api/tasks**: Get all tasks.
- **POST /api/tasks**: Create a new task.
- **PUT /api/tasks/{id}**: Update a task.
- **DELETE /api/tasks/{id}**: Delete a task.

### **User API**
- **POST /api/auth/signup**: Register a new user.
- **POST /api/auth/login**: Authenticate a user.

---

## **Contributing**
We welcome contributions! Here’s how you can help:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Open a pull request.

---

## **Acknowledgments**
- **Spring Boot**: For making back-end development a breeze.
- **React**: For building a dynamic and responsive front end.
- **Tailwind CSS**: For simplifying UI development.
- **AWS**: For providing a robust cloud platform.

---

## **Contact**
For questions or feedback, feel free to reach out:
- **Email**: walazer2112@gmail.com
- **GitHub**: https://github.com/alicrear


