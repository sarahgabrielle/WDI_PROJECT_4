# WDI PROJECT 4

Fourth and final project set by GA to build a full-stack MERN application in one week.


## Technical Requirements

* Use an Express 4 API to serve your data from a Mongo database
* Consume your API with a separate front-end built with React
* Be a complete product which most likely means multiple relationships and CRUD functionality for at least a couple of models
* Implement thoughtful user stories/wireframes that are significant enough to help you know which features are core MVP and which can you cut
* Have a visually impressive design 
* Be deployed online so it's publicly accessible.
* Have automated tests for at least one RESTful resource on the back-end.


## Necessary Deliverables

* A working app hosted on the internet
* A link to your hosted working app in the URL section of your Github repo
* A git repository hosted on Github, with a link to your hosted project, and frequent commits dating back to the very beginning of the project

### Name of App:

Skilog

### App Concept:

The app was built to enable users to log their ski trips. Users can add trips which will display in the upcoming trip section. Users can view more details about the upcoming trip such as the Google Ski Trail Map and the ski resort's weather forecast. Users can upload photos and other documents (such as ski e-pass) to their trip and can also instant message their ski buddies.

Link to app: [](https://evening-badlands-38731.herokuapp.com)

## Technologies used:

* HTML
* JWT
* Bluebird
* NodeJS
* ExpressJS
* Express-jwt
* Mongoose
* Axios
* Morgan
* AWS
* Mocha & Chai
* Moment.js
* React
* Bootstrap
* SCSS
* skycons-component
* socket.io

## Approach taken:

* I planned out my application by firstly sketching some wireframes and wrote user stories to define what my users would want to do with the app. I also drew on some inspiration from other ski apps. 
* I used Trello to organise my tasks, by separating them into 'Backlog', 'In Progress', 'In Review' and 'Done' lists. This eased development headaches dramatically as it clearly structured the work I had done and the work that remained to be done.
* I did some research on the APIs that I was going to use for my app.
* I pseudo-coded all the basic elements of my application and built from there, starting with the user authentication first. I then moved to doing all the back-end elements of the application and continued testing my routes and controllers in Insomnia. Once those elements were working, I finally moved on to the front-end components.
* I used Mongoose as my database engine and used Insomnia to test all of my APIs. Finally, I used the Mocha and Chai frameworks for TDD on the back end.
* I used React-Bootstrap as my CSS framework and used SCSS to provide styling to components.

APIs

Dark Sky. I used the API to access weather forecasts and current conditions to enable users to check out the weather at their ski resort.

Google Map - to provide the ski resort map and display all of the ski trails/lifts etc.

## Unsolved problems/potential improvements:

Problems:

* Finding good APIs for ski maps proved almost impossible - in the end I had to settle for Google Maps. 

Improvements:

* Add functionality to enable users to add a "meeting point" marker  whether that be for lunch or après-ski.
* oAuth
* Invite a friend 
* More TDD.

## Screenshots of the app:


## Important

Ensure that you add any relevant environment variables to heroku with `heroku config:set`, eg:

`heroku config:set AWS_BUCKET_NAME=wdi-project-4`
## 