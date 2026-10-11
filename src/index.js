export default {
  async fetch(request) {
    const url = new URL(request.url);

    // Forward request directly to MyDramaList
    const targetUrl = new URL(url.pathname + url.search, "https://mydramalist.com");

    const newHeaders = new Headers(request.headers);
    newHeaders.set("Host", "mydramalist.com");
    newHeaders.set("Referer", "https://mydramalist.com/");
    newHeaders.set(
      "User-Agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    );

    const response = await fetch(targetUrl.toString(), {
      method: request.method,
      headers: newHeaders,
      redirect: "follow",
    });

    const responseHeaders = new Headers(response.headers);
    responseHeaders.set("Access-Control-Allow-Origin", "*");

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  },
};
