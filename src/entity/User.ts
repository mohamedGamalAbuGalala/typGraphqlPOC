import { ObjectType, Field, ID, Root } from 'type-graphql'

interface IUser {
  id: string
  firstName: string
  lastName: string
  email: string
  password: string
}

@ObjectType()
export class User implements IUser {
  constructor ({ id, firstName, lastName, email, password }: IUser) {
    this.id = id
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
  }

  @Field(() => ID)
  id: string

  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  email: string

  password: string

  @Field()
  fullName (@Root() parent: User): string {
    return `${parent.firstName} ${parent.lastName}`
  }
}
