import { MiddlewareFn } from 'type-graphql'
import { MyContext } from 'src/types/MyContext'

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  if (!context.me) throw new Error('not authenticated')
  return next()
}
