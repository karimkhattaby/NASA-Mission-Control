FROM hayd/deno:alpine-1.1.1

WORKDIR /Users/karimkhattaby/Documents/Deno/NASA Mission Control/

COPY . .

USER deno

CMD ["run", "--allow-net", "--allow-read", "src/mod.ts"]

EXPOSE 8000