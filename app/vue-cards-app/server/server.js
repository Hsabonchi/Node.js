/*
    Node.js server is responsible communicating with your Vue.js frontend via HTTP requests.

*/

const
    bodyParser = require('body-parser'),
    express = require('express'),
    path = require('path')

const app = express()

app.use(bodyParser.json())
// to serve static files (client folder)
app.use(express.static(path.join(__dirname, '..', '/client')))
// console.log(path.join(__dirname, '/client'));

// add routes to the server and apply prefix to each route
app.use(require('./api/routes')())

app.listen(8080, () => {
    console.log(`Server is running on 8080 http://localhost:8080/`)
})
