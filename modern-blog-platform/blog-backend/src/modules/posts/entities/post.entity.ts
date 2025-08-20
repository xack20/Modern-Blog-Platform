import { Field, ID, ObjectType } from '@nestjs/graphql';
import { PostStatus } from '../../../common/enums/post-status.enum';
import { Category } from '../../categories/entities/category.entity';
import { Tag } from '../../tags/entities/tag.entity';
import { User } from '../../users/entities/user.entity';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field()
  slug: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  excerpt?: string;

  @Field({ nullable: true })
  featuredImage?: string;

  @Field({ nullable: true })
  featured?: boolean;

  @Field(() => PostStatus)
  status: PostStatus;

  @Field({ nullable: true })
  seoTitle?: string;

  @Field({ nullable: true })
  seoDescription?: string;

  @Field()
  views: number;

  @Field()
  authorId: string;

  @Field(() => User)
  author: any; // Using any to avoid circular dependency

  @Field({ nullable: true })
  categoryId?: string;

  @Field(() => Category, { nullable: true })
  category?: any;

  @Field(() => [Tag], { nullable: 'items' })
  tags?: any[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  publishedAt?: Date;
}
