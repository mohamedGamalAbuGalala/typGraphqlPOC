import { driver, auth, Session } from 'neo4j-driver'

let neoSession: Session

export const getSession = (): Session => {
  if (neoSession) return neoSession

  // Connect Neo4j database and attach it to the session
  const driverInstance = driver(
    'bolt://localhost:7687',
    auth.basic('neo4j', 'local')
  )
  neoSession = driverInstance.session()

  return neoSession
}
