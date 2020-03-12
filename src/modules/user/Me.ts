import { Resolver, Ctx, Query, UseMiddleware } from 'type-graphql'
import { User } from '../../entity/User'
import { MyContext } from '../../types/MyContext'
import { isAuth } from '../middleware/isAuth'

@Resolver()
export class MeResolver {
  @UseMiddleware(isAuth)
  @Query(() => User, { nullable: true })
  async me (@Ctx() ctx: MyContext): Promise<User | undefined> {
    try {
      const token = ctx.token?.replace('Bearer ', '')
      if (!token) return undefined

      const user = await User.findOne({
        where: {
          id: ctx.me!.id
        }
      })

      if (!user) return undefined

      return user
    } catch (error) {
      return undefined
    }
  }
}
