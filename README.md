# Keygen Portal

Keygen Portal is a React application demonstrating user authentication using Keygen's API. It includes features such as user login, token-based authentication, and user greetings after login.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [File Structure](#file-structure)
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

## File Structure

```plaintext
keygen-portal/
├── public/
│   ├── index.html
│   └── logo.png
├── src/
│   ├── assets/
│   │   └── images/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── ErrorMessage.tsx
│   │   ├── FormInput.tsx
│   │   ├── GithubIcon.tsx
│   │   ├── Input.tsx
│   │   └── SSOIcon.tsx
│   ├── hooks/
│   │   └── useAppSelector.ts
│   ├── lib/
│   │   ├── api/
│   │   │   └── apiClient.ts
│   │   └── errorHandler.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   └── Login.tsx
│   ├── store/
│   │   ├── slices/
│   │   │   └── user.ts
│   │   └── index.ts
│   ├── typings/
│   │   └── api.ts
│   ├── utils/
│   │   └── validationSchema.ts
│   ├── App.tsx
│   └── index.tsx
├── .env
├── .gitignore
├── package.json
├── README.md
└── tsconfig.json
```

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
### Button
Reusable button component with different styles.

### Input
Reusable input component with forwardRef.

### ErrorMessage
Component to display error messages.

### FormInput
Form input component integrated with React Hook Form.

### Icons


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

## ToDo
- Config font-family in tailwind and use the provided font assets.
- Fix spec failures after `apiClient` implementation.
- Implement more comprehensive form validation and error handling using Yup.
- Add unit tests for all components and hooks to ensure complete test coverage.
- Optimize performance by implementing lazy loading and code splitting.
- Improve the UI/UX design to make it more visually appealing and user-friendly.

## New features that I'd like to add
- Add user registration and password reset functionality.
- Implement multi-factor authentication for enhanced security.
- Enhance state management by adding more Redux slices and selectors.
- Add internationalization (i18n) support for multiple languages.
- Implement theme switcher - dark mode / light mode
- Integrate with more third-party authentication providers (e.g., Google, Facebook).
- Refactor code to improve readability, maintainability, and scalability.
- Implement end-to-end test using cypress.
- Add components map using Storybook.
