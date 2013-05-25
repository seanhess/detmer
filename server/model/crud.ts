
// Simple crud stuff

import r = module('rethinkdb')

export class Crud {
    constructor(private table:r.Table) {}

    all():r.Selection {
        return this.table
    }

    add(client:any) {
        return clients.insert(client)
    }
}