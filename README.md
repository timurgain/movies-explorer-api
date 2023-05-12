# Movies Explorer backend api part

## Description
The application stores wide info about films that are saved as bookmarks. This repo keeps the api backend part with the following features:
- authorization and registration of users,
- operations with movies and users.

---

## Technologies

### Backend
- Node.js, Express.js;
- MongoDB, Mongoose ODM;
- Joi validation.

---

## Links

[Base API link in production](https://movie-tm.nomoredomains.monster/api)

### Cloud hosting, domains

IP 51.250.106.7

Backend https://movie-tm.nomoredomains.monster/api

---

## Installation and launch

Clone the repository and navigate to the project folder through the command line
```
git clone ...
```

### Backend
Check if Node.js and npm are installed

```
node --version
```
Check if MongoDB installed and launched
```
mongod --version
```
Start MongoDB server
```
mongod
```
Verify that the server is running if MongoDB shell can be started
```
mongo
```

Go to the backend folder
```
cd backend
```
Install npm dependencies
```
npm install
```
Run the Express.js app
```
npm run dev
```
