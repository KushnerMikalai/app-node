import { Application, Context, Router, helpers } from "https://deno.land/x/oak/mod.ts";

const router = new Router();
// const doc = new DOMParser().parseFromString('', 'text/html');

router
  .get("/", (context) => {
    context.response.body = "Hello World!";
  })
  .get("/currency-converter", async (context: Context) => {
    const url = 'https://myfin.us/currency-converter'
    const query = helpers.getQuery(context)

    const from = query.from || 'usd'
    const to = query.to || 'usd'
    const amount = query.amount || 1

    try {
      const res = await fetch(`${url}/${from}-${to}/${amount}`)
      const html = await res.text();

      console.log(html); // TODO parce html

      // const $ = cheerio.load(response.body)
      // const currency = $('.conversion__value-text span:eq(1)').html()

      // return res.json(currency ? currency.trim() : 'no element')

      context.response.body = {from, to, amount} || "no element";
    } catch (e) {
      context.response.body = "error";
    }

  })

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 3000 });
