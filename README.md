# Ticket Lagbe

Ticket Lagbe is a role-based online ticket booking and management platform built with Next.js. It supports travel/event ticket discovery, booking, payment flow integration, and dashboard operations for users, vendors, and admins.

## Purpose

The goal of this project is to provide a complete ticketing workflow where:

- Users can browse verified tickets, book seats, and track bookings.
- Vendors can add and manage tickets, monitor booking requests, and view revenues.
- Admins can control users/vendors/tickets and manage platform-level actions.

## Live URL

- Live Site:

## Key Features

- Role-based authentication and authorization (user, vendor, admin).
- Protected dashboard areas for each role.
- Ticket creation and management for vendors.
- Ticket browsing and details pages for users.
- Booking flow with checkout session integration.
- Vendor booking-request and transition management.
- Admin controls for users, tickets, and advertisements.
- Revenue analytics dashboard components.
- Toast notifications for actions and feedback.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- MongoDB
- Better Auth
- Stripe
- JWT (JSON Web Token)
- Express.js (Backend API)

## NPM Packages Used

### Dependencies

- @better-auth/mongo-adapter
- @heroui/react
- @heroui/styles
- @stripe/stripe-js
- better-auth
- mongodb
- motion
- next
- react
- react-dom
- react-toastify
- recharts
- stripe

### Backend Dependencies (API Server)

- express
- cors
- jose-cjs

### Dev Dependencies

- @gravity-ui/icons
- @tailwindcss/postcss
- babel-plugin-react-compiler
- eslint
- eslint-config-next
- tailwindcss

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Run Locally

1. Clone the repository.
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with your required environment variables.

### JWT Environment Variables (.env)

Use JWT secrets/keys from `.env` in your backend for token sign and verify.

```env
JWT_ACCESS_SECRET=your_access_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

If you are using key pair based JWT (with jose-cjs), keep JWT keys in `.env` as well.

4. Start development server:

```bash
npm run dev
```

5. Open http://localhost:3000
