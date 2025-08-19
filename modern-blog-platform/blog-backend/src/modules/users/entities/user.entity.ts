import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from '@prisma/client';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field(() => Role)
  role: Role;

  // Using GraphQL type reference as string
  @Field({ nullable: true })
  profile?: any;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
