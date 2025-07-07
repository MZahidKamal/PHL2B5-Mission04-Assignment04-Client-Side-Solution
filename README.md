# Book Library Management System
A modern, responsive web application for managing book inventory and borrowing operations. Built with React, TypeScript, and Redux Toolkit, this system provides a comprehensive solution for library management with a clean, intuitive user interface.
## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Client Side](#client-side)
- [Server Side](#server-side)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)
## Features
### Core Functionality
- **📚 Book Management**: Complete CRUD operations for book inventory
- **🔍 Book Discovery**: Browse and search through the entire book collection
- **📖 Book Details**: View comprehensive information about each book
- **➕ Add New Books**: Contribute to the library by adding new titles
- **✏️ Edit Books**: Update book information and availability status
- **🗑️ Delete Books**: Remove books from the collection with confirmation dialogs
### Borrowing System
- **📋 Borrow Books**: Easy book borrowing with quantity and due date selection
- **📊 Borrow Summary**: Track all borrowed books with detailed summaries
- **📅 Due Date Management**: Calendar-based due date selection with validation
- **🔢 Quantity Control**: Specify number of copies to borrow (within available limits)
### User Experience
- **🌙 Dark/Light Mode**: Toggle between dark and light themes
- **📱 Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **⚡ Real-time Updates**: Instant UI updates with Redux state management
- **🎨 Modern UI**: Clean, minimalistic design inspired by modern design systems
- **♿ Accessibility**: Screen reader friendly with proper ARIA labels
## Installation
### Prerequisites
- Node.js (version 18.0 or higher)
- npm or yarn package manager
- Git
### Step-by-step Installation
1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/your-username/book-library-management-client.git
   cd book-library-management-client
   \`\`\`
2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`
3. **Environment Setup**
   Create a `.env` file in the root directory (if needed):
   \`\`\`env
   VITE_API_BASE_URL=https://phl-2-b5-mission04-assignment04-ser.vercel.app
   \`\`\`
4. **Start the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`
5. **Open your browser**
   Navigate to `http://localhost:5173` to view the application.
## Usage
### Getting Started
1. **Home Page**: Start at the homepage to get an overview of the system
2. **Browse Books**: Navigate to "All Books" to view the complete collection
3. **Add Books**: Use "Create Book" to add new titles to the library
4. **Borrow Books**: Click on any book to view details and borrow options
5. **Track Borrowings**: Visit "Borrow Summary" to manage your borrowed books
### Key Navigation
\`\`\`typescript
// Main routes available in the application
/                    // Homepage with system overview
/books              // All books listing with pagination
/create-book        // Add new book form
/books/:id          // Individual book details
/edit-book/:id      // Edit book information
/borrow/:bookId     // Borrow book interface
/borrow-summary     // Borrowed books summary
\`\`\`
### Example Workflows
**Adding a New Book:**
1. Navigate to "Create Book"
2. Fill in book details (title, author, genre, ISBN, description, copies)
3. Select genre from predefined options
4. Submit the form
5. View confirmation with book details
   **Borrowing a Book:**
1. Browse books and select a title
2. Click "Borrow" or navigate to book details
3. Specify number of copies (within available limit)
4. Select due date (future dates only)
5. Confirm borrowing
6. View borrowing confirmation
## API Endpoints
### Base URL
\`\`\`
https://phl-2-b5-mission04-assignment04-ser.vercel.app
\`\`\`
### Available Endpoints
#### Books Management
```http
GET    /api/books           # Get all books
GET    /api/books/:id       # Get book by ID
POST   /api/books           # Create new book
PUT    /api/books/:id       # Update book
DELETE /api/books/:id       # Delete book
POST   /api/borrow          # Create new borrow record
GET    /api/borrow          # Get borrow summary
```

#### Borrowing Management
```http
src/
├── components/           # Reusable UI components
├── pages/               # Page components
├── redux/              
│   ├── api/            # RTK Query API definitions
│   ├── features/       # Redux slices
│   └── store.ts        # Redux store configuration
├── types/               # TypeScript type definitions
├── utils/               # Utility functions
└── App.tsx             # Root componentgit checkout -b feature/YourFeaturegit commit -m 'Add some feature'git push origin feature/YourFeatureMIT License
```

---

## 🚀 Client Side Live Deployment
🔗 [Visit the Live API](https://phl2b5-misn04-asgnmnt04-client-side.netlify.app)

## 💾 Client Side GitHub Repository
🔗 [GitHub Repo](https://github.com/MZahidKamal/PHL2B5-Mission04-Assignment04-Client-Side-Solution)

---

## 🚀 Server Side Live Deployment
🔗 [Visit the Live API](https://phl-2-b5-mission04-assignment04-ser.vercel.app)

## 💾 Server Side GitHub Repository
🔗 [GitHub Repo](https://github.com/MZahidKamal/PHL2B5-Mission04-Assignment04-Server-Side-Solution)

---

## 👨‍💻 Author

**Mohammad Zahid Kamal**
🔗 GitHub: [@MZahidKamal](https://github.com/MZahidKamal)

---