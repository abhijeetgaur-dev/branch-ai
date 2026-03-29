import { S3Client } from '@aws-sdk/client-s3';
import { Upload }   from '@aws-sdk/lib-storage';
import { Readable } from 'stream';
import fs           from 'fs/promises';
import path         from 'path';

const STORAGE_TYPE = process.env.STORAGE_TYPE || 'local'; // 's3' or 'local'

// ─────────────────────────────────────────────
// S3 Configuration
// ─────────────────────────────────────────────
const s3Client = new S3Client({
  region: process.env.AWS_S3_REGION || 'us-east-1',
  credentials: process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY
    ? {
        accessKeyId:     process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }
    : undefined,
});

// ─────────────────────────────────────────────
// Storage Service
// ─────────────────────────────────────────────

/**
 * Main upload function that toggles between S3 and Local storage
 */
export async function uploadFile(
  fileBuffer:  Buffer,
  fileName:    string,
  contentType: string
): Promise<string> {
  if (STORAGE_TYPE === 's3') {
    return uploadToS3(fileBuffer, fileName, contentType);
  } else {
    return uploadToLocal(fileBuffer, fileName);
  }
}

/**
 * Uploads to AWS S3
 */
async function uploadToS3(
  fileBuffer: Buffer,
  fileName:   string,
  contentType: string
): Promise<string> {
  const bucketName = process.env.AWS_S3_BUCKET_NAME;
  if (!bucketName) throw new Error('AWS_S3_BUCKET_NAME not defined');

  const key = `${Date.now()}-${fileName}`;
  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: bucketName,
      Key: key,
      Body: Readable.from(fileBuffer),
      ContentType: contentType,
    },
  });

  await upload.done();
  return `https://${bucketName}.s3.${process.env.AWS_S3_REGION || 'us-east-1'}.amazonaws.com/${key}`;
}

/**
 * Saves to local ./uploads directory
 */
async function uploadToLocal(
  fileBuffer: Buffer,
  fileName:   string
): Promise<string> {
  const uploadDir = path.join(process.cwd(), 'uploads');
  const uniqueName = `${Date.now()}-${fileName}`;
  const filePath = path.join(uploadDir, uniqueName);

  // Ensure directory exists (mkdir -p)
  await fs.mkdir(uploadDir, { recursive: true });
  await fs.writeFile(filePath, fileBuffer);

  // Return a relative or absolute path
  // Since the API serves these files (usually), we point to the /uploads static route
  // For now, returning the file system path for MVP
  return `/api/uploads/${uniqueName}`;
}
