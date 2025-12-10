# Maintenance Backend (Spring Boot)

Stack:
- Spring Boot 3.3
- Java 17
- Spring Web, Spring Data JPA, Validation
- MySQL
- Lombok

## Configuration

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/maintenance_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=your_password_here
```

Create the database in MySQL:

```sql
CREATE DATABASE maintenance_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Add at least one user:

```sql
INSERT INTO utilisateurs(email, mot_de_passe, nom)
VALUES ('admin@example.com', '1234', 'Admin');
```

## Run

```bash
mvn spring-boot:run
```

API endpoints:

- POST /api/auth/login
- GET  /api/machines
- POST /api/machines
- GET  /api/pannes
- POST /api/pannes
```
