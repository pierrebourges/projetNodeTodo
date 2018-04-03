const express = require('express');
const router = express.Router();
const pug = require('pug');
const Users = require("../BDD/users");
const app = express();
const bcrypt = require('bcrypt');

app.set('views', './views')
app.set('view engine', 'pug')

router.post('/', (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function(err, hash) {
    Users.sync({force:false}).then(() => {
      Users.create({
        pseudo: req.body.pseudo,
        password: hash,
        createdAt: new Date()
      })
    }).then(
      res.redirect('/users')
    )
  });

})

router.get('/add', (req, res, next) => {
  res.render('addUser')
})

router.get('/', (req, res, next) => {
  Users.findAll().then(result => {
    res.render('indexUser', {
      users: result,
    })
    //res.json(result)
  })
})

router.get('/:userId', (req, res, next) => {
  Users.find({
    where: {
      id: req.params.userId
    }
  }).then(result=> {
    res.render('user', {
      user: result,
    })
    //res.json(result)
  })
})

router.get('/', (req, res, next) => {
  Users.findAll().then(result => {
    res.render('index', {
      users: result,
    })
    //res.json(result)
  })
})

router.delete('/:userId', (req, res, next) => {
  Users.destroy({
    where: {
      id: req.params.userId
    }
  }).then(
    res.redirect('/users')
  )
})

router.patch('/:userId', (req, res, next) => {
  Users.update(
    {
      pseudo: req.body.pseudo,
      password: req.body.password,
      updatedAt: new Date()
    },
    {where: {
      id: req.params.userId
    }}
  ).then(
    res.redirect('/users')
  )
})

router.get('/:userId/edit', (req, res, next) => {
  Users.find({
    where: {
      id: req.params.userId
    }
  }).then(result=> {
    res.render('editUser', {
      user: result,
    })
    //res.json(result)
  })
})

module.exports = router;