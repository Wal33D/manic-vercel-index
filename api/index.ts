import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getHognoseIndex } from "../utils/getHognoseIndex";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const catalog = req.query.catalog as string;

    let data;

    if (catalog === 'hognose' || !catalog) {
      // Return hognose index if 'hognose' is specified or if no catalog is specified
      data = await getHognoseIndex();
    } else {
      return res.status(400).json({
        data: 'Catalog not found or unsupported',
        isError: true
      });
    }

    return res.status(200).json({
      data,
      isError: false
    });
  } catch (error: any) {
    console.error("Error processing request:", error);
    return res.status(500).json({
      data: error.message,
      isError: true
    });
  }
}
