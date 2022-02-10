# Description

## Architecture

the application is built using nestjs , which is the only opinionated framework in nodejs , providing scalable consistent architecture across large development teams,
and the database chosen is mongodb , allowing for large data storage and horizontal scaling if needed
and the API is fully documented using swagger,
<hr>

## Design Pattern
 the app is following a repository design pattern where there is the service layer 
 responsible for handling business logic , repository layer handling the database logic.
 the app also strictly follows single responsibility principle, where each layer is responsible only for one thing only , for example the validation layer is responsible for all validation before any input gets to the service layer , for example the basic user can't subscribe more than 5 times a month , this validation is handled in the validation layer as following in the DTO of the add movie api <br>
 @Validate(BasicSub) <br>
 currentUser: TokenPayload;<br>
 where basic sub is the class responsible for handling subscription and number of movies validation.
<hr>

## the app is composed of three services: 

<Br>

## Auth Service

the service provided by netguru , you can run the service by
navigating to auth micro-service folder and then src and then running the following commands if you are on windows

```bash
set JWT_SECRET=secret
node server.js
```
<hr>

## Movies Service

this service uses tcp for internal communication between it and the gateway which is the is the definition of micro-services in nestjs , where micro-services are any services that use any other protocol that http to run the service navigate into movies micro-service folder and run the following commands

```bash
yarn // installs all the packages
yarn start // starts the micro-service
```
<hr>

## Gateway Service

this service has the gateway of the services and also authentication guards, it provides the swagger documentation for services , and is the link between all services to run the service navigate in the gateway folder and run the following commands

```bash
yarn // installs all the packages
yarn start // starts the micro-service
```

<hr>

## Testing
 this app is fully automatically tested using JEST , also testing speed is taken into consideration by only launching the app environment only one time before all tests start by using the global setup of jest,to run the tests, start all the services and then navigate to the gateway folder and run the following command
 ```bash
 yarn test
```

<hr>

## Dockerization
 the app is fully dockerized you can run the whole app using 
  ```bash
 docker-compose up 
```
and then go to localhost:4000/api