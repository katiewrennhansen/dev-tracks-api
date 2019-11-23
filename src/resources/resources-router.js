const express = require('express')
const ResourcesService = require('./resource-service')
const { requireAuth } = require('../middleware/jwt-auth')

const resourcesRouter = express.Router()
const bodyParser = express.json()


resourcesRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        ResourcesService.getAllResources(knexInstance)
            .then(resources => {
                res.send(resources)
            }).catch(next)
    })
    .post(requireAuth, bodyParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        const { name, type, status, url, description, user_id, date_completed } = req.body
        const newResource = { name, type, status, url, description }

        for (const [key, value] of Object.entries(newResource))
            if (value == null)
            return res.status(400).json({
                error: { message: `Missing '${key}' in request body` }
            })
        
        newResource.date_completed = date_completed
        newResource.user_id = user_id

        ResourcesService.postResource(knexInstance, newResource)
            .then(resource => {
                res.status(201).send(newResource)
            })
            .catch(next)
    })

resourcesRouter
    .route('/:id')
    .all((req, res, next) => {
        const knexInstance = req.app.get('db')
        const id = req.params.id
        ResourcesService.getResourceById(knexInstance, id)
            .then(resource => {
                if(!resource) {
                    return res.status(404).json({
                        error: { message: "resource doesn't exist" }
                    })
                }
                res.resource = resource
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.json(res.resource)
    })
    .patch(requireAuth, bodyParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        const id = req.params.id
        const { name, type, status, url, description, user_id, date_completed } = req.body
        const updatedResource = { name, type, status, url, description, user_id, date_completed }

        for (const [key, num] of Object.entries(updatedResource))
            if (num == 0)
            return res.status(400).json({
                error: { message: `Body must contain updated content` }
            })
        
        ResourcesService.updateResource(knexInstance, id, updatedResource)
            .then(resource => {
                res.status(204).end()
            })
            .catch(next)
    })
    .delete(requireAuth, (req, res, next) => {
        const knexInstance = req.app.get('db')
        const id = req.params.id
        ResourcesService.deleteResource(knexInstance, id)
            .then(resource => {
                res.status(201).end()
            })
            .catch(next)
    })



module.exports = resourcesRouter;