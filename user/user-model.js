const db = require('../data/dbConfig.js');

module.exports = {
    add,
    find,
    findBy,
    findById
}

function add(body) {
    return db('user')
    .insert(body)
}

function find() {
    return db('user')
    .select('id','username','password')
}

function findBy(filter) {
    return db('user')
    .where(filter)
}

function findById(id) {
    return db('user')
    .where({ id })
    .first()
}