# Stage 1: Build the application
FROM fabiencnl/custom-maven:21 AS build
WORKDIR /app
COPY . .
RUN mvn clean install -DskipTests

# Stage 2: Run the application
FROM openjdk:21-jdk-slim
WORKDIR /app
COPY --from=build /app/target/movie-recommendation-back-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
