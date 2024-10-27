import { Client, Databases, Account, Storage } from 'appwrite';
import {
  PUBLIC_APPWRITE_ENDPOINT,
  PUBLIC_APPWRITE_PROJECT,
  PUBLIC_STORE_DB_ID,
  PUBLIC_IITEMS_COLLECTION_ID,
  PUBLIC_AVATARS_BUCKET_ID,
} from '$env/static/public';

const client = new Client();

client.setEndpoint(PUBLIC_APPWRITE_ENDPOINT).setProject(PUBLIC_APPWRITE_PROJECT);

const databases = new Databases(client);
const account = new Account(client);
const storage = new Storage(client);

export const ids = {
  databases: {
    STORE: PUBLIC_STORE_DB_ID,
  },
  collections: {
    ITEMS: PUBLIC_IITEMS_COLLECTION_ID,
  },
  buckets: {
    avatars: PUBLIC_AVATARS_BUCKET_ID,
  },
};

export { client, databases, account, storage };
