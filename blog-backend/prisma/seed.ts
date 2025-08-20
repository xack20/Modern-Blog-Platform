import {
  Category,
  CommentStatus,
  Post,
  PostStatus,
  PrismaClient,
  Profile,
  Role,
  Tag,
  User,
} from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Define types for users returned by createUsers
interface CreatedUser extends User {
  profile: Profile | null;
}

interface CreatedUsers {
  admin: CreatedUser;
  editor: CreatedUser;
  author: CreatedUser;
  user: CreatedUser;
}

// Define a type for tags and categories
type CreatedTags = Tag[];
type CreatedCategories = Category[];
type CreatedPosts = Post[];

async function main(): Promise<void> {
  console.log('Starting database seeding...');

  // Delete all existing data (optional, but ensures clean seeding)
  await cleanDatabase();

  // Create users
  const users = await createUsers();

  // Create categories
  const categories = await createCategories();

  // Create tags
  const tags = await createTags();

  // Create posts
  const posts = await createPosts(users, categories, tags);

  // Create comments
  await createComments(users, posts);

  // Create media
  await createMedia(users);

  console.log('Database seeding completed successfully!');
}

async function cleanDatabase(): Promise<void> {
  console.log('Cleaning existing data...');

  // Delete in an order that respects foreign key constraints
  await prisma.postTag.deleteMany({});
  await prisma.comment.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.tag.deleteMany({});
  await prisma.category.deleteMany({});
  await prisma.media.deleteMany({});
  await prisma.profile.deleteMany({});
  await prisma.user.deleteMany({});

  console.log('Database cleaned.');
}

async function createUsers(): Promise<CreatedUsers> {
  console.log('Creating users...');

  // Create admin
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      username: 'admin',
      password: await bcrypt.hash('admin123', 10),
      role: Role.ADMIN,
      profile: {
        create: {
          bio: 'Administrator of the blog platform',
          avatar: 'https://ui-avatars.com/api/?name=Admin+User',
          website: 'https://adminblog.com',
          twitter: 'admintwitter',
          github: 'admingithub',
          linkedin: 'adminlinkedin',
        },
      },
    },
    include: {
      profile: true,
    },
  });

  // Create editor
  const editor = await prisma.user.create({
    data: {
      email: 'editor@example.com',
      username: 'editor',
      password: await bcrypt.hash('editor123', 10),
      role: Role.EDITOR,
      profile: {
        create: {
          bio: 'Editor of the blog platform',
          avatar: 'https://ui-avatars.com/api/?name=Editor+User',
          website: 'https://editorblog.com',
          twitter: 'editortwitter',
          github: 'editorgithub',
          linkedin: 'editorlinkedin',
        },
      },
    },
    include: {
      profile: true,
    },
  });

  // Create author (using EDITOR role as AUTHOR doesn't exist in schema)
  const author = await prisma.user.create({
    data: {
      email: 'author@example.com',
      username: 'author',
      password: await bcrypt.hash('author123', 10),
      role: Role.EDITOR, // Using EDITOR as AUTHOR role doesn't exist in schema
      profile: {
        create: {
          bio: 'Author who writes amazing content',
          avatar: 'https://ui-avatars.com/api/?name=Author+User',
          website: 'https://authorblog.com',
          twitter: 'authortwitter',
          github: 'authorgithub',
          linkedin: 'authorlinkedin',
        },
      },
    },
    include: {
      profile: true,
    },
  });

  // Create regular user
  const user = await prisma.user.create({
    data: {
      email: 'user@example.com',
      username: 'user',
      password: await bcrypt.hash('user123', 10),
      role: Role.USER,
      profile: {
        create: {
          bio: 'Regular user of the blog platform',
          avatar: 'https://ui-avatars.com/api/?name=Regular+User',
          website: 'https://userblog.com',
          twitter: 'usertwitter',
          github: 'usergithub',
          linkedin: 'userlinkedin',
        },
      },
    },
    include: {
      profile: true,
    },
  });

  console.log('Users created successfully.');

  return { admin, editor, author, user };
}

async function createCategories(): Promise<CreatedCategories> {
  console.log('Creating categories...');

  const categories = await Promise.all([
    prisma.category.create({
      data: {
        name: 'Technology',
        slug: 'technology',
        description:
          'Articles about technology, programming, and digital trends',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Web Development',
        slug: 'web-development',
        description:
          'Frontend and backend development technologies and best practices',
      },
    }),
    prisma.category.create({
      data: {
        name: 'DevOps',
        slug: 'devops',
        description: 'DevOps practices, tools, and infrastructure as code',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Data Science',
        slug: 'data-science',
        description:
          'Data science, analytics, machine learning, and artificial intelligence',
      },
    }),
    prisma.category.create({
      data: {
        name: 'Mobile Development',
        slug: 'mobile-development',
        description: 'iOS, Android, and cross-platform app development',
      },
    }),
  ]);

  console.log('Categories created successfully.');

  return categories;
}

async function createTags(): Promise<CreatedTags> {
  console.log('Creating tags...');

  const tags = await Promise.all([
    prisma.tag.create({
      data: {
        name: 'JavaScript',
        slug: 'javascript',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'React',
        slug: 'react',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'TypeScript',
        slug: 'typescript',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'NestJS',
        slug: 'nestjs',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'Next.js',
        slug: 'nextjs',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'GraphQL',
        slug: 'graphql',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'Prisma',
        slug: 'prisma',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'Docker',
        slug: 'docker',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'AWS',
        slug: 'aws',
      },
    }),
    prisma.tag.create({
      data: {
        name: 'CI/CD',
        slug: 'ci-cd',
      },
    }),
  ]);

  console.log('Tags created successfully.');

  return tags;
}

async function createPosts(
  users: CreatedUsers,
  categories: CreatedCategories,
  tags: CreatedTags,
): Promise<CreatedPosts> {
  console.log('Creating posts...');

  const posts: CreatedPosts = [];

  // Published posts by admin
  const adminPost1 = await prisma.post.create({
    data: {
      title: 'Getting Started with GraphQL',
      slug: 'getting-started-with-graphql',
      content: `
# Getting Started with GraphQL

GraphQL is a query language for your API, and a server-side runtime for executing queries using a type system you define for your data. GraphQL isn't tied to any specific database or storage engine and is instead backed by your existing code and data.

## Why use GraphQL?

- Ask for exactly what you need and get exactly that
- Get many resources in a single request
- Describe what's possible with a type system
- Move faster with powerful developer tools

## How to set up GraphQL with NestJS

First, install the required dependencies:

\`\`\`bash
npm install @nestjs/graphql @nestjs/apollo graphql apollo-server-express
\`\`\`

Then, set up the GraphQL module in your app.module.ts:

\`\`\`typescript
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
    }),
    // other modules
  ],
})
export class AppModule {}
\`\`\`
      `,
      excerpt: 'Learn how to get started with GraphQL for your API development',
      featuredImage: {
        create: {
          filename: 'graphql-tech.jpg',
          url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop&crop=entropy&auto=format&q=80',
          key: 'uploads/graphql-tech.jpg',
          type: 'image/jpeg',
          size: 1024 * 120, // 120KB
          userId: users.admin.id,
        },
      },
      featured: true, // Set this post as featured
      status: PostStatus.PUBLISHED,
      publishedAt: new Date(),
      author: {
        connect: {
          id: users.admin.id,
        },
      },
      category: {
        connect: {
          id: categories[1].id, // Web Development
        },
      },
      tags: {
        create: [
          {
            tag: {
              connect: {
                id: tags[5].id, // GraphQL
              },
            },
          },
          {
            tag: {
              connect: {
                id: tags[3].id, // NestJS
              },
            },
          },
        ],
      },
      views: 120,
    },
  });
  posts.push(adminPost1);

  const adminPost2 = await prisma.post.create({
    data: {
      title: 'Building a Blog with Next.js and NestJS',
      slug: 'building-blog-nextjs-nestjs',
      content: `
# Building a Modern Blog with Next.js and NestJS

This tutorial will guide you through building a full-stack blog platform using Next.js for the frontend and NestJS for the backend.

## Tech Stack

- **Frontend**: Next.js, Apollo Client, Tailwind CSS
- **Backend**: NestJS, GraphQL, Prisma
- **Database**: PostgreSQL
- **Authentication**: JWT

## Setting Up the Backend

### Initialize NestJS Project

\`\`\`bash
nest new blog-backend
\`\`\`

### Setting Up Prisma

\`\`\`bash
npm install prisma @prisma/client
npx prisma init
\`\`\`

Define your schema in prisma/schema.prisma...

## Setting Up the Frontend

\`\`\`bash
npx create-next-app blog-frontend
\`\`\`

### Install Dependencies

      excerpt:
        'Learn how to create a modern blog platform with Next.js and NestJS',
      featuredImage: {
        create: {
          filename: 'web-development.jpg',
          url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=400&fit=crop&crop=entropy&auto=format&q=80',
          key: 'uploads/web-development.jpg',
          type: 'image/jpeg',
          size: 1024 * 110, // 110KB
          userId: users.admin.id,
        },
      },
      status: PostStatus.PUBLISHED,
## Connecting Frontend and Backend

Create an Apollo client in your Next.js app...
      `,
      excerpt:
        'Learn how to create a modern blog platform with Next.js and NestJS',
      status: PostStatus.PUBLISHED,
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      author: {
        connect: {
          id: users.admin.id,
        },
      },
      category: {
        connect: {
          id: categories[1].id, // Web Development
        },
      },
      tags: {
        create: [
          {
            tag: {
              connect: {
                id: tags[3].id, // NestJS
              },
            },
          },
          {
            tag: {
              connect: {
                id: tags[4].id, // Next.js
              },
            },
          },
          {
            tag: {
              connect: {
                id: tags[6].id, // Prisma
              },
            },
          },
        ],
      },
      views: 235,
    },
  });
  posts.push(adminPost2);

  // Published posts by editor
  const editorPost1 = await prisma.post.create({
    data: {
      title: 'TypeScript Best Practices',
      slug: 'typescript-best-practices',
      content: `
# TypeScript Best Practices for 2025

TypeScript has evolved significantly, and here are the best practices for writing clean, type-safe code in 2025.

## Use Strict Mode

Always enable \`strict\` mode in your tsconfig.json:

\`\`\`json
{
  "compilerOptions": {
    "strict": true
  }
}
\`\`\`

## Leverage Type Inference

TypeScript's type inference is powerful. Use it when possible instead of explicit type annotations.

\`\`\`typescript
// Instead of this:
const numbers: number[] = [1, 2, 3];

// Do this:
const numbers = [1, 2, 3]; // TypeScript infers number[]
\`\`\`

## Use Interfaces for Objects

\`\`\`typescript
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}
\`\`\`

## Type Guards for Narrowing Types

\`\`\`typescript
function processValue(value: string | number) {
  if (typeof value === 'string') {
    // TypeScript knows value is a string here
    return value.toUpperCase();
  } else {
    // TypeScript knows value is a number here
    return value.toFixed(2);
  }
}
\`\`\`

## And many more tips...
      `,
      excerpt: 'Learn the best practices for TypeScript development in 2025',
      status: PostStatus.PUBLISHED,
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      author: {
        connect: {
          id: users.editor.id,
        },
      },
      category: {
        connect: {
          id: categories[1].id, // Web Development
        },
      },
      tags: {
        create: [
          {
            tag: {
              connect: {
                id: tags[2].id, // TypeScript
              },
            },
          },
          {
            tag: {
              connect: {
                id: tags[0].id, // JavaScript
              },
            },
          },
        ],
      },
      views: 185,
    },
  });
  posts.push(editorPost1);

  // Create just two posts for brevity, but in a real implementation there would be more

  // Draft post
  const draftPost = await prisma.post.create({
    data: {
      title: 'Upcoming TypeScript 6.0 Features',
      slug: 'upcoming-typescript-6-features',
      content: `
# Upcoming TypeScript 6.0 Features

TypeScript 6.0 is around the corner, and it's bringing some exciting new features. Here's a preview of what's coming.

## Decorator Metadata

...

## Pattern Matching

...

## Improved Type Inference

...

*Note: This post is still a draft and will be expanded with more details.*
      `,
      excerpt: 'A preview of the upcoming features in TypeScript 6.0',
      status: PostStatus.DRAFT,
      publishedAt: null,
      author: {
        connect: {
          id: users.editor.id,
        },
      },
      category: {
        connect: {
          id: categories[1].id, // Web Development
        },
      },
      tags: {
        create: [
          {
            tag: {
              connect: {
                id: tags[2].id, // TypeScript
              },
            },
          },
        ],
      },
      views: 0,
    },
  });
  posts.push(draftPost);

  console.log('Posts created successfully.');

  return posts;
}

async function createComments(
  users: CreatedUsers,
  posts: CreatedPosts,
): Promise<void> {
  console.log('Creating comments...');

  await Promise.all([
    // Comments on first admin post
    prisma.comment.create({
      data: {
        content:
          "Great introduction to GraphQL! I've been wanting to learn about it.",
        status: CommentStatus.APPROVED,
        author: {
          connect: {
            id: users.user.id,
          },
        },
        post: {
          connect: {
            id: posts[0].id,
          },
        },
      },
    }),
    prisma.comment.create({
      data: {
        content:
          "I've been using GraphQL with NestJS and it's been a great experience.",
        status: CommentStatus.APPROVED,
        author: {
          connect: {
            id: users.author.id,
          },
        },
        post: {
          connect: {
            id: posts[0].id,
          },
        },
      },
    }),

    // Comments on second admin post
    prisma.comment.create({
      data: {
        content:
          "This is exactly what I've been looking for! Going to start building my blog now.",
        status: CommentStatus.APPROVED,
        author: {
          connect: {
            id: users.user.id,
          },
        },
        post: {
          connect: {
            id: posts[1].id,
          },
        },
      },
    }),

    // Comments on editor post
    prisma.comment.create({
      data: {
        content:
          'Thanks for the TypeScript tips! The strict mode has been a game changer for my projects.',
        status: CommentStatus.APPROVED,
        author: {
          connect: {
            id: users.admin.id,
          },
        },
        post: {
          connect: {
            id: posts[2].id,
          },
        },
      },
    }),

    // Pending comment
    prisma.comment.create({
      data: {
        content: 'Check out my website for more React tips: spammysite.com',
        status: CommentStatus.PENDING,
        author: {
          connect: {
            id: users.user.id,
          },
        },
        post: {
          connect: {
            id: posts[2].id,
          },
        },
      },
    }),
  ]);

  console.log('Comments created successfully.');
}

async function createMedia(users: CreatedUsers): Promise<void> {
  console.log('Creating media...');

  await Promise.all([
    // Media for admin
    prisma.media.create({
      data: {
        filename: 'graphql-diagram.png',
        url: 'https://example.com/media/graphql-diagram.png',
        key: 'uploads/graphql-diagram.png',
        type: 'image/png',
        size: 1024 * 100, // 100KB
        userId: users.admin.id,
      },
    }),
    prisma.media.create({
      data: {
        filename: 'nextjs-architecture.jpg',
        url: 'https://example.com/media/nextjs-architecture.jpg',
        key: 'uploads/nextjs-architecture.jpg',
        type: 'image/jpeg',
        size: 1024 * 150, // 150KB
        userId: users.admin.id,
      },
    }),

    // Media for editor
    prisma.media.create({
      data: {
        filename: 'typescript-cheatsheet.pdf',
        url: 'https://example.com/media/typescript-cheatsheet.pdf',
        key: 'uploads/typescript-cheatsheet.pdf',
        type: 'application/pdf',
        size: 1024 * 500, // 500KB
        userId: users.editor.id,
      },
    }),

    // Media for author
    prisma.media.create({
      data: {
        filename: 'react-performance.jpg',
        url: 'https://example.com/media/react-performance.jpg',
        key: 'uploads/react-performance.jpg',
        type: 'image/jpeg',
        size: 1024 * 200, // 200KB
        userId: users.author.id,
      },
    }),
    prisma.media.create({
      data: {
        filename: 'aws-lambda-diagram.png',
        url: 'https://example.com/media/aws-lambda-diagram.png',
        key: 'uploads/aws-lambda-diagram.png',
        type: 'image/png',
        size: 1024 * 120, // 120KB
        userId: users.author.id,
      },
    }),
  ]);

  console.log('Media created successfully.');
}

// Using void to explicitly handle the promise
void main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  // Using void to handle the promise in finally
  .finally(() => {
    void prisma.$disconnect();
  });
