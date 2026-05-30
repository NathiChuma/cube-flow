# Cube Flow Frontend

Cube Flow is a modern web application designed for speedcubers to track solve times, analyze performance statistics, and monitor progress over time.

## Features

- User registration and authentication
- Password recovery
- Real-time speedcubing timer
- WCA-style scramble generation
- Solve history tracking
- Personal best tracking
- Average of 5 (Ao5) calculations
- Average of 12 (Ao12) calculations
- Responsive design
- Dark mode interface

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- Tailwind CSS

### Backend
- Node.js
- Express.js
- TypeScript

### Database
- Firebase Firestore

## Project Structure

```txt
src/
├── components/
├── pages/
├── hooks/
├── services/
├── types/
├── utils/
├── layouts/
└── assets/
```

## Installation

### Clone Repository

```bash
git clone <repository-url>
```

### Install Dependencies

```bash
npm install
```

### Start Development Server

```bash
npm run dev
```

### Build For Production

```bash
npm run build
```

## Environment Variables

Create a `.env` file in the root directory.

```env
VITE_API_URL=<backend-api-url>
```

## Application Flow

1. User creates an account or signs in.
2. Scrambles are generated automatically.
3. User starts and stops the timer.
4. Solve data is submitted to the backend.
5. Statistics are calculated and updated.
6. Solve history is stored and displayed.

## Deployment

Frontend is deployed on Vercel.

## Live Demo

https://cube-flow-ten.vercel.app

## Author

Nkosinathi Chuma