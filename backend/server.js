const express = require('express')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')

const sequelize = new Sequelize('locations', 'root', '', {
  dialect: 'mysql',
  define: {
    timestamps: false
  }
})

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  password: Sequelize.STRING
}, {
  underscored: true
})

const Location = sequelize.define('location', {
  name: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false
  }
},{
  underscored: true
})

User.hasMany(Location)

const app = express()
app.use(bodyParser.json())


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static('../frontend/build'))


app.get('/create', (req, res, next) => {
  sequelize.sync({force: true})
      .then(() => res.status(201).send('created'))
      .catch((error) => next(error))
})

app.get('/users', (req, res, next) => {
  User.findAll()
      .then((user) => res.status(200).json(user))
      .catch((error) => next(error))
})

app.post('/users', (req, res, next) => {
  User.create(req.body)
      .then(() => res.status(201).send('created'))
      .catch((error, msg) => {
        next(error, msg)

      })
})

app.get('/users/:id', (req, res, next) => {
  User.findById(req.params.id)
      .then((user) => {
        if (user) {
          res.status(200).json(user)
        }
        else {
          res.status(404).send('not found')
        }
      })
      .catch((error) => next(error))
})

app.put('/users/:id', (req, res, next) => {
  User.findById(req.params.id)
      .then((user) => {
        if (user) {
          return user.update(req.body)
        }
        else {
          res.status(404).send('not found')
        }
      })
      .then(() => {
        if (!res.headersSent) {
          res.status(201).send('modified')
        }
      })
      .catch((error) => next(error))
})

app.delete('/users/:id', (req, res, next) => {
  User.findById(req.params.id)
      .then((user) => {
        if (user) {
          return user.destroy()
        }
        else {
          res.status(404).send('not found')
        }
      })
      .then(() => {
        if (!res.headersSent) {
          res.status(201).send('modified')
        }
      })
      .catch((error) => next(error))
})

app.get('/users/:uid/location', (req, res, next) => {
  User.findById(req.params.uid)
      .then((user) => {
        if (user) {
          return user.getLocations()
        }
        else {
          res.status(404).send('not found')
        }
      })
      .then((location) => {
        if (!res.headersSent) {
          res.status(200).json(location)
        }
      })
      .catch((err) => next(err))
})

app.post('/users/:uid/location', (req, res, next) => {
  User.findById(req.params.uid)
      .then((user) => {
        if (user) {
          let location = req.body
          location.user_id = user.id
        return Location.create(location)
        }
        else {
          res.status(404).send('not found')
        }
      })
      .then(() => {
        if (!res.headersSent) {
          res.status(201).send('created')
        }
      })
      .catch((err) => next(err))
})

app.get('/users/:uid/location/:lid', (req, res, next) => {
  Location.findById(req.params.lid)
      .then((location) => {
        if (location) {
          res.status(200).json(location)
        }
        else {
          res.status(404).send('not found')
        }
      })
      .catch((err) => next(err))
})

app.put('/users/:uid/location/:lid', (req, res, next) => {
  Location.findById(req.params.id)
      .then((location) => {
        if (location) {
          return location.update(req.body)
        }
        else {
          res.status(404).send('not found')
        }
      })
      .then(() => {
        if (!res.headersSent) {
          res.status(201).send('modified')
        }
      })
      .catch((err) => next(err))
})

app.delete('/users/:uid/location/:lid', (req, res, next) => {
  Location.findById(req.params.id)
      .then((location) => {
        if (location) {
          return location.destroy()
        }
        else {
          res.status(404).send('not found')
        }
      })
      .then(() => {
        if (!res.headersSent) {
          res.status(201).send('removed')
        }
      })
      .catch((err) => next(err))
})

app.use((err, req, res, next) => {
  console.warn(err)
  res.status(500).send('some error...')
})

app.listen(8080)