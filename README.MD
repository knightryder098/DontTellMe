
# Dont Tell Me

##### Anonymous Chat App
------------------------------
[![Netlify Status](https://api.netlify.com/api/v1/badges/7dd0e075-0091-4a53-95e6-d3cba6ea3028/deploy-status)](https://app.netlify.com/sites/donttellme/deploys)

---------------------------------------------------------
DontTellme is a chatapp designed using reactJs in frontend and powered by nodeJs and Express in the backend.

### Features
- Delete your private messages after you logout ❌
- Search users through their username 🤷
- Your realname is never displayed 🔍


## Installation

DontTellMe [Node.js](https://nodejs.org/) to run.

 Clone the repositiory in  your local environment
```
git clone https://github.com/knightryder098/DontTellMe.git
```

Install the dependencies and devDependencies and start the server.

### Frontend
```
cd frontend
npm i
```

### Backend
```sh
cd backend
npm i

```

--------------------------------

## Be sure to swap out all the environment variables
Create a ```.env``` file and put the following variables

    > In frontend Folder
    
 ``` REACT_APP_BACKEND_URL_PROD=' your Backend url ' ```
 
    > In Backend Folder
    
``` PORT='any number (1000-9999)' ```
 ```DB_PWD=" Your MongoDb Atlas user Password"```
 ```DB_USER = ' Your MongoDB Atlas username'```
```DB_NAME = ' DataBase Name (Anything) '```
```FRONTEND_URL = 'Your frontend url ' ```


-----------------------------
# Start running the app
>In frontend Folder Start the frontend service
    ```cd frontend```
    ```npm start
    ```

>In Backend Folder start the backend
```cd backend```
```npm run dev```

## Development

Want to contribute? Great!
Your are always welcome.


Verify the deployment by navigating to your server address in
your preferred browser.

```sh
http://localhost:${PORT}
```

