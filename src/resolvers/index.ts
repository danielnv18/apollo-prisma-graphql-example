import { IResolvers, ITypes } from '../generated/resolvers'

import { Mutation } from './Mutation'
import { Query } from './Query'
import { User } from './User'

export const resolvers: IResolvers<ITypes> = {
	Mutation,
	Query,
	User
}
