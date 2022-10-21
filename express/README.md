# Express Docs

## API Route Structure

- /api/user - User Routes
  - /api/user/login - Handles login of User
  - /api/user/logout - Handles logout of User
  - /api/user/signup - Handles creation of new User
  - /api/user/:id - Returns Array of member objects User is subed to
- /api/congress - Congress Routes
  - /states - Returns Array of state objects
    - /states/:state - Returns array of member objects from :state
  - /members - Returns Array of congress member objects
  - /members/:chamber - Returns Array of member objects serving in :chamber
  - /member/:id - Returns member object with :id