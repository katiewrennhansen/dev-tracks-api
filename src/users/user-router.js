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

// usersRouter
//     .route('/:id')
    
module.exports = usersRouter;