
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
 * Model M_SEAT
 * 
 */
export type M_SEAT = $Result.DefaultSelection<Prisma.$M_SEATPayload>
/**
 * Model M_SEAT_APPOINT
 * 
 */
export type M_SEAT_APPOINT = $Result.DefaultSelection<Prisma.$M_SEAT_APPOINTPayload>
/**
 * Model T_SEAT_POSITION
 * 
 */
export type T_SEAT_POSITION = $Result.DefaultSelection<Prisma.$T_SEAT_POSITIONPayload>
/**
 * Model M_USER
 * 
 */
export type M_USER = $Result.DefaultSelection<Prisma.$M_USERPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more M_SEATS
 * const m_SEATS = await prisma.m_SEAT.findMany()
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
   * // Fetch zero or more M_SEATS
   * const m_SEATS = await prisma.m_SEAT.findMany()
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
   * `prisma.m_SEAT`: Exposes CRUD operations for the **M_SEAT** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more M_SEATS
    * const m_SEATS = await prisma.m_SEAT.findMany()
    * ```
    */
  get m_SEAT(): Prisma.M_SEATDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.m_SEAT_APPOINT`: Exposes CRUD operations for the **M_SEAT_APPOINT** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more M_SEAT_APPOINTS
    * const m_SEAT_APPOINTS = await prisma.m_SEAT_APPOINT.findMany()
    * ```
    */
  get m_SEAT_APPOINT(): Prisma.M_SEAT_APPOINTDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.t_SEAT_POSITION`: Exposes CRUD operations for the **T_SEAT_POSITION** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more T_SEAT_POSITIONS
    * const t_SEAT_POSITIONS = await prisma.t_SEAT_POSITION.findMany()
    * ```
    */
  get t_SEAT_POSITION(): Prisma.T_SEAT_POSITIONDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.m_USER`: Exposes CRUD operations for the **M_USER** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more M_USERS
    * const m_USERS = await prisma.m_USER.findMany()
    * ```
    */
  get m_USER(): Prisma.M_USERDelegate<ExtArgs, ClientOptions>;
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
   * Prisma Client JS version: 6.9.0
   * Query Engine version: 81e4af48011447c3cc503a190e86995b66d2a28e
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
    M_SEAT: 'M_SEAT',
    M_SEAT_APPOINT: 'M_SEAT_APPOINT',
    T_SEAT_POSITION: 'T_SEAT_POSITION',
    M_USER: 'M_USER'
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
      modelProps: "m_SEAT" | "m_SEAT_APPOINT" | "t_SEAT_POSITION" | "m_USER"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      M_SEAT: {
        payload: Prisma.$M_SEATPayload<ExtArgs>
        fields: Prisma.M_SEATFieldRefs
        operations: {
          findUnique: {
            args: Prisma.M_SEATFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEATPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.M_SEATFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEATPayload>
          }
          findFirst: {
            args: Prisma.M_SEATFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEATPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.M_SEATFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEATPayload>
          }
          findMany: {
            args: Prisma.M_SEATFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEATPayload>[]
          }
          create: {
            args: Prisma.M_SEATCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEATPayload>
          }
          createMany: {
            args: Prisma.M_SEATCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.M_SEATCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEATPayload>[]
          }
          delete: {
            args: Prisma.M_SEATDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEATPayload>
          }
          update: {
            args: Prisma.M_SEATUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEATPayload>
          }
          deleteMany: {
            args: Prisma.M_SEATDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.M_SEATUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.M_SEATUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEATPayload>[]
          }
          upsert: {
            args: Prisma.M_SEATUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEATPayload>
          }
          aggregate: {
            args: Prisma.M_SEATAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateM_SEAT>
          }
          groupBy: {
            args: Prisma.M_SEATGroupByArgs<ExtArgs>
            result: $Utils.Optional<M_SEATGroupByOutputType>[]
          }
          count: {
            args: Prisma.M_SEATCountArgs<ExtArgs>
            result: $Utils.Optional<M_SEATCountAggregateOutputType> | number
          }
        }
      }
      M_SEAT_APPOINT: {
        payload: Prisma.$M_SEAT_APPOINTPayload<ExtArgs>
        fields: Prisma.M_SEAT_APPOINTFieldRefs
        operations: {
          findUnique: {
            args: Prisma.M_SEAT_APPOINTFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEAT_APPOINTPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.M_SEAT_APPOINTFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEAT_APPOINTPayload>
          }
          findFirst: {
            args: Prisma.M_SEAT_APPOINTFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEAT_APPOINTPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.M_SEAT_APPOINTFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEAT_APPOINTPayload>
          }
          findMany: {
            args: Prisma.M_SEAT_APPOINTFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEAT_APPOINTPayload>[]
          }
          create: {
            args: Prisma.M_SEAT_APPOINTCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEAT_APPOINTPayload>
          }
          createMany: {
            args: Prisma.M_SEAT_APPOINTCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.M_SEAT_APPOINTCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEAT_APPOINTPayload>[]
          }
          delete: {
            args: Prisma.M_SEAT_APPOINTDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEAT_APPOINTPayload>
          }
          update: {
            args: Prisma.M_SEAT_APPOINTUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEAT_APPOINTPayload>
          }
          deleteMany: {
            args: Prisma.M_SEAT_APPOINTDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.M_SEAT_APPOINTUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.M_SEAT_APPOINTUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEAT_APPOINTPayload>[]
          }
          upsert: {
            args: Prisma.M_SEAT_APPOINTUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_SEAT_APPOINTPayload>
          }
          aggregate: {
            args: Prisma.M_SEAT_APPOINTAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateM_SEAT_APPOINT>
          }
          groupBy: {
            args: Prisma.M_SEAT_APPOINTGroupByArgs<ExtArgs>
            result: $Utils.Optional<M_SEAT_APPOINTGroupByOutputType>[]
          }
          count: {
            args: Prisma.M_SEAT_APPOINTCountArgs<ExtArgs>
            result: $Utils.Optional<M_SEAT_APPOINTCountAggregateOutputType> | number
          }
        }
      }
      T_SEAT_POSITION: {
        payload: Prisma.$T_SEAT_POSITIONPayload<ExtArgs>
        fields: Prisma.T_SEAT_POSITIONFieldRefs
        operations: {
          findUnique: {
            args: Prisma.T_SEAT_POSITIONFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$T_SEAT_POSITIONPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.T_SEAT_POSITIONFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$T_SEAT_POSITIONPayload>
          }
          findFirst: {
            args: Prisma.T_SEAT_POSITIONFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$T_SEAT_POSITIONPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.T_SEAT_POSITIONFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$T_SEAT_POSITIONPayload>
          }
          findMany: {
            args: Prisma.T_SEAT_POSITIONFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$T_SEAT_POSITIONPayload>[]
          }
          create: {
            args: Prisma.T_SEAT_POSITIONCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$T_SEAT_POSITIONPayload>
          }
          createMany: {
            args: Prisma.T_SEAT_POSITIONCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.T_SEAT_POSITIONCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$T_SEAT_POSITIONPayload>[]
          }
          delete: {
            args: Prisma.T_SEAT_POSITIONDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$T_SEAT_POSITIONPayload>
          }
          update: {
            args: Prisma.T_SEAT_POSITIONUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$T_SEAT_POSITIONPayload>
          }
          deleteMany: {
            args: Prisma.T_SEAT_POSITIONDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.T_SEAT_POSITIONUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.T_SEAT_POSITIONUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$T_SEAT_POSITIONPayload>[]
          }
          upsert: {
            args: Prisma.T_SEAT_POSITIONUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$T_SEAT_POSITIONPayload>
          }
          aggregate: {
            args: Prisma.T_SEAT_POSITIONAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateT_SEAT_POSITION>
          }
          groupBy: {
            args: Prisma.T_SEAT_POSITIONGroupByArgs<ExtArgs>
            result: $Utils.Optional<T_SEAT_POSITIONGroupByOutputType>[]
          }
          count: {
            args: Prisma.T_SEAT_POSITIONCountArgs<ExtArgs>
            result: $Utils.Optional<T_SEAT_POSITIONCountAggregateOutputType> | number
          }
        }
      }
      M_USER: {
        payload: Prisma.$M_USERPayload<ExtArgs>
        fields: Prisma.M_USERFieldRefs
        operations: {
          findUnique: {
            args: Prisma.M_USERFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_USERPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.M_USERFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_USERPayload>
          }
          findFirst: {
            args: Prisma.M_USERFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_USERPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.M_USERFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_USERPayload>
          }
          findMany: {
            args: Prisma.M_USERFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_USERPayload>[]
          }
          create: {
            args: Prisma.M_USERCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_USERPayload>
          }
          createMany: {
            args: Prisma.M_USERCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.M_USERCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_USERPayload>[]
          }
          delete: {
            args: Prisma.M_USERDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_USERPayload>
          }
          update: {
            args: Prisma.M_USERUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_USERPayload>
          }
          deleteMany: {
            args: Prisma.M_USERDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.M_USERUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.M_USERUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_USERPayload>[]
          }
          upsert: {
            args: Prisma.M_USERUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$M_USERPayload>
          }
          aggregate: {
            args: Prisma.M_USERAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateM_USER>
          }
          groupBy: {
            args: Prisma.M_USERGroupByArgs<ExtArgs>
            result: $Utils.Optional<M_USERGroupByOutputType>[]
          }
          count: {
            args: Prisma.M_USERCountArgs<ExtArgs>
            result: $Utils.Optional<M_USERCountAggregateOutputType> | number
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
    m_SEAT?: M_SEATOmit
    m_SEAT_APPOINT?: M_SEAT_APPOINTOmit
    t_SEAT_POSITION?: T_SEAT_POSITIONOmit
    m_USER?: M_USEROmit
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
   * Count Type M_SEATCountOutputType
   */

  export type M_SEATCountOutputType = {
    seatAppointments: number
    seatPositions: number
  }

  export type M_SEATCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seatAppointments?: boolean | M_SEATCountOutputTypeCountSeatAppointmentsArgs
    seatPositions?: boolean | M_SEATCountOutputTypeCountSeatPositionsArgs
  }

  // Custom InputTypes
  /**
   * M_SEATCountOutputType without action
   */
  export type M_SEATCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEATCountOutputType
     */
    select?: M_SEATCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * M_SEATCountOutputType without action
   */
  export type M_SEATCountOutputTypeCountSeatAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: M_SEAT_APPOINTWhereInput
  }

  /**
   * M_SEATCountOutputType without action
   */
  export type M_SEATCountOutputTypeCountSeatPositionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: T_SEAT_POSITIONWhereInput
  }


  /**
   * Count Type M_USERCountOutputType
   */

  export type M_USERCountOutputType = {
    seatAppointments: number
    seatPositions: number
  }

  export type M_USERCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seatAppointments?: boolean | M_USERCountOutputTypeCountSeatAppointmentsArgs
    seatPositions?: boolean | M_USERCountOutputTypeCountSeatPositionsArgs
  }

  // Custom InputTypes
  /**
   * M_USERCountOutputType without action
   */
  export type M_USERCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_USERCountOutputType
     */
    select?: M_USERCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * M_USERCountOutputType without action
   */
  export type M_USERCountOutputTypeCountSeatAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: M_SEAT_APPOINTWhereInput
  }

  /**
   * M_USERCountOutputType without action
   */
  export type M_USERCountOutputTypeCountSeatPositionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: T_SEAT_POSITIONWhereInput
  }


  /**
   * Models
   */

  /**
   * Model M_SEAT
   */

  export type AggregateM_SEAT = {
    _count: M_SEATCountAggregateOutputType | null
    _avg: M_SEATAvgAggregateOutputType | null
    _sum: M_SEATSumAggregateOutputType | null
    _min: M_SEATMinAggregateOutputType | null
    _max: M_SEATMaxAggregateOutputType | null
  }

  export type M_SEATAvgAggregateOutputType = {
    seatNumber: number | null
    status: number | null
    imageX: number | null
    imageY: number | null
  }

  export type M_SEATSumAggregateOutputType = {
    seatNumber: number | null
    status: number | null
    imageX: number | null
    imageY: number | null
  }

  export type M_SEATMinAggregateOutputType = {
    seatId: string | null
    tableId: string | null
    seatNumber: number | null
    status: number | null
    imageX: number | null
    imageY: number | null
  }

  export type M_SEATMaxAggregateOutputType = {
    seatId: string | null
    tableId: string | null
    seatNumber: number | null
    status: number | null
    imageX: number | null
    imageY: number | null
  }

  export type M_SEATCountAggregateOutputType = {
    seatId: number
    tableId: number
    seatNumber: number
    status: number
    imageX: number
    imageY: number
    _all: number
  }


  export type M_SEATAvgAggregateInputType = {
    seatNumber?: true
    status?: true
    imageX?: true
    imageY?: true
  }

  export type M_SEATSumAggregateInputType = {
    seatNumber?: true
    status?: true
    imageX?: true
    imageY?: true
  }

  export type M_SEATMinAggregateInputType = {
    seatId?: true
    tableId?: true
    seatNumber?: true
    status?: true
    imageX?: true
    imageY?: true
  }

  export type M_SEATMaxAggregateInputType = {
    seatId?: true
    tableId?: true
    seatNumber?: true
    status?: true
    imageX?: true
    imageY?: true
  }

  export type M_SEATCountAggregateInputType = {
    seatId?: true
    tableId?: true
    seatNumber?: true
    status?: true
    imageX?: true
    imageY?: true
    _all?: true
  }

  export type M_SEATAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which M_SEAT to aggregate.
     */
    where?: M_SEATWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of M_SEATS to fetch.
     */
    orderBy?: M_SEATOrderByWithRelationInput | M_SEATOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: M_SEATWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` M_SEATS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` M_SEATS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned M_SEATS
    **/
    _count?: true | M_SEATCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: M_SEATAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: M_SEATSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: M_SEATMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: M_SEATMaxAggregateInputType
  }

  export type GetM_SEATAggregateType<T extends M_SEATAggregateArgs> = {
        [P in keyof T & keyof AggregateM_SEAT]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateM_SEAT[P]>
      : GetScalarType<T[P], AggregateM_SEAT[P]>
  }




  export type M_SEATGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: M_SEATWhereInput
    orderBy?: M_SEATOrderByWithAggregationInput | M_SEATOrderByWithAggregationInput[]
    by: M_SEATScalarFieldEnum[] | M_SEATScalarFieldEnum
    having?: M_SEATScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: M_SEATCountAggregateInputType | true
    _avg?: M_SEATAvgAggregateInputType
    _sum?: M_SEATSumAggregateInputType
    _min?: M_SEATMinAggregateInputType
    _max?: M_SEATMaxAggregateInputType
  }

  export type M_SEATGroupByOutputType = {
    seatId: string
    tableId: string
    seatNumber: number
    status: number
    imageX: number
    imageY: number
    _count: M_SEATCountAggregateOutputType | null
    _avg: M_SEATAvgAggregateOutputType | null
    _sum: M_SEATSumAggregateOutputType | null
    _min: M_SEATMinAggregateOutputType | null
    _max: M_SEATMaxAggregateOutputType | null
  }

  type GetM_SEATGroupByPayload<T extends M_SEATGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<M_SEATGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof M_SEATGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], M_SEATGroupByOutputType[P]>
            : GetScalarType<T[P], M_SEATGroupByOutputType[P]>
        }
      >
    >


  export type M_SEATSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    seatId?: boolean
    tableId?: boolean
    seatNumber?: boolean
    status?: boolean
    imageX?: boolean
    imageY?: boolean
    seatAppointments?: boolean | M_SEAT$seatAppointmentsArgs<ExtArgs>
    seatPositions?: boolean | M_SEAT$seatPositionsArgs<ExtArgs>
    _count?: boolean | M_SEATCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["m_SEAT"]>

  export type M_SEATSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    seatId?: boolean
    tableId?: boolean
    seatNumber?: boolean
    status?: boolean
    imageX?: boolean
    imageY?: boolean
  }, ExtArgs["result"]["m_SEAT"]>

  export type M_SEATSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    seatId?: boolean
    tableId?: boolean
    seatNumber?: boolean
    status?: boolean
    imageX?: boolean
    imageY?: boolean
  }, ExtArgs["result"]["m_SEAT"]>

  export type M_SEATSelectScalar = {
    seatId?: boolean
    tableId?: boolean
    seatNumber?: boolean
    status?: boolean
    imageX?: boolean
    imageY?: boolean
  }

  export type M_SEATOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"seatId" | "tableId" | "seatNumber" | "status" | "imageX" | "imageY", ExtArgs["result"]["m_SEAT"]>
  export type M_SEATInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seatAppointments?: boolean | M_SEAT$seatAppointmentsArgs<ExtArgs>
    seatPositions?: boolean | M_SEAT$seatPositionsArgs<ExtArgs>
    _count?: boolean | M_SEATCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type M_SEATIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type M_SEATIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $M_SEATPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "M_SEAT"
    objects: {
      seatAppointments: Prisma.$M_SEAT_APPOINTPayload<ExtArgs>[]
      seatPositions: Prisma.$T_SEAT_POSITIONPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      seatId: string
      tableId: string
      seatNumber: number
      status: number
      imageX: number
      imageY: number
    }, ExtArgs["result"]["m_SEAT"]>
    composites: {}
  }

  type M_SEATGetPayload<S extends boolean | null | undefined | M_SEATDefaultArgs> = $Result.GetResult<Prisma.$M_SEATPayload, S>

  type M_SEATCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<M_SEATFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: M_SEATCountAggregateInputType | true
    }

  export interface M_SEATDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['M_SEAT'], meta: { name: 'M_SEAT' } }
    /**
     * Find zero or one M_SEAT that matches the filter.
     * @param {M_SEATFindUniqueArgs} args - Arguments to find a M_SEAT
     * @example
     * // Get one M_SEAT
     * const m_SEAT = await prisma.m_SEAT.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends M_SEATFindUniqueArgs>(args: SelectSubset<T, M_SEATFindUniqueArgs<ExtArgs>>): Prisma__M_SEATClient<$Result.GetResult<Prisma.$M_SEATPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one M_SEAT that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {M_SEATFindUniqueOrThrowArgs} args - Arguments to find a M_SEAT
     * @example
     * // Get one M_SEAT
     * const m_SEAT = await prisma.m_SEAT.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends M_SEATFindUniqueOrThrowArgs>(args: SelectSubset<T, M_SEATFindUniqueOrThrowArgs<ExtArgs>>): Prisma__M_SEATClient<$Result.GetResult<Prisma.$M_SEATPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first M_SEAT that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_SEATFindFirstArgs} args - Arguments to find a M_SEAT
     * @example
     * // Get one M_SEAT
     * const m_SEAT = await prisma.m_SEAT.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends M_SEATFindFirstArgs>(args?: SelectSubset<T, M_SEATFindFirstArgs<ExtArgs>>): Prisma__M_SEATClient<$Result.GetResult<Prisma.$M_SEATPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first M_SEAT that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_SEATFindFirstOrThrowArgs} args - Arguments to find a M_SEAT
     * @example
     * // Get one M_SEAT
     * const m_SEAT = await prisma.m_SEAT.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends M_SEATFindFirstOrThrowArgs>(args?: SelectSubset<T, M_SEATFindFirstOrThrowArgs<ExtArgs>>): Prisma__M_SEATClient<$Result.GetResult<Prisma.$M_SEATPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more M_SEATS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_SEATFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all M_SEATS
     * const m_SEATS = await prisma.m_SEAT.findMany()
     * 
     * // Get first 10 M_SEATS
     * const m_SEATS = await prisma.m_SEAT.findMany({ take: 10 })
     * 
     * // Only select the `seatId`
     * const m_SEATWithSeatIdOnly = await prisma.m_SEAT.findMany({ select: { seatId: true } })
     * 
     */
    findMany<T extends M_SEATFindManyArgs>(args?: SelectSubset<T, M_SEATFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$M_SEATPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a M_SEAT.
     * @param {M_SEATCreateArgs} args - Arguments to create a M_SEAT.
     * @example
     * // Create one M_SEAT
     * const M_SEAT = await prisma.m_SEAT.create({
     *   data: {
     *     // ... data to create a M_SEAT
     *   }
     * })
     * 
     */
    create<T extends M_SEATCreateArgs>(args: SelectSubset<T, M_SEATCreateArgs<ExtArgs>>): Prisma__M_SEATClient<$Result.GetResult<Prisma.$M_SEATPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many M_SEATS.
     * @param {M_SEATCreateManyArgs} args - Arguments to create many M_SEATS.
     * @example
     * // Create many M_SEATS
     * const m_SEAT = await prisma.m_SEAT.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends M_SEATCreateManyArgs>(args?: SelectSubset<T, M_SEATCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many M_SEATS and returns the data saved in the database.
     * @param {M_SEATCreateManyAndReturnArgs} args - Arguments to create many M_SEATS.
     * @example
     * // Create many M_SEATS
     * const m_SEAT = await prisma.m_SEAT.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many M_SEATS and only return the `seatId`
     * const m_SEATWithSeatIdOnly = await prisma.m_SEAT.createManyAndReturn({
     *   select: { seatId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends M_SEATCreateManyAndReturnArgs>(args?: SelectSubset<T, M_SEATCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$M_SEATPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a M_SEAT.
     * @param {M_SEATDeleteArgs} args - Arguments to delete one M_SEAT.
     * @example
     * // Delete one M_SEAT
     * const M_SEAT = await prisma.m_SEAT.delete({
     *   where: {
     *     // ... filter to delete one M_SEAT
     *   }
     * })
     * 
     */
    delete<T extends M_SEATDeleteArgs>(args: SelectSubset<T, M_SEATDeleteArgs<ExtArgs>>): Prisma__M_SEATClient<$Result.GetResult<Prisma.$M_SEATPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one M_SEAT.
     * @param {M_SEATUpdateArgs} args - Arguments to update one M_SEAT.
     * @example
     * // Update one M_SEAT
     * const m_SEAT = await prisma.m_SEAT.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends M_SEATUpdateArgs>(args: SelectSubset<T, M_SEATUpdateArgs<ExtArgs>>): Prisma__M_SEATClient<$Result.GetResult<Prisma.$M_SEATPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more M_SEATS.
     * @param {M_SEATDeleteManyArgs} args - Arguments to filter M_SEATS to delete.
     * @example
     * // Delete a few M_SEATS
     * const { count } = await prisma.m_SEAT.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends M_SEATDeleteManyArgs>(args?: SelectSubset<T, M_SEATDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more M_SEATS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_SEATUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many M_SEATS
     * const m_SEAT = await prisma.m_SEAT.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends M_SEATUpdateManyArgs>(args: SelectSubset<T, M_SEATUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more M_SEATS and returns the data updated in the database.
     * @param {M_SEATUpdateManyAndReturnArgs} args - Arguments to update many M_SEATS.
     * @example
     * // Update many M_SEATS
     * const m_SEAT = await prisma.m_SEAT.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more M_SEATS and only return the `seatId`
     * const m_SEATWithSeatIdOnly = await prisma.m_SEAT.updateManyAndReturn({
     *   select: { seatId: true },
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
    updateManyAndReturn<T extends M_SEATUpdateManyAndReturnArgs>(args: SelectSubset<T, M_SEATUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$M_SEATPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one M_SEAT.
     * @param {M_SEATUpsertArgs} args - Arguments to update or create a M_SEAT.
     * @example
     * // Update or create a M_SEAT
     * const m_SEAT = await prisma.m_SEAT.upsert({
     *   create: {
     *     // ... data to create a M_SEAT
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the M_SEAT we want to update
     *   }
     * })
     */
    upsert<T extends M_SEATUpsertArgs>(args: SelectSubset<T, M_SEATUpsertArgs<ExtArgs>>): Prisma__M_SEATClient<$Result.GetResult<Prisma.$M_SEATPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of M_SEATS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_SEATCountArgs} args - Arguments to filter M_SEATS to count.
     * @example
     * // Count the number of M_SEATS
     * const count = await prisma.m_SEAT.count({
     *   where: {
     *     // ... the filter for the M_SEATS we want to count
     *   }
     * })
    **/
    count<T extends M_SEATCountArgs>(
      args?: Subset<T, M_SEATCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], M_SEATCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a M_SEAT.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_SEATAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends M_SEATAggregateArgs>(args: Subset<T, M_SEATAggregateArgs>): Prisma.PrismaPromise<GetM_SEATAggregateType<T>>

    /**
     * Group by M_SEAT.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_SEATGroupByArgs} args - Group by arguments.
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
      T extends M_SEATGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: M_SEATGroupByArgs['orderBy'] }
        : { orderBy?: M_SEATGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, M_SEATGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetM_SEATGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the M_SEAT model
   */
  readonly fields: M_SEATFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for M_SEAT.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__M_SEATClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    seatAppointments<T extends M_SEAT$seatAppointmentsArgs<ExtArgs> = {}>(args?: Subset<T, M_SEAT$seatAppointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$M_SEAT_APPOINTPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    seatPositions<T extends M_SEAT$seatPositionsArgs<ExtArgs> = {}>(args?: Subset<T, M_SEAT$seatPositionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$T_SEAT_POSITIONPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the M_SEAT model
   */
  interface M_SEATFieldRefs {
    readonly seatId: FieldRef<"M_SEAT", 'String'>
    readonly tableId: FieldRef<"M_SEAT", 'String'>
    readonly seatNumber: FieldRef<"M_SEAT", 'Int'>
    readonly status: FieldRef<"M_SEAT", 'Int'>
    readonly imageX: FieldRef<"M_SEAT", 'Int'>
    readonly imageY: FieldRef<"M_SEAT", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * M_SEAT findUnique
   */
  export type M_SEATFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT
     */
    select?: M_SEATSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT
     */
    omit?: M_SEATOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEATInclude<ExtArgs> | null
    /**
     * Filter, which M_SEAT to fetch.
     */
    where: M_SEATWhereUniqueInput
  }

  /**
   * M_SEAT findUniqueOrThrow
   */
  export type M_SEATFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT
     */
    select?: M_SEATSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT
     */
    omit?: M_SEATOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEATInclude<ExtArgs> | null
    /**
     * Filter, which M_SEAT to fetch.
     */
    where: M_SEATWhereUniqueInput
  }

  /**
   * M_SEAT findFirst
   */
  export type M_SEATFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT
     */
    select?: M_SEATSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT
     */
    omit?: M_SEATOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEATInclude<ExtArgs> | null
    /**
     * Filter, which M_SEAT to fetch.
     */
    where?: M_SEATWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of M_SEATS to fetch.
     */
    orderBy?: M_SEATOrderByWithRelationInput | M_SEATOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for M_SEATS.
     */
    cursor?: M_SEATWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` M_SEATS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` M_SEATS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of M_SEATS.
     */
    distinct?: M_SEATScalarFieldEnum | M_SEATScalarFieldEnum[]
  }

  /**
   * M_SEAT findFirstOrThrow
   */
  export type M_SEATFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT
     */
    select?: M_SEATSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT
     */
    omit?: M_SEATOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEATInclude<ExtArgs> | null
    /**
     * Filter, which M_SEAT to fetch.
     */
    where?: M_SEATWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of M_SEATS to fetch.
     */
    orderBy?: M_SEATOrderByWithRelationInput | M_SEATOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for M_SEATS.
     */
    cursor?: M_SEATWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` M_SEATS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` M_SEATS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of M_SEATS.
     */
    distinct?: M_SEATScalarFieldEnum | M_SEATScalarFieldEnum[]
  }

  /**
   * M_SEAT findMany
   */
  export type M_SEATFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT
     */
    select?: M_SEATSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT
     */
    omit?: M_SEATOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEATInclude<ExtArgs> | null
    /**
     * Filter, which M_SEATS to fetch.
     */
    where?: M_SEATWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of M_SEATS to fetch.
     */
    orderBy?: M_SEATOrderByWithRelationInput | M_SEATOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing M_SEATS.
     */
    cursor?: M_SEATWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` M_SEATS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` M_SEATS.
     */
    skip?: number
    distinct?: M_SEATScalarFieldEnum | M_SEATScalarFieldEnum[]
  }

  /**
   * M_SEAT create
   */
  export type M_SEATCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT
     */
    select?: M_SEATSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT
     */
    omit?: M_SEATOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEATInclude<ExtArgs> | null
    /**
     * The data needed to create a M_SEAT.
     */
    data: XOR<M_SEATCreateInput, M_SEATUncheckedCreateInput>
  }

  /**
   * M_SEAT createMany
   */
  export type M_SEATCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many M_SEATS.
     */
    data: M_SEATCreateManyInput | M_SEATCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * M_SEAT createManyAndReturn
   */
  export type M_SEATCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT
     */
    select?: M_SEATSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT
     */
    omit?: M_SEATOmit<ExtArgs> | null
    /**
     * The data used to create many M_SEATS.
     */
    data: M_SEATCreateManyInput | M_SEATCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * M_SEAT update
   */
  export type M_SEATUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT
     */
    select?: M_SEATSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT
     */
    omit?: M_SEATOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEATInclude<ExtArgs> | null
    /**
     * The data needed to update a M_SEAT.
     */
    data: XOR<M_SEATUpdateInput, M_SEATUncheckedUpdateInput>
    /**
     * Choose, which M_SEAT to update.
     */
    where: M_SEATWhereUniqueInput
  }

  /**
   * M_SEAT updateMany
   */
  export type M_SEATUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update M_SEATS.
     */
    data: XOR<M_SEATUpdateManyMutationInput, M_SEATUncheckedUpdateManyInput>
    /**
     * Filter which M_SEATS to update
     */
    where?: M_SEATWhereInput
    /**
     * Limit how many M_SEATS to update.
     */
    limit?: number
  }

  /**
   * M_SEAT updateManyAndReturn
   */
  export type M_SEATUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT
     */
    select?: M_SEATSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT
     */
    omit?: M_SEATOmit<ExtArgs> | null
    /**
     * The data used to update M_SEATS.
     */
    data: XOR<M_SEATUpdateManyMutationInput, M_SEATUncheckedUpdateManyInput>
    /**
     * Filter which M_SEATS to update
     */
    where?: M_SEATWhereInput
    /**
     * Limit how many M_SEATS to update.
     */
    limit?: number
  }

  /**
   * M_SEAT upsert
   */
  export type M_SEATUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT
     */
    select?: M_SEATSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT
     */
    omit?: M_SEATOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEATInclude<ExtArgs> | null
    /**
     * The filter to search for the M_SEAT to update in case it exists.
     */
    where: M_SEATWhereUniqueInput
    /**
     * In case the M_SEAT found by the `where` argument doesn't exist, create a new M_SEAT with this data.
     */
    create: XOR<M_SEATCreateInput, M_SEATUncheckedCreateInput>
    /**
     * In case the M_SEAT was found with the provided `where` argument, update it with this data.
     */
    update: XOR<M_SEATUpdateInput, M_SEATUncheckedUpdateInput>
  }

  /**
   * M_SEAT delete
   */
  export type M_SEATDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT
     */
    select?: M_SEATSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT
     */
    omit?: M_SEATOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEATInclude<ExtArgs> | null
    /**
     * Filter which M_SEAT to delete.
     */
    where: M_SEATWhereUniqueInput
  }

  /**
   * M_SEAT deleteMany
   */
  export type M_SEATDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which M_SEATS to delete
     */
    where?: M_SEATWhereInput
    /**
     * Limit how many M_SEATS to delete.
     */
    limit?: number
  }

  /**
   * M_SEAT.seatAppointments
   */
  export type M_SEAT$seatAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT_APPOINT
     */
    select?: M_SEAT_APPOINTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT_APPOINT
     */
    omit?: M_SEAT_APPOINTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEAT_APPOINTInclude<ExtArgs> | null
    where?: M_SEAT_APPOINTWhereInput
    orderBy?: M_SEAT_APPOINTOrderByWithRelationInput | M_SEAT_APPOINTOrderByWithRelationInput[]
    cursor?: M_SEAT_APPOINTWhereUniqueInput
    take?: number
    skip?: number
    distinct?: M_SEAT_APPOINTScalarFieldEnum | M_SEAT_APPOINTScalarFieldEnum[]
  }

  /**
   * M_SEAT.seatPositions
   */
  export type M_SEAT$seatPositionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the T_SEAT_POSITION
     */
    select?: T_SEAT_POSITIONSelect<ExtArgs> | null
    /**
     * Omit specific fields from the T_SEAT_POSITION
     */
    omit?: T_SEAT_POSITIONOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: T_SEAT_POSITIONInclude<ExtArgs> | null
    where?: T_SEAT_POSITIONWhereInput
    orderBy?: T_SEAT_POSITIONOrderByWithRelationInput | T_SEAT_POSITIONOrderByWithRelationInput[]
    cursor?: T_SEAT_POSITIONWhereUniqueInput
    take?: number
    skip?: number
    distinct?: T_SEAT_POSITIONScalarFieldEnum | T_SEAT_POSITIONScalarFieldEnum[]
  }

  /**
   * M_SEAT without action
   */
  export type M_SEATDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT
     */
    select?: M_SEATSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT
     */
    omit?: M_SEATOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEATInclude<ExtArgs> | null
  }


  /**
   * Model M_SEAT_APPOINT
   */

  export type AggregateM_SEAT_APPOINT = {
    _count: M_SEAT_APPOINTCountAggregateOutputType | null
    _avg: M_SEAT_APPOINTAvgAggregateOutputType | null
    _sum: M_SEAT_APPOINTSumAggregateOutputType | null
    _min: M_SEAT_APPOINTMinAggregateOutputType | null
    _max: M_SEAT_APPOINTMaxAggregateOutputType | null
  }

  export type M_SEAT_APPOINTAvgAggregateOutputType = {
    id: number | null
    appointId: number | null
    userId: number | null
  }

  export type M_SEAT_APPOINTSumAggregateOutputType = {
    id: number | null
    appointId: number | null
    userId: number | null
  }

  export type M_SEAT_APPOINTMinAggregateOutputType = {
    id: number | null
    appointId: number | null
    seatId: string | null
    userId: number | null
    startDate: Date | null
    endDate: Date | null
    created: Date | null
    updated: Date | null
  }

  export type M_SEAT_APPOINTMaxAggregateOutputType = {
    id: number | null
    appointId: number | null
    seatId: string | null
    userId: number | null
    startDate: Date | null
    endDate: Date | null
    created: Date | null
    updated: Date | null
  }

  export type M_SEAT_APPOINTCountAggregateOutputType = {
    id: number
    appointId: number
    seatId: number
    userId: number
    startDate: number
    endDate: number
    created: number
    updated: number
    _all: number
  }


  export type M_SEAT_APPOINTAvgAggregateInputType = {
    id?: true
    appointId?: true
    userId?: true
  }

  export type M_SEAT_APPOINTSumAggregateInputType = {
    id?: true
    appointId?: true
    userId?: true
  }

  export type M_SEAT_APPOINTMinAggregateInputType = {
    id?: true
    appointId?: true
    seatId?: true
    userId?: true
    startDate?: true
    endDate?: true
    created?: true
    updated?: true
  }

  export type M_SEAT_APPOINTMaxAggregateInputType = {
    id?: true
    appointId?: true
    seatId?: true
    userId?: true
    startDate?: true
    endDate?: true
    created?: true
    updated?: true
  }

  export type M_SEAT_APPOINTCountAggregateInputType = {
    id?: true
    appointId?: true
    seatId?: true
    userId?: true
    startDate?: true
    endDate?: true
    created?: true
    updated?: true
    _all?: true
  }

  export type M_SEAT_APPOINTAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which M_SEAT_APPOINT to aggregate.
     */
    where?: M_SEAT_APPOINTWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of M_SEAT_APPOINTS to fetch.
     */
    orderBy?: M_SEAT_APPOINTOrderByWithRelationInput | M_SEAT_APPOINTOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: M_SEAT_APPOINTWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` M_SEAT_APPOINTS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` M_SEAT_APPOINTS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned M_SEAT_APPOINTS
    **/
    _count?: true | M_SEAT_APPOINTCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: M_SEAT_APPOINTAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: M_SEAT_APPOINTSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: M_SEAT_APPOINTMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: M_SEAT_APPOINTMaxAggregateInputType
  }

  export type GetM_SEAT_APPOINTAggregateType<T extends M_SEAT_APPOINTAggregateArgs> = {
        [P in keyof T & keyof AggregateM_SEAT_APPOINT]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateM_SEAT_APPOINT[P]>
      : GetScalarType<T[P], AggregateM_SEAT_APPOINT[P]>
  }




  export type M_SEAT_APPOINTGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: M_SEAT_APPOINTWhereInput
    orderBy?: M_SEAT_APPOINTOrderByWithAggregationInput | M_SEAT_APPOINTOrderByWithAggregationInput[]
    by: M_SEAT_APPOINTScalarFieldEnum[] | M_SEAT_APPOINTScalarFieldEnum
    having?: M_SEAT_APPOINTScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: M_SEAT_APPOINTCountAggregateInputType | true
    _avg?: M_SEAT_APPOINTAvgAggregateInputType
    _sum?: M_SEAT_APPOINTSumAggregateInputType
    _min?: M_SEAT_APPOINTMinAggregateInputType
    _max?: M_SEAT_APPOINTMaxAggregateInputType
  }

  export type M_SEAT_APPOINTGroupByOutputType = {
    id: number
    appointId: number
    seatId: string
    userId: number
    startDate: Date
    endDate: Date
    created: Date
    updated: Date | null
    _count: M_SEAT_APPOINTCountAggregateOutputType | null
    _avg: M_SEAT_APPOINTAvgAggregateOutputType | null
    _sum: M_SEAT_APPOINTSumAggregateOutputType | null
    _min: M_SEAT_APPOINTMinAggregateOutputType | null
    _max: M_SEAT_APPOINTMaxAggregateOutputType | null
  }

  type GetM_SEAT_APPOINTGroupByPayload<T extends M_SEAT_APPOINTGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<M_SEAT_APPOINTGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof M_SEAT_APPOINTGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], M_SEAT_APPOINTGroupByOutputType[P]>
            : GetScalarType<T[P], M_SEAT_APPOINTGroupByOutputType[P]>
        }
      >
    >


  export type M_SEAT_APPOINTSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    appointId?: boolean
    seatId?: boolean
    userId?: boolean
    startDate?: boolean
    endDate?: boolean
    created?: boolean
    updated?: boolean
    seat?: boolean | M_SEATDefaultArgs<ExtArgs>
    user?: boolean | M_USERDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["m_SEAT_APPOINT"]>

  export type M_SEAT_APPOINTSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    appointId?: boolean
    seatId?: boolean
    userId?: boolean
    startDate?: boolean
    endDate?: boolean
    created?: boolean
    updated?: boolean
    seat?: boolean | M_SEATDefaultArgs<ExtArgs>
    user?: boolean | M_USERDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["m_SEAT_APPOINT"]>

  export type M_SEAT_APPOINTSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    appointId?: boolean
    seatId?: boolean
    userId?: boolean
    startDate?: boolean
    endDate?: boolean
    created?: boolean
    updated?: boolean
    seat?: boolean | M_SEATDefaultArgs<ExtArgs>
    user?: boolean | M_USERDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["m_SEAT_APPOINT"]>

  export type M_SEAT_APPOINTSelectScalar = {
    id?: boolean
    appointId?: boolean
    seatId?: boolean
    userId?: boolean
    startDate?: boolean
    endDate?: boolean
    created?: boolean
    updated?: boolean
  }

  export type M_SEAT_APPOINTOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "appointId" | "seatId" | "userId" | "startDate" | "endDate" | "created" | "updated", ExtArgs["result"]["m_SEAT_APPOINT"]>
  export type M_SEAT_APPOINTInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seat?: boolean | M_SEATDefaultArgs<ExtArgs>
    user?: boolean | M_USERDefaultArgs<ExtArgs>
  }
  export type M_SEAT_APPOINTIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seat?: boolean | M_SEATDefaultArgs<ExtArgs>
    user?: boolean | M_USERDefaultArgs<ExtArgs>
  }
  export type M_SEAT_APPOINTIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seat?: boolean | M_SEATDefaultArgs<ExtArgs>
    user?: boolean | M_USERDefaultArgs<ExtArgs>
  }

  export type $M_SEAT_APPOINTPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "M_SEAT_APPOINT"
    objects: {
      seat: Prisma.$M_SEATPayload<ExtArgs>
      user: Prisma.$M_USERPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      appointId: number
      seatId: string
      userId: number
      startDate: Date
      endDate: Date
      created: Date
      updated: Date | null
    }, ExtArgs["result"]["m_SEAT_APPOINT"]>
    composites: {}
  }

  type M_SEAT_APPOINTGetPayload<S extends boolean | null | undefined | M_SEAT_APPOINTDefaultArgs> = $Result.GetResult<Prisma.$M_SEAT_APPOINTPayload, S>

  type M_SEAT_APPOINTCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<M_SEAT_APPOINTFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: M_SEAT_APPOINTCountAggregateInputType | true
    }

  export interface M_SEAT_APPOINTDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['M_SEAT_APPOINT'], meta: { name: 'M_SEAT_APPOINT' } }
    /**
     * Find zero or one M_SEAT_APPOINT that matches the filter.
     * @param {M_SEAT_APPOINTFindUniqueArgs} args - Arguments to find a M_SEAT_APPOINT
     * @example
     * // Get one M_SEAT_APPOINT
     * const m_SEAT_APPOINT = await prisma.m_SEAT_APPOINT.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends M_SEAT_APPOINTFindUniqueArgs>(args: SelectSubset<T, M_SEAT_APPOINTFindUniqueArgs<ExtArgs>>): Prisma__M_SEAT_APPOINTClient<$Result.GetResult<Prisma.$M_SEAT_APPOINTPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one M_SEAT_APPOINT that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {M_SEAT_APPOINTFindUniqueOrThrowArgs} args - Arguments to find a M_SEAT_APPOINT
     * @example
     * // Get one M_SEAT_APPOINT
     * const m_SEAT_APPOINT = await prisma.m_SEAT_APPOINT.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends M_SEAT_APPOINTFindUniqueOrThrowArgs>(args: SelectSubset<T, M_SEAT_APPOINTFindUniqueOrThrowArgs<ExtArgs>>): Prisma__M_SEAT_APPOINTClient<$Result.GetResult<Prisma.$M_SEAT_APPOINTPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first M_SEAT_APPOINT that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_SEAT_APPOINTFindFirstArgs} args - Arguments to find a M_SEAT_APPOINT
     * @example
     * // Get one M_SEAT_APPOINT
     * const m_SEAT_APPOINT = await prisma.m_SEAT_APPOINT.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends M_SEAT_APPOINTFindFirstArgs>(args?: SelectSubset<T, M_SEAT_APPOINTFindFirstArgs<ExtArgs>>): Prisma__M_SEAT_APPOINTClient<$Result.GetResult<Prisma.$M_SEAT_APPOINTPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first M_SEAT_APPOINT that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_SEAT_APPOINTFindFirstOrThrowArgs} args - Arguments to find a M_SEAT_APPOINT
     * @example
     * // Get one M_SEAT_APPOINT
     * const m_SEAT_APPOINT = await prisma.m_SEAT_APPOINT.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends M_SEAT_APPOINTFindFirstOrThrowArgs>(args?: SelectSubset<T, M_SEAT_APPOINTFindFirstOrThrowArgs<ExtArgs>>): Prisma__M_SEAT_APPOINTClient<$Result.GetResult<Prisma.$M_SEAT_APPOINTPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more M_SEAT_APPOINTS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_SEAT_APPOINTFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all M_SEAT_APPOINTS
     * const m_SEAT_APPOINTS = await prisma.m_SEAT_APPOINT.findMany()
     * 
     * // Get first 10 M_SEAT_APPOINTS
     * const m_SEAT_APPOINTS = await prisma.m_SEAT_APPOINT.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const m_SEAT_APPOINTWithIdOnly = await prisma.m_SEAT_APPOINT.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends M_SEAT_APPOINTFindManyArgs>(args?: SelectSubset<T, M_SEAT_APPOINTFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$M_SEAT_APPOINTPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a M_SEAT_APPOINT.
     * @param {M_SEAT_APPOINTCreateArgs} args - Arguments to create a M_SEAT_APPOINT.
     * @example
     * // Create one M_SEAT_APPOINT
     * const M_SEAT_APPOINT = await prisma.m_SEAT_APPOINT.create({
     *   data: {
     *     // ... data to create a M_SEAT_APPOINT
     *   }
     * })
     * 
     */
    create<T extends M_SEAT_APPOINTCreateArgs>(args: SelectSubset<T, M_SEAT_APPOINTCreateArgs<ExtArgs>>): Prisma__M_SEAT_APPOINTClient<$Result.GetResult<Prisma.$M_SEAT_APPOINTPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many M_SEAT_APPOINTS.
     * @param {M_SEAT_APPOINTCreateManyArgs} args - Arguments to create many M_SEAT_APPOINTS.
     * @example
     * // Create many M_SEAT_APPOINTS
     * const m_SEAT_APPOINT = await prisma.m_SEAT_APPOINT.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends M_SEAT_APPOINTCreateManyArgs>(args?: SelectSubset<T, M_SEAT_APPOINTCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many M_SEAT_APPOINTS and returns the data saved in the database.
     * @param {M_SEAT_APPOINTCreateManyAndReturnArgs} args - Arguments to create many M_SEAT_APPOINTS.
     * @example
     * // Create many M_SEAT_APPOINTS
     * const m_SEAT_APPOINT = await prisma.m_SEAT_APPOINT.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many M_SEAT_APPOINTS and only return the `id`
     * const m_SEAT_APPOINTWithIdOnly = await prisma.m_SEAT_APPOINT.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends M_SEAT_APPOINTCreateManyAndReturnArgs>(args?: SelectSubset<T, M_SEAT_APPOINTCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$M_SEAT_APPOINTPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a M_SEAT_APPOINT.
     * @param {M_SEAT_APPOINTDeleteArgs} args - Arguments to delete one M_SEAT_APPOINT.
     * @example
     * // Delete one M_SEAT_APPOINT
     * const M_SEAT_APPOINT = await prisma.m_SEAT_APPOINT.delete({
     *   where: {
     *     // ... filter to delete one M_SEAT_APPOINT
     *   }
     * })
     * 
     */
    delete<T extends M_SEAT_APPOINTDeleteArgs>(args: SelectSubset<T, M_SEAT_APPOINTDeleteArgs<ExtArgs>>): Prisma__M_SEAT_APPOINTClient<$Result.GetResult<Prisma.$M_SEAT_APPOINTPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one M_SEAT_APPOINT.
     * @param {M_SEAT_APPOINTUpdateArgs} args - Arguments to update one M_SEAT_APPOINT.
     * @example
     * // Update one M_SEAT_APPOINT
     * const m_SEAT_APPOINT = await prisma.m_SEAT_APPOINT.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends M_SEAT_APPOINTUpdateArgs>(args: SelectSubset<T, M_SEAT_APPOINTUpdateArgs<ExtArgs>>): Prisma__M_SEAT_APPOINTClient<$Result.GetResult<Prisma.$M_SEAT_APPOINTPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more M_SEAT_APPOINTS.
     * @param {M_SEAT_APPOINTDeleteManyArgs} args - Arguments to filter M_SEAT_APPOINTS to delete.
     * @example
     * // Delete a few M_SEAT_APPOINTS
     * const { count } = await prisma.m_SEAT_APPOINT.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends M_SEAT_APPOINTDeleteManyArgs>(args?: SelectSubset<T, M_SEAT_APPOINTDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more M_SEAT_APPOINTS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_SEAT_APPOINTUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many M_SEAT_APPOINTS
     * const m_SEAT_APPOINT = await prisma.m_SEAT_APPOINT.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends M_SEAT_APPOINTUpdateManyArgs>(args: SelectSubset<T, M_SEAT_APPOINTUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more M_SEAT_APPOINTS and returns the data updated in the database.
     * @param {M_SEAT_APPOINTUpdateManyAndReturnArgs} args - Arguments to update many M_SEAT_APPOINTS.
     * @example
     * // Update many M_SEAT_APPOINTS
     * const m_SEAT_APPOINT = await prisma.m_SEAT_APPOINT.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more M_SEAT_APPOINTS and only return the `id`
     * const m_SEAT_APPOINTWithIdOnly = await prisma.m_SEAT_APPOINT.updateManyAndReturn({
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
    updateManyAndReturn<T extends M_SEAT_APPOINTUpdateManyAndReturnArgs>(args: SelectSubset<T, M_SEAT_APPOINTUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$M_SEAT_APPOINTPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one M_SEAT_APPOINT.
     * @param {M_SEAT_APPOINTUpsertArgs} args - Arguments to update or create a M_SEAT_APPOINT.
     * @example
     * // Update or create a M_SEAT_APPOINT
     * const m_SEAT_APPOINT = await prisma.m_SEAT_APPOINT.upsert({
     *   create: {
     *     // ... data to create a M_SEAT_APPOINT
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the M_SEAT_APPOINT we want to update
     *   }
     * })
     */
    upsert<T extends M_SEAT_APPOINTUpsertArgs>(args: SelectSubset<T, M_SEAT_APPOINTUpsertArgs<ExtArgs>>): Prisma__M_SEAT_APPOINTClient<$Result.GetResult<Prisma.$M_SEAT_APPOINTPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of M_SEAT_APPOINTS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_SEAT_APPOINTCountArgs} args - Arguments to filter M_SEAT_APPOINTS to count.
     * @example
     * // Count the number of M_SEAT_APPOINTS
     * const count = await prisma.m_SEAT_APPOINT.count({
     *   where: {
     *     // ... the filter for the M_SEAT_APPOINTS we want to count
     *   }
     * })
    **/
    count<T extends M_SEAT_APPOINTCountArgs>(
      args?: Subset<T, M_SEAT_APPOINTCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], M_SEAT_APPOINTCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a M_SEAT_APPOINT.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_SEAT_APPOINTAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends M_SEAT_APPOINTAggregateArgs>(args: Subset<T, M_SEAT_APPOINTAggregateArgs>): Prisma.PrismaPromise<GetM_SEAT_APPOINTAggregateType<T>>

    /**
     * Group by M_SEAT_APPOINT.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_SEAT_APPOINTGroupByArgs} args - Group by arguments.
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
      T extends M_SEAT_APPOINTGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: M_SEAT_APPOINTGroupByArgs['orderBy'] }
        : { orderBy?: M_SEAT_APPOINTGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, M_SEAT_APPOINTGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetM_SEAT_APPOINTGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the M_SEAT_APPOINT model
   */
  readonly fields: M_SEAT_APPOINTFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for M_SEAT_APPOINT.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__M_SEAT_APPOINTClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    seat<T extends M_SEATDefaultArgs<ExtArgs> = {}>(args?: Subset<T, M_SEATDefaultArgs<ExtArgs>>): Prisma__M_SEATClient<$Result.GetResult<Prisma.$M_SEATPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends M_USERDefaultArgs<ExtArgs> = {}>(args?: Subset<T, M_USERDefaultArgs<ExtArgs>>): Prisma__M_USERClient<$Result.GetResult<Prisma.$M_USERPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the M_SEAT_APPOINT model
   */
  interface M_SEAT_APPOINTFieldRefs {
    readonly id: FieldRef<"M_SEAT_APPOINT", 'Int'>
    readonly appointId: FieldRef<"M_SEAT_APPOINT", 'Int'>
    readonly seatId: FieldRef<"M_SEAT_APPOINT", 'String'>
    readonly userId: FieldRef<"M_SEAT_APPOINT", 'Int'>
    readonly startDate: FieldRef<"M_SEAT_APPOINT", 'DateTime'>
    readonly endDate: FieldRef<"M_SEAT_APPOINT", 'DateTime'>
    readonly created: FieldRef<"M_SEAT_APPOINT", 'DateTime'>
    readonly updated: FieldRef<"M_SEAT_APPOINT", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * M_SEAT_APPOINT findUnique
   */
  export type M_SEAT_APPOINTFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT_APPOINT
     */
    select?: M_SEAT_APPOINTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT_APPOINT
     */
    omit?: M_SEAT_APPOINTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEAT_APPOINTInclude<ExtArgs> | null
    /**
     * Filter, which M_SEAT_APPOINT to fetch.
     */
    where: M_SEAT_APPOINTWhereUniqueInput
  }

  /**
   * M_SEAT_APPOINT findUniqueOrThrow
   */
  export type M_SEAT_APPOINTFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT_APPOINT
     */
    select?: M_SEAT_APPOINTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT_APPOINT
     */
    omit?: M_SEAT_APPOINTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEAT_APPOINTInclude<ExtArgs> | null
    /**
     * Filter, which M_SEAT_APPOINT to fetch.
     */
    where: M_SEAT_APPOINTWhereUniqueInput
  }

  /**
   * M_SEAT_APPOINT findFirst
   */
  export type M_SEAT_APPOINTFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT_APPOINT
     */
    select?: M_SEAT_APPOINTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT_APPOINT
     */
    omit?: M_SEAT_APPOINTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEAT_APPOINTInclude<ExtArgs> | null
    /**
     * Filter, which M_SEAT_APPOINT to fetch.
     */
    where?: M_SEAT_APPOINTWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of M_SEAT_APPOINTS to fetch.
     */
    orderBy?: M_SEAT_APPOINTOrderByWithRelationInput | M_SEAT_APPOINTOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for M_SEAT_APPOINTS.
     */
    cursor?: M_SEAT_APPOINTWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` M_SEAT_APPOINTS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` M_SEAT_APPOINTS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of M_SEAT_APPOINTS.
     */
    distinct?: M_SEAT_APPOINTScalarFieldEnum | M_SEAT_APPOINTScalarFieldEnum[]
  }

  /**
   * M_SEAT_APPOINT findFirstOrThrow
   */
  export type M_SEAT_APPOINTFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT_APPOINT
     */
    select?: M_SEAT_APPOINTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT_APPOINT
     */
    omit?: M_SEAT_APPOINTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEAT_APPOINTInclude<ExtArgs> | null
    /**
     * Filter, which M_SEAT_APPOINT to fetch.
     */
    where?: M_SEAT_APPOINTWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of M_SEAT_APPOINTS to fetch.
     */
    orderBy?: M_SEAT_APPOINTOrderByWithRelationInput | M_SEAT_APPOINTOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for M_SEAT_APPOINTS.
     */
    cursor?: M_SEAT_APPOINTWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` M_SEAT_APPOINTS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` M_SEAT_APPOINTS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of M_SEAT_APPOINTS.
     */
    distinct?: M_SEAT_APPOINTScalarFieldEnum | M_SEAT_APPOINTScalarFieldEnum[]
  }

  /**
   * M_SEAT_APPOINT findMany
   */
  export type M_SEAT_APPOINTFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT_APPOINT
     */
    select?: M_SEAT_APPOINTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT_APPOINT
     */
    omit?: M_SEAT_APPOINTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEAT_APPOINTInclude<ExtArgs> | null
    /**
     * Filter, which M_SEAT_APPOINTS to fetch.
     */
    where?: M_SEAT_APPOINTWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of M_SEAT_APPOINTS to fetch.
     */
    orderBy?: M_SEAT_APPOINTOrderByWithRelationInput | M_SEAT_APPOINTOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing M_SEAT_APPOINTS.
     */
    cursor?: M_SEAT_APPOINTWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` M_SEAT_APPOINTS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` M_SEAT_APPOINTS.
     */
    skip?: number
    distinct?: M_SEAT_APPOINTScalarFieldEnum | M_SEAT_APPOINTScalarFieldEnum[]
  }

  /**
   * M_SEAT_APPOINT create
   */
  export type M_SEAT_APPOINTCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT_APPOINT
     */
    select?: M_SEAT_APPOINTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT_APPOINT
     */
    omit?: M_SEAT_APPOINTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEAT_APPOINTInclude<ExtArgs> | null
    /**
     * The data needed to create a M_SEAT_APPOINT.
     */
    data: XOR<M_SEAT_APPOINTCreateInput, M_SEAT_APPOINTUncheckedCreateInput>
  }

  /**
   * M_SEAT_APPOINT createMany
   */
  export type M_SEAT_APPOINTCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many M_SEAT_APPOINTS.
     */
    data: M_SEAT_APPOINTCreateManyInput | M_SEAT_APPOINTCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * M_SEAT_APPOINT createManyAndReturn
   */
  export type M_SEAT_APPOINTCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT_APPOINT
     */
    select?: M_SEAT_APPOINTSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT_APPOINT
     */
    omit?: M_SEAT_APPOINTOmit<ExtArgs> | null
    /**
     * The data used to create many M_SEAT_APPOINTS.
     */
    data: M_SEAT_APPOINTCreateManyInput | M_SEAT_APPOINTCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEAT_APPOINTIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * M_SEAT_APPOINT update
   */
  export type M_SEAT_APPOINTUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT_APPOINT
     */
    select?: M_SEAT_APPOINTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT_APPOINT
     */
    omit?: M_SEAT_APPOINTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEAT_APPOINTInclude<ExtArgs> | null
    /**
     * The data needed to update a M_SEAT_APPOINT.
     */
    data: XOR<M_SEAT_APPOINTUpdateInput, M_SEAT_APPOINTUncheckedUpdateInput>
    /**
     * Choose, which M_SEAT_APPOINT to update.
     */
    where: M_SEAT_APPOINTWhereUniqueInput
  }

  /**
   * M_SEAT_APPOINT updateMany
   */
  export type M_SEAT_APPOINTUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update M_SEAT_APPOINTS.
     */
    data: XOR<M_SEAT_APPOINTUpdateManyMutationInput, M_SEAT_APPOINTUncheckedUpdateManyInput>
    /**
     * Filter which M_SEAT_APPOINTS to update
     */
    where?: M_SEAT_APPOINTWhereInput
    /**
     * Limit how many M_SEAT_APPOINTS to update.
     */
    limit?: number
  }

  /**
   * M_SEAT_APPOINT updateManyAndReturn
   */
  export type M_SEAT_APPOINTUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT_APPOINT
     */
    select?: M_SEAT_APPOINTSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT_APPOINT
     */
    omit?: M_SEAT_APPOINTOmit<ExtArgs> | null
    /**
     * The data used to update M_SEAT_APPOINTS.
     */
    data: XOR<M_SEAT_APPOINTUpdateManyMutationInput, M_SEAT_APPOINTUncheckedUpdateManyInput>
    /**
     * Filter which M_SEAT_APPOINTS to update
     */
    where?: M_SEAT_APPOINTWhereInput
    /**
     * Limit how many M_SEAT_APPOINTS to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEAT_APPOINTIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * M_SEAT_APPOINT upsert
   */
  export type M_SEAT_APPOINTUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT_APPOINT
     */
    select?: M_SEAT_APPOINTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT_APPOINT
     */
    omit?: M_SEAT_APPOINTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEAT_APPOINTInclude<ExtArgs> | null
    /**
     * The filter to search for the M_SEAT_APPOINT to update in case it exists.
     */
    where: M_SEAT_APPOINTWhereUniqueInput
    /**
     * In case the M_SEAT_APPOINT found by the `where` argument doesn't exist, create a new M_SEAT_APPOINT with this data.
     */
    create: XOR<M_SEAT_APPOINTCreateInput, M_SEAT_APPOINTUncheckedCreateInput>
    /**
     * In case the M_SEAT_APPOINT was found with the provided `where` argument, update it with this data.
     */
    update: XOR<M_SEAT_APPOINTUpdateInput, M_SEAT_APPOINTUncheckedUpdateInput>
  }

  /**
   * M_SEAT_APPOINT delete
   */
  export type M_SEAT_APPOINTDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT_APPOINT
     */
    select?: M_SEAT_APPOINTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT_APPOINT
     */
    omit?: M_SEAT_APPOINTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEAT_APPOINTInclude<ExtArgs> | null
    /**
     * Filter which M_SEAT_APPOINT to delete.
     */
    where: M_SEAT_APPOINTWhereUniqueInput
  }

  /**
   * M_SEAT_APPOINT deleteMany
   */
  export type M_SEAT_APPOINTDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which M_SEAT_APPOINTS to delete
     */
    where?: M_SEAT_APPOINTWhereInput
    /**
     * Limit how many M_SEAT_APPOINTS to delete.
     */
    limit?: number
  }

  /**
   * M_SEAT_APPOINT without action
   */
  export type M_SEAT_APPOINTDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT_APPOINT
     */
    select?: M_SEAT_APPOINTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT_APPOINT
     */
    omit?: M_SEAT_APPOINTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEAT_APPOINTInclude<ExtArgs> | null
  }


  /**
   * Model T_SEAT_POSITION
   */

  export type AggregateT_SEAT_POSITION = {
    _count: T_SEAT_POSITIONCountAggregateOutputType | null
    _avg: T_SEAT_POSITIONAvgAggregateOutputType | null
    _sum: T_SEAT_POSITIONSumAggregateOutputType | null
    _min: T_SEAT_POSITIONMinAggregateOutputType | null
    _max: T_SEAT_POSITIONMaxAggregateOutputType | null
  }

  export type T_SEAT_POSITIONAvgAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type T_SEAT_POSITIONSumAggregateOutputType = {
    id: number | null
    userId: number | null
  }

  export type T_SEAT_POSITIONMinAggregateOutputType = {
    id: number | null
    date: Date | null
    seatId: string | null
    userId: number | null
    created: Date | null
    updated: Date | null
  }

  export type T_SEAT_POSITIONMaxAggregateOutputType = {
    id: number | null
    date: Date | null
    seatId: string | null
    userId: number | null
    created: Date | null
    updated: Date | null
  }

  export type T_SEAT_POSITIONCountAggregateOutputType = {
    id: number
    date: number
    seatId: number
    userId: number
    created: number
    updated: number
    _all: number
  }


  export type T_SEAT_POSITIONAvgAggregateInputType = {
    id?: true
    userId?: true
  }

  export type T_SEAT_POSITIONSumAggregateInputType = {
    id?: true
    userId?: true
  }

  export type T_SEAT_POSITIONMinAggregateInputType = {
    id?: true
    date?: true
    seatId?: true
    userId?: true
    created?: true
    updated?: true
  }

  export type T_SEAT_POSITIONMaxAggregateInputType = {
    id?: true
    date?: true
    seatId?: true
    userId?: true
    created?: true
    updated?: true
  }

  export type T_SEAT_POSITIONCountAggregateInputType = {
    id?: true
    date?: true
    seatId?: true
    userId?: true
    created?: true
    updated?: true
    _all?: true
  }

  export type T_SEAT_POSITIONAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which T_SEAT_POSITION to aggregate.
     */
    where?: T_SEAT_POSITIONWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of T_SEAT_POSITIONS to fetch.
     */
    orderBy?: T_SEAT_POSITIONOrderByWithRelationInput | T_SEAT_POSITIONOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: T_SEAT_POSITIONWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` T_SEAT_POSITIONS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` T_SEAT_POSITIONS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned T_SEAT_POSITIONS
    **/
    _count?: true | T_SEAT_POSITIONCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: T_SEAT_POSITIONAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: T_SEAT_POSITIONSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: T_SEAT_POSITIONMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: T_SEAT_POSITIONMaxAggregateInputType
  }

  export type GetT_SEAT_POSITIONAggregateType<T extends T_SEAT_POSITIONAggregateArgs> = {
        [P in keyof T & keyof AggregateT_SEAT_POSITION]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateT_SEAT_POSITION[P]>
      : GetScalarType<T[P], AggregateT_SEAT_POSITION[P]>
  }




  export type T_SEAT_POSITIONGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: T_SEAT_POSITIONWhereInput
    orderBy?: T_SEAT_POSITIONOrderByWithAggregationInput | T_SEAT_POSITIONOrderByWithAggregationInput[]
    by: T_SEAT_POSITIONScalarFieldEnum[] | T_SEAT_POSITIONScalarFieldEnum
    having?: T_SEAT_POSITIONScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: T_SEAT_POSITIONCountAggregateInputType | true
    _avg?: T_SEAT_POSITIONAvgAggregateInputType
    _sum?: T_SEAT_POSITIONSumAggregateInputType
    _min?: T_SEAT_POSITIONMinAggregateInputType
    _max?: T_SEAT_POSITIONMaxAggregateInputType
  }

  export type T_SEAT_POSITIONGroupByOutputType = {
    id: number
    date: Date
    seatId: string
    userId: number
    created: Date
    updated: Date | null
    _count: T_SEAT_POSITIONCountAggregateOutputType | null
    _avg: T_SEAT_POSITIONAvgAggregateOutputType | null
    _sum: T_SEAT_POSITIONSumAggregateOutputType | null
    _min: T_SEAT_POSITIONMinAggregateOutputType | null
    _max: T_SEAT_POSITIONMaxAggregateOutputType | null
  }

  type GetT_SEAT_POSITIONGroupByPayload<T extends T_SEAT_POSITIONGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<T_SEAT_POSITIONGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof T_SEAT_POSITIONGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], T_SEAT_POSITIONGroupByOutputType[P]>
            : GetScalarType<T[P], T_SEAT_POSITIONGroupByOutputType[P]>
        }
      >
    >


  export type T_SEAT_POSITIONSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    seatId?: boolean
    userId?: boolean
    created?: boolean
    updated?: boolean
    seat?: boolean | M_SEATDefaultArgs<ExtArgs>
    user?: boolean | M_USERDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["t_SEAT_POSITION"]>

  export type T_SEAT_POSITIONSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    seatId?: boolean
    userId?: boolean
    created?: boolean
    updated?: boolean
    seat?: boolean | M_SEATDefaultArgs<ExtArgs>
    user?: boolean | M_USERDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["t_SEAT_POSITION"]>

  export type T_SEAT_POSITIONSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    date?: boolean
    seatId?: boolean
    userId?: boolean
    created?: boolean
    updated?: boolean
    seat?: boolean | M_SEATDefaultArgs<ExtArgs>
    user?: boolean | M_USERDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["t_SEAT_POSITION"]>

  export type T_SEAT_POSITIONSelectScalar = {
    id?: boolean
    date?: boolean
    seatId?: boolean
    userId?: boolean
    created?: boolean
    updated?: boolean
  }

  export type T_SEAT_POSITIONOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "date" | "seatId" | "userId" | "created" | "updated", ExtArgs["result"]["t_SEAT_POSITION"]>
  export type T_SEAT_POSITIONInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seat?: boolean | M_SEATDefaultArgs<ExtArgs>
    user?: boolean | M_USERDefaultArgs<ExtArgs>
  }
  export type T_SEAT_POSITIONIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seat?: boolean | M_SEATDefaultArgs<ExtArgs>
    user?: boolean | M_USERDefaultArgs<ExtArgs>
  }
  export type T_SEAT_POSITIONIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seat?: boolean | M_SEATDefaultArgs<ExtArgs>
    user?: boolean | M_USERDefaultArgs<ExtArgs>
  }

  export type $T_SEAT_POSITIONPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "T_SEAT_POSITION"
    objects: {
      seat: Prisma.$M_SEATPayload<ExtArgs>
      user: Prisma.$M_USERPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      date: Date
      seatId: string
      userId: number
      created: Date
      updated: Date | null
    }, ExtArgs["result"]["t_SEAT_POSITION"]>
    composites: {}
  }

  type T_SEAT_POSITIONGetPayload<S extends boolean | null | undefined | T_SEAT_POSITIONDefaultArgs> = $Result.GetResult<Prisma.$T_SEAT_POSITIONPayload, S>

  type T_SEAT_POSITIONCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<T_SEAT_POSITIONFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: T_SEAT_POSITIONCountAggregateInputType | true
    }

  export interface T_SEAT_POSITIONDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['T_SEAT_POSITION'], meta: { name: 'T_SEAT_POSITION' } }
    /**
     * Find zero or one T_SEAT_POSITION that matches the filter.
     * @param {T_SEAT_POSITIONFindUniqueArgs} args - Arguments to find a T_SEAT_POSITION
     * @example
     * // Get one T_SEAT_POSITION
     * const t_SEAT_POSITION = await prisma.t_SEAT_POSITION.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends T_SEAT_POSITIONFindUniqueArgs>(args: SelectSubset<T, T_SEAT_POSITIONFindUniqueArgs<ExtArgs>>): Prisma__T_SEAT_POSITIONClient<$Result.GetResult<Prisma.$T_SEAT_POSITIONPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one T_SEAT_POSITION that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {T_SEAT_POSITIONFindUniqueOrThrowArgs} args - Arguments to find a T_SEAT_POSITION
     * @example
     * // Get one T_SEAT_POSITION
     * const t_SEAT_POSITION = await prisma.t_SEAT_POSITION.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends T_SEAT_POSITIONFindUniqueOrThrowArgs>(args: SelectSubset<T, T_SEAT_POSITIONFindUniqueOrThrowArgs<ExtArgs>>): Prisma__T_SEAT_POSITIONClient<$Result.GetResult<Prisma.$T_SEAT_POSITIONPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first T_SEAT_POSITION that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {T_SEAT_POSITIONFindFirstArgs} args - Arguments to find a T_SEAT_POSITION
     * @example
     * // Get one T_SEAT_POSITION
     * const t_SEAT_POSITION = await prisma.t_SEAT_POSITION.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends T_SEAT_POSITIONFindFirstArgs>(args?: SelectSubset<T, T_SEAT_POSITIONFindFirstArgs<ExtArgs>>): Prisma__T_SEAT_POSITIONClient<$Result.GetResult<Prisma.$T_SEAT_POSITIONPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first T_SEAT_POSITION that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {T_SEAT_POSITIONFindFirstOrThrowArgs} args - Arguments to find a T_SEAT_POSITION
     * @example
     * // Get one T_SEAT_POSITION
     * const t_SEAT_POSITION = await prisma.t_SEAT_POSITION.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends T_SEAT_POSITIONFindFirstOrThrowArgs>(args?: SelectSubset<T, T_SEAT_POSITIONFindFirstOrThrowArgs<ExtArgs>>): Prisma__T_SEAT_POSITIONClient<$Result.GetResult<Prisma.$T_SEAT_POSITIONPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more T_SEAT_POSITIONS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {T_SEAT_POSITIONFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all T_SEAT_POSITIONS
     * const t_SEAT_POSITIONS = await prisma.t_SEAT_POSITION.findMany()
     * 
     * // Get first 10 T_SEAT_POSITIONS
     * const t_SEAT_POSITIONS = await prisma.t_SEAT_POSITION.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const t_SEAT_POSITIONWithIdOnly = await prisma.t_SEAT_POSITION.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends T_SEAT_POSITIONFindManyArgs>(args?: SelectSubset<T, T_SEAT_POSITIONFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$T_SEAT_POSITIONPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a T_SEAT_POSITION.
     * @param {T_SEAT_POSITIONCreateArgs} args - Arguments to create a T_SEAT_POSITION.
     * @example
     * // Create one T_SEAT_POSITION
     * const T_SEAT_POSITION = await prisma.t_SEAT_POSITION.create({
     *   data: {
     *     // ... data to create a T_SEAT_POSITION
     *   }
     * })
     * 
     */
    create<T extends T_SEAT_POSITIONCreateArgs>(args: SelectSubset<T, T_SEAT_POSITIONCreateArgs<ExtArgs>>): Prisma__T_SEAT_POSITIONClient<$Result.GetResult<Prisma.$T_SEAT_POSITIONPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many T_SEAT_POSITIONS.
     * @param {T_SEAT_POSITIONCreateManyArgs} args - Arguments to create many T_SEAT_POSITIONS.
     * @example
     * // Create many T_SEAT_POSITIONS
     * const t_SEAT_POSITION = await prisma.t_SEAT_POSITION.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends T_SEAT_POSITIONCreateManyArgs>(args?: SelectSubset<T, T_SEAT_POSITIONCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many T_SEAT_POSITIONS and returns the data saved in the database.
     * @param {T_SEAT_POSITIONCreateManyAndReturnArgs} args - Arguments to create many T_SEAT_POSITIONS.
     * @example
     * // Create many T_SEAT_POSITIONS
     * const t_SEAT_POSITION = await prisma.t_SEAT_POSITION.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many T_SEAT_POSITIONS and only return the `id`
     * const t_SEAT_POSITIONWithIdOnly = await prisma.t_SEAT_POSITION.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends T_SEAT_POSITIONCreateManyAndReturnArgs>(args?: SelectSubset<T, T_SEAT_POSITIONCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$T_SEAT_POSITIONPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a T_SEAT_POSITION.
     * @param {T_SEAT_POSITIONDeleteArgs} args - Arguments to delete one T_SEAT_POSITION.
     * @example
     * // Delete one T_SEAT_POSITION
     * const T_SEAT_POSITION = await prisma.t_SEAT_POSITION.delete({
     *   where: {
     *     // ... filter to delete one T_SEAT_POSITION
     *   }
     * })
     * 
     */
    delete<T extends T_SEAT_POSITIONDeleteArgs>(args: SelectSubset<T, T_SEAT_POSITIONDeleteArgs<ExtArgs>>): Prisma__T_SEAT_POSITIONClient<$Result.GetResult<Prisma.$T_SEAT_POSITIONPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one T_SEAT_POSITION.
     * @param {T_SEAT_POSITIONUpdateArgs} args - Arguments to update one T_SEAT_POSITION.
     * @example
     * // Update one T_SEAT_POSITION
     * const t_SEAT_POSITION = await prisma.t_SEAT_POSITION.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends T_SEAT_POSITIONUpdateArgs>(args: SelectSubset<T, T_SEAT_POSITIONUpdateArgs<ExtArgs>>): Prisma__T_SEAT_POSITIONClient<$Result.GetResult<Prisma.$T_SEAT_POSITIONPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more T_SEAT_POSITIONS.
     * @param {T_SEAT_POSITIONDeleteManyArgs} args - Arguments to filter T_SEAT_POSITIONS to delete.
     * @example
     * // Delete a few T_SEAT_POSITIONS
     * const { count } = await prisma.t_SEAT_POSITION.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends T_SEAT_POSITIONDeleteManyArgs>(args?: SelectSubset<T, T_SEAT_POSITIONDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more T_SEAT_POSITIONS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {T_SEAT_POSITIONUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many T_SEAT_POSITIONS
     * const t_SEAT_POSITION = await prisma.t_SEAT_POSITION.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends T_SEAT_POSITIONUpdateManyArgs>(args: SelectSubset<T, T_SEAT_POSITIONUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more T_SEAT_POSITIONS and returns the data updated in the database.
     * @param {T_SEAT_POSITIONUpdateManyAndReturnArgs} args - Arguments to update many T_SEAT_POSITIONS.
     * @example
     * // Update many T_SEAT_POSITIONS
     * const t_SEAT_POSITION = await prisma.t_SEAT_POSITION.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more T_SEAT_POSITIONS and only return the `id`
     * const t_SEAT_POSITIONWithIdOnly = await prisma.t_SEAT_POSITION.updateManyAndReturn({
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
    updateManyAndReturn<T extends T_SEAT_POSITIONUpdateManyAndReturnArgs>(args: SelectSubset<T, T_SEAT_POSITIONUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$T_SEAT_POSITIONPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one T_SEAT_POSITION.
     * @param {T_SEAT_POSITIONUpsertArgs} args - Arguments to update or create a T_SEAT_POSITION.
     * @example
     * // Update or create a T_SEAT_POSITION
     * const t_SEAT_POSITION = await prisma.t_SEAT_POSITION.upsert({
     *   create: {
     *     // ... data to create a T_SEAT_POSITION
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the T_SEAT_POSITION we want to update
     *   }
     * })
     */
    upsert<T extends T_SEAT_POSITIONUpsertArgs>(args: SelectSubset<T, T_SEAT_POSITIONUpsertArgs<ExtArgs>>): Prisma__T_SEAT_POSITIONClient<$Result.GetResult<Prisma.$T_SEAT_POSITIONPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of T_SEAT_POSITIONS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {T_SEAT_POSITIONCountArgs} args - Arguments to filter T_SEAT_POSITIONS to count.
     * @example
     * // Count the number of T_SEAT_POSITIONS
     * const count = await prisma.t_SEAT_POSITION.count({
     *   where: {
     *     // ... the filter for the T_SEAT_POSITIONS we want to count
     *   }
     * })
    **/
    count<T extends T_SEAT_POSITIONCountArgs>(
      args?: Subset<T, T_SEAT_POSITIONCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], T_SEAT_POSITIONCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a T_SEAT_POSITION.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {T_SEAT_POSITIONAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends T_SEAT_POSITIONAggregateArgs>(args: Subset<T, T_SEAT_POSITIONAggregateArgs>): Prisma.PrismaPromise<GetT_SEAT_POSITIONAggregateType<T>>

    /**
     * Group by T_SEAT_POSITION.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {T_SEAT_POSITIONGroupByArgs} args - Group by arguments.
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
      T extends T_SEAT_POSITIONGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: T_SEAT_POSITIONGroupByArgs['orderBy'] }
        : { orderBy?: T_SEAT_POSITIONGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, T_SEAT_POSITIONGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetT_SEAT_POSITIONGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the T_SEAT_POSITION model
   */
  readonly fields: T_SEAT_POSITIONFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for T_SEAT_POSITION.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__T_SEAT_POSITIONClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    seat<T extends M_SEATDefaultArgs<ExtArgs> = {}>(args?: Subset<T, M_SEATDefaultArgs<ExtArgs>>): Prisma__M_SEATClient<$Result.GetResult<Prisma.$M_SEATPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends M_USERDefaultArgs<ExtArgs> = {}>(args?: Subset<T, M_USERDefaultArgs<ExtArgs>>): Prisma__M_USERClient<$Result.GetResult<Prisma.$M_USERPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
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
   * Fields of the T_SEAT_POSITION model
   */
  interface T_SEAT_POSITIONFieldRefs {
    readonly id: FieldRef<"T_SEAT_POSITION", 'Int'>
    readonly date: FieldRef<"T_SEAT_POSITION", 'DateTime'>
    readonly seatId: FieldRef<"T_SEAT_POSITION", 'String'>
    readonly userId: FieldRef<"T_SEAT_POSITION", 'Int'>
    readonly created: FieldRef<"T_SEAT_POSITION", 'DateTime'>
    readonly updated: FieldRef<"T_SEAT_POSITION", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * T_SEAT_POSITION findUnique
   */
  export type T_SEAT_POSITIONFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the T_SEAT_POSITION
     */
    select?: T_SEAT_POSITIONSelect<ExtArgs> | null
    /**
     * Omit specific fields from the T_SEAT_POSITION
     */
    omit?: T_SEAT_POSITIONOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: T_SEAT_POSITIONInclude<ExtArgs> | null
    /**
     * Filter, which T_SEAT_POSITION to fetch.
     */
    where: T_SEAT_POSITIONWhereUniqueInput
  }

  /**
   * T_SEAT_POSITION findUniqueOrThrow
   */
  export type T_SEAT_POSITIONFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the T_SEAT_POSITION
     */
    select?: T_SEAT_POSITIONSelect<ExtArgs> | null
    /**
     * Omit specific fields from the T_SEAT_POSITION
     */
    omit?: T_SEAT_POSITIONOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: T_SEAT_POSITIONInclude<ExtArgs> | null
    /**
     * Filter, which T_SEAT_POSITION to fetch.
     */
    where: T_SEAT_POSITIONWhereUniqueInput
  }

  /**
   * T_SEAT_POSITION findFirst
   */
  export type T_SEAT_POSITIONFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the T_SEAT_POSITION
     */
    select?: T_SEAT_POSITIONSelect<ExtArgs> | null
    /**
     * Omit specific fields from the T_SEAT_POSITION
     */
    omit?: T_SEAT_POSITIONOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: T_SEAT_POSITIONInclude<ExtArgs> | null
    /**
     * Filter, which T_SEAT_POSITION to fetch.
     */
    where?: T_SEAT_POSITIONWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of T_SEAT_POSITIONS to fetch.
     */
    orderBy?: T_SEAT_POSITIONOrderByWithRelationInput | T_SEAT_POSITIONOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for T_SEAT_POSITIONS.
     */
    cursor?: T_SEAT_POSITIONWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` T_SEAT_POSITIONS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` T_SEAT_POSITIONS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of T_SEAT_POSITIONS.
     */
    distinct?: T_SEAT_POSITIONScalarFieldEnum | T_SEAT_POSITIONScalarFieldEnum[]
  }

  /**
   * T_SEAT_POSITION findFirstOrThrow
   */
  export type T_SEAT_POSITIONFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the T_SEAT_POSITION
     */
    select?: T_SEAT_POSITIONSelect<ExtArgs> | null
    /**
     * Omit specific fields from the T_SEAT_POSITION
     */
    omit?: T_SEAT_POSITIONOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: T_SEAT_POSITIONInclude<ExtArgs> | null
    /**
     * Filter, which T_SEAT_POSITION to fetch.
     */
    where?: T_SEAT_POSITIONWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of T_SEAT_POSITIONS to fetch.
     */
    orderBy?: T_SEAT_POSITIONOrderByWithRelationInput | T_SEAT_POSITIONOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for T_SEAT_POSITIONS.
     */
    cursor?: T_SEAT_POSITIONWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` T_SEAT_POSITIONS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` T_SEAT_POSITIONS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of T_SEAT_POSITIONS.
     */
    distinct?: T_SEAT_POSITIONScalarFieldEnum | T_SEAT_POSITIONScalarFieldEnum[]
  }

  /**
   * T_SEAT_POSITION findMany
   */
  export type T_SEAT_POSITIONFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the T_SEAT_POSITION
     */
    select?: T_SEAT_POSITIONSelect<ExtArgs> | null
    /**
     * Omit specific fields from the T_SEAT_POSITION
     */
    omit?: T_SEAT_POSITIONOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: T_SEAT_POSITIONInclude<ExtArgs> | null
    /**
     * Filter, which T_SEAT_POSITIONS to fetch.
     */
    where?: T_SEAT_POSITIONWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of T_SEAT_POSITIONS to fetch.
     */
    orderBy?: T_SEAT_POSITIONOrderByWithRelationInput | T_SEAT_POSITIONOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing T_SEAT_POSITIONS.
     */
    cursor?: T_SEAT_POSITIONWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` T_SEAT_POSITIONS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` T_SEAT_POSITIONS.
     */
    skip?: number
    distinct?: T_SEAT_POSITIONScalarFieldEnum | T_SEAT_POSITIONScalarFieldEnum[]
  }

  /**
   * T_SEAT_POSITION create
   */
  export type T_SEAT_POSITIONCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the T_SEAT_POSITION
     */
    select?: T_SEAT_POSITIONSelect<ExtArgs> | null
    /**
     * Omit specific fields from the T_SEAT_POSITION
     */
    omit?: T_SEAT_POSITIONOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: T_SEAT_POSITIONInclude<ExtArgs> | null
    /**
     * The data needed to create a T_SEAT_POSITION.
     */
    data: XOR<T_SEAT_POSITIONCreateInput, T_SEAT_POSITIONUncheckedCreateInput>
  }

  /**
   * T_SEAT_POSITION createMany
   */
  export type T_SEAT_POSITIONCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many T_SEAT_POSITIONS.
     */
    data: T_SEAT_POSITIONCreateManyInput | T_SEAT_POSITIONCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * T_SEAT_POSITION createManyAndReturn
   */
  export type T_SEAT_POSITIONCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the T_SEAT_POSITION
     */
    select?: T_SEAT_POSITIONSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the T_SEAT_POSITION
     */
    omit?: T_SEAT_POSITIONOmit<ExtArgs> | null
    /**
     * The data used to create many T_SEAT_POSITIONS.
     */
    data: T_SEAT_POSITIONCreateManyInput | T_SEAT_POSITIONCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: T_SEAT_POSITIONIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * T_SEAT_POSITION update
   */
  export type T_SEAT_POSITIONUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the T_SEAT_POSITION
     */
    select?: T_SEAT_POSITIONSelect<ExtArgs> | null
    /**
     * Omit specific fields from the T_SEAT_POSITION
     */
    omit?: T_SEAT_POSITIONOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: T_SEAT_POSITIONInclude<ExtArgs> | null
    /**
     * The data needed to update a T_SEAT_POSITION.
     */
    data: XOR<T_SEAT_POSITIONUpdateInput, T_SEAT_POSITIONUncheckedUpdateInput>
    /**
     * Choose, which T_SEAT_POSITION to update.
     */
    where: T_SEAT_POSITIONWhereUniqueInput
  }

  /**
   * T_SEAT_POSITION updateMany
   */
  export type T_SEAT_POSITIONUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update T_SEAT_POSITIONS.
     */
    data: XOR<T_SEAT_POSITIONUpdateManyMutationInput, T_SEAT_POSITIONUncheckedUpdateManyInput>
    /**
     * Filter which T_SEAT_POSITIONS to update
     */
    where?: T_SEAT_POSITIONWhereInput
    /**
     * Limit how many T_SEAT_POSITIONS to update.
     */
    limit?: number
  }

  /**
   * T_SEAT_POSITION updateManyAndReturn
   */
  export type T_SEAT_POSITIONUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the T_SEAT_POSITION
     */
    select?: T_SEAT_POSITIONSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the T_SEAT_POSITION
     */
    omit?: T_SEAT_POSITIONOmit<ExtArgs> | null
    /**
     * The data used to update T_SEAT_POSITIONS.
     */
    data: XOR<T_SEAT_POSITIONUpdateManyMutationInput, T_SEAT_POSITIONUncheckedUpdateManyInput>
    /**
     * Filter which T_SEAT_POSITIONS to update
     */
    where?: T_SEAT_POSITIONWhereInput
    /**
     * Limit how many T_SEAT_POSITIONS to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: T_SEAT_POSITIONIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * T_SEAT_POSITION upsert
   */
  export type T_SEAT_POSITIONUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the T_SEAT_POSITION
     */
    select?: T_SEAT_POSITIONSelect<ExtArgs> | null
    /**
     * Omit specific fields from the T_SEAT_POSITION
     */
    omit?: T_SEAT_POSITIONOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: T_SEAT_POSITIONInclude<ExtArgs> | null
    /**
     * The filter to search for the T_SEAT_POSITION to update in case it exists.
     */
    where: T_SEAT_POSITIONWhereUniqueInput
    /**
     * In case the T_SEAT_POSITION found by the `where` argument doesn't exist, create a new T_SEAT_POSITION with this data.
     */
    create: XOR<T_SEAT_POSITIONCreateInput, T_SEAT_POSITIONUncheckedCreateInput>
    /**
     * In case the T_SEAT_POSITION was found with the provided `where` argument, update it with this data.
     */
    update: XOR<T_SEAT_POSITIONUpdateInput, T_SEAT_POSITIONUncheckedUpdateInput>
  }

  /**
   * T_SEAT_POSITION delete
   */
  export type T_SEAT_POSITIONDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the T_SEAT_POSITION
     */
    select?: T_SEAT_POSITIONSelect<ExtArgs> | null
    /**
     * Omit specific fields from the T_SEAT_POSITION
     */
    omit?: T_SEAT_POSITIONOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: T_SEAT_POSITIONInclude<ExtArgs> | null
    /**
     * Filter which T_SEAT_POSITION to delete.
     */
    where: T_SEAT_POSITIONWhereUniqueInput
  }

  /**
   * T_SEAT_POSITION deleteMany
   */
  export type T_SEAT_POSITIONDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which T_SEAT_POSITIONS to delete
     */
    where?: T_SEAT_POSITIONWhereInput
    /**
     * Limit how many T_SEAT_POSITIONS to delete.
     */
    limit?: number
  }

  /**
   * T_SEAT_POSITION without action
   */
  export type T_SEAT_POSITIONDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the T_SEAT_POSITION
     */
    select?: T_SEAT_POSITIONSelect<ExtArgs> | null
    /**
     * Omit specific fields from the T_SEAT_POSITION
     */
    omit?: T_SEAT_POSITIONOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: T_SEAT_POSITIONInclude<ExtArgs> | null
  }


  /**
   * Model M_USER
   */

  export type AggregateM_USER = {
    _count: M_USERCountAggregateOutputType | null
    _avg: M_USERAvgAggregateOutputType | null
    _sum: M_USERSumAggregateOutputType | null
    _min: M_USERMinAggregateOutputType | null
    _max: M_USERMaxAggregateOutputType | null
  }

  export type M_USERAvgAggregateOutputType = {
    userId: number | null
  }

  export type M_USERSumAggregateOutputType = {
    userId: number | null
  }

  export type M_USERMinAggregateOutputType = {
    userId: number | null
    employeeNumber: string | null
    lastName: string | null
    firstName: string | null
    showName: string | null
    password: string | null
    adminFlag: boolean | null
    deleteFlag: boolean | null
    insideFlag: boolean | null
  }

  export type M_USERMaxAggregateOutputType = {
    userId: number | null
    employeeNumber: string | null
    lastName: string | null
    firstName: string | null
    showName: string | null
    password: string | null
    adminFlag: boolean | null
    deleteFlag: boolean | null
    insideFlag: boolean | null
  }

  export type M_USERCountAggregateOutputType = {
    userId: number
    employeeNumber: number
    lastName: number
    firstName: number
    showName: number
    password: number
    adminFlag: number
    deleteFlag: number
    insideFlag: number
    _all: number
  }


  export type M_USERAvgAggregateInputType = {
    userId?: true
  }

  export type M_USERSumAggregateInputType = {
    userId?: true
  }

  export type M_USERMinAggregateInputType = {
    userId?: true
    employeeNumber?: true
    lastName?: true
    firstName?: true
    showName?: true
    password?: true
    adminFlag?: true
    deleteFlag?: true
    insideFlag?: true
  }

  export type M_USERMaxAggregateInputType = {
    userId?: true
    employeeNumber?: true
    lastName?: true
    firstName?: true
    showName?: true
    password?: true
    adminFlag?: true
    deleteFlag?: true
    insideFlag?: true
  }

  export type M_USERCountAggregateInputType = {
    userId?: true
    employeeNumber?: true
    lastName?: true
    firstName?: true
    showName?: true
    password?: true
    adminFlag?: true
    deleteFlag?: true
    insideFlag?: true
    _all?: true
  }

  export type M_USERAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which M_USER to aggregate.
     */
    where?: M_USERWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of M_USERS to fetch.
     */
    orderBy?: M_USEROrderByWithRelationInput | M_USEROrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: M_USERWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` M_USERS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` M_USERS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned M_USERS
    **/
    _count?: true | M_USERCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: M_USERAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: M_USERSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: M_USERMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: M_USERMaxAggregateInputType
  }

  export type GetM_USERAggregateType<T extends M_USERAggregateArgs> = {
        [P in keyof T & keyof AggregateM_USER]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateM_USER[P]>
      : GetScalarType<T[P], AggregateM_USER[P]>
  }




  export type M_USERGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: M_USERWhereInput
    orderBy?: M_USEROrderByWithAggregationInput | M_USEROrderByWithAggregationInput[]
    by: M_USERScalarFieldEnum[] | M_USERScalarFieldEnum
    having?: M_USERScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: M_USERCountAggregateInputType | true
    _avg?: M_USERAvgAggregateInputType
    _sum?: M_USERSumAggregateInputType
    _min?: M_USERMinAggregateInputType
    _max?: M_USERMaxAggregateInputType
  }

  export type M_USERGroupByOutputType = {
    userId: number
    employeeNumber: string
    lastName: string
    firstName: string
    showName: string | null
    password: string
    adminFlag: boolean
    deleteFlag: boolean
    insideFlag: boolean
    _count: M_USERCountAggregateOutputType | null
    _avg: M_USERAvgAggregateOutputType | null
    _sum: M_USERSumAggregateOutputType | null
    _min: M_USERMinAggregateOutputType | null
    _max: M_USERMaxAggregateOutputType | null
  }

  type GetM_USERGroupByPayload<T extends M_USERGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<M_USERGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof M_USERGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], M_USERGroupByOutputType[P]>
            : GetScalarType<T[P], M_USERGroupByOutputType[P]>
        }
      >
    >


  export type M_USERSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    employeeNumber?: boolean
    lastName?: boolean
    firstName?: boolean
    showName?: boolean
    password?: boolean
    adminFlag?: boolean
    deleteFlag?: boolean
    insideFlag?: boolean
    seatAppointments?: boolean | M_USER$seatAppointmentsArgs<ExtArgs>
    seatPositions?: boolean | M_USER$seatPositionsArgs<ExtArgs>
    _count?: boolean | M_USERCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["m_USER"]>

  export type M_USERSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    employeeNumber?: boolean
    lastName?: boolean
    firstName?: boolean
    showName?: boolean
    password?: boolean
    adminFlag?: boolean
    deleteFlag?: boolean
    insideFlag?: boolean
  }, ExtArgs["result"]["m_USER"]>

  export type M_USERSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    employeeNumber?: boolean
    lastName?: boolean
    firstName?: boolean
    showName?: boolean
    password?: boolean
    adminFlag?: boolean
    deleteFlag?: boolean
    insideFlag?: boolean
  }, ExtArgs["result"]["m_USER"]>

  export type M_USERSelectScalar = {
    userId?: boolean
    employeeNumber?: boolean
    lastName?: boolean
    firstName?: boolean
    showName?: boolean
    password?: boolean
    adminFlag?: boolean
    deleteFlag?: boolean
    insideFlag?: boolean
  }

  export type M_USEROmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "employeeNumber" | "lastName" | "firstName" | "showName" | "password" | "adminFlag" | "deleteFlag" | "insideFlag", ExtArgs["result"]["m_USER"]>
  export type M_USERInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    seatAppointments?: boolean | M_USER$seatAppointmentsArgs<ExtArgs>
    seatPositions?: boolean | M_USER$seatPositionsArgs<ExtArgs>
    _count?: boolean | M_USERCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type M_USERIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type M_USERIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $M_USERPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "M_USER"
    objects: {
      seatAppointments: Prisma.$M_SEAT_APPOINTPayload<ExtArgs>[]
      seatPositions: Prisma.$T_SEAT_POSITIONPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: number
      employeeNumber: string
      lastName: string
      firstName: string
      showName: string | null
      password: string
      adminFlag: boolean
      deleteFlag: boolean
      insideFlag: boolean
    }, ExtArgs["result"]["m_USER"]>
    composites: {}
  }

  type M_USERGetPayload<S extends boolean | null | undefined | M_USERDefaultArgs> = $Result.GetResult<Prisma.$M_USERPayload, S>

  type M_USERCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<M_USERFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: M_USERCountAggregateInputType | true
    }

  export interface M_USERDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['M_USER'], meta: { name: 'M_USER' } }
    /**
     * Find zero or one M_USER that matches the filter.
     * @param {M_USERFindUniqueArgs} args - Arguments to find a M_USER
     * @example
     * // Get one M_USER
     * const m_USER = await prisma.m_USER.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends M_USERFindUniqueArgs>(args: SelectSubset<T, M_USERFindUniqueArgs<ExtArgs>>): Prisma__M_USERClient<$Result.GetResult<Prisma.$M_USERPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one M_USER that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {M_USERFindUniqueOrThrowArgs} args - Arguments to find a M_USER
     * @example
     * // Get one M_USER
     * const m_USER = await prisma.m_USER.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends M_USERFindUniqueOrThrowArgs>(args: SelectSubset<T, M_USERFindUniqueOrThrowArgs<ExtArgs>>): Prisma__M_USERClient<$Result.GetResult<Prisma.$M_USERPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first M_USER that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_USERFindFirstArgs} args - Arguments to find a M_USER
     * @example
     * // Get one M_USER
     * const m_USER = await prisma.m_USER.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends M_USERFindFirstArgs>(args?: SelectSubset<T, M_USERFindFirstArgs<ExtArgs>>): Prisma__M_USERClient<$Result.GetResult<Prisma.$M_USERPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first M_USER that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_USERFindFirstOrThrowArgs} args - Arguments to find a M_USER
     * @example
     * // Get one M_USER
     * const m_USER = await prisma.m_USER.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends M_USERFindFirstOrThrowArgs>(args?: SelectSubset<T, M_USERFindFirstOrThrowArgs<ExtArgs>>): Prisma__M_USERClient<$Result.GetResult<Prisma.$M_USERPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more M_USERS that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_USERFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all M_USERS
     * const m_USERS = await prisma.m_USER.findMany()
     * 
     * // Get first 10 M_USERS
     * const m_USERS = await prisma.m_USER.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const m_USERWithUserIdOnly = await prisma.m_USER.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends M_USERFindManyArgs>(args?: SelectSubset<T, M_USERFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$M_USERPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a M_USER.
     * @param {M_USERCreateArgs} args - Arguments to create a M_USER.
     * @example
     * // Create one M_USER
     * const M_USER = await prisma.m_USER.create({
     *   data: {
     *     // ... data to create a M_USER
     *   }
     * })
     * 
     */
    create<T extends M_USERCreateArgs>(args: SelectSubset<T, M_USERCreateArgs<ExtArgs>>): Prisma__M_USERClient<$Result.GetResult<Prisma.$M_USERPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many M_USERS.
     * @param {M_USERCreateManyArgs} args - Arguments to create many M_USERS.
     * @example
     * // Create many M_USERS
     * const m_USER = await prisma.m_USER.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends M_USERCreateManyArgs>(args?: SelectSubset<T, M_USERCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many M_USERS and returns the data saved in the database.
     * @param {M_USERCreateManyAndReturnArgs} args - Arguments to create many M_USERS.
     * @example
     * // Create many M_USERS
     * const m_USER = await prisma.m_USER.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many M_USERS and only return the `userId`
     * const m_USERWithUserIdOnly = await prisma.m_USER.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends M_USERCreateManyAndReturnArgs>(args?: SelectSubset<T, M_USERCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$M_USERPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a M_USER.
     * @param {M_USERDeleteArgs} args - Arguments to delete one M_USER.
     * @example
     * // Delete one M_USER
     * const M_USER = await prisma.m_USER.delete({
     *   where: {
     *     // ... filter to delete one M_USER
     *   }
     * })
     * 
     */
    delete<T extends M_USERDeleteArgs>(args: SelectSubset<T, M_USERDeleteArgs<ExtArgs>>): Prisma__M_USERClient<$Result.GetResult<Prisma.$M_USERPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one M_USER.
     * @param {M_USERUpdateArgs} args - Arguments to update one M_USER.
     * @example
     * // Update one M_USER
     * const m_USER = await prisma.m_USER.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends M_USERUpdateArgs>(args: SelectSubset<T, M_USERUpdateArgs<ExtArgs>>): Prisma__M_USERClient<$Result.GetResult<Prisma.$M_USERPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more M_USERS.
     * @param {M_USERDeleteManyArgs} args - Arguments to filter M_USERS to delete.
     * @example
     * // Delete a few M_USERS
     * const { count } = await prisma.m_USER.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends M_USERDeleteManyArgs>(args?: SelectSubset<T, M_USERDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more M_USERS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_USERUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many M_USERS
     * const m_USER = await prisma.m_USER.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends M_USERUpdateManyArgs>(args: SelectSubset<T, M_USERUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more M_USERS and returns the data updated in the database.
     * @param {M_USERUpdateManyAndReturnArgs} args - Arguments to update many M_USERS.
     * @example
     * // Update many M_USERS
     * const m_USER = await prisma.m_USER.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more M_USERS and only return the `userId`
     * const m_USERWithUserIdOnly = await prisma.m_USER.updateManyAndReturn({
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
    updateManyAndReturn<T extends M_USERUpdateManyAndReturnArgs>(args: SelectSubset<T, M_USERUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$M_USERPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one M_USER.
     * @param {M_USERUpsertArgs} args - Arguments to update or create a M_USER.
     * @example
     * // Update or create a M_USER
     * const m_USER = await prisma.m_USER.upsert({
     *   create: {
     *     // ... data to create a M_USER
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the M_USER we want to update
     *   }
     * })
     */
    upsert<T extends M_USERUpsertArgs>(args: SelectSubset<T, M_USERUpsertArgs<ExtArgs>>): Prisma__M_USERClient<$Result.GetResult<Prisma.$M_USERPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of M_USERS.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_USERCountArgs} args - Arguments to filter M_USERS to count.
     * @example
     * // Count the number of M_USERS
     * const count = await prisma.m_USER.count({
     *   where: {
     *     // ... the filter for the M_USERS we want to count
     *   }
     * })
    **/
    count<T extends M_USERCountArgs>(
      args?: Subset<T, M_USERCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], M_USERCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a M_USER.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_USERAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends M_USERAggregateArgs>(args: Subset<T, M_USERAggregateArgs>): Prisma.PrismaPromise<GetM_USERAggregateType<T>>

    /**
     * Group by M_USER.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {M_USERGroupByArgs} args - Group by arguments.
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
      T extends M_USERGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: M_USERGroupByArgs['orderBy'] }
        : { orderBy?: M_USERGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, M_USERGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetM_USERGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the M_USER model
   */
  readonly fields: M_USERFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for M_USER.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__M_USERClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    seatAppointments<T extends M_USER$seatAppointmentsArgs<ExtArgs> = {}>(args?: Subset<T, M_USER$seatAppointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$M_SEAT_APPOINTPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    seatPositions<T extends M_USER$seatPositionsArgs<ExtArgs> = {}>(args?: Subset<T, M_USER$seatPositionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$T_SEAT_POSITIONPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
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
   * Fields of the M_USER model
   */
  interface M_USERFieldRefs {
    readonly userId: FieldRef<"M_USER", 'Int'>
    readonly employeeNumber: FieldRef<"M_USER", 'String'>
    readonly lastName: FieldRef<"M_USER", 'String'>
    readonly firstName: FieldRef<"M_USER", 'String'>
    readonly showName: FieldRef<"M_USER", 'String'>
    readonly password: FieldRef<"M_USER", 'String'>
    readonly adminFlag: FieldRef<"M_USER", 'Boolean'>
    readonly deleteFlag: FieldRef<"M_USER", 'Boolean'>
    readonly insideFlag: FieldRef<"M_USER", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * M_USER findUnique
   */
  export type M_USERFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_USER
     */
    select?: M_USERSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_USER
     */
    omit?: M_USEROmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_USERInclude<ExtArgs> | null
    /**
     * Filter, which M_USER to fetch.
     */
    where: M_USERWhereUniqueInput
  }

  /**
   * M_USER findUniqueOrThrow
   */
  export type M_USERFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_USER
     */
    select?: M_USERSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_USER
     */
    omit?: M_USEROmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_USERInclude<ExtArgs> | null
    /**
     * Filter, which M_USER to fetch.
     */
    where: M_USERWhereUniqueInput
  }

  /**
   * M_USER findFirst
   */
  export type M_USERFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_USER
     */
    select?: M_USERSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_USER
     */
    omit?: M_USEROmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_USERInclude<ExtArgs> | null
    /**
     * Filter, which M_USER to fetch.
     */
    where?: M_USERWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of M_USERS to fetch.
     */
    orderBy?: M_USEROrderByWithRelationInput | M_USEROrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for M_USERS.
     */
    cursor?: M_USERWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` M_USERS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` M_USERS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of M_USERS.
     */
    distinct?: M_USERScalarFieldEnum | M_USERScalarFieldEnum[]
  }

  /**
   * M_USER findFirstOrThrow
   */
  export type M_USERFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_USER
     */
    select?: M_USERSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_USER
     */
    omit?: M_USEROmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_USERInclude<ExtArgs> | null
    /**
     * Filter, which M_USER to fetch.
     */
    where?: M_USERWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of M_USERS to fetch.
     */
    orderBy?: M_USEROrderByWithRelationInput | M_USEROrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for M_USERS.
     */
    cursor?: M_USERWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` M_USERS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` M_USERS.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of M_USERS.
     */
    distinct?: M_USERScalarFieldEnum | M_USERScalarFieldEnum[]
  }

  /**
   * M_USER findMany
   */
  export type M_USERFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_USER
     */
    select?: M_USERSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_USER
     */
    omit?: M_USEROmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_USERInclude<ExtArgs> | null
    /**
     * Filter, which M_USERS to fetch.
     */
    where?: M_USERWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of M_USERS to fetch.
     */
    orderBy?: M_USEROrderByWithRelationInput | M_USEROrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing M_USERS.
     */
    cursor?: M_USERWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` M_USERS from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` M_USERS.
     */
    skip?: number
    distinct?: M_USERScalarFieldEnum | M_USERScalarFieldEnum[]
  }

  /**
   * M_USER create
   */
  export type M_USERCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_USER
     */
    select?: M_USERSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_USER
     */
    omit?: M_USEROmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_USERInclude<ExtArgs> | null
    /**
     * The data needed to create a M_USER.
     */
    data: XOR<M_USERCreateInput, M_USERUncheckedCreateInput>
  }

  /**
   * M_USER createMany
   */
  export type M_USERCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many M_USERS.
     */
    data: M_USERCreateManyInput | M_USERCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * M_USER createManyAndReturn
   */
  export type M_USERCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_USER
     */
    select?: M_USERSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the M_USER
     */
    omit?: M_USEROmit<ExtArgs> | null
    /**
     * The data used to create many M_USERS.
     */
    data: M_USERCreateManyInput | M_USERCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * M_USER update
   */
  export type M_USERUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_USER
     */
    select?: M_USERSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_USER
     */
    omit?: M_USEROmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_USERInclude<ExtArgs> | null
    /**
     * The data needed to update a M_USER.
     */
    data: XOR<M_USERUpdateInput, M_USERUncheckedUpdateInput>
    /**
     * Choose, which M_USER to update.
     */
    where: M_USERWhereUniqueInput
  }

  /**
   * M_USER updateMany
   */
  export type M_USERUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update M_USERS.
     */
    data: XOR<M_USERUpdateManyMutationInput, M_USERUncheckedUpdateManyInput>
    /**
     * Filter which M_USERS to update
     */
    where?: M_USERWhereInput
    /**
     * Limit how many M_USERS to update.
     */
    limit?: number
  }

  /**
   * M_USER updateManyAndReturn
   */
  export type M_USERUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_USER
     */
    select?: M_USERSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the M_USER
     */
    omit?: M_USEROmit<ExtArgs> | null
    /**
     * The data used to update M_USERS.
     */
    data: XOR<M_USERUpdateManyMutationInput, M_USERUncheckedUpdateManyInput>
    /**
     * Filter which M_USERS to update
     */
    where?: M_USERWhereInput
    /**
     * Limit how many M_USERS to update.
     */
    limit?: number
  }

  /**
   * M_USER upsert
   */
  export type M_USERUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_USER
     */
    select?: M_USERSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_USER
     */
    omit?: M_USEROmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_USERInclude<ExtArgs> | null
    /**
     * The filter to search for the M_USER to update in case it exists.
     */
    where: M_USERWhereUniqueInput
    /**
     * In case the M_USER found by the `where` argument doesn't exist, create a new M_USER with this data.
     */
    create: XOR<M_USERCreateInput, M_USERUncheckedCreateInput>
    /**
     * In case the M_USER was found with the provided `where` argument, update it with this data.
     */
    update: XOR<M_USERUpdateInput, M_USERUncheckedUpdateInput>
  }

  /**
   * M_USER delete
   */
  export type M_USERDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_USER
     */
    select?: M_USERSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_USER
     */
    omit?: M_USEROmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_USERInclude<ExtArgs> | null
    /**
     * Filter which M_USER to delete.
     */
    where: M_USERWhereUniqueInput
  }

  /**
   * M_USER deleteMany
   */
  export type M_USERDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which M_USERS to delete
     */
    where?: M_USERWhereInput
    /**
     * Limit how many M_USERS to delete.
     */
    limit?: number
  }

  /**
   * M_USER.seatAppointments
   */
  export type M_USER$seatAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_SEAT_APPOINT
     */
    select?: M_SEAT_APPOINTSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_SEAT_APPOINT
     */
    omit?: M_SEAT_APPOINTOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_SEAT_APPOINTInclude<ExtArgs> | null
    where?: M_SEAT_APPOINTWhereInput
    orderBy?: M_SEAT_APPOINTOrderByWithRelationInput | M_SEAT_APPOINTOrderByWithRelationInput[]
    cursor?: M_SEAT_APPOINTWhereUniqueInput
    take?: number
    skip?: number
    distinct?: M_SEAT_APPOINTScalarFieldEnum | M_SEAT_APPOINTScalarFieldEnum[]
  }

  /**
   * M_USER.seatPositions
   */
  export type M_USER$seatPositionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the T_SEAT_POSITION
     */
    select?: T_SEAT_POSITIONSelect<ExtArgs> | null
    /**
     * Omit specific fields from the T_SEAT_POSITION
     */
    omit?: T_SEAT_POSITIONOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: T_SEAT_POSITIONInclude<ExtArgs> | null
    where?: T_SEAT_POSITIONWhereInput
    orderBy?: T_SEAT_POSITIONOrderByWithRelationInput | T_SEAT_POSITIONOrderByWithRelationInput[]
    cursor?: T_SEAT_POSITIONWhereUniqueInput
    take?: number
    skip?: number
    distinct?: T_SEAT_POSITIONScalarFieldEnum | T_SEAT_POSITIONScalarFieldEnum[]
  }

  /**
   * M_USER without action
   */
  export type M_USERDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the M_USER
     */
    select?: M_USERSelect<ExtArgs> | null
    /**
     * Omit specific fields from the M_USER
     */
    omit?: M_USEROmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: M_USERInclude<ExtArgs> | null
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


  export const M_SEATScalarFieldEnum: {
    seatId: 'seatId',
    tableId: 'tableId',
    seatNumber: 'seatNumber',
    status: 'status',
    imageX: 'imageX',
    imageY: 'imageY'
  };

  export type M_SEATScalarFieldEnum = (typeof M_SEATScalarFieldEnum)[keyof typeof M_SEATScalarFieldEnum]


  export const M_SEAT_APPOINTScalarFieldEnum: {
    id: 'id',
    appointId: 'appointId',
    seatId: 'seatId',
    userId: 'userId',
    startDate: 'startDate',
    endDate: 'endDate',
    created: 'created',
    updated: 'updated'
  };

  export type M_SEAT_APPOINTScalarFieldEnum = (typeof M_SEAT_APPOINTScalarFieldEnum)[keyof typeof M_SEAT_APPOINTScalarFieldEnum]


  export const T_SEAT_POSITIONScalarFieldEnum: {
    id: 'id',
    date: 'date',
    seatId: 'seatId',
    userId: 'userId',
    created: 'created',
    updated: 'updated'
  };

  export type T_SEAT_POSITIONScalarFieldEnum = (typeof T_SEAT_POSITIONScalarFieldEnum)[keyof typeof T_SEAT_POSITIONScalarFieldEnum]


  export const M_USERScalarFieldEnum: {
    userId: 'userId',
    employeeNumber: 'employeeNumber',
    lastName: 'lastName',
    firstName: 'firstName',
    showName: 'showName',
    password: 'password',
    adminFlag: 'adminFlag',
    deleteFlag: 'deleteFlag',
    insideFlag: 'insideFlag'
  };

  export type M_USERScalarFieldEnum = (typeof M_USERScalarFieldEnum)[keyof typeof M_USERScalarFieldEnum]


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


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


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


  export type M_SEATWhereInput = {
    AND?: M_SEATWhereInput | M_SEATWhereInput[]
    OR?: M_SEATWhereInput[]
    NOT?: M_SEATWhereInput | M_SEATWhereInput[]
    seatId?: StringFilter<"M_SEAT"> | string
    tableId?: StringFilter<"M_SEAT"> | string
    seatNumber?: IntFilter<"M_SEAT"> | number
    status?: IntFilter<"M_SEAT"> | number
    imageX?: IntFilter<"M_SEAT"> | number
    imageY?: IntFilter<"M_SEAT"> | number
    seatAppointments?: M_SEAT_APPOINTListRelationFilter
    seatPositions?: T_SEAT_POSITIONListRelationFilter
  }

  export type M_SEATOrderByWithRelationInput = {
    seatId?: SortOrder
    tableId?: SortOrder
    seatNumber?: SortOrder
    status?: SortOrder
    imageX?: SortOrder
    imageY?: SortOrder
    seatAppointments?: M_SEAT_APPOINTOrderByRelationAggregateInput
    seatPositions?: T_SEAT_POSITIONOrderByRelationAggregateInput
  }

  export type M_SEATWhereUniqueInput = Prisma.AtLeast<{
    seatId?: string
    AND?: M_SEATWhereInput | M_SEATWhereInput[]
    OR?: M_SEATWhereInput[]
    NOT?: M_SEATWhereInput | M_SEATWhereInput[]
    tableId?: StringFilter<"M_SEAT"> | string
    seatNumber?: IntFilter<"M_SEAT"> | number
    status?: IntFilter<"M_SEAT"> | number
    imageX?: IntFilter<"M_SEAT"> | number
    imageY?: IntFilter<"M_SEAT"> | number
    seatAppointments?: M_SEAT_APPOINTListRelationFilter
    seatPositions?: T_SEAT_POSITIONListRelationFilter
  }, "seatId">

  export type M_SEATOrderByWithAggregationInput = {
    seatId?: SortOrder
    tableId?: SortOrder
    seatNumber?: SortOrder
    status?: SortOrder
    imageX?: SortOrder
    imageY?: SortOrder
    _count?: M_SEATCountOrderByAggregateInput
    _avg?: M_SEATAvgOrderByAggregateInput
    _max?: M_SEATMaxOrderByAggregateInput
    _min?: M_SEATMinOrderByAggregateInput
    _sum?: M_SEATSumOrderByAggregateInput
  }

  export type M_SEATScalarWhereWithAggregatesInput = {
    AND?: M_SEATScalarWhereWithAggregatesInput | M_SEATScalarWhereWithAggregatesInput[]
    OR?: M_SEATScalarWhereWithAggregatesInput[]
    NOT?: M_SEATScalarWhereWithAggregatesInput | M_SEATScalarWhereWithAggregatesInput[]
    seatId?: StringWithAggregatesFilter<"M_SEAT"> | string
    tableId?: StringWithAggregatesFilter<"M_SEAT"> | string
    seatNumber?: IntWithAggregatesFilter<"M_SEAT"> | number
    status?: IntWithAggregatesFilter<"M_SEAT"> | number
    imageX?: IntWithAggregatesFilter<"M_SEAT"> | number
    imageY?: IntWithAggregatesFilter<"M_SEAT"> | number
  }

  export type M_SEAT_APPOINTWhereInput = {
    AND?: M_SEAT_APPOINTWhereInput | M_SEAT_APPOINTWhereInput[]
    OR?: M_SEAT_APPOINTWhereInput[]
    NOT?: M_SEAT_APPOINTWhereInput | M_SEAT_APPOINTWhereInput[]
    id?: IntFilter<"M_SEAT_APPOINT"> | number
    appointId?: IntFilter<"M_SEAT_APPOINT"> | number
    seatId?: StringFilter<"M_SEAT_APPOINT"> | string
    userId?: IntFilter<"M_SEAT_APPOINT"> | number
    startDate?: DateTimeFilter<"M_SEAT_APPOINT"> | Date | string
    endDate?: DateTimeFilter<"M_SEAT_APPOINT"> | Date | string
    created?: DateTimeFilter<"M_SEAT_APPOINT"> | Date | string
    updated?: DateTimeNullableFilter<"M_SEAT_APPOINT"> | Date | string | null
    seat?: XOR<M_SEATScalarRelationFilter, M_SEATWhereInput>
    user?: XOR<M_USERScalarRelationFilter, M_USERWhereInput>
  }

  export type M_SEAT_APPOINTOrderByWithRelationInput = {
    id?: SortOrder
    appointId?: SortOrder
    seatId?: SortOrder
    userId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    created?: SortOrder
    updated?: SortOrderInput | SortOrder
    seat?: M_SEATOrderByWithRelationInput
    user?: M_USEROrderByWithRelationInput
  }

  export type M_SEAT_APPOINTWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: M_SEAT_APPOINTWhereInput | M_SEAT_APPOINTWhereInput[]
    OR?: M_SEAT_APPOINTWhereInput[]
    NOT?: M_SEAT_APPOINTWhereInput | M_SEAT_APPOINTWhereInput[]
    appointId?: IntFilter<"M_SEAT_APPOINT"> | number
    seatId?: StringFilter<"M_SEAT_APPOINT"> | string
    userId?: IntFilter<"M_SEAT_APPOINT"> | number
    startDate?: DateTimeFilter<"M_SEAT_APPOINT"> | Date | string
    endDate?: DateTimeFilter<"M_SEAT_APPOINT"> | Date | string
    created?: DateTimeFilter<"M_SEAT_APPOINT"> | Date | string
    updated?: DateTimeNullableFilter<"M_SEAT_APPOINT"> | Date | string | null
    seat?: XOR<M_SEATScalarRelationFilter, M_SEATWhereInput>
    user?: XOR<M_USERScalarRelationFilter, M_USERWhereInput>
  }, "id">

  export type M_SEAT_APPOINTOrderByWithAggregationInput = {
    id?: SortOrder
    appointId?: SortOrder
    seatId?: SortOrder
    userId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    created?: SortOrder
    updated?: SortOrderInput | SortOrder
    _count?: M_SEAT_APPOINTCountOrderByAggregateInput
    _avg?: M_SEAT_APPOINTAvgOrderByAggregateInput
    _max?: M_SEAT_APPOINTMaxOrderByAggregateInput
    _min?: M_SEAT_APPOINTMinOrderByAggregateInput
    _sum?: M_SEAT_APPOINTSumOrderByAggregateInput
  }

  export type M_SEAT_APPOINTScalarWhereWithAggregatesInput = {
    AND?: M_SEAT_APPOINTScalarWhereWithAggregatesInput | M_SEAT_APPOINTScalarWhereWithAggregatesInput[]
    OR?: M_SEAT_APPOINTScalarWhereWithAggregatesInput[]
    NOT?: M_SEAT_APPOINTScalarWhereWithAggregatesInput | M_SEAT_APPOINTScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"M_SEAT_APPOINT"> | number
    appointId?: IntWithAggregatesFilter<"M_SEAT_APPOINT"> | number
    seatId?: StringWithAggregatesFilter<"M_SEAT_APPOINT"> | string
    userId?: IntWithAggregatesFilter<"M_SEAT_APPOINT"> | number
    startDate?: DateTimeWithAggregatesFilter<"M_SEAT_APPOINT"> | Date | string
    endDate?: DateTimeWithAggregatesFilter<"M_SEAT_APPOINT"> | Date | string
    created?: DateTimeWithAggregatesFilter<"M_SEAT_APPOINT"> | Date | string
    updated?: DateTimeNullableWithAggregatesFilter<"M_SEAT_APPOINT"> | Date | string | null
  }

  export type T_SEAT_POSITIONWhereInput = {
    AND?: T_SEAT_POSITIONWhereInput | T_SEAT_POSITIONWhereInput[]
    OR?: T_SEAT_POSITIONWhereInput[]
    NOT?: T_SEAT_POSITIONWhereInput | T_SEAT_POSITIONWhereInput[]
    id?: IntFilter<"T_SEAT_POSITION"> | number
    date?: DateTimeFilter<"T_SEAT_POSITION"> | Date | string
    seatId?: StringFilter<"T_SEAT_POSITION"> | string
    userId?: IntFilter<"T_SEAT_POSITION"> | number
    created?: DateTimeFilter<"T_SEAT_POSITION"> | Date | string
    updated?: DateTimeNullableFilter<"T_SEAT_POSITION"> | Date | string | null
    seat?: XOR<M_SEATScalarRelationFilter, M_SEATWhereInput>
    user?: XOR<M_USERScalarRelationFilter, M_USERWhereInput>
  }

  export type T_SEAT_POSITIONOrderByWithRelationInput = {
    id?: SortOrder
    date?: SortOrder
    seatId?: SortOrder
    userId?: SortOrder
    created?: SortOrder
    updated?: SortOrderInput | SortOrder
    seat?: M_SEATOrderByWithRelationInput
    user?: M_USEROrderByWithRelationInput
  }

  export type T_SEAT_POSITIONWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    date_userId?: T_SEAT_POSITIONDateUserIdCompoundUniqueInput
    AND?: T_SEAT_POSITIONWhereInput | T_SEAT_POSITIONWhereInput[]
    OR?: T_SEAT_POSITIONWhereInput[]
    NOT?: T_SEAT_POSITIONWhereInput | T_SEAT_POSITIONWhereInput[]
    date?: DateTimeFilter<"T_SEAT_POSITION"> | Date | string
    seatId?: StringFilter<"T_SEAT_POSITION"> | string
    userId?: IntFilter<"T_SEAT_POSITION"> | number
    created?: DateTimeFilter<"T_SEAT_POSITION"> | Date | string
    updated?: DateTimeNullableFilter<"T_SEAT_POSITION"> | Date | string | null
    seat?: XOR<M_SEATScalarRelationFilter, M_SEATWhereInput>
    user?: XOR<M_USERScalarRelationFilter, M_USERWhereInput>
  }, "id" | "date_userId">

  export type T_SEAT_POSITIONOrderByWithAggregationInput = {
    id?: SortOrder
    date?: SortOrder
    seatId?: SortOrder
    userId?: SortOrder
    created?: SortOrder
    updated?: SortOrderInput | SortOrder
    _count?: T_SEAT_POSITIONCountOrderByAggregateInput
    _avg?: T_SEAT_POSITIONAvgOrderByAggregateInput
    _max?: T_SEAT_POSITIONMaxOrderByAggregateInput
    _min?: T_SEAT_POSITIONMinOrderByAggregateInput
    _sum?: T_SEAT_POSITIONSumOrderByAggregateInput
  }

  export type T_SEAT_POSITIONScalarWhereWithAggregatesInput = {
    AND?: T_SEAT_POSITIONScalarWhereWithAggregatesInput | T_SEAT_POSITIONScalarWhereWithAggregatesInput[]
    OR?: T_SEAT_POSITIONScalarWhereWithAggregatesInput[]
    NOT?: T_SEAT_POSITIONScalarWhereWithAggregatesInput | T_SEAT_POSITIONScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"T_SEAT_POSITION"> | number
    date?: DateTimeWithAggregatesFilter<"T_SEAT_POSITION"> | Date | string
    seatId?: StringWithAggregatesFilter<"T_SEAT_POSITION"> | string
    userId?: IntWithAggregatesFilter<"T_SEAT_POSITION"> | number
    created?: DateTimeWithAggregatesFilter<"T_SEAT_POSITION"> | Date | string
    updated?: DateTimeNullableWithAggregatesFilter<"T_SEAT_POSITION"> | Date | string | null
  }

  export type M_USERWhereInput = {
    AND?: M_USERWhereInput | M_USERWhereInput[]
    OR?: M_USERWhereInput[]
    NOT?: M_USERWhereInput | M_USERWhereInput[]
    userId?: IntFilter<"M_USER"> | number
    employeeNumber?: StringFilter<"M_USER"> | string
    lastName?: StringFilter<"M_USER"> | string
    firstName?: StringFilter<"M_USER"> | string
    showName?: StringNullableFilter<"M_USER"> | string | null
    password?: StringFilter<"M_USER"> | string
    adminFlag?: BoolFilter<"M_USER"> | boolean
    deleteFlag?: BoolFilter<"M_USER"> | boolean
    insideFlag?: BoolFilter<"M_USER"> | boolean
    seatAppointments?: M_SEAT_APPOINTListRelationFilter
    seatPositions?: T_SEAT_POSITIONListRelationFilter
  }

  export type M_USEROrderByWithRelationInput = {
    userId?: SortOrder
    employeeNumber?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    showName?: SortOrderInput | SortOrder
    password?: SortOrder
    adminFlag?: SortOrder
    deleteFlag?: SortOrder
    insideFlag?: SortOrder
    seatAppointments?: M_SEAT_APPOINTOrderByRelationAggregateInput
    seatPositions?: T_SEAT_POSITIONOrderByRelationAggregateInput
  }

  export type M_USERWhereUniqueInput = Prisma.AtLeast<{
    userId?: number
    employeeNumber?: string
    AND?: M_USERWhereInput | M_USERWhereInput[]
    OR?: M_USERWhereInput[]
    NOT?: M_USERWhereInput | M_USERWhereInput[]
    lastName?: StringFilter<"M_USER"> | string
    firstName?: StringFilter<"M_USER"> | string
    showName?: StringNullableFilter<"M_USER"> | string | null
    password?: StringFilter<"M_USER"> | string
    adminFlag?: BoolFilter<"M_USER"> | boolean
    deleteFlag?: BoolFilter<"M_USER"> | boolean
    insideFlag?: BoolFilter<"M_USER"> | boolean
    seatAppointments?: M_SEAT_APPOINTListRelationFilter
    seatPositions?: T_SEAT_POSITIONListRelationFilter
  }, "userId" | "employeeNumber">

  export type M_USEROrderByWithAggregationInput = {
    userId?: SortOrder
    employeeNumber?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    showName?: SortOrderInput | SortOrder
    password?: SortOrder
    adminFlag?: SortOrder
    deleteFlag?: SortOrder
    insideFlag?: SortOrder
    _count?: M_USERCountOrderByAggregateInput
    _avg?: M_USERAvgOrderByAggregateInput
    _max?: M_USERMaxOrderByAggregateInput
    _min?: M_USERMinOrderByAggregateInput
    _sum?: M_USERSumOrderByAggregateInput
  }

  export type M_USERScalarWhereWithAggregatesInput = {
    AND?: M_USERScalarWhereWithAggregatesInput | M_USERScalarWhereWithAggregatesInput[]
    OR?: M_USERScalarWhereWithAggregatesInput[]
    NOT?: M_USERScalarWhereWithAggregatesInput | M_USERScalarWhereWithAggregatesInput[]
    userId?: IntWithAggregatesFilter<"M_USER"> | number
    employeeNumber?: StringWithAggregatesFilter<"M_USER"> | string
    lastName?: StringWithAggregatesFilter<"M_USER"> | string
    firstName?: StringWithAggregatesFilter<"M_USER"> | string
    showName?: StringNullableWithAggregatesFilter<"M_USER"> | string | null
    password?: StringWithAggregatesFilter<"M_USER"> | string
    adminFlag?: BoolWithAggregatesFilter<"M_USER"> | boolean
    deleteFlag?: BoolWithAggregatesFilter<"M_USER"> | boolean
    insideFlag?: BoolWithAggregatesFilter<"M_USER"> | boolean
  }

  export type M_SEATCreateInput = {
    seatId: string
    tableId: string
    seatNumber: number
    status: number
    imageX: number
    imageY: number
    seatAppointments?: M_SEAT_APPOINTCreateNestedManyWithoutSeatInput
    seatPositions?: T_SEAT_POSITIONCreateNestedManyWithoutSeatInput
  }

  export type M_SEATUncheckedCreateInput = {
    seatId: string
    tableId: string
    seatNumber: number
    status: number
    imageX: number
    imageY: number
    seatAppointments?: M_SEAT_APPOINTUncheckedCreateNestedManyWithoutSeatInput
    seatPositions?: T_SEAT_POSITIONUncheckedCreateNestedManyWithoutSeatInput
  }

  export type M_SEATUpdateInput = {
    seatId?: StringFieldUpdateOperationsInput | string
    tableId?: StringFieldUpdateOperationsInput | string
    seatNumber?: IntFieldUpdateOperationsInput | number
    status?: IntFieldUpdateOperationsInput | number
    imageX?: IntFieldUpdateOperationsInput | number
    imageY?: IntFieldUpdateOperationsInput | number
    seatAppointments?: M_SEAT_APPOINTUpdateManyWithoutSeatNestedInput
    seatPositions?: T_SEAT_POSITIONUpdateManyWithoutSeatNestedInput
  }

  export type M_SEATUncheckedUpdateInput = {
    seatId?: StringFieldUpdateOperationsInput | string
    tableId?: StringFieldUpdateOperationsInput | string
    seatNumber?: IntFieldUpdateOperationsInput | number
    status?: IntFieldUpdateOperationsInput | number
    imageX?: IntFieldUpdateOperationsInput | number
    imageY?: IntFieldUpdateOperationsInput | number
    seatAppointments?: M_SEAT_APPOINTUncheckedUpdateManyWithoutSeatNestedInput
    seatPositions?: T_SEAT_POSITIONUncheckedUpdateManyWithoutSeatNestedInput
  }

  export type M_SEATCreateManyInput = {
    seatId: string
    tableId: string
    seatNumber: number
    status: number
    imageX: number
    imageY: number
  }

  export type M_SEATUpdateManyMutationInput = {
    seatId?: StringFieldUpdateOperationsInput | string
    tableId?: StringFieldUpdateOperationsInput | string
    seatNumber?: IntFieldUpdateOperationsInput | number
    status?: IntFieldUpdateOperationsInput | number
    imageX?: IntFieldUpdateOperationsInput | number
    imageY?: IntFieldUpdateOperationsInput | number
  }

  export type M_SEATUncheckedUpdateManyInput = {
    seatId?: StringFieldUpdateOperationsInput | string
    tableId?: StringFieldUpdateOperationsInput | string
    seatNumber?: IntFieldUpdateOperationsInput | number
    status?: IntFieldUpdateOperationsInput | number
    imageX?: IntFieldUpdateOperationsInput | number
    imageY?: IntFieldUpdateOperationsInput | number
  }

  export type M_SEAT_APPOINTCreateInput = {
    appointId: number
    startDate: Date | string
    endDate: Date | string
    created: Date | string
    updated?: Date | string | null
    seat: M_SEATCreateNestedOneWithoutSeatAppointmentsInput
    user: M_USERCreateNestedOneWithoutSeatAppointmentsInput
  }

  export type M_SEAT_APPOINTUncheckedCreateInput = {
    id?: number
    appointId: number
    seatId: string
    userId: number
    startDate: Date | string
    endDate: Date | string
    created: Date | string
    updated?: Date | string | null
  }

  export type M_SEAT_APPOINTUpdateInput = {
    appointId?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seat?: M_SEATUpdateOneRequiredWithoutSeatAppointmentsNestedInput
    user?: M_USERUpdateOneRequiredWithoutSeatAppointmentsNestedInput
  }

  export type M_SEAT_APPOINTUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    appointId?: IntFieldUpdateOperationsInput | number
    seatId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type M_SEAT_APPOINTCreateManyInput = {
    id?: number
    appointId: number
    seatId: string
    userId: number
    startDate: Date | string
    endDate: Date | string
    created: Date | string
    updated?: Date | string | null
  }

  export type M_SEAT_APPOINTUpdateManyMutationInput = {
    appointId?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type M_SEAT_APPOINTUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    appointId?: IntFieldUpdateOperationsInput | number
    seatId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type T_SEAT_POSITIONCreateInput = {
    date: Date | string
    created: Date | string
    updated?: Date | string | null
    seat: M_SEATCreateNestedOneWithoutSeatPositionsInput
    user: M_USERCreateNestedOneWithoutSeatPositionsInput
  }

  export type T_SEAT_POSITIONUncheckedCreateInput = {
    id?: number
    date: Date | string
    seatId: string
    userId: number
    created: Date | string
    updated?: Date | string | null
  }

  export type T_SEAT_POSITIONUpdateInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seat?: M_SEATUpdateOneRequiredWithoutSeatPositionsNestedInput
    user?: M_USERUpdateOneRequiredWithoutSeatPositionsNestedInput
  }

  export type T_SEAT_POSITIONUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    seatId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type T_SEAT_POSITIONCreateManyInput = {
    id?: number
    date: Date | string
    seatId: string
    userId: number
    created: Date | string
    updated?: Date | string | null
  }

  export type T_SEAT_POSITIONUpdateManyMutationInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type T_SEAT_POSITIONUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    seatId?: StringFieldUpdateOperationsInput | string
    userId?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type M_USERCreateInput = {
    employeeNumber: string
    lastName: string
    firstName: string
    showName?: string | null
    password: string
    adminFlag: boolean
    deleteFlag: boolean
    insideFlag: boolean
    seatAppointments?: M_SEAT_APPOINTCreateNestedManyWithoutUserInput
    seatPositions?: T_SEAT_POSITIONCreateNestedManyWithoutUserInput
  }

  export type M_USERUncheckedCreateInput = {
    userId?: number
    employeeNumber: string
    lastName: string
    firstName: string
    showName?: string | null
    password: string
    adminFlag: boolean
    deleteFlag: boolean
    insideFlag: boolean
    seatAppointments?: M_SEAT_APPOINTUncheckedCreateNestedManyWithoutUserInput
    seatPositions?: T_SEAT_POSITIONUncheckedCreateNestedManyWithoutUserInput
  }

  export type M_USERUpdateInput = {
    employeeNumber?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    showName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    adminFlag?: BoolFieldUpdateOperationsInput | boolean
    deleteFlag?: BoolFieldUpdateOperationsInput | boolean
    insideFlag?: BoolFieldUpdateOperationsInput | boolean
    seatAppointments?: M_SEAT_APPOINTUpdateManyWithoutUserNestedInput
    seatPositions?: T_SEAT_POSITIONUpdateManyWithoutUserNestedInput
  }

  export type M_USERUncheckedUpdateInput = {
    userId?: IntFieldUpdateOperationsInput | number
    employeeNumber?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    showName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    adminFlag?: BoolFieldUpdateOperationsInput | boolean
    deleteFlag?: BoolFieldUpdateOperationsInput | boolean
    insideFlag?: BoolFieldUpdateOperationsInput | boolean
    seatAppointments?: M_SEAT_APPOINTUncheckedUpdateManyWithoutUserNestedInput
    seatPositions?: T_SEAT_POSITIONUncheckedUpdateManyWithoutUserNestedInput
  }

  export type M_USERCreateManyInput = {
    userId?: number
    employeeNumber: string
    lastName: string
    firstName: string
    showName?: string | null
    password: string
    adminFlag: boolean
    deleteFlag: boolean
    insideFlag: boolean
  }

  export type M_USERUpdateManyMutationInput = {
    employeeNumber?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    showName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    adminFlag?: BoolFieldUpdateOperationsInput | boolean
    deleteFlag?: BoolFieldUpdateOperationsInput | boolean
    insideFlag?: BoolFieldUpdateOperationsInput | boolean
  }

  export type M_USERUncheckedUpdateManyInput = {
    userId?: IntFieldUpdateOperationsInput | number
    employeeNumber?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    showName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    adminFlag?: BoolFieldUpdateOperationsInput | boolean
    deleteFlag?: BoolFieldUpdateOperationsInput | boolean
    insideFlag?: BoolFieldUpdateOperationsInput | boolean
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

  export type M_SEAT_APPOINTListRelationFilter = {
    every?: M_SEAT_APPOINTWhereInput
    some?: M_SEAT_APPOINTWhereInput
    none?: M_SEAT_APPOINTWhereInput
  }

  export type T_SEAT_POSITIONListRelationFilter = {
    every?: T_SEAT_POSITIONWhereInput
    some?: T_SEAT_POSITIONWhereInput
    none?: T_SEAT_POSITIONWhereInput
  }

  export type M_SEAT_APPOINTOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type T_SEAT_POSITIONOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type M_SEATCountOrderByAggregateInput = {
    seatId?: SortOrder
    tableId?: SortOrder
    seatNumber?: SortOrder
    status?: SortOrder
    imageX?: SortOrder
    imageY?: SortOrder
  }

  export type M_SEATAvgOrderByAggregateInput = {
    seatNumber?: SortOrder
    status?: SortOrder
    imageX?: SortOrder
    imageY?: SortOrder
  }

  export type M_SEATMaxOrderByAggregateInput = {
    seatId?: SortOrder
    tableId?: SortOrder
    seatNumber?: SortOrder
    status?: SortOrder
    imageX?: SortOrder
    imageY?: SortOrder
  }

  export type M_SEATMinOrderByAggregateInput = {
    seatId?: SortOrder
    tableId?: SortOrder
    seatNumber?: SortOrder
    status?: SortOrder
    imageX?: SortOrder
    imageY?: SortOrder
  }

  export type M_SEATSumOrderByAggregateInput = {
    seatNumber?: SortOrder
    status?: SortOrder
    imageX?: SortOrder
    imageY?: SortOrder
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

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type M_SEATScalarRelationFilter = {
    is?: M_SEATWhereInput
    isNot?: M_SEATWhereInput
  }

  export type M_USERScalarRelationFilter = {
    is?: M_USERWhereInput
    isNot?: M_USERWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type M_SEAT_APPOINTCountOrderByAggregateInput = {
    id?: SortOrder
    appointId?: SortOrder
    seatId?: SortOrder
    userId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    created?: SortOrder
    updated?: SortOrder
  }

  export type M_SEAT_APPOINTAvgOrderByAggregateInput = {
    id?: SortOrder
    appointId?: SortOrder
    userId?: SortOrder
  }

  export type M_SEAT_APPOINTMaxOrderByAggregateInput = {
    id?: SortOrder
    appointId?: SortOrder
    seatId?: SortOrder
    userId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    created?: SortOrder
    updated?: SortOrder
  }

  export type M_SEAT_APPOINTMinOrderByAggregateInput = {
    id?: SortOrder
    appointId?: SortOrder
    seatId?: SortOrder
    userId?: SortOrder
    startDate?: SortOrder
    endDate?: SortOrder
    created?: SortOrder
    updated?: SortOrder
  }

  export type M_SEAT_APPOINTSumOrderByAggregateInput = {
    id?: SortOrder
    appointId?: SortOrder
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

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type T_SEAT_POSITIONDateUserIdCompoundUniqueInput = {
    date: Date | string
    userId: number
  }

  export type T_SEAT_POSITIONCountOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    seatId?: SortOrder
    userId?: SortOrder
    created?: SortOrder
    updated?: SortOrder
  }

  export type T_SEAT_POSITIONAvgOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type T_SEAT_POSITIONMaxOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    seatId?: SortOrder
    userId?: SortOrder
    created?: SortOrder
    updated?: SortOrder
  }

  export type T_SEAT_POSITIONMinOrderByAggregateInput = {
    id?: SortOrder
    date?: SortOrder
    seatId?: SortOrder
    userId?: SortOrder
    created?: SortOrder
    updated?: SortOrder
  }

  export type T_SEAT_POSITIONSumOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type M_USERCountOrderByAggregateInput = {
    userId?: SortOrder
    employeeNumber?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    showName?: SortOrder
    password?: SortOrder
    adminFlag?: SortOrder
    deleteFlag?: SortOrder
    insideFlag?: SortOrder
  }

  export type M_USERAvgOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type M_USERMaxOrderByAggregateInput = {
    userId?: SortOrder
    employeeNumber?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    showName?: SortOrder
    password?: SortOrder
    adminFlag?: SortOrder
    deleteFlag?: SortOrder
    insideFlag?: SortOrder
  }

  export type M_USERMinOrderByAggregateInput = {
    userId?: SortOrder
    employeeNumber?: SortOrder
    lastName?: SortOrder
    firstName?: SortOrder
    showName?: SortOrder
    password?: SortOrder
    adminFlag?: SortOrder
    deleteFlag?: SortOrder
    insideFlag?: SortOrder
  }

  export type M_USERSumOrderByAggregateInput = {
    userId?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type M_SEAT_APPOINTCreateNestedManyWithoutSeatInput = {
    create?: XOR<M_SEAT_APPOINTCreateWithoutSeatInput, M_SEAT_APPOINTUncheckedCreateWithoutSeatInput> | M_SEAT_APPOINTCreateWithoutSeatInput[] | M_SEAT_APPOINTUncheckedCreateWithoutSeatInput[]
    connectOrCreate?: M_SEAT_APPOINTCreateOrConnectWithoutSeatInput | M_SEAT_APPOINTCreateOrConnectWithoutSeatInput[]
    createMany?: M_SEAT_APPOINTCreateManySeatInputEnvelope
    connect?: M_SEAT_APPOINTWhereUniqueInput | M_SEAT_APPOINTWhereUniqueInput[]
  }

  export type T_SEAT_POSITIONCreateNestedManyWithoutSeatInput = {
    create?: XOR<T_SEAT_POSITIONCreateWithoutSeatInput, T_SEAT_POSITIONUncheckedCreateWithoutSeatInput> | T_SEAT_POSITIONCreateWithoutSeatInput[] | T_SEAT_POSITIONUncheckedCreateWithoutSeatInput[]
    connectOrCreate?: T_SEAT_POSITIONCreateOrConnectWithoutSeatInput | T_SEAT_POSITIONCreateOrConnectWithoutSeatInput[]
    createMany?: T_SEAT_POSITIONCreateManySeatInputEnvelope
    connect?: T_SEAT_POSITIONWhereUniqueInput | T_SEAT_POSITIONWhereUniqueInput[]
  }

  export type M_SEAT_APPOINTUncheckedCreateNestedManyWithoutSeatInput = {
    create?: XOR<M_SEAT_APPOINTCreateWithoutSeatInput, M_SEAT_APPOINTUncheckedCreateWithoutSeatInput> | M_SEAT_APPOINTCreateWithoutSeatInput[] | M_SEAT_APPOINTUncheckedCreateWithoutSeatInput[]
    connectOrCreate?: M_SEAT_APPOINTCreateOrConnectWithoutSeatInput | M_SEAT_APPOINTCreateOrConnectWithoutSeatInput[]
    createMany?: M_SEAT_APPOINTCreateManySeatInputEnvelope
    connect?: M_SEAT_APPOINTWhereUniqueInput | M_SEAT_APPOINTWhereUniqueInput[]
  }

  export type T_SEAT_POSITIONUncheckedCreateNestedManyWithoutSeatInput = {
    create?: XOR<T_SEAT_POSITIONCreateWithoutSeatInput, T_SEAT_POSITIONUncheckedCreateWithoutSeatInput> | T_SEAT_POSITIONCreateWithoutSeatInput[] | T_SEAT_POSITIONUncheckedCreateWithoutSeatInput[]
    connectOrCreate?: T_SEAT_POSITIONCreateOrConnectWithoutSeatInput | T_SEAT_POSITIONCreateOrConnectWithoutSeatInput[]
    createMany?: T_SEAT_POSITIONCreateManySeatInputEnvelope
    connect?: T_SEAT_POSITIONWhereUniqueInput | T_SEAT_POSITIONWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type M_SEAT_APPOINTUpdateManyWithoutSeatNestedInput = {
    create?: XOR<M_SEAT_APPOINTCreateWithoutSeatInput, M_SEAT_APPOINTUncheckedCreateWithoutSeatInput> | M_SEAT_APPOINTCreateWithoutSeatInput[] | M_SEAT_APPOINTUncheckedCreateWithoutSeatInput[]
    connectOrCreate?: M_SEAT_APPOINTCreateOrConnectWithoutSeatInput | M_SEAT_APPOINTCreateOrConnectWithoutSeatInput[]
    upsert?: M_SEAT_APPOINTUpsertWithWhereUniqueWithoutSeatInput | M_SEAT_APPOINTUpsertWithWhereUniqueWithoutSeatInput[]
    createMany?: M_SEAT_APPOINTCreateManySeatInputEnvelope
    set?: M_SEAT_APPOINTWhereUniqueInput | M_SEAT_APPOINTWhereUniqueInput[]
    disconnect?: M_SEAT_APPOINTWhereUniqueInput | M_SEAT_APPOINTWhereUniqueInput[]
    delete?: M_SEAT_APPOINTWhereUniqueInput | M_SEAT_APPOINTWhereUniqueInput[]
    connect?: M_SEAT_APPOINTWhereUniqueInput | M_SEAT_APPOINTWhereUniqueInput[]
    update?: M_SEAT_APPOINTUpdateWithWhereUniqueWithoutSeatInput | M_SEAT_APPOINTUpdateWithWhereUniqueWithoutSeatInput[]
    updateMany?: M_SEAT_APPOINTUpdateManyWithWhereWithoutSeatInput | M_SEAT_APPOINTUpdateManyWithWhereWithoutSeatInput[]
    deleteMany?: M_SEAT_APPOINTScalarWhereInput | M_SEAT_APPOINTScalarWhereInput[]
  }

  export type T_SEAT_POSITIONUpdateManyWithoutSeatNestedInput = {
    create?: XOR<T_SEAT_POSITIONCreateWithoutSeatInput, T_SEAT_POSITIONUncheckedCreateWithoutSeatInput> | T_SEAT_POSITIONCreateWithoutSeatInput[] | T_SEAT_POSITIONUncheckedCreateWithoutSeatInput[]
    connectOrCreate?: T_SEAT_POSITIONCreateOrConnectWithoutSeatInput | T_SEAT_POSITIONCreateOrConnectWithoutSeatInput[]
    upsert?: T_SEAT_POSITIONUpsertWithWhereUniqueWithoutSeatInput | T_SEAT_POSITIONUpsertWithWhereUniqueWithoutSeatInput[]
    createMany?: T_SEAT_POSITIONCreateManySeatInputEnvelope
    set?: T_SEAT_POSITIONWhereUniqueInput | T_SEAT_POSITIONWhereUniqueInput[]
    disconnect?: T_SEAT_POSITIONWhereUniqueInput | T_SEAT_POSITIONWhereUniqueInput[]
    delete?: T_SEAT_POSITIONWhereUniqueInput | T_SEAT_POSITIONWhereUniqueInput[]
    connect?: T_SEAT_POSITIONWhereUniqueInput | T_SEAT_POSITIONWhereUniqueInput[]
    update?: T_SEAT_POSITIONUpdateWithWhereUniqueWithoutSeatInput | T_SEAT_POSITIONUpdateWithWhereUniqueWithoutSeatInput[]
    updateMany?: T_SEAT_POSITIONUpdateManyWithWhereWithoutSeatInput | T_SEAT_POSITIONUpdateManyWithWhereWithoutSeatInput[]
    deleteMany?: T_SEAT_POSITIONScalarWhereInput | T_SEAT_POSITIONScalarWhereInput[]
  }

  export type M_SEAT_APPOINTUncheckedUpdateManyWithoutSeatNestedInput = {
    create?: XOR<M_SEAT_APPOINTCreateWithoutSeatInput, M_SEAT_APPOINTUncheckedCreateWithoutSeatInput> | M_SEAT_APPOINTCreateWithoutSeatInput[] | M_SEAT_APPOINTUncheckedCreateWithoutSeatInput[]
    connectOrCreate?: M_SEAT_APPOINTCreateOrConnectWithoutSeatInput | M_SEAT_APPOINTCreateOrConnectWithoutSeatInput[]
    upsert?: M_SEAT_APPOINTUpsertWithWhereUniqueWithoutSeatInput | M_SEAT_APPOINTUpsertWithWhereUniqueWithoutSeatInput[]
    createMany?: M_SEAT_APPOINTCreateManySeatInputEnvelope
    set?: M_SEAT_APPOINTWhereUniqueInput | M_SEAT_APPOINTWhereUniqueInput[]
    disconnect?: M_SEAT_APPOINTWhereUniqueInput | M_SEAT_APPOINTWhereUniqueInput[]
    delete?: M_SEAT_APPOINTWhereUniqueInput | M_SEAT_APPOINTWhereUniqueInput[]
    connect?: M_SEAT_APPOINTWhereUniqueInput | M_SEAT_APPOINTWhereUniqueInput[]
    update?: M_SEAT_APPOINTUpdateWithWhereUniqueWithoutSeatInput | M_SEAT_APPOINTUpdateWithWhereUniqueWithoutSeatInput[]
    updateMany?: M_SEAT_APPOINTUpdateManyWithWhereWithoutSeatInput | M_SEAT_APPOINTUpdateManyWithWhereWithoutSeatInput[]
    deleteMany?: M_SEAT_APPOINTScalarWhereInput | M_SEAT_APPOINTScalarWhereInput[]
  }

  export type T_SEAT_POSITIONUncheckedUpdateManyWithoutSeatNestedInput = {
    create?: XOR<T_SEAT_POSITIONCreateWithoutSeatInput, T_SEAT_POSITIONUncheckedCreateWithoutSeatInput> | T_SEAT_POSITIONCreateWithoutSeatInput[] | T_SEAT_POSITIONUncheckedCreateWithoutSeatInput[]
    connectOrCreate?: T_SEAT_POSITIONCreateOrConnectWithoutSeatInput | T_SEAT_POSITIONCreateOrConnectWithoutSeatInput[]
    upsert?: T_SEAT_POSITIONUpsertWithWhereUniqueWithoutSeatInput | T_SEAT_POSITIONUpsertWithWhereUniqueWithoutSeatInput[]
    createMany?: T_SEAT_POSITIONCreateManySeatInputEnvelope
    set?: T_SEAT_POSITIONWhereUniqueInput | T_SEAT_POSITIONWhereUniqueInput[]
    disconnect?: T_SEAT_POSITIONWhereUniqueInput | T_SEAT_POSITIONWhereUniqueInput[]
    delete?: T_SEAT_POSITIONWhereUniqueInput | T_SEAT_POSITIONWhereUniqueInput[]
    connect?: T_SEAT_POSITIONWhereUniqueInput | T_SEAT_POSITIONWhereUniqueInput[]
    update?: T_SEAT_POSITIONUpdateWithWhereUniqueWithoutSeatInput | T_SEAT_POSITIONUpdateWithWhereUniqueWithoutSeatInput[]
    updateMany?: T_SEAT_POSITIONUpdateManyWithWhereWithoutSeatInput | T_SEAT_POSITIONUpdateManyWithWhereWithoutSeatInput[]
    deleteMany?: T_SEAT_POSITIONScalarWhereInput | T_SEAT_POSITIONScalarWhereInput[]
  }

  export type M_SEATCreateNestedOneWithoutSeatAppointmentsInput = {
    create?: XOR<M_SEATCreateWithoutSeatAppointmentsInput, M_SEATUncheckedCreateWithoutSeatAppointmentsInput>
    connectOrCreate?: M_SEATCreateOrConnectWithoutSeatAppointmentsInput
    connect?: M_SEATWhereUniqueInput
  }

  export type M_USERCreateNestedOneWithoutSeatAppointmentsInput = {
    create?: XOR<M_USERCreateWithoutSeatAppointmentsInput, M_USERUncheckedCreateWithoutSeatAppointmentsInput>
    connectOrCreate?: M_USERCreateOrConnectWithoutSeatAppointmentsInput
    connect?: M_USERWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type M_SEATUpdateOneRequiredWithoutSeatAppointmentsNestedInput = {
    create?: XOR<M_SEATCreateWithoutSeatAppointmentsInput, M_SEATUncheckedCreateWithoutSeatAppointmentsInput>
    connectOrCreate?: M_SEATCreateOrConnectWithoutSeatAppointmentsInput
    upsert?: M_SEATUpsertWithoutSeatAppointmentsInput
    connect?: M_SEATWhereUniqueInput
    update?: XOR<XOR<M_SEATUpdateToOneWithWhereWithoutSeatAppointmentsInput, M_SEATUpdateWithoutSeatAppointmentsInput>, M_SEATUncheckedUpdateWithoutSeatAppointmentsInput>
  }

  export type M_USERUpdateOneRequiredWithoutSeatAppointmentsNestedInput = {
    create?: XOR<M_USERCreateWithoutSeatAppointmentsInput, M_USERUncheckedCreateWithoutSeatAppointmentsInput>
    connectOrCreate?: M_USERCreateOrConnectWithoutSeatAppointmentsInput
    upsert?: M_USERUpsertWithoutSeatAppointmentsInput
    connect?: M_USERWhereUniqueInput
    update?: XOR<XOR<M_USERUpdateToOneWithWhereWithoutSeatAppointmentsInput, M_USERUpdateWithoutSeatAppointmentsInput>, M_USERUncheckedUpdateWithoutSeatAppointmentsInput>
  }

  export type M_SEATCreateNestedOneWithoutSeatPositionsInput = {
    create?: XOR<M_SEATCreateWithoutSeatPositionsInput, M_SEATUncheckedCreateWithoutSeatPositionsInput>
    connectOrCreate?: M_SEATCreateOrConnectWithoutSeatPositionsInput
    connect?: M_SEATWhereUniqueInput
  }

  export type M_USERCreateNestedOneWithoutSeatPositionsInput = {
    create?: XOR<M_USERCreateWithoutSeatPositionsInput, M_USERUncheckedCreateWithoutSeatPositionsInput>
    connectOrCreate?: M_USERCreateOrConnectWithoutSeatPositionsInput
    connect?: M_USERWhereUniqueInput
  }

  export type M_SEATUpdateOneRequiredWithoutSeatPositionsNestedInput = {
    create?: XOR<M_SEATCreateWithoutSeatPositionsInput, M_SEATUncheckedCreateWithoutSeatPositionsInput>
    connectOrCreate?: M_SEATCreateOrConnectWithoutSeatPositionsInput
    upsert?: M_SEATUpsertWithoutSeatPositionsInput
    connect?: M_SEATWhereUniqueInput
    update?: XOR<XOR<M_SEATUpdateToOneWithWhereWithoutSeatPositionsInput, M_SEATUpdateWithoutSeatPositionsInput>, M_SEATUncheckedUpdateWithoutSeatPositionsInput>
  }

  export type M_USERUpdateOneRequiredWithoutSeatPositionsNestedInput = {
    create?: XOR<M_USERCreateWithoutSeatPositionsInput, M_USERUncheckedCreateWithoutSeatPositionsInput>
    connectOrCreate?: M_USERCreateOrConnectWithoutSeatPositionsInput
    upsert?: M_USERUpsertWithoutSeatPositionsInput
    connect?: M_USERWhereUniqueInput
    update?: XOR<XOR<M_USERUpdateToOneWithWhereWithoutSeatPositionsInput, M_USERUpdateWithoutSeatPositionsInput>, M_USERUncheckedUpdateWithoutSeatPositionsInput>
  }

  export type M_SEAT_APPOINTCreateNestedManyWithoutUserInput = {
    create?: XOR<M_SEAT_APPOINTCreateWithoutUserInput, M_SEAT_APPOINTUncheckedCreateWithoutUserInput> | M_SEAT_APPOINTCreateWithoutUserInput[] | M_SEAT_APPOINTUncheckedCreateWithoutUserInput[]
    connectOrCreate?: M_SEAT_APPOINTCreateOrConnectWithoutUserInput | M_SEAT_APPOINTCreateOrConnectWithoutUserInput[]
    createMany?: M_SEAT_APPOINTCreateManyUserInputEnvelope
    connect?: M_SEAT_APPOINTWhereUniqueInput | M_SEAT_APPOINTWhereUniqueInput[]
  }

  export type T_SEAT_POSITIONCreateNestedManyWithoutUserInput = {
    create?: XOR<T_SEAT_POSITIONCreateWithoutUserInput, T_SEAT_POSITIONUncheckedCreateWithoutUserInput> | T_SEAT_POSITIONCreateWithoutUserInput[] | T_SEAT_POSITIONUncheckedCreateWithoutUserInput[]
    connectOrCreate?: T_SEAT_POSITIONCreateOrConnectWithoutUserInput | T_SEAT_POSITIONCreateOrConnectWithoutUserInput[]
    createMany?: T_SEAT_POSITIONCreateManyUserInputEnvelope
    connect?: T_SEAT_POSITIONWhereUniqueInput | T_SEAT_POSITIONWhereUniqueInput[]
  }

  export type M_SEAT_APPOINTUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<M_SEAT_APPOINTCreateWithoutUserInput, M_SEAT_APPOINTUncheckedCreateWithoutUserInput> | M_SEAT_APPOINTCreateWithoutUserInput[] | M_SEAT_APPOINTUncheckedCreateWithoutUserInput[]
    connectOrCreate?: M_SEAT_APPOINTCreateOrConnectWithoutUserInput | M_SEAT_APPOINTCreateOrConnectWithoutUserInput[]
    createMany?: M_SEAT_APPOINTCreateManyUserInputEnvelope
    connect?: M_SEAT_APPOINTWhereUniqueInput | M_SEAT_APPOINTWhereUniqueInput[]
  }

  export type T_SEAT_POSITIONUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<T_SEAT_POSITIONCreateWithoutUserInput, T_SEAT_POSITIONUncheckedCreateWithoutUserInput> | T_SEAT_POSITIONCreateWithoutUserInput[] | T_SEAT_POSITIONUncheckedCreateWithoutUserInput[]
    connectOrCreate?: T_SEAT_POSITIONCreateOrConnectWithoutUserInput | T_SEAT_POSITIONCreateOrConnectWithoutUserInput[]
    createMany?: T_SEAT_POSITIONCreateManyUserInputEnvelope
    connect?: T_SEAT_POSITIONWhereUniqueInput | T_SEAT_POSITIONWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type M_SEAT_APPOINTUpdateManyWithoutUserNestedInput = {
    create?: XOR<M_SEAT_APPOINTCreateWithoutUserInput, M_SEAT_APPOINTUncheckedCreateWithoutUserInput> | M_SEAT_APPOINTCreateWithoutUserInput[] | M_SEAT_APPOINTUncheckedCreateWithoutUserInput[]
    connectOrCreate?: M_SEAT_APPOINTCreateOrConnectWithoutUserInput | M_SEAT_APPOINTCreateOrConnectWithoutUserInput[]
    upsert?: M_SEAT_APPOINTUpsertWithWhereUniqueWithoutUserInput | M_SEAT_APPOINTUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: M_SEAT_APPOINTCreateManyUserInputEnvelope
    set?: M_SEAT_APPOINTWhereUniqueInput | M_SEAT_APPOINTWhereUniqueInput[]
    disconnect?: M_SEAT_APPOINTWhereUniqueInput | M_SEAT_APPOINTWhereUniqueInput[]
    delete?: M_SEAT_APPOINTWhereUniqueInput | M_SEAT_APPOINTWhereUniqueInput[]
    connect?: M_SEAT_APPOINTWhereUniqueInput | M_SEAT_APPOINTWhereUniqueInput[]
    update?: M_SEAT_APPOINTUpdateWithWhereUniqueWithoutUserInput | M_SEAT_APPOINTUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: M_SEAT_APPOINTUpdateManyWithWhereWithoutUserInput | M_SEAT_APPOINTUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: M_SEAT_APPOINTScalarWhereInput | M_SEAT_APPOINTScalarWhereInput[]
  }

  export type T_SEAT_POSITIONUpdateManyWithoutUserNestedInput = {
    create?: XOR<T_SEAT_POSITIONCreateWithoutUserInput, T_SEAT_POSITIONUncheckedCreateWithoutUserInput> | T_SEAT_POSITIONCreateWithoutUserInput[] | T_SEAT_POSITIONUncheckedCreateWithoutUserInput[]
    connectOrCreate?: T_SEAT_POSITIONCreateOrConnectWithoutUserInput | T_SEAT_POSITIONCreateOrConnectWithoutUserInput[]
    upsert?: T_SEAT_POSITIONUpsertWithWhereUniqueWithoutUserInput | T_SEAT_POSITIONUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: T_SEAT_POSITIONCreateManyUserInputEnvelope
    set?: T_SEAT_POSITIONWhereUniqueInput | T_SEAT_POSITIONWhereUniqueInput[]
    disconnect?: T_SEAT_POSITIONWhereUniqueInput | T_SEAT_POSITIONWhereUniqueInput[]
    delete?: T_SEAT_POSITIONWhereUniqueInput | T_SEAT_POSITIONWhereUniqueInput[]
    connect?: T_SEAT_POSITIONWhereUniqueInput | T_SEAT_POSITIONWhereUniqueInput[]
    update?: T_SEAT_POSITIONUpdateWithWhereUniqueWithoutUserInput | T_SEAT_POSITIONUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: T_SEAT_POSITIONUpdateManyWithWhereWithoutUserInput | T_SEAT_POSITIONUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: T_SEAT_POSITIONScalarWhereInput | T_SEAT_POSITIONScalarWhereInput[]
  }

  export type M_SEAT_APPOINTUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<M_SEAT_APPOINTCreateWithoutUserInput, M_SEAT_APPOINTUncheckedCreateWithoutUserInput> | M_SEAT_APPOINTCreateWithoutUserInput[] | M_SEAT_APPOINTUncheckedCreateWithoutUserInput[]
    connectOrCreate?: M_SEAT_APPOINTCreateOrConnectWithoutUserInput | M_SEAT_APPOINTCreateOrConnectWithoutUserInput[]
    upsert?: M_SEAT_APPOINTUpsertWithWhereUniqueWithoutUserInput | M_SEAT_APPOINTUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: M_SEAT_APPOINTCreateManyUserInputEnvelope
    set?: M_SEAT_APPOINTWhereUniqueInput | M_SEAT_APPOINTWhereUniqueInput[]
    disconnect?: M_SEAT_APPOINTWhereUniqueInput | M_SEAT_APPOINTWhereUniqueInput[]
    delete?: M_SEAT_APPOINTWhereUniqueInput | M_SEAT_APPOINTWhereUniqueInput[]
    connect?: M_SEAT_APPOINTWhereUniqueInput | M_SEAT_APPOINTWhereUniqueInput[]
    update?: M_SEAT_APPOINTUpdateWithWhereUniqueWithoutUserInput | M_SEAT_APPOINTUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: M_SEAT_APPOINTUpdateManyWithWhereWithoutUserInput | M_SEAT_APPOINTUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: M_SEAT_APPOINTScalarWhereInput | M_SEAT_APPOINTScalarWhereInput[]
  }

  export type T_SEAT_POSITIONUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<T_SEAT_POSITIONCreateWithoutUserInput, T_SEAT_POSITIONUncheckedCreateWithoutUserInput> | T_SEAT_POSITIONCreateWithoutUserInput[] | T_SEAT_POSITIONUncheckedCreateWithoutUserInput[]
    connectOrCreate?: T_SEAT_POSITIONCreateOrConnectWithoutUserInput | T_SEAT_POSITIONCreateOrConnectWithoutUserInput[]
    upsert?: T_SEAT_POSITIONUpsertWithWhereUniqueWithoutUserInput | T_SEAT_POSITIONUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: T_SEAT_POSITIONCreateManyUserInputEnvelope
    set?: T_SEAT_POSITIONWhereUniqueInput | T_SEAT_POSITIONWhereUniqueInput[]
    disconnect?: T_SEAT_POSITIONWhereUniqueInput | T_SEAT_POSITIONWhereUniqueInput[]
    delete?: T_SEAT_POSITIONWhereUniqueInput | T_SEAT_POSITIONWhereUniqueInput[]
    connect?: T_SEAT_POSITIONWhereUniqueInput | T_SEAT_POSITIONWhereUniqueInput[]
    update?: T_SEAT_POSITIONUpdateWithWhereUniqueWithoutUserInput | T_SEAT_POSITIONUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: T_SEAT_POSITIONUpdateManyWithWhereWithoutUserInput | T_SEAT_POSITIONUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: T_SEAT_POSITIONScalarWhereInput | T_SEAT_POSITIONScalarWhereInput[]
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

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
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

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type M_SEAT_APPOINTCreateWithoutSeatInput = {
    appointId: number
    startDate: Date | string
    endDate: Date | string
    created: Date | string
    updated?: Date | string | null
    user: M_USERCreateNestedOneWithoutSeatAppointmentsInput
  }

  export type M_SEAT_APPOINTUncheckedCreateWithoutSeatInput = {
    id?: number
    appointId: number
    userId: number
    startDate: Date | string
    endDate: Date | string
    created: Date | string
    updated?: Date | string | null
  }

  export type M_SEAT_APPOINTCreateOrConnectWithoutSeatInput = {
    where: M_SEAT_APPOINTWhereUniqueInput
    create: XOR<M_SEAT_APPOINTCreateWithoutSeatInput, M_SEAT_APPOINTUncheckedCreateWithoutSeatInput>
  }

  export type M_SEAT_APPOINTCreateManySeatInputEnvelope = {
    data: M_SEAT_APPOINTCreateManySeatInput | M_SEAT_APPOINTCreateManySeatInput[]
    skipDuplicates?: boolean
  }

  export type T_SEAT_POSITIONCreateWithoutSeatInput = {
    date: Date | string
    created: Date | string
    updated?: Date | string | null
    user: M_USERCreateNestedOneWithoutSeatPositionsInput
  }

  export type T_SEAT_POSITIONUncheckedCreateWithoutSeatInput = {
    id?: number
    date: Date | string
    userId: number
    created: Date | string
    updated?: Date | string | null
  }

  export type T_SEAT_POSITIONCreateOrConnectWithoutSeatInput = {
    where: T_SEAT_POSITIONWhereUniqueInput
    create: XOR<T_SEAT_POSITIONCreateWithoutSeatInput, T_SEAT_POSITIONUncheckedCreateWithoutSeatInput>
  }

  export type T_SEAT_POSITIONCreateManySeatInputEnvelope = {
    data: T_SEAT_POSITIONCreateManySeatInput | T_SEAT_POSITIONCreateManySeatInput[]
    skipDuplicates?: boolean
  }

  export type M_SEAT_APPOINTUpsertWithWhereUniqueWithoutSeatInput = {
    where: M_SEAT_APPOINTWhereUniqueInput
    update: XOR<M_SEAT_APPOINTUpdateWithoutSeatInput, M_SEAT_APPOINTUncheckedUpdateWithoutSeatInput>
    create: XOR<M_SEAT_APPOINTCreateWithoutSeatInput, M_SEAT_APPOINTUncheckedCreateWithoutSeatInput>
  }

  export type M_SEAT_APPOINTUpdateWithWhereUniqueWithoutSeatInput = {
    where: M_SEAT_APPOINTWhereUniqueInput
    data: XOR<M_SEAT_APPOINTUpdateWithoutSeatInput, M_SEAT_APPOINTUncheckedUpdateWithoutSeatInput>
  }

  export type M_SEAT_APPOINTUpdateManyWithWhereWithoutSeatInput = {
    where: M_SEAT_APPOINTScalarWhereInput
    data: XOR<M_SEAT_APPOINTUpdateManyMutationInput, M_SEAT_APPOINTUncheckedUpdateManyWithoutSeatInput>
  }

  export type M_SEAT_APPOINTScalarWhereInput = {
    AND?: M_SEAT_APPOINTScalarWhereInput | M_SEAT_APPOINTScalarWhereInput[]
    OR?: M_SEAT_APPOINTScalarWhereInput[]
    NOT?: M_SEAT_APPOINTScalarWhereInput | M_SEAT_APPOINTScalarWhereInput[]
    id?: IntFilter<"M_SEAT_APPOINT"> | number
    appointId?: IntFilter<"M_SEAT_APPOINT"> | number
    seatId?: StringFilter<"M_SEAT_APPOINT"> | string
    userId?: IntFilter<"M_SEAT_APPOINT"> | number
    startDate?: DateTimeFilter<"M_SEAT_APPOINT"> | Date | string
    endDate?: DateTimeFilter<"M_SEAT_APPOINT"> | Date | string
    created?: DateTimeFilter<"M_SEAT_APPOINT"> | Date | string
    updated?: DateTimeNullableFilter<"M_SEAT_APPOINT"> | Date | string | null
  }

  export type T_SEAT_POSITIONUpsertWithWhereUniqueWithoutSeatInput = {
    where: T_SEAT_POSITIONWhereUniqueInput
    update: XOR<T_SEAT_POSITIONUpdateWithoutSeatInput, T_SEAT_POSITIONUncheckedUpdateWithoutSeatInput>
    create: XOR<T_SEAT_POSITIONCreateWithoutSeatInput, T_SEAT_POSITIONUncheckedCreateWithoutSeatInput>
  }

  export type T_SEAT_POSITIONUpdateWithWhereUniqueWithoutSeatInput = {
    where: T_SEAT_POSITIONWhereUniqueInput
    data: XOR<T_SEAT_POSITIONUpdateWithoutSeatInput, T_SEAT_POSITIONUncheckedUpdateWithoutSeatInput>
  }

  export type T_SEAT_POSITIONUpdateManyWithWhereWithoutSeatInput = {
    where: T_SEAT_POSITIONScalarWhereInput
    data: XOR<T_SEAT_POSITIONUpdateManyMutationInput, T_SEAT_POSITIONUncheckedUpdateManyWithoutSeatInput>
  }

  export type T_SEAT_POSITIONScalarWhereInput = {
    AND?: T_SEAT_POSITIONScalarWhereInput | T_SEAT_POSITIONScalarWhereInput[]
    OR?: T_SEAT_POSITIONScalarWhereInput[]
    NOT?: T_SEAT_POSITIONScalarWhereInput | T_SEAT_POSITIONScalarWhereInput[]
    id?: IntFilter<"T_SEAT_POSITION"> | number
    date?: DateTimeFilter<"T_SEAT_POSITION"> | Date | string
    seatId?: StringFilter<"T_SEAT_POSITION"> | string
    userId?: IntFilter<"T_SEAT_POSITION"> | number
    created?: DateTimeFilter<"T_SEAT_POSITION"> | Date | string
    updated?: DateTimeNullableFilter<"T_SEAT_POSITION"> | Date | string | null
  }

  export type M_SEATCreateWithoutSeatAppointmentsInput = {
    seatId: string
    tableId: string
    seatNumber: number
    status: number
    imageX: number
    imageY: number
    seatPositions?: T_SEAT_POSITIONCreateNestedManyWithoutSeatInput
  }

  export type M_SEATUncheckedCreateWithoutSeatAppointmentsInput = {
    seatId: string
    tableId: string
    seatNumber: number
    status: number
    imageX: number
    imageY: number
    seatPositions?: T_SEAT_POSITIONUncheckedCreateNestedManyWithoutSeatInput
  }

  export type M_SEATCreateOrConnectWithoutSeatAppointmentsInput = {
    where: M_SEATWhereUniqueInput
    create: XOR<M_SEATCreateWithoutSeatAppointmentsInput, M_SEATUncheckedCreateWithoutSeatAppointmentsInput>
  }

  export type M_USERCreateWithoutSeatAppointmentsInput = {
    employeeNumber: string
    lastName: string
    firstName: string
    showName?: string | null
    password: string
    adminFlag: boolean
    deleteFlag: boolean
    insideFlag: boolean
    seatPositions?: T_SEAT_POSITIONCreateNestedManyWithoutUserInput
  }

  export type M_USERUncheckedCreateWithoutSeatAppointmentsInput = {
    userId?: number
    employeeNumber: string
    lastName: string
    firstName: string
    showName?: string | null
    password: string
    adminFlag: boolean
    deleteFlag: boolean
    insideFlag: boolean
    seatPositions?: T_SEAT_POSITIONUncheckedCreateNestedManyWithoutUserInput
  }

  export type M_USERCreateOrConnectWithoutSeatAppointmentsInput = {
    where: M_USERWhereUniqueInput
    create: XOR<M_USERCreateWithoutSeatAppointmentsInput, M_USERUncheckedCreateWithoutSeatAppointmentsInput>
  }

  export type M_SEATUpsertWithoutSeatAppointmentsInput = {
    update: XOR<M_SEATUpdateWithoutSeatAppointmentsInput, M_SEATUncheckedUpdateWithoutSeatAppointmentsInput>
    create: XOR<M_SEATCreateWithoutSeatAppointmentsInput, M_SEATUncheckedCreateWithoutSeatAppointmentsInput>
    where?: M_SEATWhereInput
  }

  export type M_SEATUpdateToOneWithWhereWithoutSeatAppointmentsInput = {
    where?: M_SEATWhereInput
    data: XOR<M_SEATUpdateWithoutSeatAppointmentsInput, M_SEATUncheckedUpdateWithoutSeatAppointmentsInput>
  }

  export type M_SEATUpdateWithoutSeatAppointmentsInput = {
    seatId?: StringFieldUpdateOperationsInput | string
    tableId?: StringFieldUpdateOperationsInput | string
    seatNumber?: IntFieldUpdateOperationsInput | number
    status?: IntFieldUpdateOperationsInput | number
    imageX?: IntFieldUpdateOperationsInput | number
    imageY?: IntFieldUpdateOperationsInput | number
    seatPositions?: T_SEAT_POSITIONUpdateManyWithoutSeatNestedInput
  }

  export type M_SEATUncheckedUpdateWithoutSeatAppointmentsInput = {
    seatId?: StringFieldUpdateOperationsInput | string
    tableId?: StringFieldUpdateOperationsInput | string
    seatNumber?: IntFieldUpdateOperationsInput | number
    status?: IntFieldUpdateOperationsInput | number
    imageX?: IntFieldUpdateOperationsInput | number
    imageY?: IntFieldUpdateOperationsInput | number
    seatPositions?: T_SEAT_POSITIONUncheckedUpdateManyWithoutSeatNestedInput
  }

  export type M_USERUpsertWithoutSeatAppointmentsInput = {
    update: XOR<M_USERUpdateWithoutSeatAppointmentsInput, M_USERUncheckedUpdateWithoutSeatAppointmentsInput>
    create: XOR<M_USERCreateWithoutSeatAppointmentsInput, M_USERUncheckedCreateWithoutSeatAppointmentsInput>
    where?: M_USERWhereInput
  }

  export type M_USERUpdateToOneWithWhereWithoutSeatAppointmentsInput = {
    where?: M_USERWhereInput
    data: XOR<M_USERUpdateWithoutSeatAppointmentsInput, M_USERUncheckedUpdateWithoutSeatAppointmentsInput>
  }

  export type M_USERUpdateWithoutSeatAppointmentsInput = {
    employeeNumber?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    showName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    adminFlag?: BoolFieldUpdateOperationsInput | boolean
    deleteFlag?: BoolFieldUpdateOperationsInput | boolean
    insideFlag?: BoolFieldUpdateOperationsInput | boolean
    seatPositions?: T_SEAT_POSITIONUpdateManyWithoutUserNestedInput
  }

  export type M_USERUncheckedUpdateWithoutSeatAppointmentsInput = {
    userId?: IntFieldUpdateOperationsInput | number
    employeeNumber?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    showName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    adminFlag?: BoolFieldUpdateOperationsInput | boolean
    deleteFlag?: BoolFieldUpdateOperationsInput | boolean
    insideFlag?: BoolFieldUpdateOperationsInput | boolean
    seatPositions?: T_SEAT_POSITIONUncheckedUpdateManyWithoutUserNestedInput
  }

  export type M_SEATCreateWithoutSeatPositionsInput = {
    seatId: string
    tableId: string
    seatNumber: number
    status: number
    imageX: number
    imageY: number
    seatAppointments?: M_SEAT_APPOINTCreateNestedManyWithoutSeatInput
  }

  export type M_SEATUncheckedCreateWithoutSeatPositionsInput = {
    seatId: string
    tableId: string
    seatNumber: number
    status: number
    imageX: number
    imageY: number
    seatAppointments?: M_SEAT_APPOINTUncheckedCreateNestedManyWithoutSeatInput
  }

  export type M_SEATCreateOrConnectWithoutSeatPositionsInput = {
    where: M_SEATWhereUniqueInput
    create: XOR<M_SEATCreateWithoutSeatPositionsInput, M_SEATUncheckedCreateWithoutSeatPositionsInput>
  }

  export type M_USERCreateWithoutSeatPositionsInput = {
    employeeNumber: string
    lastName: string
    firstName: string
    showName?: string | null
    password: string
    adminFlag: boolean
    deleteFlag: boolean
    insideFlag: boolean
    seatAppointments?: M_SEAT_APPOINTCreateNestedManyWithoutUserInput
  }

  export type M_USERUncheckedCreateWithoutSeatPositionsInput = {
    userId?: number
    employeeNumber: string
    lastName: string
    firstName: string
    showName?: string | null
    password: string
    adminFlag: boolean
    deleteFlag: boolean
    insideFlag: boolean
    seatAppointments?: M_SEAT_APPOINTUncheckedCreateNestedManyWithoutUserInput
  }

  export type M_USERCreateOrConnectWithoutSeatPositionsInput = {
    where: M_USERWhereUniqueInput
    create: XOR<M_USERCreateWithoutSeatPositionsInput, M_USERUncheckedCreateWithoutSeatPositionsInput>
  }

  export type M_SEATUpsertWithoutSeatPositionsInput = {
    update: XOR<M_SEATUpdateWithoutSeatPositionsInput, M_SEATUncheckedUpdateWithoutSeatPositionsInput>
    create: XOR<M_SEATCreateWithoutSeatPositionsInput, M_SEATUncheckedCreateWithoutSeatPositionsInput>
    where?: M_SEATWhereInput
  }

  export type M_SEATUpdateToOneWithWhereWithoutSeatPositionsInput = {
    where?: M_SEATWhereInput
    data: XOR<M_SEATUpdateWithoutSeatPositionsInput, M_SEATUncheckedUpdateWithoutSeatPositionsInput>
  }

  export type M_SEATUpdateWithoutSeatPositionsInput = {
    seatId?: StringFieldUpdateOperationsInput | string
    tableId?: StringFieldUpdateOperationsInput | string
    seatNumber?: IntFieldUpdateOperationsInput | number
    status?: IntFieldUpdateOperationsInput | number
    imageX?: IntFieldUpdateOperationsInput | number
    imageY?: IntFieldUpdateOperationsInput | number
    seatAppointments?: M_SEAT_APPOINTUpdateManyWithoutSeatNestedInput
  }

  export type M_SEATUncheckedUpdateWithoutSeatPositionsInput = {
    seatId?: StringFieldUpdateOperationsInput | string
    tableId?: StringFieldUpdateOperationsInput | string
    seatNumber?: IntFieldUpdateOperationsInput | number
    status?: IntFieldUpdateOperationsInput | number
    imageX?: IntFieldUpdateOperationsInput | number
    imageY?: IntFieldUpdateOperationsInput | number
    seatAppointments?: M_SEAT_APPOINTUncheckedUpdateManyWithoutSeatNestedInput
  }

  export type M_USERUpsertWithoutSeatPositionsInput = {
    update: XOR<M_USERUpdateWithoutSeatPositionsInput, M_USERUncheckedUpdateWithoutSeatPositionsInput>
    create: XOR<M_USERCreateWithoutSeatPositionsInput, M_USERUncheckedCreateWithoutSeatPositionsInput>
    where?: M_USERWhereInput
  }

  export type M_USERUpdateToOneWithWhereWithoutSeatPositionsInput = {
    where?: M_USERWhereInput
    data: XOR<M_USERUpdateWithoutSeatPositionsInput, M_USERUncheckedUpdateWithoutSeatPositionsInput>
  }

  export type M_USERUpdateWithoutSeatPositionsInput = {
    employeeNumber?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    showName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    adminFlag?: BoolFieldUpdateOperationsInput | boolean
    deleteFlag?: BoolFieldUpdateOperationsInput | boolean
    insideFlag?: BoolFieldUpdateOperationsInput | boolean
    seatAppointments?: M_SEAT_APPOINTUpdateManyWithoutUserNestedInput
  }

  export type M_USERUncheckedUpdateWithoutSeatPositionsInput = {
    userId?: IntFieldUpdateOperationsInput | number
    employeeNumber?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    showName?: NullableStringFieldUpdateOperationsInput | string | null
    password?: StringFieldUpdateOperationsInput | string
    adminFlag?: BoolFieldUpdateOperationsInput | boolean
    deleteFlag?: BoolFieldUpdateOperationsInput | boolean
    insideFlag?: BoolFieldUpdateOperationsInput | boolean
    seatAppointments?: M_SEAT_APPOINTUncheckedUpdateManyWithoutUserNestedInput
  }

  export type M_SEAT_APPOINTCreateWithoutUserInput = {
    appointId: number
    startDate: Date | string
    endDate: Date | string
    created: Date | string
    updated?: Date | string | null
    seat: M_SEATCreateNestedOneWithoutSeatAppointmentsInput
  }

  export type M_SEAT_APPOINTUncheckedCreateWithoutUserInput = {
    id?: number
    appointId: number
    seatId: string
    startDate: Date | string
    endDate: Date | string
    created: Date | string
    updated?: Date | string | null
  }

  export type M_SEAT_APPOINTCreateOrConnectWithoutUserInput = {
    where: M_SEAT_APPOINTWhereUniqueInput
    create: XOR<M_SEAT_APPOINTCreateWithoutUserInput, M_SEAT_APPOINTUncheckedCreateWithoutUserInput>
  }

  export type M_SEAT_APPOINTCreateManyUserInputEnvelope = {
    data: M_SEAT_APPOINTCreateManyUserInput | M_SEAT_APPOINTCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type T_SEAT_POSITIONCreateWithoutUserInput = {
    date: Date | string
    created: Date | string
    updated?: Date | string | null
    seat: M_SEATCreateNestedOneWithoutSeatPositionsInput
  }

  export type T_SEAT_POSITIONUncheckedCreateWithoutUserInput = {
    id?: number
    date: Date | string
    seatId: string
    created: Date | string
    updated?: Date | string | null
  }

  export type T_SEAT_POSITIONCreateOrConnectWithoutUserInput = {
    where: T_SEAT_POSITIONWhereUniqueInput
    create: XOR<T_SEAT_POSITIONCreateWithoutUserInput, T_SEAT_POSITIONUncheckedCreateWithoutUserInput>
  }

  export type T_SEAT_POSITIONCreateManyUserInputEnvelope = {
    data: T_SEAT_POSITIONCreateManyUserInput | T_SEAT_POSITIONCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type M_SEAT_APPOINTUpsertWithWhereUniqueWithoutUserInput = {
    where: M_SEAT_APPOINTWhereUniqueInput
    update: XOR<M_SEAT_APPOINTUpdateWithoutUserInput, M_SEAT_APPOINTUncheckedUpdateWithoutUserInput>
    create: XOR<M_SEAT_APPOINTCreateWithoutUserInput, M_SEAT_APPOINTUncheckedCreateWithoutUserInput>
  }

  export type M_SEAT_APPOINTUpdateWithWhereUniqueWithoutUserInput = {
    where: M_SEAT_APPOINTWhereUniqueInput
    data: XOR<M_SEAT_APPOINTUpdateWithoutUserInput, M_SEAT_APPOINTUncheckedUpdateWithoutUserInput>
  }

  export type M_SEAT_APPOINTUpdateManyWithWhereWithoutUserInput = {
    where: M_SEAT_APPOINTScalarWhereInput
    data: XOR<M_SEAT_APPOINTUpdateManyMutationInput, M_SEAT_APPOINTUncheckedUpdateManyWithoutUserInput>
  }

  export type T_SEAT_POSITIONUpsertWithWhereUniqueWithoutUserInput = {
    where: T_SEAT_POSITIONWhereUniqueInput
    update: XOR<T_SEAT_POSITIONUpdateWithoutUserInput, T_SEAT_POSITIONUncheckedUpdateWithoutUserInput>
    create: XOR<T_SEAT_POSITIONCreateWithoutUserInput, T_SEAT_POSITIONUncheckedCreateWithoutUserInput>
  }

  export type T_SEAT_POSITIONUpdateWithWhereUniqueWithoutUserInput = {
    where: T_SEAT_POSITIONWhereUniqueInput
    data: XOR<T_SEAT_POSITIONUpdateWithoutUserInput, T_SEAT_POSITIONUncheckedUpdateWithoutUserInput>
  }

  export type T_SEAT_POSITIONUpdateManyWithWhereWithoutUserInput = {
    where: T_SEAT_POSITIONScalarWhereInput
    data: XOR<T_SEAT_POSITIONUpdateManyMutationInput, T_SEAT_POSITIONUncheckedUpdateManyWithoutUserInput>
  }

  export type M_SEAT_APPOINTCreateManySeatInput = {
    id?: number
    appointId: number
    userId: number
    startDate: Date | string
    endDate: Date | string
    created: Date | string
    updated?: Date | string | null
  }

  export type T_SEAT_POSITIONCreateManySeatInput = {
    id?: number
    date: Date | string
    userId: number
    created: Date | string
    updated?: Date | string | null
  }

  export type M_SEAT_APPOINTUpdateWithoutSeatInput = {
    appointId?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: M_USERUpdateOneRequiredWithoutSeatAppointmentsNestedInput
  }

  export type M_SEAT_APPOINTUncheckedUpdateWithoutSeatInput = {
    id?: IntFieldUpdateOperationsInput | number
    appointId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type M_SEAT_APPOINTUncheckedUpdateManyWithoutSeatInput = {
    id?: IntFieldUpdateOperationsInput | number
    appointId?: IntFieldUpdateOperationsInput | number
    userId?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type T_SEAT_POSITIONUpdateWithoutSeatInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: M_USERUpdateOneRequiredWithoutSeatPositionsNestedInput
  }

  export type T_SEAT_POSITIONUncheckedUpdateWithoutSeatInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type T_SEAT_POSITIONUncheckedUpdateManyWithoutSeatInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: IntFieldUpdateOperationsInput | number
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type M_SEAT_APPOINTCreateManyUserInput = {
    id?: number
    appointId: number
    seatId: string
    startDate: Date | string
    endDate: Date | string
    created: Date | string
    updated?: Date | string | null
  }

  export type T_SEAT_POSITIONCreateManyUserInput = {
    id?: number
    date: Date | string
    seatId: string
    created: Date | string
    updated?: Date | string | null
  }

  export type M_SEAT_APPOINTUpdateWithoutUserInput = {
    appointId?: IntFieldUpdateOperationsInput | number
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seat?: M_SEATUpdateOneRequiredWithoutSeatAppointmentsNestedInput
  }

  export type M_SEAT_APPOINTUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    appointId?: IntFieldUpdateOperationsInput | number
    seatId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type M_SEAT_APPOINTUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    appointId?: IntFieldUpdateOperationsInput | number
    seatId?: StringFieldUpdateOperationsInput | string
    startDate?: DateTimeFieldUpdateOperationsInput | Date | string
    endDate?: DateTimeFieldUpdateOperationsInput | Date | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type T_SEAT_POSITIONUpdateWithoutUserInput = {
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    seat?: M_SEATUpdateOneRequiredWithoutSeatPositionsNestedInput
  }

  export type T_SEAT_POSITIONUncheckedUpdateWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    seatId?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type T_SEAT_POSITIONUncheckedUpdateManyWithoutUserInput = {
    id?: IntFieldUpdateOperationsInput | number
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    seatId?: StringFieldUpdateOperationsInput | string
    created?: DateTimeFieldUpdateOperationsInput | Date | string
    updated?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
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