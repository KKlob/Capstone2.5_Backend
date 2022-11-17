# Capstone2.5_Backend
Who's That Congressperson? - Express Backend w/ PostgreSQL DB - REST API

### Use-case and audiance
REST API dedicated to be used by the [Who's That Congressperson front-end](https://github.com/KKlob/Capstone2.5_Frontend)
 - Handles various data requests for State and Congressperson information.
 - Handles singup / login of user accounts + delivering user information to authorized users
 - Monitors for changes in Congress and requests updated basic info

## ToDo:
 - Write tests
 - Create Socials Table to hold various social links for all congressional members
  - {id, memberId, label, url} 

## Technical Overview
Express.js REST API handling a PostgreSQL DB

### Tech Stack
- Express.js REST API
- Sequelize - ORM to manage psql DB

Deployed on Fly.io [pi-backend-api.fly.dev](https://pi-backend-api.fly.dev/)

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

### Routes 

- /api/user - User Routes
  - /api/user/login - POST Route - Requires {username, password} in request.body - Returns JWT {token}
  - (CURRENTLY INACTIVE) /api/user/logout - POST Route - Requires {token} in request.body - Returns success
  - /api/user/signup - POST Route - Requires {username, password} in request.body - Returns JWT {token}
  - /api/user/delete - DELETE Route - Requires {token} in request.body - Returns success

-----
- /api/user/subs - User Sub Routes
  - /api/user/subs - GET Route - Requires JWT {token} in request.body - Returns member list user has sub'd to
  - /api/user/subs/add - POST Route - Requires JWT {token} in request.body - Returns success
  - /api/user/subs/remove - DELETE Route - Requires JWT {token} in request.body - Returns success

------

- /api/congress - Congress Routes - ALL GET ROUTES
  - /api/congress/states - Returns Array of state objects
    - /api/congress/states/:state - Returns array of member objects from :state
  - (CURRENTLY INACTIVE) /api/congress/members - Returns Array of congress member objects
  - (CURRENTLY INACTIVE) /api/congress/members/:chamber - Returns Array of member objects serving in :chamber
  - /api/congress/member/:id - Returns member object with :id
