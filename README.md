# auth-app

A Next.js 14 application implementing user authentication with SQLite and Lucia Auth, featuring signup, login, session management, and a simple training activities module.

## Features

- User signup and login with secure password hashing (Node.js Crypto)
- Session management with Lucia Auth and SQLite adapter
- Custom authentication server actions with unified error handling
- SQLite database with users, sessions, and training activities
- Seeded training data with API access
- Client-side authentication form (`AuthForm`) with validation and error display
- Fully built with Next.js 14 App Router and server components
- Secure cookies and session refresh handling
- Logout/session destruction support
- Clean and modular code with reusable validation and auth helpers

## Technologies Used

- [Next.js 14](https://nextjs.org/)
- React 18
- SQLite (via `better-sqlite3`)
- [Lucia Auth](https://lucia-auth.com/) with SQLite adapter
- Node.js native Crypto for password hashing
- JavaScript (ES Modules)

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm or yarn

### Installation

1. Clone the repository:

```

git clone
cd auth-app

```

2. Install dependencies:

```

npm install

```

3. Set up environment variables by creating a `.env.local` file (if needed):

```

NODE_ENV=development

# Add other secrets if using OAuth providers or other configurations

```

4. Run the development server:

```

npm run dev

```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Project Structure Overview

```

auth-app/
├── app/ # Next.js App Router pages and server components
├── components/ # Reusable React components (e.g. AuthForm)
├── lib/ # Helper modules (db setup, auth, validation)
├── public/ # Static assets (images, icons)
├── training.db # SQLite database file with users/trainings data
├── package.json
├── README.md
└── next.config.mjs

```

## Database

- The app uses SQLite with `better-sqlite3` for synchronous DB access on the server.
- Tables:
  - `users`: Stores user email (unique) and hashed passwords.
  - `sessions`: Stores user sessions with expiry.
  - `trainings`: Seeded data for training activities.

## Authentication Flow

- Passwords are hashed with the Node.js `crypto.scryptSync` function with random salt.
- User sessions are managed using Lucia Auth, which sets secure HTTP-only cookies.
- Signup and login are handled via Next.js server actions using form submissions.
- Generic authentication error messages are displayed to enhance security.

## How to Use

- Visit the root `/` to see the login or signup form (toggle via URL query: `/?mode=signup`)
- After authentication, you are redirected to `/training` to view training activities.
- Use the logout feature to destroy the session and clear cookies.

## Scripts

- `npm run dev` - Start Next.js dev server
- `npm run build` - Build for production
- `npm start` - Run the production server
- `npm run lint` - Run linting

## Security Notes

- Password hashing uses secure salt and `scrypt`.
- Session cookies have `Secure` and `HttpOnly` flags set in production.
- Authentication errors are generic to avoid leaking sensitive info.

## Future Improvements

- Add OAuth providers via Lucia or NextAuth.js
- Enable two-factor authentication (2FA)
- Improve UI/UX with better form handling and feedback
- Migrate synchronous DB calls to async for scalability
- Add user roles and authorization

## License

This project is licensed under the [MIT License](LICENSE).
