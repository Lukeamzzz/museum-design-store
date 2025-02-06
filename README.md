# Museum Design Store️

Full-stack webpage with a clean and modern interface.

![homepage-museum-design-store](https://github.com/user-attachments/assets/ce851ca8-8447-48d0-9301-a2201894c572)

<img width="1440" alt="Screenshot 2024-10-21 at 11 26 18 p m" src="https://github.com/user-attachments/assets/080200b8-24cb-47e0-8f84-1276a0abfa4b">

## Features

- **Dark Mode/Light Mode**: Easily switch between light and dark themes to suit your preferences.
- **Add Products**: Add new products to the store with names, prices and images.
- **Update Products**: Modify existing product details.
- **Delete Products**: Remove products from the store with a single click.
- **Product Management**: View a list of all products with their details.

## Technologies

- **MongoDB**: Database to store product data.
- **Express**: Backend framework for handling server-side logic and API endpoints.
- **React**: Frontend library for building the user interface.
- **Node**: Runtime environment for executing server-side JavaScript.
- **Chakra UI**: Component library for building a responsive, accessible, and modern UI.

## Setup

To run the project locally, follow these:

### Prerequisites  
- Ensure you have [Node.js](https://nodejs.org/) installed

### 1. Clone the Repository

```bash
git clone https://github.com/Lukeamzzz/museum-design-store.git
cd museum-design-store
```

### 2. Install Dependencies
Backend (Node.js / Express)

```bash
cd backend
npm install
```

Frontend (React / Chakra UI)
```bash
cd frontend
npm install
```

### 3. Environment Variables
Create a .env file in the root directory with the following variables:

```bash
MONGO_URI = your_mongodb_connection_string
PORT = your_server_port
```

### 4. Run the Application
Start Backend

```bash
cd backend
npm run dev
```

Start Frontend

```bash
cd frontend
npm run dev
```
