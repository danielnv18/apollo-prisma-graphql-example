import { IUser, ITypes } from "../generated/resolvers";

export interface UserParent {
	id: string
  name: string
	email: string
	password: string
}

export const User: IUser.Resolver<ITypes> = {
	id: parent => parent.id,
	name: parent => parent.name,
  email: parent => parent.email,
}
