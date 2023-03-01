# MoodMate
MoodMate enables users to log their daily moods and track their emotional trends over time. Users can view their mood history and receive real-time insight with a personalized chart.

## Features

- [x] Sign up and login functionality
- [x] Record your mood and a short description of your day
- [x] Attach daily activities to your mood logs
- [x] View pie chart of your moods over time
- [x] Delete previous entries
- [x] Mobile responsive design

## TODO

- [ ] Edit previous entries
- [ ] Add custom activities to profile

## Getting Started

Before running this project, you will need to have the following installed:

- Node.js (version 14 or later)
- npm (version 6 or later)
- PostgreSQL

### Installation

1. Clone this repository to your local machine:

```
git clone git@github.com:glwjr/moodmate.git
```

2. Change directory into the project:
```
cd moodmate
```

3. Install the dependencies:
```
npm install
```

4. Create a PostgreSQL database and add a .env file in the root directory with the following environment variables:
```
DATABASE_URL=postgres://username:password@localhost:5432/database_name
JWT=<your-jwt-secret>
```

5. Seed the database:
```
npm run seed
```

6. Start the server:
```
npm run start
```

7. Open a web browser and navigate to http://localhost:8080 to view the application.

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- JWT (JSON Web Token)
- React.js
- React Router
- React Redux
- Material UI
- Chart.js
