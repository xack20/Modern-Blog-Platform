import { registerEnumType } from '@nestjs/graphql';
import { PostStatus as PrismaPostStatus } from '@prisma/client';

export { PrismaPostStatus as PostStatus };

registerEnumType(PrismaPostStatus, {
  name: 'PostStatus',
  description: 'Status of a blog post',
});
