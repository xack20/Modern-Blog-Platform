import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma.module';
import { TagsResolver } from './tags.resolver';
import { TagsService } from './tags.service';

@Module({
  imports: [PrismaModule],
  providers: [TagsService, TagsResolver],
  exports: [TagsService],
})
export class TagsModule {}
