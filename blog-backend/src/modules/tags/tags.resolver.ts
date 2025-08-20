import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { CurrentUser, GqlAuthGuard, Roles, RolesGuard } from '../../common';
import { User } from '../users/entities/user.entity';
import { CreateTagInput } from './dto/create-tag.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { Tag } from './entities/tag.entity';
import { TagsService } from './tags.service';

@Resolver(() => Tag)
export class TagsResolver {
  constructor(private tagsService: TagsService) {}

  @Query(() => [Tag])
  async tags() {
    return this.tagsService.findAll();
  }

  @Query(() => Tag)
  async tag(@Args('id', { type: () => ID }) id: string) {
    return this.tagsService.findOne(id);
  }

  @Query(() => Tag)
  async tagBySlug(@Args('slug') slug: string) {
    return this.tagsService.findBySlug(slug);
  }

  @Mutation(() => Tag)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  async createTag(
    @CurrentUser() user: User,
    @Args('input') createTagInput: CreateTagInput,
  ) {
    return this.tagsService.create(createTagInput);
  }

  @Mutation(() => Tag)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  async updateTag(@Args('input') updateTagInput: UpdateTagInput) {
    return this.tagsService.update(updateTagInput.id, updateTagInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async deleteTag(@Args('id', { type: () => ID }) id: string) {
    return this.tagsService.remove(id);
  }
}
