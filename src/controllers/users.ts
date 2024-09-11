import Elysia from "elysia";
import * as service from "../services";
import { PaginationRequest, parsePaginationRequest } from "../utils/pagination";

const userController = (app: Elysia) =>
    app.group("/users", (app) => {
        app.get(
            "/",
            async (ctx) => {
                const request = parsePaginationRequest(ctx.query);
                const users = await service.users.getAll(request);
                return users;
            }
        ),
        app.get(
            "/:id",
            async (ctx) => {
                const user = await service.users.getById(ctx.params.id);
                return user;
            }
        )
        app.post(
            "/",
            async (ctx) => {
                const user = await service.users.create(ctx.body);
                return user;
            }
        )

        return app;
    })
export default userController;