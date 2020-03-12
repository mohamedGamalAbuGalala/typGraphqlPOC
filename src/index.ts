import 'reflect-metadata'

import jwt from 'jsonwebtoken'
import { ApolloServer } from 'apollo-server'
import { buildSchema } from 'type-graphql'
import { createConnection } from 'typeorm'
import { MyContext } from './types/MyContext'
import { IMe } from './types/IMe'
import { ResolveTime } from './modules/middleware/ResolveTime'
import { ErrorInterceptor } from './modules/middleware/ErrorInterceptor'

const main = async () => {
  await createConnection()

  const schema = await buildSchema({
    resolvers: [__dirname + '/modules/**/*.ts'],
    authChecker: ({ context }: { context: MyContext }) => {
      return !!context.me
    },
    globalMiddlewares: [ResolveTime, ErrorInterceptor]
  })

  const server = new ApolloServer({
    schema,
    context: ({ req }): MyContext => {
      const ctx: MyContext = {
        secret:
          'zxcvbnnmm,.asdffgghhjkkll;qwerttyyyuiiooppp[[]\\123344556667788999000--==',
        token: req.headers.authorization
      }

      try {
        const token = req.headers['authorization']!.replace('Bearer ', '')
        ctx.me = jwt.verify(token, ctx.secret) as IMe
      } catch (error) {
        console.log('Un-authenticated access')
      }
      return ctx
    }
  })

  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`)
  })
}

main()
