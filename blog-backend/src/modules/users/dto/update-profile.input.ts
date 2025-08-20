import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

@InputType()
export class UpdateProfileInput {
  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @MaxLength(1000)
  bio?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUrl()
  avatar?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  @IsUrl()
  website?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  twitter?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  github?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  linkedin?: string;
}
