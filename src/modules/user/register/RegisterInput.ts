import { Field, InputType } from 'type-graphql'
import { Length, IsEmail } from 'class-validator'
import { IsEmailAlreadyExist } from './IsEmailAlreadyExist'
import { PasswordInput } from '../../shared/PasswordInput'

@InputType()
export class RegisterInput extends PasswordInput {
  @Field()
  @Length(1, 255, {
    message: 'first name must be minimum 1 and maximum 255 char'
  })
  firstName: string

  @Field()
  @Length(1, 255)
  lastName: string

  @Field()
  @IsEmail()
  @IsEmailAlreadyExist({ message: 'Email already used' })
  email: string
}
