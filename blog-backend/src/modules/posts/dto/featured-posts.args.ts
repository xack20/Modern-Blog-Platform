import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class FeaturedPostsArgs {
  @Field(() => Int, { nullable: true })
  limit?: number;
}
