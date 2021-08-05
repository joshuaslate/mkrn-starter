# MKRN Starter
Starter/seed project for MongoDB, Koa, React/Redux, Node full-stack JavaScript apps.

## Usage
Clone the starter onto your machine and install all of the dependencies. You may need to [install a local copy of mongodb](https://docs.mongodb.com/manual/installation/) if you do not already have it.

This example shows cloning the main repository, but you should **fork** it first and clone your fork if you plan to contribute.

```
git clone https://github.com/joshuaslate/mkrn-starter.git
cd mkrn-starter/api
npm install
cd ../mkrn-starter/app
npm install
```
Now, you need to set up three shells to run mongodb, the server, and the client.

*shell 1 - this is mongodb*

```
cd ../mkrn-starter/app
mongod
```
*shell 2 - this is the server*

```
cd ../mkrn-starter/app
npm start
```
*shell 3 - this is your client*

```
cd ../mkrn-starter/api
npm start
```

At this point, you should be able to navigate to `http://localhost:8080/` on your browser (if it doesn't open automatically) and see the landing page which is blank except for the header. Recommendations:

- open your 'Developer Console'
- Click on "Register" and enter a new user
- you should be navigated to the protected area
- test the Sign Out, forgot password, and other features
- break it, learn from it, post here :green_heart:

## Features
- Login/Logout
- Register
- Forgot passwort
- Multiple languages (en, de)

## Contributions
Please feel free to contribute to this project. Whether it's features, tests, or code cleanup, any help is welcome at this point.

### Contact
Please send inquiries to josh(at)slatepeak.com, or use the contact form at https://slatepeak.com to contact me.
