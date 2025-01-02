# Restaurant Table Booking System

A restaurant table booking application with a strong focus on frontend user experience and design, built with Next.js. Features a modern, responsive interface and basic backend integration for managing reservations.

## Features

- **Modern UI/UX**: 
  - Clean, responsive design that works on all devices
  - Smooth animations and transitions
  - Intuitive booking flow
  - Interactive calendar and time selection

- **Booking Management**: 
  - Easy table reservation system
  - View and manage existing bookings
  - Guest information management

- **Smart Features**:
  - Calendar integration (Google Calendar, Outlook)
  - Booking sharing capabilities
  - Mobile-optimized experience

## Tech Stack

### Frontend (Primary Focus)
- **Framework**: Next.js 14 (React)
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with shadcn/ui inspiration
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Animations**: Custom CSS animations

### Backend
- **Server**: Express.js
- **Database**: MongoDB
- **API**: RESTful endpoints for basic CRUD operations

## Project Structure

```
├── frontend/                # Next.js frontend application
│   ├── app/                # Next.js app directory
│   ├── components/         # React components
│   │   ├── ui/            # Reusable UI components
│   │   └── ...            # Feature components
│   ├── lib/               # Utility functions
│   ├── hooks/             # Custom React hooks
│   └── public/            # Static assets
│
└── backend/               # Express.js server
    ├── routes/           # API routes
    ├── models/           # MongoDB models
    └── controllers/      # Route controllers
```

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- MongoDB instance

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AshishDev-16/restaurant-booking.git
   cd restaurant-booking
   ```

2. **Install dependencies**:
   ```bash
   # Install frontend dependencies
   cd frontend
   npm install

   # Install backend dependencies
   cd ../backend
   npm install
   ```

3. **Environment Variables**:
   - Frontend: Create `.env.local` in the frontend directory
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```
   - Backend: Create `.env` in the backend directory
   ```env
   MONGODB_URI=your_mongodb_connection_string
   PORT=5000
   ```

4. **Run the application**:
   ```bash
   # Start the frontend (in frontend directory)
   npm run dev

   # Start the backend (in backend directory)
   npm start
   ```

5. **Access the application**:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Express.js](https://expressjs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [MongoDB](https://www.mongodb.com/)
- [Lucide React](https://lucide.dev/)

## Contact

For any inquiries, please contact [Ashish](mailto:kaduashish15@gmail.com).

--- 