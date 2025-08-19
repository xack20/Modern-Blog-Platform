import { UseGuards } from '@nestjs/common';
import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Role } from '@prisma/client';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { GqlAuthGuard } from '../../common/guards/gql-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { CreateMediaInput } from './dto/create-media.input';
import { UploadFileInput } from './dto/upload-file.input';
import { Media } from './entities/media.entity';
import { FileUploadService } from './file-upload.service';
import { MediaService } from './media.service';

@Resolver(() => Media)
export class MediaResolver {
  constructor(
    private readonly mediaService: MediaService,
    private readonly fileUploadService: FileUploadService,
  ) {}

  @Mutation(() => Media)
  @UseGuards(GqlAuthGuard)
  createMedia(
    @CurrentUser() user,
    @Args('createMediaInput') createMediaInput: CreateMediaInput,
  ) {
    return this.mediaService.create(user.id, createMediaInput);
  }

  @Mutation(() => Media)
  @UseGuards(GqlAuthGuard)
  async uploadFile(
    @CurrentUser() user,
    @Args('uploadFileInput') uploadFileInput: UploadFileInput,
  ) {
    return await this.fileUploadService.uploadFile(
      uploadFileInput.file,
      user.id,
    );
  }

  @Query(() => [Media], { name: 'allMedia' })
  @UseGuards(GqlAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  findAll() {
    return this.mediaService.findAll();
  }

  @Query(() => [Media], { name: 'myMedia' })
  @UseGuards(GqlAuthGuard)
  findMyMedia(@CurrentUser() user) {
    return this.mediaService.findUserMedia(user.id);
  }

  @Query(() => Media, { name: 'media' })
  @UseGuards(GqlAuthGuard)
  findOne(@Args('id', { type: () => ID }) id: string) {
    return this.mediaService.findOne(id);
  }

  @Mutation(() => Media)
  @UseGuards(GqlAuthGuard)
  async removeMedia(
    @CurrentUser() user,
    @Args('id', { type: () => ID }) id: string,
  ) {
    // Get the media to be removed
    const media = await this.mediaService.findOne(id);

    if (!media) {
      throw new Error(`Media with ID ${id} not found`);
    }

    // Delete the file from S3
    await this.fileUploadService.deleteFile(media.key);

    // In a real application, you'd verify ownership or admin status here
    return this.mediaService.remove(id);
  }

  @Mutation(() => String)
  @UseGuards(GqlAuthGuard)
  async generatePresignedUrl(@Args('key') key: string) {
    return await this.fileUploadService.generatePresignedUrl(key);
  }
}
