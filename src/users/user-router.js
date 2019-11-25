const express = require('express')
const UsersService = require('./user-service')

const usersRouter = express.Router()
const bodyParser = express.json()

usersRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        UsersService.getAllUsers(knexInstance)
            .then(users => {
                res.send(users)
            })
            .catch(next)
    })
    .post(bodyParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        const { user_name, full_name, password } = req.body;
        const newUser = { user_name, full_name, password }

        for(const [key, value] of Object.entries(newUser))
            if (value == null)
                return res.status(400).json({
                    error: { message: `missing ${key}` }
                })

        UsersService.hasUser(knexInstance, newUser.user_name)
            .then(user => {
                if(user)
                    return res.status(400).json({
                        error: { message: 'username taken' }
                    }) 
                
                return UsersService.hashPassword(newUser.password)
                    .then(hashedPassword => {
                        const newUser = {
                            user_name,
                            password: hashedPassword,
                            full_name,
                            date_created: 'now()',
                        }
                        return UsersService.addUser(knexInstance, newUser)
                            .then(user => {
                                res.status(201).json(user)
                            })
                })  
            }) 
            .catch(next)
    })

usersRouter
    .route('/:id')
    .all((req, res, next) => {
        const knexInstance = req.app.get('db')
        const id = req.params.id
        UsersService.getUserById(knexInstance, id)
            .then(user => {
                if(!user) {
                    res.send(404).json({
                        error: 'user does not exist'
                    })
                }
                res.user = user
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.send(res.user)
    })
    .patch(bodyParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        const id = req.params.id
        const { full_name, email, bio } = req.body
        const updatedUser = { full_name, email, bio }

        for(const [key, num] of Object.entries(updatedUser))
            if(num == 0)
                return res.status(400).json({
                    error: 'need content'
                })
        UsersService.updateUser(knexInstance, id, updatedUser)
            .then(user => {
                res.status(201).end()
            })
            .catch(next)

    })
    .delete((req, res, next) => {
        const knexInstance = req.app.get('db')
        const id = req.params.id
        UsersService.deleteUser(knexInstance, id)
            .then(user => {
                res.send(204).end()
            })
            .catch(next)
    })
    
module.exports = usersRouter;