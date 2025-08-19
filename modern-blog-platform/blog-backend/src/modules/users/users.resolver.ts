import { UseGuards } from '@nestjs/common';
import {
    Args,
    ID,
    Mutation,
    Parent,
    Query,
    ResolveField,
    Resolver,
} from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { PrismaService } from '../../prisma.service';
import { Comment } from '../comments/entities/comment.entity';
import { Media } from '../media';
import { Post } from '../posts/entities/post.entity';
import { UpdateProfileInput } from './dto/update-profile.input';
import { UpdateUserInput } from './dto/update-user.input';
import { Profile } from './entities/profile.entity';
import { User } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly prisma: PrismaService,
  ) {}

  @Query(() => [User], { name: 'users' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => User, { name: 'user' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => User, { name: 'userByUsername' })
  findByUsername(@Args('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  @Query(() => User, { name: 'me' })
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: { id: string }) {
    return this.usersService.findOne(user.id);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  updateUser(
    @CurrentUser() user: { id: string },
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    // In a real application, you'd verify the user has permission to update
    return this.usersService.update(user.id, updateUserInput);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  updateAnyUser(
    @Args('id', { type: () => ID }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.usersService.update(id, updateUserInput);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard)
  updateProfile(
    @CurrentUser() user: { id: string },
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
    return this.usersService.updateProfile(user.id, updateProfileInput);
  }

  @Mutation(() => User)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  removeUser(@Args('id', { type: () => ID }) id: string) {
    return this.usersService.remove(id);
  }

  // Resolver field for posts
  @ResolveField('posts', () => [Post])
  async getPosts(@Parent() user: User) {
    return this.prisma.post.findMany({
      where: {
        authorId: user.id,
      },
    });
  }

  // Resolver field for comments
  @ResolveField('comments', () => [Comment])
  async getComments(@Parent() user: User) {
    return this.prisma.comment.findMany({
      where: {
        authorId: user.id,
      },
    });
  }

  // Resolver field for media
  @ResolveField('media', () => [Media])
  async getMedia(@Parent() user: User) {
    return this.prisma.media.findMany({
      where: {
        userId: user.id,
      },
    });
  }

  // Resolver field for profile
  @ResolveField('profile', () => Profile, { nullable: true })
  async getProfile(@Parent() user: User) {
    if (user.profile) return user.profile as Profile;

    return this.prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
    });
  }
}
