import { ITypes, IUser } from "../generated/resolvers";

export interface IUserParent {
	id: string
  username: string
	email: string
}

export const User: IUser.Resolver<ITypes> = {
	email: parent => parent.email,
	id: parent => parent.id,
	username: parent => parent.username,
}
