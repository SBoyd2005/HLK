const express = require('express')
const app = express()
const port = 3000
// Imported and set up initialization of Express, and assigned a port

app.get('/', (req, res) => res.send('Hello HLK! This is Stephen and I am testing an API.'))

//Declared a route, requested and sent a string of test data

app.listen(port, () => console.log(`We are listening on port ${port}!`))