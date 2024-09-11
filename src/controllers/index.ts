import Elysia, { error, NotFoundError } from "elysia";
import { APIResponse } from "../cummons/types";
import userController from "./users";

const controllers = new Elysia({ prefix: "/v1" })
    .onError((ctx) => {
        return {
            status: (ctx.error as NotFoundError).status ?? 500,
            message: ctx.error.message.includes("{")
              ? JSON.parse(ctx.error.message)
              : ctx.error.message,
          } satisfies Partial<APIResponse>
    })
    .use(userController)

export default controllers