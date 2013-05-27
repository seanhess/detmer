import exp = module('express')
import q = module('q')

export interface ControllerAction {
  (params?:Object, body?:Object):q.IPromise;
}

// TODO validation
function sendResult(res:exp.ServerResponse) {
  return function(value:any) {
    if (value) res.json(value)
    else res.send(404)
  }
}

function sendCode(res:exp.ServerResponse, code:number) {
  return function() {
    res.send(code)
  }
}

function handleError(res:exp.ServerResponse) {
  return function(err:Error) {
    res.send(500, err.message)
  }
}

// checks the result, returning 200 + object on success, 404 if null, or error
export function result(action:ControllerAction) {
  return function(req:exp.ServerRequest, res:exp.ServerResponse) {
    action(req.params, req.body)
    .then(sendResult(res), handleError(res))
  }
}

// ignores the result and sends a 200 when the promise resolves
export function ok(action) {
  return function(req:exp.ServerRequest, res:exp.ServerResponse) {
    action(req.params, req.body)
    .then(sendCode(res, 200), handleError(res))
  }
}

export function code(statusCode:number, action) {
  return function(req:exp.ServerRequest, res:exp.ServerResponse) {
    action(req.params, req.body)
    .then(sendCode(res, statusCode), handleError(res))
  }
}