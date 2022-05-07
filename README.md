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