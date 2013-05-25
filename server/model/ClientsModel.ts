
import r = module('rethinkdb')
import types = module('../types')

// I should make a crud thing
var clients = r.table('clients')

export function init(db:r.Db) {
  return db.tableCreate('clients')
}

export function all() {
    return clients
}

export function add(client:types.Client) {
    return clients.insert(client)
}