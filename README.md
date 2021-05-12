# Tree-House_Unit9
If you haven’t already, download the project's starter files, unzip them, add them to your project folder, and push them to your GitHub repo.
Open the project in your text editor and navigate to the root directory of the project in the terminal.
Make sure that the node_modules folder is listed in the .gitignore file.
Run the npm install command in the terminal to install the project dependencies.
Run the npm run seed command in the terminal. This will create the fsjstd-restapi.db database and seed it with initial data. Pro Tip: You can use DB Browser to test that the fsjstd-restapi.db database has been properly created and seeded.
Use the npm start command in the terminal to launch the application and go to http://localhost:5000/ to make sure the app is working properly. You should see a “Welcome to the REST API project!” message.
Database Configuration
Install Sequelize.
Install the Sequelize CLI.
Initialize the project using the npx sequelize init command.
Update the development environment object of the config.js file so that the storage key has a value of "fsjstd-restapi.db" and dialect key has a value of "sqlite".
Use Sequelize's authenticate function to test the database connection. A message should be logged to the console informing the user that the connection was successful or that there was an error.