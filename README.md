# Capstone2.5_Backend
Political Informant Application - Express Backend w/ PostgreSQL DB

## ToDo:
- Create Add_Member_Data Table to store all secondary member information
  - All 3rd-party API requests done on server initialization.
  - Retrieve all paginated results of Congress.Gov member
    - Organized into array of objects
    - Inject results into the DB - relationship between CongressMember and Add_Member_Data on Congress.id - One to One
    - When retrieving any member/members from the API, all necessary Add_Member_Data is sent with it

## Technical Overview
Express.js REST API handling a PostgreSQL DB

### Tech Stack
- Express.js REST API
- Sequelize - ORM to manage psql DB
- Deployed on Fly.io [pi-backend-api.fly.dev](https://pi-backend-api.fly.dev/)

### General Flow
- The backend will hold all congressional member data and user information for the application via DB.
  - Congressional Member data fetched from APIs:
    - [ProPublica Congress API](https://projects.propublica.org/api-docs/congress-api/)
      - Limited to 5000 Requests per day
    - [Congress.gov API](https://api.congress.gov/#/)
      - Used to get Member Photo URL
        - Currently getting CORS error - Server Side issue - Will implement later
  - Congressional Member data will be sanatized before being stored. Will only be served via GET requests.
  - User login/loggout/create via POST requests

### Database Schema

![db_schema](./db_schema.png)

- Addtional Data to be delivered upon request:
  - socials
    - twitter
    - facebook
    - youtube
  - bills_sponsored
  - bills_cosponsored

This info will be added to the response json back to Client. Client will be saving the complete member object locally in the component/redux (TBD)
