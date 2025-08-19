import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateCommentInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @MaxLength(1000)
  content: string;

  @Field()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  postId: string;

  @Field({ nullable: true })
  @IsString()
  @IsUUID()
  @IsOptional()
  parentId?: string;
}
