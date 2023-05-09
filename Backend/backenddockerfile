# Use the .NET 7.0 SDK image as the build environment
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

# Set the working directory
WORKDIR /app

# Copy the backend application files to the container
COPY . .

# Restore and build the project
RUN dotnet restore
RUN dotnet build -c Release -o /app/out

# Set up the runtime environment
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS runtime

# Set the working directory
WORKDIR /app

# Copy the built application from the build stage
COPY --from=build /app/out .

# Set the exposed port
EXPOSE 80

# Set the entry point and command
ENTRYPOINT ["dotnet", "Backend.dll", "environment=development"]
