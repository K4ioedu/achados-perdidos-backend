# Etapa 1: Build com Maven e Java 21
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY . .
# Pula os testes para garantir o build rápido
RUN mvn clean package -Dmaven.test.skip=true

# Etapa 2: Execução com Java 21 Leve
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java","-jar","app.jar"]