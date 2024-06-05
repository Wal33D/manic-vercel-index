import type { VercelRequest, VercelResponse } from "@vercel/node";
import {
  MongoClient,
  Db,
  Collection,
  ServerApiVersion,
  ObjectId,
} from "mongodb";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const catalog = (req.query.catalog as string)?.toLowerCase();
    const catalogType = (req.query.catalogType as string)?.toLowerCase();
    const catalogId = req.query.catalogId as string | undefined;
    const mongoId = req.query._id as string | undefined;

    if (!catalog || !catalogType) {
      return res.status(400).json({
        data: "catalog and catalogType are required",
        isError: true,
      });
    }

    let data;
    data = await getCatalogIndex(catalog, catalogType, catalogId, mongoId);

    return res.status(200).json({
      data,
      isError: false,
    });
  } catch (error: any) {
    console.error("Error processing request:", error);
    return res.status(500).json({
      data: error.message,
      isError: true,
    });
  }
}

const {
  DB_USERNAME: dbUsername = "",
  DB_PASSWORD: dbPassword = "",
  DB_NAME: dbName = "",
  DB_CLUSTER: dbClusterName = "",
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

const getCatalogCollection = async (
  catalogName: string
): Promise<Collection> => {
  const db = await connectToMongo();
  return db.collection(catalogName);
};

export const getCatalogIndex = async (
  catalog: string,
  catalogType: string,
  catalogId?: string,
  mongoId?: string
): Promise<{
  catalog: string;
  catalogType: string;
  count: number;
  levels: any[];
}> => {
  const collection = await getCatalogCollection(catalog);
  const query: any = {
    catalogType: { $regex: new RegExp(`^${catalogType}$`, "i") },
  };

  if (catalogId) {
    query.catalogId = catalogId;
  }
  if (mongoId) {
    query._id = new ObjectId(mongoId);
  }

  const levels = await collection.find(query).toArray();
  return { catalog, catalogType, count: levels.length, levels };
};
