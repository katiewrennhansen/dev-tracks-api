const express = require('express')
const AccountsService = require('./accounts-service')
const requireAuth = require('../middleware/jwt-auth')

const accountRouter = express.Router()
const bodyParser = express.json()


accountRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        AccountsService.getAllAccounts(knexInstance)
            .then(accounts => {
                res.send(accounts)
            })
            .catch(next)
    })
    .post(bodyParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        const { name, url, user_id } = req.body
        const newAccount = { name, url, user_id }

        for(const [key, value] of Object.entries(newAccount))
            if(value == null)
                return res.status(400).json({
                    error: `missing ${key}`
                })
        AccountsService.postAccount(knexInstance, newAccount)
            .then(account => {
                res.status(201).json(account)
            })
            .catch(next)
    })

accountRouter
    .route('/:id')
    .all((req, res, next) => {
        const knexInstance = req.app.get('db')
        const id = req.params.id
        AccountsService.getAccountById(knexInstance, id)
            .then(account => {
                if(!account){
                    return res.status(404).json({
                        error: 'not found'
                    })
                }
                res.account = account
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.send(res.account)
    })
    .patch(bodyParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        const id = req.params.id
        const { name, url, user_id } = req.body
        const updatedAccount = { name, url }

        for(const [key, num] of Object.entries(updatedAccount))
            if(num == 0)
                return res.status(400).json({
                    error: 'need content'
                })
            updatedAccount.user_id = user_id
        AccountsService.updateAccount(knexInstance, id, updatedAccount)
            .then(account => {
                res.status(201).end()
            })
            .catch(next)

    })
    .delete((req, res, next) => {
        const knexInstance = req.app.get('db')
        const id = req.params.id
        AccountsService.deleteAccount(knexInstance, id)
            .then(account => {
                res.status(204).end()
            })
            .catch(next)
    })



module.exports = accountRouter