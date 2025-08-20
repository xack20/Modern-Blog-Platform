import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class BlogStats {
  @Field(() => Int)
  totalPosts: number;

  @Field(() => Int)
  totalComments: number;

  @Field(() => Int)
  totalUsers: number;

  @Field(() => Int)
  totalViews: number;

  @Field(() => Int)
  totalCategories: number;

  @Field(() => Int)
  totalTags: number;

  @Field(() => Int)
  totalMedia: number;
}

@ObjectType()
export class RecentActivity {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  createdAt: Date;

  @Field({ nullable: true })
  userId: string;

  @Field({ nullable: true })
  username: string;
}
