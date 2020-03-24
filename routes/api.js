const express = require('express');
const router = express.Router();
const TodoModel = require('../models/todo');
const UserModel = require('../models/user');

router.get('/users', async (req, res, next) => {
  try {
    const users = await UserModel.find()
    res.json(
      users.map(item => {
        return {user:item.email}
      })
    )
  } catch (error) {
    return next(error);
  }
  
});

router.get('/todo', async (req, res, next) => {
   //const todos = TodoModel.find({user: req.user.id});
   //console.log(req.user)
   try {
      const todos = await TodoModel.find();
      res.json(todos)
    } catch (error) {
      return next(error);
    }
});

router.post('/todo', async (req, res, next) => {
    try {//req.body.date
        const todo = await TodoModel.create({
          todo: req.body.todo,
          user: req.body.user,
          date: new Date(),
          done: Boolean(req.body.done)
        });
        res.json(todo)
      } catch (error) {
        return next(error);
      }
});

router.put('/todo/:id', async (req, res, next) => {
  try {
    const todo = await TodoModel.findOne({ _id: req.params.id })
    if (req.body.todo) {
      todo.todo = req.body.todo
    }
    if (req.body.done) {
      todo.done = Boolean(req.body.done)
    }
    await todo.save()
    res.send(todo)
  } catch {
    res.status(404)
    res.send({ error: "Post doesn't exist!" })
  }
})

router.delete('/todo/:id', async (req, res, next) => {
  try {
    //user:req.user.email, 
      const user = await TodoModel.deleteOne({ _id: req.params.id });
      res.status(204).send({"messg":"ok"})
    } catch (error) {
      res.status(404)
      res.send({ error: "Post doesn't exist!" })
    }
});

module.exports = router;
