///<reference path='../def/q.d.ts'/>

// Contains some functions to help run rethinkdb queries and return promises
// basically turns an operation into a promise, and maintains the connection

import q = module('q')
import r = module('rethinkdb')


export class Main {

    public dbname:string;
    public db:r.Db;
    private conn:r.Connection;

    constructor() {}

    isConnected() {
      return !!this.conn
    }

    toArray(exp:r.CursorOperation) {
        var def = q.defer()
        // somethihng that has a cursor
        exp.run(this.conn, function(err:Error, cursor:r.Cursor) {
          if (err) return def.reject(err)
          cursor.toArray(function(err:Error, items:any[]) {
            if (err) def.reject(err)
            else def.resolve(items)
          })
        })
        return def.promise
    }

    run(exp:r.AnyOperation) {
        var def = q.defer()
        exp.run(this.conn, function(err:Error, stuff:any) {
            if (err) def.reject(err)
            else if (stuff && stuff.toArray) {
                stuff.toArray(function(err:Error, items:any[]) {
                    if (err) def.reject(err)
                    else def.resolve(items)
                })
            }
            else def.resolve(stuff)
        })
        return def.promise
    }

    // need to keep track of the connection somehow
    // global is ok I guess. Keep it simple!
    connect(dbname:string, cb:() => void) {
        this.dbname = dbname
        this.db = r.db(dbname)
        console.log("rethinkdb://localhost:28015/" + dbname)
        r.connect({host:'localhost', port: 28015}, (err:Error, conn) => {
            if (err) throw err // probably means it is OFF, just throw for now
            this.conn = conn;
            r.dbCreate(dbname).run(this.conn, (err:Error, result:r.AdminResult) => {
              // ignore error (It's probably an already created error)
              conn.use(dbname)
              cb()
            })
        })
    }

}

