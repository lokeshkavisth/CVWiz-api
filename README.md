# CVWiz API - Resume Management

![CVWiz Logo](cvwiz-logo.png)

CVWiz API is a robust backend service designed for managing and serving professional resume data. It allows you to seamlessly handle Create, Read, Update, and Delete (CRUD) operations related to resumes, making it an essential tool for resume management applications.

## Features

- **Express.js Backend:** CVWiz API is powered by Express.js, a highly efficient and flexible Node.js web application framework, ensuring optimal performance and ease of development.

- **MySQL Integration:** The API integrates seamlessly with MySQL, a widely used relational database management system, to store and manage resume data securely and efficiently.

- **CORS Support:** CORS (Cross-Origin Resource Sharing) support is included, enabling the API to serve requests from different origins, making it versatile for integration into various applications.

- **Environment Variables:** Securely manage sensitive data like database credentials using the `dotenv` package, ensuring your application's security.

- **UUID Generation:** Universally Unique Identifiers (UUIDs) are used to uniquely identify resume records, making data management and retrieval straightforward.

## Getting Started

To use CVWiz API, follow these simple steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/lokeshkavisth/CVWiz-api.git
   ```

2. Navigate to the project directory:

   ```bash
   cd CVWiz-api
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Configure your MySQL database connection by creating a `.env` file in the project root and defining the following environment variables:

```
PORT=your-mysql-port
DB_USER=your-mysql-username
DB_PASSWORD=your-mysql-password
DB_DATABASE=your-mysql-database
```

## Usage

### Development

For development purposes, start the server with automatic code reloading using `nodemon`:

```bash
npm run dev
```

The server runs on `http://localhost:8080` by default.

### Production

For a production-ready deployment, use the following command:

```bash
npm start
```

## API Endpoints

The following API endpoints are available:

- `GET /api/resume`: Retrieve a list of all resumes.
- `POST /api/resume/create`: Create a new resume.
- `DELETE /api/resume/:id`: Delete a resume by its unique identifier.
- `PUT /api/resume/:id`: Update a resume by its unique identifier.

For detailed information on these endpoints and sample requests and responses, please refer to the [API Documentation](API_DOCUMENTATION.md).

## Error Handling

CVWiz API provides detailed error responses with appropriate HTTP status codes to help you troubleshoot issues effectively.

## License

This project is licensed under the [ISC License](LICENSE).

## Author

CVWiz API is developed by [Your Name].

## Support

For questions, issues, or feature requests, please create an issue on the [GitHub repository](https://github.com/lokeshkavisth/CVWiz-api).

---

Thank you for choosing CVWiz API for your resume management needs. We hope this tool helps streamline your resume data management and enhances your application's functionality. If you have any questions or need assistance, please don't hesitate to contact us.

![CVWiz](cvwiz.png)
