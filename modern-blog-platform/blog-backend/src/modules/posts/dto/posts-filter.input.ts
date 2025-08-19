import { Field, InputType, Int } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PostStatus } from '../../../common/enums/post-status.enum';

@InputType()
export class PostsFilterInput {
  @Field(() => PostStatus, { nullable: true })
  @IsEnum(PostStatus)
  @IsOptional()
  status?: PostStatus;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  tagId?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  authorId?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  limit?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  offset?: number;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  search?: string;
}
