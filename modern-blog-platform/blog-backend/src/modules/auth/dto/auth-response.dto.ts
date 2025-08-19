import { Field, ObjectType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@ObjectType()
class UserInfo {
  @Field()
  id: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field()
  role: Role;
}

@ObjectType()
export class AuthResponse {
  @Field(() => UserInfo)
  user: UserInfo;

  @Field()
  access_token: string;
}
