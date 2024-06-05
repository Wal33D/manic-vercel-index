import { getHognoseIndex } from "../utils/getHognoseIndex";
import { createApiResponse } from "../utils/createApiResponse";
import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
    const url = new URL(req.url as string);
    const catalog = url.searchParams.get('catalog');

    let data;

    if (catalog === 'hognose' || !catalog) {
      // Return hognose index if 'hognose' is specified or if no catalog is specified
      data = await getHognoseIndex();
    } else {
      return createApiResponse({ data: 'Catalog not found or unsupported', isError: true, req });
    }

    return createApiResponse({ data, isError: false, req });
}


