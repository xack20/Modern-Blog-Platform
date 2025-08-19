import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../prisma.module';
import { FileUploadService } from './file-upload.service';
import { MediaResolver } from './media.resolver';
import { MediaService } from './media.service';

@Module({
  imports: [PrismaModule, ConfigModule],
  providers: [MediaResolver, MediaService, FileUploadService],
  exports: [MediaService, FileUploadService],
})
export class MediaModule {}
