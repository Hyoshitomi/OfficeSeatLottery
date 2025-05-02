
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Seat
 * 
 */
export type Seat = $Result.DefaultSelection<Prisma.$SeatPayload>
/**
 * Model Table
 * 
 */
export type Table = $Result.DefaultSelection<Prisma.$TablePayload>
/**
 * Model AdjacentTable
 * 
 */
export type AdjacentTable = $Result.DefaultSelection<Prisma.$AdjacentTablePayload>
/**
 * Model TodayPosition
 * 
 */
export type TodayPosition = $Result.DefaultSelection<Prisma.$TodayPositionPayload>
/**
 * Model PastPosition
 * 
 */
export type PastPosition = $Result.DefaultSelection<Prisma.$PastPositionPayload>
/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Seats
 * const seats = await prisma.seat.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Seats
   * const seats = await prisma.seat.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.seat`: Exposes CRUD operations for the **Seat** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Seats
    * const seats = await prisma.seat.findMany()
    * ```
    */
  get seat(): Prisma.SeatDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.table`: Exposes CRUD operations for the **Table** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tables
    * const tables = await prisma.table.findMany()
    * ```
    */
  get table(): Prisma.TableDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adjacentTable`: Exposes CRUD operations for the **AdjacentTable** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdjacentTables
    * const adjacentTables = await prisma.adjacentTable.findMany()
    * ```
    */
  get adjacentTable(): Prisma.AdjacentTableDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.todayPosition`: Exposes CRUD operations for the **TodayPosition** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more TodayPositions
    * const todayPositions = await prisma.todayPosition.findMany()
    * ```
    */
  get todayPosition(): Prisma.TodayPositionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pastPosition`: Exposes CRUD operations for the **PastPosition** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PastPositions
    * const pastPositions = await prisma.pastPosition.findMany()
    * ```
    */
  get pastPosition(): Prisma.PastPositionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Seat: 'Seat',
    Table: 'Table',
    AdjacentTable: 'AdjacentTable',
    TodayPosition: 'TodayPosition',
    PastPosition: 'PastPosition',
    User: 'User'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "seat" | "table" | "adjacentTable" | "todayPosition" | "pastPosition" | "user"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Seat: {
        payload: Prisma.$SeatPayload<ExtArgs>
        fields: Prisma.SeatFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SeatFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SeatFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>
          }
          findFirst: {
            args: Prisma.SeatFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SeatFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>
          }
          findMany: {
            args: Prisma.SeatFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>[]
          }
          create: {
            args: Prisma.SeatCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>
          }
          createMany: {
            args: Prisma.SeatCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SeatCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>[]
          }
          delete: {
            args: Prisma.SeatDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>
          }
          update: {
            args: Prisma.SeatUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>
          }
          deleteMany: {
            args: Prisma.SeatDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SeatUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SeatUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>[]
          }
          upsert: {
            args: Prisma.SeatUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SeatPayload>
          }
          aggregate: {
            args: Prisma.SeatAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSeat>
          }
          groupBy: {
            args: Prisma.SeatGroupByArgs<ExtArgs>
            result: $Utils.Optional<SeatGroupByOutputType>[]
          }
          count: {
            args: Prisma.SeatCountArgs<ExtArgs>
            result: $Utils.Optional<SeatCountAggregateOutputType> | number
          }
        }
      }
      Table: {
        payload: Prisma.$TablePayload<ExtArgs>
        fields: Prisma.TableFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TableFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TableFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          findFirst: {
            args: Prisma.TableFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TableFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          findMany: {
            args: Prisma.TableFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>[]
          }
          create: {
            args: Prisma.TableCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          createMany: {
            args: Prisma.TableCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TableCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>[]
          }
          delete: {
            args: Prisma.TableDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          update: {
            args: Prisma.TableUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          deleteMany: {
            args: Prisma.TableDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TableUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TableUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>[]
          }
          upsert: {
            args: Prisma.TableUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TablePayload>
          }
          aggregate: {
            args: Prisma.TableAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTable>
          }
          groupBy: {
            args: Prisma.TableGroupByArgs<ExtArgs>
            result: $Utils.Optional<TableGroupByOutputType>[]
          }
          count: {
            args: Prisma.TableCountArgs<ExtArgs>
            result: $Utils.Optional<TableCountAggregateOutputType> | number
          }
        }
      }
      AdjacentTable: {
        payload: Prisma.$AdjacentTablePayload<ExtArgs>
        fields: Prisma.AdjacentTableFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdjacentTableFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjacentTablePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdjacentTableFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjacentTablePayload>
          }
          findFirst: {
            args: Prisma.AdjacentTableFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjacentTablePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdjacentTableFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjacentTablePayload>
          }
          findMany: {
            args: Prisma.AdjacentTableFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjacentTablePayload>[]
          }
          create: {
            args: Prisma.AdjacentTableCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjacentTablePayload>
          }
          createMany: {
            args: Prisma.AdjacentTableCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdjacentTableCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjacentTablePayload>[]
          }
          delete: {
            args: Prisma.AdjacentTableDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjacentTablePayload>
          }
          update: {
            args: Prisma.AdjacentTableUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjacentTablePayload>
          }
          deleteMany: {
            args: Prisma.AdjacentTableDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdjacentTableUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdjacentTableUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjacentTablePayload>[]
          }
          upsert: {
            args: Prisma.AdjacentTableUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdjacentTablePayload>
          }
          aggregate: {
            args: Prisma.AdjacentTableAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdjacentTable>
          }
          groupBy: {
            args: Prisma.AdjacentTableGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdjacentTableGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdjacentTableCountArgs<ExtArgs>
            result: $Utils.Optional<AdjacentTableCountAggregateOutputType> | number
          }
        }
      }
      TodayPosition: {
        payload: Prisma.$TodayPositionPayload<ExtArgs>
        fields: Prisma.TodayPositionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TodayPositionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodayPositionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TodayPositionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodayPositionPayload>
          }
          findFirst: {
            args: Prisma.TodayPositionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodayPositionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TodayPositionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodayPositionPayload>
          }
          findMany: {
            args: Prisma.TodayPositionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodayPositionPayload>[]
          }
          create: {
            args: Prisma.TodayPositionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodayPositionPayload>
          }
          createMany: {
            args: Prisma.TodayPositionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TodayPositionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodayPositionPayload>[]
          }
          delete: {
            args: Prisma.TodayPositionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodayPositionPayload>
          }
          update: {
            args: Prisma.TodayPositionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodayPositionPayload>
          }
          deleteMany: {
            args: Prisma.TodayPositionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TodayPositionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TodayPositionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodayPositionPayload>[]
          }
          upsert: {
            args: Prisma.TodayPositionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TodayPositionPayload>
          }
          aggregate: {
            args: Prisma.TodayPositionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTodayPosition>
          }
          groupBy: {
            args: Prisma.TodayPositionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TodayPositionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TodayPositionCountArgs<ExtArgs>
            result: $Utils.Optional<TodayPositionCountAggregateOutputType> | number
          }
        }
      }
      PastPosition: {
        payload: Prisma.$PastPositionPayload<ExtArgs>
        fields: Prisma.PastPositionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PastPositionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastPositionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PastPositionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastPositionPayload>
          }
          findFirst: {
            args: Prisma.PastPositionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastPositionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PastPositionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastPositionPayload>
          }
          findMany: {
            args: Prisma.PastPositionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastPositionPayload>[]
          }
          create: {
            args: Prisma.PastPositionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastPositionPayload>
          }
          createMany: {
            args: Prisma.PastPositionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PastPositionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastPositionPayload>[]
          }
          delete: {
            args: Prisma.PastPositionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastPositionPayload>
          }
          update: {
            args: Prisma.PastPositionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastPositionPayload>
          }
          deleteMany: {
            args: Prisma.PastPositionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PastPositionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PastPositionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastPositionPayload>[]
          }
          upsert: {
            args: Prisma.PastPositionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PastPositionPayload>
          }
          aggregate: {
            args: Prisma.PastPositionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePastPosition>
          }
          groupBy: {
            args: Prisma.PastPositionGroupByArgs<ExtArgs>
            result: $Utils.Optional<PastPositionGroupByOutputType>[]
          }
          count: {
            args: Prisma.PastPositionCountArgs<ExtArgs>
            result: $Utils.Optional<PastPositionCountAggregateOutputType> | number
          }
        }
      }
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    seat?: SeatOmit
    table?: TableOmit
    adjacentTable?: AdjacentTableOmit
    todayPosition?: TodayPositionOmit
    pastPosition?: PastPositionOmit
    user?: UserOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model Seat
   */

  export type AggregateSeat = {
    _count: SeatCountAggregateOutputType | null
    _avg: SeatAvgAggregateOutputType | null
    _sum: SeatSumAggregateOutputType | null
    _min: SeatMinAggregateOutputType | null
    _max: SeatMaxAggregateOutputType | null
  }

  export type SeatAvgAggregateOutputType = {
    Seatid: number | null
    tableId: number | null
    imageX: number | null
    imageY: number | null
  }

  export type SeatSumAggregateOutputType = {
    Seatid: number | null
    tableId: number | null
    imageX: number | null
    imageY: number | null
  }

  export type SeatMinAggregateOutputType = {
    Seatid: number | null
    tableId: number | null
    seatNumber: string | null
    isFixed: boolean | null
    imageX: number | null
    imageY: number | null
  }

  export type SeatMaxAggregateOutputType = {
    Seatid: number | null
    tableId: number | null
    seatNumber: string | null
    isFixed: boolean | null
    imageX: number | null
    imageY: number | null
  }

  export type SeatCountAggregateOutputType = {
    Seatid: number
    tableId: number
    seatNumber: number
    isFixed: number
    imageX: number
    imageY: number
    _all: number
  }


  export type SeatAvgAggregateInputType = {
    Seatid?: true
    tableId?: true
    imageX?: true
    imageY?: true
  }

  export type SeatSumAggregateInputType = {
    Seatid?: true
    tableId?: true
    imageX?: true
    imageY?: true
  }

  export type SeatMinAggregateInputType = {
    Seatid?: true
    tableId?: true
    seatNumber?: true
    isFixed?: true
    imageX?: true
    imageY?: true
  }

  export type SeatMaxAggregateInputType = {
    Seatid?: true
    tableId?: true
    seatNumber?: true
    isFixed?: true
    imageX?: true
    imageY?: true
  }

  export type SeatCountAggregateInputType = {
    Seatid?: true
    tableId?: true
    seatNumber?: true
    isFixed?: true
    imageX?: true
    imageY?: true
    _all?: true
  }

  export type SeatAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Seat to aggregate.
     */
    where?: SeatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Seats to fetch.
     */
    orderBy?: SeatOrderByWithRelationInput | SeatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SeatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Seats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Seats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Seats
    **/
    _count?: true | SeatCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SeatAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SeatSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SeatMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SeatMaxAggregateInputType
  }

  export type GetSeatAggregateType<T extends SeatAggregateArgs> = {
        [P in keyof T & keyof AggregateSeat]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSeat[P]>
      : GetScalarType<T[P], AggregateSeat[P]>
  }




  export type SeatGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SeatWhereInput
    orderBy?: SeatOrderByWithAggregationInput | SeatOrderByWithAggregationInput[]
    by: SeatScalarFieldEnum[] | SeatScalarFieldEnum
    having?: SeatScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SeatCountAggregateInputType | true
    _avg?: SeatAvgAggregateInputType
    _sum?: SeatSumAggregateInputType
    _min?: SeatMinAggregateInputType
    _max?: SeatMaxAggregateInputType
  }

  export type SeatGroupByOutputType = {
    Seatid: number
    tableId: number
    seatNumber: string
    isFixed: boolean
    imageX: number
    imageY: number
    _count: SeatCountAggregateOutputType | null
    _avg: SeatAvgAggregateOutputType | null
    _sum: SeatSumAggregateOutputType | null
    _min: SeatMinAggregateOutputType | null
    _max: SeatMaxAggregateOutputType | null
  }

  type GetSeatGroupByPayload<T extends SeatGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SeatGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SeatGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SeatGroupByOutputType[P]>
            : GetScalarType<T[P], SeatGroupByOutputType[P]>
        }
      >
    >


  export type SeatSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Seatid?: boolean
    tableId?: boolean
    seatNumber?: boolean
    isFixed?: boolean
    imageX?: boolean
    imageY?: boolean
  }, ExtArgs["result"]["seat"]>

  export type SeatSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Seatid?: boolean
    tableId?: boolean
    seatNumber?: boolean
    isFixed?: boolean
    imageX?: boolean
    imageY?: boolean
  }, ExtArgs["result"]["seat"]>

  export type SeatSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Seatid?: boolean
    tableId?: boolean
    seatNumber?: boolean
    isFixed?: boolean
    imageX?: boolean
    imageY?: boolean
  }, ExtArgs["result"]["seat"]>

  export type SeatSelectScalar = {
    Seatid?: boolean
    tableId?: boolean
    seatNumber?: boolean
    isFixed?: boolean
    imageX?: boolean
    imageY?: boolean
  }

  export type SeatOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Seatid" | "tableId" | "seatNumber" | "isFixed" | "imageX" | "imageY", ExtArgs["result"]["seat"]>

  export type $SeatPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Seat"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      Seatid: number
      tableId: number
      seatNumber: string
      isFixed: boolean
      imageX: number
      imageY: number
    }, ExtArgs["result"]["seat"]>
    composites: {}
  }

  type SeatGetPayload<S extends boolean | null | undefined | SeatDefaultArgs> = $Result.GetResult<Prisma.$SeatPayload, S>

  type SeatCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SeatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SeatCountAggregateInputType | true
    }

  export interface SeatDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Seat'], meta: { name: 'Seat' } }
    /**
     * Find zero or one Seat that matches the filter.
     * @param {SeatFindUniqueArgs} args - Arguments to find a Seat
     * @example
     * // Get one Seat
     * const seat = await prisma.seat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SeatFindUniqueArgs>(args: SelectSubset<T, SeatFindUniqueArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Seat that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SeatFindUniqueOrThrowArgs} args - Arguments to find a Seat
     * @example
     * // Get one Seat
     * const seat = await prisma.seat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SeatFindUniqueOrThrowArgs>(args: SelectSubset<T, SeatFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Seat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatFindFirstArgs} args - Arguments to find a Seat
     * @example
     * // Get one Seat
     * const seat = await prisma.seat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SeatFindFirstArgs>(args?: SelectSubset<T, SeatFindFirstArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Seat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatFindFirstOrThrowArgs} args - Arguments to find a Seat
     * @example
     * // Get one Seat
     * const seat = await prisma.seat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SeatFindFirstOrThrowArgs>(args?: SelectSubset<T, SeatFindFirstOrThrowArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Seats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Seats
     * const seats = await prisma.seat.findMany()
     * 
     * // Get first 10 Seats
     * const seats = await prisma.seat.findMany({ take: 10 })
     * 
     * // Only select the `Seatid`
     * const seatWithSeatidOnly = await prisma.seat.findMany({ select: { Seatid: true } })
     * 
     */
    findMany<T extends SeatFindManyArgs>(args?: SelectSubset<T, SeatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Seat.
     * @param {SeatCreateArgs} args - Arguments to create a Seat.
     * @example
     * // Create one Seat
     * const Seat = await prisma.seat.create({
     *   data: {
     *     // ... data to create a Seat
     *   }
     * })
     * 
     */
    create<T extends SeatCreateArgs>(args: SelectSubset<T, SeatCreateArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Seats.
     * @param {SeatCreateManyArgs} args - Arguments to create many Seats.
     * @example
     * // Create many Seats
     * const seat = await prisma.seat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SeatCreateManyArgs>(args?: SelectSubset<T, SeatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Seats and returns the data saved in the database.
     * @param {SeatCreateManyAndReturnArgs} args - Arguments to create many Seats.
     * @example
     * // Create many Seats
     * const seat = await prisma.seat.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Seats and only return the `Seatid`
     * const seatWithSeatidOnly = await prisma.seat.createManyAndReturn({
     *   select: { Seatid: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SeatCreateManyAndReturnArgs>(args?: SelectSubset<T, SeatCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Seat.
     * @param {SeatDeleteArgs} args - Arguments to delete one Seat.
     * @example
     * // Delete one Seat
     * const Seat = await prisma.seat.delete({
     *   where: {
     *     // ... filter to delete one Seat
     *   }
     * })
     * 
     */
    delete<T extends SeatDeleteArgs>(args: SelectSubset<T, SeatDeleteArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Seat.
     * @param {SeatUpdateArgs} args - Arguments to update one Seat.
     * @example
     * // Update one Seat
     * const seat = await prisma.seat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SeatUpdateArgs>(args: SelectSubset<T, SeatUpdateArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Seats.
     * @param {SeatDeleteManyArgs} args - Arguments to filter Seats to delete.
     * @example
     * // Delete a few Seats
     * const { count } = await prisma.seat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SeatDeleteManyArgs>(args?: SelectSubset<T, SeatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Seats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Seats
     * const seat = await prisma.seat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SeatUpdateManyArgs>(args: SelectSubset<T, SeatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Seats and returns the data updated in the database.
     * @param {SeatUpdateManyAndReturnArgs} args - Arguments to update many Seats.
     * @example
     * // Update many Seats
     * const seat = await prisma.seat.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Seats and only return the `Seatid`
     * const seatWithSeatidOnly = await prisma.seat.updateManyAndReturn({
     *   select: { Seatid: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SeatUpdateManyAndReturnArgs>(args: SelectSubset<T, SeatUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Seat.
     * @param {SeatUpsertArgs} args - Arguments to update or create a Seat.
     * @example
     * // Update or create a Seat
     * const seat = await prisma.seat.upsert({
     *   create: {
     *     // ... data to create a Seat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Seat we want to update
     *   }
     * })
     */
    upsert<T extends SeatUpsertArgs>(args: SelectSubset<T, SeatUpsertArgs<ExtArgs>>): Prisma__SeatClient<$Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Seats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatCountArgs} args - Arguments to filter Seats to count.
     * @example
     * // Count the number of Seats
     * const count = await prisma.seat.count({
     *   where: {
     *     // ... the filter for the Seats we want to count
     *   }
     * })
    **/
    count<T extends SeatCountArgs>(
      args?: Subset<T, SeatCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SeatCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Seat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SeatAggregateArgs>(args: Subset<T, SeatAggregateArgs>): Prisma.PrismaPromise<GetSeatAggregateType<T>>

    /**
     * Group by Seat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SeatGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SeatGroupByArgs['orderBy'] }
        : { orderBy?: SeatGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SeatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSeatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Seat model
   */
  readonly fields: SeatFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Seat.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SeatClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Seat model
   */
  interface SeatFieldRefs {
    readonly Seatid: FieldRef<"Seat", 'Int'>
    readonly tableId: FieldRef<"Seat", 'Int'>
    readonly seatNumber: FieldRef<"Seat", 'String'>
    readonly isFixed: FieldRef<"Seat", 'Boolean'>
    readonly imageX: FieldRef<"Seat", 'Int'>
    readonly imageY: FieldRef<"Seat", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Seat findUnique
   */
  export type SeatFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Filter, which Seat to fetch.
     */
    where: SeatWhereUniqueInput
  }

  /**
   * Seat findUniqueOrThrow
   */
  export type SeatFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Filter, which Seat to fetch.
     */
    where: SeatWhereUniqueInput
  }

  /**
   * Seat findFirst
   */
  export type SeatFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Filter, which Seat to fetch.
     */
    where?: SeatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Seats to fetch.
     */
    orderBy?: SeatOrderByWithRelationInput | SeatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Seats.
     */
    cursor?: SeatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Seats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Seats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Seats.
     */
    distinct?: SeatScalarFieldEnum | SeatScalarFieldEnum[]
  }

  /**
   * Seat findFirstOrThrow
   */
  export type SeatFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Filter, which Seat to fetch.
     */
    where?: SeatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Seats to fetch.
     */
    orderBy?: SeatOrderByWithRelationInput | SeatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Seats.
     */
    cursor?: SeatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Seats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Seats.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Seats.
     */
    distinct?: SeatScalarFieldEnum | SeatScalarFieldEnum[]
  }

  /**
   * Seat findMany
   */
  export type SeatFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Filter, which Seats to fetch.
     */
    where?: SeatWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Seats to fetch.
     */
    orderBy?: SeatOrderByWithRelationInput | SeatOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Seats.
     */
    cursor?: SeatWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Seats from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Seats.
     */
    skip?: number
    distinct?: SeatScalarFieldEnum | SeatScalarFieldEnum[]
  }

  /**
   * Seat create
   */
  export type SeatCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * The data needed to create a Seat.
     */
    data: XOR<SeatCreateInput, SeatUncheckedCreateInput>
  }

  /**
   * Seat createMany
   */
  export type SeatCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Seats.
     */
    data: SeatCreateManyInput | SeatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Seat createManyAndReturn
   */
  export type SeatCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * The data used to create many Seats.
     */
    data: SeatCreateManyInput | SeatCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Seat update
   */
  export type SeatUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * The data needed to update a Seat.
     */
    data: XOR<SeatUpdateInput, SeatUncheckedUpdateInput>
    /**
     * Choose, which Seat to update.
     */
    where: SeatWhereUniqueInput
  }

  /**
   * Seat updateMany
   */
  export type SeatUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Seats.
     */
    data: XOR<SeatUpdateManyMutationInput, SeatUncheckedUpdateManyInput>
    /**
     * Filter which Seats to update
     */
    where?: SeatWhereInput
    /**
     * Limit how many Seats to update.
     */
    limit?: number
  }

  /**
   * Seat updateManyAndReturn
   */
  export type SeatUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * The data used to update Seats.
     */
    data: XOR<SeatUpdateManyMutationInput, SeatUncheckedUpdateManyInput>
    /**
     * Filter which Seats to update
     */
    where?: SeatWhereInput
    /**
     * Limit how many Seats to update.
     */
    limit?: number
  }

  /**
   * Seat upsert
   */
  export type SeatUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * The filter to search for the Seat to update in case it exists.
     */
    where: SeatWhereUniqueInput
    /**
     * In case the Seat found by the `where` argument doesn't exist, create a new Seat with this data.
     */
    create: XOR<SeatCreateInput, SeatUncheckedCreateInput>
    /**
     * In case the Seat was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SeatUpdateInput, SeatUncheckedUpdateInput>
  }

  /**
   * Seat delete
   */
  export type SeatDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
    /**
     * Filter which Seat to delete.
     */
    where: SeatWhereUniqueInput
  }

  /**
   * Seat deleteMany
   */
  export type SeatDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Seats to delete
     */
    where?: SeatWhereInput
    /**
     * Limit how many Seats to delete.
     */
    limit?: number
  }

  /**
   * Seat without action
   */
  export type SeatDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: SeatSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Seat
     */
    omit?: SeatOmit<ExtArgs> | null
  }


  /**
   * Model Table
   */

  export type AggregateTable = {
    _count: TableCountAggregateOutputType | null
    _avg: TableAvgAggregateOutputType | null
    _sum: TableSumAggregateOutputType | null
    _min: TableMinAggregateOutputType | null
    _max: TableMaxAggregateOutputType | null
  }

  export type TableAvgAggregateOutputType = {
    Tableid: number | null
  }

  export type TableSumAggregateOutputType = {
    Tableid: number | null
  }

  export type TableMinAggregateOutputType = {
    Tableid: number | null
    name: string | null
  }

  export type TableMaxAggregateOutputType = {
    Tableid: number | null
    name: string | null
  }

  export type TableCountAggregateOutputType = {
    Tableid: number
    name: number
    _all: number
  }


  export type TableAvgAggregateInputType = {
    Tableid?: true
  }

  export type TableSumAggregateInputType = {
    Tableid?: true
  }

  export type TableMinAggregateInputType = {
    Tableid?: true
    name?: true
  }

  export type TableMaxAggregateInputType = {
    Tableid?: true
    name?: true
  }

  export type TableCountAggregateInputType = {
    Tableid?: true
    name?: true
    _all?: true
  }

  export type TableAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Table to aggregate.
     */
    where?: TableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Tables
    **/
    _count?: true | TableCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TableAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TableSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TableMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TableMaxAggregateInputType
  }

  export type GetTableAggregateType<T extends TableAggregateArgs> = {
        [P in keyof T & keyof AggregateTable]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTable[P]>
      : GetScalarType<T[P], AggregateTable[P]>
  }




  export type TableGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TableWhereInput
    orderBy?: TableOrderByWithAggregationInput | TableOrderByWithAggregationInput[]
    by: TableScalarFieldEnum[] | TableScalarFieldEnum
    having?: TableScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TableCountAggregateInputType | true
    _avg?: TableAvgAggregateInputType
    _sum?: TableSumAggregateInputType
    _min?: TableMinAggregateInputType
    _max?: TableMaxAggregateInputType
  }

  export type TableGroupByOutputType = {
    Tableid: number
    name: string
    _count: TableCountAggregateOutputType | null
    _avg: TableAvgAggregateOutputType | null
    _sum: TableSumAggregateOutputType | null
    _min: TableMinAggregateOutputType | null
    _max: TableMaxAggregateOutputType | null
  }

  type GetTableGroupByPayload<T extends TableGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TableGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TableGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TableGroupByOutputType[P]>
            : GetScalarType<T[P], TableGroupByOutputType[P]>
        }
      >
    >


  export type TableSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Tableid?: boolean
    name?: boolean
  }, ExtArgs["result"]["table"]>

  export type TableSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Tableid?: boolean
    name?: boolean
  }, ExtArgs["result"]["table"]>

  export type TableSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    Tableid?: boolean
    name?: boolean
  }, ExtArgs["result"]["table"]>

  export type TableSelectScalar = {
    Tableid?: boolean
    name?: boolean
  }

  export type TableOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"Tableid" | "name", ExtArgs["result"]["table"]>

  export type $TablePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Table"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      Tableid: number
      name: string
    }, ExtArgs["result"]["table"]>
    composites: {}
  }

  type TableGetPayload<S extends boolean | null | undefined | TableDefaultArgs> = $Result.GetResult<Prisma.$TablePayload, S>

  type TableCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TableFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TableCountAggregateInputType | true
    }

  export interface TableDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Table'], meta: { name: 'Table' } }
    /**
     * Find zero or one Table that matches the filter.
     * @param {TableFindUniqueArgs} args - Arguments to find a Table
     * @example
     * // Get one Table
     * const table = await prisma.table.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TableFindUniqueArgs>(args: SelectSubset<T, TableFindUniqueArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Table that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TableFindUniqueOrThrowArgs} args - Arguments to find a Table
     * @example
     * // Get one Table
     * const table = await prisma.table.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TableFindUniqueOrThrowArgs>(args: SelectSubset<T, TableFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Table that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableFindFirstArgs} args - Arguments to find a Table
     * @example
     * // Get one Table
     * const table = await prisma.table.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TableFindFirstArgs>(args?: SelectSubset<T, TableFindFirstArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Table that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableFindFirstOrThrowArgs} args - Arguments to find a Table
     * @example
     * // Get one Table
     * const table = await prisma.table.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TableFindFirstOrThrowArgs>(args?: SelectSubset<T, TableFindFirstOrThrowArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tables that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tables
     * const tables = await prisma.table.findMany()
     * 
     * // Get first 10 Tables
     * const tables = await prisma.table.findMany({ take: 10 })
     * 
     * // Only select the `Tableid`
     * const tableWithTableidOnly = await prisma.table.findMany({ select: { Tableid: true } })
     * 
     */
    findMany<T extends TableFindManyArgs>(args?: SelectSubset<T, TableFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Table.
     * @param {TableCreateArgs} args - Arguments to create a Table.
     * @example
     * // Create one Table
     * const Table = await prisma.table.create({
     *   data: {
     *     // ... data to create a Table
     *   }
     * })
     * 
     */
    create<T extends TableCreateArgs>(args: SelectSubset<T, TableCreateArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tables.
     * @param {TableCreateManyArgs} args - Arguments to create many Tables.
     * @example
     * // Create many Tables
     * const table = await prisma.table.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TableCreateManyArgs>(args?: SelectSubset<T, TableCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Tables and returns the data saved in the database.
     * @param {TableCreateManyAndReturnArgs} args - Arguments to create many Tables.
     * @example
     * // Create many Tables
     * const table = await prisma.table.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Tables and only return the `Tableid`
     * const tableWithTableidOnly = await prisma.table.createManyAndReturn({
     *   select: { Tableid: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TableCreateManyAndReturnArgs>(args?: SelectSubset<T, TableCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Table.
     * @param {TableDeleteArgs} args - Arguments to delete one Table.
     * @example
     * // Delete one Table
     * const Table = await prisma.table.delete({
     *   where: {
     *     // ... filter to delete one Table
     *   }
     * })
     * 
     */
    delete<T extends TableDeleteArgs>(args: SelectSubset<T, TableDeleteArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Table.
     * @param {TableUpdateArgs} args - Arguments to update one Table.
     * @example
     * // Update one Table
     * const table = await prisma.table.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TableUpdateArgs>(args: SelectSubset<T, TableUpdateArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tables.
     * @param {TableDeleteManyArgs} args - Arguments to filter Tables to delete.
     * @example
     * // Delete a few Tables
     * const { count } = await prisma.table.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TableDeleteManyArgs>(args?: SelectSubset<T, TableDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tables
     * const table = await prisma.table.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TableUpdateManyArgs>(args: SelectSubset<T, TableUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tables and returns the data updated in the database.
     * @param {TableUpdateManyAndReturnArgs} args - Arguments to update many Tables.
     * @example
     * // Update many Tables
     * const table = await prisma.table.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Tables and only return the `Tableid`
     * const tableWithTableidOnly = await prisma.table.updateManyAndReturn({
     *   select: { Tableid: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TableUpdateManyAndReturnArgs>(args: SelectSubset<T, TableUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Table.
     * @param {TableUpsertArgs} args - Arguments to update or create a Table.
     * @example
     * // Update or create a Table
     * const table = await prisma.table.upsert({
     *   create: {
     *     // ... data to create a Table
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Table we want to update
     *   }
     * })
     */
    upsert<T extends TableUpsertArgs>(args: SelectSubset<T, TableUpsertArgs<ExtArgs>>): Prisma__TableClient<$Result.GetResult<Prisma.$TablePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableCountArgs} args - Arguments to filter Tables to count.
     * @example
     * // Count the number of Tables
     * const count = await prisma.table.count({
     *   where: {
     *     // ... the filter for the Tables we want to count
     *   }
     * })
    **/
    count<T extends TableCountArgs>(
      args?: Subset<T, TableCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TableCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Table.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TableAggregateArgs>(args: Subset<T, TableAggregateArgs>): Prisma.PrismaPromise<GetTableAggregateType<T>>

    /**
     * Group by Table.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TableGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TableGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TableGroupByArgs['orderBy'] }
        : { orderBy?: TableGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TableGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTableGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Table model
   */
  readonly fields: TableFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Table.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TableClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Table model
   */
  interface TableFieldRefs {
    readonly Tableid: FieldRef<"Table", 'Int'>
    readonly name: FieldRef<"Table", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Table findUnique
   */
  export type TableFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Filter, which Table to fetch.
     */
    where: TableWhereUniqueInput
  }

  /**
   * Table findUniqueOrThrow
   */
  export type TableFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Filter, which Table to fetch.
     */
    where: TableWhereUniqueInput
  }

  /**
   * Table findFirst
   */
  export type TableFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Filter, which Table to fetch.
     */
    where?: TableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tables.
     */
    cursor?: TableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tables.
     */
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[]
  }

  /**
   * Table findFirstOrThrow
   */
  export type TableFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Filter, which Table to fetch.
     */
    where?: TableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Tables.
     */
    cursor?: TableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Tables.
     */
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[]
  }

  /**
   * Table findMany
   */
  export type TableFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Filter, which Tables to fetch.
     */
    where?: TableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Tables to fetch.
     */
    orderBy?: TableOrderByWithRelationInput | TableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Tables.
     */
    cursor?: TableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Tables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Tables.
     */
    skip?: number
    distinct?: TableScalarFieldEnum | TableScalarFieldEnum[]
  }

  /**
   * Table create
   */
  export type TableCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * The data needed to create a Table.
     */
    data: XOR<TableCreateInput, TableUncheckedCreateInput>
  }

  /**
   * Table createMany
   */
  export type TableCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Tables.
     */
    data: TableCreateManyInput | TableCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Table createManyAndReturn
   */
  export type TableCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * The data used to create many Tables.
     */
    data: TableCreateManyInput | TableCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Table update
   */
  export type TableUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * The data needed to update a Table.
     */
    data: XOR<TableUpdateInput, TableUncheckedUpdateInput>
    /**
     * Choose, which Table to update.
     */
    where: TableWhereUniqueInput
  }

  /**
   * Table updateMany
   */
  export type TableUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Tables.
     */
    data: XOR<TableUpdateManyMutationInput, TableUncheckedUpdateManyInput>
    /**
     * Filter which Tables to update
     */
    where?: TableWhereInput
    /**
     * Limit how many Tables to update.
     */
    limit?: number
  }

  /**
   * Table updateManyAndReturn
   */
  export type TableUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * The data used to update Tables.
     */
    data: XOR<TableUpdateManyMutationInput, TableUncheckedUpdateManyInput>
    /**
     * Filter which Tables to update
     */
    where?: TableWhereInput
    /**
     * Limit how many Tables to update.
     */
    limit?: number
  }

  /**
   * Table upsert
   */
  export type TableUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * The filter to search for the Table to update in case it exists.
     */
    where: TableWhereUniqueInput
    /**
     * In case the Table found by the `where` argument doesn't exist, create a new Table with this data.
     */
    create: XOR<TableCreateInput, TableUncheckedCreateInput>
    /**
     * In case the Table was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TableUpdateInput, TableUncheckedUpdateInput>
  }

  /**
   * Table delete
   */
  export type TableDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
    /**
     * Filter which Table to delete.
     */
    where: TableWhereUniqueInput
  }

  /**
   * Table deleteMany
   */
  export type TableDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Tables to delete
     */
    where?: TableWhereInput
    /**
     * Limit how many Tables to delete.
     */
    limit?: number
  }

  /**
   * Table without action
   */
  export type TableDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Table
     */
    select?: TableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Table
     */
    omit?: TableOmit<ExtArgs> | null
  }


  /**
   * Model AdjacentTable
   */

  export type AggregateAdjacentTable = {
    _count: AdjacentTableCountAggregateOutputType | null
    _avg: AdjacentTableAvgAggregateOutputType | null
    _sum: AdjacentTableSumAggregateOutputType | null
    _min: AdjacentTableMinAggregateOutputType | null
    _max: AdjacentTableMaxAggregateOutputType | null
  }

  export type AdjacentTableAvgAggregateOutputType = {
    AdjacentTableId: number | null
    tableId: number | null
    adjacentTableId: number | null
  }

  export type AdjacentTableSumAggregateOutputType = {
    AdjacentTableId: number | null
    tableId: number | null
    adjacentTableId: number | null
  }

  export type AdjacentTableMinAggregateOutputType = {
    AdjacentTableId: number | null
    tableId: number | null
    adjacentTableId: number | null
  }

  export type AdjacentTableMaxAggregateOutputType = {
    AdjacentTableId: number | null
    tableId: number | null
    adjacentTableId: number | null
  }

  export type AdjacentTableCountAggregateOutputType = {
    AdjacentTableId: number
    tableId: number
    adjacentTableId: number
    _all: number
  }


  export type AdjacentTableAvgAggregateInputType = {
    AdjacentTableId?: true
    tableId?: true
    adjacentTableId?: true
  }

  export type AdjacentTableSumAggregateInputType = {
    AdjacentTableId?: true
    tableId?: true
    adjacentTableId?: true
  }

  export type AdjacentTableMinAggregateInputType = {
    AdjacentTableId?: true
    tableId?: true
    adjacentTableId?: true
  }

  export type AdjacentTableMaxAggregateInputType = {
    AdjacentTableId?: true
    tableId?: true
    adjacentTableId?: true
  }

  export type AdjacentTableCountAggregateInputType = {
    AdjacentTableId?: true
    tableId?: true
    adjacentTableId?: true
    _all?: true
  }

  export type AdjacentTableAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdjacentTable to aggregate.
     */
    where?: AdjacentTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdjacentTables to fetch.
     */
    orderBy?: AdjacentTableOrderByWithRelationInput | AdjacentTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdjacentTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdjacentTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdjacentTables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdjacentTables
    **/
    _count?: true | AdjacentTableCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AdjacentTableAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AdjacentTableSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdjacentTableMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdjacentTableMaxAggregateInputType
  }

  export type GetAdjacentTableAggregateType<T extends AdjacentTableAggregateArgs> = {
        [P in keyof T & keyof AggregateAdjacentTable]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdjacentTable[P]>
      : GetScalarType<T[P], AggregateAdjacentTable[P]>
  }




  export type AdjacentTableGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdjacentTableWhereInput
    orderBy?: AdjacentTableOrderByWithAggregationInput | AdjacentTableOrderByWithAggregationInput[]
    by: AdjacentTableScalarFieldEnum[] | AdjacentTableScalarFieldEnum
    having?: AdjacentTableScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdjacentTableCountAggregateInputType | true
    _avg?: AdjacentTableAvgAggregateInputType
    _sum?: AdjacentTableSumAggregateInputType
    _min?: AdjacentTableMinAggregateInputType
    _max?: AdjacentTableMaxAggregateInputType
  }

  export type AdjacentTableGroupByOutputType = {
    AdjacentTableId: number
    tableId: number
    adjacentTableId: number
    _count: AdjacentTableCountAggregateOutputType | null
    _avg: AdjacentTableAvgAggregateOutputType | null
    _sum: AdjacentTableSumAggregateOutputType | null
    _min: AdjacentTableMinAggregateOutputType | null
    _max: AdjacentTableMaxAggregateOutputType | null
  }

  type GetAdjacentTableGroupByPayload<T extends AdjacentTableGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdjacentTableGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdjacentTableGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdjacentTableGroupByOutputType[P]>
            : GetScalarType<T[P], AdjacentTableGroupByOutputType[P]>
        }
      >
    >


  export type AdjacentTableSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    AdjacentTableId?: boolean
    tableId?: boolean
    adjacentTableId?: boolean
  }, ExtArgs["result"]["adjacentTable"]>

  export type AdjacentTableSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    AdjacentTableId?: boolean
    tableId?: boolean
    adjacentTableId?: boolean
  }, ExtArgs["result"]["adjacentTable"]>

  export type AdjacentTableSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    AdjacentTableId?: boolean
    tableId?: boolean
    adjacentTableId?: boolean
  }, ExtArgs["result"]["adjacentTable"]>

  export type AdjacentTableSelectScalar = {
    AdjacentTableId?: boolean
    tableId?: boolean
    adjacentTableId?: boolean
  }

  export type AdjacentTableOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"AdjacentTableId" | "tableId" | "adjacentTableId", ExtArgs["result"]["adjacentTable"]>

  export type $AdjacentTablePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdjacentTable"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      AdjacentTableId: number
      tableId: number
      adjacentTableId: number
    }, ExtArgs["result"]["adjacentTable"]>
    composites: {}
  }

  type AdjacentTableGetPayload<S extends boolean | null | undefined | AdjacentTableDefaultArgs> = $Result.GetResult<Prisma.$AdjacentTablePayload, S>

  type AdjacentTableCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdjacentTableFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdjacentTableCountAggregateInputType | true
    }

  export interface AdjacentTableDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdjacentTable'], meta: { name: 'AdjacentTable' } }
    /**
     * Find zero or one AdjacentTable that matches the filter.
     * @param {AdjacentTableFindUniqueArgs} args - Arguments to find a AdjacentTable
     * @example
     * // Get one AdjacentTable
     * const adjacentTable = await prisma.adjacentTable.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdjacentTableFindUniqueArgs>(args: SelectSubset<T, AdjacentTableFindUniqueArgs<ExtArgs>>): Prisma__AdjacentTableClient<$Result.GetResult<Prisma.$AdjacentTablePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdjacentTable that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdjacentTableFindUniqueOrThrowArgs} args - Arguments to find a AdjacentTable
     * @example
     * // Get one AdjacentTable
     * const adjacentTable = await prisma.adjacentTable.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdjacentTableFindUniqueOrThrowArgs>(args: SelectSubset<T, AdjacentTableFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdjacentTableClient<$Result.GetResult<Prisma.$AdjacentTablePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdjacentTable that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjacentTableFindFirstArgs} args - Arguments to find a AdjacentTable
     * @example
     * // Get one AdjacentTable
     * const adjacentTable = await prisma.adjacentTable.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdjacentTableFindFirstArgs>(args?: SelectSubset<T, AdjacentTableFindFirstArgs<ExtArgs>>): Prisma__AdjacentTableClient<$Result.GetResult<Prisma.$AdjacentTablePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdjacentTable that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjacentTableFindFirstOrThrowArgs} args - Arguments to find a AdjacentTable
     * @example
     * // Get one AdjacentTable
     * const adjacentTable = await prisma.adjacentTable.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdjacentTableFindFirstOrThrowArgs>(args?: SelectSubset<T, AdjacentTableFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdjacentTableClient<$Result.GetResult<Prisma.$AdjacentTablePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdjacentTables that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjacentTableFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdjacentTables
     * const adjacentTables = await prisma.adjacentTable.findMany()
     * 
     * // Get first 10 AdjacentTables
     * const adjacentTables = await prisma.adjacentTable.findMany({ take: 10 })
     * 
     * // Only select the `AdjacentTableId`
     * const adjacentTableWithAdjacentTableIdOnly = await prisma.adjacentTable.findMany({ select: { AdjacentTableId: true } })
     * 
     */
    findMany<T extends AdjacentTableFindManyArgs>(args?: SelectSubset<T, AdjacentTableFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdjacentTablePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdjacentTable.
     * @param {AdjacentTableCreateArgs} args - Arguments to create a AdjacentTable.
     * @example
     * // Create one AdjacentTable
     * const AdjacentTable = await prisma.adjacentTable.create({
     *   data: {
     *     // ... data to create a AdjacentTable
     *   }
     * })
     * 
     */
    create<T extends AdjacentTableCreateArgs>(args: SelectSubset<T, AdjacentTableCreateArgs<ExtArgs>>): Prisma__AdjacentTableClient<$Result.GetResult<Prisma.$AdjacentTablePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdjacentTables.
     * @param {AdjacentTableCreateManyArgs} args - Arguments to create many AdjacentTables.
     * @example
     * // Create many AdjacentTables
     * const adjacentTable = await prisma.adjacentTable.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdjacentTableCreateManyArgs>(args?: SelectSubset<T, AdjacentTableCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdjacentTables and returns the data saved in the database.
     * @param {AdjacentTableCreateManyAndReturnArgs} args - Arguments to create many AdjacentTables.
     * @example
     * // Create many AdjacentTables
     * const adjacentTable = await prisma.adjacentTable.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdjacentTables and only return the `AdjacentTableId`
     * const adjacentTableWithAdjacentTableIdOnly = await prisma.adjacentTable.createManyAndReturn({
     *   select: { AdjacentTableId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdjacentTableCreateManyAndReturnArgs>(args?: SelectSubset<T, AdjacentTableCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdjacentTablePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AdjacentTable.
     * @param {AdjacentTableDeleteArgs} args - Arguments to delete one AdjacentTable.
     * @example
     * // Delete one AdjacentTable
     * const AdjacentTable = await prisma.adjacentTable.delete({
     *   where: {
     *     // ... filter to delete one AdjacentTable
     *   }
     * })
     * 
     */
    delete<T extends AdjacentTableDeleteArgs>(args: SelectSubset<T, AdjacentTableDeleteArgs<ExtArgs>>): Prisma__AdjacentTableClient<$Result.GetResult<Prisma.$AdjacentTablePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdjacentTable.
     * @param {AdjacentTableUpdateArgs} args - Arguments to update one AdjacentTable.
     * @example
     * // Update one AdjacentTable
     * const adjacentTable = await prisma.adjacentTable.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdjacentTableUpdateArgs>(args: SelectSubset<T, AdjacentTableUpdateArgs<ExtArgs>>): Prisma__AdjacentTableClient<$Result.GetResult<Prisma.$AdjacentTablePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdjacentTables.
     * @param {AdjacentTableDeleteManyArgs} args - Arguments to filter AdjacentTables to delete.
     * @example
     * // Delete a few AdjacentTables
     * const { count } = await prisma.adjacentTable.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdjacentTableDeleteManyArgs>(args?: SelectSubset<T, AdjacentTableDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdjacentTables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjacentTableUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdjacentTables
     * const adjacentTable = await prisma.adjacentTable.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdjacentTableUpdateManyArgs>(args: SelectSubset<T, AdjacentTableUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdjacentTables and returns the data updated in the database.
     * @param {AdjacentTableUpdateManyAndReturnArgs} args - Arguments to update many AdjacentTables.
     * @example
     * // Update many AdjacentTables
     * const adjacentTable = await prisma.adjacentTable.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AdjacentTables and only return the `AdjacentTableId`
     * const adjacentTableWithAdjacentTableIdOnly = await prisma.adjacentTable.updateManyAndReturn({
     *   select: { AdjacentTableId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdjacentTableUpdateManyAndReturnArgs>(args: SelectSubset<T, AdjacentTableUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdjacentTablePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AdjacentTable.
     * @param {AdjacentTableUpsertArgs} args - Arguments to update or create a AdjacentTable.
     * @example
     * // Update or create a AdjacentTable
     * const adjacentTable = await prisma.adjacentTable.upsert({
     *   create: {
     *     // ... data to create a AdjacentTable
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdjacentTable we want to update
     *   }
     * })
     */
    upsert<T extends AdjacentTableUpsertArgs>(args: SelectSubset<T, AdjacentTableUpsertArgs<ExtArgs>>): Prisma__AdjacentTableClient<$Result.GetResult<Prisma.$AdjacentTablePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdjacentTables.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjacentTableCountArgs} args - Arguments to filter AdjacentTables to count.
     * @example
     * // Count the number of AdjacentTables
     * const count = await prisma.adjacentTable.count({
     *   where: {
     *     // ... the filter for the AdjacentTables we want to count
     *   }
     * })
    **/
    count<T extends AdjacentTableCountArgs>(
      args?: Subset<T, AdjacentTableCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdjacentTableCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdjacentTable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjacentTableAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdjacentTableAggregateArgs>(args: Subset<T, AdjacentTableAggregateArgs>): Prisma.PrismaPromise<GetAdjacentTableAggregateType<T>>

    /**
     * Group by AdjacentTable.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdjacentTableGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdjacentTableGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdjacentTableGroupByArgs['orderBy'] }
        : { orderBy?: AdjacentTableGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdjacentTableGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdjacentTableGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdjacentTable model
   */
  readonly fields: AdjacentTableFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdjacentTable.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdjacentTableClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdjacentTable model
   */
  interface AdjacentTableFieldRefs {
    readonly AdjacentTableId: FieldRef<"AdjacentTable", 'Int'>
    readonly tableId: FieldRef<"AdjacentTable", 'Int'>
    readonly adjacentTableId: FieldRef<"AdjacentTable", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * AdjacentTable findUnique
   */
  export type AdjacentTableFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdjacentTable
     */
    select?: AdjacentTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdjacentTable
     */
    omit?: AdjacentTableOmit<ExtArgs> | null
    /**
     * Filter, which AdjacentTable to fetch.
     */
    where: AdjacentTableWhereUniqueInput
  }

  /**
   * AdjacentTable findUniqueOrThrow
   */
  export type AdjacentTableFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdjacentTable
     */
    select?: AdjacentTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdjacentTable
     */
    omit?: AdjacentTableOmit<ExtArgs> | null
    /**
     * Filter, which AdjacentTable to fetch.
     */
    where: AdjacentTableWhereUniqueInput
  }

  /**
   * AdjacentTable findFirst
   */
  export type AdjacentTableFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdjacentTable
     */
    select?: AdjacentTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdjacentTable
     */
    omit?: AdjacentTableOmit<ExtArgs> | null
    /**
     * Filter, which AdjacentTable to fetch.
     */
    where?: AdjacentTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdjacentTables to fetch.
     */
    orderBy?: AdjacentTableOrderByWithRelationInput | AdjacentTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdjacentTables.
     */
    cursor?: AdjacentTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdjacentTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdjacentTables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdjacentTables.
     */
    distinct?: AdjacentTableScalarFieldEnum | AdjacentTableScalarFieldEnum[]
  }

  /**
   * AdjacentTable findFirstOrThrow
   */
  export type AdjacentTableFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdjacentTable
     */
    select?: AdjacentTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdjacentTable
     */
    omit?: AdjacentTableOmit<ExtArgs> | null
    /**
     * Filter, which AdjacentTable to fetch.
     */
    where?: AdjacentTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdjacentTables to fetch.
     */
    orderBy?: AdjacentTableOrderByWithRelationInput | AdjacentTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdjacentTables.
     */
    cursor?: AdjacentTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdjacentTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdjacentTables.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdjacentTables.
     */
    distinct?: AdjacentTableScalarFieldEnum | AdjacentTableScalarFieldEnum[]
  }

  /**
   * AdjacentTable findMany
   */
  export type AdjacentTableFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdjacentTable
     */
    select?: AdjacentTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdjacentTable
     */
    omit?: AdjacentTableOmit<ExtArgs> | null
    /**
     * Filter, which AdjacentTables to fetch.
     */
    where?: AdjacentTableWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdjacentTables to fetch.
     */
    orderBy?: AdjacentTableOrderByWithRelationInput | AdjacentTableOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdjacentTables.
     */
    cursor?: AdjacentTableWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdjacentTables from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdjacentTables.
     */
    skip?: number
    distinct?: AdjacentTableScalarFieldEnum | AdjacentTableScalarFieldEnum[]
  }

  /**
   * AdjacentTable create
   */
  export type AdjacentTableCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdjacentTable
     */
    select?: AdjacentTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdjacentTable
     */
    omit?: AdjacentTableOmit<ExtArgs> | null
    /**
     * The data needed to create a AdjacentTable.
     */
    data: XOR<AdjacentTableCreateInput, AdjacentTableUncheckedCreateInput>
  }

  /**
   * AdjacentTable createMany
   */
  export type AdjacentTableCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdjacentTables.
     */
    data: AdjacentTableCreateManyInput | AdjacentTableCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdjacentTable createManyAndReturn
   */
  export type AdjacentTableCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdjacentTable
     */
    select?: AdjacentTableSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdjacentTable
     */
    omit?: AdjacentTableOmit<ExtArgs> | null
    /**
     * The data used to create many AdjacentTables.
     */
    data: AdjacentTableCreateManyInput | AdjacentTableCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AdjacentTable update
   */
  export type AdjacentTableUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdjacentTable
     */
    select?: AdjacentTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdjacentTable
     */
    omit?: AdjacentTableOmit<ExtArgs> | null
    /**
     * The data needed to update a AdjacentTable.
     */
    data: XOR<AdjacentTableUpdateInput, AdjacentTableUncheckedUpdateInput>
    /**
     * Choose, which AdjacentTable to update.
     */
    where: AdjacentTableWhereUniqueInput
  }

  /**
   * AdjacentTable updateMany
   */
  export type AdjacentTableUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdjacentTables.
     */
    data: XOR<AdjacentTableUpdateManyMutationInput, AdjacentTableUncheckedUpdateManyInput>
    /**
     * Filter which AdjacentTables to update
     */
    where?: AdjacentTableWhereInput
    /**
     * Limit how many AdjacentTables to update.
     */
    limit?: number
  }

  /**
   * AdjacentTable updateManyAndReturn
   */
  export type AdjacentTableUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdjacentTable
     */
    select?: AdjacentTableSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdjacentTable
     */
    omit?: AdjacentTableOmit<ExtArgs> | null
    /**
     * The data used to update AdjacentTables.
     */
    data: XOR<AdjacentTableUpdateManyMutationInput, AdjacentTableUncheckedUpdateManyInput>
    /**
     * Filter which AdjacentTables to update
     */
    where?: AdjacentTableWhereInput
    /**
     * Limit how many AdjacentTables to update.
     */
    limit?: number
  }

  /**
   * AdjacentTable upsert
   */
  export type AdjacentTableUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdjacentTable
     */
    select?: AdjacentTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdjacentTable
     */
    omit?: AdjacentTableOmit<ExtArgs> | null
    /**
     * The filter to search for the AdjacentTable to update in case it exists.
     */
    where: AdjacentTableWhereUniqueInput
    /**
     * In case the AdjacentTable found by the `where` argument doesn't exist, create a new AdjacentTable with this data.
     */
    create: XOR<AdjacentTableCreateInput, AdjacentTableUncheckedCreateInput>
    /**
     * In case the AdjacentTable was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdjacentTableUpdateInput, AdjacentTableUncheckedUpdateInput>
  }

  /**
   * AdjacentTable delete
   */
  export type AdjacentTableDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdjacentTable
     */
    select?: AdjacentTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdjacentTable
     */
    omit?: AdjacentTableOmit<ExtArgs> | null
    /**
     * Filter which AdjacentTable to delete.
     */
    where: AdjacentTableWhereUniqueInput
  }

  /**
   * AdjacentTable deleteMany
   */
  export type AdjacentTableDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdjacentTables to delete
     */
    where?: AdjacentTableWhereInput
    /**
     * Limit how many AdjacentTables to delete.
     */
    limit?: number
  }

  /**
   * AdjacentTable without action
   */
  export type AdjacentTableDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdjacentTable
     */
    select?: AdjacentTableSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdjacentTable
     */
    omit?: AdjacentTableOmit<ExtArgs> | null
  }


  /**
   * Model TodayPosition
   */

  export type AggregateTodayPosition = {
    _count: TodayPositionCountAggregateOutputType | null
    _avg: TodayPositionAvgAggregateOutputType | null
    _sum: TodayPositionSumAggregateOutputType | null
    _min: TodayPositionMinAggregateOutputType | null
    _max: TodayPositionMaxAggregateOutputType | null
  }

  export type TodayPositionAvgAggregateOutputType = {
    id: number | null
    seatId: number | null
    lotteryNumber: number | null
    userId: number | null
  }

  export type TodayPositionSumAggregateOutputType = {
    id: number | null
    seatId: number | null
    lotteryNumber: number | null
    userId: number | null
  }

  export type TodayPositionMinAggregateOutputType = {
    id: number | null
    date: Date | null
    seatId: number | null
    lotteryNumber: number | null
    userId: number | null
  }

  export type TodayPositionMaxAggregateOutputType = {
    id: number | null
    date: Date | null
    seatId: number | null
    lotteryNumber: number | null
    userId: number | null
  }

  export type TodayPositionCountAggregateOutputType = {
    id: number
    date: number
    seatId: number
    lotteryNumber: number
    userId: number
    _all: number
  }


  export type TodayPositionAvgAggregateInputType = {
    id?: true
    seatId?: true
    lotteryNumber?: true
    userId?: true
  }

  export type TodayPositionSumAggregateInputType = {
    id?: true
    seatId?: true
    lotteryNumber?: true
    userId?: true
  }

  export type TodayPositionMinAggregateInputType = {
    id?: true
    date?: true
    seatId?: true
    lotteryNumber?: true
    userId?: true
  }

  export type TodayPositionMaxAggregateInputType = {
    id?: true
    date?: true
    seatId?: true
    lotteryNumber?: true
    userId?: true
  }

  export type TodayPositionCountAggregateInputType = {
    id?: true
    date?: true
    seatId?: true
    lotteryNumber?: true
    userId?: true
    _all?: true
  }

  export type TodayPositionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TodayPosition to aggregate.
     */
    where?: TodayPositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TodayPositions to fetch.
     */
    orderBy?: TodayPositionOrderByWithRelationInput | TodayPositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TodayPositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TodayPositions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TodayPositions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned TodayPositions
    **/
    _count?: true | TodayPositionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TodayPositionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TodayPositionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TodayPositionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TodayPositionMaxAggregateInputType
  }

  export type GetTodayPositionAggregateType<T extends TodayPositionAggregateArgs> = {
        [P in keyof T & keyof AggregateTodayPosition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTodayPosition[P]>
      : GetScalarType<T[P], AggregateTodayPosition[P]>
  }




  export type TodayPositionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TodayPositionWhereInput
    orderBy?: TodayPositionOrderByWithAggregationInput | TodayPositionOrderByWithAggregationInput[]
    by: TodayPositionScalarFieldEnum[] | TodayPositionScalarFieldEnum
    having?: TodayPositionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TodayPositionCountAggregateInputType | true
    _avg?: TodayPositionAvgAggregateInputType
    _sum?: TodayPositionSumAggregateInputType
    _min?: TodayPositionMinAggregateInputType
    _max?: TodayPositionMaxAggregateInputType
  }

  export type TodayPositionGroupByOutputType = {
    id: number
    date: Date
    seatId: number
    lotteryNumber: number
    userId: number
    _count: TodayPositionCountAggregateOutputType | null
    _avg: TodayPositionAvgAggregateOutputType | null
    _sum: TodayPositionSumAggregateOutputType | null
    _min: TodayPositionMinAggregateOutputType | null
    _max: TodayPositionMaxAggregateOutputType | null
  }

  type GetTodayPositionGroupByPayload<T extends TodayPositionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TodayPositionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TodayPositionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TodayPositionGroupByOutputType[P]>
            : GetScalarType<T[P], TodayPositionGroupByOutputType[P]>
        }
      >
    >


  export type TodayPositionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    seatId?: boolean
    lotteryNumber?: boolean
    userId?: boolean
  }, ExtArgs["result"]["todayPosition"]>

  export type TodayPositionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    seatId?: boolean
    lotteryNumber?: boolean
    userId?: boolean
  }, ExtArgs["result"]["todayPosition"]>

  export type TodayPositionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    seatId?: boolean
    lotteryNumber?: boolean
    userId?: boolean
  }, ExtArgs["result"]["todayPosition"]>

  export type TodayPositionSelectScalar = {
    id?: boolean
    date?: boolean
    seatId?: boolean
    lotteryNumber?: boolean
    userId?: boolean
  }

  export type TodayPositionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "seatId" | "lotteryNumber" | "userId", ExtArgs["result"]["todayPosition"]>

  export type $TodayPositionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "TodayPosition"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      date: Date
      seatId: number
      lotteryNumber: number
      userId: number
    }, ExtArgs["result"]["todayPosition"]>
    composites: {}
  }

  type TodayPositionGetPayload<S extends boolean | null | undefined | TodayPositionDefaultArgs> = $Result.GetResult<Prisma.$TodayPositionPayload, S>

  type TodayPositionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TodayPositionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TodayPositionCountAggregateInputType | true
    }

  export interface TodayPositionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['TodayPosition'], meta: { name: 'TodayPosition' } }
    /**
     * Find zero or one TodayPosition that matches the filter.
     * @param {TodayPositionFindUniqueArgs} args - Arguments to find a TodayPosition
     * @example
     * // Get one TodayPosition
     * const todayPosition = await prisma.todayPosition.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TodayPositionFindUniqueArgs>(args: SelectSubset<T, TodayPositionFindUniqueArgs<ExtArgs>>): Prisma__TodayPositionClient<$Result.GetResult<Prisma.$TodayPositionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one TodayPosition that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TodayPositionFindUniqueOrThrowArgs} args - Arguments to find a TodayPosition
     * @example
     * // Get one TodayPosition
     * const todayPosition = await prisma.todayPosition.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TodayPositionFindUniqueOrThrowArgs>(args: SelectSubset<T, TodayPositionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TodayPositionClient<$Result.GetResult<Prisma.$TodayPositionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TodayPosition that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodayPositionFindFirstArgs} args - Arguments to find a TodayPosition
     * @example
     * // Get one TodayPosition
     * const todayPosition = await prisma.todayPosition.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TodayPositionFindFirstArgs>(args?: SelectSubset<T, TodayPositionFindFirstArgs<ExtArgs>>): Prisma__TodayPositionClient<$Result.GetResult<Prisma.$TodayPositionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first TodayPosition that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodayPositionFindFirstOrThrowArgs} args - Arguments to find a TodayPosition
     * @example
     * // Get one TodayPosition
     * const todayPosition = await prisma.todayPosition.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TodayPositionFindFirstOrThrowArgs>(args?: SelectSubset<T, TodayPositionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TodayPositionClient<$Result.GetResult<Prisma.$TodayPositionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more TodayPositions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodayPositionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all TodayPositions
     * const todayPositions = await prisma.todayPosition.findMany()
     * 
     * // Get first 10 TodayPositions
     * const todayPositions = await prisma.todayPosition.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const todayPositionWithIdOnly = await prisma.todayPosition.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TodayPositionFindManyArgs>(args?: SelectSubset<T, TodayPositionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TodayPositionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a TodayPosition.
     * @param {TodayPositionCreateArgs} args - Arguments to create a TodayPosition.
     * @example
     * // Create one TodayPosition
     * const TodayPosition = await prisma.todayPosition.create({
     *   data: {
     *     // ... data to create a TodayPosition
     *   }
     * })
     * 
     */
    create<T extends TodayPositionCreateArgs>(args: SelectSubset<T, TodayPositionCreateArgs<ExtArgs>>): Prisma__TodayPositionClient<$Result.GetResult<Prisma.$TodayPositionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many TodayPositions.
     * @param {TodayPositionCreateManyArgs} args - Arguments to create many TodayPositions.
     * @example
     * // Create many TodayPositions
     * const todayPosition = await prisma.todayPosition.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TodayPositionCreateManyArgs>(args?: SelectSubset<T, TodayPositionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many TodayPositions and returns the data saved in the database.
     * @param {TodayPositionCreateManyAndReturnArgs} args - Arguments to create many TodayPositions.
     * @example
     * // Create many TodayPositions
     * const todayPosition = await prisma.todayPosition.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many TodayPositions and only return the `id`
     * const todayPositionWithIdOnly = await prisma.todayPosition.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TodayPositionCreateManyAndReturnArgs>(args?: SelectSubset<T, TodayPositionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TodayPositionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a TodayPosition.
     * @param {TodayPositionDeleteArgs} args - Arguments to delete one TodayPosition.
     * @example
     * // Delete one TodayPosition
     * const TodayPosition = await prisma.todayPosition.delete({
     *   where: {
     *     // ... filter to delete one TodayPosition
     *   }
     * })
     * 
     */
    delete<T extends TodayPositionDeleteArgs>(args: SelectSubset<T, TodayPositionDeleteArgs<ExtArgs>>): Prisma__TodayPositionClient<$Result.GetResult<Prisma.$TodayPositionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one TodayPosition.
     * @param {TodayPositionUpdateArgs} args - Arguments to update one TodayPosition.
     * @example
     * // Update one TodayPosition
     * const todayPosition = await prisma.todayPosition.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TodayPositionUpdateArgs>(args: SelectSubset<T, TodayPositionUpdateArgs<ExtArgs>>): Prisma__TodayPositionClient<$Result.GetResult<Prisma.$TodayPositionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more TodayPositions.
     * @param {TodayPositionDeleteManyArgs} args - Arguments to filter TodayPositions to delete.
     * @example
     * // Delete a few TodayPositions
     * const { count } = await prisma.todayPosition.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TodayPositionDeleteManyArgs>(args?: SelectSubset<T, TodayPositionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TodayPositions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodayPositionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many TodayPositions
     * const todayPosition = await prisma.todayPosition.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TodayPositionUpdateManyArgs>(args: SelectSubset<T, TodayPositionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more TodayPositions and returns the data updated in the database.
     * @param {TodayPositionUpdateManyAndReturnArgs} args - Arguments to update many TodayPositions.
     * @example
     * // Update many TodayPositions
     * const todayPosition = await prisma.todayPosition.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more TodayPositions and only return the `id`
     * const todayPositionWithIdOnly = await prisma.todayPosition.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TodayPositionUpdateManyAndReturnArgs>(args: SelectSubset<T, TodayPositionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TodayPositionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one TodayPosition.
     * @param {TodayPositionUpsertArgs} args - Arguments to update or create a TodayPosition.
     * @example
     * // Update or create a TodayPosition
     * const todayPosition = await prisma.todayPosition.upsert({
     *   create: {
     *     // ... data to create a TodayPosition
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the TodayPosition we want to update
     *   }
     * })
     */
    upsert<T extends TodayPositionUpsertArgs>(args: SelectSubset<T, TodayPositionUpsertArgs<ExtArgs>>): Prisma__TodayPositionClient<$Result.GetResult<Prisma.$TodayPositionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of TodayPositions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodayPositionCountArgs} args - Arguments to filter TodayPositions to count.
     * @example
     * // Count the number of TodayPositions
     * const count = await prisma.todayPosition.count({
     *   where: {
     *     // ... the filter for the TodayPositions we want to count
     *   }
     * })
    **/
    count<T extends TodayPositionCountArgs>(
      args?: Subset<T, TodayPositionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TodayPositionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a TodayPosition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodayPositionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TodayPositionAggregateArgs>(args: Subset<T, TodayPositionAggregateArgs>): Prisma.PrismaPromise<GetTodayPositionAggregateType<T>>

    /**
     * Group by TodayPosition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TodayPositionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TodayPositionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TodayPositionGroupByArgs['orderBy'] }
        : { orderBy?: TodayPositionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TodayPositionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTodayPositionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the TodayPosition model
   */
  readonly fields: TodayPositionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for TodayPosition.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TodayPositionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the TodayPosition model
   */
  interface TodayPositionFieldRefs {
    readonly id: FieldRef<"TodayPosition", 'Int'>
    readonly date: FieldRef<"TodayPosition", 'DateTime'>
    readonly seatId: FieldRef<"TodayPosition", 'Int'>
    readonly lotteryNumber: FieldRef<"TodayPosition", 'Int'>
    readonly userId: FieldRef<"TodayPosition", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * TodayPosition findUnique
   */
  export type TodayPositionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TodayPosition
     */
    select?: TodayPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TodayPosition
     */
    omit?: TodayPositionOmit<ExtArgs> | null
    /**
     * Filter, which TodayPosition to fetch.
     */
    where: TodayPositionWhereUniqueInput
  }

  /**
   * TodayPosition findUniqueOrThrow
   */
  export type TodayPositionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TodayPosition
     */
    select?: TodayPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TodayPosition
     */
    omit?: TodayPositionOmit<ExtArgs> | null
    /**
     * Filter, which TodayPosition to fetch.
     */
    where: TodayPositionWhereUniqueInput
  }

  /**
   * TodayPosition findFirst
   */
  export type TodayPositionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TodayPosition
     */
    select?: TodayPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TodayPosition
     */
    omit?: TodayPositionOmit<ExtArgs> | null
    /**
     * Filter, which TodayPosition to fetch.
     */
    where?: TodayPositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TodayPositions to fetch.
     */
    orderBy?: TodayPositionOrderByWithRelationInput | TodayPositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TodayPositions.
     */
    cursor?: TodayPositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TodayPositions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TodayPositions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TodayPositions.
     */
    distinct?: TodayPositionScalarFieldEnum | TodayPositionScalarFieldEnum[]
  }

  /**
   * TodayPosition findFirstOrThrow
   */
  export type TodayPositionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TodayPosition
     */
    select?: TodayPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TodayPosition
     */
    omit?: TodayPositionOmit<ExtArgs> | null
    /**
     * Filter, which TodayPosition to fetch.
     */
    where?: TodayPositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TodayPositions to fetch.
     */
    orderBy?: TodayPositionOrderByWithRelationInput | TodayPositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for TodayPositions.
     */
    cursor?: TodayPositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TodayPositions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TodayPositions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of TodayPositions.
     */
    distinct?: TodayPositionScalarFieldEnum | TodayPositionScalarFieldEnum[]
  }

  /**
   * TodayPosition findMany
   */
  export type TodayPositionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TodayPosition
     */
    select?: TodayPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TodayPosition
     */
    omit?: TodayPositionOmit<ExtArgs> | null
    /**
     * Filter, which TodayPositions to fetch.
     */
    where?: TodayPositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of TodayPositions to fetch.
     */
    orderBy?: TodayPositionOrderByWithRelationInput | TodayPositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing TodayPositions.
     */
    cursor?: TodayPositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` TodayPositions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` TodayPositions.
     */
    skip?: number
    distinct?: TodayPositionScalarFieldEnum | TodayPositionScalarFieldEnum[]
  }

  /**
   * TodayPosition create
   */
  export type TodayPositionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TodayPosition
     */
    select?: TodayPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TodayPosition
     */
    omit?: TodayPositionOmit<ExtArgs> | null
    /**
     * The data needed to create a TodayPosition.
     */
    data: XOR<TodayPositionCreateInput, TodayPositionUncheckedCreateInput>
  }

  /**
   * TodayPosition createMany
   */
  export type TodayPositionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many TodayPositions.
     */
    data: TodayPositionCreateManyInput | TodayPositionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TodayPosition createManyAndReturn
   */
  export type TodayPositionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TodayPosition
     */
    select?: TodayPositionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TodayPosition
     */
    omit?: TodayPositionOmit<ExtArgs> | null
    /**
     * The data used to create many TodayPositions.
     */
    data: TodayPositionCreateManyInput | TodayPositionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * TodayPosition update
   */
  export type TodayPositionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TodayPosition
     */
    select?: TodayPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TodayPosition
     */
    omit?: TodayPositionOmit<ExtArgs> | null
    /**
     * The data needed to update a TodayPosition.
     */
    data: XOR<TodayPositionUpdateInput, TodayPositionUncheckedUpdateInput>
    /**
     * Choose, which TodayPosition to update.
     */
    where: TodayPositionWhereUniqueInput
  }

  /**
   * TodayPosition updateMany
   */
  export type TodayPositionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update TodayPositions.
     */
    data: XOR<TodayPositionUpdateManyMutationInput, TodayPositionUncheckedUpdateManyInput>
    /**
     * Filter which TodayPositions to update
     */
    where?: TodayPositionWhereInput
    /**
     * Limit how many TodayPositions to update.
     */
    limit?: number
  }

  /**
   * TodayPosition updateManyAndReturn
   */
  export type TodayPositionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TodayPosition
     */
    select?: TodayPositionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the TodayPosition
     */
    omit?: TodayPositionOmit<ExtArgs> | null
    /**
     * The data used to update TodayPositions.
     */
    data: XOR<TodayPositionUpdateManyMutationInput, TodayPositionUncheckedUpdateManyInput>
    /**
     * Filter which TodayPositions to update
     */
    where?: TodayPositionWhereInput
    /**
     * Limit how many TodayPositions to update.
     */
    limit?: number
  }

  /**
   * TodayPosition upsert
   */
  export type TodayPositionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TodayPosition
     */
    select?: TodayPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TodayPosition
     */
    omit?: TodayPositionOmit<ExtArgs> | null
    /**
     * The filter to search for the TodayPosition to update in case it exists.
     */
    where: TodayPositionWhereUniqueInput
    /**
     * In case the TodayPosition found by the `where` argument doesn't exist, create a new TodayPosition with this data.
     */
    create: XOR<TodayPositionCreateInput, TodayPositionUncheckedCreateInput>
    /**
     * In case the TodayPosition was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TodayPositionUpdateInput, TodayPositionUncheckedUpdateInput>
  }

  /**
   * TodayPosition delete
   */
  export type TodayPositionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TodayPosition
     */
    select?: TodayPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TodayPosition
     */
    omit?: TodayPositionOmit<ExtArgs> | null
    /**
     * Filter which TodayPosition to delete.
     */
    where: TodayPositionWhereUniqueInput
  }

  /**
   * TodayPosition deleteMany
   */
  export type TodayPositionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which TodayPositions to delete
     */
    where?: TodayPositionWhereInput
    /**
     * Limit how many TodayPositions to delete.
     */
    limit?: number
  }

  /**
   * TodayPosition without action
   */
  export type TodayPositionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TodayPosition
     */
    select?: TodayPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the TodayPosition
     */
    omit?: TodayPositionOmit<ExtArgs> | null
  }


  /**
   * Model PastPosition
   */

  export type AggregatePastPosition = {
    _count: PastPositionCountAggregateOutputType | null
    _avg: PastPositionAvgAggregateOutputType | null
    _sum: PastPositionSumAggregateOutputType | null
    _min: PastPositionMinAggregateOutputType | null
    _max: PastPositionMaxAggregateOutputType | null
  }

  export type PastPositionAvgAggregateOutputType = {
    id: number | null
    seatId: number | null
    lotteryNumber: number | null
    userId: number | null
  }

  export type PastPositionSumAggregateOutputType = {
    id: number | null
    seatId: number | null
    lotteryNumber: number | null
    userId: number | null
  }

  export type PastPositionMinAggregateOutputType = {
    id: number | null
    date: Date | null
    seatId: number | null
    lotteryNumber: number | null
    userId: number | null
  }

  export type PastPositionMaxAggregateOutputType = {
    id: number | null
    date: Date | null
    seatId: number | null
    lotteryNumber: number | null
    userId: number | null
  }

  export type PastPositionCountAggregateOutputType = {
    id: number
    date: number
    seatId: number
    lotteryNumber: number
    userId: number
    _all: number
  }


  export type PastPositionAvgAggregateInputType = {
    id?: true
    seatId?: true
    lotteryNumber?: true
    userId?: true
  }

  export type PastPositionSumAggregateInputType = {
    id?: true
    seatId?: true
    lotteryNumber?: true
    userId?: true
  }

  export type PastPositionMinAggregateInputType = {
    id?: true
    date?: true
    seatId?: true
    lotteryNumber?: true
    userId?: true
  }

  export type PastPositionMaxAggregateInputType = {
    id?: true
    date?: true
    seatId?: true
    lotteryNumber?: true
    userId?: true
  }

  export type PastPositionCountAggregateInputType = {
    id?: true
    date?: true
    seatId?: true
    lotteryNumber?: true
    userId?: true
    _all?: true
  }

  export type PastPositionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PastPosition to aggregate.
     */
    where?: PastPositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PastPositions to fetch.
     */
    orderBy?: PastPositionOrderByWithRelationInput | PastPositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PastPositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PastPositions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PastPositions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PastPositions
    **/
    _count?: true | PastPositionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PastPositionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PastPositionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PastPositionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PastPositionMaxAggregateInputType
  }

  export type GetPastPositionAggregateType<T extends PastPositionAggregateArgs> = {
        [P in keyof T & keyof AggregatePastPosition]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePastPosition[P]>
      : GetScalarType<T[P], AggregatePastPosition[P]>
  }




  export type PastPositionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PastPositionWhereInput
    orderBy?: PastPositionOrderByWithAggregationInput | PastPositionOrderByWithAggregationInput[]
    by: PastPositionScalarFieldEnum[] | PastPositionScalarFieldEnum
    having?: PastPositionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PastPositionCountAggregateInputType | true
    _avg?: PastPositionAvgAggregateInputType
    _sum?: PastPositionSumAggregateInputType
    _min?: PastPositionMinAggregateInputType
    _max?: PastPositionMaxAggregateInputType
  }

  export type PastPositionGroupByOutputType = {
    id: number
    date: Date
    seatId: number
    lotteryNumber: number
    userId: number
    _count: PastPositionCountAggregateOutputType | null
    _avg: PastPositionAvgAggregateOutputType | null
    _sum: PastPositionSumAggregateOutputType | null
    _min: PastPositionMinAggregateOutputType | null
    _max: PastPositionMaxAggregateOutputType | null
  }

  type GetPastPositionGroupByPayload<T extends PastPositionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PastPositionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PastPositionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PastPositionGroupByOutputType[P]>
            : GetScalarType<T[P], PastPositionGroupByOutputType[P]>
        }
      >
    >


  export type PastPositionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    seatId?: boolean
    lotteryNumber?: boolean
    userId?: boolean
  }, ExtArgs["result"]["pastPosition"]>

  export type PastPositionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    seatId?: boolean
    lotteryNumber?: boolean
    userId?: boolean
  }, ExtArgs["result"]["pastPosition"]>

  export type PastPositionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    seatId?: boolean
    lotteryNumber?: boolean
    userId?: boolean
  }, ExtArgs["result"]["pastPosition"]>

  export type PastPositionSelectScalar = {
    id?: boolean
    date?: boolean
    seatId?: boolean
    lotteryNumber?: boolean
    userId?: boolean
  }

  export type PastPositionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "seatId" | "lotteryNumber" | "userId", ExtArgs["result"]["pastPosition"]>

  export type $PastPositionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PastPosition"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      date: Date
      seatId: number
      lotteryNumber: number
      userId: number
    }, ExtArgs["result"]["pastPosition"]>
    composites: {}
  }

  type PastPositionGetPayload<S extends boolean | null | undefined | PastPositionDefaultArgs> = $Result.GetResult<Prisma.$PastPositionPayload, S>

  type PastPositionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PastPositionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PastPositionCountAggregateInputType | true
    }

  export interface PastPositionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PastPosition'], meta: { name: 'PastPosition' } }
    /**
     * Find zero or one PastPosition that matches the filter.
     * @param {PastPositionFindUniqueArgs} args - Arguments to find a PastPosition
     * @example
     * // Get one PastPosition
     * const pastPosition = await prisma.pastPosition.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PastPositionFindUniqueArgs>(args: SelectSubset<T, PastPositionFindUniqueArgs<ExtArgs>>): Prisma__PastPositionClient<$Result.GetResult<Prisma.$PastPositionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PastPosition that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PastPositionFindUniqueOrThrowArgs} args - Arguments to find a PastPosition
     * @example
     * // Get one PastPosition
     * const pastPosition = await prisma.pastPosition.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PastPositionFindUniqueOrThrowArgs>(args: SelectSubset<T, PastPositionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PastPositionClient<$Result.GetResult<Prisma.$PastPositionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PastPosition that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastPositionFindFirstArgs} args - Arguments to find a PastPosition
     * @example
     * // Get one PastPosition
     * const pastPosition = await prisma.pastPosition.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PastPositionFindFirstArgs>(args?: SelectSubset<T, PastPositionFindFirstArgs<ExtArgs>>): Prisma__PastPositionClient<$Result.GetResult<Prisma.$PastPositionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PastPosition that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastPositionFindFirstOrThrowArgs} args - Arguments to find a PastPosition
     * @example
     * // Get one PastPosition
     * const pastPosition = await prisma.pastPosition.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PastPositionFindFirstOrThrowArgs>(args?: SelectSubset<T, PastPositionFindFirstOrThrowArgs<ExtArgs>>): Prisma__PastPositionClient<$Result.GetResult<Prisma.$PastPositionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PastPositions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastPositionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PastPositions
     * const pastPositions = await prisma.pastPosition.findMany()
     * 
     * // Get first 10 PastPositions
     * const pastPositions = await prisma.pastPosition.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pastPositionWithIdOnly = await prisma.pastPosition.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PastPositionFindManyArgs>(args?: SelectSubset<T, PastPositionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PastPositionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PastPosition.
     * @param {PastPositionCreateArgs} args - Arguments to create a PastPosition.
     * @example
     * // Create one PastPosition
     * const PastPosition = await prisma.pastPosition.create({
     *   data: {
     *     // ... data to create a PastPosition
     *   }
     * })
     * 
     */
    create<T extends PastPositionCreateArgs>(args: SelectSubset<T, PastPositionCreateArgs<ExtArgs>>): Prisma__PastPositionClient<$Result.GetResult<Prisma.$PastPositionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PastPositions.
     * @param {PastPositionCreateManyArgs} args - Arguments to create many PastPositions.
     * @example
     * // Create many PastPositions
     * const pastPosition = await prisma.pastPosition.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PastPositionCreateManyArgs>(args?: SelectSubset<T, PastPositionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PastPositions and returns the data saved in the database.
     * @param {PastPositionCreateManyAndReturnArgs} args - Arguments to create many PastPositions.
     * @example
     * // Create many PastPositions
     * const pastPosition = await prisma.pastPosition.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PastPositions and only return the `id`
     * const pastPositionWithIdOnly = await prisma.pastPosition.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PastPositionCreateManyAndReturnArgs>(args?: SelectSubset<T, PastPositionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PastPositionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PastPosition.
     * @param {PastPositionDeleteArgs} args - Arguments to delete one PastPosition.
     * @example
     * // Delete one PastPosition
     * const PastPosition = await prisma.pastPosition.delete({
     *   where: {
     *     // ... filter to delete one PastPosition
     *   }
     * })
     * 
     */
    delete<T extends PastPositionDeleteArgs>(args: SelectSubset<T, PastPositionDeleteArgs<ExtArgs>>): Prisma__PastPositionClient<$Result.GetResult<Prisma.$PastPositionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PastPosition.
     * @param {PastPositionUpdateArgs} args - Arguments to update one PastPosition.
     * @example
     * // Update one PastPosition
     * const pastPosition = await prisma.pastPosition.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PastPositionUpdateArgs>(args: SelectSubset<T, PastPositionUpdateArgs<ExtArgs>>): Prisma__PastPositionClient<$Result.GetResult<Prisma.$PastPositionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PastPositions.
     * @param {PastPositionDeleteManyArgs} args - Arguments to filter PastPositions to delete.
     * @example
     * // Delete a few PastPositions
     * const { count } = await prisma.pastPosition.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PastPositionDeleteManyArgs>(args?: SelectSubset<T, PastPositionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PastPositions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastPositionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PastPositions
     * const pastPosition = await prisma.pastPosition.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PastPositionUpdateManyArgs>(args: SelectSubset<T, PastPositionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PastPositions and returns the data updated in the database.
     * @param {PastPositionUpdateManyAndReturnArgs} args - Arguments to update many PastPositions.
     * @example
     * // Update many PastPositions
     * const pastPosition = await prisma.pastPosition.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PastPositions and only return the `id`
     * const pastPositionWithIdOnly = await prisma.pastPosition.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PastPositionUpdateManyAndReturnArgs>(args: SelectSubset<T, PastPositionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PastPositionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PastPosition.
     * @param {PastPositionUpsertArgs} args - Arguments to update or create a PastPosition.
     * @example
     * // Update or create a PastPosition
     * const pastPosition = await prisma.pastPosition.upsert({
     *   create: {
     *     // ... data to create a PastPosition
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PastPosition we want to update
     *   }
     * })
     */
    upsert<T extends PastPositionUpsertArgs>(args: SelectSubset<T, PastPositionUpsertArgs<ExtArgs>>): Prisma__PastPositionClient<$Result.GetResult<Prisma.$PastPositionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PastPositions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastPositionCountArgs} args - Arguments to filter PastPositions to count.
     * @example
     * // Count the number of PastPositions
     * const count = await prisma.pastPosition.count({
     *   where: {
     *     // ... the filter for the PastPositions we want to count
     *   }
     * })
    **/
    count<T extends PastPositionCountArgs>(
      args?: Subset<T, PastPositionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PastPositionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PastPosition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastPositionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PastPositionAggregateArgs>(args: Subset<T, PastPositionAggregateArgs>): Prisma.PrismaPromise<GetPastPositionAggregateType<T>>

    /**
     * Group by PastPosition.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PastPositionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PastPositionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PastPositionGroupByArgs['orderBy'] }
        : { orderBy?: PastPositionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PastPositionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPastPositionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PastPosition model
   */
  readonly fields: PastPositionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PastPosition.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PastPositionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PastPosition model
   */
  interface PastPositionFieldRefs {
    readonly id: FieldRef<"PastPosition", 'Int'>
    readonly date: FieldRef<"PastPosition", 'DateTime'>
    readonly seatId: FieldRef<"PastPosition", 'Int'>
    readonly lotteryNumber: FieldRef<"PastPosition", 'Int'>
    readonly userId: FieldRef<"PastPosition", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * PastPosition findUnique
   */
  export type PastPositionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PastPosition
     */
    select?: PastPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PastPosition
     */
    omit?: PastPositionOmit<ExtArgs> | null
    /**
     * Filter, which PastPosition to fetch.
     */
    where: PastPositionWhereUniqueInput
  }

  /**
   * PastPosition findUniqueOrThrow
   */
  export type PastPositionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PastPosition
     */
    select?: PastPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PastPosition
     */
    omit?: PastPositionOmit<ExtArgs> | null
    /**
     * Filter, which PastPosition to fetch.
     */
    where: PastPositionWhereUniqueInput
  }

  /**
   * PastPosition findFirst
   */
  export type PastPositionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PastPosition
     */
    select?: PastPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PastPosition
     */
    omit?: PastPositionOmit<ExtArgs> | null
    /**
     * Filter, which PastPosition to fetch.
     */
    where?: PastPositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PastPositions to fetch.
     */
    orderBy?: PastPositionOrderByWithRelationInput | PastPositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PastPositions.
     */
    cursor?: PastPositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PastPositions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PastPositions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PastPositions.
     */
    distinct?: PastPositionScalarFieldEnum | PastPositionScalarFieldEnum[]
  }

  /**
   * PastPosition findFirstOrThrow
   */
  export type PastPositionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PastPosition
     */
    select?: PastPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PastPosition
     */
    omit?: PastPositionOmit<ExtArgs> | null
    /**
     * Filter, which PastPosition to fetch.
     */
    where?: PastPositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PastPositions to fetch.
     */
    orderBy?: PastPositionOrderByWithRelationInput | PastPositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PastPositions.
     */
    cursor?: PastPositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PastPositions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PastPositions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PastPositions.
     */
    distinct?: PastPositionScalarFieldEnum | PastPositionScalarFieldEnum[]
  }

  /**
   * PastPosition findMany
   */
  export type PastPositionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PastPosition
     */
    select?: PastPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PastPosition
     */
    omit?: PastPositionOmit<ExtArgs> | null
    /**
     * Filter, which PastPositions to fetch.
     */
    where?: PastPositionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PastPositions to fetch.
     */
    orderBy?: PastPositionOrderByWithRelationInput | PastPositionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PastPositions.
     */
    cursor?: PastPositionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PastPositions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PastPositions.
     */
    skip?: number
    distinct?: PastPositionScalarFieldEnum | PastPositionScalarFieldEnum[]
  }

  /**
   * PastPosition create
   */
  export type PastPositionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PastPosition
     */
    select?: PastPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PastPosition
     */
    omit?: PastPositionOmit<ExtArgs> | null
    /**
     * The data needed to create a PastPosition.
     */
    data: XOR<PastPositionCreateInput, PastPositionUncheckedCreateInput>
  }

  /**
   * PastPosition createMany
   */
  export type PastPositionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PastPositions.
     */
    data: PastPositionCreateManyInput | PastPositionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PastPosition createManyAndReturn
   */
  export type PastPositionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PastPosition
     */
    select?: PastPositionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PastPosition
     */
    omit?: PastPositionOmit<ExtArgs> | null
    /**
     * The data used to create many PastPositions.
     */
    data: PastPositionCreateManyInput | PastPositionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PastPosition update
   */
  export type PastPositionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PastPosition
     */
    select?: PastPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PastPosition
     */
    omit?: PastPositionOmit<ExtArgs> | null
    /**
     * The data needed to update a PastPosition.
     */
    data: XOR<PastPositionUpdateInput, PastPositionUncheckedUpdateInput>
    /**
     * Choose, which PastPosition to update.
     */
    where: PastPositionWhereUniqueInput
  }

  /**
   * PastPosition updateMany
   */
  export type PastPositionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PastPositions.
     */
    data: XOR<PastPositionUpdateManyMutationInput, PastPositionUncheckedUpdateManyInput>
    /**
     * Filter which PastPositions to update
     */
    where?: PastPositionWhereInput
    /**
     * Limit how many PastPositions to update.
     */
    limit?: number
  }

  /**
   * PastPosition updateManyAndReturn
   */
  export type PastPositionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PastPosition
     */
    select?: PastPositionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PastPosition
     */
    omit?: PastPositionOmit<ExtArgs> | null
    /**
     * The data used to update PastPositions.
     */
    data: XOR<PastPositionUpdateManyMutationInput, PastPositionUncheckedUpdateManyInput>
    /**
     * Filter which PastPositions to update
     */
    where?: PastPositionWhereInput
    /**
     * Limit how many PastPositions to update.
     */
    limit?: number
  }

  /**
   * PastPosition upsert
   */
  export type PastPositionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PastPosition
     */
    select?: PastPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PastPosition
     */
    omit?: PastPositionOmit<ExtArgs> | null
    /**
     * The filter to search for the PastPosition to update in case it exists.
     */
    where: PastPositionWhereUniqueInput
    /**
     * In case the PastPosition found by the `where` argument doesn't exist, create a new PastPosition with this data.
     */
    create: XOR<PastPositionCreateInput, PastPositionUncheckedCreateInput>
    /**
     * In case the PastPosition was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PastPositionUpdateInput, PastPositionUncheckedUpdateInput>
  }

  /**
   * PastPosition delete
   */
  export type PastPositionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PastPosition
     */
    select?: PastPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PastPosition
     */
    omit?: PastPositionOmit<ExtArgs> | null
    /**
     * Filter which PastPosition to delete.
     */
    where: PastPositionWhereUniqueInput
  }

  /**
   * PastPosition deleteMany
   */
  export type PastPositionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PastPositions to delete
     */
    where?: PastPositionWhereInput
    /**
     * Limit how many PastPositions to delete.
     */
    limit?: number
  }

  /**
   * PastPosition without action
   */
  export type PastPositionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PastPosition
     */
    select?: PastPositionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PastPosition
     */
    omit?: PastPositionOmit<ExtArgs> | null
  }


  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    userId: number | null
  }

  export type UserSumAggregateOutputType = {
    userId: number | null
  }

  export type UserMinAggregateOutputType = {
    userId: number | null
    employeeNumber: string | null
    lastName: string | null
    firstName: string | null
    password: string | null
    adminFlag: boolean | null
    deleteFlag: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    userId: number | null
    employeeNumber: string | null
    lastName: string | null
    firstName: string | null
    password: string | null
    adminFlag: boolean | null
    deleteFlag: boolean | null
  }

  export type UserCountAggregateOutputType = {
    userId: number
    employeeNumber: number
    lastName: number
    firstName: number
    password: number
    adminFlag: number
    deleteFlag: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    userId?: true
  }

  export type UserSumAggregateInputType = {
    userId?: true
  }

  export type UserMinAggregateInputType = {
    userId?: true
    employeeNumber?: true
    lastName?: true
    firstName?: true
    password?: true
    adminFlag?: true
    deleteFlag?: true
  }

  export type UserMaxAggregateInputType = {
    userId?: true
    employeeNumber?: true
    lastName?: true
    firstName?: true
    password?: true
    adminFlag?: true
    deleteFlag?: true
  }

  export type UserCountAggregateInputType = {
    userId?: true
    employeeNumber?: true
    lastName?: true
    firstName?: true
    password?: true
    adminFlag?: true
    deleteFlag?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    userId: number
    employeeNumber: string
    lastName: string
    firstName: string
    password: string
    adminFlag: boolean
    deleteFlag: boolean
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    employeeNumber?: boolean
    lastName?: boolean
    firstName?: boolean
    password?: boolean
    adminFlag?: boolean
    deleteFlag?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    employeeNumber?: boolean
    lastName?: boolean
    firstName?: boolean
    password?: boolean
    adminFlag?: boolean
    deleteFlag?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    employeeNumber?: boolean
    lastName?: boolean
    firstName?: boolean
    password?: boolean
    adminFlag?: boolean
    deleteFlag?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    userId?: boolean
    employeeNumber?: boolean
    lastName?: boolean
    firstName?: boolean
    password?: boolean
    adminFlag?: boolean
    deleteFlag?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "employeeNumber" | "lastName" | "firstName" | "password" | "adminFlag" | "deleteFlag", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      userId: number
      employeeNumber: string
      lastName: string
      firstName: string
      password: string
      adminFlag: boolean
      deleteFlag: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const userWithUserIdOnly = await prisma.user.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `userId`
     * const userWithUserIdOnly = await prisma.user.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `userId`
     * const userWithUserIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly userId: FieldRef<"User", 'Int'>
    readonly employeeNumber: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly adminFlag: FieldRef<"User", 'Boolean'>
    readonly deleteFlag: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SeatScalarFieldEnum: {
    Seatid: 'Seatid',
    tableId: 'tableId',
    seatNumber: 'seatNumber',
    isFixed: 'isFixed',
    imageX: 'imageX',
    imageY: 'imageY'
  };

  export type SeatScalarFieldEnum = (typeof SeatScalarFieldEnum)[keyof typeof SeatScalarFieldEnum]


  export const TableScalarFieldEnum: {
    Tableid: 'Tableid',
    name: 'name'
  };

  export type TableScalarFieldEnum = (typeof TableScalarFieldEnum)[keyof typeof TableScalarFieldEnum]


  export const AdjacentTableScalarFieldEnum: {
    AdjacentTableId: 'AdjacentTableId',
    tableId: 'tableId',
    adjacentTableId: 'adjacentTableId'
  };

  export type AdjacentTableScalarFieldEnum = (typeof AdjacentTableScalarFieldEnum)[keyof typeof AdjacentTableScalarFieldEnum]


  export const TodayPositionScalarFieldEnum: {
    id: 'id',
    date: 'date',
    seatId: 'seatId',
    lotteryNumber: 'lotteryNumber',
    userId: 'userId'
  };

  export type TodayPositionScalarFieldEnum = (typeof TodayPositionScalarFieldEnum)[keyof typeof TodayPositionScalarFieldEnum]


  export const PastPositionScalarFieldEnum: {
    id: 'id',
    date: 'date',
    seatId: 'seatId',
    lotteryNumber: 'lotteryNumber',
    userId: 'userId'
  };

  export type PastPositionScalarFieldEnum = (typeof PastPositionScalarFieldEnum)[keyof typeof PastPositionScalarFieldEnum]


  export const UserScalarFieldEnum: {
    userId: 'userId',
    employeeNumber: 'employeeNumber',
    lastName: 'lastName',
    firstName: 'firstName',
    password: 'password',
    adminFlag: 'adminFlag',
    deleteFlag: 'deleteFlag'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type SeatWhereInput = {
    AND?: SeatWhereInput | SeatWhereInput[]
    OR?: SeatWhereInput[]
    NOT?: SeatWhereInput | SeatWhereInput[]
    Seatid?: IntFilter<"Seat"> | number
    tableId?: IntFilter<"Seat"> | number
    seatNumber?: StringFilter<"Seat"> | string
    isFixed?: BoolFilter<"Seat"> | boolean
    imageX?: IntFilter<"Seat"> | number
    imageY?: IntFilter<"Seat"> | number
  }

  export type SeatOrderByWithRelationInput = {
    Seatid?: SortOrder
    tableId?: SortOrder
    seatNumber?: SortOrder
    isFixed?: SortOrder
    imageX?: SortOrder
    imageY?: SortOrder
  }

  export type SeatWhereUniqueInput = Prisma.AtLeast<{
    Seatid?: number
    AND?: SeatWhereInput | SeatWhereInput[]
    OR?: SeatWhereInput[]
    NOT?: SeatWhereInput | SeatWhereInput[]
    tableId?: IntFilter<"Seat"> | number
    seatNumber?: StringFilter<"Seat"> | string
    isFixed?: BoolFilter<"Seat"> | boolean
    imageX?: IntFilter<"Seat"> | number
    imageY?: IntFilter<"Seat"> | number
  }, "Seatid">

  export type SeatOrderByWithAggregationInput = {
    Seatid?: SortOrder
    tableId?: SortOrder
    seatNumber?: SortOrder
    isFixed?: SortOrder
    imageX?: SortOrder
    imageY?: SortOrder
    _count?: SeatCountOrderByAggregateInput
    _avg?: SeatAvgOrderByAggregateInput
    _max?: SeatMaxOrderByAggregateInput
    _min?: SeatMinOrderByAggregateInput
    _sum?: SeatSumOrderByAggregateInput
  }

  export type SeatScalarWhereWithAggregatesInput = {
    AND?: SeatScalarWhereWithAggregatesInput | SeatScalarWhereWithAggregatesInput[]
    OR?: SeatScalarWhereWithAggregatesInput[]
    NOT?: SeatScalarWhereWithAggregatesInput | SeatScalarWhereWithAggregatesInput[]
    Seatid?: IntWithAggregatesFilter<"Seat"> | number
    tableId?: IntWithAggregatesFilter<"Seat"> | number
    seatNumber?: StringWithAggregatesFilter<"Seat"> | string
    isFixed?: BoolWithAggregatesFilter<"Seat"> | boolean
    imageX?: IntWithAggregatesFilter<"Seat"> | number
    imageY?: IntWithAggregatesFilter<"Seat"> | number
  }

  export type TableWhereInput = {
    AND?: TableWhereInput | TableWhereInput[]
    OR?: TableWhereInput[]
    NOT?: TableWhereInput | TableWhereInput[]
    Tableid?: IntFilter<"Table"> | number
    name?: StringFilter<"Table"> | string
  }

  export type TableOrderByWithRelationInput = {
    Tableid?: SortOrder
    name?: SortOrder
  }

  export type TableWhereUniqueInput = Prisma.AtLeast<{
    Tableid?: number
    AND?: TableWhereInput | TableWhereInput[]
    OR?: TableWhereInput[]
    NOT?: TableWhereInput | TableWhereInput[]
    name?: StringFilter<"Table"> | string
  }, "Tableid">

  export type TableOrderByWithAggregationInput = {
    Tableid?: SortOrder
    name?: SortOrder
    _count?: TableCountOrderByAggregateInput
    _avg?: TableAvgOrderByAggregateInput
    _max?: TableMaxOrderByAggregateInput
    _min?: TableMinOrderByAggregateInput
    _sum?: TableSumOrderByAggregateInput
  }

  export type TableScalarWhereWithAggregatesInput = {
    AND?: TableScalarWhereWithAggregatesInput | TableScalarWhereWithAggregatesInput[]
    OR?: TableScalarWhereWithAggregatesInput[]
    NOT?: TableScalarWhereWithAggregatesInput | TableScalarWhereWithAggregatesInput[]
    Tableid?: IntWithAggregatesFilter<"Table"> | number
    name?: StringWithAggregatesFilter<"Table"> | string
  }

  export type AdjacentTableWhereInput = {
    AND?: AdjacentTableWhereInput | AdjacentTableWhereInput[]
    OR?: AdjacentTableWhereInput[]
    NOT?: AdjacentTableWhereInput | AdjacentTableWhereInput[]
    AdjacentTableId?: IntFilter<"AdjacentTable"> | number
    tableId?: IntFilter<"AdjacentTable"> | number
    adjacentTableId?: IntFilter<"AdjacentTable"> | number
  }

  export type AdjacentTableOrderByWithRelationInput = {
    AdjacentTableId?: SortOrder
    tableId?: SortOrder
    adjacentTableId?: SortOrder
  }

  export type AdjacentTableWhereUniqueInput = Prisma.AtLeast<{
    AdjacentTableId?: number
    AND?: AdjacentTableWhereInput | AdjacentTableWhereInput[]
    OR?: AdjacentTableWhereInput[]
    NOT?: AdjacentTableWhereInput | AdjacentTableWhereInput[]
    tableId?: IntFilter<"AdjacentTable"> | number
    adjacentTableId?: IntFilter<"AdjacentTable"> | number
  }, "AdjacentTableId">

  export type AdjacentTableOrderByWithAggregationInput = {
    AdjacentTableId?: SortOrder
    tableId?: SortOrder
    adjacentTableId?: SortOrder
    _count?: AdjacentTableCountOrderByAggregateInput
    _avg?: AdjacentTableAvgOrderByAggregateInput
    _max?: AdjacentTableMaxOrderByAggregateInput
    _min?: AdjacentTableMinOrderByAggregateInput
    _sum?: AdjacentTableSumOrderByAggregateInput
  }

  export type AdjacentTableScalarWhereWithAggregatesInput = {
    AND?: AdjacentTableScalarWhereWithAggregatesInput | AdjacentTableScalarWhereWithAggregatesInput[]
    OR?: AdjacentTableScalarWhereWithAggregatesInput[]
    NOT?: AdjacentTableScalarWhereWithAggregatesInput | AdjacentTableScalarWhereWithAggregatesInput[]
    AdjacentTableId?: IntWithAggregatesFilter<"AdjacentTable"> | number
    tableId?: IntWithAggregatesFilter<"AdjacentTable"> | number
    adjacentTableId?: IntWithAggregatesFilter<"AdjacentTable"> | number
  }

  export type TodayPositionWhereInput = {
    AND?: TodayPositionWhereInput | TodayPositionWhereInput[]
    OR?: TodayPositionWhereInput[]
    NOT?: TodayPositionWhereInput | TodayPositionWhereInput[]
    id?: IntFilter<"TodayPosition"> | number
    date?: DateTimeFilter<"TodayPosition"> | Date | string
    seatId?: IntFilter<"TodayPosition"> | number
    lotteryNumber?: IntFilter<"TodayPosition"> | number
    userId?: IntFilter<"TodayPosition"> | number
  }

  export type TodayPositionOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    seatId?: SortOrder
    lotteryNumber?: SortOrder
    userId?: SortOrder
  }

  export type TodayPositionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: TodayPositionWhereInput | TodayPositionWhereInput[]
    OR?: TodayPositionWhereInput[]
    NOT?: TodayPositionWhereInput | TodayPositionWhereInput[]
    date?: DateTimeFilter<"TodayPosition"> | Date | string
    seatId?: IntFilter<"TodayPosition"> | number
    lotteryNumber?: IntFilter<"TodayPosition"> | number
    userId?: IntFilter<"TodayPosition"> | number
  }, "id">

  export type TodayPositionOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    seatId?: SortOrder
    lotteryNumber?: SortOrder
    userId?: SortOrder
    _count?: TodayPositionCountOrderByAggregateInput
    _avg?: TodayPositionAvgOrderByAggregateInput
    _max?: TodayPositionMaxOrderByAggregateInput
    _min?: TodayPositionMinOrderByAggregateInput
    _sum?: TodayPositionSumOrderByAggregateInput
  }

  export type TodayPositionScalarWhereWithAggregatesInput = {
    AND?: TodayPositionScalarWhereWithAggregatesInput | TodayPositionScalarWhereWithAggregatesInput[]
    OR?: TodayPositionScalarWhereWithAggregatesInput[]
    NOT?: TodayPositionScalarWhereWithAggregatesInput | TodayPositionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"TodayPosition"> | number
    date?: DateTimeWithAggregatesFilter<"TodayPosition"> | Date | string
    seatId?: IntWithAggregatesFilter<"TodayPosition"> | number
    lotteryNumber?: IntWithAggregatesFilter<"TodayPosition"> | number
    userId?: IntWithAggregatesFilter<"TodayPosition"> | number
  }

  export type PastPositionWhereInput = {
    AND?: PastPositionWhereInput | PastPositionWhereInput[]
    OR?: PastPositionWhereInput[]
    NOT?: PastPositionWhereInput | PastPositionWhereInput[]
    id?: IntFilter<"PastPosition"> | number
    date?: DateTimeFilter<"PastPosition"> | Date | string
    seatId?: IntFilter<"PastPosition"> | number
    lotteryNumber?: IntFilter<"PastPosition"> | number
    userId?: IntFilter<"PastPosition"> | number
  }

  export type PastPositionOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    seatId?: SortOrder
    lotteryNumber?: SortOrder
    userId?: SortOrder
  }

  export type PastPositionWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PastPositionWhereInput | PastPositionWhereInput[]
    OR?: PastPositionWhereInput[]
    NOT?: PastPositionWhereInput | PastPositionWhereInput[]
    date?: DateTimeFilter<"PastPosition"> | Date | string
    seatId?: IntFilter<"PastPosition"> | number
    lotteryNumber?: IntFilter<"PastPosition"> | number
    userId?: IntFilter<"PastPosition"> | number
  }, "id">

  export type PastPositionOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    seatId?: SortOrder
    lotteryNumber?: SortOrder
    userId?: SortOrder
    _count?: PastPositionCountOrderByAggregateInput
    _avg?: PastPositionAvgOrderByAggregateInput
    _max?: PastPositionMaxOrderByAggregateInput
    _min?: PastPositionMinOrderByAggregateInput
    _sum?: PastPositionSumOrderByAggregateInput
  }

  export type PastPositionScalarWhereWithAggregatesInput = {
    AND?: PastPositionScalarWhereWithAggregatesInput | PastPositionScalarWhereWithAggregatesInput[]
    OR?: PastPositionScalarWhereWithAggregatesInput[]
    NOT?: PastPositionScalarWhereWithAggregatesInput | PastPositionScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"PastPosition"> | number
    date?: DateTimeWithAggregatesFilter<"PastPosition"> | Date | string
    seatId?: IntWithAggregatesFilter<"PastPosition"> | number
    lotteryNumber?: IntWithAggregatesFilter<"PastPosition"> | number
    userId?: IntWithAggregatesFilter<"PastPosition"> | number
  }

  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    userId?: IntFilter<"User"> | number
    employeeNumber?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    adminFlag?: BoolFilter<"User"> | boolean
    deleteFlag?: BoolFilter<"User"> | boolean
  }

  export type UserOrderByWithRelationInput = {
    userId?: SortOrder
    employeeNumber?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    password?: SortOrder
    adminFlag?: SortOrder
    deleteFlag?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    userId?: number
    employeeNumber?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    lastName?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    adminFlag?: BoolFilter<"User"> | boolean
    deleteFlag?: BoolFilter<"User"> | boolean
  }, "userId" | "employeeNumber">

  export type UserOrderByWithAggregationInput = {
    userId?: SortOrder
    employeeNumber?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    password?: SortOrder
    adminFlag?: SortOrder
    deleteFlag?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    userId?: IntWithAggregatesFilter<"User"> | number
    employeeNumber?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    adminFlag?: BoolWithAggregatesFilter<"User"> | boolean
    deleteFlag?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type SeatCreateInput = {
    tableId: number
    seatNumber: string
    isFixed: boolean
    imageX: number
    imageY: number
  }

  export type SeatUncheckedCreateInput = {
    Seatid?: number
    tableId: number
    seatNumber: string
    isFixed: boolean
    imageX: number
    imageY: number
  }

  export type SeatUpdateInput = {
    tableId?: IntFieldUpdateOperationsInput | number
    seatNumber?: StringFieldUpdateOperationsInput | string
    isFixed?: BoolFieldUpdateOperationsInput | boolean
    imageX?: IntFieldUpdateOperationsInput | number
    imageY?: IntFieldUpdateOperationsInput | number
  }

  export type SeatUncheckedUpdateInput = {
    Seatid?: IntFieldUpdateOperationsInput | number
    tableId?: IntFieldUpdateOperationsInput | number
    seatNumber?: StringFieldUpdateOperationsInput | string
    isFixed?: BoolFieldUpdateOperationsInput | boolean
    imageX?: IntFieldUpdateOperationsInput | number
    imageY?: IntFieldUpdateOperationsInput | number
  }

  export type SeatCreateManyInput = {
    Seatid?: number
    tableId: number
    seatNumber: string
    isFixed: boolean
    imageX: number
    imageY: number
  }

  export type SeatUpdateManyMutationInput = {
    tableId?: IntFieldUpdateOperationsInput | number
    seatNumber?: StringFieldUpdateOperationsInput | string
    isFixed?: BoolFieldUpdateOperationsInput | boolean
    imageX?: IntFieldUpdateOperationsInput | number
    imageY?: IntFieldUpdateOperationsInput | number
  }

  export type SeatUncheckedUpdateManyInput = {
    Seatid?: IntFieldUpdateOperationsInput | number
    tableId?: IntFieldUpdateOperationsInput | number
    seatNumber?: StringFieldUpdateOperationsInput | string
    isFixed?: BoolFieldUpdateOperationsInput | boolean
    imageX?: IntFieldUpdateOperationsInput | number
    imageY?: IntFieldUpdateOperationsInput | number
  }

  export type TableCreateInput = {
    name: string
  }

  export type TableUncheckedCreateInput = {
    Tableid?: number
    name: string
  }

  export type TableUpdateInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TableUncheckedUpdateInput = {
    Tableid?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TableCreateManyInput = {
    Tableid?: number
    name: string
  }

  export type TableUpdateManyMutationInput = {
    name?: StringFieldUpdateOperationsInput | string
  }

  export type TableUncheckedUpdateManyInput = {
    Tableid?: IntFieldUpdateOperationsInput | number
    name?: StringFieldUpdateOperationsInput | string
  }

  export type AdjacentTableCreateInput = {
    tableId: number
    adjacentTableId: number
  }

  export type AdjacentTableUncheckedCreateInput = {
    AdjacentTableId?: number
    tableId: number
    adjacentTableId: number
  }

  export type AdjacentTableUpdateInput = {
    tableId?: IntFieldUpdateOperationsInput | number
    adjacentTableId?: IntFieldUpdateOperationsInput | number
  }

  export type AdjacentTableUncheckedUpdateInput = {
    AdjacentTableId?: IntFieldUpdateOperationsInput | number
    tableId?: IntFieldUpdateOperationsInput | number
    adjacentTableId?: IntFieldUpdateOperationsInput | number
  }

  export type AdjacentTableCreateManyInput = {
    AdjacentTableId?: number
    tableId: number
    adjacentTableId: number
  }

  export type AdjacentTableUpdateManyMutationInput = {
    tableId?: IntFieldUpdateOperationsInput | number
    adjacentTableId?: IntFieldUpdateOperationsInput | number
  }

  export type AdjacentTableUncheckedUpdateManyInput = {
    AdjacentTableId?: IntFieldUpdateOperationsInput | number
    tableId?: IntFieldUpdateOperationsInput | number
    adjacentTableId?: IntFieldUpdateOperationsInput | number
  }

  export type TodayPositionCreateInput = {
    date: Date | string
    seatId: number
    lotteryNumber: number
    userId: number
  }

  export type TodayPositionUncheckedCreateInput = {
    id?: number
    date: Date | string
    seatId: number
    lotteryNumber: number
    userId: number
  }

  export type TodayPositionUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    seatId?: IntFieldUpdateOperationsInput | number
    lotteryNumber?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type TodayPositionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    seatId?: IntFieldUpdateOperationsInput | number
    lotteryNumber?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type TodayPositionCreateManyInput = {
    id?: number
    date: Date | string
    seatId: number
    lotteryNumber: number
    userId: number
  }

  export type TodayPositionUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    seatId?: IntFieldUpdateOperationsInput | number
    lotteryNumber?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type TodayPositionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    seatId?: IntFieldUpdateOperationsInput | number
    lotteryNumber?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type PastPositionCreateInput = {
    date: Date | string
    seatId: number
    lotteryNumber: number
    userId: number
  }

  export type PastPositionUncheckedCreateInput = {
    id?: number
    date: Date | string
    seatId: number
    lotteryNumber: number
    userId: number
  }

  export type PastPositionUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    seatId?: IntFieldUpdateOperationsInput | number
    lotteryNumber?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type PastPositionUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    seatId?: IntFieldUpdateOperationsInput | number
    lotteryNumber?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type PastPositionCreateManyInput = {
    id?: number
    date: Date | string
    seatId: number
    lotteryNumber: number
    userId: number
  }

  export type PastPositionUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    seatId?: IntFieldUpdateOperationsInput | number
    lotteryNumber?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type PastPositionUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    seatId?: IntFieldUpdateOperationsInput | number
    lotteryNumber?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
  }

  export type UserCreateInput = {
    employeeNumber: string
    lastName: string
    firstName: string
    password: string
    adminFlag: boolean
    deleteFlag: boolean
  }

  export type UserUncheckedCreateInput = {
    userId?: number
    employeeNumber: string
    lastName: string
    firstName: string
    password: string
    adminFlag: boolean
    deleteFlag: boolean
  }

  export type UserUpdateInput = {
    employeeNumber?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    adminFlag?: BoolFieldUpdateOperationsInput | boolean
    deleteFlag?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    employeeNumber?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    adminFlag?: BoolFieldUpdateOperationsInput | boolean
    deleteFlag?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserCreateManyInput = {
    userId?: number
    employeeNumber: string
    lastName: string
    firstName: string
    password: string
    adminFlag: boolean
    deleteFlag: boolean
  }

  export type UserUpdateManyMutationInput = {
    employeeNumber?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    adminFlag?: BoolFieldUpdateOperationsInput | boolean
    deleteFlag?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    userId?: IntFieldUpdateOperationsInput | number
    employeeNumber?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    adminFlag?: BoolFieldUpdateOperationsInput | boolean
    deleteFlag?: BoolFieldUpdateOperationsInput | boolean
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SeatCountOrderByAggregateInput = {
    Seatid?: SortOrder
    tableId?: SortOrder
    seatNumber?: SortOrder
    isFixed?: SortOrder
    imageX?: SortOrder
    imageY?: SortOrder
  }

  export type SeatAvgOrderByAggregateInput = {
    Seatid?: SortOrder
    tableId?: SortOrder
    imageX?: SortOrder
    imageY?: SortOrder
  }

  export type SeatMaxOrderByAggregateInput = {
    Seatid?: SortOrder
    tableId?: SortOrder
    seatNumber?: SortOrder
    isFixed?: SortOrder
    imageX?: SortOrder
    imageY?: SortOrder
  }

  export type SeatMinOrderByAggregateInput = {
    Seatid?: SortOrder
    tableId?: SortOrder
    seatNumber?: SortOrder
    isFixed?: SortOrder
    imageX?: SortOrder
    imageY?: SortOrder
  }

  export type SeatSumOrderByAggregateInput = {
    Seatid?: SortOrder
    tableId?: SortOrder
    imageX?: SortOrder
    imageY?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type TableCountOrderByAggregateInput = {
    Tableid?: SortOrder
    name?: SortOrder
  }

  export type TableAvgOrderByAggregateInput = {
    Tableid?: SortOrder
  }

  export type TableMaxOrderByAggregateInput = {
    Tableid?: SortOrder
    name?: SortOrder
  }

  export type TableMinOrderByAggregateInput = {
    Tableid?: SortOrder
    name?: SortOrder
  }

  export type TableSumOrderByAggregateInput = {
    Tableid?: SortOrder
  }

  export type AdjacentTableCountOrderByAggregateInput = {
    AdjacentTableId?: SortOrder
    tableId?: SortOrder
    adjacentTableId?: SortOrder
  }

  export type AdjacentTableAvgOrderByAggregateInput = {
    AdjacentTableId?: SortOrder
    tableId?: SortOrder
    adjacentTableId?: SortOrder
  }

  export type AdjacentTableMaxOrderByAggregateInput = {
    AdjacentTableId?: SortOrder
    tableId?: SortOrder
    adjacentTableId?: SortOrder
  }

  export type AdjacentTableMinOrderByAggregateInput = {
    AdjacentTableId?: SortOrder
    tableId?: SortOrder
    adjacentTableId?: SortOrder
  }

  export type AdjacentTableSumOrderByAggregateInput = {
    AdjacentTableId?: SortOrder
    tableId?: SortOrder
    adjacentTableId?: SortOrder
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type TodayPositionCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    seatId?: SortOrder
    lotteryNumber?: SortOrder
    userId?: SortOrder
  }

  export type TodayPositionAvgOrderByAggregateInput = {
    id?: SortOrder
    seatId?: SortOrder
    lotteryNumber?: SortOrder
    userId?: SortOrder
  }

  export type TodayPositionMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    seatId?: SortOrder
    lotteryNumber?: SortOrder
    userId?: SortOrder
  }

  export type TodayPositionMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    seatId?: SortOrder
    lotteryNumber?: SortOrder
    userId?: SortOrder
  }

  export type TodayPositionSumOrderByAggregateInput = {
    id?: SortOrder
    seatId?: SortOrder
    lotteryNumber?: SortOrder
    userId?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type PastPositionCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    seatId?: SortOrder
    lotteryNumber?: SortOrder
    userId?: SortOrder
  }

  export type PastPositionAvgOrderByAggregateInput = {
    id?: SortOrder
    seatId?: SortOrder
    lotteryNumber?: SortOrder
    userId?: SortOrder
  }

  export type PastPositionMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    seatId?: SortOrder
    lotteryNumber?: SortOrder
    userId?: SortOrder
  }

  export type PastPositionMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    seatId?: SortOrder
    lotteryNumber?: SortOrder
    userId?: SortOrder
  }

  export type PastPositionSumOrderByAggregateInput = {
    id?: SortOrder
    seatId?: SortOrder
    lotteryNumber?: SortOrder
    userId?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    userId?: SortOrder
    employeeNumber?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    password?: SortOrder
    adminFlag?: SortOrder
    deleteFlag?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    userId?: SortOrder
    employeeNumber?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    password?: SortOrder
    adminFlag?: SortOrder
    deleteFlag?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    userId?: SortOrder
    employeeNumber?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    password?: SortOrder
    adminFlag?: SortOrder
    deleteFlag?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}