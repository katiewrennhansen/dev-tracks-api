const express = require('express')
const UsersService = require('./user-service')

const usersRouter = express.Router()
const bodyParser = express.json()

usersRouter
    .route('/login')
    .post(bodyParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        const { user_name, password } = req.body 
        const loginUser = { user_name, password }

        for (const [key, value] of Object.entries(loginUser))
            if(value == null)
                return res.status(400).json({
                    error: `missing ${key} username or password`
                })

        UsersService.getUserName(knexInstance, user_name)
            .then(dbUser => {
                if(!dbUser)
                    return res.status(400).json({
                        error: 'bad un pr pw'
                    })
                if(loginUser.password !== dbUser.password)
                    return res.status(400).json({
                        error: 'bad un or pw'
                    })
                res.send(dbUser.user_name)
            })
            .catch(next)
    })

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
        
        UsersService.addUser(knexInstance, newUser)
            .then(user => {
                res.send(201).send(user.user_name)
            })
            .catch(next)
    })

module.exports = usersRouter;