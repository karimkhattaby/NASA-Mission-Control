import { Router } from "./deps.ts";
import * as planets from "./model/planets.ts";
import * as launches from "./model/launches.ts";

const router = new Router();

router.get("/", (ctx) => {
    ctx.response.body = `
    {___     {__      {_         {__ __        {_       
    {_ {__   {__     {_ __     {__    {__     {_ __     
    {__ {__  {__    {_  {__     {__          {_  {__    
    {__  {__ {__   {__   {__      {__       {__   {__   
    {__   {_ {__  {______ {__        {__   {______ {__  
    {__    {_ __ {__       {__ {__    {__ {__       {__ 
    {__      {__{__         {__  {__ __  {__         {__
                    Mission Control API`;
});

router.get("/planets", (ctx) => {
    //throw new Error("Sample error");
    //ctx.throw(501, "Sorry planets aren't available!"); //server error, the msg will NOT show in client
    //ERROR {"expose":false,"status":501,"message":"Sorry planets aren't available!"}
    //ctx.throw(400, "Sorry planets aren't available!"); //client error, will show in both
    //ERROR {"expose":true,"status":400,"message":"Sorry planets aren't available!"}
    ctx.response.body = planets.getAll();
});

router.get("/launches", (ctx) => {
    ctx.response.body = launches.getAll();
});

router.get("/launches/:id", (ctx) => {
    if (ctx.params?.id) {
        const launchesList = launches.getOne(Number(ctx.params.id));
        if (launchesList) {
            ctx.response.body = launchesList;
        }
        else {
            ctx.throw(400, "launch with that ID doesn't exist");
        }
    }
});

router.delete("/launches/:id", (ctx) => {
    if (ctx.params?.id) {
        const result = launches.removeOne(Number(ctx.params.id));
        ctx.response.body = { success: result };
    }
});

router.post("/launches", async (ctx) => {
    const body = await ctx.request.body();

    launches.addOne(body.value);

    ctx.response.body = { success: true};
    ctx.response.status = 201;
});

export default router;
