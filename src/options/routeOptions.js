const exampleRoutes = require('../routes/example')
const authRoutes = require('../routes/auth')
function routeOptions(app) {
    app.use('/example', exampleRoutes)
    app.use('/auth', authRoutes)
}

module.exports = routeOptions