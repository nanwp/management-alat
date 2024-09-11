import { Elysia } from "elysia";
import controllers from "./controllers";
import { connectDatabase, disconnectDatabase } from "./infra/database/database";
import { config } from "dotenv";

config();

const app = new Elysia( { prefix: "/api" } )
  .use(controllers)

  try {
    app.listen(3000);
  } catch (error) {
    console.error(error);
  }

connectDatabase();

  
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

process.on("SIGINT", async () => {
  console.log("Shutting down Elysia");
  await disconnectDatabase();
  process.exit();
});
