const SomeFunc = (a, b) => {
  return a + b
}
global.foo = 3

const info = (msg) => {
  console.log(`Info: ${msg}`)
}

const log = (msg) => {
  console.log(`Log: ${msg}`)
}
const reqFunc = () => {
  console.log(__dirname)
  console.log(__filename)
}

module.exports = {
  info,
  log,
  SomeFunc,
}
