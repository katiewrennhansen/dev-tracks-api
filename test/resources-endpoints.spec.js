const app = require('../src/app')
const knex = require('knex')
const helpers = require('./test-helpers')


describe('All Resources Endoints', () => {
    let db;

    const { testResources } = helpers.makeResourcesArray()

    before('make knex instance', () =>{
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('cleanup db', () => helpers.cleanTables(db))

    afterEach('cleanup db', () => helpers.cleanTables(db))

    describe('/api/resources', () => {
        context('given there are no resources', () => {
            it('responds with 200 and empty list', () => {
                return supertest(app)
                    .get('/api/resources')
                    .expect(200, [])
            })
        })

        context('given there are resources in the db', () => {
            beforeEach('insert resources into the db', () => {
                helpers.seedTables(db, testResources)
            })

            it('GET /api/resources responds with 200 and all resources', () => {
                return supertest(app)
                    .get('/api/resources')
                    .expect(200, testResources)
            })
            it('POST /api/resources responds with 201 and created resource', () => {
                const newResource = {
                    name: "Healthy Plate",
                    type: "Project",
                    status: "Completed",
                    url: "https://www.thinkful.com/learn/",
                    description: "This articles summarizes the importance of Design Systems in a complex application",
                    date_completed: null,
                    user_id: null
                }
                return supertest(app)
                    .post('/api/resources')
                    .send(newResource)
                    .expect(201)
            })
        }) 
    })

    describe('api/resources/id', () => {
        it('GET /api/resource/:id responds 404 when resource is not found', () => {
            const id = 40001
            return supertest(app)
                .get(`/api/resources/${id}`)
                .expect(404, {
                    error: {
                        message: "resource doesn't exist"
                    }
                })
        })
    })


})