import exp = module('express')

// TODO validation
export function send(res:exp.ServerResponse) {
  return function(value:any) {
    if (value) res.json(value)
    else res.send(404)
  }
}

export function code(res:exp.ServerResponse, code:number) {
  return function() {
    res.send(code)
  }
}

export function ok(res:exp.ServerResponse) {
  return function() {
    res.send(200)
  }
}

export function err(res:exp.ServerResponse) {
  return function(err:Error) {
    res.send(500, err.message)
  }
}