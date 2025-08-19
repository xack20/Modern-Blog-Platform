import { Field, ID, InputType } from '@nestjs/graphql';
import { PostStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreatePostInput } from './create-post.input';

@InputType()
export class UpdatePostInput extends CreatePostInput {
  @Field(() => ID)
  @IsNotEmpty()
  id: string;

  @Field(() => PostStatus, { nullable: true })
  @IsEnum(PostStatus)
  @IsOptional()
  declare status?: PostStatus;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  slug?: string;
}
