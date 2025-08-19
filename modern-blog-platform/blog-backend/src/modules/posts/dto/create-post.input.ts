import { Field, InputType } from '@nestjs/graphql';
import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    MaxLength,
    MinLength,
} from 'class-validator';
import { PostStatus } from '../../../common/enums/post-status.enum';

@InputType()
export class CreatePostInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  content: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(160)
  excerpt?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  featuredImage?: string;

  @Field(() => PostStatus, { defaultValue: PostStatus.DRAFT })
  @IsEnum(PostStatus)
  @IsOptional()
  status?: PostStatus;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(70)
  seoTitle?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(160)
  seoDescription?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @Field(() => [String], { nullable: 'items' })
  @IsOptional()
  tagIds?: string[];
}
