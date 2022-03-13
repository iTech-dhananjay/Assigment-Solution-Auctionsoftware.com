const {getUserIdFromSession} = require("../database/models/session");

const authValidator = async (req, res, next) => {
    const sessionToken = req.header('token')
    if (sessionToken) {
        const userId = await getUserIdFromSession(sessionToken)
        if (userId) {
            req.userId = userId
            next()
            return
        }
    }
    res.status(401).json({
        status: 'unauthorized access'
    })
}

const FourOFourHandler = (req, res, next) => {
    res.status(404).json({
        status: '404 not found'
    })
}

const internalErrorHandler = (err, req, res, next) => {
    console.error(`server error`, err)
    res.status(500).json({
        status: 'internal server error',
        error: err.message ? err.message : 'check server logs'
    })
}

module.exports = {
    authValidator,
    internalErrorHandler,
    FourOFourHandler
}