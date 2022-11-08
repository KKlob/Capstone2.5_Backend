# Capstone2.5_Backend
Political Informant Application - Express Backend w/ PostgreSQL DB

## ToDo:
 - Write tests
 - Add findSub route
   - checks for Sub where userID && memberId
   - if True, returns True
   - if False, returns False
   - Assists Front-end in determining if user is able to add sub or remove sub

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
    - Congressional Member data will be sanatized before being stored. Will only be served via GET requests.
  - User login/loggout/create via POST requests

### Database Schema

![db_schema](./db_schema.png)

- Addtional Data to be delivered upon any state members request or specific member request:
  - socials
    - twitter
    - facebook
    - youtube
  - bills_sponsored
  - bills_cosponsored
  - total_votes
  - missed_votes
  - votes_with_party_pct
  - years_served
  - photo
