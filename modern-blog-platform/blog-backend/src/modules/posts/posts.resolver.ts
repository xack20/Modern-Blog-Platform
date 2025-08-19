import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { CurrentUser, GqlAuthGuard, Roles, RolesGuard } from '../../common';
import { User } from '../users/entities/user.entity';
import { CreatePostInput } from './dto/create-post.input';
import { PostsFilterInput } from './dto/posts-filter.input';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';
import { PostsService } from './posts.service';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private postsService: PostsService) {}

  @Query(() => [Post])
  async posts(@Args('filters', { nullable: true }) filters?: PostsFilterInput) {
    return this.postsService.findAll(filters);
  }

  @Query(() => Post)
  async post(@Args('id', { type: () => ID }) id: string) {
    return this.postsService.findOne(id);
  }

  @Query(() => Post)
  async postBySlug(@Args('slug') slug: string) {
    return this.postsService.findBySlug(slug);
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard)
  async createPost(
    @CurrentUser() user: User,
    @Args('input') createPostInput: CreatePostInput,
  ) {
    return this.postsService.create(user.id, createPostInput);
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  async updatePost(@Args('input') updatePostInput: UpdatePostInput) {
    return this.postsService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deletePost(@Args('id', { type: () => ID }) id: string) {
    return this.postsService.remove(id);
  }
}
