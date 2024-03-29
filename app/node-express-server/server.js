const
    express = require('express'),
    app = express()

// create routes 
app.get('/', (request, response) => {
    response.send('Hello World')
})

app.get('/json', (request, response) => {
    response.send({ hello: 'world'})
})

app.listen(8080, () => {
    console.log(`Server is running on {http://localhost:8080/}`)
})