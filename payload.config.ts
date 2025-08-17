import path from "path";
import { fileURLToPath } from "url";
import { env } from "@libs/env";
import { UsersCollection } from "@libs/payload/collections/misc/UsersCollection";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { s3Storage } from "@payloadcms/storage-s3";
import { buildConfig } from "payload";

import * as schema from "@/libs/db/schema";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
    admin: {
        user: UsersCollection.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },
    collections: [UsersCollection],
    globals: [],

    secret: env.PAYLOAD_SECRET,
    typescript: {
        outputFile: path.resolve(dirname, "src/payload/payload-types.ts"),
    },
    db: postgresAdapter({
        beforeSchemaInit: [
            ({ schema: payloadSchema }) => {
                return {
                    ...payloadSchema,
                    tables: {
                        ...payloadSchema.tables,
                        account: schema.account as any,
                        session: schema.session as any,
                        user: schema.user as any,
                        verification: schema.verification as any,
                        profiles: schema.profiles as any,
                        memberships: schema.memberships as any,
                        membershipTypes: schema.membershipTypes as any,
                        invoices: schema.invoices as any,
                    },
                };
            },
        ],
        pool: {
            connectionString: env.DRIZZLE_DATABASE_URL,
        },
        migrationDir: "./src/migrations/payload",
        idType: "uuid",
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
