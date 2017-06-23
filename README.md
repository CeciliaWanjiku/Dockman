 ## Dockman ##
Description

The web application
Allows users to create accounts and manage simple documents by allowing users to:
-Create new users
-Find a matching instance of a user & document
-Update user & documents
-Find user & documents
-Delete Users & documents
-Pagination

### Installation ###

Clone this repository
$ git clone https://github.com/CeciliaWanjiku/Dockman/tree/develop && cd dockman
Install the project's dependencies
$ npm install
Ensure you have a SECRET_KEY set in your environment by exporting one.

Run the development server
$ npm run start:dev
The server will run at http://localhost:8090

### Testing ###
You can run tests by ensuring you have the project set up then running:

$ npm run coverage

This web application is made using NodeJS, Postgress, Sequelize and ReactJS with Redux.
