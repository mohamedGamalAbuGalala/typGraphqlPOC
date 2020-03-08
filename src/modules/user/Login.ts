import { Resolver, Mutation, Arg, Ctx, ObjectType, Field } from 'type-graphql'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { User } from '../../entity/User'
import { MyContext } from '../../types/MyContext'

@ObjectType()
class LoginResponse {
  @Field()
  token: String

  @Field()
  user: User
}

@Resolver()
export class LoginResolver {
  @Mutation(() => LoginResponse, { nullable: true })
  async login (
    @Arg('email') email: string,
    @Arg('password') password: string,
    @Ctx() ctx: MyContext
  ): Promise<LoginResponse | null> {
    const user = await User.findOne({ where: { email } })

    if (!user) return null

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) return null

    const token = jwt.sign({ email, id: user.id }, ctx.secret, {
      expiresIn: '60m'
    })

    return { token, user }
  }
}
