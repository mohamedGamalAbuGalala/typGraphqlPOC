import { MiddlewareFn } from 'type-graphql'
import { MyContext } from 'src/types/MyContext'

export const ErrorInterceptor: MiddlewareFn<MyContext> = async (
  { context, info },
  next
) => {
  try {
    return await next()
  } catch (err) {
    // write error to file log
    console.log(
      `ErrorInterceptor ----------------\n
      Error => ${JSON.stringify(err, undefined, 2)}\n
      context => ${JSON.stringify(context, undefined, 2)}\n
      info => ${JSON.stringify(info, undefined, 2)}\n`
    )

    // rethrow the error
    throw err
  }
}
