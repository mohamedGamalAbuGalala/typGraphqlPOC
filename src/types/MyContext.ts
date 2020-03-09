import { Session } from 'neo4j-driver'

export interface MyContext {
  session: Session
  secret: string
  token: string | undefined
}
