const app = require('../src/app')


describe('App', () => {
    it('GET / responds with 200 and DevTracks Welcome message', () => {
        return supertest(app)
            .get('/')
            .expect(200, 'Welcome to the DevTracks API!')
    })
})
