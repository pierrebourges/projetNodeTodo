const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT|| 8088
const Todos = require('./BDD/todos')

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({
  extended: true
}))

app.set('views', './views')
app.set('view engine', 'pug')

app.use(methodOverride('_method'));

app.all('*', (req, res, next) => {
    next()
})

app.post('/todos', (req, res, next) => {
    Todos.sync({force:false}).then(() => {
        Todos.create({
          message: req.body.message,
          completion: false,
          createdAt: new Date()
        })
    }).then(
        res.redirect('/todos')
    )
})

app.get('/todos/add', (req, res, next) => {
  res.render('add')
})

app.get('/todos/:todoId', (req, res, next) => {
    Todos.find({
        where: {
            id: req.params.todoId
        }
    }).then(result=> {
      res.render('todo', {
        todo: result,
      })
      //res.json(result)
    })
})

app.get('/todos', (req, res, next) => {
    Todos.findAll().then(result => {
      res.render('index', {
        todos: result,
      })
      //res.json(result)
    })
})

app.delete('/todos/:todoId', (req, res, next) => {
    Todos.destroy({
      where: {
        id: req.params.todoId
      }
    }).then(
      res.redirect('/todos')
    )
})

app.patch('/todos/:todoId', (req, res, next) => {
    Todos.update(
    {
      message: req.body.message,
      completion: req.body.completion,
      updatedAt: new Date()
    },
    {where: {
      id: req.params.todoId
    }}
    ).then(
    res.redirect('/todos')
  )
})

app.get('/todos/:todoId/edit', (req, res, next) => {
  Todos.find({
    where: {
      id: req.params.todoId
    }
  }).then(result=> {
    res.render('edit', {
      todo: result,
    })
    //res.json(result)
  })
})

app.use('/users', require('./controllers/userController'));

app.listen(PORT, () => {
    console.log('Serveur sur le port : ', PORT)
})