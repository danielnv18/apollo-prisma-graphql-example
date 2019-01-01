import { IResolvers, ITypes } from '../generated/resolvers'

import { Query } from './Query'
import { Mutation } from './Mutation'
// import { User } from './User'

export const resolvers: IResolvers<ITypes> = {
  Query,
	Mutation
}
