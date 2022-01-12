# farm-data-exercise

My submission to the Solita Dev Academy assignment

## Prerequisites

You will need installed on your device:

- [Docker](https://www.docker.com)
- [Docker-Compose](https://docs.docker.com/compose/install/) (only required on Linux!)

## Running the project

The following commands install and run the development version of the app.

```sh
git clone https://github.com/alandsilva/farm-data-exercise.git
cd farm-data-exercise
docker-compose -f docker-compose.dev.yml up
```

Then from your browser you can access:

- OpenAPI documentation from http://localhost:3000/api/docs
- Express api from http://localhost:3000/api
- React client from http://localhost:3000

## Tests

- Backend tests are availabele. To run them, from the project root run:

```sh
docker-compose -f docker-compose.test.yml run test
```

## Closing the containers

After running the project locally, you'll probably have containers running in the background.
Bellow are instructions on closing them:

- To close the development environment containers, from the project root run:

```sh
docker-compose -f docker-compose.dev.yml down --volumes
```

- To close the test environment containers, from the project root run:

```sh
docker-compose -f docker-compose.test.yml down --volumes
```

# Description

This is a full stack web project for visualizing, adding and managing data on farms.
New farm entries can be made either by adding a single entry or by uploading a csv file.

## Technologies used

### Environment

I used Docker and Docker Compose during development because they provides an easy way to setup a local multi-container development environment. It also made it easy to run a MongoDB container alongside the api and client containers.

### Backend and Frontend

- Express.js was used to build the backend because I have extensive experience with it.
- React was used to develop the client app. It was chosen because it allows for reusable components, making refactoring simple.
- The programming language on both backend and frontend is Javascript. I chose it because I have the most experience with it and it simpler to use the same programming language in both cases.
