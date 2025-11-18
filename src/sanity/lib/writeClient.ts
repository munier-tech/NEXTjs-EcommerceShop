// In your sanity/lib/writeClient.ts
import { createClient } from '@sanity/client';

export const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false, // Set to false for write operations
  token: process.env.SANITY_API_TOKEN!, // Make sure this has write permissions
  apiVersion: '2024-01-01',
});