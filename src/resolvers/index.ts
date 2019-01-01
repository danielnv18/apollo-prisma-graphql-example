import { IResolvers, ITypes } from '../generated/resolvers'

import { Query } from './_Query'
import { Mutation } from './_Mutation'
// import { User } from './User'

export const resolvers: IResolvers<ITypes> = {
  Query,
	Mutation
}
