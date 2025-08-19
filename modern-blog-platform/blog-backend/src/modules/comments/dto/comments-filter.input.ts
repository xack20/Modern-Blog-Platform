import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { CommentStatus } from '../../../common/enums/comment-status.enum';

@InputType()
export class CommentsFilterInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  searchTerm?: string;

  @Field({ nullable: true })
  @IsString()
  @IsUUID()
  @IsOptional()
  userId?: string;

  @Field({ nullable: true })
  @IsString()
  @IsUUID()
  @IsOptional()
  postId?: string;

  @Field(() => CommentStatus, { nullable: true })
  @IsEnum(CommentStatus)
  @IsOptional()
  status?: CommentStatus;

  @Field({ nullable: true })
  @IsOptional()
  take?: number;

  @Field({ nullable: true })
  @IsOptional()
  skip?: number;

  @Field(() => Boolean, { nullable: true })
  @IsOptional()
  onlyRootComments?: boolean;
}
