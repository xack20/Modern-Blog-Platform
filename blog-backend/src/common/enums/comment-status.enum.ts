import { registerEnumType } from '@nestjs/graphql';
import { CommentStatus as PrismaCommentStatus } from '@prisma/client';

export { PrismaCommentStatus as CommentStatus };

registerEnumType(PrismaCommentStatus, {
  name: 'CommentStatus',
  description: 'Status of a comment',
});
