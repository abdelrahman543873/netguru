# Description

## Architecture

the application is built using nestjs , which is the only opinionated framework in nodejs , providing scalable consistent architecture across large development teams,
and the database chosen is mongodb , allowing for large data storage and horizontal scaling if needed
and the API is fully documented using swagger,
the app is composed of three services

## Auth Service

the service provided by netguru , you can run the service by
navigating to auth micro-service folder and then src and then running the following commands if you are on windows

```bash
set JWT_SECRET=secret
node server.js
```

## Movies Service

this service uses tcp for internal communication between it and the gateway which is the is the definition of micro-services in nestjs , where micro-services are any services that use any other protocol that http to run the service navigate into movies micro-service folder and run the following commands

```bash
yarn // installs all the packages
yarn start // starts the micro-service
```

## Gateway Service

this service has the gateway of the services and also authentication guards, it provides the swagger documentation for services , and is the link between all services to run the service navigate in the gateway folder and run the following commands

```bash
yarn // installs all the packages
yarn start // starts the micro-service
```

## Testing
 this app is fully automatically tested using JEST , also testing speed is taken into consideration by only launching the app environment only one time before all tests start by using the global setup of jest,to run the tests, start all the services and then navigate to the gateway folder and run the following command
 ```bash
 yarn test
```