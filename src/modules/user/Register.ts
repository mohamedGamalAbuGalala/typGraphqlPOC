import { Resolver, Query, Mutation, Arg, Authorized } from 'type-graphql'
import bcrypt from 'bcryptjs'
import { User } from '../../entity/User'
import { RegisterInput } from './register/RegisterInput'

@Resolver()
export class RegisterResolver {
  @Authorized()
  @Query(() => String, { name: 'helloWorld' })
  async helloWorld () {
    return 'Hello World!'
  }

  @Mutation(() => User)
  async register (
    @Arg('data') { email, firstName, lastName, password }: RegisterInput
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
