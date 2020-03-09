import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
// import { createConnection } from 'typeorm'
import { driver, auth } from 'neo4j-driver'

import { RegisterResolver } from './modules/user/Register'
import { LoginResolver } from './modules/user/Login'
import { MyContext } from './types/MyContext'
import { MeResolver } from './modules/user/Me'

const main = async () => {
  // await createConnection()

  const schema = await buildSchema({
    resolvers: [RegisterResolver, LoginResolver, MeResolver]
  })

  // Connect Neo4j database and attach it to the session
  const driverInstance = driver(
    'bolt://localhost:7687',
    auth.basic('neo4j', 'local')
  )

  const server = new ApolloServer({
    schema,
    context: ({ req }): MyContext => {
      const session = driverInstance.session()

      return {
        session,
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
