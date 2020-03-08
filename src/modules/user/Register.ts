import { Resolver, Query, Mutation, Arg } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { User } from '../../entity/User'

@Resolver()
export class RegisterResolver {
  @Query(() => String, { name: 'helloWorld' })
  async helloWorld () {
    return 'Hello World!'
  }

  @Mutation(() => User)
  async register (
    @Arg('firstName') firstName: string,
    @Arg('lastName') lastName: string,
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const hashedPasword = await bcrypt.hash(password, 12)

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPasword
    }).save()

    return user
  }
}
