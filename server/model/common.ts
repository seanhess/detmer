import r = module('rethinkdb')

export function idObject(result:r.WriteResult):Object {
  return {id: result.generated_keys[0]}
}