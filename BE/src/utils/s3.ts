import { S3Client } from '@aws-sdk/client-s3';
import { env } from './env';

export const S3Config = new S3Client({
  region: 'auto',
  endpoint: 'https://e67191d152699296d92f8db0c37a55cb.r2.cloudflarestorage.com',
  credentials: {
    accessKeyId: 'aad69efb5bfcac01fd5aaa1c3a57a805',
    secretAccessKey: '10e51c3bb5274dc2f6e1460ed108ad840437532b899632f950fc9775eff71ecb',
  },
});