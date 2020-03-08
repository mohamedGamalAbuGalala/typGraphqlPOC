import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { RegisterResolver } from './modules/user/Register'
import { LoginResolver } from './modules/user/Login'
import { MyContext } from './types/MyContext'
import { MeResolver } from './modules/user/Me'

const main = async () => {
  await createConnection()

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, MeResolver]
  })

  const server = new ApolloServer({
    schema,
    context: ({ req }): MyContext => {
      return {
        secret:
          'zxcvbnnmm,.asdffgghhjkkll;qwerttyyyuiiooppp[[]\\123344556667788999000--==',
        token: req.headers.authorization
      }
    }
  })

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

main()
