import { MongoClient, Db, Collection, ServerApiVersion } from "mongodb";

const {
  DB_USERNAME: dbUsername = "",
  DB_PASSWORD: dbPassword = "",
  DB_NAME: dbName = "",
  DB_CLUSTER: dbClusterName = "",
  CATALOG_NAME: collectionName = "hognose",
} = process.env;

const uri = `mongodb+srv://${encodeURIComponent(
  dbUsername
)}:${encodeURIComponent(
  dbPassword
)}@${dbClusterName}/${dbName}?retryWrites=true&w=majority`;

let client: MongoClient | null = null;
let db: Db | null = null;

const connectWithRetry = async (
  uri: string,
  attempts = 5
): Promise<MongoClient> => {
  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      const client = new MongoClient(uri, {
        serverApi: {
          version: ServerApiVersion.v1,
          strict: true,
          deprecationErrors: true,
        },
      });
      await client.connect();
      return client;
    } catch (error) {
      console.error(`Attempt ${attempt} failed: ${(error as Error).message}`);
      if (attempt < attempts)
        await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
      else throw error;
    }
  }
  throw new Error("Connection attempts exceeded.");
};

const connectToMongo = async (): Promise<Db> => {
  if (!client) {
    client = await connectWithRetry(uri);
    db = client.db(dbName);
  }
  return db as Db;
};

const getHognoseLevelsCollection = async (): Promise<Collection> => {
  const db = await connectToMongo();
  return db.collection(collectionName);
};

export const getHognoseIndex = async (): Promise<{
  catalog: string;
  catalogType: string;
  count: number;
  levels: any[];
}> => {
  const collection = await getHognoseLevelsCollection();
  const levels = await collection.find().toArray();
  return {  catalog: "hognose", catalogType:'level',count: levels.length | 0, levels };
};
