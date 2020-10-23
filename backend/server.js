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
  if (person !== undefined ) {
    const user = users.find(user => person.email === user.email);
    return user;
  } else
    return undefined;
}

app.post('/login', function (req, res) {
  const person = {
    email: req.body.email,
    password: req.body.password
  };

  let authStatus = {
    userExist: false,
    passwordCorrect: false
  }

  const users = getUsers();

  if (users.length > 0) {
    let user = findUser(person, users);

    if (user !== undefined) {
      authStatus.userExist = true;
      if (user.password === person.password)
        authStatus.passwordCorrect = true;
    }
    res.send(authStatus);
  }
  else
    res.send(authStatus);
});

app.post('/signup', function (req, res) {
  const person = {
    email: req.body.email,
    password: req.body.password
  };

  let registerStatus = {
    userExist: false
  }

  const users = getUsers();
  console.log(users)
  if (users.length > 0) {
    let user = findUser(person, users);

    if (user !== undefined) {
      registerStatus.userExist = true;
    }

    res.send(registerStatus);
  }
  else
    res.send(registerStatus);
});





