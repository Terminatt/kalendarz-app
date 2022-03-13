
# Kalendarz<sup>App</sup>

(&#x1F534;): This application is currently under development. 

The application was created for my Bachelors Thesis defense. It allows for managing reservations of rooms in a company/university. 
It is fully responsive and accessible for people with disabilities.


The app consist of two units:
- Back-End side (Python, Django Rest Framework)
- Front-End side (TypeScript, React, Less)

## Commit Lint
The project follows commit lint convention for commit names. To view full list of problems (rules) follow this link [Commit Lint Convention](https://github.com/conventional-changelog/commitlint#what-is-commitlint)

## Features
- Permission system based on ACLs
- Simple Role system (currently two roles: Admin and User)
- Admin Panel for managing Room Types and Rooms
- User registration system
- Authentication based on expiring tokens
- Reservation panel
- User management panel for Admin
- User management panel for logged in user

## Currently under development
- My Reservations panel for logged in user
- Guards for admin routes

# Project setup
Software Requirements:
- Python 3
- node.js v16.14.0+

## First run

### Back-End side
After cloning the application, from inside root directory, you need to create Python virtual environment and activate it. 
After that you need to install Python packages.
```
// Assuming we're in root directory

python3 -m venv env // Create virtual env

source env/bin/activate // On Windows use `env\Scripts\activate`

pip install -r requirements.txt // install packages
```

When the installation is completed, the next step is to create development database, seed it with starting roles and create super admin user.

```
// Assuming we're in root directory

cd api

python manage.py migrate // create db or update it

python groups.py // seed with groups

// When asked for providing a group id, type 1
python manage.py createsuperuser --email admin@example.com --username admin
```

After all these steps, you can start the api application with following command: 

```
// Assuming we're in ./api

python manage.py runserver
```

The Back-End application should be accessible on `http://localhost:8000/` url.

### Front-End side
To run Front-end side simply run these following commands

```
// Assuming we're in root directory

cd ./front

npm install

npm start
```

The Front-End application should be accessible on `http://localhost:3000/` url.
