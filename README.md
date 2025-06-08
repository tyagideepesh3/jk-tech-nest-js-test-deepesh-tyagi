# NestJS Backend - User and Document Management

A comprehensive NestJS backend application for user management, document management, and ingestion controls with role-based authentication.

## Features

### Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin, Editor, Viewer)
- Secure password hashing with bcrypt
- Protected routes with guards

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

### Ingestion System
- Trigger ingestion processes
- Job management and tracking
- Integration with Python backend
- Retry failed ingestions
- Real-time status monitoring

## Tech Stack

- **Framework**: NestJS with TypeScript
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT with Passport
- **File Upload**: Multer
- **Validation**: Class-validator
- **Documentation**: Auto-generated API docs

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
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

## API Endpoints

### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - User login
- `POST /auth/logout` - User logout

### User Management (Admin only)
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `PATCH /users/:id/role` - Update user role
- `PATCH /users/:id/toggle-status` - Toggle user active status
- `DELETE /users/:id` - Delete user

### User Profile
- `GET /users/profile` - Get current user profile
- `PATCH /users/profile` - Update current user profile

### Document Management
- `POST /documents` - Upload document (Admin/Editor)
- `GET /documents` - Get user documents
- `GET /documents/search` - Search documents
- `GET /documents/:id` - Get document by ID
- `PATCH /documents/:id` - Update document (Admin/Editor)
- `DELETE /documents/:id` - Delete document (Admin/Editor)

### Ingestion Management
- `POST /ingestion/trigger` - Trigger ingestion process (Admin/Editor)
- `GET /ingestion/jobs` - Get all ingestion jobs (Admin)
- `GET /ingestion/jobs/:jobId` - Get job status (Admin/Editor)
- `POST /ingestion/jobs/:jobId/retry` - Retry failed job (Admin/Editor)
- `DELETE /ingestion/jobs/:jobId` - Cancel job (Admin)
- `GET /ingestion/documents` - Get documents by status (Admin/Editor)

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
- Ingestion triggers
- Limited user profile access

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

## Development

### Running Tests
```bash
npm run test
npm run test:e2e
npm run test:cov
```

### Code Quality
```bash
npm run lint
npm run format
```

### Building for Production
```bash
npm run build
npm run start:prod
```

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