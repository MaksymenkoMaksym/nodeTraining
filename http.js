import http from 'http'

// const http = require('http')

const PORT = '9292'
const hostname = '127.0.0.1'
const requestHandler = (request, response) => {
  response.writeHead(200, { 'Content-Type': 'text/html' })
  response.end('Hello world')
}
const requestHandler2 = (request, response) => {
  if (request.url === '/home') {
    response.writeHead(200, { 'Content-Type': 'text/json' })
    return response.end('{"url":"/home"}')
  }
  response.writeHead(200, { 'Content-Type': 'text/json' })
  return response.end('{"url":"other"}')
}
const server = http.createServer(requestHandler2)

server.listen(PORT, hostname, (err) => {
  if (err) {
    return console.error(err)
  }

  console.log(`Server listening on port ${PORT}`)
})

// const http = require('http')
// import http from 'http'
// const hostname = '127.0.0.1'
// const port = 3000
// const server = http.createServer((req, res) => {
//   res.statusCode = 200
//   res.setHeader('Content-Type', 'text/plain')
//   res.end('Hello World\n')
// })
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`)
// })
