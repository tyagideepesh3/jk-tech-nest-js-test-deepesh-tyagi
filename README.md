# NestJS Backend - RAG Document Management System

A comprehensive NestJS backend application for user management, document management, and ingestion controls with role-based authentication.

## Features

### Authentication & Authorization

- JWT-based authentication
- Role-based access control (Admin, Editor, Viewer)
- Secure password hashing with bcrypt
- Protected routes with guards
- Sql Injection protection

### User Management

- User registration and login
- Admin-only user management APIs
- Role assignment and management
- User profile management
- Account activation/deactivation

### Document Management

- File upload with validation
- CRUD operations for documents
- Document search functionality
- Status tracking (pending, processing, completed, failed)
- Role-based document access

## Tech Stack

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT with Passport
- **File Upload**: Multer
- **Validation**: Class-validator

## Getting Started

### Prerequisites

- Node.js
- neon postgreSQL database
- npm or yarn

### Installation

1. Install dependencies:

```bash
npm install
```

2. Set up environment variables:

```bash
cp .env.example .env
```

3. Configure your database connection in `.env`:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=nestjs_backend
JWT_SECRET=your_jwt_secret
DATABASE_URL="your-neon-database-url-here"
```

4. Run database migrations:

```bash
npm run migration:run
```

5. Start the development server:

```bash
npm run start:dev
```

The API will be available at `http://localhost:3001`

The API for production will be available at `https://jk-tech-nest-js-test-deepesh-tyagi.onrender.com`

## API Endpoints

### Authentication

- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### User Management

- `GET /users` - Get all users (Admin)
- `GET /users/:id` - Get user by ID (Admin)
- `PATCH /users/:id/role` - Update user role (Admin)

### User Profile

- `GET /users/profile` - Get current user profile

### Document Management

- `POST /documents` - Upload document (Admin/Editor)
- `GET /documents` - Get user documents
- `GET /documents/:id` - Get document by ID
- `PATCH /documents/:id` - Update document (Admin/Editor)
- `DELETE /documents/:id` - Delete document (Admin/Editor)

## Database Migrations

Create a new migration:

```bash
npm run migration:generate -- --name your-migration-name
```

Run migrations:

```bash
npm run migration:run
```

Undo last migration:

```bash
npm run migration:undo
```

## User Roles

### Admin

- Full access to all features
- User management capabilities
- System administration

### Editor

- Document upload and management

### Viewer

- Read-only access to own documents
- Profile management only

## File Upload

Supported file types:

- PDF documents
- Word documents (.doc, .docx)
- Text files (.txt)
- CSV files
- Excel files (.xls, .xlsx)

Maximum file size: 10MB

## Error Handling

The API includes comprehensive error handling with appropriate HTTP status codes and descriptive error messages.

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based authorization
- Input validation and sanitization
- File type validation
- Rate limiting protection
- Sql Injection protection

## Environment Variables

See `.env.example` for all required environment variables.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.
