import express from 'express'
import examples from './examples.js'

const app = express()

app.get('/examples/:project/:func', examples)
app.post('/examples/:project/:func', examples)

const server = app.listen(3000, () => {

  const host = server.address().address
  const port = server.address().port

  console.log('Examples app listening at http://%s:%s', host, port)
})
