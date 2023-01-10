import Bao from "baojs";

const app = new Bao();
const port = parseInt(process.env.PORT || "8080");

import { Database } from "bun:sqlite";

const db = new Database("/var/lib/mydb.sqlite");

db.run(
  "CREATE TABLE IF NOT EXISTS foo (id INTEGER PRIMARY KEY AUTOINCREMENT, greeting TEXT)",
);
db.run("INSERT INTO foo (greeting) VALUES (?)", "Welcome to bun!");
db.run("INSERT INTO foo (greeting) VALUES (?)", "Hello World!###");


app.get("/", async (ctx) => {
  let t1 = Date.now()
  let rs = await db.query("SELECT * FROM foo").all();
  return ctx.sendJson({ rs: rs, ms: Date.now() - t1 })
});

app.get("/add", async (ctx) => {
//   db.run("INSERT INTO foo VALUES (?)", "Hello World! " + Date.now());
  let t1 = Date.now()
  let ss = await db.exec("INSERT INTO foo (greeting) VALUES ($greeting)", {
    $greeting: "Welcome to bun" + Date.now(),
  });
  return ctx.sendJson({ rs: ss || 'ok', ms: Date.now() - t1 })
})

const server = app.listen({ port: port });
console.log(`Server listening on ${server.hostname}:${port}`);
