# farm-data-exercise

My submission to the Solita Dev Academy assignment

## Prerequisites

You will need installed on your device:

- [Node.js](https://nodejs.org)
- [Docker](https://www.docker.com)
- [Docker-Compose](https://docs.docker.com/compose/install/) (only required on Linux!)

## Running the project

The following commands install and run the development version of the app. They need to be run in order.

1. Clone the project and move to the project's root direcory

```sh
git clone https://github.com/alandsilva/farm-data-exercise.git
cd farm-data-exercise
```

2. Install node modules

```sh
npm run install:all
```

This should take a few seconds. After it is done move to the next step

3. From the project root run

```sh
docker-compose -f docker-compose.dev.yml up
```

This can take from a few seconds to a couple of minutes
Then from your browser you can access:

- OpenAPI documentation and Express api from http://localhost:3000/api
- React client from http://localhost:3000

## Tests

- Backend tests are availabele. If you haven't done so already. Do steps 1 and 2 from 'Running th project' part above. Then to run the tests, from the project root run:

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

- Afterwards you can delete the closed containers. The bellow command deletes all closed containers:

```sh
docker rm $(docker ps --filter status=exited -q)
```

- Lastly, you might want to delete the unused images that were created as baselines fo the containers. You can remove all unused images with the command: (**Beware!** The next command will remove all dangling images. You can read more about this [here](https://docs.docker.com/config/pruning/))

```sh
docker image prune
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
