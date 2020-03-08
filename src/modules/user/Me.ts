import { Resolver, Ctx, Query } from 'type-graphql'
import jwt from 'jsonwebtoken'
import { User } from '../../entity/User'
import { MyContext } from '../../types/MyContext'

@Resolver()
export class MeResolver {
  @Query(() => User, { nullable: true })
  async me (@Ctx() ctx: MyContext): Promise<User | undefined> {
    try {
      const token = ctx.token?.replace('Bearer ', '')
      if (!token) return undefined

      const decoded = <User | undefined>jwt.verify(token, ctx.secret)
      if (!decoded?.id) return undefined

      const user = await User.findOne({
        where: {
          id: decoded.id
        }
      })

      if (!user) return undefined

      return user
    } catch (error) {
      return undefined
    }
  }
}
