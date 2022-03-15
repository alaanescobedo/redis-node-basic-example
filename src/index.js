const express = require('express')
const axios = require('axios')
const responseTime = require('response-time')
const { createClient } = require('redis')

const client = createClient({
  host: 'localhost',
  port: 6379
})

const app = express()
app.use(responseTime())

app.get('/character', async (req, res) => {

  const value = await client.get(req.originalUrl)
  if (value) return res.send(JSON.parse(value))

  const { data: { results } } = await axios.get('https://rickandmortyapi.com/api/character')

  await client.set(req.originalUrl, JSON.stringify(results))
  res.send(results)
})

app.get('/character/:id', async (req, res) => {
  const { id } = req.params

  const value = await client.get(req.originalUrl)
  if (value) return res.send(JSON.parse(value))

  const { data } = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)

  await client.set(req.originalUrl, JSON.stringify(data))

  res.send(data)
})

async function main() {
  await client.connect();

  client.on('error', (err) => console.log('Redis Client Error', err));

  app.listen(3000, () => {
    console.log('Server is running on port 3000')
  })
}
main()