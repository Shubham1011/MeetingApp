FROM openjdk:10
EXPOSE 1234
ADD /target/MyApp.jar MyApp.jar
ENTRYPOINT ["java","-jar","MyApp.jar"] 