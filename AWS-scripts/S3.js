// this imports a bare-bones version of S3 that exposes the .send operation
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

const client = new S3Client({ region: "us-east-1" });

const params = {
  /** input parameters */
};
const command = new ListBucketsCommand(params);

// async/await.
try {
  const data = await client.send(command);
  console.log(data);
} catch (error) {
  console.log(error);
} finally {
  console.log("process complete");
}
