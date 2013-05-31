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

export function get(id:string) {
    return clients.get(id)
}

export function save(client:types.Client) {
    return get(client.id).update(client)
}

export function add(client:types.Client) {
    return clients.insert(client)
}

export function remove(id:string) {
    return get(id).delete()
}

export function idObject(result:r.WriteResult):Object {
  return {id: result.generated_keys[0]}
}
