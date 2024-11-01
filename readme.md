# ClassLink

ClassLink is a scalable communication platform designed for universities to centralize conversations among teachers, students, and staff. It ensures organized communication without the clutter of traditional messaging apps like WhatsApp.

## Features

- [x] **Scalable Backend**: Designed to support thousands of concurrent users with advanced technologies like **Redis Pub/Sub**, **Kafka**, and **Socket.IO** for real-time communication.
- [ ] **Centralized Communication**: Dedicated channels for different groups (courses, departments, etc.).
- [ ] **User Role Management**: Easily assign roles (admin, teacher, student) with different permissions.
- [x] **Real-time Group Chats & Message Threads**: Instant messaging with support for group chats and threaded conversations.
- [x] **Customizable Settings**: Users can tailor their experience with notification preferences, theme options, and more.

## Tech Stack

- **Frontend**: React, TailwindCSS
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Real-time Communication**: Socket.IO, Redis Pub/Sub
- **Message Queues**: Kafka for reliable, scalable event-driven architecture
- **State Management**: Recoil for handling global states in React

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Sundarampandey19/Classlink
   cd Classlink
   ```

2. **Install the required libraries**
    ```bash
    cd frontend/
    npm install

    cd ../server/
    npm install
    ```
