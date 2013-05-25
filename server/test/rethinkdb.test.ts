///<reference path='../def/rethinkdb.d.ts' />
///<reference path='../def/mocha.d.ts' />
///<reference path='../def/DefinitelyTyped/node/node.d.ts' />
///<reference path='../def/underscore.d.ts' />

var assert = require('assert')
var http = require('http')
import r = module('rethinkdb')
import _ = module('underscore')


// I don't have to test the whole library, I just have to put a bunch of code in here that never runs
describe("rethinkdb", function() {

    before(function(done) {
        r.connect({host: "localhost",port: 28015, db:'test'}, (err, conn) => {
            assert.ifError(err)
            this.conn = conn
            done()
        })
    })

    it('should compile', function(done) {
        var conn = this.conn
        assert.ok(conn)

        function adminCb(err:Error, result:r.AdminResult) { done() }
        function namesCb(err:Error, names:string[]) { done() }
        function writeCb(err:Error, result:r.WriteResult) { done() }
        function objectCb(err:Error, obj:Object) { done() }
        function cursorCb(err:Error, cursor:r.Cursor) { done() }

        function neverRun() {

            // DB
            r.dbCreate("test").run(this.conn, adminCb)
            r.dbDrop("test").run(this.conn, adminCb)
            r.dbList().run(this.conn, namesCb)
            r.db("test").tableCreate("users").run(this.conn, adminCb)

            r.db("test").tableCreate("users").run(this.conn, adminCb)

            r.table('users').indexCreate('name').run(conn, adminCb)

            r.table('marvel').insert([{ superhero: 'Wolverine', superpower: 'Adamantium' }]).run(conn, writeCb)
            r.table('marvel').insert({name:"bob"}).run(conn, writeCb)

            r.table('marvel').get("a4afc84e-a6e7-4c9f-9e42-a3c4ee925843").run(conn, objectCb)
            r.table('marvel').getAll("Wolverine", {index: "superhero"}).run(conn, cursorCb)
            r.table('marvel').getAll("Wolverine").run(conn, cursorCb)

            r.table('marvel').between("a", "b", {index: "superhero"}).run(conn, cursorCb)

        }

        done()

        // TABLE
    })
})
