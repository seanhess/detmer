
declare module "rethinkdb" {

  export function connect(host:IHost, cb:OnConnect);
  export function dbCreate(name:string):AdminOperation;
  export function dbDrop(name:string):AdminOperation;
  export function dbList():NamesOperation;

  export function db(name:string):Db;
  export function table(name:string):Table;

  export function asc(property:string):Sort;
  export function desc(property:string):Sort;

  export var count:Aggregator;
  export function sum(prop:string):Aggregator;
  export function avg(prop:string):Aggregator;

  export function row(name:string):ObjectExpression;
  export function expr(stuff:any):ObjectExpression;

  declare class Cursor {
    hasNext():bool;
    each(cb:(err:Error, row:Object) => void);
    next(cb:(err:Error, row:Object) => void);
    toArray(cb:(err:Error, rows:Object[]) => void);
  }

  // AGGREGATORS

  interface IHost {
    host:string;
    port:number;
    db?:string;
  }

  interface OnConnect {
    (err:Error, conn:Connection);
  }

  interface Connection {
    close();
    reconnect(cb:OnConnect);
    use(dbName:string);
  }

  interface Db {
    tableCreate(name:string, options?:TableOptions):AdminOperation;
    tableDrop(name:string):AdminOperation;
    tableList():NamesOperation;
    table(name:string, options?:GetTableOptions):Table;
  }

  interface TableOptions {
    primaryKey?:string;
    hardDurability?:bool;
    cacheSize?:number;
    datacenter?:string;
  }

  interface GetTableOptions {
    useOutdated: bool;
  }

  interface Table extends Selection {
    indexCreate(name:string, index?:AnyExpressionFunction):AdminOperation;
    indexDrop(name:string):AdminOperation;
    indexList():NamesOperation;

    insert(obj:Object, options?:InsertOptions):WriteOperation;
    insert(obj:Object[], options?:InsertOptions):WriteOperation;

    get(key:string):ObjectExpression; // primary key
    getAll(key:string, index?:Index):Selection; // without index defaults to primary key
  }

  // selections return a cursor on run, not the other stuff (I'm guessing)
  // TODO: if you run a get, does it give you a cursor?
  interface Selection extends Sequence, CursorOperation {
    between(lower:any, upper:any, index?:Index):Selection;
    filter(obj:Object):Selection;
    filter(rql:ObjectExpression):Selection;
    filter(rql:Predicate):Selection;

    update(obj:Object, options?:UpdateOptions):WriteOperation;
    replace(obj:Object, options?:UpdateOptions):WriteOperation;
    replace(expr:AnyExpressionFunction):WriteOperation;
    delete():WriteOperation;
  }

  // a table, or a filter result
  interface Sequence {

    // Join
    innerJoin(sequence:Sequence, join:Predicate):Sequence;
    outerJoin(sequence:Sequence, join:Predicate):Sequence;
    eqJoin(leftAttribute:string, rightSequence:Sequence, index?:Index):Sequence;
    eqJoin(leftAttribute:string, join:Predicate, index?:Index):Sequence;
    zip():Sequence; // not really sure what this does

    // Transform
    map(transform:AnyExpressionFunction):Sequence;
    concatMap(transform:AnyExpressionFunction):Sequence;
    orderBy(...keys:string[]):Sequence;
    orderBy(...sorts:Sort[]):Sequence;
    skip(n:number):Sequence;
    limit(n:number):Sequence;
    slice(start:number, end?:number):Sequence;
    nth(n:number):ObjectExpression;
    union(sequence:Sequence):Sequence; // concatenates two sequences

    // Aggregate
    reduce(r:Reduce, base?:any):ObjectExpression; // makes a single value
    count():NumberExpression; // number query!
    distinct():Sequence;
    groupedMapReduce(group:ObjectExpressionFunction, map:AnyExpressionFunction, reduce:Reduce, base?:any):ObjectExpression;
    groupBy(...aggregators:Aggregator[]):ObjectExpression; // TODO: reduction object

    // Manipulation
    pluck(...props:string[]):Sequence;
    without(...props:string[]):Sequence;
  }



  // takes an ObjectExpression and returns another
  interface AnyExpressionFunction {
    (doc:ObjectExpression):any; 
  }

  interface ObjectExpressionFunction {
    // MUST return an object
    (doc:ObjectExpression):ObjectExpression; 
  }

  // will it scream at me for this?
  interface Predicate {
    (doc:ObjectExpression, doc2?:ObjectExpression):BoolExpression; 
    (doc:ObjectExpression, doc2?:ObjectExpression):bool; 
  }

  interface Reduce {
    // TODO, acc should be more specific than that
    (acc:any, val:any):any; // return acc.add(val) 
  }

  interface InsertOptions {
    upsert: bool;
  }

  interface UpdateOptions {
    nonAtomic: bool;
  }

  interface AdminResult {
    created?: number;
    dropped?: number;
  }

  interface WriteResult {
    inserted: number;
    replaced: number;
    unchanged: number;
    errors: number;
    deleted: number;
    skipped: number;
    first_error: Error;
    generated_keys: string[]; // only for insert
  }

  interface Index {
    index: string;
  }

  interface IErrorCb {
    (err:Error, data?:any);
  }



  interface Expression {}

  // These do return immediately
  // but the others return
  interface BoolExpression extends Expression {
    run(conn:Connection, cb:(err:Error, value:bool) => void);

    and(b:bool):BoolExpression;
    or(b:bool):BoolExpression;
    eq(v:any):BoolExpression;
    ne(v:any):BoolExpression;
    not():BoolExpression;
  }

  interface ValueExpression extends Expression {
    gt(value:any):BoolExpression;
    ge(value:any):BoolExpression;
    lt(value:any):BoolExpression;
    le(value:any):BoolExpression;
  }

  interface NumberExpression extends ValueExpression {
    run(conn:Connection, cb:(err:Error, num:number) => void);

    add(n:number):NumberExpression;
    sub(n:number):NumberExpression;
    mul(n:number):NumberExpression;
    div(n:number):NumberExpression;
    mod(n:number):NumberExpression;
  }

  interface ObjectExpression extends ValueExpression {
    run(conn:Connection, cb:(err:Error, obj:Object) => void);

    (prop:string):ObjectExpression;
    merge(query:ObjectExpression):ObjectExpression;
    append(prop:string):ObjectExpression; // returns another query object with them appended. Would only work on an array
    contains(prop:string):BoolExpression;
  }

  interface AnyOperation {
    run(conn:Connection, cb:(err:Error, result:any) => void);
  }

  interface WriteOperation {
    run(conn:Connection, cb:(err:Error, result:WriteResult) => void);
  }

  interface AdminOperation {
    run(conn:Connection, cb:(err:Error, result:AdminResult) => void);
  }

  interface CursorOperation {
    run(conn:Connection, cb:(err:Error, cursor:Cursor) => void);
  }

  interface NamesOperation {
    run(conn:Connection, cb:(err:Error, names:string[]) => void);
  }


  interface Aggregator {}
  interface Sort {}


  // http://www.rethinkdb.com/api/#js
  // TODO control structures
}
