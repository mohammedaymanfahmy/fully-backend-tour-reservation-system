const express = require('express')
const userControllers = require('./../controllers/usersControllers')
const router = express.Router()
router.route('/')
          .get(userControllers.getAllUsers)
          .post(userControllers.createUser)
router.route('/:id')
          .get(userControllers.getUser)
          .patch(userControllers.updateUser)
          .delete(userControllers.deleteUser)


module.exports = router