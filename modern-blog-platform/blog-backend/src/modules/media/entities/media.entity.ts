import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Media {
  @Field(() => ID)
  id: string;

  @Field()
  filename: string;

  @Field()
  url: string;

  @Field()
  key: string;

  @Field()
  type: string;

  @Field()
  size: number;

  @Field()
  userId: string;

  @Field(() => User)
  user: User;

  @Field()
  createdAt: Date;
}
