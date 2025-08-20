import { Field, ID, InputType } from '@nestjs/graphql';
import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { PostStatus } from '../../../common/enums/post-status.enum';
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
