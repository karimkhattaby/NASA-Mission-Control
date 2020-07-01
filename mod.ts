import { Application, send } from "https://deno.land/x/oak@v5.0.0/mod.ts";
import api from "./api.ts";
import * as log from "https://deno.land/std/log/mod.ts";

const app = new Application();
const PORT = 8000;

await log.setup({
    handlers: {
        console: new log.handlers.ConsoleHandler("INFO"),
    },
    loggers: {
        default: {
            level: "INFO",
            handlers: ["console"],
        }
    },
});

app.addEventListener("error", (event) => {
    log.error(event.error);
});

app.use(async (ctx, next) => {
    try {
        await next(); 
    } catch(err) {
        ctx.response.body = "Internal Server Error";
        throw err;
    }
});

// logging middleware
app.use(async (ctx, next) => {
    await next();
    const time = ctx.response.headers.get("X-Response-Time");
    log.info(`${ctx.request.method} ${ctx.request.url}: ${time}`);
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
    log.info(`Starting server on port ${PORT}...`);
    await app.listen({
        port: PORT
    });    
}
