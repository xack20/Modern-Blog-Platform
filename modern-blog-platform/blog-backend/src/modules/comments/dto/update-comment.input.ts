import { Field, ID, InputType } from '@nestjs/graphql';
import { CommentStatus } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

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
