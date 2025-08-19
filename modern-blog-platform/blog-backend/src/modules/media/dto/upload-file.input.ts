import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { GraphQLScalarType } from 'graphql';
import { Readable } from 'stream';

// Define our own GraphQLUpload scalar
export const GraphQLUpload = new GraphQLScalarType({
  name: 'Upload',
  description: 'The `Upload` scalar type represents a file upload.',
  parseValue: (value) => value,
  parseLiteral: () => {
    throw new Error('Upload scalar literal unsupported');
  },
  serialize: () => {
    throw new Error('Upload scalar serialization unsupported');
  },
});

// Type for file uploads
export type Upload = {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream: () => Readable;
};

@InputType()
export class UploadFileInput {
  @Field(() => GraphQLUpload)
  @IsNotEmpty()
  file: Upload;
}
