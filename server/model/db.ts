///<reference path='../def/q.d.ts'/>

// Contains some functions to help run rethinkdb queries and interface with express

import q = module('q')
import r = module('rethinkdb')

export class Db {

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

    // I can't subtype my stuff anyway
    // hmm, this should NOT be allowed for a selection
    // I want to accept anything EXCEPT a cursor. I want to freak out
    // because you're going to hit it again :)
    run(exp:r.ImmediateOperation) {
        console.log("WAHOO", exp)
        var def = q.defer()
        exp.run(this.conn, function(err:Error, stuff:any) {
          console.log("DONE", err, stuff)
          if (err) def.reject(err)
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
            this.conn = conn;
            r.dbCreate(dbname).run(this.conn, (err:Error, result:r.AdminResult) => {
              // ignore error (It's probably an already created error)
              conn.use(dbname)
              cb()
            })
        })
    }

    // contains(propertyName:string) {
    //   return function(item:r.IObjectProxy) {
    //     return item.contains(propertyName)
    //   }
    // }

    // property(propertyName:string) {
    //   return function(item:r.IObjectProxy) {
    //     return item(propertyName)
    //   }
    // }


}

