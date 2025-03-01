import { createRouteHandler  } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Buat route handler
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
