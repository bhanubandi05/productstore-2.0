FROM openjdk:17
EXPOSE 8080
ADD . .
ADD target/back-end.jar back-end.jar
ENTRYPOINT ["java","-jar", "/back-end.jar"]