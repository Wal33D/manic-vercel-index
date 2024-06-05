export async function createApiResponse({
  data,
  isError = false,
  cacheDuration = 24 * 60 * 60,
  request,
}: any): Promise<Response> {
  if (!isError) {
    return new Response(JSON.stringify(data, null, 2), {
      headers: {
        "content-type": "application/json",
        "Cache-Control": `public, max-age=${cacheDuration}, immutable`,
      },
      status: 200,
    });
  } else {
    return new Response(
      JSON.stringify({
        status: false,
        message: "Failed to fetch data",
        error: data.toString(),
      }),
      {
        headers: { "content-type": "application/json" },
        status: 500,
      }
    );
  }
}
