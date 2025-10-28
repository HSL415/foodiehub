# Use Eclipse Temurin JDK 17 as base image
 FROM eclipse-temurin:17-jdk-alpine AS builder
 # Set working directory
 WORKDIR /app
 # Copy Maven files
 COPY pom.xml .
 COPY src ./src
 # Build the application
 RUN apk add --no-cache maven &amp;&amp; \
    mvn clean package -DskipTests &amp;&amp; \
    apk del maven
 # Production image
 FROM eclipse-temurin:17-jre-alpine
 # Set working directory
 WORKDIR /app
 # Copy JAR from builder stage
 COPY --from=builder /app/target/*.jar app.jar
 # Expose port
 EXPOSE 8080
 # Set environment variables
 ENV SPRING_PROFILES_ACTIVE=docker
 # Health check
 HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:8080/actuator/health || exit 1
 # Run the application
 ENTRYPOINT ["java", "-jar", "app.jar"]