import { serve } from "bun";

serve({
  fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === "/")
      return new Response("server is created successfully by bun", {
        statusCode: 200,
      });
    else if (url.pathname === "/newpage") {
      return new Response("visited new page", { statusCode: 200 });
    } else return new Request("404 error", { statusCode: 404 });
  },
});
