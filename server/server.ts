///<reference path='def/DefinitelyTyped/node/node.d.ts' />
///<reference path='def/express.d.ts'/>
///<reference path='def/rethinkdb.d.ts'/>

var PORT = process.env.PORT || 3000
import r = module('rethinkdb')
import exp = module('express')
import http = module('http')
import types = module('types')
var stylus = require('stylus')
var nib = require('nib')
var connect = require('connect')
var path = require('path')
var basicAuth = require('connect-basic-auth')

import serialize = module('routing/serialize')
var result = serialize.result
var code = serialize.code
var ok = serialize.ok

import dbm = module('model/db')

// import Book = module('model/Book')
import Clients = module('model/ClientsModel')

var browserify = require('browserify-middleware')

var db = new dbm.Db();
export var app:exp.ServerApplication = exp()

function initTables() {
  db.run(Clients.init(db.db)) // ignore the result
  // connected!
  // CONFIG / set up tables, etc
  // conn.run(Book.init(db), ignoreError)
  // conn.run(File.init(db), ignoreError)
}

// app.configure("test", () => {
//   console.log("TEST")
//   connectdb('test')
// })

app.configure("development", () => {
  console.log("DEVELOPMENT")
  app.use(stylus.middleware({
    src: '../public',
    compile: (str, path) => {
      return stylus(str).use(nib()).import('nib').set('filename', path)
    }
  }))
  db.connect('detmer', initTables)
})

app.configure("production", () => {
  console.log("PRODUCTION")
  db.connect('detmer', initTables)
})

// app.configure(() => {})

app.use(connect.static(__dirname + '/../public'))
app.use(connect.cookieParser())
app.use(connect.multipart())
app.use(connect.bodyParser())
app.use(connect.session({secret: 'funky monkey', key: 'blah', store:new connect.session.MemoryStore()}))


/// ARCHITECTURE ////////////////////
// controller: takes several params, returns a promise. Just in this file until bigger
// router: maps routes to controllers and controller output to browser
// model: data stuff. tends to return a rethinkdb expression so they can be composed

/// JAVASCRIPT ///////////////////////
// concatenates all the javascript into a single file, based on CommonJS requires
app.get('/main.js', browserify('../public/app.js'))

/// CLIENTS //////////////////////////
app.get('/api/clients', result(function() {
  return db.run(Clients.all())
}))

app.post('/api/clients', ok(function(params:Object, client:types.Client) {
  return db.run(Clients.add(client))
}))




/// GENRES ////////////////////////////

// app.get('/genres', function(req, res) {
//   Book.getDistinctGenres()
//   .then(send(res), err(res))
// })

// app.get('/genres/:name/books', function(req, res) {
//   db.collect(Book.byGenre(req.params.name))
//   .then(send(res), err(res))
// })



/// AUTHORS ////////////////////////////

// app.get('/authors', function(req, res) {
//   //db.collect(Book.distinctAuthors())
//   Book.getDistinctAuthors()
//   .then(send(res), err(res))
// })

// app.get('/authors/:authorName/books', function(req, res) {
//   Book.getByAuthor(req.params.authorName)
//   .then(send(res), err(res))
// })



/// APP ///////////////////////////////////////////

app.get('/info', function(req, res) {
    res.send("Detmer v1")
})

// Send the Angular app for everything under /admin
// Be careful not to accidentally send it for 404 javascript files, or data routes
app.get(/\/[\w\/\-]*$/, function(req, res) {
  res.sendfile(path.join(__dirname, '..', 'public', 'app.html'))
})


if (module == (<any>require).main) {
  var server = http.createServer(app)
  server.listen(PORT, () => {
    console.log("RUNNING " + PORT)
  })
}
