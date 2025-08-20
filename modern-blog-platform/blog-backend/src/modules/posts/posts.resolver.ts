import { UseGuards } from '@nestjs/common';
import { Args, ID, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
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

  @Query(() => [Post])
  async featuredPosts(
    @Args('limit', { type: () => Int, nullable: true }) limit?: number,
  ) {
    return this.postsService.findFeatured(limit);
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
  ): Promise<Post> {
    return this.postsService.create(user.id, createPostInput) as Promise<Post>;
  }

  @Mutation(() => Post)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  async updatePost(
    @Args('input') updatePostInput: UpdatePostInput,
  ): Promise<Post> {
    return this.postsService.update(
      updatePostInput.id,
      updatePostInput,
    ) as Promise<Post>;
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deletePost(@Args('id', { type: () => ID }) id: string) {
    return this.postsService.remove(id);
  }
}
