import { IQuery, ITypes } from "../generated/resolvers";

const Query: IQuery.Resolver<ITypes> = {
	me(root, args, ctx, payload) {
    // check if there is a current user ID
    if (!ctx.request.userId) {
      return null;
    }
    return ctx.db.query.user(
      {
        where: {
          id: ctx.request.userId
        }
      },
      payload
    );
  }
}

export  { Query };
