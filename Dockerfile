# Get Base SDK for Dotnet Core 6.0
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /app

# Copy solution file
COPY ./karkarAPI.sln ./

# Copy every project
COPY karkarAPI/ ./karkarAPI/
COPY DAL/ ./DAL/
COPY DTOs/ ./DTOs/
RUN dotnet restore

RUN dotnet build -c Release -o out

# Generate Runtime image
FROM mcr.microsoft.com/dotnet/aspnet:6.0
WORKDIR /app
EXPOSE 7247
ENV ASPNETCORE_ENVIRONMENT=Production \
    ASPNETCORE_URLS=https://*:7247 \
    ASPNETCORE_ALLOWED_HOSTS="localhost;https://master.d17b8su9rhd75y.amplifyapp.com;170.83.132.66"

COPY --from=build /app/out .
ENTRYPOINT [ "dotnet", "karkarAPI.dll" ]
