import { Resolver, Query, Mutation, Arg, Ctx } from 'type-graphql'
import { v4 as uuid } from 'uuid'
import bcrypt from 'bcryptjs'
import { User } from '../../entity/User'
import { RegisterInput } from './register/RegisterInput'
import { MyContext } from '../../types/MyContext'

@Resolver()
export class RegisterResolver {
  @Query(() => String, { name: 'helloWorld' })
  async helloWorld () {
    return 'Hello World!'
  }

  @Mutation(() => User)
  async register (
    @Arg('data') { email, firstName, lastName, password }: RegisterInput,
    @Ctx() { session }: MyContext
  ): Promise<User> {
    const hashedPasword = await bcrypt.hash(password, 12)

    const user = new User({
      id: uuid(),
      email,
      firstName,
      lastName,
      password: hashedPasword
    })

    await session.run(
      `
        MERGE (u:User {email: $email})
        ON CREATE SET u.id = $id,
                      u.firstName = $firstName,
                      u.lastName=$lastName,
                      u.password= $password
        RETURN u
    `,
      {
        ...user
      }
    )

    // ! Creates userSettings With defaults
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    session.run(
      `
      MATCH (u:User {id: $userId})
      MERGE (s:UserSettings {userId: $userId})
              ON CREATE SET s.id = $settingsId, 
              s.userId = $userId,
              s.stringKey = $stringKeyValue,
              s.booleanKey = $booleanKeyValue,
              s.intKey = $intKeyValue
      MERGE (u)-[:HAS_SETTINGS]->(s)
              
      RETURN u,s
    `,
      {
        userId: user.id,
        settingsId: uuid(),
        stringKeyValue: 'stringKeyValue',
        booleanKeyValue: true,
        intKeyValue: 10
      }
    )

    return user
  }
}
