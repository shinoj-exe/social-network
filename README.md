# social-network
This is a mini social network web application created using the MERN stack, which stands for MongoDB, Express, React, and Node.js. This app allows users to sign up or sign in, create their profile, search for other users, view other users' profiles, and make them friends or unfriend them.

##Features
The following are the features that have been implemented in this mini social network app:

-Sign up/sign in: Users can sign up for a new account or sign in with an existing account. Passwords are securely hashed before being stored in the database.

-Create a profile: Users can create a profile for themselves by providing their name, location,occupation,email and profile picture.

-Search for other users: Users can search for other users by name.

-View other users' profiles: Users can view other users' profiles by clicking on their name. They can also see the number of friends that the user has.

-Add/Remove Friends: Can add or remove friends from their profile page or home page.(This option will be disabled While viewing their own profile page).

-Posts Functionality: Every user is able to see all posts in the home page where general posts of every user will be displayed.

-Add Posts: Each logged in user is able to add a post to their feed which will be showe on their own profile and in the general feed.

-Update posts: Likes for each posts are counted separately and displayed and it is kept track of which users have liked the posts already.


##Dependencies
The following are the major dependencies that have been used in this project:

-React JS: A JavaScript library used for building user interfaces.

-Node.js: A JavaScript runtime used to build server-side applications(Runtime Environment for Javascript).

-MongoDB: A NoSQL document database used to store data in a flexible, JSON-like format.

-Express: A web application framework for Node.js used to build APIs and web applications.

-bcrypt: A library used to hash and salt passwords.

-jsonwebtoken: A library used to generate and verify JSON Web Tokens (JWTs).

-multer:Used for handling file uploads 

-formik,yup-: They are used for form validation

-dropzone:It used to provide a drag and drop interface for file uploads in the client.



## Run Locally

1.Clone this repository to your local machine.

```bash
  git clone https://github.com/shinoj-exe/social-network.git
```

2.Go to the project directory

```bash
  cd SOCIAL-NETWORK
```

3.Install the dependencies for both the client and server side.

```bash
  npm install
```

4.Create a .env file in the server directory and set the following environment variables:

```bash
  MONGO_URL=<your_mongodb_url>
  JWT_SECRET=<your_jwt_secret>
  PORT=<set_port>
```


5.Start the backend development server.

```bash
  cd server && nodemon index.js
```

6.Open another terminal window and start the client.
```bash
  cd frontend && npm start
```
