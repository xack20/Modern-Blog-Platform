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
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { CommentStatus } from '../../common/enums/comment-status.enum';
import { Role } from '../../common/enums/role.enum';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CommentsService } from './comments.service';
import { CommentsFilterInput } from './dto/comments-filter.input';
import { CreateCommentInput } from './dto/create-comment.input';
import { UpdateCommentInput } from './dto/update-comment.input';
import { Comment } from './entities/comment.entity';

@Resolver(() => Comment)
export class CommentsResolver {
  constructor(private readonly commentsService: CommentsService) {}

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard)
  createComment(
    @CurrentUser() user,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    return this.commentsService.create(user.id, createCommentInput);
  }

  @Query(() => [Comment], { name: 'comments' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  findAll(@Args('filters', { nullable: true }) filters?: CommentsFilterInput) {
    return this.commentsService.findAll(filters);
  }

  @Query(() => [Comment], { name: 'publicComments' })
  findPublicComments(@Args('postId', { type: () => ID }) postId: string) {
    return this.commentsService.getCommentsByPostId(
      postId,
      CommentStatus.APPROVED,
    );
  }

  @Query(() => Comment, { name: 'comment' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.commentsService.findOne(id);
  }

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard)
  updateComment(
    @CurrentUser() user,
    @Args('updateCommentInput') updateCommentInput: UpdateCommentInput,
  ) {
    // First check if the user is the author or has proper roles
    return this.commentsService.update(
      updateCommentInput.id,
      updateCommentInput,
    );
  }

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard)
  removeComment(
    @CurrentUser() user,
    @Args('id', { type: () => ID }) id: string,
  ) {
    // First check if the user is the author or has proper roles
    return this.commentsService.remove(id);
  }

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  approveComment(@Args('id', { type: () => ID }) id: string) {
    return this.commentsService.approveComment(id);
  }

  @Mutation(() => Comment)
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.EDITOR)
  rejectComment(@Args('id', { type: () => ID }) id: string) {
    return this.commentsService.rejectComment(id);
  }

  @Query(() => [Comment], { name: 'userComments' })
  @UseGuards(GqlAuthGuard)
  getUserComments(@CurrentUser() user) {
    return this.commentsService.getCommentsByUserId(user.id);
  }

  // Resolve fields if needed
  @ResolveField('replies', () => [Comment])
  async getReplies(@Parent() comment: Comment) {
    // We can use the loaded relation if it exists
    if (comment.replies) {
      return comment.replies;
    }

    // Otherwise query for them
    const { id } = comment;
    return this.commentsService.findAll({
      onlyRootComments: false,
      postId: comment.postId,
    });
  }
}
