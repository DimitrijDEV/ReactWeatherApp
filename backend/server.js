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

const getCities = () => {
  const fileContent = fs.readFileSync('./database/Cities.json');
  const citiesArr = JSON.parse(fileContent);
  return citiesArr;
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

    return true;
  } else
    return false;
}

const checkCity = (cityID, cities) => {

  for (let i = 0; i < cities.length; i++) {
    if (cities[i].id === cityID)
      return true;
  }
  return false
}

app.get('/cities', function (req, res) {

  const cities = getCities();

  let newArr = [];

  for (let i = 0; i < cities.length; i++) {
    newArr.push({
      id: cities[i].id,
      name: cities[i].name,
      lon: cities[i].coord.lon,
      lat: cities[i].coord.lat
    })
  }

  res.send(newArr);
})

app.post('/add-city', function (req, res) {

  const { cityID, cityName, userID, password } = req.body, users = getUsers();
  let cities = []

  if (users.length > 0) {

    for (let i = 0; i < users.length; i++) {
      if (users[i].id === userID && users[i].password === password) {
        const cityExist = checkCity(cityID, users[i].cities);

        if (cityExist === false)
          users[i].cities.push({ 
            id: cityID, 
            name: cityName
          });

        cities = users[i].cities;
        break;
      }
    }

    let data = JSON.stringify({ users: users });
    fs.writeFileSync('./database/Users.json', data);

    res.send(cities);
  }
});

app.post('/remove-city', function (req, res) {

  const { cityID, userID, password } = req.body, users = getUsers();
  let cities = [];

  if (users.length > 0) {
    for (let i = 0; i < users.length; i++) {

      if (users[i].id === userID && users[i].password === password) {
        users[i].cities = users[i].cities.filter(city => city.id !== cityID);
        cities = users[i].cities;
        break;
      }
    }

    let data = JSON.stringify({ users: users });
    fs.writeFileSync('./database/Users.json', data);

    res.send(cities)
  }
});


app.post('/login', function (req, res) {

  const users = getUsers();

  const person = {
    email: req.body.email,
    password: req.body.password
  };

  let authStatus = {
    id: "",
    username: "",
    password: "",
    cities: [],
    userExist: false,
    passwordCorrect: false
  }

  if (users.length > 0) {
    let user = findUser(person, users);

    if (user !== undefined) {
      authStatus.userExist = true;
      if (user.password === person.password) {
        authStatus.id = user.id;
        authStatus.username = user.username;
        authStatus.password = user.password;
        authStatus.cities = user.cities;
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
    password: req.body.password,
    cities: []
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





