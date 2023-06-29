# Career Service Hub Blue Ocean Project

## Purpose

The purpose of this project was to take an existing application, then meet with a client to discuss new features and expectations for the final product. The application initially consisted of a managers login page which allowed the career services manager to view the status of their student's job search process, with the ability to filter the students based on their cohort and milestone status. There are 5 milestones being tracked for every student/graduate: Resume, Cover Letter, LinkedIn Profile, Huntr Access, and Personal Narrative. The team was then resposible for adding additional features consisting of a student login, a student view page, a registration for new students and many more behind the scenes features that will be further explained down below.

## Current Architecture

This repo contains an example of a full-stack application utilizing a PERN stack, with an ExpressJS API backend, a React frontend, and a PostgresSQL database.

## Tech Stack

<div style="display: flex; align-items: center;">
  <a href="https://www.postgresql.org/">
    <img src="https://skillicons.dev/icons?i=postgres&theme=dark" alt="postgres" />
  </a>
  <span style="display: flex; align-items: center; margin-left: 10px;">
    PostgreSQL: A relational database management system used for storing, managing, and manipulating structured data.
  </span>
</div>

<div style="display: flex; align-items: center;">
  <a href="https://expressjs.com/">
    <img src="https://skillicons.dev/icons?i=express&theme=dark" alt="express" />
  </a>
  <span style="display: flex; align-items: center; margin-left: 10px;">
    Express.js: A web application framework for Node.js used for building server-side web applications and APIs.
  </span>
</div>

<div style="display: flex; align-items: center;">
  <a href="https://react.dev/">
    <img src="https://skillicons.dev/icons?i=react&theme=dark" alt="react" />
  </a>
  <span style="display: flex; align-items: center; margin-left: 10px;">
    React: JavaScript library for building interactive UI components for web/mobile applications.
  </span>
</div>

<div style="display: flex; align-items: center;">
  <a href="https://nodejs.org/en">
    <img src="https://skillicons.dev/icons?i=nodejs&theme=dark" alt="nodeJS" />
  </a>
  <span style="display: flex; align-items: center; margin-left: 10px;">
    Node.js: A runtime environment used to execute JavaScript code on the server-side.
  </span>
</div>
  
## Current Features

The application is currently deployed to Render at https://career-services-frontend.onrender.com/

Currently, the project has a login page for admin view, the student view and a registration option to register as a new student. In the main-hub, once logged in as an admin, you can see that there is a side bar and a main card container that comprises of all the student cards in the postgresSQL database. Once logged in as a student you will find a read only view of a students information and an option to edit certain fields of the students information. In addition, there is an option to register as a new student which then logs you in as the student once registered.

Admin Login : Login with the following Email and password or get list of users with localhost/8000/managers once running in Docker.
Email: admin@admin.com
Password: admin

Student Login : Login with the following Email and password or get list of users with localhost/8000/students once running in Docker.
Email: student@student.com
Password: student

Student Registration: Click the "Register" button in the top right corner of the login page. You will then input the required fields with a valid email. You will also need to retrive the authoriztion code from one of the admin accounts to be allowed to register as a new student user. Once you see the registered notification at the bottom of the component, you can then login with the information you used to register.

In the admin view, you will notice that the each student card has a certain color (Red, Yellow or Green). This is determined by the overall status of the career asset "milestones".
If any of the milestones are "Unsatisfactory", then the card is red
If none of the milestones are "Unsatisfactory" but atleast one is "In-Progress", then the card is yellow
Else the card is green because all milestones must be "Completed"

Additionally, if you click a student card then a modal will pop up allowing the user to update anything they want about the student using the provided drop down menus. Once the Update Student Button is clicked, the site must be refreshed to see any of the changes.

After logging in as a student, if you navigate to the change my profile tab on the left side of the page, you will see different fields that the user is authorized to edit. Once the user has finshed adding their changes, they can then hit the submit button. Utilizing Socket.io this will then send a notification to the students respective career services mmanager (admin) to notify them that the student has updated their information. The admin has a bell icon in the top right of the page which will show a number for how many unread notifcations they have. By clicking the bell they can display all unread notifications with an option to "mark as read" which will then delete the message from their notifications.

For authorization and authentication, we are utilizing jsonwebtoken. When a user registers, their password is stored in the database after being encrypted using bcrypt. When a user logs in, if the email and password match the information in the databse, they will be given a JWT that is stored in their cookies. This is what allows a user to continue to navigate the web page. When the user logs out or the token expires they will be rerouted to the login page and blocked from accessing the page without re-authentication.

Also on the mainhub, you can filter for certain students in a variety of ways (MSCP, Security Clearance, Education Background, Milestone Status and Career Service Manager) using the provided drop-down menus. Additionally, there is a search bar that is can be used to type a certain students name (first or last) and the cards container will filter for that student. Additionally, there is an export csv button that will export all CURRENT students being displayed (and will NOT export students that are currently filtered out). Finally, there is a clear filters button that will clear filters and reset the container to show all students cards again.

## Automated Testing

Testing can be done locally or deployed, however there may or may not be additional work for testing to work on a deployed server. At this current moment a container is made on docker for testing. Testing will fail upon build, however once the API is initialized then you can start the container to run the tests through docker desktop. This will test all API routes.

### Front-End

Front-End testing was initially wrote using WebdriverIO, but was switched over to a Babel-Jest transform testing.
To start Front-End testing follow the below steps

1. `cd frontend_testing` - Enter frontend-testing folder.
2. `npm install` - Install all dependencies.
3. `run test` - This will run all tests inside the frontend-testing folder
4. Currently the end-to-end testing and the filter component are being tested

### Backend

This repository contains a straightforward Express server, designed to provide efficient functionality. The server can be built using Docker compose, allowing it to run seamlessly and listen for incoming requests.

## Setting Up App Locally (with Docker)

The app can be started with a few steps:

1. `cd client` - Enter client-side folder.
2. `npm install` - Install all dependencies.
3. `cd ..` - Back up a Folder
4. `cd api` - Enter server-side folder
5. `npm install` - Install all dependencies
6. `cd ..` - Back up a folder
7. `RESET_DB=true docker-compose up --build` - Run Project.

> **NOTE**: After running docker-compose up, you should see 5 containers (only 4 running: API, database, APP, and PG-Admin). The front-end app should be running on Localhost:3000/. Upon docker containers running, the database will be emptied and re-seeded everytime a docker container is brought down and back up again.

Additionally, please note that you need to wait for the API server to be up and running (localhost:8000/) before running the front-end (localhost:3000/). Otherwise the students cards will not load on the page. If this occurs you can refresh the page and the students cards should load in.

## Deploying App (on Render)

Should you choose Render for your deployment of this application then it should be fairly easy. The client side can be launched as a static site with ease, The database can be made and the connection link can be copied for later use. The API server can either be used as a node enviornment or can utilize the docker file to build in a container. You would just need to take the connection link and add it to the API settings in Render.

## Possible Future Improvements to Consider

- Have an ability to sort the students on the app in a variety of ways (alphabetically, by Milestone Status, by Cohort, etc.)
- Once logged in, the app should have a filter automatically set to only display the students tied to that career service manager
- Create a way for admin's to send notifications to the student, for things like requesting changes or updates about their career services status.
- The application is coded for mobile viewing on a iPhone 12 through the use of css @media queries to establish specific screen sizes.

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

