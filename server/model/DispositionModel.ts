import r = module('rethinkdb')
import types = module('../types')
import rc = module('./RethinkConnection')
import q = module('q')

// I should make a crud thing
var dispositions = r.table('dispositions')
var clientIdIndex = {index:'clientId'}

export function init(connection:rc.Main) {
    console.log("init DispositionModel")
    function run(q) { return connection.run(q) }
    return run(connection.db.tableCreate('dispositions'))
    .fin(() => run(dispositions.indexCreate('clientId')))
    .fin(() => true) // ignore the error
}

export function byClient(clientId:string) {
    return dispositions
    .getAll(clientId, clientIdIndex)
    .orderBy('clientId')
}

export function addToClient(clientId:string, disposition:types.Disposition) {
    disposition.clientId = clientId
    disposition.created = (new Date()).toISOString()
    return dispositions.insert(disposition)
}