const express = require('express')
const ProjectsService = require('./projects-service')
const { requireAuth } = require('../middleware/jwt-auth')

const projectsRouter = express.Router()
const bodyParser = express.json()


projectsRouter
    .route('/')
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        ProjectsService.getAllProjects(knexInstance)
            .then(projects => {
                res.send(projects)
            })
            .catch(next)
    })
    .post(requireAuth, bodyParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        const { name, url, description, user_id } = req.body
        const newProject = { name, url, description, user_id }

        for(const [key, value] of Object.entries(newProject))
            if(value == null)
                return res.status(400).json({
                    error: `missing ${key}`
                })
        ProjectsService.postProject(knexInstance, newProject)
            .then(project => {
                res.status(201).json(project)
            })
            .catch(next)
    })

projectsRouter
    .route('/:id')
    .all((req, res, next) => {
        const knexInstance = req.app.get('db')
        const id = req.params.id
        ProjectsService.getProjectById(knexInstance, id)
            .then(project => {
                if(!project){
                    return res.status(404).json({
                        error: 'not found'
                    })
                }
                res.project = project
                next()
            })
            .catch(next)
    })
    .get((req, res, next) => {
        res.send(res.project)
    })
    .patch(requireAuth, bodyParser, (req, res, next) => {
        const knexInstance = req.app.get('db')
        const id = req.params.id
        const { name, url, user_id } = req.body
        const updatedProject = { name, url }

        for(const [key, num] of Object.entries(updatedProject))
            if(num == 0)
                return res.status(400).json({
                    error: 'need content'
                })
            updatedProject.user_id = user_id
        ProjectsService.updateProject(knexInstance, id, updatedProject)
            .then(project => {
                res.status(201).end()
            })
            .catch(next)

    })
    .delete(requireAuth, (req, res, next) => {
        const knexInstance = req.app.get('db')
        const id = req.params.id
        ProjectsService.deleteProject(knexInstance, id)
            .then(account => {
                res.status(204).end()
            })
            .catch(next)
    })



module.exports = projectsRouter