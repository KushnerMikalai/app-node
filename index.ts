import {
  Application,
  Context,
  helpers,
  Router,
} from "https://deno.land/x/oak/mod.ts";
import {
  DOMParser,
  Element,
} from "https://deno.land/x/deno_dom/deno-dom-wasm.ts";

const router = new Router();

router
  .get("/", (context: Context) => {
    context.response.body = "Hello World!";
  })
  .get("/currency-converter", async (context: Context) => {
    const url = "https://myfin.us/currency-converter";
    const query = helpers.getQuery(context);

    const from = query.from || "usd";
    const to = query.to || "usd";
    const amount = query.amount || 1;

    try {
      const res = await fetch(`${url}/${from}-${to}/${amount}`);
      const text = await res.text();
      const html = new DOMParser().parseFromString(text, "text/html")!;
      const value = html.querySelector(".conversion__value-text")!;
      context.response.body = value
        ? `${value.textContent.replace("  ", " ")}\n`
        : "no data";
    } catch (e) {
      context.response.body = "error";
    }
  });

const app = new Application();
app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: 3000 });
