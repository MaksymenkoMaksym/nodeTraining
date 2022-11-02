import http from 'http'
import fs from 'fs/promises'
import url from 'url'
import path from 'path'

const contentType = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.png': 'image/png',
}
const PORT = '9292'
const hostname = '127.0.0.1'
// const requestHandler =
const server = http.createServer(async (req, res) => {
  //   console.log(req)
  const { pathname } = url.parse(req.url)
  let filename = pathname.substring(1)
  if (pathname === '/') {
    filename = 'index.html'
  }
  const type = contentType[path.extname(filename)]
  res.writeHead(200, { 'Content-Type': type })
  if (type.includes('image')) {
    const img = await fs.readFile(filename)
    res.write(img, 'hex')
  } else {
    const content = await fs.readFile(filename, 'utf8')
    res.write(content)
  }
  return res.end()
})

server.listen(PORT, hostname, (err) => {
  if (err) {
    return console.error(err)
  }

  console.log(`Server listening on port ${PORT}`)
})
