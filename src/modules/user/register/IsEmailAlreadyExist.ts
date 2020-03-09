import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator'
import { getSession } from '../../../startup/neo4jConnect'
import { QueryResult } from 'neo4j-driver'

@ValidatorConstraint({ async: true })
export class IsEmailAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  async validate (email: string) {
    try {
      const neoSession = getSession()
      console.log('111111111111111111111111111111111111 \n')

      const neoData: QueryResult = await neoSession.run(
        `
          MATCH (u:User {email: $email})
          RETURN u
      `,
        {
          email
        }
      )
      console.log('22222222222222222222222222222222222 \n')

      if (neoData.records?.length) {
        console.log(
          `------------------------------------------------------------------------------------------\n ${JSON.stringify(
            (neoData.records[0].toObject() as { u: { properties: any } })['u']
              .properties,
            undefined,
            4
          )}`
        )

        return false
      } else return true
    } catch (error) {
      console.log(
        'error -----------------------\n',
        JSON.stringify(error, undefined, 4)
      )
      return false
    }
  }
}

export function IsEmailAlreadyExist (validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsEmailAlreadyExistConstraint
    })
  }
}
