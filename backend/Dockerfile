FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the already built jar
COPY target/*.jar app.jar

EXPOSE 8080

ENV SPRING_PROFILES_ACTIVE=docker

ENTRYPOINT ["java", "-jar", "app.jar"]
