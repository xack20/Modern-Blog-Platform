import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Role } from '../../../common/enums/role.enum';
import { Profile } from './profile.entity';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  username: string;

  @Field(() => Role)
  role: Role;

  @Field(() => Profile, { nullable: true })
  profile?: Profile;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
