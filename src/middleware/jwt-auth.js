const AuthService = require('../auth/auth-service')


function requireAuth(req, res, next){
    const authToken = req.get('Authorization') || ''
    const knexInstance = req.app.get('db')

    let bearerToken
    if(!authToken.toLowerCase().startsWith('bearer ')){
        return res.status(401).json({ error: 'unauthorized'})
    } else {
        bearerToken = authToken.slice(7, authToken.length)
    }
    try {
        const payload = AuthService.verifyJwt(bearerToken)
        AuthService.getUserName(knexInstance, payload.sub)
            .then(user => {
                if(!user)
                    return res.status(401).json({ error: 'unauthorized' })
                req.user = user
                next()
            })
    } catch(error){
        return res.status(401).json({ error: 'unauthorized' })
    }
}

module.exports = {
    requireAuth,
}