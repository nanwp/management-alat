import { NotFoundError } from "elysia";
import { create, getAll, getById, update } from "./repository"
import { createSuccessResponse } from "../../utils/response";
import { hashPassword } from "../../utils/hash";
import { PaginationRequest } from "../../utils/pagination";

export const users = {
    getAll: async (pagination: PaginationRequest) => {
        const response = await getAll(pagination);

        if (!response.meta.total) {
            throw new NotFoundError("Users not found");
        }

        return createSuccessResponse(response);
    },

    getById: async (id: string) => {
        const user = await getById(id);

        if (!user) {
            throw new NotFoundError("User not found");
        }

        return createSuccessResponse(user);
    }, 

    create: async (user: any) => {

        // validate user input
        if (!user.name || !user.email || !user.password) {
            throw new Error("Name, email, and password are required");
        }

        // hasing password using bcrypt
        const hashedPassword = await hashPassword(user.password);

        const newUser = {
            ...user,
            password: hashedPassword
        }

        const createdUser = await create(newUser);

        return createSuccessResponse(createdUser);
    },

    update: async (id: string, user: any) => {
        // validate user input
        if (!user.name || !user.email) {
            throw new Error("Name and email are required");
        }

        const updatedUser = await update(id, user);

        return createSuccessResponse(updatedUser);
    }

}