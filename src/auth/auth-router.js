const express = require('express')
const AuthService = require('./auth-service')

const authRouter = express.Router()
const bodyParser = express.json()

authRouter
    .route('/')
    .post(bodyParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        const { user_name, password } = req.body 
        const loginUser = { user_name, password }

        for (const [key, value] of Object.entries(loginUser))
            if(value == null)
                return res.status(400).json({
                    error: `missing ${key} username or password`
                })

        AuthService.getUserName(knexInstance, loginUser.user_name)
            .then(dbUser => {
                if(!dbUser)
                    return res.status(400).json({
                        error: 'bad username'
                    })
                return AuthService.comparePasswords(loginUser.password, dbUser.password)
                    .then(match => {
                        if(!match)
                            return res.status(400).json({
                                error: 'password not a match'
                            })
                        const sub = dbUser.user_name
                        const payload = { user_id: dbUser.id }
                        res.send({
                            id: dbUser.id,
                            authToken: AuthService.createJwt(sub, payload)
                        })
                    })
            })
            .catch(next)
    })

module.exports = authRouter