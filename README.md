# GUI
- GUI project for EC3405 -


# Campus Project

## Overview
This project consists of an API server built with Node.js and Express, and a web client built with React.

## API Server

### Prerequisites
- Node.js
- npm
- MySQL

### Installation
1. Clone the repository:
    ```sh
    git clone https://github.com/yourusername/campus.git
    cd campus/api
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the [api](http://_vscodecontentref_/1) directory and add your environment variables:
    ```env
    DB_HOST=your_db_host
    DB_USER=your_db_user
    DB_PASSWORD=your_db_password
    DB_NAME=your_db_name
    PORT=3001
    ```

4. Start the server:
    ```sh
    npm start
    ```

### API Endpoints
- `GET /` - Returns "NO ROOT HERE"
- `*` - Returns a 404 error with the message "FILE DOES NOT EXIST"

## Web Client

### Prerequisites
- Node.js
- npm

### Installation
1. Navigate to the [web](http://_vscodecontentref_/2) directory:
    ```sh
    cd ../web
    ```

2. Install dependencies:
    ```sh
    npm install
    ```

3. Start the development server:
    ```sh
    npm start
    ```

### Available Scripts
In the [web](http://_vscodecontentref_/3) directory, you can run:

- `npm start`: Starts the development server.
- `npm build`: Builds the app for production.
- `npm test`: Runs the test suite.
- `npm eject`: Ejects the Create React App configuration.

## Project Structure