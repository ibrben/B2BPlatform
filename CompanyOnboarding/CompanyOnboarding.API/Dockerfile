# Use the official .NET SDK as the base image
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the project file and restore dependencies
COPY . ./
WORKDIR /app/
RUN dotnet restore

# Copy the rest of the code and build the application

RUN dotnet publish -c Release -o out

# Use a minimal runtime image as the final stage
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS runtime

# Set the working directory in the container
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build /app/out ./

# Expose the port that the API will listen on
EXPOSE 80

# Set the entry point for the container
ENTRYPOINT ["dotnet", "CompanyOnboarding.API.dll"]