
# Kalendarz<sup>App</sup>

(&#x1F534;): This application is currently under the development. 

The application was created for my Bachelors Thesis defense. It allows for managing reservations of rooms in a company/university. 
It is fully responsive and accessible for people with disabilities.


The app consist of two units:
- Back-End side (Python, Django Rest Framework)
- Front-End side (TypeScript, React, Less)

## Features
- Permission system based on ACLs
- Simple Role system (currently two roles: Admin and User)
- Admin Panel for managing Room Types and Rooms
- User registration system
- Authentication based on expiring tokens

## Currently under development
- Reservation panel
- User management panel for Admin
- User management panel for logged in user
- My Reservations panel for logged in user
- i18n

# Project setup
Software Requirements:
- Python 3
- node.js v16.14.0+

## First run

### Back-End side
After cloning the application, from inside root directory, you need to create Python virtual environment and activate it. 
After that you need to install Python packages.
```
python3 -m venv env // Create virtual env

source env/bin/activate // On Windows use `env\Scripts\activate`

pip install -r requirements.txt // install packages
```

When the installation is completed, the next step is to create development database, seed it with starting roles and create super admin user.

```
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

### Front-End side
To run Front-end side simply run these following commands

```
// Assuming we're in root directory

cd ./front

npm install

npm start
```
