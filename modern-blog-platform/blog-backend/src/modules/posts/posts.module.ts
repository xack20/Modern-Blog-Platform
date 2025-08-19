import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma.module';
import { PostsResolver } from './posts.resolver';
import { PostsService } from './posts.service';

@Module({
  imports: [PrismaModule],
  providers: [PostsService, PostsResolver],
  exports: [PostsService],
})
export class PostsModule {}
