/*
Read a file in Async mode
*/
async function readFile() {
    const data = await Deno.readTextFile("hello.txt");

    console.log(data);
}

await readFile(); //await lets the progression WAIT until the async call is done
// if you remove await, the program will continue execution
// and return to the call only when the stack is empty

/*
Read a file in Sync mode
*/
function readFileSync() {
    const data = Deno.readTextFileSync("hello2.txt");

    console.log(data);
}

readFileSync();

/*
List files in the current directory
*/
const dir_list = [];
 for await (const dirEntry of Deno.readDir("./")) {
    dir_list.push(dirEntry.name);
}
console.log(dir_list);

/* 
Read a file in a folder regardless of OS
*/

import { join } from "https://deno.land/std/path/mod.ts";

async function readFileFromPath() {
    const path = join("text_files","hello.txt");

    const data = await Deno.readTextFile(path);

    console.log(data);
}

await readFileFromPath();