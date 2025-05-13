import { InferSelectModel  } from 'drizzle-orm';
import { profiles } from '../schema';

export type Profile = InferSelectModel<typeof profiles>;