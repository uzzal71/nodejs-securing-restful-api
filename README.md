# nodejs-securing-restful-api
Node.js: Securing RESTful APIs

# 0. Introduction
## Securing Node RESTful APIs
Securing Node RESTful APIs
## What you should know
What you should know

# 1. Setting Up
## Overview of the security threats
### Top Five Security Threats
1. Injection attacks
2. Broken authentication
3. Sensitive data exposure
4. XML entities
5. Broken access control

## Introduction to OWASP
1. https://owasp.org/
2. https://en.wikipedia.org/wiki/OWASP

## Introduction to JWT
1. https://jwt.io/

## Introduction to Postman
1. https://www.postman.com/

# 2. Setting Up the Node API

## Base project template intro
1. Install mongodb: https://www.mongodb.com/
2. Install compass: https://www.mongodb.com/products/compass OR
3. Install Robo 3T: https://robomongo.org/
4. Create a folder in your desktop "security"
5. npm init && npm install body-parser express mongoose nodemon && npm i --save-dev babel-cli babel-preset-env babel-preset-stage-0

## Finalize the setup for the project
"start": "nodemon ./index.js --exec babel-node -e js"

## Create the user model
```
import mongoose from 'mongoose';
const Schema = mongoose.Schema;
export const UserSchema = new Schema({});
```

## Add bcrypt password hashing
npm i bcrypt jsonwebtoken

# 3. Securing the Node API

## Add the handlers for loginRequired
### Create userController.js file
```
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserSchema } from '../models/userModel';

const User = mongoose.model('User', UserSchema);

export const loginRequired = (req, res, next) => {
    if (req.user) {
        next();
    } else {
        return req.status(401).json({ message: 'Unauthorized user!' });
    }
};
```
## Add the handlers for registration
### Open userController.js file
```
export const register = (req, res) => {
    const newUser = new User(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    newUser.save((err, user) => {
        if (err) {
            return res.status(400).json({ message: err });
        } else {
            user.hashPassword = undefined;
            return res.status(201).json(user);
        }
    });
};
```
## Add the handlers for login
### Open userController.js file
```
export const login = (req,res) => {
    User.findOne({
        email: req.body.email
    }, (err, user) => {
        if (err) throw err;
        if (!user) {
            res.status(401).json({ message: 'Authentication failed. No user found'});
        } else if (user) {
            if (!user.comparePassword(req.body.password, user.hashPassword)) {
                res.status(401).json({ message: 'Authentication failed. Wrong password'});
            } else {
                return res.json({token: jwt.sign({ email: user.email, username: user.username, _id: user.id}, 'RESTFULAPIs')});
            }
        }
    });
}
```
## Finalize secured endpoints
### Open crmRoutes.js file
```
import { 
    addNewContact, 
    getContacts, 
    getContactWithID, 
    updateContact,
    deleteContact 
} from '../controllers/crmController';
import { login, register, loginRequired } from '../controllers/userControllers'

const routes = (app) => {
    app.route('/contacts')
    .get((req, res, next) => {
        // middleware
        console.log(`Request from: ${req.originalUrl}`)
        console.log(`Request type: ${req.method}`)
        next();
    }, loginRequired, getContacts)
    
    // POST endpoint
    .post(loginRequired, addNewContact);

    app.route('/contact/:contactId')
    // get specific contact
    .get(loginRequired, getContactWithID)
    
    // put request
    .put(loginRequired, updateContact)

    // delete request
    .delete(loginRequired, deleteContact);

    // registration route
    app.route('/auth/register')
        .post(register);

    // login route
    app.route('/login')
        .post(login);
}

export default routes;
```
## Add JWT setup into index
### Open index.js file
```
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import jsonwebtoken from 'jsonwebtoken';
import routes from './src/routes/crmRoutes';


const app = express();
const PORT = 3000;

// mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/CRMdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// bodyparser setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// JWT setup
app.use((req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jsonwebtoken.verify(req.headers.authorization.split(' ')[1], 'RESTFULAPIs', (err, decode) => {
            if (err) req.user = undefined;
            req.user = decode;
            next();
        });
    } else {
        req.user = undefined;
        next();
    }
});

routes(app);

// serving static files
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.send(`Node and express server is running on port ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on port ${PORT}`)
);
```
## Test the API with Postman
### npm start
1. localhost:3000/auth/register
```
username:
email:
password:
```
2. localhost:3000/login
```
username:
email:
password:
```