We installed the following libraries in this boilerplate template for NodeJS project:

1. ExpressJS
2. Dotenv: To store the environment variables like PORT, database URL, testing keys etc.
3. Http-status-codes : In order to avoid hardcoding the status codes like "200", "500" etc. It instead uses enum for these status codes.
4. Nodemon: Starts a node server, which automatically restarts when any change is made to any of the files. In node versions higher than 18, we can use `node --watch` instead.
5. Winston: For logging, which would be useful in debugging.
6. Sequelize ORM: Used for interacting with the SQL database in object oriented fashion
7. MySQL2: The driver for the database, which will be used in conjunction with the ORM
8. Sequelize CLI: Allows us to perform the tasks like dropping a table, running migrations etc through the command line

We setup the PORT in the environment variable, specifying the port where we want to run our application.

We are creating a src folder, which has all the code for the application. Then there will be another folder test, where we will define our unit tests going forward.

The config folder is setup as a single point of contact for getting all the configurations.

In the index.js of config, we require 'dotenv' which returns an object. We, in turn call the config() method on this object.

Q. What is an environment variable?

A. A variable that is controlled outside the program. Example: The path to python is specific to the environment, and not to the specific application when used as an environment variable. In order to view all the environment variables, we can use `console.log(process.env)`

We'll be making an index.js in almost all of the folders: It helps us to have a single index of different controllers/services/routes etc, which will be helpful for us to do a single import instead of using multiple import statements.

We are going to have API versioning in our template, so we specify v1,v2 etc in the 'routes' folder.

To use Nodemon, we run `npx nodemon src/index.js`. NPX is NPM execute, it allows developers to execute any JavaScript package available on the NPM registry, even without installing it.

We can specify scripts like "test", "start" or "dev" inside the package.json . The benefit is that we can use "npm run script_ name"  instead of typing the entire command.

Q. What is the difference between package.json and package-lock.json files? Are both of them needed? What happens if package-lock.json is not present but package.json is present?

A. package.json specifies the versions of the dependencies in the form of caret(^) or a tilde(~) notation. It allows for a flexibility in the version of the dependency installed, so for example if the dependency is specified as "^5.3.1" in the package.json (and the package-lock.json is not there) then the installed dependency will be ">=5.x.y" where x>=3 and y>=1.

But the package-lock.json specifies the exact versions of the dependencies to be installed, like 5.3.1 

Q. Why use Express Router in the application?

A. Imagine that I have many routes with the prefix '/birds', like '/birds/about', '/birds/contact', '/birds/home' etc. Now if I want to modularise all the different routes of '/birds' together, I can use the express router, which improves the readability and modularity of code.

Q. How does res.status(500).json ({ "json object" }) work ?

A. To the res object, we are firstly attaching the property of status=500

Now let's say this object of res, combined with the status of 500 is called as x.

Then we are attaching the json field as well to the object x, and returning it.

In the logger-config, I am specifying the transports: which is where should the logs be displayed/stored. Currently, I have chosen them to be displayed over both the console and stored in a flat file.

Q. What is an ORM and ODM? 

A. ORM is Object Relational Mapping (ORM, used for SQL databases) and ODM is Object Document Mapping (ODM, used for NoSQL databases). These are libraries which are used to interact with the database in an object oriented fashion, and internally they get converted to the SQL query/Mongoose queries etc.  ORMs can help with creating the schema, performing queries, defining the associations between the entities (like 1 to many, many to many etc)

Q. What are seeders, that the sequelize ORM provides us with?

A. Seeders are used to populate the database with some set of initial data, like initial test accounts or dummy data.

Q. What are migrations in databases?

A. In the simplest terms, migrations are version control of databases. 

Consider the use case when we initially have a small scale application, we have a database schema. Now when we have to scale the application up, we might need to change the schema, joins, columns etc. At some point, we might also need to roll back to an earlier version of the database. Hence we use migrations. 