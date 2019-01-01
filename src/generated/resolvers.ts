import { GraphQLResolveInfo } from "graphql";

export interface ResolverFn<Root, Args, Ctx, Payload> {
  (root: Root, args: Args, ctx: Ctx, info: GraphQLResolveInfo):
    | Payload
    | Promise<Payload>;
}

export interface ITypes {
  Context: any;

  MutationRoot: any;
  QueryRoot: any;
  UserRoot: any;
}

export namespace IMutation {
  export interface ArgsSignin {
    email: string;
    password: string;
  }

  export type SigninResolver<T extends ITypes> = ResolverFn<
    T["MutationRoot"],
    ArgsSignin,
    T["Context"],
    T["UserRoot"]
  >;

  export interface ArgsSignup {
    email: string;
    password: string;
    username: string;
  }

  export type SignupResolver<T extends ITypes> = ResolverFn<
    T["MutationRoot"],
    ArgsSignup,
    T["Context"],
    T["UserRoot"]
  >;

  export interface Resolver<T extends ITypes> {
    signin: SigninResolver<T>;
    signup: SignupResolver<T>;
  }
}

export namespace IQuery {
  export type MeResolver<T extends ITypes> = ResolverFn<
    T["QueryRoot"],
    {},
    T["Context"],
    T["UserRoot"]
  >;

  export interface Resolver<T extends ITypes> {
    me: MeResolver<T>;
  }
}

export namespace IUser {
  export type IdResolver<T extends ITypes> = ResolverFn<
    T["UserRoot"],
    {},
    T["Context"],
    string
  >;

  export type UsernameResolver<T extends ITypes> = ResolverFn<
    T["UserRoot"],
    {},
    T["Context"],
    string
  >;

  export type EmailResolver<T extends ITypes> = ResolverFn<
    T["UserRoot"],
    {},
    T["Context"],
    string
  >;

  export interface Resolver<T extends ITypes> {
    id: IdResolver<T>;
    username: UsernameResolver<T>;
    email: EmailResolver<T>;
  }
}

export interface IResolvers<T extends ITypes> {
  Mutation: IMutation.Resolver<T>;
  Query: IQuery.Resolver<T>;
  User: IUser.Resolver<T>;
}
