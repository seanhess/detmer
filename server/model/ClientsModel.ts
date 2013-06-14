import r = module('rethinkdb')
import types = module('../types')
import rc = module('./RethinkConnection')
import q = module('q')

// I should make a crud thing
var clients = r.table('clients')

export function init(connection:rc.Main) {
    console.log("init ClientsModel")
    function run(q) { return connection.run(q) }
    return run(connection.db.tableCreate('clients'))
    // .fin(() => run(dispositions.indexCreate('clientId')))
    .fin(() => true) // ignore the error
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
