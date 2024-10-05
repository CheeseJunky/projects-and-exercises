## Simple avto.net like project

* Frontend written with React.js
    * Simple UI
        * Top navigation bar
        * Left side filter
        * Middle vehicle list
        * Right list sorting options
    * UI uses some MaterialUI components
    * Admin functions are locked until admin user login
* Backend written in Python
    * users_db contains code using SQLAlchemy for working with the database
    * avtoserver is the main server file handling HTTP requests
* MariaDB
    * db folder contains some exported dummy data