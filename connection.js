const { Client } = require('pg')

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'GQL_Lesson',
  password: 'S3RooTPass123',
  port: 5432,
})
client.connect()


module.exports = client

