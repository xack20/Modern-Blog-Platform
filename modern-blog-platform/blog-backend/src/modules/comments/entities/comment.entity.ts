import { Field, ID, ObjectType } from '@nestjs/graphql';
import { CommentStatus } from '@prisma/client';
import { Post } from '../../posts/entities/post.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Comment {
  @Field(() => ID)
  id: string;

  @Field()
  content: string;

  @Field(() => CommentStatus)
  status: CommentStatus;

  @Field()
  authorId: string;

  @Field(() => User)
  author: User;

  @Field()
  postId: string;

  @Field(() => Post)
  post: Post;

  @Field({ nullable: true })
  parentId?: string;

  @Field(() => Comment, { nullable: true })
  parent?: Comment;

  @Field(() => [Comment], { nullable: 'items' })
  replies?: Comment[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
