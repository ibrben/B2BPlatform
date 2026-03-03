## This service allows customers to: ##
- Onboard a new company (with automatically generate a default Business Unit and Staff)
- Retrieve company list

# 🚀 Tech Stack #
.NET 10 Web API
Entity Framework Core
PostgreSQL
Docker
JWT Authentication
BCrypt password hashing

# 📦 Features #
✅ Company Onboarding
When a company is onboarded:
A Company record is created
A default Business Unit is generated
A Company Owner account is automatically created
A default password is assigned 
✅ Multi-Tenant Ready
Shared database model
Tenant isolation using RoldId
Designed for future RBAC expansion
✅ RESTful Design
Clean REST endpoints for full lifecycle management.

# 🛠 Prerequisites #
Make sure you have installed:
.NET 10 SDK
Docker
PostgreSQL

# ▶️ Running the Application #
Option 1 — Run with Docker (Recommended)
```
docker-compose up
```

API will be available at
```
http://localhost:5299
```

Option 2 - Run locally (without Docker)
```
cd CompanyOnmoarding.API
dotnet restore
dotnet build
dotnet run
```

## API Endpoints ##
Base Route: 
```
/api/company
```

## Onboard company ##
POST: ```/api/company/onboard```
# Request Body #
```
{
  "name": "Acme Corporation",
  "address": "123 Business Street",
  "contactNumber": "+66-12345678",
  "ownerFirstName": "John",
  "ownerLastName": "Doe",
  "ownerEmail": "john.doe@acme.com"
}
```
# Response #
```
{
  "companyId": "uuid",
  "defaultBusinessUnitId": "uuid",
  "ownerId": "uuid"
}
```
