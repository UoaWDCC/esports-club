import path from "path";
import { fileURLToPath } from "url";
import { env } from "@libs/env";
import { UsersCollection } from "@libs/payload/collections/misc/UsersCollection";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        user: UsersCollection.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [],
    globals: [],

    secret: env.PAYLOAD_SECRET,
    typescript: {
        outputFile: path.resolve(dirname, "src/payload/payload-types.ts"),
    },
    db: postgresAdapter({
        pool: {
            connectionString: env.DRIZZLE_DATABASE_URL,
        },
        migrationDir: "./src/migrations",
    }),
    upload: {
        limits: {
            fileSize: 5000000,
        },
    },
    plugins: [
        // https://payloadcms.com/docs/upload/storage-adapters
        s3Storage({
            collections: {
                media: {
                    prefix: "media",
                },
                partners: {
                    prefix: "partners",
                },
            },
            bucket: env.S3_BUCKET,
            config: {
                credentials: {
                    accessKeyId: env.S3_ACCESS_KEY_ID,
                    secretAccessKey: env.S3_SECRET_ACCESS_KEY,
                },
                region: env.S3_REGION,
            },
        }),
    ],
});
