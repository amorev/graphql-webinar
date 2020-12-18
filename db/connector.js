const client = require('../connection')

let number = 1;
function makeQuery (q, params) {
  console.log(number++ + ' -- making query -- ' + q)
  return client.query(q, params)
}

module.exports = {
  getPersons () {
    return makeQuery('SELECT * from person')
      .then(res => res.rows)
  },
  getChildren (parent_id) {
    return makeQuery('SELECT * from person where $1 in (mother_id, father_id)', [parent_id])
      .then(res => res.rows)
  },
  getPersonById (id) {
    return makeQuery('SELECT * from person where id=$1', [id])
      .then(res => res.rows[0])
  },
  getCityById (cityId) {
    return makeQuery('SELECT * from city where id=$1', [cityId])
      .then(res => res.rows[0])
  },
  getCitiesByIds (ids) {
    return makeQuery('SELECT * from city where id in (' + ids.join(',') + ')' )
      .then(res => res.rows)
  }
}
