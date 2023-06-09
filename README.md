# Career Service Hub Blue Ocean Project

## Purpose

The purpose of this project is to present a student/graduate tracker for the Galvanize career service managers so that they can more easily track the status of each Galvanize student/graduate. Specically, tracking the status of the career asset "milestones". There are 5 milestones being tracked for every student/graduate: Resume, Cover Letter, LinkedIn Profile, Huntr Access, and Personal Narrative.

## Current Architecture

This repo contains an example of a full-stack application with an ExpressJS API backend, a React frontend, and a PostgresSQL database. 

## Current Features

Login with the following Email and password or get list of users with localhost/8000/managers once running in Docker. 
Email: admin@admin.com 
Password: admin

Currently, the project has a login page and a main hub page that is available once logged in. In the main-hub, you can see that there is a side bar and a main card container that comprises of all the student cards in the postgresSQL database. 

You will also notice that the each student card has a certain color (Red, Yellow or Green). This is determined by the overall status of the career asset "milestones". 
    If any of the milestones are "Unsatisfactory", then the card is red
    If none of the milestones are "Unsatisfactory" but atleast one is "In-Progress", then the card is yellow
    Else the card is green because all milestones must be "Completed" 

Additionally, if you click a student card then a modal will pop up allowing the user to update anyhting they want about the student using the provided drop down menus. Once the Update Student Button is clicked, the site must be refreshed to see any of the changes.

Finally, in the student cards container you will also a card with a plus-sign, this can be used to add more students to the app. Once clicked, this will open the add-student modal. There are 2 ways to add students, Single-Add (one at a time using the modal) or Bulk-Import (using a imported csv). You can choose between which option using the colored buttons at the top of the student modal (note the button will be highlighted showing which option you are currently in). 

For the Bulk-Import, the structure of the import csv is ABSOLUTELY KEY, there must be only 3 columns (Student First, Student Last, Sec Clearance) and in that order. In the Bulk-Import modal there is an example csv template button that once clicked will download an example csv template the user can use and follow to import more students. Once the user fills out the MSCP and Career Service Manager field and clicks submit, a table will pop up in the modal to show what students are about to be added into the database (this allows the user to cancel if anything doesnt look right). If everything looks good, there is a final upload button at the bottom of the table to upload the students to the app. This should happen immediately and all students will be added to the bottom of the card container.

Also on the mainhub, you can filter for certain students in a variety of ways (MSCP, Security Clearance, Education Background, Milestone Status and Career Service Manager) using the provided drop-down menus. Additionally, there is a search bar that is can be used to type a certin students name (first or last) and the cards container will filter for that student. Additionally, there is an export csv button that will export all CURRENT students being displayed (and will NOT export students that are currently filtered out). Finally, there is a clear filters button that will clear filters and reset the container to show all students cards again.

## Automated Testing

Testing can be done locally or deployed, however there may or may not be additional work for testing to work on a deployed server. At this current moment a container is made on docker for testing. Testing will fail upon build, however once the API is initialized then you can start the container to run the tests through docker desktop. This will test all API routes.

### Front-End

Front-End testing was initially wrote using WebdriverIO, but was switched over to a Babel-Jest transform testing.
To start Front-End testing follow the below steps
1. `cd frontend_testing` - Enter frontend-testing folder.
2. `npm install` - Install all dependencies.
3. `run test` - This will run all tests inside the frontend-testing folder
4. Currently the end-to-end testing and the filter component are being tested

### Back-End

Simple Express server, nothing too complicated or intense on this end. A Docker compose will build the server and have it listen. 

## Setting Up App Locally (with Docker)

The app can be started with a few steps:
1. `cd client` - Enter client-side folder.
2. `npm install` - Install all dependencies.
3. `cd ..` - Back up a Folder
4. `cd api` - Enter server-side folder
5. `npm install` - Install all dependencies
6. `cd ..` - Back up a folder
7. `docker-compose up` - Run Project.

> **NOTE**: After running docker-compose up, you should see 5 containers (only 4 running: API, database, APP, and PG-Admin). The  front-end app should be running on Localhost:3000/. Upon docker containers running, the database will be emptied and re-seeded everytime a docker container is brought down and back up again.

Additionally, please note that you need to wait for the API server to be up and running (localhost:8000/) before running the front-end (localhost:3000/). Otherwise the students cards will not load on the page. If this occurs you can refresh the page and the students cards should load in.

## Deploying App (on Render)

Should you choose Render for your deployment of this application then it should be fairly easy. The client side can be launched as a static site with ease, The database can be made and the connection link can be copied for later use, the API server can either be used as a node enviornment or can utilize the docker file to build in a container. You would just need to take the connection link and add it to the API settings in Render. 

## Possible Future Improvements to Consider

- When updating a student, you have to refresh the page to see the latest changes. Make it so you dont...
- Have an ability to sort the students on the app in a variety of ways (alphabetically, by Milestone Status, by Cohort, etc.)
- Once logged in, the app should have a filter automatically set to only display the students tied to that career service manager

## npm Scripts

**`root`**

- `lint` - Checks code for style issues.
- `test` - Runs `test:client` and `test:api`.
- `ci` - Runs `lint` and `test`.
- `test:client` - Runs frontend tests.
- `test:api` - Runs backend tests.

**`/client`**

- `dev` - Hosts your assets (executed by docker-compose).
- `build` - Builds your assets for production.
- `test` - Runs tests.

**`/server`**

- `dev` - Runs the server in watch mode (executed by docker-compose).
- `start` - Starts the production server.
- `test` - Runs tests.

**`/frontend_testing`**
- `test` - Runs frontend tests

## Tech used

- [`vite`](https://vitejs.dev/) - Module bundler, transpiler and dev server.
- [`vitest`](https://vitest.dev/) - Test runner.
- [`prettier`](https://prettier.io/) - Code formatter/checker.
- [`react-testing-library`](https://testing-library.com/docs/react-testing-library/api/) - React component test helper.
- [`msw`](https://testing-library.com/docs/react-testing-library/api/) - Request mocking library for writing frontend tests.
- [`supertest`](https://github.com/ladjs/supertest) - HTTP request simulator for backend testing.
- [`docker`](https://www.docker.com/) - Containerization framework for dev and deployment.
- [`jest`](https://jestjs.io/) - testing suite
- [`JSONwebToken`](https://jwt.io/) - Used for authentication
