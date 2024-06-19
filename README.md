# Keygen Authentication App

This project is a simple authentication application using React, Redux Toolkit, Axios, and Tailwind CSS. The application demonstrates user login functionality with a secure token-based authentication system.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [API Client](#api-client)
- [Redux Slices](#redux-slices)
- [Components](#components)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Features

- User login with email and password
- Secure token-based authentication
- User greeting after login
- Error handling for API requests
- Responsive design using Tailwind CSS

## Technologies

- React
- Redux Toolkit
- Axios
- Tailwind CSS
- React Hook Form
- Yup for validation
- Redux Persist
- React Router
- Jest and React Testing Library for testing

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/azfullstack2258/keygen-portal.git
   cd keygen-auth-app

2. Install dependencies:

    ```bash
    npm install

3. Create an .env file in the root of the project and add your environment variables:

    ```env
    REACT_APP_API_BASE_URL=https://api.keygen.sh/v1/accounts/demo


4. Start the development server:

    ```bash
    npm start

5. Open your browser and navigate to http://localhost:3000.

## Usage
Login
Navigate to the login page.
Enter your email and password.
Click "Sign In".
If the credentials are correct, you will be redirected to the home page with a greeting message.


## API Client
The apiClient handles API integrations and errors using Axios.


## Redux Slices
### userSlice
Handles user authentication and state management.


## Components
LoginPage
Handles the user login form and submission.


## Testing
### user.spec.ts
Tests for the user reducer and async actions.

### Login.spec.tsx
Tests for the Login page component.

### Home.spec.tsx
Tests for the Home page component.

### App.spec.tsx
Tests for the App component.


## Contributing
Contributions are welcome! Please open an issue or submit a pull request.


## License