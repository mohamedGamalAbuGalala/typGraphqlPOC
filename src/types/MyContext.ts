import { IMe } from './IMe'

export interface MyContext {
  secret: string
  token: string | undefined
  me?: IMe
}
