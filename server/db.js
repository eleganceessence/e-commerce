import pkg from "pg";
const { Pool } = pkg;

export const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_av1RNBHybE4A@ep-gentle-frost-a1jecscc-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false },
});
