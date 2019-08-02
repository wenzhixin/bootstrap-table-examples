const express = require('express')
const app = express()

app.get('/examples/:project/:func', require('./examples'))
app.post('/examples/:project/:func', require('./examples'))

const server = app.listen(3000, () => {

  const host = server.address().address
  const port = server.address().port

  console.log('Examples app listening at http://%s:%s', host, port)
})
