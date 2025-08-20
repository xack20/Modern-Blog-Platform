import { Field, ID, InputType } from '@nestjs/graphql';
import {
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    MaxLength,
} from 'class-validator';
import { CommentStatus } from '../../../common/enums/comment-status.enum';

@InputType()
export class UpdateCommentInput {
  @Field(() => ID)
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  content?: string;

  @Field(() => CommentStatus, { nullable: true })
  @IsEnum(CommentStatus)
  @IsOptional()
  status?: CommentStatus;
}
