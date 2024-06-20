# Keygen Portal

Keygen Portal is a React application demonstrating user authentication using Keygen's API. It includes features such as user login, token-based authentication, user greetings after login, and user licenses information.

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
- Display user licenses with entitlements
- Reusable table component with pagination

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
│   │   ├── shared
│   │   │   ├── Button.tsx
│   │   │   ├── ErrorMessage.tsx
│   │   │   ├── Input.tsx
│   │   │   └── Table.tsx
│   │   ├── form
│   │   │   └── FormInput.tsx
│   │   ├── icons
│   │   │   ├── GithubIcon.tsx
│   │   │   └── SSOIcon.tsx
│   │   ├── Header.tsx
│   │   └── PageLayout.tsx
│   ├── hooks/
│   │   └── useAppSelector.ts
│   ├── lib/
│   │   ├── api/
│   │   │   └── apiClient.ts
│   │   └── errorHandler.ts
│   ├── pages/
│   │   ├── Home.tsx
│   │   ├── Licenses.tsx
│   │   └── Login.tsx
│   ├── store/
│   │   ├── slices/
│   │   │   ├── user.ts
│   │   │   └── licenses.ts
│   │   └── index.ts
│   ├── typings/
│   │   ├── api.ts
│   │   └── ui.ts
│   ├── utils/
│   │   └── validationSchema.ts
│   ├── App.tsx
│   └── index.tsx
├── .env
├── .gitignore
├── package.json
├── README.md
├── jest.config.js
├── jest.setup.js
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
### Login
1. Navigate to the login page.
2. Enter your email and password.
3. Click "Sign In".
4. If the credentials are correct, you will be redirected to the home page with a greeting message.

### Licenses
1. Navigate to the licenses page.
2. View the list of licenses with their entitlements, creation date, and expiry date.
3. Use pagination to navigate through the list of licenses.

## API Client
The apiClient handles API integrations and errors using Axios.


## Redux Slices
### userSlice
Handles user authentication and state management.

### licensesSlice
Handles fetching and storing licenses and their entitlements.

## Components
### Button
Reusable button component with different styles.

### Input
Reusable input component with forwardRef.

### ErrorMessage
Component to display error messages.

### Table
Reusable table component with pagination.

### PageLayout
Layout component to wrap pages with common layout elements.

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

### Table.spec.tsx
Tests for the Table component.

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
