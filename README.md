# NASA Mission Control Deno Project
A NASA Mission Control API created with [Deno](https://deno.land/).<br>
The hosted version can be found [HERE](http://18.141.233.196:8000/index.html).

## Functionality
The API can be used to schedule and abort missions, and to list all the upcoming and past missions provided by [SpaceX API](https://github.com/r-spacex/SpaceX-API).

## Frameworks
1. [Deno Standard Library](https://deno.land/std)
2. [Oak Router](https://deno.land/x/oak)
3. [Lodash](https://deno.land/x/lodash)

## Installation
1. Install Deno from https://deno.land/
2. Run the following command in terminal: `deno run -A mod.ts`

## Backend API
Ensure the backend is running, by making a GET request to http://localhost:8000/

## Frontend
Browse to http://localhost:8000/index.html and schedule an interstellar mission launch!

## Hosted Version
The latest version is deployed into a docker container and hosted on Amazon Web Services (AWS). Check it out by clicking [HERE](http://18.141.233.196:8000/index.html).