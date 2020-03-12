import { Field, InputType } from 'type-graphql'
import { MinLength } from 'class-validator'

// ! this is very helpfull when you have 2 places have the same password validation
@InputType()
export class PasswordInput {
  @Field()
  @MinLength(5)
  password: string
}
