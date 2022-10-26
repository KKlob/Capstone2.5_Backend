# Express Docs

## API Route Structure

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
  - /api/congress/members - Returns Array of congress member objects
  - /api/congress/members/:chamber - Returns Array of member objects serving in :chamber
  - /api/congress/member/:id - Returns member object with :id
