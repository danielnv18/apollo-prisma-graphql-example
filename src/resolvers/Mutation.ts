import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { IMutation, ITypes } from "../generated/resolvers";

export const Mutation: IMutation.Resolver<ITypes> = {
	signin: async (root, { email, password }, ctx, payload) => {
    // 1. check if there is a user with that email
    const user = await ctx.database.query.user({ where: { email } });
    if (!user) {
      throw new Error(`No such user found for email ${email}`);
    }
    // 2. Check if their password is correct
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new Error('Invalid Password!');
    }
    // 3. generate the JWT Token
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // 4. Set the cookie with the token
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365
    });
    // 5. Return the user
    return user;
  },
	signup: async (root, args, ctx, payload) => {
		// lowercase their email
		const email = args.email.toLowerCase();
		// hash their password
		const password = await bcrypt.hash(args.password, 10);
		// create the user in the database
    const user = await ctx.database.mutation.createUser(
      {
        data: {
          ...args,
					email,
					password,
        }
      },
      payload
		);
		// create the JWT token for them
    const token = jwt.sign(
      {
        userId: user.id
      },
      process.env.APP_SECRET
		);
		// We set the jwt as a cookie on the response
    ctx.response.cookie('token', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // 1 year cookie
		});
		// return the user to the browser
    return user;
	}
}
