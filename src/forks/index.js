const app = require('express')()

// single process
const { prime } = require('./prime')

// fork, childprocess
const { fork } = require('child_process')

// single process endpoint
app.use('/prime', (req, res) => {
  const number = Number(req.query.number)
  res.json(prime(number))
})

// childprocess endpoint
app.use('/primeFork', (req, res) => {
  const number = Number(req.query.number)
  const childprocess = fork('./primeFork')
  childprocess.send({ number })
  childprocess.on('message', (msg) => res.json(msg))
})

app.listen(8080, () => {
  console.log('Listening on port 8080')
  console.log('The endpoint is \'http://localhost:8080/prime\' and \'http://localhost:8080/primeprimeFork\'')
  console.log('')
  console.log('Try with this \'http://localhost:8080/prime?number=7\' or \'http://localhost:8080/primeprimeFork?number=7\'')
})
