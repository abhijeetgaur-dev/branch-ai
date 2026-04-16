
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
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Workspace
 * 
 */
export type Workspace = $Result.DefaultSelection<Prisma.$WorkspacePayload>
/**
 * Model WorkspaceMember
 * 
 */
export type WorkspaceMember = $Result.DefaultSelection<Prisma.$WorkspaceMemberPayload>
/**
 * Model Conversation
 * 
 */
export type Conversation = $Result.DefaultSelection<Prisma.$ConversationPayload>
/**
 * Model Node
 * 
 */
export type Node = $Result.DefaultSelection<Prisma.$NodePayload>
/**
 * Model Block
 * 
 */
export type Block = $Result.DefaultSelection<Prisma.$BlockPayload>
/**
 * Model BlockItem
 * 
 */
export type BlockItem = $Result.DefaultSelection<Prisma.$BlockItemPayload>
/**
 * Model AiRequest
 * 
 */
export type AiRequest = $Result.DefaultSelection<Prisma.$AiRequestPayload>
/**
 * Model Document
 * 
 */
export type Document = $Result.DefaultSelection<Prisma.$DocumentPayload>
/**
 * Model DocumentChunk
 * 
 */
export type DocumentChunk = $Result.DefaultSelection<Prisma.$DocumentChunkPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const WorkspaceMemberRole: {
  owner: 'owner',
  admin: 'admin',
  member: 'member',
  viewer: 'viewer'
};

export type WorkspaceMemberRole = (typeof WorkspaceMemberRole)[keyof typeof WorkspaceMemberRole]


export const NodeType: {
  question: 'question',
  answer: 'answer',
  summary: 'summary'
};

export type NodeType = (typeof NodeType)[keyof typeof NodeType]


export const Role: {
  user: 'user',
  assistant: 'assistant'
};

export type Role = (typeof Role)[keyof typeof Role]


export const BlockType: {
  heading: 'heading',
  paragraph: 'paragraph',
  code: 'code',
  bullet_list: 'bullet_list',
  numbered_list: 'numbered_list',
  quote: 'quote',
  callout: 'callout'
};

export type BlockType = (typeof BlockType)[keyof typeof BlockType]


export const CalloutType: {
  info: 'info',
  warning: 'warning',
  success: 'success',
  error: 'error'
};

export type CalloutType = (typeof CalloutType)[keyof typeof CalloutType]


export const AiRequestStatus: {
  pending: 'pending',
  streaming: 'streaming',
  completed: 'completed',
  failed: 'failed'
};

export type AiRequestStatus = (typeof AiRequestStatus)[keyof typeof AiRequestStatus]

}

export type WorkspaceMemberRole = $Enums.WorkspaceMemberRole

export const WorkspaceMemberRole: typeof $Enums.WorkspaceMemberRole

export type NodeType = $Enums.NodeType

export const NodeType: typeof $Enums.NodeType

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type BlockType = $Enums.BlockType

export const BlockType: typeof $Enums.BlockType

export type CalloutType = $Enums.CalloutType

export const CalloutType: typeof $Enums.CalloutType

export type AiRequestStatus = $Enums.AiRequestStatus

export const AiRequestStatus: typeof $Enums.AiRequestStatus

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
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
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

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


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.workspace`: Exposes CRUD operations for the **Workspace** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Workspaces
    * const workspaces = await prisma.workspace.findMany()
    * ```
    */
  get workspace(): Prisma.WorkspaceDelegate<ExtArgs>;

  /**
   * `prisma.workspaceMember`: Exposes CRUD operations for the **WorkspaceMember** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more WorkspaceMembers
    * const workspaceMembers = await prisma.workspaceMember.findMany()
    * ```
    */
  get workspaceMember(): Prisma.WorkspaceMemberDelegate<ExtArgs>;

  /**
   * `prisma.conversation`: Exposes CRUD operations for the **Conversation** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Conversations
    * const conversations = await prisma.conversation.findMany()
    * ```
    */
  get conversation(): Prisma.ConversationDelegate<ExtArgs>;

  /**
   * `prisma.node`: Exposes CRUD operations for the **Node** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Nodes
    * const nodes = await prisma.node.findMany()
    * ```
    */
  get node(): Prisma.NodeDelegate<ExtArgs>;

  /**
   * `prisma.block`: Exposes CRUD operations for the **Block** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Blocks
    * const blocks = await prisma.block.findMany()
    * ```
    */
  get block(): Prisma.BlockDelegate<ExtArgs>;

  /**
   * `prisma.blockItem`: Exposes CRUD operations for the **BlockItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more BlockItems
    * const blockItems = await prisma.blockItem.findMany()
    * ```
    */
  get blockItem(): Prisma.BlockItemDelegate<ExtArgs>;

  /**
   * `prisma.aiRequest`: Exposes CRUD operations for the **AiRequest** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AiRequests
    * const aiRequests = await prisma.aiRequest.findMany()
    * ```
    */
  get aiRequest(): Prisma.AiRequestDelegate<ExtArgs>;

  /**
   * `prisma.document`: Exposes CRUD operations for the **Document** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Documents
    * const documents = await prisma.document.findMany()
    * ```
    */
  get document(): Prisma.DocumentDelegate<ExtArgs>;

  /**
   * `prisma.documentChunk`: Exposes CRUD operations for the **DocumentChunk** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DocumentChunks
    * const documentChunks = await prisma.documentChunk.findMany()
    * ```
    */
  get documentChunk(): Prisma.DocumentChunkDelegate<ExtArgs>;
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
  export import NotFoundError = runtime.NotFoundError

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
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
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
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
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
    User: 'User',
    Workspace: 'Workspace',
    WorkspaceMember: 'WorkspaceMember',
    Conversation: 'Conversation',
    Node: 'Node',
    Block: 'Block',
    BlockItem: 'BlockItem',
    AiRequest: 'AiRequest',
    Document: 'Document',
    DocumentChunk: 'DocumentChunk'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "workspace" | "workspaceMember" | "conversation" | "node" | "block" | "blockItem" | "aiRequest" | "document" | "documentChunk"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
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
      Workspace: {
        payload: Prisma.$WorkspacePayload<ExtArgs>
        fields: Prisma.WorkspaceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkspaceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkspaceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          findFirst: {
            args: Prisma.WorkspaceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkspaceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          findMany: {
            args: Prisma.WorkspaceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>[]
          }
          create: {
            args: Prisma.WorkspaceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          createMany: {
            args: Prisma.WorkspaceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkspaceCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>[]
          }
          delete: {
            args: Prisma.WorkspaceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          update: {
            args: Prisma.WorkspaceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          deleteMany: {
            args: Prisma.WorkspaceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkspaceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WorkspaceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspacePayload>
          }
          aggregate: {
            args: Prisma.WorkspaceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkspace>
          }
          groupBy: {
            args: Prisma.WorkspaceGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkspaceCountArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceCountAggregateOutputType> | number
          }
        }
      }
      WorkspaceMember: {
        payload: Prisma.$WorkspaceMemberPayload<ExtArgs>
        fields: Prisma.WorkspaceMemberFieldRefs
        operations: {
          findUnique: {
            args: Prisma.WorkspaceMemberFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.WorkspaceMemberFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>
          }
          findFirst: {
            args: Prisma.WorkspaceMemberFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.WorkspaceMemberFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>
          }
          findMany: {
            args: Prisma.WorkspaceMemberFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>[]
          }
          create: {
            args: Prisma.WorkspaceMemberCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>
          }
          createMany: {
            args: Prisma.WorkspaceMemberCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.WorkspaceMemberCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>[]
          }
          delete: {
            args: Prisma.WorkspaceMemberDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>
          }
          update: {
            args: Prisma.WorkspaceMemberUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>
          }
          deleteMany: {
            args: Prisma.WorkspaceMemberDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.WorkspaceMemberUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.WorkspaceMemberUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$WorkspaceMemberPayload>
          }
          aggregate: {
            args: Prisma.WorkspaceMemberAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateWorkspaceMember>
          }
          groupBy: {
            args: Prisma.WorkspaceMemberGroupByArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceMemberGroupByOutputType>[]
          }
          count: {
            args: Prisma.WorkspaceMemberCountArgs<ExtArgs>
            result: $Utils.Optional<WorkspaceMemberCountAggregateOutputType> | number
          }
        }
      }
      Conversation: {
        payload: Prisma.$ConversationPayload<ExtArgs>
        fields: Prisma.ConversationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ConversationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ConversationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findFirst: {
            args: Prisma.ConversationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ConversationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          findMany: {
            args: Prisma.ConversationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          create: {
            args: Prisma.ConversationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          createMany: {
            args: Prisma.ConversationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ConversationCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>[]
          }
          delete: {
            args: Prisma.ConversationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          update: {
            args: Prisma.ConversationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          deleteMany: {
            args: Prisma.ConversationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ConversationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ConversationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ConversationPayload>
          }
          aggregate: {
            args: Prisma.ConversationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateConversation>
          }
          groupBy: {
            args: Prisma.ConversationGroupByArgs<ExtArgs>
            result: $Utils.Optional<ConversationGroupByOutputType>[]
          }
          count: {
            args: Prisma.ConversationCountArgs<ExtArgs>
            result: $Utils.Optional<ConversationCountAggregateOutputType> | number
          }
        }
      }
      Node: {
        payload: Prisma.$NodePayload<ExtArgs>
        fields: Prisma.NodeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NodeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NodeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodePayload>
          }
          findFirst: {
            args: Prisma.NodeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NodeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodePayload>
          }
          findMany: {
            args: Prisma.NodeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodePayload>[]
          }
          create: {
            args: Prisma.NodeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodePayload>
          }
          createMany: {
            args: Prisma.NodeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NodeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodePayload>[]
          }
          delete: {
            args: Prisma.NodeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodePayload>
          }
          update: {
            args: Prisma.NodeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodePayload>
          }
          deleteMany: {
            args: Prisma.NodeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NodeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.NodeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NodePayload>
          }
          aggregate: {
            args: Prisma.NodeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNode>
          }
          groupBy: {
            args: Prisma.NodeGroupByArgs<ExtArgs>
            result: $Utils.Optional<NodeGroupByOutputType>[]
          }
          count: {
            args: Prisma.NodeCountArgs<ExtArgs>
            result: $Utils.Optional<NodeCountAggregateOutputType> | number
          }
        }
      }
      Block: {
        payload: Prisma.$BlockPayload<ExtArgs>
        fields: Prisma.BlockFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlockFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlockFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          findFirst: {
            args: Prisma.BlockFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlockFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          findMany: {
            args: Prisma.BlockFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>[]
          }
          create: {
            args: Prisma.BlockCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          createMany: {
            args: Prisma.BlockCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BlockCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>[]
          }
          delete: {
            args: Prisma.BlockDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          update: {
            args: Prisma.BlockUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          deleteMany: {
            args: Prisma.BlockDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlockUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BlockUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockPayload>
          }
          aggregate: {
            args: Prisma.BlockAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlock>
          }
          groupBy: {
            args: Prisma.BlockGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlockGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlockCountArgs<ExtArgs>
            result: $Utils.Optional<BlockCountAggregateOutputType> | number
          }
        }
      }
      BlockItem: {
        payload: Prisma.$BlockItemPayload<ExtArgs>
        fields: Prisma.BlockItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.BlockItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.BlockItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockItemPayload>
          }
          findFirst: {
            args: Prisma.BlockItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.BlockItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockItemPayload>
          }
          findMany: {
            args: Prisma.BlockItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockItemPayload>[]
          }
          create: {
            args: Prisma.BlockItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockItemPayload>
          }
          createMany: {
            args: Prisma.BlockItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.BlockItemCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockItemPayload>[]
          }
          delete: {
            args: Prisma.BlockItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockItemPayload>
          }
          update: {
            args: Prisma.BlockItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockItemPayload>
          }
          deleteMany: {
            args: Prisma.BlockItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.BlockItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.BlockItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$BlockItemPayload>
          }
          aggregate: {
            args: Prisma.BlockItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateBlockItem>
          }
          groupBy: {
            args: Prisma.BlockItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<BlockItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.BlockItemCountArgs<ExtArgs>
            result: $Utils.Optional<BlockItemCountAggregateOutputType> | number
          }
        }
      }
      AiRequest: {
        payload: Prisma.$AiRequestPayload<ExtArgs>
        fields: Prisma.AiRequestFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AiRequestFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiRequestPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AiRequestFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiRequestPayload>
          }
          findFirst: {
            args: Prisma.AiRequestFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiRequestPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AiRequestFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiRequestPayload>
          }
          findMany: {
            args: Prisma.AiRequestFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiRequestPayload>[]
          }
          create: {
            args: Prisma.AiRequestCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiRequestPayload>
          }
          createMany: {
            args: Prisma.AiRequestCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AiRequestCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiRequestPayload>[]
          }
          delete: {
            args: Prisma.AiRequestDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiRequestPayload>
          }
          update: {
            args: Prisma.AiRequestUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiRequestPayload>
          }
          deleteMany: {
            args: Prisma.AiRequestDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AiRequestUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AiRequestUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AiRequestPayload>
          }
          aggregate: {
            args: Prisma.AiRequestAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAiRequest>
          }
          groupBy: {
            args: Prisma.AiRequestGroupByArgs<ExtArgs>
            result: $Utils.Optional<AiRequestGroupByOutputType>[]
          }
          count: {
            args: Prisma.AiRequestCountArgs<ExtArgs>
            result: $Utils.Optional<AiRequestCountAggregateOutputType> | number
          }
        }
      }
      Document: {
        payload: Prisma.$DocumentPayload<ExtArgs>
        fields: Prisma.DocumentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findFirst: {
            args: Prisma.DocumentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          findMany: {
            args: Prisma.DocumentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          create: {
            args: Prisma.DocumentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          createMany: {
            args: Prisma.DocumentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>[]
          }
          delete: {
            args: Prisma.DocumentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          update: {
            args: Prisma.DocumentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          deleteMany: {
            args: Prisma.DocumentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DocumentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentPayload>
          }
          aggregate: {
            args: Prisma.DocumentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocument>
          }
          groupBy: {
            args: Prisma.DocumentGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentCountAggregateOutputType> | number
          }
        }
      }
      DocumentChunk: {
        payload: Prisma.$DocumentChunkPayload<ExtArgs>
        fields: Prisma.DocumentChunkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DocumentChunkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentChunkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DocumentChunkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentChunkPayload>
          }
          findFirst: {
            args: Prisma.DocumentChunkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentChunkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DocumentChunkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentChunkPayload>
          }
          findMany: {
            args: Prisma.DocumentChunkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentChunkPayload>[]
          }
          create: {
            args: Prisma.DocumentChunkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentChunkPayload>
          }
          createMany: {
            args: Prisma.DocumentChunkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DocumentChunkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentChunkPayload>[]
          }
          delete: {
            args: Prisma.DocumentChunkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentChunkPayload>
          }
          update: {
            args: Prisma.DocumentChunkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentChunkPayload>
          }
          deleteMany: {
            args: Prisma.DocumentChunkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DocumentChunkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.DocumentChunkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DocumentChunkPayload>
          }
          aggregate: {
            args: Prisma.DocumentChunkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDocumentChunk>
          }
          groupBy: {
            args: Prisma.DocumentChunkGroupByArgs<ExtArgs>
            result: $Utils.Optional<DocumentChunkGroupByOutputType>[]
          }
          count: {
            args: Prisma.DocumentChunkCountArgs<ExtArgs>
            result: $Utils.Optional<DocumentChunkCountAggregateOutputType> | number
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
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    workspaceMembers: number
    conversations: number
    nodes: number
    aiRequests: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspaceMembers?: boolean | UserCountOutputTypeCountWorkspaceMembersArgs
    conversations?: boolean | UserCountOutputTypeCountConversationsArgs
    nodes?: boolean | UserCountOutputTypeCountNodesArgs
    aiRequests?: boolean | UserCountOutputTypeCountAiRequestsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountWorkspaceMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceMemberWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NodeWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountAiRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiRequestWhereInput
  }


  /**
   * Count Type WorkspaceCountOutputType
   */

  export type WorkspaceCountOutputType = {
    members: number
    conversations: number
    documents: number
  }

  export type WorkspaceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | WorkspaceCountOutputTypeCountMembersArgs
    conversations?: boolean | WorkspaceCountOutputTypeCountConversationsArgs
    documents?: boolean | WorkspaceCountOutputTypeCountDocumentsArgs
  }

  // Custom InputTypes
  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceCountOutputType
     */
    select?: WorkspaceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceMemberWhereInput
  }

  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountConversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
  }

  /**
   * WorkspaceCountOutputType without action
   */
  export type WorkspaceCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }


  /**
   * Count Type ConversationCountOutputType
   */

  export type ConversationCountOutputType = {
    nodes: number
    aiRequests: number
    documents: number
  }

  export type ConversationCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    nodes?: boolean | ConversationCountOutputTypeCountNodesArgs
    aiRequests?: boolean | ConversationCountOutputTypeCountAiRequestsArgs
    documents?: boolean | ConversationCountOutputTypeCountDocumentsArgs
  }

  // Custom InputTypes
  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ConversationCountOutputType
     */
    select?: ConversationCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountNodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NodeWhereInput
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountAiRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiRequestWhereInput
  }

  /**
   * ConversationCountOutputType without action
   */
  export type ConversationCountOutputTypeCountDocumentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
  }


  /**
   * Count Type NodeCountOutputType
   */

  export type NodeCountOutputType = {
    children: number
    blocks: number
    aiRequests: number
  }

  export type NodeCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    children?: boolean | NodeCountOutputTypeCountChildrenArgs
    blocks?: boolean | NodeCountOutputTypeCountBlocksArgs
    aiRequests?: boolean | NodeCountOutputTypeCountAiRequestsArgs
  }

  // Custom InputTypes
  /**
   * NodeCountOutputType without action
   */
  export type NodeCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NodeCountOutputType
     */
    select?: NodeCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NodeCountOutputType without action
   */
  export type NodeCountOutputTypeCountChildrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NodeWhereInput
  }

  /**
   * NodeCountOutputType without action
   */
  export type NodeCountOutputTypeCountBlocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlockWhereInput
  }

  /**
   * NodeCountOutputType without action
   */
  export type NodeCountOutputTypeCountAiRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiRequestWhereInput
  }


  /**
   * Count Type BlockCountOutputType
   */

  export type BlockCountOutputType = {
    items: number
    branches: number
  }

  export type BlockCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    items?: boolean | BlockCountOutputTypeCountItemsArgs
    branches?: boolean | BlockCountOutputTypeCountBranchesArgs
  }

  // Custom InputTypes
  /**
   * BlockCountOutputType without action
   */
  export type BlockCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockCountOutputType
     */
    select?: BlockCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * BlockCountOutputType without action
   */
  export type BlockCountOutputTypeCountItemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlockItemWhereInput
  }

  /**
   * BlockCountOutputType without action
   */
  export type BlockCountOutputTypeCountBranchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NodeWhereInput
  }


  /**
   * Count Type DocumentCountOutputType
   */

  export type DocumentCountOutputType = {
    chunks: number
  }

  export type DocumentCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    chunks?: boolean | DocumentCountOutputTypeCountChunksArgs
  }

  // Custom InputTypes
  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentCountOutputType
     */
    select?: DocumentCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * DocumentCountOutputType without action
   */
  export type DocumentCountOutputTypeCountChunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentChunkWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    name: string | null
    avatar: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    name: number
    avatar: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    name?: true
    avatar?: true
    createdAt?: true
    updatedAt?: true
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
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    name: string
    avatar: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
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
    id?: boolean
    email?: boolean
    name?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    workspaceMembers?: boolean | User$workspaceMembersArgs<ExtArgs>
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    nodes?: boolean | User$nodesArgs<ExtArgs>
    aiRequests?: boolean | User$aiRequestsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    name?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    name?: boolean
    avatar?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspaceMembers?: boolean | User$workspaceMembersArgs<ExtArgs>
    conversations?: boolean | User$conversationsArgs<ExtArgs>
    nodes?: boolean | User$nodesArgs<ExtArgs>
    aiRequests?: boolean | User$aiRequestsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      workspaceMembers: Prisma.$WorkspaceMemberPayload<ExtArgs>[]
      conversations: Prisma.$ConversationPayload<ExtArgs>[]
      nodes: Prisma.$NodePayload<ExtArgs>[]
      aiRequests: Prisma.$AiRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      name: string
      avatar: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
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
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

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
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

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
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

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
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

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
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

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
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

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
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

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
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

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
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

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
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


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
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workspaceMembers<T extends User$workspaceMembersArgs<ExtArgs> = {}>(args?: Subset<T, User$workspaceMembersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findMany"> | Null>
    conversations<T extends User$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, User$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany"> | Null>
    nodes<T extends User$nodesArgs<ExtArgs> = {}>(args?: Subset<T, User$nodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NodePayload<ExtArgs>, T, "findMany"> | Null>
    aiRequests<T extends User$aiRequestsArgs<ExtArgs> = {}>(args?: Subset<T, User$aiRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiRequestPayload<ExtArgs>, T, "findMany"> | Null>
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
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly avatar: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
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
  }

  /**
   * User.workspaceMembers
   */
  export type User$workspaceMembersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    where?: WorkspaceMemberWhereInput
    orderBy?: WorkspaceMemberOrderByWithRelationInput | WorkspaceMemberOrderByWithRelationInput[]
    cursor?: WorkspaceMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkspaceMemberScalarFieldEnum | WorkspaceMemberScalarFieldEnum[]
  }

  /**
   * User.conversations
   */
  export type User$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * User.nodes
   */
  export type User$nodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Node
     */
    select?: NodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeInclude<ExtArgs> | null
    where?: NodeWhereInput
    orderBy?: NodeOrderByWithRelationInput | NodeOrderByWithRelationInput[]
    cursor?: NodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NodeScalarFieldEnum | NodeScalarFieldEnum[]
  }

  /**
   * User.aiRequests
   */
  export type User$aiRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiRequest
     */
    select?: AiRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRequestInclude<ExtArgs> | null
    where?: AiRequestWhereInput
    orderBy?: AiRequestOrderByWithRelationInput | AiRequestOrderByWithRelationInput[]
    cursor?: AiRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AiRequestScalarFieldEnum | AiRequestScalarFieldEnum[]
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
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Workspace
   */

  export type AggregateWorkspace = {
    _count: WorkspaceCountAggregateOutputType | null
    _min: WorkspaceMinAggregateOutputType | null
    _max: WorkspaceMaxAggregateOutputType | null
  }

  export type WorkspaceMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkspaceMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type WorkspaceCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type WorkspaceMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkspaceMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    createdAt?: true
    updatedAt?: true
  }

  export type WorkspaceCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type WorkspaceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workspace to aggregate.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Workspaces
    **/
    _count?: true | WorkspaceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkspaceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkspaceMaxAggregateInputType
  }

  export type GetWorkspaceAggregateType<T extends WorkspaceAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkspace]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkspace[P]>
      : GetScalarType<T[P], AggregateWorkspace[P]>
  }




  export type WorkspaceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceWhereInput
    orderBy?: WorkspaceOrderByWithAggregationInput | WorkspaceOrderByWithAggregationInput[]
    by: WorkspaceScalarFieldEnum[] | WorkspaceScalarFieldEnum
    having?: WorkspaceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkspaceCountAggregateInputType | true
    _min?: WorkspaceMinAggregateInputType
    _max?: WorkspaceMaxAggregateInputType
  }

  export type WorkspaceGroupByOutputType = {
    id: string
    name: string
    slug: string
    createdAt: Date
    updatedAt: Date
    _count: WorkspaceCountAggregateOutputType | null
    _min: WorkspaceMinAggregateOutputType | null
    _max: WorkspaceMaxAggregateOutputType | null
  }

  type GetWorkspaceGroupByPayload<T extends WorkspaceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkspaceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkspaceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkspaceGroupByOutputType[P]>
            : GetScalarType<T[P], WorkspaceGroupByOutputType[P]>
        }
      >
    >


  export type WorkspaceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    members?: boolean | Workspace$membersArgs<ExtArgs>
    conversations?: boolean | Workspace$conversationsArgs<ExtArgs>
    documents?: boolean | Workspace$documentsArgs<ExtArgs>
    _count?: boolean | WorkspaceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspace"]>

  export type WorkspaceSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["workspace"]>

  export type WorkspaceSelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type WorkspaceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    members?: boolean | Workspace$membersArgs<ExtArgs>
    conversations?: boolean | Workspace$conversationsArgs<ExtArgs>
    documents?: boolean | Workspace$documentsArgs<ExtArgs>
    _count?: boolean | WorkspaceCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type WorkspaceIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $WorkspacePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Workspace"
    objects: {
      members: Prisma.$WorkspaceMemberPayload<ExtArgs>[]
      conversations: Prisma.$ConversationPayload<ExtArgs>[]
      documents: Prisma.$DocumentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["workspace"]>
    composites: {}
  }

  type WorkspaceGetPayload<S extends boolean | null | undefined | WorkspaceDefaultArgs> = $Result.GetResult<Prisma.$WorkspacePayload, S>

  type WorkspaceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WorkspaceFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WorkspaceCountAggregateInputType | true
    }

  export interface WorkspaceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Workspace'], meta: { name: 'Workspace' } }
    /**
     * Find zero or one Workspace that matches the filter.
     * @param {WorkspaceFindUniqueArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkspaceFindUniqueArgs>(args: SelectSubset<T, WorkspaceFindUniqueArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Workspace that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WorkspaceFindUniqueOrThrowArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkspaceFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkspaceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Workspace that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceFindFirstArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkspaceFindFirstArgs>(args?: SelectSubset<T, WorkspaceFindFirstArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Workspace that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceFindFirstOrThrowArgs} args - Arguments to find a Workspace
     * @example
     * // Get one Workspace
     * const workspace = await prisma.workspace.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkspaceFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkspaceFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Workspaces that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Workspaces
     * const workspaces = await prisma.workspace.findMany()
     * 
     * // Get first 10 Workspaces
     * const workspaces = await prisma.workspace.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workspaceWithIdOnly = await prisma.workspace.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkspaceFindManyArgs>(args?: SelectSubset<T, WorkspaceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Workspace.
     * @param {WorkspaceCreateArgs} args - Arguments to create a Workspace.
     * @example
     * // Create one Workspace
     * const Workspace = await prisma.workspace.create({
     *   data: {
     *     // ... data to create a Workspace
     *   }
     * })
     * 
     */
    create<T extends WorkspaceCreateArgs>(args: SelectSubset<T, WorkspaceCreateArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Workspaces.
     * @param {WorkspaceCreateManyArgs} args - Arguments to create many Workspaces.
     * @example
     * // Create many Workspaces
     * const workspace = await prisma.workspace.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkspaceCreateManyArgs>(args?: SelectSubset<T, WorkspaceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Workspaces and returns the data saved in the database.
     * @param {WorkspaceCreateManyAndReturnArgs} args - Arguments to create many Workspaces.
     * @example
     * // Create many Workspaces
     * const workspace = await prisma.workspace.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Workspaces and only return the `id`
     * const workspaceWithIdOnly = await prisma.workspace.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkspaceCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkspaceCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Workspace.
     * @param {WorkspaceDeleteArgs} args - Arguments to delete one Workspace.
     * @example
     * // Delete one Workspace
     * const Workspace = await prisma.workspace.delete({
     *   where: {
     *     // ... filter to delete one Workspace
     *   }
     * })
     * 
     */
    delete<T extends WorkspaceDeleteArgs>(args: SelectSubset<T, WorkspaceDeleteArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Workspace.
     * @param {WorkspaceUpdateArgs} args - Arguments to update one Workspace.
     * @example
     * // Update one Workspace
     * const workspace = await prisma.workspace.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkspaceUpdateArgs>(args: SelectSubset<T, WorkspaceUpdateArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Workspaces.
     * @param {WorkspaceDeleteManyArgs} args - Arguments to filter Workspaces to delete.
     * @example
     * // Delete a few Workspaces
     * const { count } = await prisma.workspace.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkspaceDeleteManyArgs>(args?: SelectSubset<T, WorkspaceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Workspaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Workspaces
     * const workspace = await prisma.workspace.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkspaceUpdateManyArgs>(args: SelectSubset<T, WorkspaceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Workspace.
     * @param {WorkspaceUpsertArgs} args - Arguments to update or create a Workspace.
     * @example
     * // Update or create a Workspace
     * const workspace = await prisma.workspace.upsert({
     *   create: {
     *     // ... data to create a Workspace
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Workspace we want to update
     *   }
     * })
     */
    upsert<T extends WorkspaceUpsertArgs>(args: SelectSubset<T, WorkspaceUpsertArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Workspaces.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceCountArgs} args - Arguments to filter Workspaces to count.
     * @example
     * // Count the number of Workspaces
     * const count = await prisma.workspace.count({
     *   where: {
     *     // ... the filter for the Workspaces we want to count
     *   }
     * })
    **/
    count<T extends WorkspaceCountArgs>(
      args?: Subset<T, WorkspaceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkspaceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Workspace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkspaceAggregateArgs>(args: Subset<T, WorkspaceAggregateArgs>): Prisma.PrismaPromise<GetWorkspaceAggregateType<T>>

    /**
     * Group by Workspace.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceGroupByArgs} args - Group by arguments.
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
      T extends WorkspaceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkspaceGroupByArgs['orderBy'] }
        : { orderBy?: WorkspaceGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WorkspaceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkspaceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Workspace model
   */
  readonly fields: WorkspaceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Workspace.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkspaceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    members<T extends Workspace$membersArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$membersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findMany"> | Null>
    conversations<T extends Workspace$conversationsArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$conversationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany"> | Null>
    documents<T extends Workspace$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Workspace$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Workspace model
   */ 
  interface WorkspaceFieldRefs {
    readonly id: FieldRef<"Workspace", 'String'>
    readonly name: FieldRef<"Workspace", 'String'>
    readonly slug: FieldRef<"Workspace", 'String'>
    readonly createdAt: FieldRef<"Workspace", 'DateTime'>
    readonly updatedAt: FieldRef<"Workspace", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Workspace findUnique
   */
  export type WorkspaceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace findUniqueOrThrow
   */
  export type WorkspaceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace findFirst
   */
  export type WorkspaceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workspaces.
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workspaces.
     */
    distinct?: WorkspaceScalarFieldEnum | WorkspaceScalarFieldEnum[]
  }

  /**
   * Workspace findFirstOrThrow
   */
  export type WorkspaceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspace to fetch.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Workspaces.
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Workspaces.
     */
    distinct?: WorkspaceScalarFieldEnum | WorkspaceScalarFieldEnum[]
  }

  /**
   * Workspace findMany
   */
  export type WorkspaceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter, which Workspaces to fetch.
     */
    where?: WorkspaceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Workspaces to fetch.
     */
    orderBy?: WorkspaceOrderByWithRelationInput | WorkspaceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Workspaces.
     */
    cursor?: WorkspaceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Workspaces from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Workspaces.
     */
    skip?: number
    distinct?: WorkspaceScalarFieldEnum | WorkspaceScalarFieldEnum[]
  }

  /**
   * Workspace create
   */
  export type WorkspaceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * The data needed to create a Workspace.
     */
    data: XOR<WorkspaceCreateInput, WorkspaceUncheckedCreateInput>
  }

  /**
   * Workspace createMany
   */
  export type WorkspaceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Workspaces.
     */
    data: WorkspaceCreateManyInput | WorkspaceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Workspace createManyAndReturn
   */
  export type WorkspaceCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Workspaces.
     */
    data: WorkspaceCreateManyInput | WorkspaceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Workspace update
   */
  export type WorkspaceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * The data needed to update a Workspace.
     */
    data: XOR<WorkspaceUpdateInput, WorkspaceUncheckedUpdateInput>
    /**
     * Choose, which Workspace to update.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace updateMany
   */
  export type WorkspaceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Workspaces.
     */
    data: XOR<WorkspaceUpdateManyMutationInput, WorkspaceUncheckedUpdateManyInput>
    /**
     * Filter which Workspaces to update
     */
    where?: WorkspaceWhereInput
  }

  /**
   * Workspace upsert
   */
  export type WorkspaceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * The filter to search for the Workspace to update in case it exists.
     */
    where: WorkspaceWhereUniqueInput
    /**
     * In case the Workspace found by the `where` argument doesn't exist, create a new Workspace with this data.
     */
    create: XOR<WorkspaceCreateInput, WorkspaceUncheckedCreateInput>
    /**
     * In case the Workspace was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkspaceUpdateInput, WorkspaceUncheckedUpdateInput>
  }

  /**
   * Workspace delete
   */
  export type WorkspaceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    /**
     * Filter which Workspace to delete.
     */
    where: WorkspaceWhereUniqueInput
  }

  /**
   * Workspace deleteMany
   */
  export type WorkspaceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Workspaces to delete
     */
    where?: WorkspaceWhereInput
  }

  /**
   * Workspace.members
   */
  export type Workspace$membersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    where?: WorkspaceMemberWhereInput
    orderBy?: WorkspaceMemberOrderByWithRelationInput | WorkspaceMemberOrderByWithRelationInput[]
    cursor?: WorkspaceMemberWhereUniqueInput
    take?: number
    skip?: number
    distinct?: WorkspaceMemberScalarFieldEnum | WorkspaceMemberScalarFieldEnum[]
  }

  /**
   * Workspace.conversations
   */
  export type Workspace$conversationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    cursor?: ConversationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Workspace.documents
   */
  export type Workspace$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Workspace without action
   */
  export type WorkspaceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
  }


  /**
   * Model WorkspaceMember
   */

  export type AggregateWorkspaceMember = {
    _count: WorkspaceMemberCountAggregateOutputType | null
    _min: WorkspaceMemberMinAggregateOutputType | null
    _max: WorkspaceMemberMaxAggregateOutputType | null
  }

  export type WorkspaceMemberMinAggregateOutputType = {
    id: string | null
    workspaceId: string | null
    userId: string | null
    role: $Enums.WorkspaceMemberRole | null
    joinedAt: Date | null
  }

  export type WorkspaceMemberMaxAggregateOutputType = {
    id: string | null
    workspaceId: string | null
    userId: string | null
    role: $Enums.WorkspaceMemberRole | null
    joinedAt: Date | null
  }

  export type WorkspaceMemberCountAggregateOutputType = {
    id: number
    workspaceId: number
    userId: number
    role: number
    joinedAt: number
    _all: number
  }


  export type WorkspaceMemberMinAggregateInputType = {
    id?: true
    workspaceId?: true
    userId?: true
    role?: true
    joinedAt?: true
  }

  export type WorkspaceMemberMaxAggregateInputType = {
    id?: true
    workspaceId?: true
    userId?: true
    role?: true
    joinedAt?: true
  }

  export type WorkspaceMemberCountAggregateInputType = {
    id?: true
    workspaceId?: true
    userId?: true
    role?: true
    joinedAt?: true
    _all?: true
  }

  export type WorkspaceMemberAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkspaceMember to aggregate.
     */
    where?: WorkspaceMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceMembers to fetch.
     */
    orderBy?: WorkspaceMemberOrderByWithRelationInput | WorkspaceMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: WorkspaceMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned WorkspaceMembers
    **/
    _count?: true | WorkspaceMemberCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: WorkspaceMemberMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: WorkspaceMemberMaxAggregateInputType
  }

  export type GetWorkspaceMemberAggregateType<T extends WorkspaceMemberAggregateArgs> = {
        [P in keyof T & keyof AggregateWorkspaceMember]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateWorkspaceMember[P]>
      : GetScalarType<T[P], AggregateWorkspaceMember[P]>
  }




  export type WorkspaceMemberGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: WorkspaceMemberWhereInput
    orderBy?: WorkspaceMemberOrderByWithAggregationInput | WorkspaceMemberOrderByWithAggregationInput[]
    by: WorkspaceMemberScalarFieldEnum[] | WorkspaceMemberScalarFieldEnum
    having?: WorkspaceMemberScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: WorkspaceMemberCountAggregateInputType | true
    _min?: WorkspaceMemberMinAggregateInputType
    _max?: WorkspaceMemberMaxAggregateInputType
  }

  export type WorkspaceMemberGroupByOutputType = {
    id: string
    workspaceId: string
    userId: string
    role: $Enums.WorkspaceMemberRole
    joinedAt: Date
    _count: WorkspaceMemberCountAggregateOutputType | null
    _min: WorkspaceMemberMinAggregateOutputType | null
    _max: WorkspaceMemberMaxAggregateOutputType | null
  }

  type GetWorkspaceMemberGroupByPayload<T extends WorkspaceMemberGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<WorkspaceMemberGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof WorkspaceMemberGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], WorkspaceMemberGroupByOutputType[P]>
            : GetScalarType<T[P], WorkspaceMemberGroupByOutputType[P]>
        }
      >
    >


  export type WorkspaceMemberSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspaceMember"]>

  export type WorkspaceMemberSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["workspaceMember"]>

  export type WorkspaceMemberSelectScalar = {
    id?: boolean
    workspaceId?: boolean
    userId?: boolean
    role?: boolean
    joinedAt?: boolean
  }

  export type WorkspaceMemberInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type WorkspaceMemberIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | WorkspaceDefaultArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $WorkspaceMemberPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "WorkspaceMember"
    objects: {
      workspace: Prisma.$WorkspacePayload<ExtArgs>
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workspaceId: string
      userId: string
      role: $Enums.WorkspaceMemberRole
      joinedAt: Date
    }, ExtArgs["result"]["workspaceMember"]>
    composites: {}
  }

  type WorkspaceMemberGetPayload<S extends boolean | null | undefined | WorkspaceMemberDefaultArgs> = $Result.GetResult<Prisma.$WorkspaceMemberPayload, S>

  type WorkspaceMemberCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<WorkspaceMemberFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: WorkspaceMemberCountAggregateInputType | true
    }

  export interface WorkspaceMemberDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['WorkspaceMember'], meta: { name: 'WorkspaceMember' } }
    /**
     * Find zero or one WorkspaceMember that matches the filter.
     * @param {WorkspaceMemberFindUniqueArgs} args - Arguments to find a WorkspaceMember
     * @example
     * // Get one WorkspaceMember
     * const workspaceMember = await prisma.workspaceMember.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends WorkspaceMemberFindUniqueArgs>(args: SelectSubset<T, WorkspaceMemberFindUniqueArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one WorkspaceMember that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {WorkspaceMemberFindUniqueOrThrowArgs} args - Arguments to find a WorkspaceMember
     * @example
     * // Get one WorkspaceMember
     * const workspaceMember = await prisma.workspaceMember.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends WorkspaceMemberFindUniqueOrThrowArgs>(args: SelectSubset<T, WorkspaceMemberFindUniqueOrThrowArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first WorkspaceMember that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberFindFirstArgs} args - Arguments to find a WorkspaceMember
     * @example
     * // Get one WorkspaceMember
     * const workspaceMember = await prisma.workspaceMember.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends WorkspaceMemberFindFirstArgs>(args?: SelectSubset<T, WorkspaceMemberFindFirstArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first WorkspaceMember that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberFindFirstOrThrowArgs} args - Arguments to find a WorkspaceMember
     * @example
     * // Get one WorkspaceMember
     * const workspaceMember = await prisma.workspaceMember.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends WorkspaceMemberFindFirstOrThrowArgs>(args?: SelectSubset<T, WorkspaceMemberFindFirstOrThrowArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more WorkspaceMembers that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all WorkspaceMembers
     * const workspaceMembers = await prisma.workspaceMember.findMany()
     * 
     * // Get first 10 WorkspaceMembers
     * const workspaceMembers = await prisma.workspaceMember.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const workspaceMemberWithIdOnly = await prisma.workspaceMember.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends WorkspaceMemberFindManyArgs>(args?: SelectSubset<T, WorkspaceMemberFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a WorkspaceMember.
     * @param {WorkspaceMemberCreateArgs} args - Arguments to create a WorkspaceMember.
     * @example
     * // Create one WorkspaceMember
     * const WorkspaceMember = await prisma.workspaceMember.create({
     *   data: {
     *     // ... data to create a WorkspaceMember
     *   }
     * })
     * 
     */
    create<T extends WorkspaceMemberCreateArgs>(args: SelectSubset<T, WorkspaceMemberCreateArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many WorkspaceMembers.
     * @param {WorkspaceMemberCreateManyArgs} args - Arguments to create many WorkspaceMembers.
     * @example
     * // Create many WorkspaceMembers
     * const workspaceMember = await prisma.workspaceMember.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends WorkspaceMemberCreateManyArgs>(args?: SelectSubset<T, WorkspaceMemberCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many WorkspaceMembers and returns the data saved in the database.
     * @param {WorkspaceMemberCreateManyAndReturnArgs} args - Arguments to create many WorkspaceMembers.
     * @example
     * // Create many WorkspaceMembers
     * const workspaceMember = await prisma.workspaceMember.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many WorkspaceMembers and only return the `id`
     * const workspaceMemberWithIdOnly = await prisma.workspaceMember.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends WorkspaceMemberCreateManyAndReturnArgs>(args?: SelectSubset<T, WorkspaceMemberCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a WorkspaceMember.
     * @param {WorkspaceMemberDeleteArgs} args - Arguments to delete one WorkspaceMember.
     * @example
     * // Delete one WorkspaceMember
     * const WorkspaceMember = await prisma.workspaceMember.delete({
     *   where: {
     *     // ... filter to delete one WorkspaceMember
     *   }
     * })
     * 
     */
    delete<T extends WorkspaceMemberDeleteArgs>(args: SelectSubset<T, WorkspaceMemberDeleteArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one WorkspaceMember.
     * @param {WorkspaceMemberUpdateArgs} args - Arguments to update one WorkspaceMember.
     * @example
     * // Update one WorkspaceMember
     * const workspaceMember = await prisma.workspaceMember.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends WorkspaceMemberUpdateArgs>(args: SelectSubset<T, WorkspaceMemberUpdateArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more WorkspaceMembers.
     * @param {WorkspaceMemberDeleteManyArgs} args - Arguments to filter WorkspaceMembers to delete.
     * @example
     * // Delete a few WorkspaceMembers
     * const { count } = await prisma.workspaceMember.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends WorkspaceMemberDeleteManyArgs>(args?: SelectSubset<T, WorkspaceMemberDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more WorkspaceMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many WorkspaceMembers
     * const workspaceMember = await prisma.workspaceMember.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends WorkspaceMemberUpdateManyArgs>(args: SelectSubset<T, WorkspaceMemberUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one WorkspaceMember.
     * @param {WorkspaceMemberUpsertArgs} args - Arguments to update or create a WorkspaceMember.
     * @example
     * // Update or create a WorkspaceMember
     * const workspaceMember = await prisma.workspaceMember.upsert({
     *   create: {
     *     // ... data to create a WorkspaceMember
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the WorkspaceMember we want to update
     *   }
     * })
     */
    upsert<T extends WorkspaceMemberUpsertArgs>(args: SelectSubset<T, WorkspaceMemberUpsertArgs<ExtArgs>>): Prisma__WorkspaceMemberClient<$Result.GetResult<Prisma.$WorkspaceMemberPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of WorkspaceMembers.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberCountArgs} args - Arguments to filter WorkspaceMembers to count.
     * @example
     * // Count the number of WorkspaceMembers
     * const count = await prisma.workspaceMember.count({
     *   where: {
     *     // ... the filter for the WorkspaceMembers we want to count
     *   }
     * })
    **/
    count<T extends WorkspaceMemberCountArgs>(
      args?: Subset<T, WorkspaceMemberCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], WorkspaceMemberCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a WorkspaceMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends WorkspaceMemberAggregateArgs>(args: Subset<T, WorkspaceMemberAggregateArgs>): Prisma.PrismaPromise<GetWorkspaceMemberAggregateType<T>>

    /**
     * Group by WorkspaceMember.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {WorkspaceMemberGroupByArgs} args - Group by arguments.
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
      T extends WorkspaceMemberGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: WorkspaceMemberGroupByArgs['orderBy'] }
        : { orderBy?: WorkspaceMemberGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, WorkspaceMemberGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetWorkspaceMemberGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the WorkspaceMember model
   */
  readonly fields: WorkspaceMemberFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for WorkspaceMember.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__WorkspaceMemberClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workspace<T extends WorkspaceDefaultArgs<ExtArgs> = {}>(args?: Subset<T, WorkspaceDefaultArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the WorkspaceMember model
   */ 
  interface WorkspaceMemberFieldRefs {
    readonly id: FieldRef<"WorkspaceMember", 'String'>
    readonly workspaceId: FieldRef<"WorkspaceMember", 'String'>
    readonly userId: FieldRef<"WorkspaceMember", 'String'>
    readonly role: FieldRef<"WorkspaceMember", 'WorkspaceMemberRole'>
    readonly joinedAt: FieldRef<"WorkspaceMember", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * WorkspaceMember findUnique
   */
  export type WorkspaceMemberFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceMember to fetch.
     */
    where: WorkspaceMemberWhereUniqueInput
  }

  /**
   * WorkspaceMember findUniqueOrThrow
   */
  export type WorkspaceMemberFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceMember to fetch.
     */
    where: WorkspaceMemberWhereUniqueInput
  }

  /**
   * WorkspaceMember findFirst
   */
  export type WorkspaceMemberFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceMember to fetch.
     */
    where?: WorkspaceMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceMembers to fetch.
     */
    orderBy?: WorkspaceMemberOrderByWithRelationInput | WorkspaceMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkspaceMembers.
     */
    cursor?: WorkspaceMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkspaceMembers.
     */
    distinct?: WorkspaceMemberScalarFieldEnum | WorkspaceMemberScalarFieldEnum[]
  }

  /**
   * WorkspaceMember findFirstOrThrow
   */
  export type WorkspaceMemberFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceMember to fetch.
     */
    where?: WorkspaceMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceMembers to fetch.
     */
    orderBy?: WorkspaceMemberOrderByWithRelationInput | WorkspaceMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for WorkspaceMembers.
     */
    cursor?: WorkspaceMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceMembers.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of WorkspaceMembers.
     */
    distinct?: WorkspaceMemberScalarFieldEnum | WorkspaceMemberScalarFieldEnum[]
  }

  /**
   * WorkspaceMember findMany
   */
  export type WorkspaceMemberFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * Filter, which WorkspaceMembers to fetch.
     */
    where?: WorkspaceMemberWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of WorkspaceMembers to fetch.
     */
    orderBy?: WorkspaceMemberOrderByWithRelationInput | WorkspaceMemberOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing WorkspaceMembers.
     */
    cursor?: WorkspaceMemberWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` WorkspaceMembers from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` WorkspaceMembers.
     */
    skip?: number
    distinct?: WorkspaceMemberScalarFieldEnum | WorkspaceMemberScalarFieldEnum[]
  }

  /**
   * WorkspaceMember create
   */
  export type WorkspaceMemberCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * The data needed to create a WorkspaceMember.
     */
    data: XOR<WorkspaceMemberCreateInput, WorkspaceMemberUncheckedCreateInput>
  }

  /**
   * WorkspaceMember createMany
   */
  export type WorkspaceMemberCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many WorkspaceMembers.
     */
    data: WorkspaceMemberCreateManyInput | WorkspaceMemberCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * WorkspaceMember createManyAndReturn
   */
  export type WorkspaceMemberCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many WorkspaceMembers.
     */
    data: WorkspaceMemberCreateManyInput | WorkspaceMemberCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * WorkspaceMember update
   */
  export type WorkspaceMemberUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * The data needed to update a WorkspaceMember.
     */
    data: XOR<WorkspaceMemberUpdateInput, WorkspaceMemberUncheckedUpdateInput>
    /**
     * Choose, which WorkspaceMember to update.
     */
    where: WorkspaceMemberWhereUniqueInput
  }

  /**
   * WorkspaceMember updateMany
   */
  export type WorkspaceMemberUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update WorkspaceMembers.
     */
    data: XOR<WorkspaceMemberUpdateManyMutationInput, WorkspaceMemberUncheckedUpdateManyInput>
    /**
     * Filter which WorkspaceMembers to update
     */
    where?: WorkspaceMemberWhereInput
  }

  /**
   * WorkspaceMember upsert
   */
  export type WorkspaceMemberUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * The filter to search for the WorkspaceMember to update in case it exists.
     */
    where: WorkspaceMemberWhereUniqueInput
    /**
     * In case the WorkspaceMember found by the `where` argument doesn't exist, create a new WorkspaceMember with this data.
     */
    create: XOR<WorkspaceMemberCreateInput, WorkspaceMemberUncheckedCreateInput>
    /**
     * In case the WorkspaceMember was found with the provided `where` argument, update it with this data.
     */
    update: XOR<WorkspaceMemberUpdateInput, WorkspaceMemberUncheckedUpdateInput>
  }

  /**
   * WorkspaceMember delete
   */
  export type WorkspaceMemberDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
    /**
     * Filter which WorkspaceMember to delete.
     */
    where: WorkspaceMemberWhereUniqueInput
  }

  /**
   * WorkspaceMember deleteMany
   */
  export type WorkspaceMemberDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which WorkspaceMembers to delete
     */
    where?: WorkspaceMemberWhereInput
  }

  /**
   * WorkspaceMember without action
   */
  export type WorkspaceMemberDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the WorkspaceMember
     */
    select?: WorkspaceMemberSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceMemberInclude<ExtArgs> | null
  }


  /**
   * Model Conversation
   */

  export type AggregateConversation = {
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  export type ConversationMinAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    ownerId: string | null
    workspaceId: string | null
    isFavorite: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationMaxAggregateOutputType = {
    id: string | null
    title: string | null
    description: string | null
    ownerId: string | null
    workspaceId: string | null
    isFavorite: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ConversationCountAggregateOutputType = {
    id: number
    title: number
    description: number
    ownerId: number
    workspaceId: number
    isFavorite: number
    tags: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ConversationMinAggregateInputType = {
    id?: true
    title?: true
    description?: true
    ownerId?: true
    workspaceId?: true
    isFavorite?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationMaxAggregateInputType = {
    id?: true
    title?: true
    description?: true
    ownerId?: true
    workspaceId?: true
    isFavorite?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ConversationCountAggregateInputType = {
    id?: true
    title?: true
    description?: true
    ownerId?: true
    workspaceId?: true
    isFavorite?: true
    tags?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ConversationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversation to aggregate.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Conversations
    **/
    _count?: true | ConversationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ConversationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ConversationMaxAggregateInputType
  }

  export type GetConversationAggregateType<T extends ConversationAggregateArgs> = {
        [P in keyof T & keyof AggregateConversation]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateConversation[P]>
      : GetScalarType<T[P], AggregateConversation[P]>
  }




  export type ConversationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ConversationWhereInput
    orderBy?: ConversationOrderByWithAggregationInput | ConversationOrderByWithAggregationInput[]
    by: ConversationScalarFieldEnum[] | ConversationScalarFieldEnum
    having?: ConversationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ConversationCountAggregateInputType | true
    _min?: ConversationMinAggregateInputType
    _max?: ConversationMaxAggregateInputType
  }

  export type ConversationGroupByOutputType = {
    id: string
    title: string
    description: string | null
    ownerId: string
    workspaceId: string | null
    isFavorite: boolean
    tags: string[]
    createdAt: Date
    updatedAt: Date
    _count: ConversationCountAggregateOutputType | null
    _min: ConversationMinAggregateOutputType | null
    _max: ConversationMaxAggregateOutputType | null
  }

  type GetConversationGroupByPayload<T extends ConversationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ConversationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ConversationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ConversationGroupByOutputType[P]>
            : GetScalarType<T[P], ConversationGroupByOutputType[P]>
        }
      >
    >


  export type ConversationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    ownerId?: boolean
    workspaceId?: boolean
    isFavorite?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    workspace?: boolean | Conversation$workspaceArgs<ExtArgs>
    nodes?: boolean | Conversation$nodesArgs<ExtArgs>
    aiRequests?: boolean | Conversation$aiRequestsArgs<ExtArgs>
    documents?: boolean | Conversation$documentsArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    description?: boolean
    ownerId?: boolean
    workspaceId?: boolean
    isFavorite?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    owner?: boolean | UserDefaultArgs<ExtArgs>
    workspace?: boolean | Conversation$workspaceArgs<ExtArgs>
  }, ExtArgs["result"]["conversation"]>

  export type ConversationSelectScalar = {
    id?: boolean
    title?: boolean
    description?: boolean
    ownerId?: boolean
    workspaceId?: boolean
    isFavorite?: boolean
    tags?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ConversationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    workspace?: boolean | Conversation$workspaceArgs<ExtArgs>
    nodes?: boolean | Conversation$nodesArgs<ExtArgs>
    aiRequests?: boolean | Conversation$aiRequestsArgs<ExtArgs>
    documents?: boolean | Conversation$documentsArgs<ExtArgs>
    _count?: boolean | ConversationCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ConversationIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    owner?: boolean | UserDefaultArgs<ExtArgs>
    workspace?: boolean | Conversation$workspaceArgs<ExtArgs>
  }

  export type $ConversationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Conversation"
    objects: {
      owner: Prisma.$UserPayload<ExtArgs>
      workspace: Prisma.$WorkspacePayload<ExtArgs> | null
      nodes: Prisma.$NodePayload<ExtArgs>[]
      aiRequests: Prisma.$AiRequestPayload<ExtArgs>[]
      documents: Prisma.$DocumentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      description: string | null
      ownerId: string
      workspaceId: string | null
      isFavorite: boolean
      tags: string[]
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["conversation"]>
    composites: {}
  }

  type ConversationGetPayload<S extends boolean | null | undefined | ConversationDefaultArgs> = $Result.GetResult<Prisma.$ConversationPayload, S>

  type ConversationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<ConversationFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: ConversationCountAggregateInputType | true
    }

  export interface ConversationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Conversation'], meta: { name: 'Conversation' } }
    /**
     * Find zero or one Conversation that matches the filter.
     * @param {ConversationFindUniqueArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ConversationFindUniqueArgs>(args: SelectSubset<T, ConversationFindUniqueArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Conversation that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {ConversationFindUniqueOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ConversationFindUniqueOrThrowArgs>(args: SelectSubset<T, ConversationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Conversation that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ConversationFindFirstArgs>(args?: SelectSubset<T, ConversationFindFirstArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Conversation that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindFirstOrThrowArgs} args - Arguments to find a Conversation
     * @example
     * // Get one Conversation
     * const conversation = await prisma.conversation.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ConversationFindFirstOrThrowArgs>(args?: SelectSubset<T, ConversationFindFirstOrThrowArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Conversations that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Conversations
     * const conversations = await prisma.conversation.findMany()
     * 
     * // Get first 10 Conversations
     * const conversations = await prisma.conversation.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const conversationWithIdOnly = await prisma.conversation.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ConversationFindManyArgs>(args?: SelectSubset<T, ConversationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Conversation.
     * @param {ConversationCreateArgs} args - Arguments to create a Conversation.
     * @example
     * // Create one Conversation
     * const Conversation = await prisma.conversation.create({
     *   data: {
     *     // ... data to create a Conversation
     *   }
     * })
     * 
     */
    create<T extends ConversationCreateArgs>(args: SelectSubset<T, ConversationCreateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Conversations.
     * @param {ConversationCreateManyArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ConversationCreateManyArgs>(args?: SelectSubset<T, ConversationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Conversations and returns the data saved in the database.
     * @param {ConversationCreateManyAndReturnArgs} args - Arguments to create many Conversations.
     * @example
     * // Create many Conversations
     * const conversation = await prisma.conversation.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Conversations and only return the `id`
     * const conversationWithIdOnly = await prisma.conversation.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ConversationCreateManyAndReturnArgs>(args?: SelectSubset<T, ConversationCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Conversation.
     * @param {ConversationDeleteArgs} args - Arguments to delete one Conversation.
     * @example
     * // Delete one Conversation
     * const Conversation = await prisma.conversation.delete({
     *   where: {
     *     // ... filter to delete one Conversation
     *   }
     * })
     * 
     */
    delete<T extends ConversationDeleteArgs>(args: SelectSubset<T, ConversationDeleteArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Conversation.
     * @param {ConversationUpdateArgs} args - Arguments to update one Conversation.
     * @example
     * // Update one Conversation
     * const conversation = await prisma.conversation.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ConversationUpdateArgs>(args: SelectSubset<T, ConversationUpdateArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Conversations.
     * @param {ConversationDeleteManyArgs} args - Arguments to filter Conversations to delete.
     * @example
     * // Delete a few Conversations
     * const { count } = await prisma.conversation.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ConversationDeleteManyArgs>(args?: SelectSubset<T, ConversationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Conversations
     * const conversation = await prisma.conversation.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ConversationUpdateManyArgs>(args: SelectSubset<T, ConversationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Conversation.
     * @param {ConversationUpsertArgs} args - Arguments to update or create a Conversation.
     * @example
     * // Update or create a Conversation
     * const conversation = await prisma.conversation.upsert({
     *   create: {
     *     // ... data to create a Conversation
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Conversation we want to update
     *   }
     * })
     */
    upsert<T extends ConversationUpsertArgs>(args: SelectSubset<T, ConversationUpsertArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Conversations.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationCountArgs} args - Arguments to filter Conversations to count.
     * @example
     * // Count the number of Conversations
     * const count = await prisma.conversation.count({
     *   where: {
     *     // ... the filter for the Conversations we want to count
     *   }
     * })
    **/
    count<T extends ConversationCountArgs>(
      args?: Subset<T, ConversationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ConversationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ConversationAggregateArgs>(args: Subset<T, ConversationAggregateArgs>): Prisma.PrismaPromise<GetConversationAggregateType<T>>

    /**
     * Group by Conversation.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ConversationGroupByArgs} args - Group by arguments.
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
      T extends ConversationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ConversationGroupByArgs['orderBy'] }
        : { orderBy?: ConversationGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, ConversationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetConversationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Conversation model
   */
  readonly fields: ConversationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Conversation.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ConversationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    owner<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    workspace<T extends Conversation$workspaceArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$workspaceArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    nodes<T extends Conversation$nodesArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$nodesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NodePayload<ExtArgs>, T, "findMany"> | Null>
    aiRequests<T extends Conversation$aiRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$aiRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiRequestPayload<ExtArgs>, T, "findMany"> | Null>
    documents<T extends Conversation$documentsArgs<ExtArgs> = {}>(args?: Subset<T, Conversation$documentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Conversation model
   */ 
  interface ConversationFieldRefs {
    readonly id: FieldRef<"Conversation", 'String'>
    readonly title: FieldRef<"Conversation", 'String'>
    readonly description: FieldRef<"Conversation", 'String'>
    readonly ownerId: FieldRef<"Conversation", 'String'>
    readonly workspaceId: FieldRef<"Conversation", 'String'>
    readonly isFavorite: FieldRef<"Conversation", 'Boolean'>
    readonly tags: FieldRef<"Conversation", 'String[]'>
    readonly createdAt: FieldRef<"Conversation", 'DateTime'>
    readonly updatedAt: FieldRef<"Conversation", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Conversation findUnique
   */
  export type ConversationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findUniqueOrThrow
   */
  export type ConversationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation findFirst
   */
  export type ConversationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findFirstOrThrow
   */
  export type ConversationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversation to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Conversations.
     */
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation findMany
   */
  export type ConversationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter, which Conversations to fetch.
     */
    where?: ConversationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Conversations to fetch.
     */
    orderBy?: ConversationOrderByWithRelationInput | ConversationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Conversations.
     */
    cursor?: ConversationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Conversations from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Conversations.
     */
    skip?: number
    distinct?: ConversationScalarFieldEnum | ConversationScalarFieldEnum[]
  }

  /**
   * Conversation create
   */
  export type ConversationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to create a Conversation.
     */
    data: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
  }

  /**
   * Conversation createMany
   */
  export type ConversationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Conversation createManyAndReturn
   */
  export type ConversationCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Conversations.
     */
    data: ConversationCreateManyInput | ConversationCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Conversation update
   */
  export type ConversationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The data needed to update a Conversation.
     */
    data: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
    /**
     * Choose, which Conversation to update.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation updateMany
   */
  export type ConversationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Conversations.
     */
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyInput>
    /**
     * Filter which Conversations to update
     */
    where?: ConversationWhereInput
  }

  /**
   * Conversation upsert
   */
  export type ConversationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * The filter to search for the Conversation to update in case it exists.
     */
    where: ConversationWhereUniqueInput
    /**
     * In case the Conversation found by the `where` argument doesn't exist, create a new Conversation with this data.
     */
    create: XOR<ConversationCreateInput, ConversationUncheckedCreateInput>
    /**
     * In case the Conversation was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ConversationUpdateInput, ConversationUncheckedUpdateInput>
  }

  /**
   * Conversation delete
   */
  export type ConversationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    /**
     * Filter which Conversation to delete.
     */
    where: ConversationWhereUniqueInput
  }

  /**
   * Conversation deleteMany
   */
  export type ConversationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Conversations to delete
     */
    where?: ConversationWhereInput
  }

  /**
   * Conversation.workspace
   */
  export type Conversation$workspaceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    where?: WorkspaceWhereInput
  }

  /**
   * Conversation.nodes
   */
  export type Conversation$nodesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Node
     */
    select?: NodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeInclude<ExtArgs> | null
    where?: NodeWhereInput
    orderBy?: NodeOrderByWithRelationInput | NodeOrderByWithRelationInput[]
    cursor?: NodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NodeScalarFieldEnum | NodeScalarFieldEnum[]
  }

  /**
   * Conversation.aiRequests
   */
  export type Conversation$aiRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiRequest
     */
    select?: AiRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRequestInclude<ExtArgs> | null
    where?: AiRequestWhereInput
    orderBy?: AiRequestOrderByWithRelationInput | AiRequestOrderByWithRelationInput[]
    cursor?: AiRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AiRequestScalarFieldEnum | AiRequestScalarFieldEnum[]
  }

  /**
   * Conversation.documents
   */
  export type Conversation$documentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    cursor?: DocumentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Conversation without action
   */
  export type ConversationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
  }


  /**
   * Model Node
   */

  export type AggregateNode = {
    _count: NodeCountAggregateOutputType | null
    _avg: NodeAvgAggregateOutputType | null
    _sum: NodeSumAggregateOutputType | null
    _min: NodeMinAggregateOutputType | null
    _max: NodeMaxAggregateOutputType | null
  }

  export type NodeAvgAggregateOutputType = {
    depth: number | null
    position: number | null
    embedding: number | null
  }

  export type NodeSumAggregateOutputType = {
    depth: number | null
    position: number | null
    embedding: number[]
  }

  export type NodeMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    parentNodeId: string | null
    parentBlockId: string | null
    createdById: string | null
    type: $Enums.NodeType | null
    role: $Enums.Role | null
    content: string | null
    depth: number | null
    path: string | null
    position: number | null
    isCollapsed: boolean | null
    summarySnapshot: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NodeMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    parentNodeId: string | null
    parentBlockId: string | null
    createdById: string | null
    type: $Enums.NodeType | null
    role: $Enums.Role | null
    content: string | null
    depth: number | null
    path: string | null
    position: number | null
    isCollapsed: boolean | null
    summarySnapshot: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NodeCountAggregateOutputType = {
    id: number
    conversationId: number
    parentNodeId: number
    parentBlockId: number
    createdById: number
    type: number
    role: number
    content: number
    depth: number
    path: number
    position: number
    isCollapsed: number
    embedding: number
    summarySnapshot: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NodeAvgAggregateInputType = {
    depth?: true
    position?: true
    embedding?: true
  }

  export type NodeSumAggregateInputType = {
    depth?: true
    position?: true
    embedding?: true
  }

  export type NodeMinAggregateInputType = {
    id?: true
    conversationId?: true
    parentNodeId?: true
    parentBlockId?: true
    createdById?: true
    type?: true
    role?: true
    content?: true
    depth?: true
    path?: true
    position?: true
    isCollapsed?: true
    summarySnapshot?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NodeMaxAggregateInputType = {
    id?: true
    conversationId?: true
    parentNodeId?: true
    parentBlockId?: true
    createdById?: true
    type?: true
    role?: true
    content?: true
    depth?: true
    path?: true
    position?: true
    isCollapsed?: true
    summarySnapshot?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NodeCountAggregateInputType = {
    id?: true
    conversationId?: true
    parentNodeId?: true
    parentBlockId?: true
    createdById?: true
    type?: true
    role?: true
    content?: true
    depth?: true
    path?: true
    position?: true
    isCollapsed?: true
    embedding?: true
    summarySnapshot?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NodeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Node to aggregate.
     */
    where?: NodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Nodes to fetch.
     */
    orderBy?: NodeOrderByWithRelationInput | NodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Nodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Nodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Nodes
    **/
    _count?: true | NodeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NodeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NodeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NodeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NodeMaxAggregateInputType
  }

  export type GetNodeAggregateType<T extends NodeAggregateArgs> = {
        [P in keyof T & keyof AggregateNode]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNode[P]>
      : GetScalarType<T[P], AggregateNode[P]>
  }




  export type NodeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NodeWhereInput
    orderBy?: NodeOrderByWithAggregationInput | NodeOrderByWithAggregationInput[]
    by: NodeScalarFieldEnum[] | NodeScalarFieldEnum
    having?: NodeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NodeCountAggregateInputType | true
    _avg?: NodeAvgAggregateInputType
    _sum?: NodeSumAggregateInputType
    _min?: NodeMinAggregateInputType
    _max?: NodeMaxAggregateInputType
  }

  export type NodeGroupByOutputType = {
    id: string
    conversationId: string
    parentNodeId: string | null
    parentBlockId: string | null
    createdById: string
    type: $Enums.NodeType
    role: $Enums.Role
    content: string | null
    depth: number
    path: string
    position: number
    isCollapsed: boolean
    embedding: number[]
    summarySnapshot: string | null
    createdAt: Date
    updatedAt: Date
    _count: NodeCountAggregateOutputType | null
    _avg: NodeAvgAggregateOutputType | null
    _sum: NodeSumAggregateOutputType | null
    _min: NodeMinAggregateOutputType | null
    _max: NodeMaxAggregateOutputType | null
  }

  type GetNodeGroupByPayload<T extends NodeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NodeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NodeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NodeGroupByOutputType[P]>
            : GetScalarType<T[P], NodeGroupByOutputType[P]>
        }
      >
    >


  export type NodeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    parentNodeId?: boolean
    parentBlockId?: boolean
    createdById?: boolean
    type?: boolean
    role?: boolean
    content?: boolean
    depth?: boolean
    path?: boolean
    position?: boolean
    isCollapsed?: boolean
    embedding?: boolean
    summarySnapshot?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    parent?: boolean | Node$parentArgs<ExtArgs>
    children?: boolean | Node$childrenArgs<ExtArgs>
    parentBlock?: boolean | Node$parentBlockArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    blocks?: boolean | Node$blocksArgs<ExtArgs>
    aiRequests?: boolean | Node$aiRequestsArgs<ExtArgs>
    _count?: boolean | NodeCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["node"]>

  export type NodeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    parentNodeId?: boolean
    parentBlockId?: boolean
    createdById?: boolean
    type?: boolean
    role?: boolean
    content?: boolean
    depth?: boolean
    path?: boolean
    position?: boolean
    isCollapsed?: boolean
    embedding?: boolean
    summarySnapshot?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    parent?: boolean | Node$parentArgs<ExtArgs>
    parentBlock?: boolean | Node$parentBlockArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["node"]>

  export type NodeSelectScalar = {
    id?: boolean
    conversationId?: boolean
    parentNodeId?: boolean
    parentBlockId?: boolean
    createdById?: boolean
    type?: boolean
    role?: boolean
    content?: boolean
    depth?: boolean
    path?: boolean
    position?: boolean
    isCollapsed?: boolean
    embedding?: boolean
    summarySnapshot?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NodeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    parent?: boolean | Node$parentArgs<ExtArgs>
    children?: boolean | Node$childrenArgs<ExtArgs>
    parentBlock?: boolean | Node$parentBlockArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
    blocks?: boolean | Node$blocksArgs<ExtArgs>
    aiRequests?: boolean | Node$aiRequestsArgs<ExtArgs>
    _count?: boolean | NodeCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type NodeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    parent?: boolean | Node$parentArgs<ExtArgs>
    parentBlock?: boolean | Node$parentBlockArgs<ExtArgs>
    createdBy?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $NodePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Node"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
      parent: Prisma.$NodePayload<ExtArgs> | null
      children: Prisma.$NodePayload<ExtArgs>[]
      parentBlock: Prisma.$BlockPayload<ExtArgs> | null
      createdBy: Prisma.$UserPayload<ExtArgs>
      blocks: Prisma.$BlockPayload<ExtArgs>[]
      aiRequests: Prisma.$AiRequestPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversationId: string
      parentNodeId: string | null
      parentBlockId: string | null
      createdById: string
      type: $Enums.NodeType
      role: $Enums.Role
      content: string | null
      depth: number
      path: string
      position: number
      isCollapsed: boolean
      embedding: number[]
      summarySnapshot: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["node"]>
    composites: {}
  }

  type NodeGetPayload<S extends boolean | null | undefined | NodeDefaultArgs> = $Result.GetResult<Prisma.$NodePayload, S>

  type NodeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<NodeFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: NodeCountAggregateInputType | true
    }

  export interface NodeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Node'], meta: { name: 'Node' } }
    /**
     * Find zero or one Node that matches the filter.
     * @param {NodeFindUniqueArgs} args - Arguments to find a Node
     * @example
     * // Get one Node
     * const node = await prisma.node.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NodeFindUniqueArgs>(args: SelectSubset<T, NodeFindUniqueArgs<ExtArgs>>): Prisma__NodeClient<$Result.GetResult<Prisma.$NodePayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Node that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {NodeFindUniqueOrThrowArgs} args - Arguments to find a Node
     * @example
     * // Get one Node
     * const node = await prisma.node.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NodeFindUniqueOrThrowArgs>(args: SelectSubset<T, NodeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NodeClient<$Result.GetResult<Prisma.$NodePayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Node that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NodeFindFirstArgs} args - Arguments to find a Node
     * @example
     * // Get one Node
     * const node = await prisma.node.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NodeFindFirstArgs>(args?: SelectSubset<T, NodeFindFirstArgs<ExtArgs>>): Prisma__NodeClient<$Result.GetResult<Prisma.$NodePayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Node that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NodeFindFirstOrThrowArgs} args - Arguments to find a Node
     * @example
     * // Get one Node
     * const node = await prisma.node.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NodeFindFirstOrThrowArgs>(args?: SelectSubset<T, NodeFindFirstOrThrowArgs<ExtArgs>>): Prisma__NodeClient<$Result.GetResult<Prisma.$NodePayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Nodes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NodeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Nodes
     * const nodes = await prisma.node.findMany()
     * 
     * // Get first 10 Nodes
     * const nodes = await prisma.node.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const nodeWithIdOnly = await prisma.node.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NodeFindManyArgs>(args?: SelectSubset<T, NodeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NodePayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Node.
     * @param {NodeCreateArgs} args - Arguments to create a Node.
     * @example
     * // Create one Node
     * const Node = await prisma.node.create({
     *   data: {
     *     // ... data to create a Node
     *   }
     * })
     * 
     */
    create<T extends NodeCreateArgs>(args: SelectSubset<T, NodeCreateArgs<ExtArgs>>): Prisma__NodeClient<$Result.GetResult<Prisma.$NodePayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Nodes.
     * @param {NodeCreateManyArgs} args - Arguments to create many Nodes.
     * @example
     * // Create many Nodes
     * const node = await prisma.node.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NodeCreateManyArgs>(args?: SelectSubset<T, NodeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Nodes and returns the data saved in the database.
     * @param {NodeCreateManyAndReturnArgs} args - Arguments to create many Nodes.
     * @example
     * // Create many Nodes
     * const node = await prisma.node.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Nodes and only return the `id`
     * const nodeWithIdOnly = await prisma.node.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NodeCreateManyAndReturnArgs>(args?: SelectSubset<T, NodeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NodePayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Node.
     * @param {NodeDeleteArgs} args - Arguments to delete one Node.
     * @example
     * // Delete one Node
     * const Node = await prisma.node.delete({
     *   where: {
     *     // ... filter to delete one Node
     *   }
     * })
     * 
     */
    delete<T extends NodeDeleteArgs>(args: SelectSubset<T, NodeDeleteArgs<ExtArgs>>): Prisma__NodeClient<$Result.GetResult<Prisma.$NodePayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Node.
     * @param {NodeUpdateArgs} args - Arguments to update one Node.
     * @example
     * // Update one Node
     * const node = await prisma.node.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NodeUpdateArgs>(args: SelectSubset<T, NodeUpdateArgs<ExtArgs>>): Prisma__NodeClient<$Result.GetResult<Prisma.$NodePayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Nodes.
     * @param {NodeDeleteManyArgs} args - Arguments to filter Nodes to delete.
     * @example
     * // Delete a few Nodes
     * const { count } = await prisma.node.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NodeDeleteManyArgs>(args?: SelectSubset<T, NodeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Nodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NodeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Nodes
     * const node = await prisma.node.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NodeUpdateManyArgs>(args: SelectSubset<T, NodeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Node.
     * @param {NodeUpsertArgs} args - Arguments to update or create a Node.
     * @example
     * // Update or create a Node
     * const node = await prisma.node.upsert({
     *   create: {
     *     // ... data to create a Node
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Node we want to update
     *   }
     * })
     */
    upsert<T extends NodeUpsertArgs>(args: SelectSubset<T, NodeUpsertArgs<ExtArgs>>): Prisma__NodeClient<$Result.GetResult<Prisma.$NodePayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Nodes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NodeCountArgs} args - Arguments to filter Nodes to count.
     * @example
     * // Count the number of Nodes
     * const count = await prisma.node.count({
     *   where: {
     *     // ... the filter for the Nodes we want to count
     *   }
     * })
    **/
    count<T extends NodeCountArgs>(
      args?: Subset<T, NodeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NodeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Node.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NodeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NodeAggregateArgs>(args: Subset<T, NodeAggregateArgs>): Prisma.PrismaPromise<GetNodeAggregateType<T>>

    /**
     * Group by Node.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NodeGroupByArgs} args - Group by arguments.
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
      T extends NodeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NodeGroupByArgs['orderBy'] }
        : { orderBy?: NodeGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, NodeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNodeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Node model
   */
  readonly fields: NodeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Node.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NodeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    parent<T extends Node$parentArgs<ExtArgs> = {}>(args?: Subset<T, Node$parentArgs<ExtArgs>>): Prisma__NodeClient<$Result.GetResult<Prisma.$NodePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    children<T extends Node$childrenArgs<ExtArgs> = {}>(args?: Subset<T, Node$childrenArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NodePayload<ExtArgs>, T, "findMany"> | Null>
    parentBlock<T extends Node$parentBlockArgs<ExtArgs> = {}>(args?: Subset<T, Node$parentBlockArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    createdBy<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    blocks<T extends Node$blocksArgs<ExtArgs> = {}>(args?: Subset<T, Node$blocksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findMany"> | Null>
    aiRequests<T extends Node$aiRequestsArgs<ExtArgs> = {}>(args?: Subset<T, Node$aiRequestsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiRequestPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Node model
   */ 
  interface NodeFieldRefs {
    readonly id: FieldRef<"Node", 'String'>
    readonly conversationId: FieldRef<"Node", 'String'>
    readonly parentNodeId: FieldRef<"Node", 'String'>
    readonly parentBlockId: FieldRef<"Node", 'String'>
    readonly createdById: FieldRef<"Node", 'String'>
    readonly type: FieldRef<"Node", 'NodeType'>
    readonly role: FieldRef<"Node", 'Role'>
    readonly content: FieldRef<"Node", 'String'>
    readonly depth: FieldRef<"Node", 'Int'>
    readonly path: FieldRef<"Node", 'String'>
    readonly position: FieldRef<"Node", 'Int'>
    readonly isCollapsed: FieldRef<"Node", 'Boolean'>
    readonly embedding: FieldRef<"Node", 'Float[]'>
    readonly summarySnapshot: FieldRef<"Node", 'String'>
    readonly createdAt: FieldRef<"Node", 'DateTime'>
    readonly updatedAt: FieldRef<"Node", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Node findUnique
   */
  export type NodeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Node
     */
    select?: NodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeInclude<ExtArgs> | null
    /**
     * Filter, which Node to fetch.
     */
    where: NodeWhereUniqueInput
  }

  /**
   * Node findUniqueOrThrow
   */
  export type NodeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Node
     */
    select?: NodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeInclude<ExtArgs> | null
    /**
     * Filter, which Node to fetch.
     */
    where: NodeWhereUniqueInput
  }

  /**
   * Node findFirst
   */
  export type NodeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Node
     */
    select?: NodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeInclude<ExtArgs> | null
    /**
     * Filter, which Node to fetch.
     */
    where?: NodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Nodes to fetch.
     */
    orderBy?: NodeOrderByWithRelationInput | NodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Nodes.
     */
    cursor?: NodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Nodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Nodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Nodes.
     */
    distinct?: NodeScalarFieldEnum | NodeScalarFieldEnum[]
  }

  /**
   * Node findFirstOrThrow
   */
  export type NodeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Node
     */
    select?: NodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeInclude<ExtArgs> | null
    /**
     * Filter, which Node to fetch.
     */
    where?: NodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Nodes to fetch.
     */
    orderBy?: NodeOrderByWithRelationInput | NodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Nodes.
     */
    cursor?: NodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Nodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Nodes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Nodes.
     */
    distinct?: NodeScalarFieldEnum | NodeScalarFieldEnum[]
  }

  /**
   * Node findMany
   */
  export type NodeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Node
     */
    select?: NodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeInclude<ExtArgs> | null
    /**
     * Filter, which Nodes to fetch.
     */
    where?: NodeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Nodes to fetch.
     */
    orderBy?: NodeOrderByWithRelationInput | NodeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Nodes.
     */
    cursor?: NodeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Nodes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Nodes.
     */
    skip?: number
    distinct?: NodeScalarFieldEnum | NodeScalarFieldEnum[]
  }

  /**
   * Node create
   */
  export type NodeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Node
     */
    select?: NodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeInclude<ExtArgs> | null
    /**
     * The data needed to create a Node.
     */
    data: XOR<NodeCreateInput, NodeUncheckedCreateInput>
  }

  /**
   * Node createMany
   */
  export type NodeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Nodes.
     */
    data: NodeCreateManyInput | NodeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Node createManyAndReturn
   */
  export type NodeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Node
     */
    select?: NodeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Nodes.
     */
    data: NodeCreateManyInput | NodeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Node update
   */
  export type NodeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Node
     */
    select?: NodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeInclude<ExtArgs> | null
    /**
     * The data needed to update a Node.
     */
    data: XOR<NodeUpdateInput, NodeUncheckedUpdateInput>
    /**
     * Choose, which Node to update.
     */
    where: NodeWhereUniqueInput
  }

  /**
   * Node updateMany
   */
  export type NodeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Nodes.
     */
    data: XOR<NodeUpdateManyMutationInput, NodeUncheckedUpdateManyInput>
    /**
     * Filter which Nodes to update
     */
    where?: NodeWhereInput
  }

  /**
   * Node upsert
   */
  export type NodeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Node
     */
    select?: NodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeInclude<ExtArgs> | null
    /**
     * The filter to search for the Node to update in case it exists.
     */
    where: NodeWhereUniqueInput
    /**
     * In case the Node found by the `where` argument doesn't exist, create a new Node with this data.
     */
    create: XOR<NodeCreateInput, NodeUncheckedCreateInput>
    /**
     * In case the Node was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NodeUpdateInput, NodeUncheckedUpdateInput>
  }

  /**
   * Node delete
   */
  export type NodeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Node
     */
    select?: NodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeInclude<ExtArgs> | null
    /**
     * Filter which Node to delete.
     */
    where: NodeWhereUniqueInput
  }

  /**
   * Node deleteMany
   */
  export type NodeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Nodes to delete
     */
    where?: NodeWhereInput
  }

  /**
   * Node.parent
   */
  export type Node$parentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Node
     */
    select?: NodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeInclude<ExtArgs> | null
    where?: NodeWhereInput
  }

  /**
   * Node.children
   */
  export type Node$childrenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Node
     */
    select?: NodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeInclude<ExtArgs> | null
    where?: NodeWhereInput
    orderBy?: NodeOrderByWithRelationInput | NodeOrderByWithRelationInput[]
    cursor?: NodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NodeScalarFieldEnum | NodeScalarFieldEnum[]
  }

  /**
   * Node.parentBlock
   */
  export type Node$parentBlockArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    where?: BlockWhereInput
  }

  /**
   * Node.blocks
   */
  export type Node$blocksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    where?: BlockWhereInput
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    cursor?: BlockWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BlockScalarFieldEnum | BlockScalarFieldEnum[]
  }

  /**
   * Node.aiRequests
   */
  export type Node$aiRequestsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiRequest
     */
    select?: AiRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRequestInclude<ExtArgs> | null
    where?: AiRequestWhereInput
    orderBy?: AiRequestOrderByWithRelationInput | AiRequestOrderByWithRelationInput[]
    cursor?: AiRequestWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AiRequestScalarFieldEnum | AiRequestScalarFieldEnum[]
  }

  /**
   * Node without action
   */
  export type NodeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Node
     */
    select?: NodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeInclude<ExtArgs> | null
  }


  /**
   * Model Block
   */

  export type AggregateBlock = {
    _count: BlockCountAggregateOutputType | null
    _avg: BlockAvgAggregateOutputType | null
    _sum: BlockSumAggregateOutputType | null
    _min: BlockMinAggregateOutputType | null
    _max: BlockMaxAggregateOutputType | null
  }

  export type BlockAvgAggregateOutputType = {
    position: number | null
  }

  export type BlockSumAggregateOutputType = {
    position: number | null
  }

  export type BlockMinAggregateOutputType = {
    id: string | null
    nodeId: string | null
    type: $Enums.BlockType | null
    content: string | null
    position: number | null
    language: string | null
    calloutType: $Enums.CalloutType | null
    createdAt: Date | null
  }

  export type BlockMaxAggregateOutputType = {
    id: string | null
    nodeId: string | null
    type: $Enums.BlockType | null
    content: string | null
    position: number | null
    language: string | null
    calloutType: $Enums.CalloutType | null
    createdAt: Date | null
  }

  export type BlockCountAggregateOutputType = {
    id: number
    nodeId: number
    type: number
    content: number
    position: number
    language: number
    calloutType: number
    createdAt: number
    _all: number
  }


  export type BlockAvgAggregateInputType = {
    position?: true
  }

  export type BlockSumAggregateInputType = {
    position?: true
  }

  export type BlockMinAggregateInputType = {
    id?: true
    nodeId?: true
    type?: true
    content?: true
    position?: true
    language?: true
    calloutType?: true
    createdAt?: true
  }

  export type BlockMaxAggregateInputType = {
    id?: true
    nodeId?: true
    type?: true
    content?: true
    position?: true
    language?: true
    calloutType?: true
    createdAt?: true
  }

  export type BlockCountAggregateInputType = {
    id?: true
    nodeId?: true
    type?: true
    content?: true
    position?: true
    language?: true
    calloutType?: true
    createdAt?: true
    _all?: true
  }

  export type BlockAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Block to aggregate.
     */
    where?: BlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blocks to fetch.
     */
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Blocks
    **/
    _count?: true | BlockCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BlockAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BlockSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlockMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlockMaxAggregateInputType
  }

  export type GetBlockAggregateType<T extends BlockAggregateArgs> = {
        [P in keyof T & keyof AggregateBlock]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlock[P]>
      : GetScalarType<T[P], AggregateBlock[P]>
  }




  export type BlockGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlockWhereInput
    orderBy?: BlockOrderByWithAggregationInput | BlockOrderByWithAggregationInput[]
    by: BlockScalarFieldEnum[] | BlockScalarFieldEnum
    having?: BlockScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlockCountAggregateInputType | true
    _avg?: BlockAvgAggregateInputType
    _sum?: BlockSumAggregateInputType
    _min?: BlockMinAggregateInputType
    _max?: BlockMaxAggregateInputType
  }

  export type BlockGroupByOutputType = {
    id: string
    nodeId: string
    type: $Enums.BlockType
    content: string
    position: number
    language: string | null
    calloutType: $Enums.CalloutType | null
    createdAt: Date
    _count: BlockCountAggregateOutputType | null
    _avg: BlockAvgAggregateOutputType | null
    _sum: BlockSumAggregateOutputType | null
    _min: BlockMinAggregateOutputType | null
    _max: BlockMaxAggregateOutputType | null
  }

  type GetBlockGroupByPayload<T extends BlockGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlockGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlockGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlockGroupByOutputType[P]>
            : GetScalarType<T[P], BlockGroupByOutputType[P]>
        }
      >
    >


  export type BlockSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nodeId?: boolean
    type?: boolean
    content?: boolean
    position?: boolean
    language?: boolean
    calloutType?: boolean
    createdAt?: boolean
    node?: boolean | NodeDefaultArgs<ExtArgs>
    items?: boolean | Block$itemsArgs<ExtArgs>
    branches?: boolean | Block$branchesArgs<ExtArgs>
    _count?: boolean | BlockCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["block"]>

  export type BlockSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nodeId?: boolean
    type?: boolean
    content?: boolean
    position?: boolean
    language?: boolean
    calloutType?: boolean
    createdAt?: boolean
    node?: boolean | NodeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["block"]>

  export type BlockSelectScalar = {
    id?: boolean
    nodeId?: boolean
    type?: boolean
    content?: boolean
    position?: boolean
    language?: boolean
    calloutType?: boolean
    createdAt?: boolean
  }

  export type BlockInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    node?: boolean | NodeDefaultArgs<ExtArgs>
    items?: boolean | Block$itemsArgs<ExtArgs>
    branches?: boolean | Block$branchesArgs<ExtArgs>
    _count?: boolean | BlockCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type BlockIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    node?: boolean | NodeDefaultArgs<ExtArgs>
  }

  export type $BlockPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Block"
    objects: {
      node: Prisma.$NodePayload<ExtArgs>
      items: Prisma.$BlockItemPayload<ExtArgs>[]
      branches: Prisma.$NodePayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      nodeId: string
      type: $Enums.BlockType
      content: string
      position: number
      language: string | null
      calloutType: $Enums.CalloutType | null
      createdAt: Date
    }, ExtArgs["result"]["block"]>
    composites: {}
  }

  type BlockGetPayload<S extends boolean | null | undefined | BlockDefaultArgs> = $Result.GetResult<Prisma.$BlockPayload, S>

  type BlockCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BlockFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BlockCountAggregateInputType | true
    }

  export interface BlockDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Block'], meta: { name: 'Block' } }
    /**
     * Find zero or one Block that matches the filter.
     * @param {BlockFindUniqueArgs} args - Arguments to find a Block
     * @example
     * // Get one Block
     * const block = await prisma.block.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlockFindUniqueArgs>(args: SelectSubset<T, BlockFindUniqueArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Block that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BlockFindUniqueOrThrowArgs} args - Arguments to find a Block
     * @example
     * // Get one Block
     * const block = await prisma.block.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlockFindUniqueOrThrowArgs>(args: SelectSubset<T, BlockFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Block that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockFindFirstArgs} args - Arguments to find a Block
     * @example
     * // Get one Block
     * const block = await prisma.block.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlockFindFirstArgs>(args?: SelectSubset<T, BlockFindFirstArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Block that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockFindFirstOrThrowArgs} args - Arguments to find a Block
     * @example
     * // Get one Block
     * const block = await prisma.block.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlockFindFirstOrThrowArgs>(args?: SelectSubset<T, BlockFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Blocks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Blocks
     * const blocks = await prisma.block.findMany()
     * 
     * // Get first 10 Blocks
     * const blocks = await prisma.block.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blockWithIdOnly = await prisma.block.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlockFindManyArgs>(args?: SelectSubset<T, BlockFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Block.
     * @param {BlockCreateArgs} args - Arguments to create a Block.
     * @example
     * // Create one Block
     * const Block = await prisma.block.create({
     *   data: {
     *     // ... data to create a Block
     *   }
     * })
     * 
     */
    create<T extends BlockCreateArgs>(args: SelectSubset<T, BlockCreateArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Blocks.
     * @param {BlockCreateManyArgs} args - Arguments to create many Blocks.
     * @example
     * // Create many Blocks
     * const block = await prisma.block.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlockCreateManyArgs>(args?: SelectSubset<T, BlockCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Blocks and returns the data saved in the database.
     * @param {BlockCreateManyAndReturnArgs} args - Arguments to create many Blocks.
     * @example
     * // Create many Blocks
     * const block = await prisma.block.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Blocks and only return the `id`
     * const blockWithIdOnly = await prisma.block.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BlockCreateManyAndReturnArgs>(args?: SelectSubset<T, BlockCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Block.
     * @param {BlockDeleteArgs} args - Arguments to delete one Block.
     * @example
     * // Delete one Block
     * const Block = await prisma.block.delete({
     *   where: {
     *     // ... filter to delete one Block
     *   }
     * })
     * 
     */
    delete<T extends BlockDeleteArgs>(args: SelectSubset<T, BlockDeleteArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Block.
     * @param {BlockUpdateArgs} args - Arguments to update one Block.
     * @example
     * // Update one Block
     * const block = await prisma.block.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlockUpdateArgs>(args: SelectSubset<T, BlockUpdateArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Blocks.
     * @param {BlockDeleteManyArgs} args - Arguments to filter Blocks to delete.
     * @example
     * // Delete a few Blocks
     * const { count } = await prisma.block.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlockDeleteManyArgs>(args?: SelectSubset<T, BlockDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Blocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Blocks
     * const block = await prisma.block.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlockUpdateManyArgs>(args: SelectSubset<T, BlockUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Block.
     * @param {BlockUpsertArgs} args - Arguments to update or create a Block.
     * @example
     * // Update or create a Block
     * const block = await prisma.block.upsert({
     *   create: {
     *     // ... data to create a Block
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Block we want to update
     *   }
     * })
     */
    upsert<T extends BlockUpsertArgs>(args: SelectSubset<T, BlockUpsertArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Blocks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockCountArgs} args - Arguments to filter Blocks to count.
     * @example
     * // Count the number of Blocks
     * const count = await prisma.block.count({
     *   where: {
     *     // ... the filter for the Blocks we want to count
     *   }
     * })
    **/
    count<T extends BlockCountArgs>(
      args?: Subset<T, BlockCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlockCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Block.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BlockAggregateArgs>(args: Subset<T, BlockAggregateArgs>): Prisma.PrismaPromise<GetBlockAggregateType<T>>

    /**
     * Group by Block.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockGroupByArgs} args - Group by arguments.
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
      T extends BlockGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlockGroupByArgs['orderBy'] }
        : { orderBy?: BlockGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BlockGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlockGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Block model
   */
  readonly fields: BlockFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Block.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlockClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    node<T extends NodeDefaultArgs<ExtArgs> = {}>(args?: Subset<T, NodeDefaultArgs<ExtArgs>>): Prisma__NodeClient<$Result.GetResult<Prisma.$NodePayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    items<T extends Block$itemsArgs<ExtArgs> = {}>(args?: Subset<T, Block$itemsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockItemPayload<ExtArgs>, T, "findMany"> | Null>
    branches<T extends Block$branchesArgs<ExtArgs> = {}>(args?: Subset<T, Block$branchesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NodePayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Block model
   */ 
  interface BlockFieldRefs {
    readonly id: FieldRef<"Block", 'String'>
    readonly nodeId: FieldRef<"Block", 'String'>
    readonly type: FieldRef<"Block", 'BlockType'>
    readonly content: FieldRef<"Block", 'String'>
    readonly position: FieldRef<"Block", 'Int'>
    readonly language: FieldRef<"Block", 'String'>
    readonly calloutType: FieldRef<"Block", 'CalloutType'>
    readonly createdAt: FieldRef<"Block", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Block findUnique
   */
  export type BlockFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter, which Block to fetch.
     */
    where: BlockWhereUniqueInput
  }

  /**
   * Block findUniqueOrThrow
   */
  export type BlockFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter, which Block to fetch.
     */
    where: BlockWhereUniqueInput
  }

  /**
   * Block findFirst
   */
  export type BlockFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter, which Block to fetch.
     */
    where?: BlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blocks to fetch.
     */
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Blocks.
     */
    cursor?: BlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Blocks.
     */
    distinct?: BlockScalarFieldEnum | BlockScalarFieldEnum[]
  }

  /**
   * Block findFirstOrThrow
   */
  export type BlockFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter, which Block to fetch.
     */
    where?: BlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blocks to fetch.
     */
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Blocks.
     */
    cursor?: BlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blocks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Blocks.
     */
    distinct?: BlockScalarFieldEnum | BlockScalarFieldEnum[]
  }

  /**
   * Block findMany
   */
  export type BlockFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter, which Blocks to fetch.
     */
    where?: BlockWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Blocks to fetch.
     */
    orderBy?: BlockOrderByWithRelationInput | BlockOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Blocks.
     */
    cursor?: BlockWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Blocks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Blocks.
     */
    skip?: number
    distinct?: BlockScalarFieldEnum | BlockScalarFieldEnum[]
  }

  /**
   * Block create
   */
  export type BlockCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * The data needed to create a Block.
     */
    data: XOR<BlockCreateInput, BlockUncheckedCreateInput>
  }

  /**
   * Block createMany
   */
  export type BlockCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Blocks.
     */
    data: BlockCreateManyInput | BlockCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Block createManyAndReturn
   */
  export type BlockCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Blocks.
     */
    data: BlockCreateManyInput | BlockCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Block update
   */
  export type BlockUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * The data needed to update a Block.
     */
    data: XOR<BlockUpdateInput, BlockUncheckedUpdateInput>
    /**
     * Choose, which Block to update.
     */
    where: BlockWhereUniqueInput
  }

  /**
   * Block updateMany
   */
  export type BlockUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Blocks.
     */
    data: XOR<BlockUpdateManyMutationInput, BlockUncheckedUpdateManyInput>
    /**
     * Filter which Blocks to update
     */
    where?: BlockWhereInput
  }

  /**
   * Block upsert
   */
  export type BlockUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * The filter to search for the Block to update in case it exists.
     */
    where: BlockWhereUniqueInput
    /**
     * In case the Block found by the `where` argument doesn't exist, create a new Block with this data.
     */
    create: XOR<BlockCreateInput, BlockUncheckedCreateInput>
    /**
     * In case the Block was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlockUpdateInput, BlockUncheckedUpdateInput>
  }

  /**
   * Block delete
   */
  export type BlockDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
    /**
     * Filter which Block to delete.
     */
    where: BlockWhereUniqueInput
  }

  /**
   * Block deleteMany
   */
  export type BlockDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Blocks to delete
     */
    where?: BlockWhereInput
  }

  /**
   * Block.items
   */
  export type Block$itemsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockItem
     */
    select?: BlockItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockItemInclude<ExtArgs> | null
    where?: BlockItemWhereInput
    orderBy?: BlockItemOrderByWithRelationInput | BlockItemOrderByWithRelationInput[]
    cursor?: BlockItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: BlockItemScalarFieldEnum | BlockItemScalarFieldEnum[]
  }

  /**
   * Block.branches
   */
  export type Block$branchesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Node
     */
    select?: NodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeInclude<ExtArgs> | null
    where?: NodeWhereInput
    orderBy?: NodeOrderByWithRelationInput | NodeOrderByWithRelationInput[]
    cursor?: NodeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NodeScalarFieldEnum | NodeScalarFieldEnum[]
  }

  /**
   * Block without action
   */
  export type BlockDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Block
     */
    select?: BlockSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockInclude<ExtArgs> | null
  }


  /**
   * Model BlockItem
   */

  export type AggregateBlockItem = {
    _count: BlockItemCountAggregateOutputType | null
    _avg: BlockItemAvgAggregateOutputType | null
    _sum: BlockItemSumAggregateOutputType | null
    _min: BlockItemMinAggregateOutputType | null
    _max: BlockItemMaxAggregateOutputType | null
  }

  export type BlockItemAvgAggregateOutputType = {
    position: number | null
  }

  export type BlockItemSumAggregateOutputType = {
    position: number | null
  }

  export type BlockItemMinAggregateOutputType = {
    id: string | null
    blockId: string | null
    content: string | null
    position: number | null
  }

  export type BlockItemMaxAggregateOutputType = {
    id: string | null
    blockId: string | null
    content: string | null
    position: number | null
  }

  export type BlockItemCountAggregateOutputType = {
    id: number
    blockId: number
    content: number
    position: number
    _all: number
  }


  export type BlockItemAvgAggregateInputType = {
    position?: true
  }

  export type BlockItemSumAggregateInputType = {
    position?: true
  }

  export type BlockItemMinAggregateInputType = {
    id?: true
    blockId?: true
    content?: true
    position?: true
  }

  export type BlockItemMaxAggregateInputType = {
    id?: true
    blockId?: true
    content?: true
    position?: true
  }

  export type BlockItemCountAggregateInputType = {
    id?: true
    blockId?: true
    content?: true
    position?: true
    _all?: true
  }

  export type BlockItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlockItem to aggregate.
     */
    where?: BlockItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlockItems to fetch.
     */
    orderBy?: BlockItemOrderByWithRelationInput | BlockItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: BlockItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlockItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlockItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned BlockItems
    **/
    _count?: true | BlockItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: BlockItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: BlockItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: BlockItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: BlockItemMaxAggregateInputType
  }

  export type GetBlockItemAggregateType<T extends BlockItemAggregateArgs> = {
        [P in keyof T & keyof AggregateBlockItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateBlockItem[P]>
      : GetScalarType<T[P], AggregateBlockItem[P]>
  }




  export type BlockItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: BlockItemWhereInput
    orderBy?: BlockItemOrderByWithAggregationInput | BlockItemOrderByWithAggregationInput[]
    by: BlockItemScalarFieldEnum[] | BlockItemScalarFieldEnum
    having?: BlockItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: BlockItemCountAggregateInputType | true
    _avg?: BlockItemAvgAggregateInputType
    _sum?: BlockItemSumAggregateInputType
    _min?: BlockItemMinAggregateInputType
    _max?: BlockItemMaxAggregateInputType
  }

  export type BlockItemGroupByOutputType = {
    id: string
    blockId: string
    content: string
    position: number
    _count: BlockItemCountAggregateOutputType | null
    _avg: BlockItemAvgAggregateOutputType | null
    _sum: BlockItemSumAggregateOutputType | null
    _min: BlockItemMinAggregateOutputType | null
    _max: BlockItemMaxAggregateOutputType | null
  }

  type GetBlockItemGroupByPayload<T extends BlockItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<BlockItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof BlockItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], BlockItemGroupByOutputType[P]>
            : GetScalarType<T[P], BlockItemGroupByOutputType[P]>
        }
      >
    >


  export type BlockItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    blockId?: boolean
    content?: boolean
    position?: boolean
    block?: boolean | BlockDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blockItem"]>

  export type BlockItemSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    blockId?: boolean
    content?: boolean
    position?: boolean
    block?: boolean | BlockDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["blockItem"]>

  export type BlockItemSelectScalar = {
    id?: boolean
    blockId?: boolean
    content?: boolean
    position?: boolean
  }

  export type BlockItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    block?: boolean | BlockDefaultArgs<ExtArgs>
  }
  export type BlockItemIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    block?: boolean | BlockDefaultArgs<ExtArgs>
  }

  export type $BlockItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "BlockItem"
    objects: {
      block: Prisma.$BlockPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      blockId: string
      content: string
      position: number
    }, ExtArgs["result"]["blockItem"]>
    composites: {}
  }

  type BlockItemGetPayload<S extends boolean | null | undefined | BlockItemDefaultArgs> = $Result.GetResult<Prisma.$BlockItemPayload, S>

  type BlockItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<BlockItemFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: BlockItemCountAggregateInputType | true
    }

  export interface BlockItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['BlockItem'], meta: { name: 'BlockItem' } }
    /**
     * Find zero or one BlockItem that matches the filter.
     * @param {BlockItemFindUniqueArgs} args - Arguments to find a BlockItem
     * @example
     * // Get one BlockItem
     * const blockItem = await prisma.blockItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BlockItemFindUniqueArgs>(args: SelectSubset<T, BlockItemFindUniqueArgs<ExtArgs>>): Prisma__BlockItemClient<$Result.GetResult<Prisma.$BlockItemPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one BlockItem that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {BlockItemFindUniqueOrThrowArgs} args - Arguments to find a BlockItem
     * @example
     * // Get one BlockItem
     * const blockItem = await prisma.blockItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BlockItemFindUniqueOrThrowArgs>(args: SelectSubset<T, BlockItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__BlockItemClient<$Result.GetResult<Prisma.$BlockItemPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first BlockItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockItemFindFirstArgs} args - Arguments to find a BlockItem
     * @example
     * // Get one BlockItem
     * const blockItem = await prisma.blockItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BlockItemFindFirstArgs>(args?: SelectSubset<T, BlockItemFindFirstArgs<ExtArgs>>): Prisma__BlockItemClient<$Result.GetResult<Prisma.$BlockItemPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first BlockItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockItemFindFirstOrThrowArgs} args - Arguments to find a BlockItem
     * @example
     * // Get one BlockItem
     * const blockItem = await prisma.blockItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BlockItemFindFirstOrThrowArgs>(args?: SelectSubset<T, BlockItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__BlockItemClient<$Result.GetResult<Prisma.$BlockItemPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more BlockItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all BlockItems
     * const blockItems = await prisma.blockItem.findMany()
     * 
     * // Get first 10 BlockItems
     * const blockItems = await prisma.blockItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const blockItemWithIdOnly = await prisma.blockItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends BlockItemFindManyArgs>(args?: SelectSubset<T, BlockItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockItemPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a BlockItem.
     * @param {BlockItemCreateArgs} args - Arguments to create a BlockItem.
     * @example
     * // Create one BlockItem
     * const BlockItem = await prisma.blockItem.create({
     *   data: {
     *     // ... data to create a BlockItem
     *   }
     * })
     * 
     */
    create<T extends BlockItemCreateArgs>(args: SelectSubset<T, BlockItemCreateArgs<ExtArgs>>): Prisma__BlockItemClient<$Result.GetResult<Prisma.$BlockItemPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many BlockItems.
     * @param {BlockItemCreateManyArgs} args - Arguments to create many BlockItems.
     * @example
     * // Create many BlockItems
     * const blockItem = await prisma.blockItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends BlockItemCreateManyArgs>(args?: SelectSubset<T, BlockItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many BlockItems and returns the data saved in the database.
     * @param {BlockItemCreateManyAndReturnArgs} args - Arguments to create many BlockItems.
     * @example
     * // Create many BlockItems
     * const blockItem = await prisma.blockItem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many BlockItems and only return the `id`
     * const blockItemWithIdOnly = await prisma.blockItem.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends BlockItemCreateManyAndReturnArgs>(args?: SelectSubset<T, BlockItemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$BlockItemPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a BlockItem.
     * @param {BlockItemDeleteArgs} args - Arguments to delete one BlockItem.
     * @example
     * // Delete one BlockItem
     * const BlockItem = await prisma.blockItem.delete({
     *   where: {
     *     // ... filter to delete one BlockItem
     *   }
     * })
     * 
     */
    delete<T extends BlockItemDeleteArgs>(args: SelectSubset<T, BlockItemDeleteArgs<ExtArgs>>): Prisma__BlockItemClient<$Result.GetResult<Prisma.$BlockItemPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one BlockItem.
     * @param {BlockItemUpdateArgs} args - Arguments to update one BlockItem.
     * @example
     * // Update one BlockItem
     * const blockItem = await prisma.blockItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends BlockItemUpdateArgs>(args: SelectSubset<T, BlockItemUpdateArgs<ExtArgs>>): Prisma__BlockItemClient<$Result.GetResult<Prisma.$BlockItemPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more BlockItems.
     * @param {BlockItemDeleteManyArgs} args - Arguments to filter BlockItems to delete.
     * @example
     * // Delete a few BlockItems
     * const { count } = await prisma.blockItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends BlockItemDeleteManyArgs>(args?: SelectSubset<T, BlockItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more BlockItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many BlockItems
     * const blockItem = await prisma.blockItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends BlockItemUpdateManyArgs>(args: SelectSubset<T, BlockItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one BlockItem.
     * @param {BlockItemUpsertArgs} args - Arguments to update or create a BlockItem.
     * @example
     * // Update or create a BlockItem
     * const blockItem = await prisma.blockItem.upsert({
     *   create: {
     *     // ... data to create a BlockItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the BlockItem we want to update
     *   }
     * })
     */
    upsert<T extends BlockItemUpsertArgs>(args: SelectSubset<T, BlockItemUpsertArgs<ExtArgs>>): Prisma__BlockItemClient<$Result.GetResult<Prisma.$BlockItemPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of BlockItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockItemCountArgs} args - Arguments to filter BlockItems to count.
     * @example
     * // Count the number of BlockItems
     * const count = await prisma.blockItem.count({
     *   where: {
     *     // ... the filter for the BlockItems we want to count
     *   }
     * })
    **/
    count<T extends BlockItemCountArgs>(
      args?: Subset<T, BlockItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], BlockItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a BlockItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BlockItemAggregateArgs>(args: Subset<T, BlockItemAggregateArgs>): Prisma.PrismaPromise<GetBlockItemAggregateType<T>>

    /**
     * Group by BlockItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BlockItemGroupByArgs} args - Group by arguments.
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
      T extends BlockItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: BlockItemGroupByArgs['orderBy'] }
        : { orderBy?: BlockItemGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, BlockItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBlockItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the BlockItem model
   */
  readonly fields: BlockItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for BlockItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__BlockItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    block<T extends BlockDefaultArgs<ExtArgs> = {}>(args?: Subset<T, BlockDefaultArgs<ExtArgs>>): Prisma__BlockClient<$Result.GetResult<Prisma.$BlockPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the BlockItem model
   */ 
  interface BlockItemFieldRefs {
    readonly id: FieldRef<"BlockItem", 'String'>
    readonly blockId: FieldRef<"BlockItem", 'String'>
    readonly content: FieldRef<"BlockItem", 'String'>
    readonly position: FieldRef<"BlockItem", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * BlockItem findUnique
   */
  export type BlockItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockItem
     */
    select?: BlockItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockItemInclude<ExtArgs> | null
    /**
     * Filter, which BlockItem to fetch.
     */
    where: BlockItemWhereUniqueInput
  }

  /**
   * BlockItem findUniqueOrThrow
   */
  export type BlockItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockItem
     */
    select?: BlockItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockItemInclude<ExtArgs> | null
    /**
     * Filter, which BlockItem to fetch.
     */
    where: BlockItemWhereUniqueInput
  }

  /**
   * BlockItem findFirst
   */
  export type BlockItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockItem
     */
    select?: BlockItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockItemInclude<ExtArgs> | null
    /**
     * Filter, which BlockItem to fetch.
     */
    where?: BlockItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlockItems to fetch.
     */
    orderBy?: BlockItemOrderByWithRelationInput | BlockItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlockItems.
     */
    cursor?: BlockItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlockItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlockItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlockItems.
     */
    distinct?: BlockItemScalarFieldEnum | BlockItemScalarFieldEnum[]
  }

  /**
   * BlockItem findFirstOrThrow
   */
  export type BlockItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockItem
     */
    select?: BlockItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockItemInclude<ExtArgs> | null
    /**
     * Filter, which BlockItem to fetch.
     */
    where?: BlockItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlockItems to fetch.
     */
    orderBy?: BlockItemOrderByWithRelationInput | BlockItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for BlockItems.
     */
    cursor?: BlockItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlockItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlockItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of BlockItems.
     */
    distinct?: BlockItemScalarFieldEnum | BlockItemScalarFieldEnum[]
  }

  /**
   * BlockItem findMany
   */
  export type BlockItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockItem
     */
    select?: BlockItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockItemInclude<ExtArgs> | null
    /**
     * Filter, which BlockItems to fetch.
     */
    where?: BlockItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of BlockItems to fetch.
     */
    orderBy?: BlockItemOrderByWithRelationInput | BlockItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing BlockItems.
     */
    cursor?: BlockItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` BlockItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` BlockItems.
     */
    skip?: number
    distinct?: BlockItemScalarFieldEnum | BlockItemScalarFieldEnum[]
  }

  /**
   * BlockItem create
   */
  export type BlockItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockItem
     */
    select?: BlockItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockItemInclude<ExtArgs> | null
    /**
     * The data needed to create a BlockItem.
     */
    data: XOR<BlockItemCreateInput, BlockItemUncheckedCreateInput>
  }

  /**
   * BlockItem createMany
   */
  export type BlockItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many BlockItems.
     */
    data: BlockItemCreateManyInput | BlockItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * BlockItem createManyAndReturn
   */
  export type BlockItemCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockItem
     */
    select?: BlockItemSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many BlockItems.
     */
    data: BlockItemCreateManyInput | BlockItemCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockItemIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * BlockItem update
   */
  export type BlockItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockItem
     */
    select?: BlockItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockItemInclude<ExtArgs> | null
    /**
     * The data needed to update a BlockItem.
     */
    data: XOR<BlockItemUpdateInput, BlockItemUncheckedUpdateInput>
    /**
     * Choose, which BlockItem to update.
     */
    where: BlockItemWhereUniqueInput
  }

  /**
   * BlockItem updateMany
   */
  export type BlockItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update BlockItems.
     */
    data: XOR<BlockItemUpdateManyMutationInput, BlockItemUncheckedUpdateManyInput>
    /**
     * Filter which BlockItems to update
     */
    where?: BlockItemWhereInput
  }

  /**
   * BlockItem upsert
   */
  export type BlockItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockItem
     */
    select?: BlockItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockItemInclude<ExtArgs> | null
    /**
     * The filter to search for the BlockItem to update in case it exists.
     */
    where: BlockItemWhereUniqueInput
    /**
     * In case the BlockItem found by the `where` argument doesn't exist, create a new BlockItem with this data.
     */
    create: XOR<BlockItemCreateInput, BlockItemUncheckedCreateInput>
    /**
     * In case the BlockItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<BlockItemUpdateInput, BlockItemUncheckedUpdateInput>
  }

  /**
   * BlockItem delete
   */
  export type BlockItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockItem
     */
    select?: BlockItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockItemInclude<ExtArgs> | null
    /**
     * Filter which BlockItem to delete.
     */
    where: BlockItemWhereUniqueInput
  }

  /**
   * BlockItem deleteMany
   */
  export type BlockItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which BlockItems to delete
     */
    where?: BlockItemWhereInput
  }

  /**
   * BlockItem without action
   */
  export type BlockItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BlockItem
     */
    select?: BlockItemSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: BlockItemInclude<ExtArgs> | null
  }


  /**
   * Model AiRequest
   */

  export type AggregateAiRequest = {
    _count: AiRequestCountAggregateOutputType | null
    _avg: AiRequestAvgAggregateOutputType | null
    _sum: AiRequestSumAggregateOutputType | null
    _min: AiRequestMinAggregateOutputType | null
    _max: AiRequestMaxAggregateOutputType | null
  }

  export type AiRequestAvgAggregateOutputType = {
    promptTokens: number | null
    outputTokens: number | null
    durationMs: number | null
  }

  export type AiRequestSumAggregateOutputType = {
    promptTokens: number | null
    outputTokens: number | null
    durationMs: number | null
  }

  export type AiRequestMinAggregateOutputType = {
    id: string | null
    conversationId: string | null
    nodeId: string | null
    userId: string | null
    status: $Enums.AiRequestStatus | null
    model: string | null
    promptTokens: number | null
    outputTokens: number | null
    durationMs: number | null
    error: string | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type AiRequestMaxAggregateOutputType = {
    id: string | null
    conversationId: string | null
    nodeId: string | null
    userId: string | null
    status: $Enums.AiRequestStatus | null
    model: string | null
    promptTokens: number | null
    outputTokens: number | null
    durationMs: number | null
    error: string | null
    createdAt: Date | null
    completedAt: Date | null
  }

  export type AiRequestCountAggregateOutputType = {
    id: number
    conversationId: number
    nodeId: number
    userId: number
    status: number
    model: number
    promptTokens: number
    outputTokens: number
    durationMs: number
    error: number
    createdAt: number
    completedAt: number
    _all: number
  }


  export type AiRequestAvgAggregateInputType = {
    promptTokens?: true
    outputTokens?: true
    durationMs?: true
  }

  export type AiRequestSumAggregateInputType = {
    promptTokens?: true
    outputTokens?: true
    durationMs?: true
  }

  export type AiRequestMinAggregateInputType = {
    id?: true
    conversationId?: true
    nodeId?: true
    userId?: true
    status?: true
    model?: true
    promptTokens?: true
    outputTokens?: true
    durationMs?: true
    error?: true
    createdAt?: true
    completedAt?: true
  }

  export type AiRequestMaxAggregateInputType = {
    id?: true
    conversationId?: true
    nodeId?: true
    userId?: true
    status?: true
    model?: true
    promptTokens?: true
    outputTokens?: true
    durationMs?: true
    error?: true
    createdAt?: true
    completedAt?: true
  }

  export type AiRequestCountAggregateInputType = {
    id?: true
    conversationId?: true
    nodeId?: true
    userId?: true
    status?: true
    model?: true
    promptTokens?: true
    outputTokens?: true
    durationMs?: true
    error?: true
    createdAt?: true
    completedAt?: true
    _all?: true
  }

  export type AiRequestAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiRequest to aggregate.
     */
    where?: AiRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiRequests to fetch.
     */
    orderBy?: AiRequestOrderByWithRelationInput | AiRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AiRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AiRequests
    **/
    _count?: true | AiRequestCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: AiRequestAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: AiRequestSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AiRequestMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AiRequestMaxAggregateInputType
  }

  export type GetAiRequestAggregateType<T extends AiRequestAggregateArgs> = {
        [P in keyof T & keyof AggregateAiRequest]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAiRequest[P]>
      : GetScalarType<T[P], AggregateAiRequest[P]>
  }




  export type AiRequestGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AiRequestWhereInput
    orderBy?: AiRequestOrderByWithAggregationInput | AiRequestOrderByWithAggregationInput[]
    by: AiRequestScalarFieldEnum[] | AiRequestScalarFieldEnum
    having?: AiRequestScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AiRequestCountAggregateInputType | true
    _avg?: AiRequestAvgAggregateInputType
    _sum?: AiRequestSumAggregateInputType
    _min?: AiRequestMinAggregateInputType
    _max?: AiRequestMaxAggregateInputType
  }

  export type AiRequestGroupByOutputType = {
    id: string
    conversationId: string
    nodeId: string | null
    userId: string
    status: $Enums.AiRequestStatus
    model: string
    promptTokens: number
    outputTokens: number
    durationMs: number | null
    error: string | null
    createdAt: Date
    completedAt: Date | null
    _count: AiRequestCountAggregateOutputType | null
    _avg: AiRequestAvgAggregateOutputType | null
    _sum: AiRequestSumAggregateOutputType | null
    _min: AiRequestMinAggregateOutputType | null
    _max: AiRequestMaxAggregateOutputType | null
  }

  type GetAiRequestGroupByPayload<T extends AiRequestGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AiRequestGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AiRequestGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AiRequestGroupByOutputType[P]>
            : GetScalarType<T[P], AiRequestGroupByOutputType[P]>
        }
      >
    >


  export type AiRequestSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    nodeId?: boolean
    userId?: boolean
    status?: boolean
    model?: boolean
    promptTokens?: boolean
    outputTokens?: boolean
    durationMs?: boolean
    error?: boolean
    createdAt?: boolean
    completedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    node?: boolean | AiRequest$nodeArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aiRequest"]>

  export type AiRequestSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    conversationId?: boolean
    nodeId?: boolean
    userId?: boolean
    status?: boolean
    model?: boolean
    promptTokens?: boolean
    outputTokens?: boolean
    durationMs?: boolean
    error?: boolean
    createdAt?: boolean
    completedAt?: boolean
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    node?: boolean | AiRequest$nodeArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["aiRequest"]>

  export type AiRequestSelectScalar = {
    id?: boolean
    conversationId?: boolean
    nodeId?: boolean
    userId?: boolean
    status?: boolean
    model?: boolean
    promptTokens?: boolean
    outputTokens?: boolean
    durationMs?: boolean
    error?: boolean
    createdAt?: boolean
    completedAt?: boolean
  }

  export type AiRequestInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    node?: boolean | AiRequest$nodeArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type AiRequestIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    conversation?: boolean | ConversationDefaultArgs<ExtArgs>
    node?: boolean | AiRequest$nodeArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $AiRequestPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AiRequest"
    objects: {
      conversation: Prisma.$ConversationPayload<ExtArgs>
      node: Prisma.$NodePayload<ExtArgs> | null
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      conversationId: string
      nodeId: string | null
      userId: string
      status: $Enums.AiRequestStatus
      model: string
      promptTokens: number
      outputTokens: number
      durationMs: number | null
      error: string | null
      createdAt: Date
      completedAt: Date | null
    }, ExtArgs["result"]["aiRequest"]>
    composites: {}
  }

  type AiRequestGetPayload<S extends boolean | null | undefined | AiRequestDefaultArgs> = $Result.GetResult<Prisma.$AiRequestPayload, S>

  type AiRequestCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<AiRequestFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: AiRequestCountAggregateInputType | true
    }

  export interface AiRequestDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AiRequest'], meta: { name: 'AiRequest' } }
    /**
     * Find zero or one AiRequest that matches the filter.
     * @param {AiRequestFindUniqueArgs} args - Arguments to find a AiRequest
     * @example
     * // Get one AiRequest
     * const aiRequest = await prisma.aiRequest.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AiRequestFindUniqueArgs>(args: SelectSubset<T, AiRequestFindUniqueArgs<ExtArgs>>): Prisma__AiRequestClient<$Result.GetResult<Prisma.$AiRequestPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one AiRequest that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {AiRequestFindUniqueOrThrowArgs} args - Arguments to find a AiRequest
     * @example
     * // Get one AiRequest
     * const aiRequest = await prisma.aiRequest.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AiRequestFindUniqueOrThrowArgs>(args: SelectSubset<T, AiRequestFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AiRequestClient<$Result.GetResult<Prisma.$AiRequestPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first AiRequest that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiRequestFindFirstArgs} args - Arguments to find a AiRequest
     * @example
     * // Get one AiRequest
     * const aiRequest = await prisma.aiRequest.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AiRequestFindFirstArgs>(args?: SelectSubset<T, AiRequestFindFirstArgs<ExtArgs>>): Prisma__AiRequestClient<$Result.GetResult<Prisma.$AiRequestPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first AiRequest that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiRequestFindFirstOrThrowArgs} args - Arguments to find a AiRequest
     * @example
     * // Get one AiRequest
     * const aiRequest = await prisma.aiRequest.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AiRequestFindFirstOrThrowArgs>(args?: SelectSubset<T, AiRequestFindFirstOrThrowArgs<ExtArgs>>): Prisma__AiRequestClient<$Result.GetResult<Prisma.$AiRequestPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more AiRequests that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiRequestFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AiRequests
     * const aiRequests = await prisma.aiRequest.findMany()
     * 
     * // Get first 10 AiRequests
     * const aiRequests = await prisma.aiRequest.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const aiRequestWithIdOnly = await prisma.aiRequest.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AiRequestFindManyArgs>(args?: SelectSubset<T, AiRequestFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiRequestPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a AiRequest.
     * @param {AiRequestCreateArgs} args - Arguments to create a AiRequest.
     * @example
     * // Create one AiRequest
     * const AiRequest = await prisma.aiRequest.create({
     *   data: {
     *     // ... data to create a AiRequest
     *   }
     * })
     * 
     */
    create<T extends AiRequestCreateArgs>(args: SelectSubset<T, AiRequestCreateArgs<ExtArgs>>): Prisma__AiRequestClient<$Result.GetResult<Prisma.$AiRequestPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many AiRequests.
     * @param {AiRequestCreateManyArgs} args - Arguments to create many AiRequests.
     * @example
     * // Create many AiRequests
     * const aiRequest = await prisma.aiRequest.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AiRequestCreateManyArgs>(args?: SelectSubset<T, AiRequestCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AiRequests and returns the data saved in the database.
     * @param {AiRequestCreateManyAndReturnArgs} args - Arguments to create many AiRequests.
     * @example
     * // Create many AiRequests
     * const aiRequest = await prisma.aiRequest.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AiRequests and only return the `id`
     * const aiRequestWithIdOnly = await prisma.aiRequest.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AiRequestCreateManyAndReturnArgs>(args?: SelectSubset<T, AiRequestCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AiRequestPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a AiRequest.
     * @param {AiRequestDeleteArgs} args - Arguments to delete one AiRequest.
     * @example
     * // Delete one AiRequest
     * const AiRequest = await prisma.aiRequest.delete({
     *   where: {
     *     // ... filter to delete one AiRequest
     *   }
     * })
     * 
     */
    delete<T extends AiRequestDeleteArgs>(args: SelectSubset<T, AiRequestDeleteArgs<ExtArgs>>): Prisma__AiRequestClient<$Result.GetResult<Prisma.$AiRequestPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one AiRequest.
     * @param {AiRequestUpdateArgs} args - Arguments to update one AiRequest.
     * @example
     * // Update one AiRequest
     * const aiRequest = await prisma.aiRequest.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AiRequestUpdateArgs>(args: SelectSubset<T, AiRequestUpdateArgs<ExtArgs>>): Prisma__AiRequestClient<$Result.GetResult<Prisma.$AiRequestPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more AiRequests.
     * @param {AiRequestDeleteManyArgs} args - Arguments to filter AiRequests to delete.
     * @example
     * // Delete a few AiRequests
     * const { count } = await prisma.aiRequest.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AiRequestDeleteManyArgs>(args?: SelectSubset<T, AiRequestDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AiRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiRequestUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AiRequests
     * const aiRequest = await prisma.aiRequest.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AiRequestUpdateManyArgs>(args: SelectSubset<T, AiRequestUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one AiRequest.
     * @param {AiRequestUpsertArgs} args - Arguments to update or create a AiRequest.
     * @example
     * // Update or create a AiRequest
     * const aiRequest = await prisma.aiRequest.upsert({
     *   create: {
     *     // ... data to create a AiRequest
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AiRequest we want to update
     *   }
     * })
     */
    upsert<T extends AiRequestUpsertArgs>(args: SelectSubset<T, AiRequestUpsertArgs<ExtArgs>>): Prisma__AiRequestClient<$Result.GetResult<Prisma.$AiRequestPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of AiRequests.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiRequestCountArgs} args - Arguments to filter AiRequests to count.
     * @example
     * // Count the number of AiRequests
     * const count = await prisma.aiRequest.count({
     *   where: {
     *     // ... the filter for the AiRequests we want to count
     *   }
     * })
    **/
    count<T extends AiRequestCountArgs>(
      args?: Subset<T, AiRequestCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AiRequestCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AiRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiRequestAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends AiRequestAggregateArgs>(args: Subset<T, AiRequestAggregateArgs>): Prisma.PrismaPromise<GetAiRequestAggregateType<T>>

    /**
     * Group by AiRequest.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AiRequestGroupByArgs} args - Group by arguments.
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
      T extends AiRequestGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AiRequestGroupByArgs['orderBy'] }
        : { orderBy?: AiRequestGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, AiRequestGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAiRequestGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AiRequest model
   */
  readonly fields: AiRequestFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AiRequest.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AiRequestClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    conversation<T extends ConversationDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ConversationDefaultArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    node<T extends AiRequest$nodeArgs<ExtArgs> = {}>(args?: Subset<T, AiRequest$nodeArgs<ExtArgs>>): Prisma__NodeClient<$Result.GetResult<Prisma.$NodePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the AiRequest model
   */ 
  interface AiRequestFieldRefs {
    readonly id: FieldRef<"AiRequest", 'String'>
    readonly conversationId: FieldRef<"AiRequest", 'String'>
    readonly nodeId: FieldRef<"AiRequest", 'String'>
    readonly userId: FieldRef<"AiRequest", 'String'>
    readonly status: FieldRef<"AiRequest", 'AiRequestStatus'>
    readonly model: FieldRef<"AiRequest", 'String'>
    readonly promptTokens: FieldRef<"AiRequest", 'Int'>
    readonly outputTokens: FieldRef<"AiRequest", 'Int'>
    readonly durationMs: FieldRef<"AiRequest", 'Int'>
    readonly error: FieldRef<"AiRequest", 'String'>
    readonly createdAt: FieldRef<"AiRequest", 'DateTime'>
    readonly completedAt: FieldRef<"AiRequest", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AiRequest findUnique
   */
  export type AiRequestFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiRequest
     */
    select?: AiRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRequestInclude<ExtArgs> | null
    /**
     * Filter, which AiRequest to fetch.
     */
    where: AiRequestWhereUniqueInput
  }

  /**
   * AiRequest findUniqueOrThrow
   */
  export type AiRequestFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiRequest
     */
    select?: AiRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRequestInclude<ExtArgs> | null
    /**
     * Filter, which AiRequest to fetch.
     */
    where: AiRequestWhereUniqueInput
  }

  /**
   * AiRequest findFirst
   */
  export type AiRequestFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiRequest
     */
    select?: AiRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRequestInclude<ExtArgs> | null
    /**
     * Filter, which AiRequest to fetch.
     */
    where?: AiRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiRequests to fetch.
     */
    orderBy?: AiRequestOrderByWithRelationInput | AiRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiRequests.
     */
    cursor?: AiRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiRequests.
     */
    distinct?: AiRequestScalarFieldEnum | AiRequestScalarFieldEnum[]
  }

  /**
   * AiRequest findFirstOrThrow
   */
  export type AiRequestFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiRequest
     */
    select?: AiRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRequestInclude<ExtArgs> | null
    /**
     * Filter, which AiRequest to fetch.
     */
    where?: AiRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiRequests to fetch.
     */
    orderBy?: AiRequestOrderByWithRelationInput | AiRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AiRequests.
     */
    cursor?: AiRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiRequests.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AiRequests.
     */
    distinct?: AiRequestScalarFieldEnum | AiRequestScalarFieldEnum[]
  }

  /**
   * AiRequest findMany
   */
  export type AiRequestFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiRequest
     */
    select?: AiRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRequestInclude<ExtArgs> | null
    /**
     * Filter, which AiRequests to fetch.
     */
    where?: AiRequestWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AiRequests to fetch.
     */
    orderBy?: AiRequestOrderByWithRelationInput | AiRequestOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AiRequests.
     */
    cursor?: AiRequestWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AiRequests from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AiRequests.
     */
    skip?: number
    distinct?: AiRequestScalarFieldEnum | AiRequestScalarFieldEnum[]
  }

  /**
   * AiRequest create
   */
  export type AiRequestCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiRequest
     */
    select?: AiRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRequestInclude<ExtArgs> | null
    /**
     * The data needed to create a AiRequest.
     */
    data: XOR<AiRequestCreateInput, AiRequestUncheckedCreateInput>
  }

  /**
   * AiRequest createMany
   */
  export type AiRequestCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AiRequests.
     */
    data: AiRequestCreateManyInput | AiRequestCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * AiRequest createManyAndReturn
   */
  export type AiRequestCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiRequest
     */
    select?: AiRequestSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many AiRequests.
     */
    data: AiRequestCreateManyInput | AiRequestCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRequestIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * AiRequest update
   */
  export type AiRequestUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiRequest
     */
    select?: AiRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRequestInclude<ExtArgs> | null
    /**
     * The data needed to update a AiRequest.
     */
    data: XOR<AiRequestUpdateInput, AiRequestUncheckedUpdateInput>
    /**
     * Choose, which AiRequest to update.
     */
    where: AiRequestWhereUniqueInput
  }

  /**
   * AiRequest updateMany
   */
  export type AiRequestUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AiRequests.
     */
    data: XOR<AiRequestUpdateManyMutationInput, AiRequestUncheckedUpdateManyInput>
    /**
     * Filter which AiRequests to update
     */
    where?: AiRequestWhereInput
  }

  /**
   * AiRequest upsert
   */
  export type AiRequestUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiRequest
     */
    select?: AiRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRequestInclude<ExtArgs> | null
    /**
     * The filter to search for the AiRequest to update in case it exists.
     */
    where: AiRequestWhereUniqueInput
    /**
     * In case the AiRequest found by the `where` argument doesn't exist, create a new AiRequest with this data.
     */
    create: XOR<AiRequestCreateInput, AiRequestUncheckedCreateInput>
    /**
     * In case the AiRequest was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AiRequestUpdateInput, AiRequestUncheckedUpdateInput>
  }

  /**
   * AiRequest delete
   */
  export type AiRequestDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiRequest
     */
    select?: AiRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRequestInclude<ExtArgs> | null
    /**
     * Filter which AiRequest to delete.
     */
    where: AiRequestWhereUniqueInput
  }

  /**
   * AiRequest deleteMany
   */
  export type AiRequestDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AiRequests to delete
     */
    where?: AiRequestWhereInput
  }

  /**
   * AiRequest.node
   */
  export type AiRequest$nodeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Node
     */
    select?: NodeSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: NodeInclude<ExtArgs> | null
    where?: NodeWhereInput
  }

  /**
   * AiRequest without action
   */
  export type AiRequestDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AiRequest
     */
    select?: AiRequestSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AiRequestInclude<ExtArgs> | null
  }


  /**
   * Model Document
   */

  export type AggregateDocument = {
    _count: DocumentCountAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  export type DocumentMinAggregateOutputType = {
    id: string | null
    workspaceId: string | null
    conversationId: string | null
    title: string | null
    url: string | null
    createdAt: Date | null
  }

  export type DocumentMaxAggregateOutputType = {
    id: string | null
    workspaceId: string | null
    conversationId: string | null
    title: string | null
    url: string | null
    createdAt: Date | null
  }

  export type DocumentCountAggregateOutputType = {
    id: number
    workspaceId: number
    conversationId: number
    title: number
    url: number
    createdAt: number
    _all: number
  }


  export type DocumentMinAggregateInputType = {
    id?: true
    workspaceId?: true
    conversationId?: true
    title?: true
    url?: true
    createdAt?: true
  }

  export type DocumentMaxAggregateInputType = {
    id?: true
    workspaceId?: true
    conversationId?: true
    title?: true
    url?: true
    createdAt?: true
  }

  export type DocumentCountAggregateInputType = {
    id?: true
    workspaceId?: true
    conversationId?: true
    title?: true
    url?: true
    createdAt?: true
    _all?: true
  }

  export type DocumentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Document to aggregate.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Documents
    **/
    _count?: true | DocumentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentMaxAggregateInputType
  }

  export type GetDocumentAggregateType<T extends DocumentAggregateArgs> = {
        [P in keyof T & keyof AggregateDocument]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocument[P]>
      : GetScalarType<T[P], AggregateDocument[P]>
  }




  export type DocumentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentWhereInput
    orderBy?: DocumentOrderByWithAggregationInput | DocumentOrderByWithAggregationInput[]
    by: DocumentScalarFieldEnum[] | DocumentScalarFieldEnum
    having?: DocumentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentCountAggregateInputType | true
    _min?: DocumentMinAggregateInputType
    _max?: DocumentMaxAggregateInputType
  }

  export type DocumentGroupByOutputType = {
    id: string
    workspaceId: string | null
    conversationId: string | null
    title: string
    url: string | null
    createdAt: Date
    _count: DocumentCountAggregateOutputType | null
    _min: DocumentMinAggregateOutputType | null
    _max: DocumentMaxAggregateOutputType | null
  }

  type GetDocumentGroupByPayload<T extends DocumentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentGroupByOutputType[P]>
        }
      >
    >


  export type DocumentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    conversationId?: boolean
    title?: boolean
    url?: boolean
    createdAt?: boolean
    workspace?: boolean | Document$workspaceArgs<ExtArgs>
    conversation?: boolean | Document$conversationArgs<ExtArgs>
    chunks?: boolean | Document$chunksArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    workspaceId?: boolean
    conversationId?: boolean
    title?: boolean
    url?: boolean
    createdAt?: boolean
    workspace?: boolean | Document$workspaceArgs<ExtArgs>
    conversation?: boolean | Document$conversationArgs<ExtArgs>
  }, ExtArgs["result"]["document"]>

  export type DocumentSelectScalar = {
    id?: boolean
    workspaceId?: boolean
    conversationId?: boolean
    title?: boolean
    url?: boolean
    createdAt?: boolean
  }

  export type DocumentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | Document$workspaceArgs<ExtArgs>
    conversation?: boolean | Document$conversationArgs<ExtArgs>
    chunks?: boolean | Document$chunksArgs<ExtArgs>
    _count?: boolean | DocumentCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type DocumentIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    workspace?: boolean | Document$workspaceArgs<ExtArgs>
    conversation?: boolean | Document$conversationArgs<ExtArgs>
  }

  export type $DocumentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Document"
    objects: {
      workspace: Prisma.$WorkspacePayload<ExtArgs> | null
      conversation: Prisma.$ConversationPayload<ExtArgs> | null
      chunks: Prisma.$DocumentChunkPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      workspaceId: string | null
      conversationId: string | null
      title: string
      url: string | null
      createdAt: Date
    }, ExtArgs["result"]["document"]>
    composites: {}
  }

  type DocumentGetPayload<S extends boolean | null | undefined | DocumentDefaultArgs> = $Result.GetResult<Prisma.$DocumentPayload, S>

  type DocumentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DocumentFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DocumentCountAggregateInputType | true
    }

  export interface DocumentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Document'], meta: { name: 'Document' } }
    /**
     * Find zero or one Document that matches the filter.
     * @param {DocumentFindUniqueArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentFindUniqueArgs>(args: SelectSubset<T, DocumentFindUniqueArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Document that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DocumentFindUniqueOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Document that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentFindFirstArgs>(args?: SelectSubset<T, DocumentFindFirstArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Document that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindFirstOrThrowArgs} args - Arguments to find a Document
     * @example
     * // Get one Document
     * const document = await prisma.document.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Documents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Documents
     * const documents = await prisma.document.findMany()
     * 
     * // Get first 10 Documents
     * const documents = await prisma.document.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentWithIdOnly = await prisma.document.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentFindManyArgs>(args?: SelectSubset<T, DocumentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Document.
     * @param {DocumentCreateArgs} args - Arguments to create a Document.
     * @example
     * // Create one Document
     * const Document = await prisma.document.create({
     *   data: {
     *     // ... data to create a Document
     *   }
     * })
     * 
     */
    create<T extends DocumentCreateArgs>(args: SelectSubset<T, DocumentCreateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Documents.
     * @param {DocumentCreateManyArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentCreateManyArgs>(args?: SelectSubset<T, DocumentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Documents and returns the data saved in the database.
     * @param {DocumentCreateManyAndReturnArgs} args - Arguments to create many Documents.
     * @example
     * // Create many Documents
     * const document = await prisma.document.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Documents and only return the `id`
     * const documentWithIdOnly = await prisma.document.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Document.
     * @param {DocumentDeleteArgs} args - Arguments to delete one Document.
     * @example
     * // Delete one Document
     * const Document = await prisma.document.delete({
     *   where: {
     *     // ... filter to delete one Document
     *   }
     * })
     * 
     */
    delete<T extends DocumentDeleteArgs>(args: SelectSubset<T, DocumentDeleteArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Document.
     * @param {DocumentUpdateArgs} args - Arguments to update one Document.
     * @example
     * // Update one Document
     * const document = await prisma.document.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentUpdateArgs>(args: SelectSubset<T, DocumentUpdateArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Documents.
     * @param {DocumentDeleteManyArgs} args - Arguments to filter Documents to delete.
     * @example
     * // Delete a few Documents
     * const { count } = await prisma.document.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentDeleteManyArgs>(args?: SelectSubset<T, DocumentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Documents
     * const document = await prisma.document.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentUpdateManyArgs>(args: SelectSubset<T, DocumentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Document.
     * @param {DocumentUpsertArgs} args - Arguments to update or create a Document.
     * @example
     * // Update or create a Document
     * const document = await prisma.document.upsert({
     *   create: {
     *     // ... data to create a Document
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Document we want to update
     *   }
     * })
     */
    upsert<T extends DocumentUpsertArgs>(args: SelectSubset<T, DocumentUpsertArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Documents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentCountArgs} args - Arguments to filter Documents to count.
     * @example
     * // Count the number of Documents
     * const count = await prisma.document.count({
     *   where: {
     *     // ... the filter for the Documents we want to count
     *   }
     * })
    **/
    count<T extends DocumentCountArgs>(
      args?: Subset<T, DocumentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DocumentAggregateArgs>(args: Subset<T, DocumentAggregateArgs>): Prisma.PrismaPromise<GetDocumentAggregateType<T>>

    /**
     * Group by Document.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentGroupByArgs} args - Group by arguments.
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
      T extends DocumentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentGroupByArgs['orderBy'] }
        : { orderBy?: DocumentGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DocumentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Document model
   */
  readonly fields: DocumentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Document.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    workspace<T extends Document$workspaceArgs<ExtArgs> = {}>(args?: Subset<T, Document$workspaceArgs<ExtArgs>>): Prisma__WorkspaceClient<$Result.GetResult<Prisma.$WorkspacePayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    conversation<T extends Document$conversationArgs<ExtArgs> = {}>(args?: Subset<T, Document$conversationArgs<ExtArgs>>): Prisma__ConversationClient<$Result.GetResult<Prisma.$ConversationPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    chunks<T extends Document$chunksArgs<ExtArgs> = {}>(args?: Subset<T, Document$chunksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentChunkPayload<ExtArgs>, T, "findMany"> | Null>
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
   * Fields of the Document model
   */ 
  interface DocumentFieldRefs {
    readonly id: FieldRef<"Document", 'String'>
    readonly workspaceId: FieldRef<"Document", 'String'>
    readonly conversationId: FieldRef<"Document", 'String'>
    readonly title: FieldRef<"Document", 'String'>
    readonly url: FieldRef<"Document", 'String'>
    readonly createdAt: FieldRef<"Document", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Document findUnique
   */
  export type DocumentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findUniqueOrThrow
   */
  export type DocumentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document findFirst
   */
  export type DocumentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findFirstOrThrow
   */
  export type DocumentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Document to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Documents.
     */
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document findMany
   */
  export type DocumentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter, which Documents to fetch.
     */
    where?: DocumentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Documents to fetch.
     */
    orderBy?: DocumentOrderByWithRelationInput | DocumentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Documents.
     */
    cursor?: DocumentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Documents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Documents.
     */
    skip?: number
    distinct?: DocumentScalarFieldEnum | DocumentScalarFieldEnum[]
  }

  /**
   * Document create
   */
  export type DocumentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to create a Document.
     */
    data: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
  }

  /**
   * Document createMany
   */
  export type DocumentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Document createManyAndReturn
   */
  export type DocumentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Documents.
     */
    data: DocumentCreateManyInput | DocumentCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Document update
   */
  export type DocumentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The data needed to update a Document.
     */
    data: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
    /**
     * Choose, which Document to update.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document updateMany
   */
  export type DocumentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Documents.
     */
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyInput>
    /**
     * Filter which Documents to update
     */
    where?: DocumentWhereInput
  }

  /**
   * Document upsert
   */
  export type DocumentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * The filter to search for the Document to update in case it exists.
     */
    where: DocumentWhereUniqueInput
    /**
     * In case the Document found by the `where` argument doesn't exist, create a new Document with this data.
     */
    create: XOR<DocumentCreateInput, DocumentUncheckedCreateInput>
    /**
     * In case the Document was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentUpdateInput, DocumentUncheckedUpdateInput>
  }

  /**
   * Document delete
   */
  export type DocumentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
    /**
     * Filter which Document to delete.
     */
    where: DocumentWhereUniqueInput
  }

  /**
   * Document deleteMany
   */
  export type DocumentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Documents to delete
     */
    where?: DocumentWhereInput
  }

  /**
   * Document.workspace
   */
  export type Document$workspaceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Workspace
     */
    select?: WorkspaceSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: WorkspaceInclude<ExtArgs> | null
    where?: WorkspaceWhereInput
  }

  /**
   * Document.conversation
   */
  export type Document$conversationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Conversation
     */
    select?: ConversationSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ConversationInclude<ExtArgs> | null
    where?: ConversationWhereInput
  }

  /**
   * Document.chunks
   */
  export type Document$chunksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentChunk
     */
    select?: DocumentChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentChunkInclude<ExtArgs> | null
    where?: DocumentChunkWhereInput
    orderBy?: DocumentChunkOrderByWithRelationInput | DocumentChunkOrderByWithRelationInput[]
    cursor?: DocumentChunkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: DocumentChunkScalarFieldEnum | DocumentChunkScalarFieldEnum[]
  }

  /**
   * Document without action
   */
  export type DocumentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Document
     */
    select?: DocumentSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentInclude<ExtArgs> | null
  }


  /**
   * Model DocumentChunk
   */

  export type AggregateDocumentChunk = {
    _count: DocumentChunkCountAggregateOutputType | null
    _avg: DocumentChunkAvgAggregateOutputType | null
    _sum: DocumentChunkSumAggregateOutputType | null
    _min: DocumentChunkMinAggregateOutputType | null
    _max: DocumentChunkMaxAggregateOutputType | null
  }

  export type DocumentChunkAvgAggregateOutputType = {
    embedding: number | null
    position: number | null
  }

  export type DocumentChunkSumAggregateOutputType = {
    embedding: number[]
    position: number | null
  }

  export type DocumentChunkMinAggregateOutputType = {
    id: string | null
    documentId: string | null
    content: string | null
    position: number | null
  }

  export type DocumentChunkMaxAggregateOutputType = {
    id: string | null
    documentId: string | null
    content: string | null
    position: number | null
  }

  export type DocumentChunkCountAggregateOutputType = {
    id: number
    documentId: number
    content: number
    embedding: number
    position: number
    _all: number
  }


  export type DocumentChunkAvgAggregateInputType = {
    embedding?: true
    position?: true
  }

  export type DocumentChunkSumAggregateInputType = {
    embedding?: true
    position?: true
  }

  export type DocumentChunkMinAggregateInputType = {
    id?: true
    documentId?: true
    content?: true
    position?: true
  }

  export type DocumentChunkMaxAggregateInputType = {
    id?: true
    documentId?: true
    content?: true
    position?: true
  }

  export type DocumentChunkCountAggregateInputType = {
    id?: true
    documentId?: true
    content?: true
    embedding?: true
    position?: true
    _all?: true
  }

  export type DocumentChunkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentChunk to aggregate.
     */
    where?: DocumentChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentChunks to fetch.
     */
    orderBy?: DocumentChunkOrderByWithRelationInput | DocumentChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DocumentChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DocumentChunks
    **/
    _count?: true | DocumentChunkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: DocumentChunkAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: DocumentChunkSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DocumentChunkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DocumentChunkMaxAggregateInputType
  }

  export type GetDocumentChunkAggregateType<T extends DocumentChunkAggregateArgs> = {
        [P in keyof T & keyof AggregateDocumentChunk]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDocumentChunk[P]>
      : GetScalarType<T[P], AggregateDocumentChunk[P]>
  }




  export type DocumentChunkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DocumentChunkWhereInput
    orderBy?: DocumentChunkOrderByWithAggregationInput | DocumentChunkOrderByWithAggregationInput[]
    by: DocumentChunkScalarFieldEnum[] | DocumentChunkScalarFieldEnum
    having?: DocumentChunkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DocumentChunkCountAggregateInputType | true
    _avg?: DocumentChunkAvgAggregateInputType
    _sum?: DocumentChunkSumAggregateInputType
    _min?: DocumentChunkMinAggregateInputType
    _max?: DocumentChunkMaxAggregateInputType
  }

  export type DocumentChunkGroupByOutputType = {
    id: string
    documentId: string
    content: string
    embedding: number[]
    position: number
    _count: DocumentChunkCountAggregateOutputType | null
    _avg: DocumentChunkAvgAggregateOutputType | null
    _sum: DocumentChunkSumAggregateOutputType | null
    _min: DocumentChunkMinAggregateOutputType | null
    _max: DocumentChunkMaxAggregateOutputType | null
  }

  type GetDocumentChunkGroupByPayload<T extends DocumentChunkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DocumentChunkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DocumentChunkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DocumentChunkGroupByOutputType[P]>
            : GetScalarType<T[P], DocumentChunkGroupByOutputType[P]>
        }
      >
    >


  export type DocumentChunkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    content?: boolean
    embedding?: boolean
    position?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentChunk"]>

  export type DocumentChunkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    documentId?: boolean
    content?: boolean
    embedding?: boolean
    position?: boolean
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["documentChunk"]>

  export type DocumentChunkSelectScalar = {
    id?: boolean
    documentId?: boolean
    content?: boolean
    embedding?: boolean
    position?: boolean
  }

  export type DocumentChunkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }
  export type DocumentChunkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    document?: boolean | DocumentDefaultArgs<ExtArgs>
  }

  export type $DocumentChunkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DocumentChunk"
    objects: {
      document: Prisma.$DocumentPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      documentId: string
      content: string
      embedding: number[]
      position: number
    }, ExtArgs["result"]["documentChunk"]>
    composites: {}
  }

  type DocumentChunkGetPayload<S extends boolean | null | undefined | DocumentChunkDefaultArgs> = $Result.GetResult<Prisma.$DocumentChunkPayload, S>

  type DocumentChunkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<DocumentChunkFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: DocumentChunkCountAggregateInputType | true
    }

  export interface DocumentChunkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DocumentChunk'], meta: { name: 'DocumentChunk' } }
    /**
     * Find zero or one DocumentChunk that matches the filter.
     * @param {DocumentChunkFindUniqueArgs} args - Arguments to find a DocumentChunk
     * @example
     * // Get one DocumentChunk
     * const documentChunk = await prisma.documentChunk.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DocumentChunkFindUniqueArgs>(args: SelectSubset<T, DocumentChunkFindUniqueArgs<ExtArgs>>): Prisma__DocumentChunkClient<$Result.GetResult<Prisma.$DocumentChunkPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one DocumentChunk that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {DocumentChunkFindUniqueOrThrowArgs} args - Arguments to find a DocumentChunk
     * @example
     * // Get one DocumentChunk
     * const documentChunk = await prisma.documentChunk.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DocumentChunkFindUniqueOrThrowArgs>(args: SelectSubset<T, DocumentChunkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DocumentChunkClient<$Result.GetResult<Prisma.$DocumentChunkPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first DocumentChunk that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentChunkFindFirstArgs} args - Arguments to find a DocumentChunk
     * @example
     * // Get one DocumentChunk
     * const documentChunk = await prisma.documentChunk.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DocumentChunkFindFirstArgs>(args?: SelectSubset<T, DocumentChunkFindFirstArgs<ExtArgs>>): Prisma__DocumentChunkClient<$Result.GetResult<Prisma.$DocumentChunkPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first DocumentChunk that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentChunkFindFirstOrThrowArgs} args - Arguments to find a DocumentChunk
     * @example
     * // Get one DocumentChunk
     * const documentChunk = await prisma.documentChunk.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DocumentChunkFindFirstOrThrowArgs>(args?: SelectSubset<T, DocumentChunkFindFirstOrThrowArgs<ExtArgs>>): Prisma__DocumentChunkClient<$Result.GetResult<Prisma.$DocumentChunkPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more DocumentChunks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentChunkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DocumentChunks
     * const documentChunks = await prisma.documentChunk.findMany()
     * 
     * // Get first 10 DocumentChunks
     * const documentChunks = await prisma.documentChunk.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const documentChunkWithIdOnly = await prisma.documentChunk.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DocumentChunkFindManyArgs>(args?: SelectSubset<T, DocumentChunkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentChunkPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a DocumentChunk.
     * @param {DocumentChunkCreateArgs} args - Arguments to create a DocumentChunk.
     * @example
     * // Create one DocumentChunk
     * const DocumentChunk = await prisma.documentChunk.create({
     *   data: {
     *     // ... data to create a DocumentChunk
     *   }
     * })
     * 
     */
    create<T extends DocumentChunkCreateArgs>(args: SelectSubset<T, DocumentChunkCreateArgs<ExtArgs>>): Prisma__DocumentChunkClient<$Result.GetResult<Prisma.$DocumentChunkPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many DocumentChunks.
     * @param {DocumentChunkCreateManyArgs} args - Arguments to create many DocumentChunks.
     * @example
     * // Create many DocumentChunks
     * const documentChunk = await prisma.documentChunk.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DocumentChunkCreateManyArgs>(args?: SelectSubset<T, DocumentChunkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DocumentChunks and returns the data saved in the database.
     * @param {DocumentChunkCreateManyAndReturnArgs} args - Arguments to create many DocumentChunks.
     * @example
     * // Create many DocumentChunks
     * const documentChunk = await prisma.documentChunk.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DocumentChunks and only return the `id`
     * const documentChunkWithIdOnly = await prisma.documentChunk.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DocumentChunkCreateManyAndReturnArgs>(args?: SelectSubset<T, DocumentChunkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DocumentChunkPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a DocumentChunk.
     * @param {DocumentChunkDeleteArgs} args - Arguments to delete one DocumentChunk.
     * @example
     * // Delete one DocumentChunk
     * const DocumentChunk = await prisma.documentChunk.delete({
     *   where: {
     *     // ... filter to delete one DocumentChunk
     *   }
     * })
     * 
     */
    delete<T extends DocumentChunkDeleteArgs>(args: SelectSubset<T, DocumentChunkDeleteArgs<ExtArgs>>): Prisma__DocumentChunkClient<$Result.GetResult<Prisma.$DocumentChunkPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one DocumentChunk.
     * @param {DocumentChunkUpdateArgs} args - Arguments to update one DocumentChunk.
     * @example
     * // Update one DocumentChunk
     * const documentChunk = await prisma.documentChunk.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DocumentChunkUpdateArgs>(args: SelectSubset<T, DocumentChunkUpdateArgs<ExtArgs>>): Prisma__DocumentChunkClient<$Result.GetResult<Prisma.$DocumentChunkPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more DocumentChunks.
     * @param {DocumentChunkDeleteManyArgs} args - Arguments to filter DocumentChunks to delete.
     * @example
     * // Delete a few DocumentChunks
     * const { count } = await prisma.documentChunk.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DocumentChunkDeleteManyArgs>(args?: SelectSubset<T, DocumentChunkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DocumentChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentChunkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DocumentChunks
     * const documentChunk = await prisma.documentChunk.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DocumentChunkUpdateManyArgs>(args: SelectSubset<T, DocumentChunkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one DocumentChunk.
     * @param {DocumentChunkUpsertArgs} args - Arguments to update or create a DocumentChunk.
     * @example
     * // Update or create a DocumentChunk
     * const documentChunk = await prisma.documentChunk.upsert({
     *   create: {
     *     // ... data to create a DocumentChunk
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DocumentChunk we want to update
     *   }
     * })
     */
    upsert<T extends DocumentChunkUpsertArgs>(args: SelectSubset<T, DocumentChunkUpsertArgs<ExtArgs>>): Prisma__DocumentChunkClient<$Result.GetResult<Prisma.$DocumentChunkPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of DocumentChunks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentChunkCountArgs} args - Arguments to filter DocumentChunks to count.
     * @example
     * // Count the number of DocumentChunks
     * const count = await prisma.documentChunk.count({
     *   where: {
     *     // ... the filter for the DocumentChunks we want to count
     *   }
     * })
    **/
    count<T extends DocumentChunkCountArgs>(
      args?: Subset<T, DocumentChunkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DocumentChunkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DocumentChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentChunkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DocumentChunkAggregateArgs>(args: Subset<T, DocumentChunkAggregateArgs>): Prisma.PrismaPromise<GetDocumentChunkAggregateType<T>>

    /**
     * Group by DocumentChunk.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DocumentChunkGroupByArgs} args - Group by arguments.
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
      T extends DocumentChunkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DocumentChunkGroupByArgs['orderBy'] }
        : { orderBy?: DocumentChunkGroupByArgs['orderBy'] },
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
    >(args: SubsetIntersection<T, DocumentChunkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDocumentChunkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DocumentChunk model
   */
  readonly fields: DocumentChunkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DocumentChunk.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DocumentChunkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    document<T extends DocumentDefaultArgs<ExtArgs> = {}>(args?: Subset<T, DocumentDefaultArgs<ExtArgs>>): Prisma__DocumentClient<$Result.GetResult<Prisma.$DocumentPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
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
   * Fields of the DocumentChunk model
   */ 
  interface DocumentChunkFieldRefs {
    readonly id: FieldRef<"DocumentChunk", 'String'>
    readonly documentId: FieldRef<"DocumentChunk", 'String'>
    readonly content: FieldRef<"DocumentChunk", 'String'>
    readonly embedding: FieldRef<"DocumentChunk", 'Float[]'>
    readonly position: FieldRef<"DocumentChunk", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * DocumentChunk findUnique
   */
  export type DocumentChunkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentChunk
     */
    select?: DocumentChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentChunkInclude<ExtArgs> | null
    /**
     * Filter, which DocumentChunk to fetch.
     */
    where: DocumentChunkWhereUniqueInput
  }

  /**
   * DocumentChunk findUniqueOrThrow
   */
  export type DocumentChunkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentChunk
     */
    select?: DocumentChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentChunkInclude<ExtArgs> | null
    /**
     * Filter, which DocumentChunk to fetch.
     */
    where: DocumentChunkWhereUniqueInput
  }

  /**
   * DocumentChunk findFirst
   */
  export type DocumentChunkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentChunk
     */
    select?: DocumentChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentChunkInclude<ExtArgs> | null
    /**
     * Filter, which DocumentChunk to fetch.
     */
    where?: DocumentChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentChunks to fetch.
     */
    orderBy?: DocumentChunkOrderByWithRelationInput | DocumentChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentChunks.
     */
    cursor?: DocumentChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentChunks.
     */
    distinct?: DocumentChunkScalarFieldEnum | DocumentChunkScalarFieldEnum[]
  }

  /**
   * DocumentChunk findFirstOrThrow
   */
  export type DocumentChunkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentChunk
     */
    select?: DocumentChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentChunkInclude<ExtArgs> | null
    /**
     * Filter, which DocumentChunk to fetch.
     */
    where?: DocumentChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentChunks to fetch.
     */
    orderBy?: DocumentChunkOrderByWithRelationInput | DocumentChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DocumentChunks.
     */
    cursor?: DocumentChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentChunks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DocumentChunks.
     */
    distinct?: DocumentChunkScalarFieldEnum | DocumentChunkScalarFieldEnum[]
  }

  /**
   * DocumentChunk findMany
   */
  export type DocumentChunkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentChunk
     */
    select?: DocumentChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentChunkInclude<ExtArgs> | null
    /**
     * Filter, which DocumentChunks to fetch.
     */
    where?: DocumentChunkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DocumentChunks to fetch.
     */
    orderBy?: DocumentChunkOrderByWithRelationInput | DocumentChunkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DocumentChunks.
     */
    cursor?: DocumentChunkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DocumentChunks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DocumentChunks.
     */
    skip?: number
    distinct?: DocumentChunkScalarFieldEnum | DocumentChunkScalarFieldEnum[]
  }

  /**
   * DocumentChunk create
   */
  export type DocumentChunkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentChunk
     */
    select?: DocumentChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentChunkInclude<ExtArgs> | null
    /**
     * The data needed to create a DocumentChunk.
     */
    data: XOR<DocumentChunkCreateInput, DocumentChunkUncheckedCreateInput>
  }

  /**
   * DocumentChunk createMany
   */
  export type DocumentChunkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DocumentChunks.
     */
    data: DocumentChunkCreateManyInput | DocumentChunkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DocumentChunk createManyAndReturn
   */
  export type DocumentChunkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentChunk
     */
    select?: DocumentChunkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many DocumentChunks.
     */
    data: DocumentChunkCreateManyInput | DocumentChunkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentChunkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * DocumentChunk update
   */
  export type DocumentChunkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentChunk
     */
    select?: DocumentChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentChunkInclude<ExtArgs> | null
    /**
     * The data needed to update a DocumentChunk.
     */
    data: XOR<DocumentChunkUpdateInput, DocumentChunkUncheckedUpdateInput>
    /**
     * Choose, which DocumentChunk to update.
     */
    where: DocumentChunkWhereUniqueInput
  }

  /**
   * DocumentChunk updateMany
   */
  export type DocumentChunkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DocumentChunks.
     */
    data: XOR<DocumentChunkUpdateManyMutationInput, DocumentChunkUncheckedUpdateManyInput>
    /**
     * Filter which DocumentChunks to update
     */
    where?: DocumentChunkWhereInput
  }

  /**
   * DocumentChunk upsert
   */
  export type DocumentChunkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentChunk
     */
    select?: DocumentChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentChunkInclude<ExtArgs> | null
    /**
     * The filter to search for the DocumentChunk to update in case it exists.
     */
    where: DocumentChunkWhereUniqueInput
    /**
     * In case the DocumentChunk found by the `where` argument doesn't exist, create a new DocumentChunk with this data.
     */
    create: XOR<DocumentChunkCreateInput, DocumentChunkUncheckedCreateInput>
    /**
     * In case the DocumentChunk was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DocumentChunkUpdateInput, DocumentChunkUncheckedUpdateInput>
  }

  /**
   * DocumentChunk delete
   */
  export type DocumentChunkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentChunk
     */
    select?: DocumentChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentChunkInclude<ExtArgs> | null
    /**
     * Filter which DocumentChunk to delete.
     */
    where: DocumentChunkWhereUniqueInput
  }

  /**
   * DocumentChunk deleteMany
   */
  export type DocumentChunkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DocumentChunks to delete
     */
    where?: DocumentChunkWhereInput
  }

  /**
   * DocumentChunk without action
   */
  export type DocumentChunkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DocumentChunk
     */
    select?: DocumentChunkSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: DocumentChunkInclude<ExtArgs> | null
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


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    name: 'name',
    avatar: 'avatar',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const WorkspaceScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type WorkspaceScalarFieldEnum = (typeof WorkspaceScalarFieldEnum)[keyof typeof WorkspaceScalarFieldEnum]


  export const WorkspaceMemberScalarFieldEnum: {
    id: 'id',
    workspaceId: 'workspaceId',
    userId: 'userId',
    role: 'role',
    joinedAt: 'joinedAt'
  };

  export type WorkspaceMemberScalarFieldEnum = (typeof WorkspaceMemberScalarFieldEnum)[keyof typeof WorkspaceMemberScalarFieldEnum]


  export const ConversationScalarFieldEnum: {
    id: 'id',
    title: 'title',
    description: 'description',
    ownerId: 'ownerId',
    workspaceId: 'workspaceId',
    isFavorite: 'isFavorite',
    tags: 'tags',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ConversationScalarFieldEnum = (typeof ConversationScalarFieldEnum)[keyof typeof ConversationScalarFieldEnum]


  export const NodeScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    parentNodeId: 'parentNodeId',
    parentBlockId: 'parentBlockId',
    createdById: 'createdById',
    type: 'type',
    role: 'role',
    content: 'content',
    depth: 'depth',
    path: 'path',
    position: 'position',
    isCollapsed: 'isCollapsed',
    embedding: 'embedding',
    summarySnapshot: 'summarySnapshot',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NodeScalarFieldEnum = (typeof NodeScalarFieldEnum)[keyof typeof NodeScalarFieldEnum]


  export const BlockScalarFieldEnum: {
    id: 'id',
    nodeId: 'nodeId',
    type: 'type',
    content: 'content',
    position: 'position',
    language: 'language',
    calloutType: 'calloutType',
    createdAt: 'createdAt'
  };

  export type BlockScalarFieldEnum = (typeof BlockScalarFieldEnum)[keyof typeof BlockScalarFieldEnum]


  export const BlockItemScalarFieldEnum: {
    id: 'id',
    blockId: 'blockId',
    content: 'content',
    position: 'position'
  };

  export type BlockItemScalarFieldEnum = (typeof BlockItemScalarFieldEnum)[keyof typeof BlockItemScalarFieldEnum]


  export const AiRequestScalarFieldEnum: {
    id: 'id',
    conversationId: 'conversationId',
    nodeId: 'nodeId',
    userId: 'userId',
    status: 'status',
    model: 'model',
    promptTokens: 'promptTokens',
    outputTokens: 'outputTokens',
    durationMs: 'durationMs',
    error: 'error',
    createdAt: 'createdAt',
    completedAt: 'completedAt'
  };

  export type AiRequestScalarFieldEnum = (typeof AiRequestScalarFieldEnum)[keyof typeof AiRequestScalarFieldEnum]


  export const DocumentScalarFieldEnum: {
    id: 'id',
    workspaceId: 'workspaceId',
    conversationId: 'conversationId',
    title: 'title',
    url: 'url',
    createdAt: 'createdAt'
  };

  export type DocumentScalarFieldEnum = (typeof DocumentScalarFieldEnum)[keyof typeof DocumentScalarFieldEnum]


  export const DocumentChunkScalarFieldEnum: {
    id: 'id',
    documentId: 'documentId',
    content: 'content',
    embedding: 'embedding',
    position: 'position'
  };

  export type DocumentChunkScalarFieldEnum = (typeof DocumentChunkScalarFieldEnum)[keyof typeof DocumentChunkScalarFieldEnum]


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
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'WorkspaceMemberRole'
   */
  export type EnumWorkspaceMemberRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkspaceMemberRole'>
    


  /**
   * Reference to a field of type 'WorkspaceMemberRole[]'
   */
  export type ListEnumWorkspaceMemberRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'WorkspaceMemberRole[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'NodeType'
   */
  export type EnumNodeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NodeType'>
    


  /**
   * Reference to a field of type 'NodeType[]'
   */
  export type ListEnumNodeTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'NodeType[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'BlockType'
   */
  export type EnumBlockTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BlockType'>
    


  /**
   * Reference to a field of type 'BlockType[]'
   */
  export type ListEnumBlockTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BlockType[]'>
    


  /**
   * Reference to a field of type 'CalloutType'
   */
  export type EnumCalloutTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CalloutType'>
    


  /**
   * Reference to a field of type 'CalloutType[]'
   */
  export type ListEnumCalloutTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CalloutType[]'>
    


  /**
   * Reference to a field of type 'AiRequestStatus'
   */
  export type EnumAiRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AiRequestStatus'>
    


  /**
   * Reference to a field of type 'AiRequestStatus[]'
   */
  export type ListEnumAiRequestStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AiRequestStatus[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    workspaceMembers?: WorkspaceMemberListRelationFilter
    conversations?: ConversationListRelationFilter
    nodes?: NodeListRelationFilter
    aiRequests?: AiRequestListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    workspaceMembers?: WorkspaceMemberOrderByRelationAggregateInput
    conversations?: ConversationOrderByRelationAggregateInput
    nodes?: NodeOrderByRelationAggregateInput
    aiRequests?: AiRequestOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    avatar?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    workspaceMembers?: WorkspaceMemberListRelationFilter
    conversations?: ConversationListRelationFilter
    nodes?: NodeListRelationFilter
    aiRequests?: AiRequestListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatar?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    avatar?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type WorkspaceWhereInput = {
    AND?: WorkspaceWhereInput | WorkspaceWhereInput[]
    OR?: WorkspaceWhereInput[]
    NOT?: WorkspaceWhereInput | WorkspaceWhereInput[]
    id?: StringFilter<"Workspace"> | string
    name?: StringFilter<"Workspace"> | string
    slug?: StringFilter<"Workspace"> | string
    createdAt?: DateTimeFilter<"Workspace"> | Date | string
    updatedAt?: DateTimeFilter<"Workspace"> | Date | string
    members?: WorkspaceMemberListRelationFilter
    conversations?: ConversationListRelationFilter
    documents?: DocumentListRelationFilter
  }

  export type WorkspaceOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    members?: WorkspaceMemberOrderByRelationAggregateInput
    conversations?: ConversationOrderByRelationAggregateInput
    documents?: DocumentOrderByRelationAggregateInput
  }

  export type WorkspaceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: WorkspaceWhereInput | WorkspaceWhereInput[]
    OR?: WorkspaceWhereInput[]
    NOT?: WorkspaceWhereInput | WorkspaceWhereInput[]
    name?: StringFilter<"Workspace"> | string
    createdAt?: DateTimeFilter<"Workspace"> | Date | string
    updatedAt?: DateTimeFilter<"Workspace"> | Date | string
    members?: WorkspaceMemberListRelationFilter
    conversations?: ConversationListRelationFilter
    documents?: DocumentListRelationFilter
  }, "id" | "slug">

  export type WorkspaceOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: WorkspaceCountOrderByAggregateInput
    _max?: WorkspaceMaxOrderByAggregateInput
    _min?: WorkspaceMinOrderByAggregateInput
  }

  export type WorkspaceScalarWhereWithAggregatesInput = {
    AND?: WorkspaceScalarWhereWithAggregatesInput | WorkspaceScalarWhereWithAggregatesInput[]
    OR?: WorkspaceScalarWhereWithAggregatesInput[]
    NOT?: WorkspaceScalarWhereWithAggregatesInput | WorkspaceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Workspace"> | string
    name?: StringWithAggregatesFilter<"Workspace"> | string
    slug?: StringWithAggregatesFilter<"Workspace"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Workspace"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Workspace"> | Date | string
  }

  export type WorkspaceMemberWhereInput = {
    AND?: WorkspaceMemberWhereInput | WorkspaceMemberWhereInput[]
    OR?: WorkspaceMemberWhereInput[]
    NOT?: WorkspaceMemberWhereInput | WorkspaceMemberWhereInput[]
    id?: StringFilter<"WorkspaceMember"> | string
    workspaceId?: StringFilter<"WorkspaceMember"> | string
    userId?: StringFilter<"WorkspaceMember"> | string
    role?: EnumWorkspaceMemberRoleFilter<"WorkspaceMember"> | $Enums.WorkspaceMemberRole
    joinedAt?: DateTimeFilter<"WorkspaceMember"> | Date | string
    workspace?: XOR<WorkspaceRelationFilter, WorkspaceWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type WorkspaceMemberOrderByWithRelationInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    workspace?: WorkspaceOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type WorkspaceMemberWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    workspaceId_userId?: WorkspaceMemberWorkspaceIdUserIdCompoundUniqueInput
    AND?: WorkspaceMemberWhereInput | WorkspaceMemberWhereInput[]
    OR?: WorkspaceMemberWhereInput[]
    NOT?: WorkspaceMemberWhereInput | WorkspaceMemberWhereInput[]
    workspaceId?: StringFilter<"WorkspaceMember"> | string
    userId?: StringFilter<"WorkspaceMember"> | string
    role?: EnumWorkspaceMemberRoleFilter<"WorkspaceMember"> | $Enums.WorkspaceMemberRole
    joinedAt?: DateTimeFilter<"WorkspaceMember"> | Date | string
    workspace?: XOR<WorkspaceRelationFilter, WorkspaceWhereInput>
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id" | "workspaceId_userId">

  export type WorkspaceMemberOrderByWithAggregationInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
    _count?: WorkspaceMemberCountOrderByAggregateInput
    _max?: WorkspaceMemberMaxOrderByAggregateInput
    _min?: WorkspaceMemberMinOrderByAggregateInput
  }

  export type WorkspaceMemberScalarWhereWithAggregatesInput = {
    AND?: WorkspaceMemberScalarWhereWithAggregatesInput | WorkspaceMemberScalarWhereWithAggregatesInput[]
    OR?: WorkspaceMemberScalarWhereWithAggregatesInput[]
    NOT?: WorkspaceMemberScalarWhereWithAggregatesInput | WorkspaceMemberScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"WorkspaceMember"> | string
    workspaceId?: StringWithAggregatesFilter<"WorkspaceMember"> | string
    userId?: StringWithAggregatesFilter<"WorkspaceMember"> | string
    role?: EnumWorkspaceMemberRoleWithAggregatesFilter<"WorkspaceMember"> | $Enums.WorkspaceMemberRole
    joinedAt?: DateTimeWithAggregatesFilter<"WorkspaceMember"> | Date | string
  }

  export type ConversationWhereInput = {
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    id?: StringFilter<"Conversation"> | string
    title?: StringFilter<"Conversation"> | string
    description?: StringNullableFilter<"Conversation"> | string | null
    ownerId?: StringFilter<"Conversation"> | string
    workspaceId?: StringNullableFilter<"Conversation"> | string | null
    isFavorite?: BoolFilter<"Conversation"> | boolean
    tags?: StringNullableListFilter<"Conversation">
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    owner?: XOR<UserRelationFilter, UserWhereInput>
    workspace?: XOR<WorkspaceNullableRelationFilter, WorkspaceWhereInput> | null
    nodes?: NodeListRelationFilter
    aiRequests?: AiRequestListRelationFilter
    documents?: DocumentListRelationFilter
  }

  export type ConversationOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    workspaceId?: SortOrderInput | SortOrder
    isFavorite?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    owner?: UserOrderByWithRelationInput
    workspace?: WorkspaceOrderByWithRelationInput
    nodes?: NodeOrderByRelationAggregateInput
    aiRequests?: AiRequestOrderByRelationAggregateInput
    documents?: DocumentOrderByRelationAggregateInput
  }

  export type ConversationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ConversationWhereInput | ConversationWhereInput[]
    OR?: ConversationWhereInput[]
    NOT?: ConversationWhereInput | ConversationWhereInput[]
    title?: StringFilter<"Conversation"> | string
    description?: StringNullableFilter<"Conversation"> | string | null
    ownerId?: StringFilter<"Conversation"> | string
    workspaceId?: StringNullableFilter<"Conversation"> | string | null
    isFavorite?: BoolFilter<"Conversation"> | boolean
    tags?: StringNullableListFilter<"Conversation">
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
    owner?: XOR<UserRelationFilter, UserWhereInput>
    workspace?: XOR<WorkspaceNullableRelationFilter, WorkspaceWhereInput> | null
    nodes?: NodeListRelationFilter
    aiRequests?: AiRequestListRelationFilter
    documents?: DocumentListRelationFilter
  }, "id">

  export type ConversationOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrderInput | SortOrder
    ownerId?: SortOrder
    workspaceId?: SortOrderInput | SortOrder
    isFavorite?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ConversationCountOrderByAggregateInput
    _max?: ConversationMaxOrderByAggregateInput
    _min?: ConversationMinOrderByAggregateInput
  }

  export type ConversationScalarWhereWithAggregatesInput = {
    AND?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    OR?: ConversationScalarWhereWithAggregatesInput[]
    NOT?: ConversationScalarWhereWithAggregatesInput | ConversationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Conversation"> | string
    title?: StringWithAggregatesFilter<"Conversation"> | string
    description?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    ownerId?: StringWithAggregatesFilter<"Conversation"> | string
    workspaceId?: StringNullableWithAggregatesFilter<"Conversation"> | string | null
    isFavorite?: BoolWithAggregatesFilter<"Conversation"> | boolean
    tags?: StringNullableListFilter<"Conversation">
    createdAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Conversation"> | Date | string
  }

  export type NodeWhereInput = {
    AND?: NodeWhereInput | NodeWhereInput[]
    OR?: NodeWhereInput[]
    NOT?: NodeWhereInput | NodeWhereInput[]
    id?: StringFilter<"Node"> | string
    conversationId?: StringFilter<"Node"> | string
    parentNodeId?: StringNullableFilter<"Node"> | string | null
    parentBlockId?: StringNullableFilter<"Node"> | string | null
    createdById?: StringFilter<"Node"> | string
    type?: EnumNodeTypeFilter<"Node"> | $Enums.NodeType
    role?: EnumRoleFilter<"Node"> | $Enums.Role
    content?: StringNullableFilter<"Node"> | string | null
    depth?: IntFilter<"Node"> | number
    path?: StringFilter<"Node"> | string
    position?: IntFilter<"Node"> | number
    isCollapsed?: BoolFilter<"Node"> | boolean
    embedding?: FloatNullableListFilter<"Node">
    summarySnapshot?: StringNullableFilter<"Node"> | string | null
    createdAt?: DateTimeFilter<"Node"> | Date | string
    updatedAt?: DateTimeFilter<"Node"> | Date | string
    conversation?: XOR<ConversationRelationFilter, ConversationWhereInput>
    parent?: XOR<NodeNullableRelationFilter, NodeWhereInput> | null
    children?: NodeListRelationFilter
    parentBlock?: XOR<BlockNullableRelationFilter, BlockWhereInput> | null
    createdBy?: XOR<UserRelationFilter, UserWhereInput>
    blocks?: BlockListRelationFilter
    aiRequests?: AiRequestListRelationFilter
  }

  export type NodeOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    parentNodeId?: SortOrderInput | SortOrder
    parentBlockId?: SortOrderInput | SortOrder
    createdById?: SortOrder
    type?: SortOrder
    role?: SortOrder
    content?: SortOrderInput | SortOrder
    depth?: SortOrder
    path?: SortOrder
    position?: SortOrder
    isCollapsed?: SortOrder
    embedding?: SortOrder
    summarySnapshot?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    conversation?: ConversationOrderByWithRelationInput
    parent?: NodeOrderByWithRelationInput
    children?: NodeOrderByRelationAggregateInput
    parentBlock?: BlockOrderByWithRelationInput
    createdBy?: UserOrderByWithRelationInput
    blocks?: BlockOrderByRelationAggregateInput
    aiRequests?: AiRequestOrderByRelationAggregateInput
  }

  export type NodeWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: NodeWhereInput | NodeWhereInput[]
    OR?: NodeWhereInput[]
    NOT?: NodeWhereInput | NodeWhereInput[]
    conversationId?: StringFilter<"Node"> | string
    parentNodeId?: StringNullableFilter<"Node"> | string | null
    parentBlockId?: StringNullableFilter<"Node"> | string | null
    createdById?: StringFilter<"Node"> | string
    type?: EnumNodeTypeFilter<"Node"> | $Enums.NodeType
    role?: EnumRoleFilter<"Node"> | $Enums.Role
    content?: StringNullableFilter<"Node"> | string | null
    depth?: IntFilter<"Node"> | number
    path?: StringFilter<"Node"> | string
    position?: IntFilter<"Node"> | number
    isCollapsed?: BoolFilter<"Node"> | boolean
    embedding?: FloatNullableListFilter<"Node">
    summarySnapshot?: StringNullableFilter<"Node"> | string | null
    createdAt?: DateTimeFilter<"Node"> | Date | string
    updatedAt?: DateTimeFilter<"Node"> | Date | string
    conversation?: XOR<ConversationRelationFilter, ConversationWhereInput>
    parent?: XOR<NodeNullableRelationFilter, NodeWhereInput> | null
    children?: NodeListRelationFilter
    parentBlock?: XOR<BlockNullableRelationFilter, BlockWhereInput> | null
    createdBy?: XOR<UserRelationFilter, UserWhereInput>
    blocks?: BlockListRelationFilter
    aiRequests?: AiRequestListRelationFilter
  }, "id">

  export type NodeOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    parentNodeId?: SortOrderInput | SortOrder
    parentBlockId?: SortOrderInput | SortOrder
    createdById?: SortOrder
    type?: SortOrder
    role?: SortOrder
    content?: SortOrderInput | SortOrder
    depth?: SortOrder
    path?: SortOrder
    position?: SortOrder
    isCollapsed?: SortOrder
    embedding?: SortOrder
    summarySnapshot?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NodeCountOrderByAggregateInput
    _avg?: NodeAvgOrderByAggregateInput
    _max?: NodeMaxOrderByAggregateInput
    _min?: NodeMinOrderByAggregateInput
    _sum?: NodeSumOrderByAggregateInput
  }

  export type NodeScalarWhereWithAggregatesInput = {
    AND?: NodeScalarWhereWithAggregatesInput | NodeScalarWhereWithAggregatesInput[]
    OR?: NodeScalarWhereWithAggregatesInput[]
    NOT?: NodeScalarWhereWithAggregatesInput | NodeScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Node"> | string
    conversationId?: StringWithAggregatesFilter<"Node"> | string
    parentNodeId?: StringNullableWithAggregatesFilter<"Node"> | string | null
    parentBlockId?: StringNullableWithAggregatesFilter<"Node"> | string | null
    createdById?: StringWithAggregatesFilter<"Node"> | string
    type?: EnumNodeTypeWithAggregatesFilter<"Node"> | $Enums.NodeType
    role?: EnumRoleWithAggregatesFilter<"Node"> | $Enums.Role
    content?: StringNullableWithAggregatesFilter<"Node"> | string | null
    depth?: IntWithAggregatesFilter<"Node"> | number
    path?: StringWithAggregatesFilter<"Node"> | string
    position?: IntWithAggregatesFilter<"Node"> | number
    isCollapsed?: BoolWithAggregatesFilter<"Node"> | boolean
    embedding?: FloatNullableListFilter<"Node">
    summarySnapshot?: StringNullableWithAggregatesFilter<"Node"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Node"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Node"> | Date | string
  }

  export type BlockWhereInput = {
    AND?: BlockWhereInput | BlockWhereInput[]
    OR?: BlockWhereInput[]
    NOT?: BlockWhereInput | BlockWhereInput[]
    id?: StringFilter<"Block"> | string
    nodeId?: StringFilter<"Block"> | string
    type?: EnumBlockTypeFilter<"Block"> | $Enums.BlockType
    content?: StringFilter<"Block"> | string
    position?: IntFilter<"Block"> | number
    language?: StringNullableFilter<"Block"> | string | null
    calloutType?: EnumCalloutTypeNullableFilter<"Block"> | $Enums.CalloutType | null
    createdAt?: DateTimeFilter<"Block"> | Date | string
    node?: XOR<NodeRelationFilter, NodeWhereInput>
    items?: BlockItemListRelationFilter
    branches?: NodeListRelationFilter
  }

  export type BlockOrderByWithRelationInput = {
    id?: SortOrder
    nodeId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    position?: SortOrder
    language?: SortOrderInput | SortOrder
    calloutType?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    node?: NodeOrderByWithRelationInput
    items?: BlockItemOrderByRelationAggregateInput
    branches?: NodeOrderByRelationAggregateInput
  }

  export type BlockWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BlockWhereInput | BlockWhereInput[]
    OR?: BlockWhereInput[]
    NOT?: BlockWhereInput | BlockWhereInput[]
    nodeId?: StringFilter<"Block"> | string
    type?: EnumBlockTypeFilter<"Block"> | $Enums.BlockType
    content?: StringFilter<"Block"> | string
    position?: IntFilter<"Block"> | number
    language?: StringNullableFilter<"Block"> | string | null
    calloutType?: EnumCalloutTypeNullableFilter<"Block"> | $Enums.CalloutType | null
    createdAt?: DateTimeFilter<"Block"> | Date | string
    node?: XOR<NodeRelationFilter, NodeWhereInput>
    items?: BlockItemListRelationFilter
    branches?: NodeListRelationFilter
  }, "id">

  export type BlockOrderByWithAggregationInput = {
    id?: SortOrder
    nodeId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    position?: SortOrder
    language?: SortOrderInput | SortOrder
    calloutType?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: BlockCountOrderByAggregateInput
    _avg?: BlockAvgOrderByAggregateInput
    _max?: BlockMaxOrderByAggregateInput
    _min?: BlockMinOrderByAggregateInput
    _sum?: BlockSumOrderByAggregateInput
  }

  export type BlockScalarWhereWithAggregatesInput = {
    AND?: BlockScalarWhereWithAggregatesInput | BlockScalarWhereWithAggregatesInput[]
    OR?: BlockScalarWhereWithAggregatesInput[]
    NOT?: BlockScalarWhereWithAggregatesInput | BlockScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Block"> | string
    nodeId?: StringWithAggregatesFilter<"Block"> | string
    type?: EnumBlockTypeWithAggregatesFilter<"Block"> | $Enums.BlockType
    content?: StringWithAggregatesFilter<"Block"> | string
    position?: IntWithAggregatesFilter<"Block"> | number
    language?: StringNullableWithAggregatesFilter<"Block"> | string | null
    calloutType?: EnumCalloutTypeNullableWithAggregatesFilter<"Block"> | $Enums.CalloutType | null
    createdAt?: DateTimeWithAggregatesFilter<"Block"> | Date | string
  }

  export type BlockItemWhereInput = {
    AND?: BlockItemWhereInput | BlockItemWhereInput[]
    OR?: BlockItemWhereInput[]
    NOT?: BlockItemWhereInput | BlockItemWhereInput[]
    id?: StringFilter<"BlockItem"> | string
    blockId?: StringFilter<"BlockItem"> | string
    content?: StringFilter<"BlockItem"> | string
    position?: IntFilter<"BlockItem"> | number
    block?: XOR<BlockRelationFilter, BlockWhereInput>
  }

  export type BlockItemOrderByWithRelationInput = {
    id?: SortOrder
    blockId?: SortOrder
    content?: SortOrder
    position?: SortOrder
    block?: BlockOrderByWithRelationInput
  }

  export type BlockItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: BlockItemWhereInput | BlockItemWhereInput[]
    OR?: BlockItemWhereInput[]
    NOT?: BlockItemWhereInput | BlockItemWhereInput[]
    blockId?: StringFilter<"BlockItem"> | string
    content?: StringFilter<"BlockItem"> | string
    position?: IntFilter<"BlockItem"> | number
    block?: XOR<BlockRelationFilter, BlockWhereInput>
  }, "id">

  export type BlockItemOrderByWithAggregationInput = {
    id?: SortOrder
    blockId?: SortOrder
    content?: SortOrder
    position?: SortOrder
    _count?: BlockItemCountOrderByAggregateInput
    _avg?: BlockItemAvgOrderByAggregateInput
    _max?: BlockItemMaxOrderByAggregateInput
    _min?: BlockItemMinOrderByAggregateInput
    _sum?: BlockItemSumOrderByAggregateInput
  }

  export type BlockItemScalarWhereWithAggregatesInput = {
    AND?: BlockItemScalarWhereWithAggregatesInput | BlockItemScalarWhereWithAggregatesInput[]
    OR?: BlockItemScalarWhereWithAggregatesInput[]
    NOT?: BlockItemScalarWhereWithAggregatesInput | BlockItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"BlockItem"> | string
    blockId?: StringWithAggregatesFilter<"BlockItem"> | string
    content?: StringWithAggregatesFilter<"BlockItem"> | string
    position?: IntWithAggregatesFilter<"BlockItem"> | number
  }

  export type AiRequestWhereInput = {
    AND?: AiRequestWhereInput | AiRequestWhereInput[]
    OR?: AiRequestWhereInput[]
    NOT?: AiRequestWhereInput | AiRequestWhereInput[]
    id?: StringFilter<"AiRequest"> | string
    conversationId?: StringFilter<"AiRequest"> | string
    nodeId?: StringNullableFilter<"AiRequest"> | string | null
    userId?: StringFilter<"AiRequest"> | string
    status?: EnumAiRequestStatusFilter<"AiRequest"> | $Enums.AiRequestStatus
    model?: StringFilter<"AiRequest"> | string
    promptTokens?: IntFilter<"AiRequest"> | number
    outputTokens?: IntFilter<"AiRequest"> | number
    durationMs?: IntNullableFilter<"AiRequest"> | number | null
    error?: StringNullableFilter<"AiRequest"> | string | null
    createdAt?: DateTimeFilter<"AiRequest"> | Date | string
    completedAt?: DateTimeNullableFilter<"AiRequest"> | Date | string | null
    conversation?: XOR<ConversationRelationFilter, ConversationWhereInput>
    node?: XOR<NodeNullableRelationFilter, NodeWhereInput> | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }

  export type AiRequestOrderByWithRelationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    nodeId?: SortOrderInput | SortOrder
    userId?: SortOrder
    status?: SortOrder
    model?: SortOrder
    promptTokens?: SortOrder
    outputTokens?: SortOrder
    durationMs?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    conversation?: ConversationOrderByWithRelationInput
    node?: NodeOrderByWithRelationInput
    user?: UserOrderByWithRelationInput
  }

  export type AiRequestWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AiRequestWhereInput | AiRequestWhereInput[]
    OR?: AiRequestWhereInput[]
    NOT?: AiRequestWhereInput | AiRequestWhereInput[]
    conversationId?: StringFilter<"AiRequest"> | string
    nodeId?: StringNullableFilter<"AiRequest"> | string | null
    userId?: StringFilter<"AiRequest"> | string
    status?: EnumAiRequestStatusFilter<"AiRequest"> | $Enums.AiRequestStatus
    model?: StringFilter<"AiRequest"> | string
    promptTokens?: IntFilter<"AiRequest"> | number
    outputTokens?: IntFilter<"AiRequest"> | number
    durationMs?: IntNullableFilter<"AiRequest"> | number | null
    error?: StringNullableFilter<"AiRequest"> | string | null
    createdAt?: DateTimeFilter<"AiRequest"> | Date | string
    completedAt?: DateTimeNullableFilter<"AiRequest"> | Date | string | null
    conversation?: XOR<ConversationRelationFilter, ConversationWhereInput>
    node?: XOR<NodeNullableRelationFilter, NodeWhereInput> | null
    user?: XOR<UserRelationFilter, UserWhereInput>
  }, "id">

  export type AiRequestOrderByWithAggregationInput = {
    id?: SortOrder
    conversationId?: SortOrder
    nodeId?: SortOrderInput | SortOrder
    userId?: SortOrder
    status?: SortOrder
    model?: SortOrder
    promptTokens?: SortOrder
    outputTokens?: SortOrder
    durationMs?: SortOrderInput | SortOrder
    error?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrderInput | SortOrder
    _count?: AiRequestCountOrderByAggregateInput
    _avg?: AiRequestAvgOrderByAggregateInput
    _max?: AiRequestMaxOrderByAggregateInput
    _min?: AiRequestMinOrderByAggregateInput
    _sum?: AiRequestSumOrderByAggregateInput
  }

  export type AiRequestScalarWhereWithAggregatesInput = {
    AND?: AiRequestScalarWhereWithAggregatesInput | AiRequestScalarWhereWithAggregatesInput[]
    OR?: AiRequestScalarWhereWithAggregatesInput[]
    NOT?: AiRequestScalarWhereWithAggregatesInput | AiRequestScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AiRequest"> | string
    conversationId?: StringWithAggregatesFilter<"AiRequest"> | string
    nodeId?: StringNullableWithAggregatesFilter<"AiRequest"> | string | null
    userId?: StringWithAggregatesFilter<"AiRequest"> | string
    status?: EnumAiRequestStatusWithAggregatesFilter<"AiRequest"> | $Enums.AiRequestStatus
    model?: StringWithAggregatesFilter<"AiRequest"> | string
    promptTokens?: IntWithAggregatesFilter<"AiRequest"> | number
    outputTokens?: IntWithAggregatesFilter<"AiRequest"> | number
    durationMs?: IntNullableWithAggregatesFilter<"AiRequest"> | number | null
    error?: StringNullableWithAggregatesFilter<"AiRequest"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AiRequest"> | Date | string
    completedAt?: DateTimeNullableWithAggregatesFilter<"AiRequest"> | Date | string | null
  }

  export type DocumentWhereInput = {
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    id?: StringFilter<"Document"> | string
    workspaceId?: StringNullableFilter<"Document"> | string | null
    conversationId?: StringNullableFilter<"Document"> | string | null
    title?: StringFilter<"Document"> | string
    url?: StringNullableFilter<"Document"> | string | null
    createdAt?: DateTimeFilter<"Document"> | Date | string
    workspace?: XOR<WorkspaceNullableRelationFilter, WorkspaceWhereInput> | null
    conversation?: XOR<ConversationNullableRelationFilter, ConversationWhereInput> | null
    chunks?: DocumentChunkListRelationFilter
  }

  export type DocumentOrderByWithRelationInput = {
    id?: SortOrder
    workspaceId?: SortOrderInput | SortOrder
    conversationId?: SortOrderInput | SortOrder
    title?: SortOrder
    url?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    workspace?: WorkspaceOrderByWithRelationInput
    conversation?: ConversationOrderByWithRelationInput
    chunks?: DocumentChunkOrderByRelationAggregateInput
  }

  export type DocumentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentWhereInput | DocumentWhereInput[]
    OR?: DocumentWhereInput[]
    NOT?: DocumentWhereInput | DocumentWhereInput[]
    workspaceId?: StringNullableFilter<"Document"> | string | null
    conversationId?: StringNullableFilter<"Document"> | string | null
    title?: StringFilter<"Document"> | string
    url?: StringNullableFilter<"Document"> | string | null
    createdAt?: DateTimeFilter<"Document"> | Date | string
    workspace?: XOR<WorkspaceNullableRelationFilter, WorkspaceWhereInput> | null
    conversation?: XOR<ConversationNullableRelationFilter, ConversationWhereInput> | null
    chunks?: DocumentChunkListRelationFilter
  }, "id">

  export type DocumentOrderByWithAggregationInput = {
    id?: SortOrder
    workspaceId?: SortOrderInput | SortOrder
    conversationId?: SortOrderInput | SortOrder
    title?: SortOrder
    url?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: DocumentCountOrderByAggregateInput
    _max?: DocumentMaxOrderByAggregateInput
    _min?: DocumentMinOrderByAggregateInput
  }

  export type DocumentScalarWhereWithAggregatesInput = {
    AND?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    OR?: DocumentScalarWhereWithAggregatesInput[]
    NOT?: DocumentScalarWhereWithAggregatesInput | DocumentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Document"> | string
    workspaceId?: StringNullableWithAggregatesFilter<"Document"> | string | null
    conversationId?: StringNullableWithAggregatesFilter<"Document"> | string | null
    title?: StringWithAggregatesFilter<"Document"> | string
    url?: StringNullableWithAggregatesFilter<"Document"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Document"> | Date | string
  }

  export type DocumentChunkWhereInput = {
    AND?: DocumentChunkWhereInput | DocumentChunkWhereInput[]
    OR?: DocumentChunkWhereInput[]
    NOT?: DocumentChunkWhereInput | DocumentChunkWhereInput[]
    id?: StringFilter<"DocumentChunk"> | string
    documentId?: StringFilter<"DocumentChunk"> | string
    content?: StringFilter<"DocumentChunk"> | string
    embedding?: FloatNullableListFilter<"DocumentChunk">
    position?: IntFilter<"DocumentChunk"> | number
    document?: XOR<DocumentRelationFilter, DocumentWhereInput>
  }

  export type DocumentChunkOrderByWithRelationInput = {
    id?: SortOrder
    documentId?: SortOrder
    content?: SortOrder
    embedding?: SortOrder
    position?: SortOrder
    document?: DocumentOrderByWithRelationInput
  }

  export type DocumentChunkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: DocumentChunkWhereInput | DocumentChunkWhereInput[]
    OR?: DocumentChunkWhereInput[]
    NOT?: DocumentChunkWhereInput | DocumentChunkWhereInput[]
    documentId?: StringFilter<"DocumentChunk"> | string
    content?: StringFilter<"DocumentChunk"> | string
    embedding?: FloatNullableListFilter<"DocumentChunk">
    position?: IntFilter<"DocumentChunk"> | number
    document?: XOR<DocumentRelationFilter, DocumentWhereInput>
  }, "id">

  export type DocumentChunkOrderByWithAggregationInput = {
    id?: SortOrder
    documentId?: SortOrder
    content?: SortOrder
    embedding?: SortOrder
    position?: SortOrder
    _count?: DocumentChunkCountOrderByAggregateInput
    _avg?: DocumentChunkAvgOrderByAggregateInput
    _max?: DocumentChunkMaxOrderByAggregateInput
    _min?: DocumentChunkMinOrderByAggregateInput
    _sum?: DocumentChunkSumOrderByAggregateInput
  }

  export type DocumentChunkScalarWhereWithAggregatesInput = {
    AND?: DocumentChunkScalarWhereWithAggregatesInput | DocumentChunkScalarWhereWithAggregatesInput[]
    OR?: DocumentChunkScalarWhereWithAggregatesInput[]
    NOT?: DocumentChunkScalarWhereWithAggregatesInput | DocumentChunkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DocumentChunk"> | string
    documentId?: StringWithAggregatesFilter<"DocumentChunk"> | string
    content?: StringWithAggregatesFilter<"DocumentChunk"> | string
    embedding?: FloatNullableListFilter<"DocumentChunk">
    position?: IntWithAggregatesFilter<"DocumentChunk"> | number
  }

  export type UserCreateInput = {
    id?: string
    email: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workspaceMembers?: WorkspaceMemberCreateNestedManyWithoutUserInput
    conversations?: ConversationCreateNestedManyWithoutOwnerInput
    nodes?: NodeCreateNestedManyWithoutCreatedByInput
    aiRequests?: AiRequestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workspaceMembers?: WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutOwnerInput
    nodes?: NodeUncheckedCreateNestedManyWithoutCreatedByInput
    aiRequests?: AiRequestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspaceMembers?: WorkspaceMemberUpdateManyWithoutUserNestedInput
    conversations?: ConversationUpdateManyWithoutOwnerNestedInput
    nodes?: NodeUpdateManyWithoutCreatedByNestedInput
    aiRequests?: AiRequestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspaceMembers?: WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutOwnerNestedInput
    nodes?: NodeUncheckedUpdateManyWithoutCreatedByNestedInput
    aiRequests?: AiRequestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceCreateInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: WorkspaceMemberCreateNestedManyWithoutWorkspaceInput
    conversations?: ConversationCreateNestedManyWithoutWorkspaceInput
    documents?: DocumentCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: WorkspaceMemberUncheckedCreateNestedManyWithoutWorkspaceInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutWorkspaceInput
    documents?: DocumentUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: WorkspaceMemberUpdateManyWithoutWorkspaceNestedInput
    conversations?: ConversationUpdateManyWithoutWorkspaceNestedInput
    documents?: DocumentUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutWorkspaceNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceCreateManyInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type WorkspaceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceMemberCreateInput = {
    id?: string
    role?: $Enums.WorkspaceMemberRole
    joinedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutMembersInput
    user: UserCreateNestedOneWithoutWorkspaceMembersInput
  }

  export type WorkspaceMemberUncheckedCreateInput = {
    id?: string
    workspaceId: string
    userId: string
    role?: $Enums.WorkspaceMemberRole
    joinedAt?: Date | string
  }

  export type WorkspaceMemberUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumWorkspaceMemberRoleFieldUpdateOperationsInput | $Enums.WorkspaceMemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutMembersNestedInput
    user?: UserUpdateOneRequiredWithoutWorkspaceMembersNestedInput
  }

  export type WorkspaceMemberUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumWorkspaceMemberRoleFieldUpdateOperationsInput | $Enums.WorkspaceMemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceMemberCreateManyInput = {
    id?: string
    workspaceId: string
    userId: string
    role?: $Enums.WorkspaceMemberRole
    joinedAt?: Date | string
  }

  export type WorkspaceMemberUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumWorkspaceMemberRoleFieldUpdateOperationsInput | $Enums.WorkspaceMemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceMemberUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumWorkspaceMemberRoleFieldUpdateOperationsInput | $Enums.WorkspaceMemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationCreateInput = {
    id?: string
    title: string
    description?: string | null
    isFavorite?: boolean
    tags?: ConversationCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutConversationsInput
    workspace?: WorkspaceCreateNestedOneWithoutConversationsInput
    nodes?: NodeCreateNestedManyWithoutConversationInput
    aiRequests?: AiRequestCreateNestedManyWithoutConversationInput
    documents?: DocumentCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateInput = {
    id?: string
    title: string
    description?: string | null
    ownerId: string
    workspaceId?: string | null
    isFavorite?: boolean
    tags?: ConversationCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    nodes?: NodeUncheckedCreateNestedManyWithoutConversationInput
    aiRequests?: AiRequestUncheckedCreateNestedManyWithoutConversationInput
    documents?: DocumentUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    tags?: ConversationUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutConversationsNestedInput
    workspace?: WorkspaceUpdateOneWithoutConversationsNestedInput
    nodes?: NodeUpdateManyWithoutConversationNestedInput
    aiRequests?: AiRequestUpdateManyWithoutConversationNestedInput
    documents?: DocumentUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    workspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    tags?: ConversationUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nodes?: NodeUncheckedUpdateManyWithoutConversationNestedInput
    aiRequests?: AiRequestUncheckedUpdateManyWithoutConversationNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationCreateManyInput = {
    id?: string
    title: string
    description?: string | null
    ownerId: string
    workspaceId?: string | null
    isFavorite?: boolean
    tags?: ConversationCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ConversationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    tags?: ConversationUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    workspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    tags?: ConversationUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NodeCreateInput = {
    id?: string
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutNodesInput
    parent?: NodeCreateNestedOneWithoutChildrenInput
    children?: NodeCreateNestedManyWithoutParentInput
    parentBlock?: BlockCreateNestedOneWithoutBranchesInput
    createdBy: UserCreateNestedOneWithoutNodesInput
    blocks?: BlockCreateNestedManyWithoutNodeInput
    aiRequests?: AiRequestCreateNestedManyWithoutNodeInput
  }

  export type NodeUncheckedCreateInput = {
    id?: string
    conversationId: string
    parentNodeId?: string | null
    parentBlockId?: string | null
    createdById: string
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: NodeUncheckedCreateNestedManyWithoutParentInput
    blocks?: BlockUncheckedCreateNestedManyWithoutNodeInput
    aiRequests?: AiRequestUncheckedCreateNestedManyWithoutNodeInput
  }

  export type NodeUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutNodesNestedInput
    parent?: NodeUpdateOneWithoutChildrenNestedInput
    children?: NodeUpdateManyWithoutParentNestedInput
    parentBlock?: BlockUpdateOneWithoutBranchesNestedInput
    createdBy?: UserUpdateOneRequiredWithoutNodesNestedInput
    blocks?: BlockUpdateManyWithoutNodeNestedInput
    aiRequests?: AiRequestUpdateManyWithoutNodeNestedInput
  }

  export type NodeUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    parentNodeId?: NullableStringFieldUpdateOperationsInput | string | null
    parentBlockId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: NodeUncheckedUpdateManyWithoutParentNestedInput
    blocks?: BlockUncheckedUpdateManyWithoutNodeNestedInput
    aiRequests?: AiRequestUncheckedUpdateManyWithoutNodeNestedInput
  }

  export type NodeCreateManyInput = {
    id?: string
    conversationId: string
    parentNodeId?: string | null
    parentBlockId?: string | null
    createdById: string
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NodeUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NodeUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    parentNodeId?: NullableStringFieldUpdateOperationsInput | string | null
    parentBlockId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockCreateInput = {
    id?: string
    type: $Enums.BlockType
    content?: string
    position: number
    language?: string | null
    calloutType?: $Enums.CalloutType | null
    createdAt?: Date | string
    node: NodeCreateNestedOneWithoutBlocksInput
    items?: BlockItemCreateNestedManyWithoutBlockInput
    branches?: NodeCreateNestedManyWithoutParentBlockInput
  }

  export type BlockUncheckedCreateInput = {
    id?: string
    nodeId: string
    type: $Enums.BlockType
    content?: string
    position: number
    language?: string | null
    calloutType?: $Enums.CalloutType | null
    createdAt?: Date | string
    items?: BlockItemUncheckedCreateNestedManyWithoutBlockInput
    branches?: NodeUncheckedCreateNestedManyWithoutParentBlockInput
  }

  export type BlockUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumBlockTypeFieldUpdateOperationsInput | $Enums.BlockType
    content?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    calloutType?: NullableEnumCalloutTypeFieldUpdateOperationsInput | $Enums.CalloutType | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    node?: NodeUpdateOneRequiredWithoutBlocksNestedInput
    items?: BlockItemUpdateManyWithoutBlockNestedInput
    branches?: NodeUpdateManyWithoutParentBlockNestedInput
  }

  export type BlockUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    nodeId?: StringFieldUpdateOperationsInput | string
    type?: EnumBlockTypeFieldUpdateOperationsInput | $Enums.BlockType
    content?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    calloutType?: NullableEnumCalloutTypeFieldUpdateOperationsInput | $Enums.CalloutType | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: BlockItemUncheckedUpdateManyWithoutBlockNestedInput
    branches?: NodeUncheckedUpdateManyWithoutParentBlockNestedInput
  }

  export type BlockCreateManyInput = {
    id?: string
    nodeId: string
    type: $Enums.BlockType
    content?: string
    position: number
    language?: string | null
    calloutType?: $Enums.CalloutType | null
    createdAt?: Date | string
  }

  export type BlockUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumBlockTypeFieldUpdateOperationsInput | $Enums.BlockType
    content?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    calloutType?: NullableEnumCalloutTypeFieldUpdateOperationsInput | $Enums.CalloutType | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    nodeId?: StringFieldUpdateOperationsInput | string
    type?: EnumBlockTypeFieldUpdateOperationsInput | $Enums.BlockType
    content?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    calloutType?: NullableEnumCalloutTypeFieldUpdateOperationsInput | $Enums.CalloutType | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockItemCreateInput = {
    id?: string
    content: string
    position: number
    block: BlockCreateNestedOneWithoutItemsInput
  }

  export type BlockItemUncheckedCreateInput = {
    id?: string
    blockId: string
    content: string
    position: number
  }

  export type BlockItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    block?: BlockUpdateOneRequiredWithoutItemsNestedInput
  }

  export type BlockItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    blockId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type BlockItemCreateManyInput = {
    id?: string
    blockId: string
    content: string
    position: number
  }

  export type BlockItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type BlockItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    blockId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type AiRequestCreateInput = {
    id?: string
    status?: $Enums.AiRequestStatus
    model: string
    promptTokens?: number
    outputTokens?: number
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
    conversation: ConversationCreateNestedOneWithoutAiRequestsInput
    node?: NodeCreateNestedOneWithoutAiRequestsInput
    user: UserCreateNestedOneWithoutAiRequestsInput
  }

  export type AiRequestUncheckedCreateInput = {
    id?: string
    conversationId: string
    nodeId?: string | null
    userId: string
    status?: $Enums.AiRequestStatus
    model: string
    promptTokens?: number
    outputTokens?: number
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type AiRequestUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumAiRequestStatusFieldUpdateOperationsInput | $Enums.AiRequestStatus
    model?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    outputTokens?: IntFieldUpdateOperationsInput | number
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conversation?: ConversationUpdateOneRequiredWithoutAiRequestsNestedInput
    node?: NodeUpdateOneWithoutAiRequestsNestedInput
    user?: UserUpdateOneRequiredWithoutAiRequestsNestedInput
  }

  export type AiRequestUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    nodeId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumAiRequestStatusFieldUpdateOperationsInput | $Enums.AiRequestStatus
    model?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    outputTokens?: IntFieldUpdateOperationsInput | number
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AiRequestCreateManyInput = {
    id?: string
    conversationId: string
    nodeId?: string | null
    userId: string
    status?: $Enums.AiRequestStatus
    model: string
    promptTokens?: number
    outputTokens?: number
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type AiRequestUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumAiRequestStatusFieldUpdateOperationsInput | $Enums.AiRequestStatus
    model?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    outputTokens?: IntFieldUpdateOperationsInput | number
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AiRequestUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    nodeId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumAiRequestStatusFieldUpdateOperationsInput | $Enums.AiRequestStatus
    model?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    outputTokens?: IntFieldUpdateOperationsInput | number
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentCreateInput = {
    id?: string
    title: string
    url?: string | null
    createdAt?: Date | string
    workspace?: WorkspaceCreateNestedOneWithoutDocumentsInput
    conversation?: ConversationCreateNestedOneWithoutDocumentsInput
    chunks?: DocumentChunkCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateInput = {
    id?: string
    workspaceId?: string | null
    conversationId?: string | null
    title: string
    url?: string | null
    createdAt?: Date | string
    chunks?: DocumentChunkUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneWithoutDocumentsNestedInput
    conversation?: ConversationUpdateOneWithoutDocumentsNestedInput
    chunks?: DocumentChunkUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunks?: DocumentChunkUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentCreateManyInput = {
    id?: string
    workspaceId?: string | null
    conversationId?: string | null
    title: string
    url?: string | null
    createdAt?: Date | string
  }

  export type DocumentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentChunkCreateInput = {
    id?: string
    content: string
    embedding?: DocumentChunkCreateembeddingInput | number[]
    position?: number
    document: DocumentCreateNestedOneWithoutChunksInput
  }

  export type DocumentChunkUncheckedCreateInput = {
    id?: string
    documentId: string
    content: string
    embedding?: DocumentChunkCreateembeddingInput | number[]
    position?: number
  }

  export type DocumentChunkUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    embedding?: DocumentChunkUpdateembeddingInput | number[]
    position?: IntFieldUpdateOperationsInput | number
    document?: DocumentUpdateOneRequiredWithoutChunksNestedInput
  }

  export type DocumentChunkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    embedding?: DocumentChunkUpdateembeddingInput | number[]
    position?: IntFieldUpdateOperationsInput | number
  }

  export type DocumentChunkCreateManyInput = {
    id?: string
    documentId: string
    content: string
    embedding?: DocumentChunkCreateembeddingInput | number[]
    position?: number
  }

  export type DocumentChunkUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    embedding?: DocumentChunkUpdateembeddingInput | number[]
    position?: IntFieldUpdateOperationsInput | number
  }

  export type DocumentChunkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    documentId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    embedding?: DocumentChunkUpdateembeddingInput | number[]
    position?: IntFieldUpdateOperationsInput | number
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

  export type WorkspaceMemberListRelationFilter = {
    every?: WorkspaceMemberWhereInput
    some?: WorkspaceMemberWhereInput
    none?: WorkspaceMemberWhereInput
  }

  export type ConversationListRelationFilter = {
    every?: ConversationWhereInput
    some?: ConversationWhereInput
    none?: ConversationWhereInput
  }

  export type NodeListRelationFilter = {
    every?: NodeWhereInput
    some?: NodeWhereInput
    none?: NodeWhereInput
  }

  export type AiRequestListRelationFilter = {
    every?: AiRequestWhereInput
    some?: AiRequestWhereInput
    none?: AiRequestWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type WorkspaceMemberOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ConversationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NodeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AiRequestOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    name?: SortOrder
    avatar?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
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

  export type DocumentListRelationFilter = {
    every?: DocumentWhereInput
    some?: DocumentWhereInput
    none?: DocumentWhereInput
  }

  export type DocumentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type WorkspaceCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkspaceMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type WorkspaceMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumWorkspaceMemberRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkspaceMemberRole | EnumWorkspaceMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.WorkspaceMemberRole[] | ListEnumWorkspaceMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkspaceMemberRole[] | ListEnumWorkspaceMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkspaceMemberRoleFilter<$PrismaModel> | $Enums.WorkspaceMemberRole
  }

  export type WorkspaceRelationFilter = {
    is?: WorkspaceWhereInput
    isNot?: WorkspaceWhereInput
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type WorkspaceMemberWorkspaceIdUserIdCompoundUniqueInput = {
    workspaceId: string
    userId: string
  }

  export type WorkspaceMemberCountOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type WorkspaceMemberMaxOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type WorkspaceMemberMinOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    userId?: SortOrder
    role?: SortOrder
    joinedAt?: SortOrder
  }

  export type EnumWorkspaceMemberRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkspaceMemberRole | EnumWorkspaceMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.WorkspaceMemberRole[] | ListEnumWorkspaceMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkspaceMemberRole[] | ListEnumWorkspaceMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkspaceMemberRoleWithAggregatesFilter<$PrismaModel> | $Enums.WorkspaceMemberRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWorkspaceMemberRoleFilter<$PrismaModel>
    _max?: NestedEnumWorkspaceMemberRoleFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type WorkspaceNullableRelationFilter = {
    is?: WorkspaceWhereInput | null
    isNot?: WorkspaceWhereInput | null
  }

  export type ConversationCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    ownerId?: SortOrder
    workspaceId?: SortOrder
    isFavorite?: SortOrder
    tags?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    ownerId?: SortOrder
    workspaceId?: SortOrder
    isFavorite?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ConversationMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    description?: SortOrder
    ownerId?: SortOrder
    workspaceId?: SortOrder
    isFavorite?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumNodeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NodeType | EnumNodeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NodeType[] | ListEnumNodeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NodeType[] | ListEnumNodeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNodeTypeFilter<$PrismaModel> | $Enums.NodeType
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
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

  export type FloatNullableListFilter<$PrismaModel = never> = {
    equals?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    has?: number | FloatFieldRefInput<$PrismaModel> | null
    hasEvery?: number[] | ListFloatFieldRefInput<$PrismaModel>
    hasSome?: number[] | ListFloatFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type ConversationRelationFilter = {
    is?: ConversationWhereInput
    isNot?: ConversationWhereInput
  }

  export type NodeNullableRelationFilter = {
    is?: NodeWhereInput | null
    isNot?: NodeWhereInput | null
  }

  export type BlockNullableRelationFilter = {
    is?: BlockWhereInput | null
    isNot?: BlockWhereInput | null
  }

  export type BlockListRelationFilter = {
    every?: BlockWhereInput
    some?: BlockWhereInput
    none?: BlockWhereInput
  }

  export type BlockOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type NodeCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    parentNodeId?: SortOrder
    parentBlockId?: SortOrder
    createdById?: SortOrder
    type?: SortOrder
    role?: SortOrder
    content?: SortOrder
    depth?: SortOrder
    path?: SortOrder
    position?: SortOrder
    isCollapsed?: SortOrder
    embedding?: SortOrder
    summarySnapshot?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NodeAvgOrderByAggregateInput = {
    depth?: SortOrder
    position?: SortOrder
    embedding?: SortOrder
  }

  export type NodeMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    parentNodeId?: SortOrder
    parentBlockId?: SortOrder
    createdById?: SortOrder
    type?: SortOrder
    role?: SortOrder
    content?: SortOrder
    depth?: SortOrder
    path?: SortOrder
    position?: SortOrder
    isCollapsed?: SortOrder
    summarySnapshot?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NodeMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    parentNodeId?: SortOrder
    parentBlockId?: SortOrder
    createdById?: SortOrder
    type?: SortOrder
    role?: SortOrder
    content?: SortOrder
    depth?: SortOrder
    path?: SortOrder
    position?: SortOrder
    isCollapsed?: SortOrder
    summarySnapshot?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NodeSumOrderByAggregateInput = {
    depth?: SortOrder
    position?: SortOrder
    embedding?: SortOrder
  }

  export type EnumNodeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NodeType | EnumNodeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NodeType[] | ListEnumNodeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NodeType[] | ListEnumNodeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNodeTypeWithAggregatesFilter<$PrismaModel> | $Enums.NodeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNodeTypeFilter<$PrismaModel>
    _max?: NestedEnumNodeTypeFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type EnumBlockTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BlockType | EnumBlockTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BlockType[] | ListEnumBlockTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlockType[] | ListEnumBlockTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBlockTypeFilter<$PrismaModel> | $Enums.BlockType
  }

  export type EnumCalloutTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CalloutType | EnumCalloutTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CalloutType[] | ListEnumCalloutTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CalloutType[] | ListEnumCalloutTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCalloutTypeNullableFilter<$PrismaModel> | $Enums.CalloutType | null
  }

  export type NodeRelationFilter = {
    is?: NodeWhereInput
    isNot?: NodeWhereInput
  }

  export type BlockItemListRelationFilter = {
    every?: BlockItemWhereInput
    some?: BlockItemWhereInput
    none?: BlockItemWhereInput
  }

  export type BlockItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type BlockCountOrderByAggregateInput = {
    id?: SortOrder
    nodeId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    position?: SortOrder
    language?: SortOrder
    calloutType?: SortOrder
    createdAt?: SortOrder
  }

  export type BlockAvgOrderByAggregateInput = {
    position?: SortOrder
  }

  export type BlockMaxOrderByAggregateInput = {
    id?: SortOrder
    nodeId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    position?: SortOrder
    language?: SortOrder
    calloutType?: SortOrder
    createdAt?: SortOrder
  }

  export type BlockMinOrderByAggregateInput = {
    id?: SortOrder
    nodeId?: SortOrder
    type?: SortOrder
    content?: SortOrder
    position?: SortOrder
    language?: SortOrder
    calloutType?: SortOrder
    createdAt?: SortOrder
  }

  export type BlockSumOrderByAggregateInput = {
    position?: SortOrder
  }

  export type EnumBlockTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BlockType | EnumBlockTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BlockType[] | ListEnumBlockTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlockType[] | ListEnumBlockTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBlockTypeWithAggregatesFilter<$PrismaModel> | $Enums.BlockType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBlockTypeFilter<$PrismaModel>
    _max?: NestedEnumBlockTypeFilter<$PrismaModel>
  }

  export type EnumCalloutTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CalloutType | EnumCalloutTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CalloutType[] | ListEnumCalloutTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CalloutType[] | ListEnumCalloutTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCalloutTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.CalloutType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCalloutTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumCalloutTypeNullableFilter<$PrismaModel>
  }

  export type BlockRelationFilter = {
    is?: BlockWhereInput
    isNot?: BlockWhereInput
  }

  export type BlockItemCountOrderByAggregateInput = {
    id?: SortOrder
    blockId?: SortOrder
    content?: SortOrder
    position?: SortOrder
  }

  export type BlockItemAvgOrderByAggregateInput = {
    position?: SortOrder
  }

  export type BlockItemMaxOrderByAggregateInput = {
    id?: SortOrder
    blockId?: SortOrder
    content?: SortOrder
    position?: SortOrder
  }

  export type BlockItemMinOrderByAggregateInput = {
    id?: SortOrder
    blockId?: SortOrder
    content?: SortOrder
    position?: SortOrder
  }

  export type BlockItemSumOrderByAggregateInput = {
    position?: SortOrder
  }

  export type EnumAiRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AiRequestStatus | EnumAiRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AiRequestStatus[] | ListEnumAiRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AiRequestStatus[] | ListEnumAiRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAiRequestStatusFilter<$PrismaModel> | $Enums.AiRequestStatus
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
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

  export type AiRequestCountOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    nodeId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    model?: SortOrder
    promptTokens?: SortOrder
    outputTokens?: SortOrder
    durationMs?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type AiRequestAvgOrderByAggregateInput = {
    promptTokens?: SortOrder
    outputTokens?: SortOrder
    durationMs?: SortOrder
  }

  export type AiRequestMaxOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    nodeId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    model?: SortOrder
    promptTokens?: SortOrder
    outputTokens?: SortOrder
    durationMs?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type AiRequestMinOrderByAggregateInput = {
    id?: SortOrder
    conversationId?: SortOrder
    nodeId?: SortOrder
    userId?: SortOrder
    status?: SortOrder
    model?: SortOrder
    promptTokens?: SortOrder
    outputTokens?: SortOrder
    durationMs?: SortOrder
    error?: SortOrder
    createdAt?: SortOrder
    completedAt?: SortOrder
  }

  export type AiRequestSumOrderByAggregateInput = {
    promptTokens?: SortOrder
    outputTokens?: SortOrder
    durationMs?: SortOrder
  }

  export type EnumAiRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AiRequestStatus | EnumAiRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AiRequestStatus[] | ListEnumAiRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AiRequestStatus[] | ListEnumAiRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAiRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.AiRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAiRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumAiRequestStatusFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
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

  export type ConversationNullableRelationFilter = {
    is?: ConversationWhereInput | null
    isNot?: ConversationWhereInput | null
  }

  export type DocumentChunkListRelationFilter = {
    every?: DocumentChunkWhereInput
    some?: DocumentChunkWhereInput
    none?: DocumentChunkWhereInput
  }

  export type DocumentChunkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type DocumentCountOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    conversationId?: SortOrder
    title?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentMaxOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    conversationId?: SortOrder
    title?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentMinOrderByAggregateInput = {
    id?: SortOrder
    workspaceId?: SortOrder
    conversationId?: SortOrder
    title?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
  }

  export type DocumentRelationFilter = {
    is?: DocumentWhereInput
    isNot?: DocumentWhereInput
  }

  export type DocumentChunkCountOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    content?: SortOrder
    embedding?: SortOrder
    position?: SortOrder
  }

  export type DocumentChunkAvgOrderByAggregateInput = {
    embedding?: SortOrder
    position?: SortOrder
  }

  export type DocumentChunkMaxOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    content?: SortOrder
    position?: SortOrder
  }

  export type DocumentChunkMinOrderByAggregateInput = {
    id?: SortOrder
    documentId?: SortOrder
    content?: SortOrder
    position?: SortOrder
  }

  export type DocumentChunkSumOrderByAggregateInput = {
    embedding?: SortOrder
    position?: SortOrder
  }

  export type WorkspaceMemberCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkspaceMemberCreateWithoutUserInput, WorkspaceMemberUncheckedCreateWithoutUserInput> | WorkspaceMemberCreateWithoutUserInput[] | WorkspaceMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutUserInput | WorkspaceMemberCreateOrConnectWithoutUserInput[]
    createMany?: WorkspaceMemberCreateManyUserInputEnvelope
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
  }

  export type ConversationCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ConversationCreateWithoutOwnerInput, ConversationUncheckedCreateWithoutOwnerInput> | ConversationCreateWithoutOwnerInput[] | ConversationUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutOwnerInput | ConversationCreateOrConnectWithoutOwnerInput[]
    createMany?: ConversationCreateManyOwnerInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type NodeCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<NodeCreateWithoutCreatedByInput, NodeUncheckedCreateWithoutCreatedByInput> | NodeCreateWithoutCreatedByInput[] | NodeUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: NodeCreateOrConnectWithoutCreatedByInput | NodeCreateOrConnectWithoutCreatedByInput[]
    createMany?: NodeCreateManyCreatedByInputEnvelope
    connect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
  }

  export type AiRequestCreateNestedManyWithoutUserInput = {
    create?: XOR<AiRequestCreateWithoutUserInput, AiRequestUncheckedCreateWithoutUserInput> | AiRequestCreateWithoutUserInput[] | AiRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AiRequestCreateOrConnectWithoutUserInput | AiRequestCreateOrConnectWithoutUserInput[]
    createMany?: AiRequestCreateManyUserInputEnvelope
    connect?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
  }

  export type WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<WorkspaceMemberCreateWithoutUserInput, WorkspaceMemberUncheckedCreateWithoutUserInput> | WorkspaceMemberCreateWithoutUserInput[] | WorkspaceMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutUserInput | WorkspaceMemberCreateOrConnectWithoutUserInput[]
    createMany?: WorkspaceMemberCreateManyUserInputEnvelope
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutOwnerInput = {
    create?: XOR<ConversationCreateWithoutOwnerInput, ConversationUncheckedCreateWithoutOwnerInput> | ConversationCreateWithoutOwnerInput[] | ConversationUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutOwnerInput | ConversationCreateOrConnectWithoutOwnerInput[]
    createMany?: ConversationCreateManyOwnerInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type NodeUncheckedCreateNestedManyWithoutCreatedByInput = {
    create?: XOR<NodeCreateWithoutCreatedByInput, NodeUncheckedCreateWithoutCreatedByInput> | NodeCreateWithoutCreatedByInput[] | NodeUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: NodeCreateOrConnectWithoutCreatedByInput | NodeCreateOrConnectWithoutCreatedByInput[]
    createMany?: NodeCreateManyCreatedByInputEnvelope
    connect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
  }

  export type AiRequestUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<AiRequestCreateWithoutUserInput, AiRequestUncheckedCreateWithoutUserInput> | AiRequestCreateWithoutUserInput[] | AiRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AiRequestCreateOrConnectWithoutUserInput | AiRequestCreateOrConnectWithoutUserInput[]
    createMany?: AiRequestCreateManyUserInputEnvelope
    connect?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type WorkspaceMemberUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkspaceMemberCreateWithoutUserInput, WorkspaceMemberUncheckedCreateWithoutUserInput> | WorkspaceMemberCreateWithoutUserInput[] | WorkspaceMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutUserInput | WorkspaceMemberCreateOrConnectWithoutUserInput[]
    upsert?: WorkspaceMemberUpsertWithWhereUniqueWithoutUserInput | WorkspaceMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkspaceMemberCreateManyUserInputEnvelope
    set?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    disconnect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    delete?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    update?: WorkspaceMemberUpdateWithWhereUniqueWithoutUserInput | WorkspaceMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkspaceMemberUpdateManyWithWhereWithoutUserInput | WorkspaceMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkspaceMemberScalarWhereInput | WorkspaceMemberScalarWhereInput[]
  }

  export type ConversationUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ConversationCreateWithoutOwnerInput, ConversationUncheckedCreateWithoutOwnerInput> | ConversationCreateWithoutOwnerInput[] | ConversationUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutOwnerInput | ConversationCreateOrConnectWithoutOwnerInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutOwnerInput | ConversationUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ConversationCreateManyOwnerInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutOwnerInput | ConversationUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutOwnerInput | ConversationUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type NodeUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<NodeCreateWithoutCreatedByInput, NodeUncheckedCreateWithoutCreatedByInput> | NodeCreateWithoutCreatedByInput[] | NodeUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: NodeCreateOrConnectWithoutCreatedByInput | NodeCreateOrConnectWithoutCreatedByInput[]
    upsert?: NodeUpsertWithWhereUniqueWithoutCreatedByInput | NodeUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: NodeCreateManyCreatedByInputEnvelope
    set?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    disconnect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    delete?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    connect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    update?: NodeUpdateWithWhereUniqueWithoutCreatedByInput | NodeUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: NodeUpdateManyWithWhereWithoutCreatedByInput | NodeUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: NodeScalarWhereInput | NodeScalarWhereInput[]
  }

  export type AiRequestUpdateManyWithoutUserNestedInput = {
    create?: XOR<AiRequestCreateWithoutUserInput, AiRequestUncheckedCreateWithoutUserInput> | AiRequestCreateWithoutUserInput[] | AiRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AiRequestCreateOrConnectWithoutUserInput | AiRequestCreateOrConnectWithoutUserInput[]
    upsert?: AiRequestUpsertWithWhereUniqueWithoutUserInput | AiRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AiRequestCreateManyUserInputEnvelope
    set?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    disconnect?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    delete?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    connect?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    update?: AiRequestUpdateWithWhereUniqueWithoutUserInput | AiRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AiRequestUpdateManyWithWhereWithoutUserInput | AiRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AiRequestScalarWhereInput | AiRequestScalarWhereInput[]
  }

  export type WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<WorkspaceMemberCreateWithoutUserInput, WorkspaceMemberUncheckedCreateWithoutUserInput> | WorkspaceMemberCreateWithoutUserInput[] | WorkspaceMemberUncheckedCreateWithoutUserInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutUserInput | WorkspaceMemberCreateOrConnectWithoutUserInput[]
    upsert?: WorkspaceMemberUpsertWithWhereUniqueWithoutUserInput | WorkspaceMemberUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: WorkspaceMemberCreateManyUserInputEnvelope
    set?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    disconnect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    delete?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    update?: WorkspaceMemberUpdateWithWhereUniqueWithoutUserInput | WorkspaceMemberUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: WorkspaceMemberUpdateManyWithWhereWithoutUserInput | WorkspaceMemberUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: WorkspaceMemberScalarWhereInput | WorkspaceMemberScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutOwnerNestedInput = {
    create?: XOR<ConversationCreateWithoutOwnerInput, ConversationUncheckedCreateWithoutOwnerInput> | ConversationCreateWithoutOwnerInput[] | ConversationUncheckedCreateWithoutOwnerInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutOwnerInput | ConversationCreateOrConnectWithoutOwnerInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutOwnerInput | ConversationUpsertWithWhereUniqueWithoutOwnerInput[]
    createMany?: ConversationCreateManyOwnerInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutOwnerInput | ConversationUpdateWithWhereUniqueWithoutOwnerInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutOwnerInput | ConversationUpdateManyWithWhereWithoutOwnerInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type NodeUncheckedUpdateManyWithoutCreatedByNestedInput = {
    create?: XOR<NodeCreateWithoutCreatedByInput, NodeUncheckedCreateWithoutCreatedByInput> | NodeCreateWithoutCreatedByInput[] | NodeUncheckedCreateWithoutCreatedByInput[]
    connectOrCreate?: NodeCreateOrConnectWithoutCreatedByInput | NodeCreateOrConnectWithoutCreatedByInput[]
    upsert?: NodeUpsertWithWhereUniqueWithoutCreatedByInput | NodeUpsertWithWhereUniqueWithoutCreatedByInput[]
    createMany?: NodeCreateManyCreatedByInputEnvelope
    set?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    disconnect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    delete?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    connect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    update?: NodeUpdateWithWhereUniqueWithoutCreatedByInput | NodeUpdateWithWhereUniqueWithoutCreatedByInput[]
    updateMany?: NodeUpdateManyWithWhereWithoutCreatedByInput | NodeUpdateManyWithWhereWithoutCreatedByInput[]
    deleteMany?: NodeScalarWhereInput | NodeScalarWhereInput[]
  }

  export type AiRequestUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<AiRequestCreateWithoutUserInput, AiRequestUncheckedCreateWithoutUserInput> | AiRequestCreateWithoutUserInput[] | AiRequestUncheckedCreateWithoutUserInput[]
    connectOrCreate?: AiRequestCreateOrConnectWithoutUserInput | AiRequestCreateOrConnectWithoutUserInput[]
    upsert?: AiRequestUpsertWithWhereUniqueWithoutUserInput | AiRequestUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: AiRequestCreateManyUserInputEnvelope
    set?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    disconnect?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    delete?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    connect?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    update?: AiRequestUpdateWithWhereUniqueWithoutUserInput | AiRequestUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: AiRequestUpdateManyWithWhereWithoutUserInput | AiRequestUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: AiRequestScalarWhereInput | AiRequestScalarWhereInput[]
  }

  export type WorkspaceMemberCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<WorkspaceMemberCreateWithoutWorkspaceInput, WorkspaceMemberUncheckedCreateWithoutWorkspaceInput> | WorkspaceMemberCreateWithoutWorkspaceInput[] | WorkspaceMemberUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutWorkspaceInput | WorkspaceMemberCreateOrConnectWithoutWorkspaceInput[]
    createMany?: WorkspaceMemberCreateManyWorkspaceInputEnvelope
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
  }

  export type ConversationCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<ConversationCreateWithoutWorkspaceInput, ConversationUncheckedCreateWithoutWorkspaceInput> | ConversationCreateWithoutWorkspaceInput[] | ConversationUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutWorkspaceInput | ConversationCreateOrConnectWithoutWorkspaceInput[]
    createMany?: ConversationCreateManyWorkspaceInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type DocumentCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<DocumentCreateWithoutWorkspaceInput, DocumentUncheckedCreateWithoutWorkspaceInput> | DocumentCreateWithoutWorkspaceInput[] | DocumentUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutWorkspaceInput | DocumentCreateOrConnectWithoutWorkspaceInput[]
    createMany?: DocumentCreateManyWorkspaceInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type WorkspaceMemberUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<WorkspaceMemberCreateWithoutWorkspaceInput, WorkspaceMemberUncheckedCreateWithoutWorkspaceInput> | WorkspaceMemberCreateWithoutWorkspaceInput[] | WorkspaceMemberUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutWorkspaceInput | WorkspaceMemberCreateOrConnectWithoutWorkspaceInput[]
    createMany?: WorkspaceMemberCreateManyWorkspaceInputEnvelope
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
  }

  export type ConversationUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<ConversationCreateWithoutWorkspaceInput, ConversationUncheckedCreateWithoutWorkspaceInput> | ConversationCreateWithoutWorkspaceInput[] | ConversationUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutWorkspaceInput | ConversationCreateOrConnectWithoutWorkspaceInput[]
    createMany?: ConversationCreateManyWorkspaceInputEnvelope
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutWorkspaceInput = {
    create?: XOR<DocumentCreateWithoutWorkspaceInput, DocumentUncheckedCreateWithoutWorkspaceInput> | DocumentCreateWithoutWorkspaceInput[] | DocumentUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutWorkspaceInput | DocumentCreateOrConnectWithoutWorkspaceInput[]
    createMany?: DocumentCreateManyWorkspaceInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type WorkspaceMemberUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<WorkspaceMemberCreateWithoutWorkspaceInput, WorkspaceMemberUncheckedCreateWithoutWorkspaceInput> | WorkspaceMemberCreateWithoutWorkspaceInput[] | WorkspaceMemberUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutWorkspaceInput | WorkspaceMemberCreateOrConnectWithoutWorkspaceInput[]
    upsert?: WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInput | WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: WorkspaceMemberCreateManyWorkspaceInputEnvelope
    set?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    disconnect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    delete?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    update?: WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInput | WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInput | WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: WorkspaceMemberScalarWhereInput | WorkspaceMemberScalarWhereInput[]
  }

  export type ConversationUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<ConversationCreateWithoutWorkspaceInput, ConversationUncheckedCreateWithoutWorkspaceInput> | ConversationCreateWithoutWorkspaceInput[] | ConversationUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutWorkspaceInput | ConversationCreateOrConnectWithoutWorkspaceInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutWorkspaceInput | ConversationUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: ConversationCreateManyWorkspaceInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutWorkspaceInput | ConversationUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutWorkspaceInput | ConversationUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type DocumentUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<DocumentCreateWithoutWorkspaceInput, DocumentUncheckedCreateWithoutWorkspaceInput> | DocumentCreateWithoutWorkspaceInput[] | DocumentUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutWorkspaceInput | DocumentCreateOrConnectWithoutWorkspaceInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutWorkspaceInput | DocumentUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: DocumentCreateManyWorkspaceInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutWorkspaceInput | DocumentUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutWorkspaceInput | DocumentUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<WorkspaceMemberCreateWithoutWorkspaceInput, WorkspaceMemberUncheckedCreateWithoutWorkspaceInput> | WorkspaceMemberCreateWithoutWorkspaceInput[] | WorkspaceMemberUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: WorkspaceMemberCreateOrConnectWithoutWorkspaceInput | WorkspaceMemberCreateOrConnectWithoutWorkspaceInput[]
    upsert?: WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInput | WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: WorkspaceMemberCreateManyWorkspaceInputEnvelope
    set?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    disconnect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    delete?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    connect?: WorkspaceMemberWhereUniqueInput | WorkspaceMemberWhereUniqueInput[]
    update?: WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInput | WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInput | WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: WorkspaceMemberScalarWhereInput | WorkspaceMemberScalarWhereInput[]
  }

  export type ConversationUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<ConversationCreateWithoutWorkspaceInput, ConversationUncheckedCreateWithoutWorkspaceInput> | ConversationCreateWithoutWorkspaceInput[] | ConversationUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: ConversationCreateOrConnectWithoutWorkspaceInput | ConversationCreateOrConnectWithoutWorkspaceInput[]
    upsert?: ConversationUpsertWithWhereUniqueWithoutWorkspaceInput | ConversationUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: ConversationCreateManyWorkspaceInputEnvelope
    set?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    disconnect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    delete?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    connect?: ConversationWhereUniqueInput | ConversationWhereUniqueInput[]
    update?: ConversationUpdateWithWhereUniqueWithoutWorkspaceInput | ConversationUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: ConversationUpdateManyWithWhereWithoutWorkspaceInput | ConversationUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutWorkspaceNestedInput = {
    create?: XOR<DocumentCreateWithoutWorkspaceInput, DocumentUncheckedCreateWithoutWorkspaceInput> | DocumentCreateWithoutWorkspaceInput[] | DocumentUncheckedCreateWithoutWorkspaceInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutWorkspaceInput | DocumentCreateOrConnectWithoutWorkspaceInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutWorkspaceInput | DocumentUpsertWithWhereUniqueWithoutWorkspaceInput[]
    createMany?: DocumentCreateManyWorkspaceInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutWorkspaceInput | DocumentUpdateWithWhereUniqueWithoutWorkspaceInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutWorkspaceInput | DocumentUpdateManyWithWhereWithoutWorkspaceInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type WorkspaceCreateNestedOneWithoutMembersInput = {
    create?: XOR<WorkspaceCreateWithoutMembersInput, WorkspaceUncheckedCreateWithoutMembersInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutMembersInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutWorkspaceMembersInput = {
    create?: XOR<UserCreateWithoutWorkspaceMembersInput, UserUncheckedCreateWithoutWorkspaceMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkspaceMembersInput
    connect?: UserWhereUniqueInput
  }

  export type EnumWorkspaceMemberRoleFieldUpdateOperationsInput = {
    set?: $Enums.WorkspaceMemberRole
  }

  export type WorkspaceUpdateOneRequiredWithoutMembersNestedInput = {
    create?: XOR<WorkspaceCreateWithoutMembersInput, WorkspaceUncheckedCreateWithoutMembersInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutMembersInput
    upsert?: WorkspaceUpsertWithoutMembersInput
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<XOR<WorkspaceUpdateToOneWithWhereWithoutMembersInput, WorkspaceUpdateWithoutMembersInput>, WorkspaceUncheckedUpdateWithoutMembersInput>
  }

  export type UserUpdateOneRequiredWithoutWorkspaceMembersNestedInput = {
    create?: XOR<UserCreateWithoutWorkspaceMembersInput, UserUncheckedCreateWithoutWorkspaceMembersInput>
    connectOrCreate?: UserCreateOrConnectWithoutWorkspaceMembersInput
    upsert?: UserUpsertWithoutWorkspaceMembersInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutWorkspaceMembersInput, UserUpdateWithoutWorkspaceMembersInput>, UserUncheckedUpdateWithoutWorkspaceMembersInput>
  }

  export type ConversationCreatetagsInput = {
    set: string[]
  }

  export type UserCreateNestedOneWithoutConversationsInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    connect?: UserWhereUniqueInput
  }

  export type WorkspaceCreateNestedOneWithoutConversationsInput = {
    create?: XOR<WorkspaceCreateWithoutConversationsInput, WorkspaceUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutConversationsInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type NodeCreateNestedManyWithoutConversationInput = {
    create?: XOR<NodeCreateWithoutConversationInput, NodeUncheckedCreateWithoutConversationInput> | NodeCreateWithoutConversationInput[] | NodeUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: NodeCreateOrConnectWithoutConversationInput | NodeCreateOrConnectWithoutConversationInput[]
    createMany?: NodeCreateManyConversationInputEnvelope
    connect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
  }

  export type AiRequestCreateNestedManyWithoutConversationInput = {
    create?: XOR<AiRequestCreateWithoutConversationInput, AiRequestUncheckedCreateWithoutConversationInput> | AiRequestCreateWithoutConversationInput[] | AiRequestUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: AiRequestCreateOrConnectWithoutConversationInput | AiRequestCreateOrConnectWithoutConversationInput[]
    createMany?: AiRequestCreateManyConversationInputEnvelope
    connect?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
  }

  export type DocumentCreateNestedManyWithoutConversationInput = {
    create?: XOR<DocumentCreateWithoutConversationInput, DocumentUncheckedCreateWithoutConversationInput> | DocumentCreateWithoutConversationInput[] | DocumentUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutConversationInput | DocumentCreateOrConnectWithoutConversationInput[]
    createMany?: DocumentCreateManyConversationInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type NodeUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<NodeCreateWithoutConversationInput, NodeUncheckedCreateWithoutConversationInput> | NodeCreateWithoutConversationInput[] | NodeUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: NodeCreateOrConnectWithoutConversationInput | NodeCreateOrConnectWithoutConversationInput[]
    createMany?: NodeCreateManyConversationInputEnvelope
    connect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
  }

  export type AiRequestUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<AiRequestCreateWithoutConversationInput, AiRequestUncheckedCreateWithoutConversationInput> | AiRequestCreateWithoutConversationInput[] | AiRequestUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: AiRequestCreateOrConnectWithoutConversationInput | AiRequestCreateOrConnectWithoutConversationInput[]
    createMany?: AiRequestCreateManyConversationInputEnvelope
    connect?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
  }

  export type DocumentUncheckedCreateNestedManyWithoutConversationInput = {
    create?: XOR<DocumentCreateWithoutConversationInput, DocumentUncheckedCreateWithoutConversationInput> | DocumentCreateWithoutConversationInput[] | DocumentUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutConversationInput | DocumentCreateOrConnectWithoutConversationInput[]
    createMany?: DocumentCreateManyConversationInputEnvelope
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type ConversationUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserUpdateOneRequiredWithoutConversationsNestedInput = {
    create?: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: UserCreateOrConnectWithoutConversationsInput
    upsert?: UserUpsertWithoutConversationsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutConversationsInput, UserUpdateWithoutConversationsInput>, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type WorkspaceUpdateOneWithoutConversationsNestedInput = {
    create?: XOR<WorkspaceCreateWithoutConversationsInput, WorkspaceUncheckedCreateWithoutConversationsInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutConversationsInput
    upsert?: WorkspaceUpsertWithoutConversationsInput
    disconnect?: WorkspaceWhereInput | boolean
    delete?: WorkspaceWhereInput | boolean
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<XOR<WorkspaceUpdateToOneWithWhereWithoutConversationsInput, WorkspaceUpdateWithoutConversationsInput>, WorkspaceUncheckedUpdateWithoutConversationsInput>
  }

  export type NodeUpdateManyWithoutConversationNestedInput = {
    create?: XOR<NodeCreateWithoutConversationInput, NodeUncheckedCreateWithoutConversationInput> | NodeCreateWithoutConversationInput[] | NodeUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: NodeCreateOrConnectWithoutConversationInput | NodeCreateOrConnectWithoutConversationInput[]
    upsert?: NodeUpsertWithWhereUniqueWithoutConversationInput | NodeUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: NodeCreateManyConversationInputEnvelope
    set?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    disconnect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    delete?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    connect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    update?: NodeUpdateWithWhereUniqueWithoutConversationInput | NodeUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: NodeUpdateManyWithWhereWithoutConversationInput | NodeUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: NodeScalarWhereInput | NodeScalarWhereInput[]
  }

  export type AiRequestUpdateManyWithoutConversationNestedInput = {
    create?: XOR<AiRequestCreateWithoutConversationInput, AiRequestUncheckedCreateWithoutConversationInput> | AiRequestCreateWithoutConversationInput[] | AiRequestUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: AiRequestCreateOrConnectWithoutConversationInput | AiRequestCreateOrConnectWithoutConversationInput[]
    upsert?: AiRequestUpsertWithWhereUniqueWithoutConversationInput | AiRequestUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: AiRequestCreateManyConversationInputEnvelope
    set?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    disconnect?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    delete?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    connect?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    update?: AiRequestUpdateWithWhereUniqueWithoutConversationInput | AiRequestUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: AiRequestUpdateManyWithWhereWithoutConversationInput | AiRequestUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: AiRequestScalarWhereInput | AiRequestScalarWhereInput[]
  }

  export type DocumentUpdateManyWithoutConversationNestedInput = {
    create?: XOR<DocumentCreateWithoutConversationInput, DocumentUncheckedCreateWithoutConversationInput> | DocumentCreateWithoutConversationInput[] | DocumentUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutConversationInput | DocumentCreateOrConnectWithoutConversationInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutConversationInput | DocumentUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: DocumentCreateManyConversationInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutConversationInput | DocumentUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutConversationInput | DocumentUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type NodeUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<NodeCreateWithoutConversationInput, NodeUncheckedCreateWithoutConversationInput> | NodeCreateWithoutConversationInput[] | NodeUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: NodeCreateOrConnectWithoutConversationInput | NodeCreateOrConnectWithoutConversationInput[]
    upsert?: NodeUpsertWithWhereUniqueWithoutConversationInput | NodeUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: NodeCreateManyConversationInputEnvelope
    set?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    disconnect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    delete?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    connect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    update?: NodeUpdateWithWhereUniqueWithoutConversationInput | NodeUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: NodeUpdateManyWithWhereWithoutConversationInput | NodeUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: NodeScalarWhereInput | NodeScalarWhereInput[]
  }

  export type AiRequestUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<AiRequestCreateWithoutConversationInput, AiRequestUncheckedCreateWithoutConversationInput> | AiRequestCreateWithoutConversationInput[] | AiRequestUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: AiRequestCreateOrConnectWithoutConversationInput | AiRequestCreateOrConnectWithoutConversationInput[]
    upsert?: AiRequestUpsertWithWhereUniqueWithoutConversationInput | AiRequestUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: AiRequestCreateManyConversationInputEnvelope
    set?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    disconnect?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    delete?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    connect?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    update?: AiRequestUpdateWithWhereUniqueWithoutConversationInput | AiRequestUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: AiRequestUpdateManyWithWhereWithoutConversationInput | AiRequestUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: AiRequestScalarWhereInput | AiRequestScalarWhereInput[]
  }

  export type DocumentUncheckedUpdateManyWithoutConversationNestedInput = {
    create?: XOR<DocumentCreateWithoutConversationInput, DocumentUncheckedCreateWithoutConversationInput> | DocumentCreateWithoutConversationInput[] | DocumentUncheckedCreateWithoutConversationInput[]
    connectOrCreate?: DocumentCreateOrConnectWithoutConversationInput | DocumentCreateOrConnectWithoutConversationInput[]
    upsert?: DocumentUpsertWithWhereUniqueWithoutConversationInput | DocumentUpsertWithWhereUniqueWithoutConversationInput[]
    createMany?: DocumentCreateManyConversationInputEnvelope
    set?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    disconnect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    delete?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    connect?: DocumentWhereUniqueInput | DocumentWhereUniqueInput[]
    update?: DocumentUpdateWithWhereUniqueWithoutConversationInput | DocumentUpdateWithWhereUniqueWithoutConversationInput[]
    updateMany?: DocumentUpdateManyWithWhereWithoutConversationInput | DocumentUpdateManyWithWhereWithoutConversationInput[]
    deleteMany?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
  }

  export type NodeCreateembeddingInput = {
    set: number[]
  }

  export type ConversationCreateNestedOneWithoutNodesInput = {
    create?: XOR<ConversationCreateWithoutNodesInput, ConversationUncheckedCreateWithoutNodesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutNodesInput
    connect?: ConversationWhereUniqueInput
  }

  export type NodeCreateNestedOneWithoutChildrenInput = {
    create?: XOR<NodeCreateWithoutChildrenInput, NodeUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: NodeCreateOrConnectWithoutChildrenInput
    connect?: NodeWhereUniqueInput
  }

  export type NodeCreateNestedManyWithoutParentInput = {
    create?: XOR<NodeCreateWithoutParentInput, NodeUncheckedCreateWithoutParentInput> | NodeCreateWithoutParentInput[] | NodeUncheckedCreateWithoutParentInput[]
    connectOrCreate?: NodeCreateOrConnectWithoutParentInput | NodeCreateOrConnectWithoutParentInput[]
    createMany?: NodeCreateManyParentInputEnvelope
    connect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
  }

  export type BlockCreateNestedOneWithoutBranchesInput = {
    create?: XOR<BlockCreateWithoutBranchesInput, BlockUncheckedCreateWithoutBranchesInput>
    connectOrCreate?: BlockCreateOrConnectWithoutBranchesInput
    connect?: BlockWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutNodesInput = {
    create?: XOR<UserCreateWithoutNodesInput, UserUncheckedCreateWithoutNodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNodesInput
    connect?: UserWhereUniqueInput
  }

  export type BlockCreateNestedManyWithoutNodeInput = {
    create?: XOR<BlockCreateWithoutNodeInput, BlockUncheckedCreateWithoutNodeInput> | BlockCreateWithoutNodeInput[] | BlockUncheckedCreateWithoutNodeInput[]
    connectOrCreate?: BlockCreateOrConnectWithoutNodeInput | BlockCreateOrConnectWithoutNodeInput[]
    createMany?: BlockCreateManyNodeInputEnvelope
    connect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
  }

  export type AiRequestCreateNestedManyWithoutNodeInput = {
    create?: XOR<AiRequestCreateWithoutNodeInput, AiRequestUncheckedCreateWithoutNodeInput> | AiRequestCreateWithoutNodeInput[] | AiRequestUncheckedCreateWithoutNodeInput[]
    connectOrCreate?: AiRequestCreateOrConnectWithoutNodeInput | AiRequestCreateOrConnectWithoutNodeInput[]
    createMany?: AiRequestCreateManyNodeInputEnvelope
    connect?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
  }

  export type NodeUncheckedCreateNestedManyWithoutParentInput = {
    create?: XOR<NodeCreateWithoutParentInput, NodeUncheckedCreateWithoutParentInput> | NodeCreateWithoutParentInput[] | NodeUncheckedCreateWithoutParentInput[]
    connectOrCreate?: NodeCreateOrConnectWithoutParentInput | NodeCreateOrConnectWithoutParentInput[]
    createMany?: NodeCreateManyParentInputEnvelope
    connect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
  }

  export type BlockUncheckedCreateNestedManyWithoutNodeInput = {
    create?: XOR<BlockCreateWithoutNodeInput, BlockUncheckedCreateWithoutNodeInput> | BlockCreateWithoutNodeInput[] | BlockUncheckedCreateWithoutNodeInput[]
    connectOrCreate?: BlockCreateOrConnectWithoutNodeInput | BlockCreateOrConnectWithoutNodeInput[]
    createMany?: BlockCreateManyNodeInputEnvelope
    connect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
  }

  export type AiRequestUncheckedCreateNestedManyWithoutNodeInput = {
    create?: XOR<AiRequestCreateWithoutNodeInput, AiRequestUncheckedCreateWithoutNodeInput> | AiRequestCreateWithoutNodeInput[] | AiRequestUncheckedCreateWithoutNodeInput[]
    connectOrCreate?: AiRequestCreateOrConnectWithoutNodeInput | AiRequestCreateOrConnectWithoutNodeInput[]
    createMany?: AiRequestCreateManyNodeInputEnvelope
    connect?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
  }

  export type EnumNodeTypeFieldUpdateOperationsInput = {
    set?: $Enums.NodeType
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NodeUpdateembeddingInput = {
    set?: number[]
    push?: number | number[]
  }

  export type ConversationUpdateOneRequiredWithoutNodesNestedInput = {
    create?: XOR<ConversationCreateWithoutNodesInput, ConversationUncheckedCreateWithoutNodesInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutNodesInput
    upsert?: ConversationUpsertWithoutNodesInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutNodesInput, ConversationUpdateWithoutNodesInput>, ConversationUncheckedUpdateWithoutNodesInput>
  }

  export type NodeUpdateOneWithoutChildrenNestedInput = {
    create?: XOR<NodeCreateWithoutChildrenInput, NodeUncheckedCreateWithoutChildrenInput>
    connectOrCreate?: NodeCreateOrConnectWithoutChildrenInput
    upsert?: NodeUpsertWithoutChildrenInput
    disconnect?: NodeWhereInput | boolean
    delete?: NodeWhereInput | boolean
    connect?: NodeWhereUniqueInput
    update?: XOR<XOR<NodeUpdateToOneWithWhereWithoutChildrenInput, NodeUpdateWithoutChildrenInput>, NodeUncheckedUpdateWithoutChildrenInput>
  }

  export type NodeUpdateManyWithoutParentNestedInput = {
    create?: XOR<NodeCreateWithoutParentInput, NodeUncheckedCreateWithoutParentInput> | NodeCreateWithoutParentInput[] | NodeUncheckedCreateWithoutParentInput[]
    connectOrCreate?: NodeCreateOrConnectWithoutParentInput | NodeCreateOrConnectWithoutParentInput[]
    upsert?: NodeUpsertWithWhereUniqueWithoutParentInput | NodeUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: NodeCreateManyParentInputEnvelope
    set?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    disconnect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    delete?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    connect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    update?: NodeUpdateWithWhereUniqueWithoutParentInput | NodeUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: NodeUpdateManyWithWhereWithoutParentInput | NodeUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: NodeScalarWhereInput | NodeScalarWhereInput[]
  }

  export type BlockUpdateOneWithoutBranchesNestedInput = {
    create?: XOR<BlockCreateWithoutBranchesInput, BlockUncheckedCreateWithoutBranchesInput>
    connectOrCreate?: BlockCreateOrConnectWithoutBranchesInput
    upsert?: BlockUpsertWithoutBranchesInput
    disconnect?: BlockWhereInput | boolean
    delete?: BlockWhereInput | boolean
    connect?: BlockWhereUniqueInput
    update?: XOR<XOR<BlockUpdateToOneWithWhereWithoutBranchesInput, BlockUpdateWithoutBranchesInput>, BlockUncheckedUpdateWithoutBranchesInput>
  }

  export type UserUpdateOneRequiredWithoutNodesNestedInput = {
    create?: XOR<UserCreateWithoutNodesInput, UserUncheckedCreateWithoutNodesInput>
    connectOrCreate?: UserCreateOrConnectWithoutNodesInput
    upsert?: UserUpsertWithoutNodesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutNodesInput, UserUpdateWithoutNodesInput>, UserUncheckedUpdateWithoutNodesInput>
  }

  export type BlockUpdateManyWithoutNodeNestedInput = {
    create?: XOR<BlockCreateWithoutNodeInput, BlockUncheckedCreateWithoutNodeInput> | BlockCreateWithoutNodeInput[] | BlockUncheckedCreateWithoutNodeInput[]
    connectOrCreate?: BlockCreateOrConnectWithoutNodeInput | BlockCreateOrConnectWithoutNodeInput[]
    upsert?: BlockUpsertWithWhereUniqueWithoutNodeInput | BlockUpsertWithWhereUniqueWithoutNodeInput[]
    createMany?: BlockCreateManyNodeInputEnvelope
    set?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    disconnect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    delete?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    connect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    update?: BlockUpdateWithWhereUniqueWithoutNodeInput | BlockUpdateWithWhereUniqueWithoutNodeInput[]
    updateMany?: BlockUpdateManyWithWhereWithoutNodeInput | BlockUpdateManyWithWhereWithoutNodeInput[]
    deleteMany?: BlockScalarWhereInput | BlockScalarWhereInput[]
  }

  export type AiRequestUpdateManyWithoutNodeNestedInput = {
    create?: XOR<AiRequestCreateWithoutNodeInput, AiRequestUncheckedCreateWithoutNodeInput> | AiRequestCreateWithoutNodeInput[] | AiRequestUncheckedCreateWithoutNodeInput[]
    connectOrCreate?: AiRequestCreateOrConnectWithoutNodeInput | AiRequestCreateOrConnectWithoutNodeInput[]
    upsert?: AiRequestUpsertWithWhereUniqueWithoutNodeInput | AiRequestUpsertWithWhereUniqueWithoutNodeInput[]
    createMany?: AiRequestCreateManyNodeInputEnvelope
    set?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    disconnect?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    delete?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    connect?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    update?: AiRequestUpdateWithWhereUniqueWithoutNodeInput | AiRequestUpdateWithWhereUniqueWithoutNodeInput[]
    updateMany?: AiRequestUpdateManyWithWhereWithoutNodeInput | AiRequestUpdateManyWithWhereWithoutNodeInput[]
    deleteMany?: AiRequestScalarWhereInput | AiRequestScalarWhereInput[]
  }

  export type NodeUncheckedUpdateManyWithoutParentNestedInput = {
    create?: XOR<NodeCreateWithoutParentInput, NodeUncheckedCreateWithoutParentInput> | NodeCreateWithoutParentInput[] | NodeUncheckedCreateWithoutParentInput[]
    connectOrCreate?: NodeCreateOrConnectWithoutParentInput | NodeCreateOrConnectWithoutParentInput[]
    upsert?: NodeUpsertWithWhereUniqueWithoutParentInput | NodeUpsertWithWhereUniqueWithoutParentInput[]
    createMany?: NodeCreateManyParentInputEnvelope
    set?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    disconnect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    delete?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    connect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    update?: NodeUpdateWithWhereUniqueWithoutParentInput | NodeUpdateWithWhereUniqueWithoutParentInput[]
    updateMany?: NodeUpdateManyWithWhereWithoutParentInput | NodeUpdateManyWithWhereWithoutParentInput[]
    deleteMany?: NodeScalarWhereInput | NodeScalarWhereInput[]
  }

  export type BlockUncheckedUpdateManyWithoutNodeNestedInput = {
    create?: XOR<BlockCreateWithoutNodeInput, BlockUncheckedCreateWithoutNodeInput> | BlockCreateWithoutNodeInput[] | BlockUncheckedCreateWithoutNodeInput[]
    connectOrCreate?: BlockCreateOrConnectWithoutNodeInput | BlockCreateOrConnectWithoutNodeInput[]
    upsert?: BlockUpsertWithWhereUniqueWithoutNodeInput | BlockUpsertWithWhereUniqueWithoutNodeInput[]
    createMany?: BlockCreateManyNodeInputEnvelope
    set?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    disconnect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    delete?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    connect?: BlockWhereUniqueInput | BlockWhereUniqueInput[]
    update?: BlockUpdateWithWhereUniqueWithoutNodeInput | BlockUpdateWithWhereUniqueWithoutNodeInput[]
    updateMany?: BlockUpdateManyWithWhereWithoutNodeInput | BlockUpdateManyWithWhereWithoutNodeInput[]
    deleteMany?: BlockScalarWhereInput | BlockScalarWhereInput[]
  }

  export type AiRequestUncheckedUpdateManyWithoutNodeNestedInput = {
    create?: XOR<AiRequestCreateWithoutNodeInput, AiRequestUncheckedCreateWithoutNodeInput> | AiRequestCreateWithoutNodeInput[] | AiRequestUncheckedCreateWithoutNodeInput[]
    connectOrCreate?: AiRequestCreateOrConnectWithoutNodeInput | AiRequestCreateOrConnectWithoutNodeInput[]
    upsert?: AiRequestUpsertWithWhereUniqueWithoutNodeInput | AiRequestUpsertWithWhereUniqueWithoutNodeInput[]
    createMany?: AiRequestCreateManyNodeInputEnvelope
    set?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    disconnect?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    delete?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    connect?: AiRequestWhereUniqueInput | AiRequestWhereUniqueInput[]
    update?: AiRequestUpdateWithWhereUniqueWithoutNodeInput | AiRequestUpdateWithWhereUniqueWithoutNodeInput[]
    updateMany?: AiRequestUpdateManyWithWhereWithoutNodeInput | AiRequestUpdateManyWithWhereWithoutNodeInput[]
    deleteMany?: AiRequestScalarWhereInput | AiRequestScalarWhereInput[]
  }

  export type NodeCreateNestedOneWithoutBlocksInput = {
    create?: XOR<NodeCreateWithoutBlocksInput, NodeUncheckedCreateWithoutBlocksInput>
    connectOrCreate?: NodeCreateOrConnectWithoutBlocksInput
    connect?: NodeWhereUniqueInput
  }

  export type BlockItemCreateNestedManyWithoutBlockInput = {
    create?: XOR<BlockItemCreateWithoutBlockInput, BlockItemUncheckedCreateWithoutBlockInput> | BlockItemCreateWithoutBlockInput[] | BlockItemUncheckedCreateWithoutBlockInput[]
    connectOrCreate?: BlockItemCreateOrConnectWithoutBlockInput | BlockItemCreateOrConnectWithoutBlockInput[]
    createMany?: BlockItemCreateManyBlockInputEnvelope
    connect?: BlockItemWhereUniqueInput | BlockItemWhereUniqueInput[]
  }

  export type NodeCreateNestedManyWithoutParentBlockInput = {
    create?: XOR<NodeCreateWithoutParentBlockInput, NodeUncheckedCreateWithoutParentBlockInput> | NodeCreateWithoutParentBlockInput[] | NodeUncheckedCreateWithoutParentBlockInput[]
    connectOrCreate?: NodeCreateOrConnectWithoutParentBlockInput | NodeCreateOrConnectWithoutParentBlockInput[]
    createMany?: NodeCreateManyParentBlockInputEnvelope
    connect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
  }

  export type BlockItemUncheckedCreateNestedManyWithoutBlockInput = {
    create?: XOR<BlockItemCreateWithoutBlockInput, BlockItemUncheckedCreateWithoutBlockInput> | BlockItemCreateWithoutBlockInput[] | BlockItemUncheckedCreateWithoutBlockInput[]
    connectOrCreate?: BlockItemCreateOrConnectWithoutBlockInput | BlockItemCreateOrConnectWithoutBlockInput[]
    createMany?: BlockItemCreateManyBlockInputEnvelope
    connect?: BlockItemWhereUniqueInput | BlockItemWhereUniqueInput[]
  }

  export type NodeUncheckedCreateNestedManyWithoutParentBlockInput = {
    create?: XOR<NodeCreateWithoutParentBlockInput, NodeUncheckedCreateWithoutParentBlockInput> | NodeCreateWithoutParentBlockInput[] | NodeUncheckedCreateWithoutParentBlockInput[]
    connectOrCreate?: NodeCreateOrConnectWithoutParentBlockInput | NodeCreateOrConnectWithoutParentBlockInput[]
    createMany?: NodeCreateManyParentBlockInputEnvelope
    connect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
  }

  export type EnumBlockTypeFieldUpdateOperationsInput = {
    set?: $Enums.BlockType
  }

  export type NullableEnumCalloutTypeFieldUpdateOperationsInput = {
    set?: $Enums.CalloutType | null
  }

  export type NodeUpdateOneRequiredWithoutBlocksNestedInput = {
    create?: XOR<NodeCreateWithoutBlocksInput, NodeUncheckedCreateWithoutBlocksInput>
    connectOrCreate?: NodeCreateOrConnectWithoutBlocksInput
    upsert?: NodeUpsertWithoutBlocksInput
    connect?: NodeWhereUniqueInput
    update?: XOR<XOR<NodeUpdateToOneWithWhereWithoutBlocksInput, NodeUpdateWithoutBlocksInput>, NodeUncheckedUpdateWithoutBlocksInput>
  }

  export type BlockItemUpdateManyWithoutBlockNestedInput = {
    create?: XOR<BlockItemCreateWithoutBlockInput, BlockItemUncheckedCreateWithoutBlockInput> | BlockItemCreateWithoutBlockInput[] | BlockItemUncheckedCreateWithoutBlockInput[]
    connectOrCreate?: BlockItemCreateOrConnectWithoutBlockInput | BlockItemCreateOrConnectWithoutBlockInput[]
    upsert?: BlockItemUpsertWithWhereUniqueWithoutBlockInput | BlockItemUpsertWithWhereUniqueWithoutBlockInput[]
    createMany?: BlockItemCreateManyBlockInputEnvelope
    set?: BlockItemWhereUniqueInput | BlockItemWhereUniqueInput[]
    disconnect?: BlockItemWhereUniqueInput | BlockItemWhereUniqueInput[]
    delete?: BlockItemWhereUniqueInput | BlockItemWhereUniqueInput[]
    connect?: BlockItemWhereUniqueInput | BlockItemWhereUniqueInput[]
    update?: BlockItemUpdateWithWhereUniqueWithoutBlockInput | BlockItemUpdateWithWhereUniqueWithoutBlockInput[]
    updateMany?: BlockItemUpdateManyWithWhereWithoutBlockInput | BlockItemUpdateManyWithWhereWithoutBlockInput[]
    deleteMany?: BlockItemScalarWhereInput | BlockItemScalarWhereInput[]
  }

  export type NodeUpdateManyWithoutParentBlockNestedInput = {
    create?: XOR<NodeCreateWithoutParentBlockInput, NodeUncheckedCreateWithoutParentBlockInput> | NodeCreateWithoutParentBlockInput[] | NodeUncheckedCreateWithoutParentBlockInput[]
    connectOrCreate?: NodeCreateOrConnectWithoutParentBlockInput | NodeCreateOrConnectWithoutParentBlockInput[]
    upsert?: NodeUpsertWithWhereUniqueWithoutParentBlockInput | NodeUpsertWithWhereUniqueWithoutParentBlockInput[]
    createMany?: NodeCreateManyParentBlockInputEnvelope
    set?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    disconnect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    delete?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    connect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    update?: NodeUpdateWithWhereUniqueWithoutParentBlockInput | NodeUpdateWithWhereUniqueWithoutParentBlockInput[]
    updateMany?: NodeUpdateManyWithWhereWithoutParentBlockInput | NodeUpdateManyWithWhereWithoutParentBlockInput[]
    deleteMany?: NodeScalarWhereInput | NodeScalarWhereInput[]
  }

  export type BlockItemUncheckedUpdateManyWithoutBlockNestedInput = {
    create?: XOR<BlockItemCreateWithoutBlockInput, BlockItemUncheckedCreateWithoutBlockInput> | BlockItemCreateWithoutBlockInput[] | BlockItemUncheckedCreateWithoutBlockInput[]
    connectOrCreate?: BlockItemCreateOrConnectWithoutBlockInput | BlockItemCreateOrConnectWithoutBlockInput[]
    upsert?: BlockItemUpsertWithWhereUniqueWithoutBlockInput | BlockItemUpsertWithWhereUniqueWithoutBlockInput[]
    createMany?: BlockItemCreateManyBlockInputEnvelope
    set?: BlockItemWhereUniqueInput | BlockItemWhereUniqueInput[]
    disconnect?: BlockItemWhereUniqueInput | BlockItemWhereUniqueInput[]
    delete?: BlockItemWhereUniqueInput | BlockItemWhereUniqueInput[]
    connect?: BlockItemWhereUniqueInput | BlockItemWhereUniqueInput[]
    update?: BlockItemUpdateWithWhereUniqueWithoutBlockInput | BlockItemUpdateWithWhereUniqueWithoutBlockInput[]
    updateMany?: BlockItemUpdateManyWithWhereWithoutBlockInput | BlockItemUpdateManyWithWhereWithoutBlockInput[]
    deleteMany?: BlockItemScalarWhereInput | BlockItemScalarWhereInput[]
  }

  export type NodeUncheckedUpdateManyWithoutParentBlockNestedInput = {
    create?: XOR<NodeCreateWithoutParentBlockInput, NodeUncheckedCreateWithoutParentBlockInput> | NodeCreateWithoutParentBlockInput[] | NodeUncheckedCreateWithoutParentBlockInput[]
    connectOrCreate?: NodeCreateOrConnectWithoutParentBlockInput | NodeCreateOrConnectWithoutParentBlockInput[]
    upsert?: NodeUpsertWithWhereUniqueWithoutParentBlockInput | NodeUpsertWithWhereUniqueWithoutParentBlockInput[]
    createMany?: NodeCreateManyParentBlockInputEnvelope
    set?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    disconnect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    delete?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    connect?: NodeWhereUniqueInput | NodeWhereUniqueInput[]
    update?: NodeUpdateWithWhereUniqueWithoutParentBlockInput | NodeUpdateWithWhereUniqueWithoutParentBlockInput[]
    updateMany?: NodeUpdateManyWithWhereWithoutParentBlockInput | NodeUpdateManyWithWhereWithoutParentBlockInput[]
    deleteMany?: NodeScalarWhereInput | NodeScalarWhereInput[]
  }

  export type BlockCreateNestedOneWithoutItemsInput = {
    create?: XOR<BlockCreateWithoutItemsInput, BlockUncheckedCreateWithoutItemsInput>
    connectOrCreate?: BlockCreateOrConnectWithoutItemsInput
    connect?: BlockWhereUniqueInput
  }

  export type BlockUpdateOneRequiredWithoutItemsNestedInput = {
    create?: XOR<BlockCreateWithoutItemsInput, BlockUncheckedCreateWithoutItemsInput>
    connectOrCreate?: BlockCreateOrConnectWithoutItemsInput
    upsert?: BlockUpsertWithoutItemsInput
    connect?: BlockWhereUniqueInput
    update?: XOR<XOR<BlockUpdateToOneWithWhereWithoutItemsInput, BlockUpdateWithoutItemsInput>, BlockUncheckedUpdateWithoutItemsInput>
  }

  export type ConversationCreateNestedOneWithoutAiRequestsInput = {
    create?: XOR<ConversationCreateWithoutAiRequestsInput, ConversationUncheckedCreateWithoutAiRequestsInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutAiRequestsInput
    connect?: ConversationWhereUniqueInput
  }

  export type NodeCreateNestedOneWithoutAiRequestsInput = {
    create?: XOR<NodeCreateWithoutAiRequestsInput, NodeUncheckedCreateWithoutAiRequestsInput>
    connectOrCreate?: NodeCreateOrConnectWithoutAiRequestsInput
    connect?: NodeWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutAiRequestsInput = {
    create?: XOR<UserCreateWithoutAiRequestsInput, UserUncheckedCreateWithoutAiRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAiRequestsInput
    connect?: UserWhereUniqueInput
  }

  export type EnumAiRequestStatusFieldUpdateOperationsInput = {
    set?: $Enums.AiRequestStatus
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ConversationUpdateOneRequiredWithoutAiRequestsNestedInput = {
    create?: XOR<ConversationCreateWithoutAiRequestsInput, ConversationUncheckedCreateWithoutAiRequestsInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutAiRequestsInput
    upsert?: ConversationUpsertWithoutAiRequestsInput
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutAiRequestsInput, ConversationUpdateWithoutAiRequestsInput>, ConversationUncheckedUpdateWithoutAiRequestsInput>
  }

  export type NodeUpdateOneWithoutAiRequestsNestedInput = {
    create?: XOR<NodeCreateWithoutAiRequestsInput, NodeUncheckedCreateWithoutAiRequestsInput>
    connectOrCreate?: NodeCreateOrConnectWithoutAiRequestsInput
    upsert?: NodeUpsertWithoutAiRequestsInput
    disconnect?: NodeWhereInput | boolean
    delete?: NodeWhereInput | boolean
    connect?: NodeWhereUniqueInput
    update?: XOR<XOR<NodeUpdateToOneWithWhereWithoutAiRequestsInput, NodeUpdateWithoutAiRequestsInput>, NodeUncheckedUpdateWithoutAiRequestsInput>
  }

  export type UserUpdateOneRequiredWithoutAiRequestsNestedInput = {
    create?: XOR<UserCreateWithoutAiRequestsInput, UserUncheckedCreateWithoutAiRequestsInput>
    connectOrCreate?: UserCreateOrConnectWithoutAiRequestsInput
    upsert?: UserUpsertWithoutAiRequestsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutAiRequestsInput, UserUpdateWithoutAiRequestsInput>, UserUncheckedUpdateWithoutAiRequestsInput>
  }

  export type WorkspaceCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<WorkspaceCreateWithoutDocumentsInput, WorkspaceUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutDocumentsInput
    connect?: WorkspaceWhereUniqueInput
  }

  export type ConversationCreateNestedOneWithoutDocumentsInput = {
    create?: XOR<ConversationCreateWithoutDocumentsInput, ConversationUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutDocumentsInput
    connect?: ConversationWhereUniqueInput
  }

  export type DocumentChunkCreateNestedManyWithoutDocumentInput = {
    create?: XOR<DocumentChunkCreateWithoutDocumentInput, DocumentChunkUncheckedCreateWithoutDocumentInput> | DocumentChunkCreateWithoutDocumentInput[] | DocumentChunkUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentChunkCreateOrConnectWithoutDocumentInput | DocumentChunkCreateOrConnectWithoutDocumentInput[]
    createMany?: DocumentChunkCreateManyDocumentInputEnvelope
    connect?: DocumentChunkWhereUniqueInput | DocumentChunkWhereUniqueInput[]
  }

  export type DocumentChunkUncheckedCreateNestedManyWithoutDocumentInput = {
    create?: XOR<DocumentChunkCreateWithoutDocumentInput, DocumentChunkUncheckedCreateWithoutDocumentInput> | DocumentChunkCreateWithoutDocumentInput[] | DocumentChunkUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentChunkCreateOrConnectWithoutDocumentInput | DocumentChunkCreateOrConnectWithoutDocumentInput[]
    createMany?: DocumentChunkCreateManyDocumentInputEnvelope
    connect?: DocumentChunkWhereUniqueInput | DocumentChunkWhereUniqueInput[]
  }

  export type WorkspaceUpdateOneWithoutDocumentsNestedInput = {
    create?: XOR<WorkspaceCreateWithoutDocumentsInput, WorkspaceUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: WorkspaceCreateOrConnectWithoutDocumentsInput
    upsert?: WorkspaceUpsertWithoutDocumentsInput
    disconnect?: WorkspaceWhereInput | boolean
    delete?: WorkspaceWhereInput | boolean
    connect?: WorkspaceWhereUniqueInput
    update?: XOR<XOR<WorkspaceUpdateToOneWithWhereWithoutDocumentsInput, WorkspaceUpdateWithoutDocumentsInput>, WorkspaceUncheckedUpdateWithoutDocumentsInput>
  }

  export type ConversationUpdateOneWithoutDocumentsNestedInput = {
    create?: XOR<ConversationCreateWithoutDocumentsInput, ConversationUncheckedCreateWithoutDocumentsInput>
    connectOrCreate?: ConversationCreateOrConnectWithoutDocumentsInput
    upsert?: ConversationUpsertWithoutDocumentsInput
    disconnect?: ConversationWhereInput | boolean
    delete?: ConversationWhereInput | boolean
    connect?: ConversationWhereUniqueInput
    update?: XOR<XOR<ConversationUpdateToOneWithWhereWithoutDocumentsInput, ConversationUpdateWithoutDocumentsInput>, ConversationUncheckedUpdateWithoutDocumentsInput>
  }

  export type DocumentChunkUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<DocumentChunkCreateWithoutDocumentInput, DocumentChunkUncheckedCreateWithoutDocumentInput> | DocumentChunkCreateWithoutDocumentInput[] | DocumentChunkUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentChunkCreateOrConnectWithoutDocumentInput | DocumentChunkCreateOrConnectWithoutDocumentInput[]
    upsert?: DocumentChunkUpsertWithWhereUniqueWithoutDocumentInput | DocumentChunkUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: DocumentChunkCreateManyDocumentInputEnvelope
    set?: DocumentChunkWhereUniqueInput | DocumentChunkWhereUniqueInput[]
    disconnect?: DocumentChunkWhereUniqueInput | DocumentChunkWhereUniqueInput[]
    delete?: DocumentChunkWhereUniqueInput | DocumentChunkWhereUniqueInput[]
    connect?: DocumentChunkWhereUniqueInput | DocumentChunkWhereUniqueInput[]
    update?: DocumentChunkUpdateWithWhereUniqueWithoutDocumentInput | DocumentChunkUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DocumentChunkUpdateManyWithWhereWithoutDocumentInput | DocumentChunkUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DocumentChunkScalarWhereInput | DocumentChunkScalarWhereInput[]
  }

  export type DocumentChunkUncheckedUpdateManyWithoutDocumentNestedInput = {
    create?: XOR<DocumentChunkCreateWithoutDocumentInput, DocumentChunkUncheckedCreateWithoutDocumentInput> | DocumentChunkCreateWithoutDocumentInput[] | DocumentChunkUncheckedCreateWithoutDocumentInput[]
    connectOrCreate?: DocumentChunkCreateOrConnectWithoutDocumentInput | DocumentChunkCreateOrConnectWithoutDocumentInput[]
    upsert?: DocumentChunkUpsertWithWhereUniqueWithoutDocumentInput | DocumentChunkUpsertWithWhereUniqueWithoutDocumentInput[]
    createMany?: DocumentChunkCreateManyDocumentInputEnvelope
    set?: DocumentChunkWhereUniqueInput | DocumentChunkWhereUniqueInput[]
    disconnect?: DocumentChunkWhereUniqueInput | DocumentChunkWhereUniqueInput[]
    delete?: DocumentChunkWhereUniqueInput | DocumentChunkWhereUniqueInput[]
    connect?: DocumentChunkWhereUniqueInput | DocumentChunkWhereUniqueInput[]
    update?: DocumentChunkUpdateWithWhereUniqueWithoutDocumentInput | DocumentChunkUpdateWithWhereUniqueWithoutDocumentInput[]
    updateMany?: DocumentChunkUpdateManyWithWhereWithoutDocumentInput | DocumentChunkUpdateManyWithWhereWithoutDocumentInput[]
    deleteMany?: DocumentChunkScalarWhereInput | DocumentChunkScalarWhereInput[]
  }

  export type DocumentChunkCreateembeddingInput = {
    set: number[]
  }

  export type DocumentCreateNestedOneWithoutChunksInput = {
    create?: XOR<DocumentCreateWithoutChunksInput, DocumentUncheckedCreateWithoutChunksInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutChunksInput
    connect?: DocumentWhereUniqueInput
  }

  export type DocumentChunkUpdateembeddingInput = {
    set?: number[]
    push?: number | number[]
  }

  export type DocumentUpdateOneRequiredWithoutChunksNestedInput = {
    create?: XOR<DocumentCreateWithoutChunksInput, DocumentUncheckedCreateWithoutChunksInput>
    connectOrCreate?: DocumentCreateOrConnectWithoutChunksInput
    upsert?: DocumentUpsertWithoutChunksInput
    connect?: DocumentWhereUniqueInput
    update?: XOR<XOR<DocumentUpdateToOneWithWhereWithoutChunksInput, DocumentUpdateWithoutChunksInput>, DocumentUncheckedUpdateWithoutChunksInput>
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

  export type NestedEnumWorkspaceMemberRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkspaceMemberRole | EnumWorkspaceMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.WorkspaceMemberRole[] | ListEnumWorkspaceMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkspaceMemberRole[] | ListEnumWorkspaceMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkspaceMemberRoleFilter<$PrismaModel> | $Enums.WorkspaceMemberRole
  }

  export type NestedEnumWorkspaceMemberRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.WorkspaceMemberRole | EnumWorkspaceMemberRoleFieldRefInput<$PrismaModel>
    in?: $Enums.WorkspaceMemberRole[] | ListEnumWorkspaceMemberRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.WorkspaceMemberRole[] | ListEnumWorkspaceMemberRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumWorkspaceMemberRoleWithAggregatesFilter<$PrismaModel> | $Enums.WorkspaceMemberRole
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumWorkspaceMemberRoleFilter<$PrismaModel>
    _max?: NestedEnumWorkspaceMemberRoleFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumNodeTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.NodeType | EnumNodeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NodeType[] | ListEnumNodeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NodeType[] | ListEnumNodeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNodeTypeFilter<$PrismaModel> | $Enums.NodeType
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedEnumNodeTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.NodeType | EnumNodeTypeFieldRefInput<$PrismaModel>
    in?: $Enums.NodeType[] | ListEnumNodeTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.NodeType[] | ListEnumNodeTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumNodeTypeWithAggregatesFilter<$PrismaModel> | $Enums.NodeType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumNodeTypeFilter<$PrismaModel>
    _max?: NestedEnumNodeTypeFilter<$PrismaModel>
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
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

  export type NestedEnumBlockTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.BlockType | EnumBlockTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BlockType[] | ListEnumBlockTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlockType[] | ListEnumBlockTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBlockTypeFilter<$PrismaModel> | $Enums.BlockType
  }

  export type NestedEnumCalloutTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.CalloutType | EnumCalloutTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CalloutType[] | ListEnumCalloutTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CalloutType[] | ListEnumCalloutTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCalloutTypeNullableFilter<$PrismaModel> | $Enums.CalloutType | null
  }

  export type NestedEnumBlockTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BlockType | EnumBlockTypeFieldRefInput<$PrismaModel>
    in?: $Enums.BlockType[] | ListEnumBlockTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.BlockType[] | ListEnumBlockTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumBlockTypeWithAggregatesFilter<$PrismaModel> | $Enums.BlockType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumBlockTypeFilter<$PrismaModel>
    _max?: NestedEnumBlockTypeFilter<$PrismaModel>
  }

  export type NestedEnumCalloutTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CalloutType | EnumCalloutTypeFieldRefInput<$PrismaModel> | null
    in?: $Enums.CalloutType[] | ListEnumCalloutTypeFieldRefInput<$PrismaModel> | null
    notIn?: $Enums.CalloutType[] | ListEnumCalloutTypeFieldRefInput<$PrismaModel> | null
    not?: NestedEnumCalloutTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.CalloutType | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumCalloutTypeNullableFilter<$PrismaModel>
    _max?: NestedEnumCalloutTypeNullableFilter<$PrismaModel>
  }

  export type NestedEnumAiRequestStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AiRequestStatus | EnumAiRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AiRequestStatus[] | ListEnumAiRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AiRequestStatus[] | ListEnumAiRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAiRequestStatusFilter<$PrismaModel> | $Enums.AiRequestStatus
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

  export type NestedEnumAiRequestStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AiRequestStatus | EnumAiRequestStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AiRequestStatus[] | ListEnumAiRequestStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.AiRequestStatus[] | ListEnumAiRequestStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumAiRequestStatusWithAggregatesFilter<$PrismaModel> | $Enums.AiRequestStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAiRequestStatusFilter<$PrismaModel>
    _max?: NestedEnumAiRequestStatusFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
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

  export type WorkspaceMemberCreateWithoutUserInput = {
    id?: string
    role?: $Enums.WorkspaceMemberRole
    joinedAt?: Date | string
    workspace: WorkspaceCreateNestedOneWithoutMembersInput
  }

  export type WorkspaceMemberUncheckedCreateWithoutUserInput = {
    id?: string
    workspaceId: string
    role?: $Enums.WorkspaceMemberRole
    joinedAt?: Date | string
  }

  export type WorkspaceMemberCreateOrConnectWithoutUserInput = {
    where: WorkspaceMemberWhereUniqueInput
    create: XOR<WorkspaceMemberCreateWithoutUserInput, WorkspaceMemberUncheckedCreateWithoutUserInput>
  }

  export type WorkspaceMemberCreateManyUserInputEnvelope = {
    data: WorkspaceMemberCreateManyUserInput | WorkspaceMemberCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ConversationCreateWithoutOwnerInput = {
    id?: string
    title: string
    description?: string | null
    isFavorite?: boolean
    tags?: ConversationCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    workspace?: WorkspaceCreateNestedOneWithoutConversationsInput
    nodes?: NodeCreateNestedManyWithoutConversationInput
    aiRequests?: AiRequestCreateNestedManyWithoutConversationInput
    documents?: DocumentCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutOwnerInput = {
    id?: string
    title: string
    description?: string | null
    workspaceId?: string | null
    isFavorite?: boolean
    tags?: ConversationCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    nodes?: NodeUncheckedCreateNestedManyWithoutConversationInput
    aiRequests?: AiRequestUncheckedCreateNestedManyWithoutConversationInput
    documents?: DocumentUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutOwnerInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutOwnerInput, ConversationUncheckedCreateWithoutOwnerInput>
  }

  export type ConversationCreateManyOwnerInputEnvelope = {
    data: ConversationCreateManyOwnerInput | ConversationCreateManyOwnerInput[]
    skipDuplicates?: boolean
  }

  export type NodeCreateWithoutCreatedByInput = {
    id?: string
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutNodesInput
    parent?: NodeCreateNestedOneWithoutChildrenInput
    children?: NodeCreateNestedManyWithoutParentInput
    parentBlock?: BlockCreateNestedOneWithoutBranchesInput
    blocks?: BlockCreateNestedManyWithoutNodeInput
    aiRequests?: AiRequestCreateNestedManyWithoutNodeInput
  }

  export type NodeUncheckedCreateWithoutCreatedByInput = {
    id?: string
    conversationId: string
    parentNodeId?: string | null
    parentBlockId?: string | null
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: NodeUncheckedCreateNestedManyWithoutParentInput
    blocks?: BlockUncheckedCreateNestedManyWithoutNodeInput
    aiRequests?: AiRequestUncheckedCreateNestedManyWithoutNodeInput
  }

  export type NodeCreateOrConnectWithoutCreatedByInput = {
    where: NodeWhereUniqueInput
    create: XOR<NodeCreateWithoutCreatedByInput, NodeUncheckedCreateWithoutCreatedByInput>
  }

  export type NodeCreateManyCreatedByInputEnvelope = {
    data: NodeCreateManyCreatedByInput | NodeCreateManyCreatedByInput[]
    skipDuplicates?: boolean
  }

  export type AiRequestCreateWithoutUserInput = {
    id?: string
    status?: $Enums.AiRequestStatus
    model: string
    promptTokens?: number
    outputTokens?: number
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
    conversation: ConversationCreateNestedOneWithoutAiRequestsInput
    node?: NodeCreateNestedOneWithoutAiRequestsInput
  }

  export type AiRequestUncheckedCreateWithoutUserInput = {
    id?: string
    conversationId: string
    nodeId?: string | null
    status?: $Enums.AiRequestStatus
    model: string
    promptTokens?: number
    outputTokens?: number
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type AiRequestCreateOrConnectWithoutUserInput = {
    where: AiRequestWhereUniqueInput
    create: XOR<AiRequestCreateWithoutUserInput, AiRequestUncheckedCreateWithoutUserInput>
  }

  export type AiRequestCreateManyUserInputEnvelope = {
    data: AiRequestCreateManyUserInput | AiRequestCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type WorkspaceMemberUpsertWithWhereUniqueWithoutUserInput = {
    where: WorkspaceMemberWhereUniqueInput
    update: XOR<WorkspaceMemberUpdateWithoutUserInput, WorkspaceMemberUncheckedUpdateWithoutUserInput>
    create: XOR<WorkspaceMemberCreateWithoutUserInput, WorkspaceMemberUncheckedCreateWithoutUserInput>
  }

  export type WorkspaceMemberUpdateWithWhereUniqueWithoutUserInput = {
    where: WorkspaceMemberWhereUniqueInput
    data: XOR<WorkspaceMemberUpdateWithoutUserInput, WorkspaceMemberUncheckedUpdateWithoutUserInput>
  }

  export type WorkspaceMemberUpdateManyWithWhereWithoutUserInput = {
    where: WorkspaceMemberScalarWhereInput
    data: XOR<WorkspaceMemberUpdateManyMutationInput, WorkspaceMemberUncheckedUpdateManyWithoutUserInput>
  }

  export type WorkspaceMemberScalarWhereInput = {
    AND?: WorkspaceMemberScalarWhereInput | WorkspaceMemberScalarWhereInput[]
    OR?: WorkspaceMemberScalarWhereInput[]
    NOT?: WorkspaceMemberScalarWhereInput | WorkspaceMemberScalarWhereInput[]
    id?: StringFilter<"WorkspaceMember"> | string
    workspaceId?: StringFilter<"WorkspaceMember"> | string
    userId?: StringFilter<"WorkspaceMember"> | string
    role?: EnumWorkspaceMemberRoleFilter<"WorkspaceMember"> | $Enums.WorkspaceMemberRole
    joinedAt?: DateTimeFilter<"WorkspaceMember"> | Date | string
  }

  export type ConversationUpsertWithWhereUniqueWithoutOwnerInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutOwnerInput, ConversationUncheckedUpdateWithoutOwnerInput>
    create: XOR<ConversationCreateWithoutOwnerInput, ConversationUncheckedCreateWithoutOwnerInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutOwnerInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutOwnerInput, ConversationUncheckedUpdateWithoutOwnerInput>
  }

  export type ConversationUpdateManyWithWhereWithoutOwnerInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutOwnerInput>
  }

  export type ConversationScalarWhereInput = {
    AND?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    OR?: ConversationScalarWhereInput[]
    NOT?: ConversationScalarWhereInput | ConversationScalarWhereInput[]
    id?: StringFilter<"Conversation"> | string
    title?: StringFilter<"Conversation"> | string
    description?: StringNullableFilter<"Conversation"> | string | null
    ownerId?: StringFilter<"Conversation"> | string
    workspaceId?: StringNullableFilter<"Conversation"> | string | null
    isFavorite?: BoolFilter<"Conversation"> | boolean
    tags?: StringNullableListFilter<"Conversation">
    createdAt?: DateTimeFilter<"Conversation"> | Date | string
    updatedAt?: DateTimeFilter<"Conversation"> | Date | string
  }

  export type NodeUpsertWithWhereUniqueWithoutCreatedByInput = {
    where: NodeWhereUniqueInput
    update: XOR<NodeUpdateWithoutCreatedByInput, NodeUncheckedUpdateWithoutCreatedByInput>
    create: XOR<NodeCreateWithoutCreatedByInput, NodeUncheckedCreateWithoutCreatedByInput>
  }

  export type NodeUpdateWithWhereUniqueWithoutCreatedByInput = {
    where: NodeWhereUniqueInput
    data: XOR<NodeUpdateWithoutCreatedByInput, NodeUncheckedUpdateWithoutCreatedByInput>
  }

  export type NodeUpdateManyWithWhereWithoutCreatedByInput = {
    where: NodeScalarWhereInput
    data: XOR<NodeUpdateManyMutationInput, NodeUncheckedUpdateManyWithoutCreatedByInput>
  }

  export type NodeScalarWhereInput = {
    AND?: NodeScalarWhereInput | NodeScalarWhereInput[]
    OR?: NodeScalarWhereInput[]
    NOT?: NodeScalarWhereInput | NodeScalarWhereInput[]
    id?: StringFilter<"Node"> | string
    conversationId?: StringFilter<"Node"> | string
    parentNodeId?: StringNullableFilter<"Node"> | string | null
    parentBlockId?: StringNullableFilter<"Node"> | string | null
    createdById?: StringFilter<"Node"> | string
    type?: EnumNodeTypeFilter<"Node"> | $Enums.NodeType
    role?: EnumRoleFilter<"Node"> | $Enums.Role
    content?: StringNullableFilter<"Node"> | string | null
    depth?: IntFilter<"Node"> | number
    path?: StringFilter<"Node"> | string
    position?: IntFilter<"Node"> | number
    isCollapsed?: BoolFilter<"Node"> | boolean
    embedding?: FloatNullableListFilter<"Node">
    summarySnapshot?: StringNullableFilter<"Node"> | string | null
    createdAt?: DateTimeFilter<"Node"> | Date | string
    updatedAt?: DateTimeFilter<"Node"> | Date | string
  }

  export type AiRequestUpsertWithWhereUniqueWithoutUserInput = {
    where: AiRequestWhereUniqueInput
    update: XOR<AiRequestUpdateWithoutUserInput, AiRequestUncheckedUpdateWithoutUserInput>
    create: XOR<AiRequestCreateWithoutUserInput, AiRequestUncheckedCreateWithoutUserInput>
  }

  export type AiRequestUpdateWithWhereUniqueWithoutUserInput = {
    where: AiRequestWhereUniqueInput
    data: XOR<AiRequestUpdateWithoutUserInput, AiRequestUncheckedUpdateWithoutUserInput>
  }

  export type AiRequestUpdateManyWithWhereWithoutUserInput = {
    where: AiRequestScalarWhereInput
    data: XOR<AiRequestUpdateManyMutationInput, AiRequestUncheckedUpdateManyWithoutUserInput>
  }

  export type AiRequestScalarWhereInput = {
    AND?: AiRequestScalarWhereInput | AiRequestScalarWhereInput[]
    OR?: AiRequestScalarWhereInput[]
    NOT?: AiRequestScalarWhereInput | AiRequestScalarWhereInput[]
    id?: StringFilter<"AiRequest"> | string
    conversationId?: StringFilter<"AiRequest"> | string
    nodeId?: StringNullableFilter<"AiRequest"> | string | null
    userId?: StringFilter<"AiRequest"> | string
    status?: EnumAiRequestStatusFilter<"AiRequest"> | $Enums.AiRequestStatus
    model?: StringFilter<"AiRequest"> | string
    promptTokens?: IntFilter<"AiRequest"> | number
    outputTokens?: IntFilter<"AiRequest"> | number
    durationMs?: IntNullableFilter<"AiRequest"> | number | null
    error?: StringNullableFilter<"AiRequest"> | string | null
    createdAt?: DateTimeFilter<"AiRequest"> | Date | string
    completedAt?: DateTimeNullableFilter<"AiRequest"> | Date | string | null
  }

  export type WorkspaceMemberCreateWithoutWorkspaceInput = {
    id?: string
    role?: $Enums.WorkspaceMemberRole
    joinedAt?: Date | string
    user: UserCreateNestedOneWithoutWorkspaceMembersInput
  }

  export type WorkspaceMemberUncheckedCreateWithoutWorkspaceInput = {
    id?: string
    userId: string
    role?: $Enums.WorkspaceMemberRole
    joinedAt?: Date | string
  }

  export type WorkspaceMemberCreateOrConnectWithoutWorkspaceInput = {
    where: WorkspaceMemberWhereUniqueInput
    create: XOR<WorkspaceMemberCreateWithoutWorkspaceInput, WorkspaceMemberUncheckedCreateWithoutWorkspaceInput>
  }

  export type WorkspaceMemberCreateManyWorkspaceInputEnvelope = {
    data: WorkspaceMemberCreateManyWorkspaceInput | WorkspaceMemberCreateManyWorkspaceInput[]
    skipDuplicates?: boolean
  }

  export type ConversationCreateWithoutWorkspaceInput = {
    id?: string
    title: string
    description?: string | null
    isFavorite?: boolean
    tags?: ConversationCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutConversationsInput
    nodes?: NodeCreateNestedManyWithoutConversationInput
    aiRequests?: AiRequestCreateNestedManyWithoutConversationInput
    documents?: DocumentCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutWorkspaceInput = {
    id?: string
    title: string
    description?: string | null
    ownerId: string
    isFavorite?: boolean
    tags?: ConversationCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    nodes?: NodeUncheckedCreateNestedManyWithoutConversationInput
    aiRequests?: AiRequestUncheckedCreateNestedManyWithoutConversationInput
    documents?: DocumentUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutWorkspaceInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutWorkspaceInput, ConversationUncheckedCreateWithoutWorkspaceInput>
  }

  export type ConversationCreateManyWorkspaceInputEnvelope = {
    data: ConversationCreateManyWorkspaceInput | ConversationCreateManyWorkspaceInput[]
    skipDuplicates?: boolean
  }

  export type DocumentCreateWithoutWorkspaceInput = {
    id?: string
    title: string
    url?: string | null
    createdAt?: Date | string
    conversation?: ConversationCreateNestedOneWithoutDocumentsInput
    chunks?: DocumentChunkCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutWorkspaceInput = {
    id?: string
    conversationId?: string | null
    title: string
    url?: string | null
    createdAt?: Date | string
    chunks?: DocumentChunkUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutWorkspaceInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutWorkspaceInput, DocumentUncheckedCreateWithoutWorkspaceInput>
  }

  export type DocumentCreateManyWorkspaceInputEnvelope = {
    data: DocumentCreateManyWorkspaceInput | DocumentCreateManyWorkspaceInput[]
    skipDuplicates?: boolean
  }

  export type WorkspaceMemberUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: WorkspaceMemberWhereUniqueInput
    update: XOR<WorkspaceMemberUpdateWithoutWorkspaceInput, WorkspaceMemberUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<WorkspaceMemberCreateWithoutWorkspaceInput, WorkspaceMemberUncheckedCreateWithoutWorkspaceInput>
  }

  export type WorkspaceMemberUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: WorkspaceMemberWhereUniqueInput
    data: XOR<WorkspaceMemberUpdateWithoutWorkspaceInput, WorkspaceMemberUncheckedUpdateWithoutWorkspaceInput>
  }

  export type WorkspaceMemberUpdateManyWithWhereWithoutWorkspaceInput = {
    where: WorkspaceMemberScalarWhereInput
    data: XOR<WorkspaceMemberUpdateManyMutationInput, WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceInput>
  }

  export type ConversationUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: ConversationWhereUniqueInput
    update: XOR<ConversationUpdateWithoutWorkspaceInput, ConversationUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<ConversationCreateWithoutWorkspaceInput, ConversationUncheckedCreateWithoutWorkspaceInput>
  }

  export type ConversationUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: ConversationWhereUniqueInput
    data: XOR<ConversationUpdateWithoutWorkspaceInput, ConversationUncheckedUpdateWithoutWorkspaceInput>
  }

  export type ConversationUpdateManyWithWhereWithoutWorkspaceInput = {
    where: ConversationScalarWhereInput
    data: XOR<ConversationUpdateManyMutationInput, ConversationUncheckedUpdateManyWithoutWorkspaceInput>
  }

  export type DocumentUpsertWithWhereUniqueWithoutWorkspaceInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutWorkspaceInput, DocumentUncheckedUpdateWithoutWorkspaceInput>
    create: XOR<DocumentCreateWithoutWorkspaceInput, DocumentUncheckedCreateWithoutWorkspaceInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutWorkspaceInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutWorkspaceInput, DocumentUncheckedUpdateWithoutWorkspaceInput>
  }

  export type DocumentUpdateManyWithWhereWithoutWorkspaceInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutWorkspaceInput>
  }

  export type DocumentScalarWhereInput = {
    AND?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    OR?: DocumentScalarWhereInput[]
    NOT?: DocumentScalarWhereInput | DocumentScalarWhereInput[]
    id?: StringFilter<"Document"> | string
    workspaceId?: StringNullableFilter<"Document"> | string | null
    conversationId?: StringNullableFilter<"Document"> | string | null
    title?: StringFilter<"Document"> | string
    url?: StringNullableFilter<"Document"> | string | null
    createdAt?: DateTimeFilter<"Document"> | Date | string
  }

  export type WorkspaceCreateWithoutMembersInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationCreateNestedManyWithoutWorkspaceInput
    documents?: DocumentCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutMembersInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutWorkspaceInput
    documents?: DocumentUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutMembersInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutMembersInput, WorkspaceUncheckedCreateWithoutMembersInput>
  }

  export type UserCreateWithoutWorkspaceMembersInput = {
    id?: string
    email: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationCreateNestedManyWithoutOwnerInput
    nodes?: NodeCreateNestedManyWithoutCreatedByInput
    aiRequests?: AiRequestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutWorkspaceMembersInput = {
    id?: string
    email: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversations?: ConversationUncheckedCreateNestedManyWithoutOwnerInput
    nodes?: NodeUncheckedCreateNestedManyWithoutCreatedByInput
    aiRequests?: AiRequestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutWorkspaceMembersInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutWorkspaceMembersInput, UserUncheckedCreateWithoutWorkspaceMembersInput>
  }

  export type WorkspaceUpsertWithoutMembersInput = {
    update: XOR<WorkspaceUpdateWithoutMembersInput, WorkspaceUncheckedUpdateWithoutMembersInput>
    create: XOR<WorkspaceCreateWithoutMembersInput, WorkspaceUncheckedCreateWithoutMembersInput>
    where?: WorkspaceWhereInput
  }

  export type WorkspaceUpdateToOneWithWhereWithoutMembersInput = {
    where?: WorkspaceWhereInput
    data: XOR<WorkspaceUpdateWithoutMembersInput, WorkspaceUncheckedUpdateWithoutMembersInput>
  }

  export type WorkspaceUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUpdateManyWithoutWorkspaceNestedInput
    documents?: DocumentUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutWorkspaceNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type UserUpsertWithoutWorkspaceMembersInput = {
    update: XOR<UserUpdateWithoutWorkspaceMembersInput, UserUncheckedUpdateWithoutWorkspaceMembersInput>
    create: XOR<UserCreateWithoutWorkspaceMembersInput, UserUncheckedCreateWithoutWorkspaceMembersInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutWorkspaceMembersInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutWorkspaceMembersInput, UserUncheckedUpdateWithoutWorkspaceMembersInput>
  }

  export type UserUpdateWithoutWorkspaceMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUpdateManyWithoutOwnerNestedInput
    nodes?: NodeUpdateManyWithoutCreatedByNestedInput
    aiRequests?: AiRequestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutWorkspaceMembersInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversations?: ConversationUncheckedUpdateManyWithoutOwnerNestedInput
    nodes?: NodeUncheckedUpdateManyWithoutCreatedByNestedInput
    aiRequests?: AiRequestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateWithoutConversationsInput = {
    id?: string
    email: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workspaceMembers?: WorkspaceMemberCreateNestedManyWithoutUserInput
    nodes?: NodeCreateNestedManyWithoutCreatedByInput
    aiRequests?: AiRequestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutConversationsInput = {
    id?: string
    email: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workspaceMembers?: WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput
    nodes?: NodeUncheckedCreateNestedManyWithoutCreatedByInput
    aiRequests?: AiRequestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutConversationsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
  }

  export type WorkspaceCreateWithoutConversationsInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: WorkspaceMemberCreateNestedManyWithoutWorkspaceInput
    documents?: DocumentCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutConversationsInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: WorkspaceMemberUncheckedCreateNestedManyWithoutWorkspaceInput
    documents?: DocumentUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutConversationsInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutConversationsInput, WorkspaceUncheckedCreateWithoutConversationsInput>
  }

  export type NodeCreateWithoutConversationInput = {
    id?: string
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    parent?: NodeCreateNestedOneWithoutChildrenInput
    children?: NodeCreateNestedManyWithoutParentInput
    parentBlock?: BlockCreateNestedOneWithoutBranchesInput
    createdBy: UserCreateNestedOneWithoutNodesInput
    blocks?: BlockCreateNestedManyWithoutNodeInput
    aiRequests?: AiRequestCreateNestedManyWithoutNodeInput
  }

  export type NodeUncheckedCreateWithoutConversationInput = {
    id?: string
    parentNodeId?: string | null
    parentBlockId?: string | null
    createdById: string
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: NodeUncheckedCreateNestedManyWithoutParentInput
    blocks?: BlockUncheckedCreateNestedManyWithoutNodeInput
    aiRequests?: AiRequestUncheckedCreateNestedManyWithoutNodeInput
  }

  export type NodeCreateOrConnectWithoutConversationInput = {
    where: NodeWhereUniqueInput
    create: XOR<NodeCreateWithoutConversationInput, NodeUncheckedCreateWithoutConversationInput>
  }

  export type NodeCreateManyConversationInputEnvelope = {
    data: NodeCreateManyConversationInput | NodeCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type AiRequestCreateWithoutConversationInput = {
    id?: string
    status?: $Enums.AiRequestStatus
    model: string
    promptTokens?: number
    outputTokens?: number
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
    node?: NodeCreateNestedOneWithoutAiRequestsInput
    user: UserCreateNestedOneWithoutAiRequestsInput
  }

  export type AiRequestUncheckedCreateWithoutConversationInput = {
    id?: string
    nodeId?: string | null
    userId: string
    status?: $Enums.AiRequestStatus
    model: string
    promptTokens?: number
    outputTokens?: number
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type AiRequestCreateOrConnectWithoutConversationInput = {
    where: AiRequestWhereUniqueInput
    create: XOR<AiRequestCreateWithoutConversationInput, AiRequestUncheckedCreateWithoutConversationInput>
  }

  export type AiRequestCreateManyConversationInputEnvelope = {
    data: AiRequestCreateManyConversationInput | AiRequestCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type DocumentCreateWithoutConversationInput = {
    id?: string
    title: string
    url?: string | null
    createdAt?: Date | string
    workspace?: WorkspaceCreateNestedOneWithoutDocumentsInput
    chunks?: DocumentChunkCreateNestedManyWithoutDocumentInput
  }

  export type DocumentUncheckedCreateWithoutConversationInput = {
    id?: string
    workspaceId?: string | null
    title: string
    url?: string | null
    createdAt?: Date | string
    chunks?: DocumentChunkUncheckedCreateNestedManyWithoutDocumentInput
  }

  export type DocumentCreateOrConnectWithoutConversationInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutConversationInput, DocumentUncheckedCreateWithoutConversationInput>
  }

  export type DocumentCreateManyConversationInputEnvelope = {
    data: DocumentCreateManyConversationInput | DocumentCreateManyConversationInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutConversationsInput = {
    update: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
    create: XOR<UserCreateWithoutConversationsInput, UserUncheckedCreateWithoutConversationsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutConversationsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutConversationsInput, UserUncheckedUpdateWithoutConversationsInput>
  }

  export type UserUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspaceMembers?: WorkspaceMemberUpdateManyWithoutUserNestedInput
    nodes?: NodeUpdateManyWithoutCreatedByNestedInput
    aiRequests?: AiRequestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspaceMembers?: WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput
    nodes?: NodeUncheckedUpdateManyWithoutCreatedByNestedInput
    aiRequests?: AiRequestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type WorkspaceUpsertWithoutConversationsInput = {
    update: XOR<WorkspaceUpdateWithoutConversationsInput, WorkspaceUncheckedUpdateWithoutConversationsInput>
    create: XOR<WorkspaceCreateWithoutConversationsInput, WorkspaceUncheckedCreateWithoutConversationsInput>
    where?: WorkspaceWhereInput
  }

  export type WorkspaceUpdateToOneWithWhereWithoutConversationsInput = {
    where?: WorkspaceWhereInput
    data: XOR<WorkspaceUpdateWithoutConversationsInput, WorkspaceUncheckedUpdateWithoutConversationsInput>
  }

  export type WorkspaceUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: WorkspaceMemberUpdateManyWithoutWorkspaceNestedInput
    documents?: DocumentUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutConversationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type NodeUpsertWithWhereUniqueWithoutConversationInput = {
    where: NodeWhereUniqueInput
    update: XOR<NodeUpdateWithoutConversationInput, NodeUncheckedUpdateWithoutConversationInput>
    create: XOR<NodeCreateWithoutConversationInput, NodeUncheckedCreateWithoutConversationInput>
  }

  export type NodeUpdateWithWhereUniqueWithoutConversationInput = {
    where: NodeWhereUniqueInput
    data: XOR<NodeUpdateWithoutConversationInput, NodeUncheckedUpdateWithoutConversationInput>
  }

  export type NodeUpdateManyWithWhereWithoutConversationInput = {
    where: NodeScalarWhereInput
    data: XOR<NodeUpdateManyMutationInput, NodeUncheckedUpdateManyWithoutConversationInput>
  }

  export type AiRequestUpsertWithWhereUniqueWithoutConversationInput = {
    where: AiRequestWhereUniqueInput
    update: XOR<AiRequestUpdateWithoutConversationInput, AiRequestUncheckedUpdateWithoutConversationInput>
    create: XOR<AiRequestCreateWithoutConversationInput, AiRequestUncheckedCreateWithoutConversationInput>
  }

  export type AiRequestUpdateWithWhereUniqueWithoutConversationInput = {
    where: AiRequestWhereUniqueInput
    data: XOR<AiRequestUpdateWithoutConversationInput, AiRequestUncheckedUpdateWithoutConversationInput>
  }

  export type AiRequestUpdateManyWithWhereWithoutConversationInput = {
    where: AiRequestScalarWhereInput
    data: XOR<AiRequestUpdateManyMutationInput, AiRequestUncheckedUpdateManyWithoutConversationInput>
  }

  export type DocumentUpsertWithWhereUniqueWithoutConversationInput = {
    where: DocumentWhereUniqueInput
    update: XOR<DocumentUpdateWithoutConversationInput, DocumentUncheckedUpdateWithoutConversationInput>
    create: XOR<DocumentCreateWithoutConversationInput, DocumentUncheckedCreateWithoutConversationInput>
  }

  export type DocumentUpdateWithWhereUniqueWithoutConversationInput = {
    where: DocumentWhereUniqueInput
    data: XOR<DocumentUpdateWithoutConversationInput, DocumentUncheckedUpdateWithoutConversationInput>
  }

  export type DocumentUpdateManyWithWhereWithoutConversationInput = {
    where: DocumentScalarWhereInput
    data: XOR<DocumentUpdateManyMutationInput, DocumentUncheckedUpdateManyWithoutConversationInput>
  }

  export type ConversationCreateWithoutNodesInput = {
    id?: string
    title: string
    description?: string | null
    isFavorite?: boolean
    tags?: ConversationCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutConversationsInput
    workspace?: WorkspaceCreateNestedOneWithoutConversationsInput
    aiRequests?: AiRequestCreateNestedManyWithoutConversationInput
    documents?: DocumentCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutNodesInput = {
    id?: string
    title: string
    description?: string | null
    ownerId: string
    workspaceId?: string | null
    isFavorite?: boolean
    tags?: ConversationCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    aiRequests?: AiRequestUncheckedCreateNestedManyWithoutConversationInput
    documents?: DocumentUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutNodesInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutNodesInput, ConversationUncheckedCreateWithoutNodesInput>
  }

  export type NodeCreateWithoutChildrenInput = {
    id?: string
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutNodesInput
    parent?: NodeCreateNestedOneWithoutChildrenInput
    parentBlock?: BlockCreateNestedOneWithoutBranchesInput
    createdBy: UserCreateNestedOneWithoutNodesInput
    blocks?: BlockCreateNestedManyWithoutNodeInput
    aiRequests?: AiRequestCreateNestedManyWithoutNodeInput
  }

  export type NodeUncheckedCreateWithoutChildrenInput = {
    id?: string
    conversationId: string
    parentNodeId?: string | null
    parentBlockId?: string | null
    createdById: string
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    blocks?: BlockUncheckedCreateNestedManyWithoutNodeInput
    aiRequests?: AiRequestUncheckedCreateNestedManyWithoutNodeInput
  }

  export type NodeCreateOrConnectWithoutChildrenInput = {
    where: NodeWhereUniqueInput
    create: XOR<NodeCreateWithoutChildrenInput, NodeUncheckedCreateWithoutChildrenInput>
  }

  export type NodeCreateWithoutParentInput = {
    id?: string
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutNodesInput
    children?: NodeCreateNestedManyWithoutParentInput
    parentBlock?: BlockCreateNestedOneWithoutBranchesInput
    createdBy: UserCreateNestedOneWithoutNodesInput
    blocks?: BlockCreateNestedManyWithoutNodeInput
    aiRequests?: AiRequestCreateNestedManyWithoutNodeInput
  }

  export type NodeUncheckedCreateWithoutParentInput = {
    id?: string
    conversationId: string
    parentBlockId?: string | null
    createdById: string
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: NodeUncheckedCreateNestedManyWithoutParentInput
    blocks?: BlockUncheckedCreateNestedManyWithoutNodeInput
    aiRequests?: AiRequestUncheckedCreateNestedManyWithoutNodeInput
  }

  export type NodeCreateOrConnectWithoutParentInput = {
    where: NodeWhereUniqueInput
    create: XOR<NodeCreateWithoutParentInput, NodeUncheckedCreateWithoutParentInput>
  }

  export type NodeCreateManyParentInputEnvelope = {
    data: NodeCreateManyParentInput | NodeCreateManyParentInput[]
    skipDuplicates?: boolean
  }

  export type BlockCreateWithoutBranchesInput = {
    id?: string
    type: $Enums.BlockType
    content?: string
    position: number
    language?: string | null
    calloutType?: $Enums.CalloutType | null
    createdAt?: Date | string
    node: NodeCreateNestedOneWithoutBlocksInput
    items?: BlockItemCreateNestedManyWithoutBlockInput
  }

  export type BlockUncheckedCreateWithoutBranchesInput = {
    id?: string
    nodeId: string
    type: $Enums.BlockType
    content?: string
    position: number
    language?: string | null
    calloutType?: $Enums.CalloutType | null
    createdAt?: Date | string
    items?: BlockItemUncheckedCreateNestedManyWithoutBlockInput
  }

  export type BlockCreateOrConnectWithoutBranchesInput = {
    where: BlockWhereUniqueInput
    create: XOR<BlockCreateWithoutBranchesInput, BlockUncheckedCreateWithoutBranchesInput>
  }

  export type UserCreateWithoutNodesInput = {
    id?: string
    email: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workspaceMembers?: WorkspaceMemberCreateNestedManyWithoutUserInput
    conversations?: ConversationCreateNestedManyWithoutOwnerInput
    aiRequests?: AiRequestCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutNodesInput = {
    id?: string
    email: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workspaceMembers?: WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutOwnerInput
    aiRequests?: AiRequestUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutNodesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutNodesInput, UserUncheckedCreateWithoutNodesInput>
  }

  export type BlockCreateWithoutNodeInput = {
    id?: string
    type: $Enums.BlockType
    content?: string
    position: number
    language?: string | null
    calloutType?: $Enums.CalloutType | null
    createdAt?: Date | string
    items?: BlockItemCreateNestedManyWithoutBlockInput
    branches?: NodeCreateNestedManyWithoutParentBlockInput
  }

  export type BlockUncheckedCreateWithoutNodeInput = {
    id?: string
    type: $Enums.BlockType
    content?: string
    position: number
    language?: string | null
    calloutType?: $Enums.CalloutType | null
    createdAt?: Date | string
    items?: BlockItemUncheckedCreateNestedManyWithoutBlockInput
    branches?: NodeUncheckedCreateNestedManyWithoutParentBlockInput
  }

  export type BlockCreateOrConnectWithoutNodeInput = {
    where: BlockWhereUniqueInput
    create: XOR<BlockCreateWithoutNodeInput, BlockUncheckedCreateWithoutNodeInput>
  }

  export type BlockCreateManyNodeInputEnvelope = {
    data: BlockCreateManyNodeInput | BlockCreateManyNodeInput[]
    skipDuplicates?: boolean
  }

  export type AiRequestCreateWithoutNodeInput = {
    id?: string
    status?: $Enums.AiRequestStatus
    model: string
    promptTokens?: number
    outputTokens?: number
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
    conversation: ConversationCreateNestedOneWithoutAiRequestsInput
    user: UserCreateNestedOneWithoutAiRequestsInput
  }

  export type AiRequestUncheckedCreateWithoutNodeInput = {
    id?: string
    conversationId: string
    userId: string
    status?: $Enums.AiRequestStatus
    model: string
    promptTokens?: number
    outputTokens?: number
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type AiRequestCreateOrConnectWithoutNodeInput = {
    where: AiRequestWhereUniqueInput
    create: XOR<AiRequestCreateWithoutNodeInput, AiRequestUncheckedCreateWithoutNodeInput>
  }

  export type AiRequestCreateManyNodeInputEnvelope = {
    data: AiRequestCreateManyNodeInput | AiRequestCreateManyNodeInput[]
    skipDuplicates?: boolean
  }

  export type ConversationUpsertWithoutNodesInput = {
    update: XOR<ConversationUpdateWithoutNodesInput, ConversationUncheckedUpdateWithoutNodesInput>
    create: XOR<ConversationCreateWithoutNodesInput, ConversationUncheckedCreateWithoutNodesInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutNodesInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutNodesInput, ConversationUncheckedUpdateWithoutNodesInput>
  }

  export type ConversationUpdateWithoutNodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    tags?: ConversationUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutConversationsNestedInput
    workspace?: WorkspaceUpdateOneWithoutConversationsNestedInput
    aiRequests?: AiRequestUpdateManyWithoutConversationNestedInput
    documents?: DocumentUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutNodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    workspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    tags?: ConversationUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    aiRequests?: AiRequestUncheckedUpdateManyWithoutConversationNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type NodeUpsertWithoutChildrenInput = {
    update: XOR<NodeUpdateWithoutChildrenInput, NodeUncheckedUpdateWithoutChildrenInput>
    create: XOR<NodeCreateWithoutChildrenInput, NodeUncheckedCreateWithoutChildrenInput>
    where?: NodeWhereInput
  }

  export type NodeUpdateToOneWithWhereWithoutChildrenInput = {
    where?: NodeWhereInput
    data: XOR<NodeUpdateWithoutChildrenInput, NodeUncheckedUpdateWithoutChildrenInput>
  }

  export type NodeUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutNodesNestedInput
    parent?: NodeUpdateOneWithoutChildrenNestedInput
    parentBlock?: BlockUpdateOneWithoutBranchesNestedInput
    createdBy?: UserUpdateOneRequiredWithoutNodesNestedInput
    blocks?: BlockUpdateManyWithoutNodeNestedInput
    aiRequests?: AiRequestUpdateManyWithoutNodeNestedInput
  }

  export type NodeUncheckedUpdateWithoutChildrenInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    parentNodeId?: NullableStringFieldUpdateOperationsInput | string | null
    parentBlockId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    blocks?: BlockUncheckedUpdateManyWithoutNodeNestedInput
    aiRequests?: AiRequestUncheckedUpdateManyWithoutNodeNestedInput
  }

  export type NodeUpsertWithWhereUniqueWithoutParentInput = {
    where: NodeWhereUniqueInput
    update: XOR<NodeUpdateWithoutParentInput, NodeUncheckedUpdateWithoutParentInput>
    create: XOR<NodeCreateWithoutParentInput, NodeUncheckedCreateWithoutParentInput>
  }

  export type NodeUpdateWithWhereUniqueWithoutParentInput = {
    where: NodeWhereUniqueInput
    data: XOR<NodeUpdateWithoutParentInput, NodeUncheckedUpdateWithoutParentInput>
  }

  export type NodeUpdateManyWithWhereWithoutParentInput = {
    where: NodeScalarWhereInput
    data: XOR<NodeUpdateManyMutationInput, NodeUncheckedUpdateManyWithoutParentInput>
  }

  export type BlockUpsertWithoutBranchesInput = {
    update: XOR<BlockUpdateWithoutBranchesInput, BlockUncheckedUpdateWithoutBranchesInput>
    create: XOR<BlockCreateWithoutBranchesInput, BlockUncheckedCreateWithoutBranchesInput>
    where?: BlockWhereInput
  }

  export type BlockUpdateToOneWithWhereWithoutBranchesInput = {
    where?: BlockWhereInput
    data: XOR<BlockUpdateWithoutBranchesInput, BlockUncheckedUpdateWithoutBranchesInput>
  }

  export type BlockUpdateWithoutBranchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumBlockTypeFieldUpdateOperationsInput | $Enums.BlockType
    content?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    calloutType?: NullableEnumCalloutTypeFieldUpdateOperationsInput | $Enums.CalloutType | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    node?: NodeUpdateOneRequiredWithoutBlocksNestedInput
    items?: BlockItemUpdateManyWithoutBlockNestedInput
  }

  export type BlockUncheckedUpdateWithoutBranchesInput = {
    id?: StringFieldUpdateOperationsInput | string
    nodeId?: StringFieldUpdateOperationsInput | string
    type?: EnumBlockTypeFieldUpdateOperationsInput | $Enums.BlockType
    content?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    calloutType?: NullableEnumCalloutTypeFieldUpdateOperationsInput | $Enums.CalloutType | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: BlockItemUncheckedUpdateManyWithoutBlockNestedInput
  }

  export type UserUpsertWithoutNodesInput = {
    update: XOR<UserUpdateWithoutNodesInput, UserUncheckedUpdateWithoutNodesInput>
    create: XOR<UserCreateWithoutNodesInput, UserUncheckedCreateWithoutNodesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutNodesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutNodesInput, UserUncheckedUpdateWithoutNodesInput>
  }

  export type UserUpdateWithoutNodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspaceMembers?: WorkspaceMemberUpdateManyWithoutUserNestedInput
    conversations?: ConversationUpdateManyWithoutOwnerNestedInput
    aiRequests?: AiRequestUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutNodesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspaceMembers?: WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutOwnerNestedInput
    aiRequests?: AiRequestUncheckedUpdateManyWithoutUserNestedInput
  }

  export type BlockUpsertWithWhereUniqueWithoutNodeInput = {
    where: BlockWhereUniqueInput
    update: XOR<BlockUpdateWithoutNodeInput, BlockUncheckedUpdateWithoutNodeInput>
    create: XOR<BlockCreateWithoutNodeInput, BlockUncheckedCreateWithoutNodeInput>
  }

  export type BlockUpdateWithWhereUniqueWithoutNodeInput = {
    where: BlockWhereUniqueInput
    data: XOR<BlockUpdateWithoutNodeInput, BlockUncheckedUpdateWithoutNodeInput>
  }

  export type BlockUpdateManyWithWhereWithoutNodeInput = {
    where: BlockScalarWhereInput
    data: XOR<BlockUpdateManyMutationInput, BlockUncheckedUpdateManyWithoutNodeInput>
  }

  export type BlockScalarWhereInput = {
    AND?: BlockScalarWhereInput | BlockScalarWhereInput[]
    OR?: BlockScalarWhereInput[]
    NOT?: BlockScalarWhereInput | BlockScalarWhereInput[]
    id?: StringFilter<"Block"> | string
    nodeId?: StringFilter<"Block"> | string
    type?: EnumBlockTypeFilter<"Block"> | $Enums.BlockType
    content?: StringFilter<"Block"> | string
    position?: IntFilter<"Block"> | number
    language?: StringNullableFilter<"Block"> | string | null
    calloutType?: EnumCalloutTypeNullableFilter<"Block"> | $Enums.CalloutType | null
    createdAt?: DateTimeFilter<"Block"> | Date | string
  }

  export type AiRequestUpsertWithWhereUniqueWithoutNodeInput = {
    where: AiRequestWhereUniqueInput
    update: XOR<AiRequestUpdateWithoutNodeInput, AiRequestUncheckedUpdateWithoutNodeInput>
    create: XOR<AiRequestCreateWithoutNodeInput, AiRequestUncheckedCreateWithoutNodeInput>
  }

  export type AiRequestUpdateWithWhereUniqueWithoutNodeInput = {
    where: AiRequestWhereUniqueInput
    data: XOR<AiRequestUpdateWithoutNodeInput, AiRequestUncheckedUpdateWithoutNodeInput>
  }

  export type AiRequestUpdateManyWithWhereWithoutNodeInput = {
    where: AiRequestScalarWhereInput
    data: XOR<AiRequestUpdateManyMutationInput, AiRequestUncheckedUpdateManyWithoutNodeInput>
  }

  export type NodeCreateWithoutBlocksInput = {
    id?: string
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutNodesInput
    parent?: NodeCreateNestedOneWithoutChildrenInput
    children?: NodeCreateNestedManyWithoutParentInput
    parentBlock?: BlockCreateNestedOneWithoutBranchesInput
    createdBy: UserCreateNestedOneWithoutNodesInput
    aiRequests?: AiRequestCreateNestedManyWithoutNodeInput
  }

  export type NodeUncheckedCreateWithoutBlocksInput = {
    id?: string
    conversationId: string
    parentNodeId?: string | null
    parentBlockId?: string | null
    createdById: string
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: NodeUncheckedCreateNestedManyWithoutParentInput
    aiRequests?: AiRequestUncheckedCreateNestedManyWithoutNodeInput
  }

  export type NodeCreateOrConnectWithoutBlocksInput = {
    where: NodeWhereUniqueInput
    create: XOR<NodeCreateWithoutBlocksInput, NodeUncheckedCreateWithoutBlocksInput>
  }

  export type BlockItemCreateWithoutBlockInput = {
    id?: string
    content: string
    position: number
  }

  export type BlockItemUncheckedCreateWithoutBlockInput = {
    id?: string
    content: string
    position: number
  }

  export type BlockItemCreateOrConnectWithoutBlockInput = {
    where: BlockItemWhereUniqueInput
    create: XOR<BlockItemCreateWithoutBlockInput, BlockItemUncheckedCreateWithoutBlockInput>
  }

  export type BlockItemCreateManyBlockInputEnvelope = {
    data: BlockItemCreateManyBlockInput | BlockItemCreateManyBlockInput[]
    skipDuplicates?: boolean
  }

  export type NodeCreateWithoutParentBlockInput = {
    id?: string
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutNodesInput
    parent?: NodeCreateNestedOneWithoutChildrenInput
    children?: NodeCreateNestedManyWithoutParentInput
    createdBy: UserCreateNestedOneWithoutNodesInput
    blocks?: BlockCreateNestedManyWithoutNodeInput
    aiRequests?: AiRequestCreateNestedManyWithoutNodeInput
  }

  export type NodeUncheckedCreateWithoutParentBlockInput = {
    id?: string
    conversationId: string
    parentNodeId?: string | null
    createdById: string
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: NodeUncheckedCreateNestedManyWithoutParentInput
    blocks?: BlockUncheckedCreateNestedManyWithoutNodeInput
    aiRequests?: AiRequestUncheckedCreateNestedManyWithoutNodeInput
  }

  export type NodeCreateOrConnectWithoutParentBlockInput = {
    where: NodeWhereUniqueInput
    create: XOR<NodeCreateWithoutParentBlockInput, NodeUncheckedCreateWithoutParentBlockInput>
  }

  export type NodeCreateManyParentBlockInputEnvelope = {
    data: NodeCreateManyParentBlockInput | NodeCreateManyParentBlockInput[]
    skipDuplicates?: boolean
  }

  export type NodeUpsertWithoutBlocksInput = {
    update: XOR<NodeUpdateWithoutBlocksInput, NodeUncheckedUpdateWithoutBlocksInput>
    create: XOR<NodeCreateWithoutBlocksInput, NodeUncheckedCreateWithoutBlocksInput>
    where?: NodeWhereInput
  }

  export type NodeUpdateToOneWithWhereWithoutBlocksInput = {
    where?: NodeWhereInput
    data: XOR<NodeUpdateWithoutBlocksInput, NodeUncheckedUpdateWithoutBlocksInput>
  }

  export type NodeUpdateWithoutBlocksInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutNodesNestedInput
    parent?: NodeUpdateOneWithoutChildrenNestedInput
    children?: NodeUpdateManyWithoutParentNestedInput
    parentBlock?: BlockUpdateOneWithoutBranchesNestedInput
    createdBy?: UserUpdateOneRequiredWithoutNodesNestedInput
    aiRequests?: AiRequestUpdateManyWithoutNodeNestedInput
  }

  export type NodeUncheckedUpdateWithoutBlocksInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    parentNodeId?: NullableStringFieldUpdateOperationsInput | string | null
    parentBlockId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: NodeUncheckedUpdateManyWithoutParentNestedInput
    aiRequests?: AiRequestUncheckedUpdateManyWithoutNodeNestedInput
  }

  export type BlockItemUpsertWithWhereUniqueWithoutBlockInput = {
    where: BlockItemWhereUniqueInput
    update: XOR<BlockItemUpdateWithoutBlockInput, BlockItemUncheckedUpdateWithoutBlockInput>
    create: XOR<BlockItemCreateWithoutBlockInput, BlockItemUncheckedCreateWithoutBlockInput>
  }

  export type BlockItemUpdateWithWhereUniqueWithoutBlockInput = {
    where: BlockItemWhereUniqueInput
    data: XOR<BlockItemUpdateWithoutBlockInput, BlockItemUncheckedUpdateWithoutBlockInput>
  }

  export type BlockItemUpdateManyWithWhereWithoutBlockInput = {
    where: BlockItemScalarWhereInput
    data: XOR<BlockItemUpdateManyMutationInput, BlockItemUncheckedUpdateManyWithoutBlockInput>
  }

  export type BlockItemScalarWhereInput = {
    AND?: BlockItemScalarWhereInput | BlockItemScalarWhereInput[]
    OR?: BlockItemScalarWhereInput[]
    NOT?: BlockItemScalarWhereInput | BlockItemScalarWhereInput[]
    id?: StringFilter<"BlockItem"> | string
    blockId?: StringFilter<"BlockItem"> | string
    content?: StringFilter<"BlockItem"> | string
    position?: IntFilter<"BlockItem"> | number
  }

  export type NodeUpsertWithWhereUniqueWithoutParentBlockInput = {
    where: NodeWhereUniqueInput
    update: XOR<NodeUpdateWithoutParentBlockInput, NodeUncheckedUpdateWithoutParentBlockInput>
    create: XOR<NodeCreateWithoutParentBlockInput, NodeUncheckedCreateWithoutParentBlockInput>
  }

  export type NodeUpdateWithWhereUniqueWithoutParentBlockInput = {
    where: NodeWhereUniqueInput
    data: XOR<NodeUpdateWithoutParentBlockInput, NodeUncheckedUpdateWithoutParentBlockInput>
  }

  export type NodeUpdateManyWithWhereWithoutParentBlockInput = {
    where: NodeScalarWhereInput
    data: XOR<NodeUpdateManyMutationInput, NodeUncheckedUpdateManyWithoutParentBlockInput>
  }

  export type BlockCreateWithoutItemsInput = {
    id?: string
    type: $Enums.BlockType
    content?: string
    position: number
    language?: string | null
    calloutType?: $Enums.CalloutType | null
    createdAt?: Date | string
    node: NodeCreateNestedOneWithoutBlocksInput
    branches?: NodeCreateNestedManyWithoutParentBlockInput
  }

  export type BlockUncheckedCreateWithoutItemsInput = {
    id?: string
    nodeId: string
    type: $Enums.BlockType
    content?: string
    position: number
    language?: string | null
    calloutType?: $Enums.CalloutType | null
    createdAt?: Date | string
    branches?: NodeUncheckedCreateNestedManyWithoutParentBlockInput
  }

  export type BlockCreateOrConnectWithoutItemsInput = {
    where: BlockWhereUniqueInput
    create: XOR<BlockCreateWithoutItemsInput, BlockUncheckedCreateWithoutItemsInput>
  }

  export type BlockUpsertWithoutItemsInput = {
    update: XOR<BlockUpdateWithoutItemsInput, BlockUncheckedUpdateWithoutItemsInput>
    create: XOR<BlockCreateWithoutItemsInput, BlockUncheckedCreateWithoutItemsInput>
    where?: BlockWhereInput
  }

  export type BlockUpdateToOneWithWhereWithoutItemsInput = {
    where?: BlockWhereInput
    data: XOR<BlockUpdateWithoutItemsInput, BlockUncheckedUpdateWithoutItemsInput>
  }

  export type BlockUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumBlockTypeFieldUpdateOperationsInput | $Enums.BlockType
    content?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    calloutType?: NullableEnumCalloutTypeFieldUpdateOperationsInput | $Enums.CalloutType | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    node?: NodeUpdateOneRequiredWithoutBlocksNestedInput
    branches?: NodeUpdateManyWithoutParentBlockNestedInput
  }

  export type BlockUncheckedUpdateWithoutItemsInput = {
    id?: StringFieldUpdateOperationsInput | string
    nodeId?: StringFieldUpdateOperationsInput | string
    type?: EnumBlockTypeFieldUpdateOperationsInput | $Enums.BlockType
    content?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    calloutType?: NullableEnumCalloutTypeFieldUpdateOperationsInput | $Enums.CalloutType | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    branches?: NodeUncheckedUpdateManyWithoutParentBlockNestedInput
  }

  export type ConversationCreateWithoutAiRequestsInput = {
    id?: string
    title: string
    description?: string | null
    isFavorite?: boolean
    tags?: ConversationCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutConversationsInput
    workspace?: WorkspaceCreateNestedOneWithoutConversationsInput
    nodes?: NodeCreateNestedManyWithoutConversationInput
    documents?: DocumentCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutAiRequestsInput = {
    id?: string
    title: string
    description?: string | null
    ownerId: string
    workspaceId?: string | null
    isFavorite?: boolean
    tags?: ConversationCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    nodes?: NodeUncheckedCreateNestedManyWithoutConversationInput
    documents?: DocumentUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutAiRequestsInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutAiRequestsInput, ConversationUncheckedCreateWithoutAiRequestsInput>
  }

  export type NodeCreateWithoutAiRequestsInput = {
    id?: string
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    conversation: ConversationCreateNestedOneWithoutNodesInput
    parent?: NodeCreateNestedOneWithoutChildrenInput
    children?: NodeCreateNestedManyWithoutParentInput
    parentBlock?: BlockCreateNestedOneWithoutBranchesInput
    createdBy: UserCreateNestedOneWithoutNodesInput
    blocks?: BlockCreateNestedManyWithoutNodeInput
  }

  export type NodeUncheckedCreateWithoutAiRequestsInput = {
    id?: string
    conversationId: string
    parentNodeId?: string | null
    parentBlockId?: string | null
    createdById: string
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    children?: NodeUncheckedCreateNestedManyWithoutParentInput
    blocks?: BlockUncheckedCreateNestedManyWithoutNodeInput
  }

  export type NodeCreateOrConnectWithoutAiRequestsInput = {
    where: NodeWhereUniqueInput
    create: XOR<NodeCreateWithoutAiRequestsInput, NodeUncheckedCreateWithoutAiRequestsInput>
  }

  export type UserCreateWithoutAiRequestsInput = {
    id?: string
    email: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workspaceMembers?: WorkspaceMemberCreateNestedManyWithoutUserInput
    conversations?: ConversationCreateNestedManyWithoutOwnerInput
    nodes?: NodeCreateNestedManyWithoutCreatedByInput
  }

  export type UserUncheckedCreateWithoutAiRequestsInput = {
    id?: string
    email: string
    name: string
    avatar?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    workspaceMembers?: WorkspaceMemberUncheckedCreateNestedManyWithoutUserInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutOwnerInput
    nodes?: NodeUncheckedCreateNestedManyWithoutCreatedByInput
  }

  export type UserCreateOrConnectWithoutAiRequestsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutAiRequestsInput, UserUncheckedCreateWithoutAiRequestsInput>
  }

  export type ConversationUpsertWithoutAiRequestsInput = {
    update: XOR<ConversationUpdateWithoutAiRequestsInput, ConversationUncheckedUpdateWithoutAiRequestsInput>
    create: XOR<ConversationCreateWithoutAiRequestsInput, ConversationUncheckedCreateWithoutAiRequestsInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutAiRequestsInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutAiRequestsInput, ConversationUncheckedUpdateWithoutAiRequestsInput>
  }

  export type ConversationUpdateWithoutAiRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    tags?: ConversationUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutConversationsNestedInput
    workspace?: WorkspaceUpdateOneWithoutConversationsNestedInput
    nodes?: NodeUpdateManyWithoutConversationNestedInput
    documents?: DocumentUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutAiRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    workspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    tags?: ConversationUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nodes?: NodeUncheckedUpdateManyWithoutConversationNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type NodeUpsertWithoutAiRequestsInput = {
    update: XOR<NodeUpdateWithoutAiRequestsInput, NodeUncheckedUpdateWithoutAiRequestsInput>
    create: XOR<NodeCreateWithoutAiRequestsInput, NodeUncheckedCreateWithoutAiRequestsInput>
    where?: NodeWhereInput
  }

  export type NodeUpdateToOneWithWhereWithoutAiRequestsInput = {
    where?: NodeWhereInput
    data: XOR<NodeUpdateWithoutAiRequestsInput, NodeUncheckedUpdateWithoutAiRequestsInput>
  }

  export type NodeUpdateWithoutAiRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutNodesNestedInput
    parent?: NodeUpdateOneWithoutChildrenNestedInput
    children?: NodeUpdateManyWithoutParentNestedInput
    parentBlock?: BlockUpdateOneWithoutBranchesNestedInput
    createdBy?: UserUpdateOneRequiredWithoutNodesNestedInput
    blocks?: BlockUpdateManyWithoutNodeNestedInput
  }

  export type NodeUncheckedUpdateWithoutAiRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    parentNodeId?: NullableStringFieldUpdateOperationsInput | string | null
    parentBlockId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: NodeUncheckedUpdateManyWithoutParentNestedInput
    blocks?: BlockUncheckedUpdateManyWithoutNodeNestedInput
  }

  export type UserUpsertWithoutAiRequestsInput = {
    update: XOR<UserUpdateWithoutAiRequestsInput, UserUncheckedUpdateWithoutAiRequestsInput>
    create: XOR<UserCreateWithoutAiRequestsInput, UserUncheckedCreateWithoutAiRequestsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutAiRequestsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutAiRequestsInput, UserUncheckedUpdateWithoutAiRequestsInput>
  }

  export type UserUpdateWithoutAiRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspaceMembers?: WorkspaceMemberUpdateManyWithoutUserNestedInput
    conversations?: ConversationUpdateManyWithoutOwnerNestedInput
    nodes?: NodeUpdateManyWithoutCreatedByNestedInput
  }

  export type UserUncheckedUpdateWithoutAiRequestsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspaceMembers?: WorkspaceMemberUncheckedUpdateManyWithoutUserNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutOwnerNestedInput
    nodes?: NodeUncheckedUpdateManyWithoutCreatedByNestedInput
  }

  export type WorkspaceCreateWithoutDocumentsInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: WorkspaceMemberCreateNestedManyWithoutWorkspaceInput
    conversations?: ConversationCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceUncheckedCreateWithoutDocumentsInput = {
    id?: string
    name: string
    slug: string
    createdAt?: Date | string
    updatedAt?: Date | string
    members?: WorkspaceMemberUncheckedCreateNestedManyWithoutWorkspaceInput
    conversations?: ConversationUncheckedCreateNestedManyWithoutWorkspaceInput
  }

  export type WorkspaceCreateOrConnectWithoutDocumentsInput = {
    where: WorkspaceWhereUniqueInput
    create: XOR<WorkspaceCreateWithoutDocumentsInput, WorkspaceUncheckedCreateWithoutDocumentsInput>
  }

  export type ConversationCreateWithoutDocumentsInput = {
    id?: string
    title: string
    description?: string | null
    isFavorite?: boolean
    tags?: ConversationCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    owner: UserCreateNestedOneWithoutConversationsInput
    workspace?: WorkspaceCreateNestedOneWithoutConversationsInput
    nodes?: NodeCreateNestedManyWithoutConversationInput
    aiRequests?: AiRequestCreateNestedManyWithoutConversationInput
  }

  export type ConversationUncheckedCreateWithoutDocumentsInput = {
    id?: string
    title: string
    description?: string | null
    ownerId: string
    workspaceId?: string | null
    isFavorite?: boolean
    tags?: ConversationCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
    nodes?: NodeUncheckedCreateNestedManyWithoutConversationInput
    aiRequests?: AiRequestUncheckedCreateNestedManyWithoutConversationInput
  }

  export type ConversationCreateOrConnectWithoutDocumentsInput = {
    where: ConversationWhereUniqueInput
    create: XOR<ConversationCreateWithoutDocumentsInput, ConversationUncheckedCreateWithoutDocumentsInput>
  }

  export type DocumentChunkCreateWithoutDocumentInput = {
    id?: string
    content: string
    embedding?: DocumentChunkCreateembeddingInput | number[]
    position?: number
  }

  export type DocumentChunkUncheckedCreateWithoutDocumentInput = {
    id?: string
    content: string
    embedding?: DocumentChunkCreateembeddingInput | number[]
    position?: number
  }

  export type DocumentChunkCreateOrConnectWithoutDocumentInput = {
    where: DocumentChunkWhereUniqueInput
    create: XOR<DocumentChunkCreateWithoutDocumentInput, DocumentChunkUncheckedCreateWithoutDocumentInput>
  }

  export type DocumentChunkCreateManyDocumentInputEnvelope = {
    data: DocumentChunkCreateManyDocumentInput | DocumentChunkCreateManyDocumentInput[]
    skipDuplicates?: boolean
  }

  export type WorkspaceUpsertWithoutDocumentsInput = {
    update: XOR<WorkspaceUpdateWithoutDocumentsInput, WorkspaceUncheckedUpdateWithoutDocumentsInput>
    create: XOR<WorkspaceCreateWithoutDocumentsInput, WorkspaceUncheckedCreateWithoutDocumentsInput>
    where?: WorkspaceWhereInput
  }

  export type WorkspaceUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: WorkspaceWhereInput
    data: XOR<WorkspaceUpdateWithoutDocumentsInput, WorkspaceUncheckedUpdateWithoutDocumentsInput>
  }

  export type WorkspaceUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: WorkspaceMemberUpdateManyWithoutWorkspaceNestedInput
    conversations?: ConversationUpdateManyWithoutWorkspaceNestedInput
  }

  export type WorkspaceUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    members?: WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceNestedInput
    conversations?: ConversationUncheckedUpdateManyWithoutWorkspaceNestedInput
  }

  export type ConversationUpsertWithoutDocumentsInput = {
    update: XOR<ConversationUpdateWithoutDocumentsInput, ConversationUncheckedUpdateWithoutDocumentsInput>
    create: XOR<ConversationCreateWithoutDocumentsInput, ConversationUncheckedCreateWithoutDocumentsInput>
    where?: ConversationWhereInput
  }

  export type ConversationUpdateToOneWithWhereWithoutDocumentsInput = {
    where?: ConversationWhereInput
    data: XOR<ConversationUpdateWithoutDocumentsInput, ConversationUncheckedUpdateWithoutDocumentsInput>
  }

  export type ConversationUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    tags?: ConversationUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutConversationsNestedInput
    workspace?: WorkspaceUpdateOneWithoutConversationsNestedInput
    nodes?: NodeUpdateManyWithoutConversationNestedInput
    aiRequests?: AiRequestUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutDocumentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    workspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    tags?: ConversationUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nodes?: NodeUncheckedUpdateManyWithoutConversationNestedInput
    aiRequests?: AiRequestUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type DocumentChunkUpsertWithWhereUniqueWithoutDocumentInput = {
    where: DocumentChunkWhereUniqueInput
    update: XOR<DocumentChunkUpdateWithoutDocumentInput, DocumentChunkUncheckedUpdateWithoutDocumentInput>
    create: XOR<DocumentChunkCreateWithoutDocumentInput, DocumentChunkUncheckedCreateWithoutDocumentInput>
  }

  export type DocumentChunkUpdateWithWhereUniqueWithoutDocumentInput = {
    where: DocumentChunkWhereUniqueInput
    data: XOR<DocumentChunkUpdateWithoutDocumentInput, DocumentChunkUncheckedUpdateWithoutDocumentInput>
  }

  export type DocumentChunkUpdateManyWithWhereWithoutDocumentInput = {
    where: DocumentChunkScalarWhereInput
    data: XOR<DocumentChunkUpdateManyMutationInput, DocumentChunkUncheckedUpdateManyWithoutDocumentInput>
  }

  export type DocumentChunkScalarWhereInput = {
    AND?: DocumentChunkScalarWhereInput | DocumentChunkScalarWhereInput[]
    OR?: DocumentChunkScalarWhereInput[]
    NOT?: DocumentChunkScalarWhereInput | DocumentChunkScalarWhereInput[]
    id?: StringFilter<"DocumentChunk"> | string
    documentId?: StringFilter<"DocumentChunk"> | string
    content?: StringFilter<"DocumentChunk"> | string
    embedding?: FloatNullableListFilter<"DocumentChunk">
    position?: IntFilter<"DocumentChunk"> | number
  }

  export type DocumentCreateWithoutChunksInput = {
    id?: string
    title: string
    url?: string | null
    createdAt?: Date | string
    workspace?: WorkspaceCreateNestedOneWithoutDocumentsInput
    conversation?: ConversationCreateNestedOneWithoutDocumentsInput
  }

  export type DocumentUncheckedCreateWithoutChunksInput = {
    id?: string
    workspaceId?: string | null
    conversationId?: string | null
    title: string
    url?: string | null
    createdAt?: Date | string
  }

  export type DocumentCreateOrConnectWithoutChunksInput = {
    where: DocumentWhereUniqueInput
    create: XOR<DocumentCreateWithoutChunksInput, DocumentUncheckedCreateWithoutChunksInput>
  }

  export type DocumentUpsertWithoutChunksInput = {
    update: XOR<DocumentUpdateWithoutChunksInput, DocumentUncheckedUpdateWithoutChunksInput>
    create: XOR<DocumentCreateWithoutChunksInput, DocumentUncheckedCreateWithoutChunksInput>
    where?: DocumentWhereInput
  }

  export type DocumentUpdateToOneWithWhereWithoutChunksInput = {
    where?: DocumentWhereInput
    data: XOR<DocumentUpdateWithoutChunksInput, DocumentUncheckedUpdateWithoutChunksInput>
  }

  export type DocumentUpdateWithoutChunksInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneWithoutDocumentsNestedInput
    conversation?: ConversationUpdateOneWithoutDocumentsNestedInput
  }

  export type DocumentUncheckedUpdateWithoutChunksInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceMemberCreateManyUserInput = {
    id?: string
    workspaceId: string
    role?: $Enums.WorkspaceMemberRole
    joinedAt?: Date | string
  }

  export type ConversationCreateManyOwnerInput = {
    id?: string
    title: string
    description?: string | null
    workspaceId?: string | null
    isFavorite?: boolean
    tags?: ConversationCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NodeCreateManyCreatedByInput = {
    id?: string
    conversationId: string
    parentNodeId?: string | null
    parentBlockId?: string | null
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiRequestCreateManyUserInput = {
    id?: string
    conversationId: string
    nodeId?: string | null
    status?: $Enums.AiRequestStatus
    model: string
    promptTokens?: number
    outputTokens?: number
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type WorkspaceMemberUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumWorkspaceMemberRoleFieldUpdateOperationsInput | $Enums.WorkspaceMemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneRequiredWithoutMembersNestedInput
  }

  export type WorkspaceMemberUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    role?: EnumWorkspaceMemberRoleFieldUpdateOperationsInput | $Enums.WorkspaceMemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceMemberUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: StringFieldUpdateOperationsInput | string
    role?: EnumWorkspaceMemberRoleFieldUpdateOperationsInput | $Enums.WorkspaceMemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    tags?: ConversationUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneWithoutConversationsNestedInput
    nodes?: NodeUpdateManyWithoutConversationNestedInput
    aiRequests?: AiRequestUpdateManyWithoutConversationNestedInput
    documents?: DocumentUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    workspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    tags?: ConversationUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nodes?: NodeUncheckedUpdateManyWithoutConversationNestedInput
    aiRequests?: AiRequestUncheckedUpdateManyWithoutConversationNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateManyWithoutOwnerInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    workspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    tags?: ConversationUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NodeUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutNodesNestedInput
    parent?: NodeUpdateOneWithoutChildrenNestedInput
    children?: NodeUpdateManyWithoutParentNestedInput
    parentBlock?: BlockUpdateOneWithoutBranchesNestedInput
    blocks?: BlockUpdateManyWithoutNodeNestedInput
    aiRequests?: AiRequestUpdateManyWithoutNodeNestedInput
  }

  export type NodeUncheckedUpdateWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    parentNodeId?: NullableStringFieldUpdateOperationsInput | string | null
    parentBlockId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: NodeUncheckedUpdateManyWithoutParentNestedInput
    blocks?: BlockUncheckedUpdateManyWithoutNodeNestedInput
    aiRequests?: AiRequestUncheckedUpdateManyWithoutNodeNestedInput
  }

  export type NodeUncheckedUpdateManyWithoutCreatedByInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    parentNodeId?: NullableStringFieldUpdateOperationsInput | string | null
    parentBlockId?: NullableStringFieldUpdateOperationsInput | string | null
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiRequestUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumAiRequestStatusFieldUpdateOperationsInput | $Enums.AiRequestStatus
    model?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    outputTokens?: IntFieldUpdateOperationsInput | number
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conversation?: ConversationUpdateOneRequiredWithoutAiRequestsNestedInput
    node?: NodeUpdateOneWithoutAiRequestsNestedInput
  }

  export type AiRequestUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    nodeId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAiRequestStatusFieldUpdateOperationsInput | $Enums.AiRequestStatus
    model?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    outputTokens?: IntFieldUpdateOperationsInput | number
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AiRequestUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    nodeId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAiRequestStatusFieldUpdateOperationsInput | $Enums.AiRequestStatus
    model?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    outputTokens?: IntFieldUpdateOperationsInput | number
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type WorkspaceMemberCreateManyWorkspaceInput = {
    id?: string
    userId: string
    role?: $Enums.WorkspaceMemberRole
    joinedAt?: Date | string
  }

  export type ConversationCreateManyWorkspaceInput = {
    id?: string
    title: string
    description?: string | null
    ownerId: string
    isFavorite?: boolean
    tags?: ConversationCreatetagsInput | string[]
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DocumentCreateManyWorkspaceInput = {
    id?: string
    conversationId?: string | null
    title: string
    url?: string | null
    createdAt?: Date | string
  }

  export type WorkspaceMemberUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    role?: EnumWorkspaceMemberRoleFieldUpdateOperationsInput | $Enums.WorkspaceMemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutWorkspaceMembersNestedInput
  }

  export type WorkspaceMemberUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumWorkspaceMemberRoleFieldUpdateOperationsInput | $Enums.WorkspaceMemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type WorkspaceMemberUncheckedUpdateManyWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    role?: EnumWorkspaceMemberRoleFieldUpdateOperationsInput | $Enums.WorkspaceMemberRole
    joinedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ConversationUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    tags?: ConversationUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    owner?: UserUpdateOneRequiredWithoutConversationsNestedInput
    nodes?: NodeUpdateManyWithoutConversationNestedInput
    aiRequests?: AiRequestUpdateManyWithoutConversationNestedInput
    documents?: DocumentUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    tags?: ConversationUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nodes?: NodeUncheckedUpdateManyWithoutConversationNestedInput
    aiRequests?: AiRequestUncheckedUpdateManyWithoutConversationNestedInput
    documents?: DocumentUncheckedUpdateManyWithoutConversationNestedInput
  }

  export type ConversationUncheckedUpdateManyWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    ownerId?: StringFieldUpdateOperationsInput | string
    isFavorite?: BoolFieldUpdateOperationsInput | boolean
    tags?: ConversationUpdatetagsInput | string[]
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneWithoutDocumentsNestedInput
    chunks?: DocumentChunkUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunks?: DocumentChunkUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateManyWithoutWorkspaceInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NodeCreateManyConversationInput = {
    id?: string
    parentNodeId?: string | null
    parentBlockId?: string | null
    createdById: string
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AiRequestCreateManyConversationInput = {
    id?: string
    nodeId?: string | null
    userId: string
    status?: $Enums.AiRequestStatus
    model: string
    promptTokens?: number
    outputTokens?: number
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type DocumentCreateManyConversationInput = {
    id?: string
    workspaceId?: string | null
    title: string
    url?: string | null
    createdAt?: Date | string
  }

  export type NodeUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    parent?: NodeUpdateOneWithoutChildrenNestedInput
    children?: NodeUpdateManyWithoutParentNestedInput
    parentBlock?: BlockUpdateOneWithoutBranchesNestedInput
    createdBy?: UserUpdateOneRequiredWithoutNodesNestedInput
    blocks?: BlockUpdateManyWithoutNodeNestedInput
    aiRequests?: AiRequestUpdateManyWithoutNodeNestedInput
  }

  export type NodeUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentNodeId?: NullableStringFieldUpdateOperationsInput | string | null
    parentBlockId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: NodeUncheckedUpdateManyWithoutParentNestedInput
    blocks?: BlockUncheckedUpdateManyWithoutNodeNestedInput
    aiRequests?: AiRequestUncheckedUpdateManyWithoutNodeNestedInput
  }

  export type NodeUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    parentNodeId?: NullableStringFieldUpdateOperationsInput | string | null
    parentBlockId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiRequestUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumAiRequestStatusFieldUpdateOperationsInput | $Enums.AiRequestStatus
    model?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    outputTokens?: IntFieldUpdateOperationsInput | number
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    node?: NodeUpdateOneWithoutAiRequestsNestedInput
    user?: UserUpdateOneRequiredWithoutAiRequestsNestedInput
  }

  export type AiRequestUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nodeId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumAiRequestStatusFieldUpdateOperationsInput | $Enums.AiRequestStatus
    model?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    outputTokens?: IntFieldUpdateOperationsInput | number
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AiRequestUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    nodeId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumAiRequestStatusFieldUpdateOperationsInput | $Enums.AiRequestStatus
    model?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    outputTokens?: IntFieldUpdateOperationsInput | number
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type DocumentUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    workspace?: WorkspaceUpdateOneWithoutDocumentsNestedInput
    chunks?: DocumentChunkUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    chunks?: DocumentChunkUncheckedUpdateManyWithoutDocumentNestedInput
  }

  export type DocumentUncheckedUpdateManyWithoutConversationInput = {
    id?: StringFieldUpdateOperationsInput | string
    workspaceId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    url?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NodeCreateManyParentInput = {
    id?: string
    conversationId: string
    parentBlockId?: string | null
    createdById: string
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlockCreateManyNodeInput = {
    id?: string
    type: $Enums.BlockType
    content?: string
    position: number
    language?: string | null
    calloutType?: $Enums.CalloutType | null
    createdAt?: Date | string
  }

  export type AiRequestCreateManyNodeInput = {
    id?: string
    conversationId: string
    userId: string
    status?: $Enums.AiRequestStatus
    model: string
    promptTokens?: number
    outputTokens?: number
    durationMs?: number | null
    error?: string | null
    createdAt?: Date | string
    completedAt?: Date | string | null
  }

  export type NodeUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutNodesNestedInput
    children?: NodeUpdateManyWithoutParentNestedInput
    parentBlock?: BlockUpdateOneWithoutBranchesNestedInput
    createdBy?: UserUpdateOneRequiredWithoutNodesNestedInput
    blocks?: BlockUpdateManyWithoutNodeNestedInput
    aiRequests?: AiRequestUpdateManyWithoutNodeNestedInput
  }

  export type NodeUncheckedUpdateWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    parentBlockId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: NodeUncheckedUpdateManyWithoutParentNestedInput
    blocks?: BlockUncheckedUpdateManyWithoutNodeNestedInput
    aiRequests?: AiRequestUncheckedUpdateManyWithoutNodeNestedInput
  }

  export type NodeUncheckedUpdateManyWithoutParentInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    parentBlockId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type BlockUpdateWithoutNodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumBlockTypeFieldUpdateOperationsInput | $Enums.BlockType
    content?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    calloutType?: NullableEnumCalloutTypeFieldUpdateOperationsInput | $Enums.CalloutType | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: BlockItemUpdateManyWithoutBlockNestedInput
    branches?: NodeUpdateManyWithoutParentBlockNestedInput
  }

  export type BlockUncheckedUpdateWithoutNodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumBlockTypeFieldUpdateOperationsInput | $Enums.BlockType
    content?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    calloutType?: NullableEnumCalloutTypeFieldUpdateOperationsInput | $Enums.CalloutType | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    items?: BlockItemUncheckedUpdateManyWithoutBlockNestedInput
    branches?: NodeUncheckedUpdateManyWithoutParentBlockNestedInput
  }

  export type BlockUncheckedUpdateManyWithoutNodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumBlockTypeFieldUpdateOperationsInput | $Enums.BlockType
    content?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    language?: NullableStringFieldUpdateOperationsInput | string | null
    calloutType?: NullableEnumCalloutTypeFieldUpdateOperationsInput | $Enums.CalloutType | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AiRequestUpdateWithoutNodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumAiRequestStatusFieldUpdateOperationsInput | $Enums.AiRequestStatus
    model?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    outputTokens?: IntFieldUpdateOperationsInput | number
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    conversation?: ConversationUpdateOneRequiredWithoutAiRequestsNestedInput
    user?: UserUpdateOneRequiredWithoutAiRequestsNestedInput
  }

  export type AiRequestUncheckedUpdateWithoutNodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumAiRequestStatusFieldUpdateOperationsInput | $Enums.AiRequestStatus
    model?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    outputTokens?: IntFieldUpdateOperationsInput | number
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type AiRequestUncheckedUpdateManyWithoutNodeInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    status?: EnumAiRequestStatusFieldUpdateOperationsInput | $Enums.AiRequestStatus
    model?: StringFieldUpdateOperationsInput | string
    promptTokens?: IntFieldUpdateOperationsInput | number
    outputTokens?: IntFieldUpdateOperationsInput | number
    durationMs?: NullableIntFieldUpdateOperationsInput | number | null
    error?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    completedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type BlockItemCreateManyBlockInput = {
    id?: string
    content: string
    position: number
  }

  export type NodeCreateManyParentBlockInput = {
    id?: string
    conversationId: string
    parentNodeId?: string | null
    createdById: string
    type: $Enums.NodeType
    role: $Enums.Role
    content?: string | null
    depth?: number
    path: string
    position?: number
    isCollapsed?: boolean
    embedding?: NodeCreateembeddingInput | number[]
    summarySnapshot?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type BlockItemUpdateWithoutBlockInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type BlockItemUncheckedUpdateWithoutBlockInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type BlockItemUncheckedUpdateManyWithoutBlockInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
  }

  export type NodeUpdateWithoutParentBlockInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    conversation?: ConversationUpdateOneRequiredWithoutNodesNestedInput
    parent?: NodeUpdateOneWithoutChildrenNestedInput
    children?: NodeUpdateManyWithoutParentNestedInput
    createdBy?: UserUpdateOneRequiredWithoutNodesNestedInput
    blocks?: BlockUpdateManyWithoutNodeNestedInput
    aiRequests?: AiRequestUpdateManyWithoutNodeNestedInput
  }

  export type NodeUncheckedUpdateWithoutParentBlockInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    parentNodeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    children?: NodeUncheckedUpdateManyWithoutParentNestedInput
    blocks?: BlockUncheckedUpdateManyWithoutNodeNestedInput
    aiRequests?: AiRequestUncheckedUpdateManyWithoutNodeNestedInput
  }

  export type NodeUncheckedUpdateManyWithoutParentBlockInput = {
    id?: StringFieldUpdateOperationsInput | string
    conversationId?: StringFieldUpdateOperationsInput | string
    parentNodeId?: NullableStringFieldUpdateOperationsInput | string | null
    createdById?: StringFieldUpdateOperationsInput | string
    type?: EnumNodeTypeFieldUpdateOperationsInput | $Enums.NodeType
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    content?: NullableStringFieldUpdateOperationsInput | string | null
    depth?: IntFieldUpdateOperationsInput | number
    path?: StringFieldUpdateOperationsInput | string
    position?: IntFieldUpdateOperationsInput | number
    isCollapsed?: BoolFieldUpdateOperationsInput | boolean
    embedding?: NodeUpdateembeddingInput | number[]
    summarySnapshot?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DocumentChunkCreateManyDocumentInput = {
    id?: string
    content: string
    embedding?: DocumentChunkCreateembeddingInput | number[]
    position?: number
  }

  export type DocumentChunkUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    embedding?: DocumentChunkUpdateembeddingInput | number[]
    position?: IntFieldUpdateOperationsInput | number
  }

  export type DocumentChunkUncheckedUpdateWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    embedding?: DocumentChunkUpdateembeddingInput | number[]
    position?: IntFieldUpdateOperationsInput | number
  }

  export type DocumentChunkUncheckedUpdateManyWithoutDocumentInput = {
    id?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    embedding?: DocumentChunkUpdateembeddingInput | number[]
    position?: IntFieldUpdateOperationsInput | number
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WorkspaceCountOutputTypeDefaultArgs instead
     */
    export type WorkspaceCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WorkspaceCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ConversationCountOutputTypeDefaultArgs instead
     */
    export type ConversationCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ConversationCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NodeCountOutputTypeDefaultArgs instead
     */
    export type NodeCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NodeCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BlockCountOutputTypeDefaultArgs instead
     */
    export type BlockCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BlockCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DocumentCountOutputTypeDefaultArgs instead
     */
    export type DocumentCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DocumentCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WorkspaceDefaultArgs instead
     */
    export type WorkspaceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WorkspaceDefaultArgs<ExtArgs>
    /**
     * @deprecated Use WorkspaceMemberDefaultArgs instead
     */
    export type WorkspaceMemberArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = WorkspaceMemberDefaultArgs<ExtArgs>
    /**
     * @deprecated Use ConversationDefaultArgs instead
     */
    export type ConversationArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = ConversationDefaultArgs<ExtArgs>
    /**
     * @deprecated Use NodeDefaultArgs instead
     */
    export type NodeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = NodeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BlockDefaultArgs instead
     */
    export type BlockArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BlockDefaultArgs<ExtArgs>
    /**
     * @deprecated Use BlockItemDefaultArgs instead
     */
    export type BlockItemArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = BlockItemDefaultArgs<ExtArgs>
    /**
     * @deprecated Use AiRequestDefaultArgs instead
     */
    export type AiRequestArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = AiRequestDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DocumentDefaultArgs instead
     */
    export type DocumentArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DocumentDefaultArgs<ExtArgs>
    /**
     * @deprecated Use DocumentChunkDefaultArgs instead
     */
    export type DocumentChunkArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = DocumentChunkDefaultArgs<ExtArgs>

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