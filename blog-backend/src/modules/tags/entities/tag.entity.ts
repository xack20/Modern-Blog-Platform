import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from '../../posts/entities/post.entity';

@ObjectType()
export class Tag {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  slug: string;

  @Field(() => [Post], { nullable: 'items' })
  posts?: any[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
