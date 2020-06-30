import { Application, send } from "https://deno.land/x/oak@v5.0.0/mod.ts";
import api from "./api.ts";

const app = new Application();
const PORT = 8000;

// logging middleware
app.use(async (ctx, next) => {
    await next();
    const time = ctx.response.headers.get("X-Response-Time");
    console.log(`${ctx.request.method} ${ctx.request.url}: ${time}`);
});

// measure response time
app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const delta = Date.now() - start;
    ctx.response.headers.set("X-Response-Time", `${delta}ms`);
});

app.use(api.routes());
app.use(api.allowedMethods());

app.use(async (ctx) => {
    const filePath = ctx.request.url.pathname;
    const fileWhitelist = [
        "/index.html",
        "/stylesheets/style.css",
        "/javascripts/script.js",
        "/images/favicon.png",
    ];
    if (fileWhitelist.includes(filePath)) {
        await send(ctx, filePath, {
            root: `${Deno.cwd()}/public`
        });
    }
});

if (import.meta.main) {
    await app.listen({
        port: PORT
    });    
}
