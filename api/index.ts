
import { getHognoseIndex } from "../utils/getHognoseIndex";
import { createApiResponse } from "../utils/createApiResponse";

export default async function GET(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const catalog = url.searchParams.get('catalog');

    let data;

    if (catalog === 'hognose' || !catalog) {
      // Return hognose index if 'hognose' is specified or if no catalog is specified
      data = await getHognoseIndex();
    } else {
      return createApiResponse({ data: 'Catalog not found or unsupported', isError: true, request });
    }

    return createApiResponse({ data, isError: false, request });
  } catch (error: any) {
    console.error("Error processing request:", error);
    return createApiResponse({ data: error.message, isError: true, request });
  }
}
