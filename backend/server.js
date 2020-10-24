const express = require("express"),
  app = express(),
  fs = require('fs'),
  port = process.env.PORT || 5000,
  cors = require("cors");

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, () => console.log("Backend server live on " + port));


const getUsers = () => {
  const fileContent = fs.readFileSync('./database/Users.json');
  const usersArr = JSON.parse(fileContent).users;
  return usersArr;
}

const findUser = (person, users) => {
  if (person !== undefined) {
    const user = users.find(user => person.email === user.email);
    return user;
  } else
    return undefined;
}

const createUser = (newUser) => {
  if (newUser !== undefined) {
    let usersArr = getUsers();

    let updateUsers = {
      users: []
    }

    if (usersArr.length > 0) {
      updateUsers.users = usersArr;
      updateUsers.users.push(newUser);
    } else
      updateUsers.users.push(newUser);


    let data = JSON.stringify(updateUsers);
    fs.writeFileSync('./database/Users.json', data);

    console.log(getUsers());
    return true;
  } else
    return false;
}

app.post('/login', function (req, res) {

  const users = getUsers();

  const person = {
    email: req.body.email,
    password: req.body.password
  };

  let authStatus = {
    id: "",
    username: "",
    userExist: false,
    passwordCorrect: false
  }

  if (users.length > 0) {
    let user = findUser(person, users);

    if (user !== undefined) {
      authStatus.userExist = true;
      if (user.password === person.password){
        authStatus.id = user.id;
        authStatus.username = user.username;
        authStatus.passwordCorrect = true;
      }  
    }
    res.send(authStatus);
  }
  else
    res.send(authStatus);
});

app.post('/signup', function (req, res) {

  const users = getUsers();

  const person = {
    id: `${users.length + 1}`,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  };

  let registerStatus = {
    userExist: false,
    userCreated: false
  }

  if (users.length > 0) {
    let user = findUser(person, users);

    if (user !== undefined) {
      registerStatus.userExist = true;
      res.send(registerStatus);
    }
    else {
      registerStatus.userCreated = createUser(person);
      res.send(registerStatus);
    }
  }
  else {
    registerStatus.userCreated = createUser(person);
    res.send(registerStatus);
  }
});





