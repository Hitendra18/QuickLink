const {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");

const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.IAM_ACCESS_KEY_ID,
    secretAccessKey: process.env.IAM_SECRET_ACCESS_KEY,
  },
});

const getObjectURL = async (filename) => {
  const command = new GetObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `uploads/user-uploads/${filename}`,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
};

const putObjectURL = async (filename, contentType) => {
  const command = new PutObjectCommand({
    Bucket: process.env.S3_BUCKET_NAME,
    Key: `uploads/user-uploads/${filename}`,
    ContentType: contentType,
  });

  const url = await getSignedUrl(s3Client, command);

  return url;
};

module.exports = { getObjectURL, putObjectURL };
