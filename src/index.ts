import 'reflect-metadata'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { RegisterResolver } from './modules/user/Register'

const main = async () => {
  await createConnection()

  const schema = await buildSchema({
    resolvers: [RegisterResolver]
  })

  const server = new ApolloServer({ schema })

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

main()
