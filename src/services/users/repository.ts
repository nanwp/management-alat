import { InternalServerError } from "elysia";
import { handleError } from "../../utils/error";
import { queryDatabase } from "../../infra/database/database";
import { GetAllUsersResponse, User, UserInput } from "../../entities/users";
import { PaginationRequest } from "../../utils/pagination";

export const getAll = async (pagination: PaginationRequest): Promise<GetAllUsersResponse> => {
    try {
        const limit = pagination.limit > 0 ? pagination.limit : 10;
        const page = pagination.page > 0 ? pagination.page : 1;
        const offset = (page - 1) * limit;

        const queryParams: (string | number)[] = [];
        let whereClause = `WHERE deleted_at IS NULL`;

        if (pagination.keyword) {
            whereClause += ` AND name ILIKE $1`;
            queryParams.push(`%${pagination.keyword}%`);
        }

        const dataQuery = `
            SELECT id, name, email FROM users
            ${whereClause} ORDER BY id ASC
            LIMIT $${queryParams.length + 1} OFFSET $${queryParams.length + 2}
        `;
        queryParams.push(limit, offset);

        const users = await queryDatabase(dataQuery, queryParams) as User[];

        const totalQuery = `
            SELECT COUNT(*) FROM users ${whereClause}
        `;
        const totalResult = await queryDatabase(totalQuery, queryParams.slice(0, queryParams.length - 2)) as { count: string }[];
        const total = parseInt(totalResult[0].count, 10);

        return {
            data: users,
            meta: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit)
            }
        };
    } catch (error) {
        throw new InternalServerError(handleError(error));
    }
};

export const getById = async (id: string) : Promise<User> => {
    try {
        const query = `
            SELECT id, name, email FROM users WHERE id = $1 AND deleted_at IS NULL
        `;
        const user = await queryDatabase(query, [id]) as User[];

        return user[0];
    } catch (error) {
        throw new InternalServerError(handleError(error));
    }
}

export const create = async (user: UserInput) : Promise<User> => {
    try {
        const query = `
            INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING name, email
        `;
        const newUser = await queryDatabase(query, [user.name, user.email, user.password]) as User[];

        return newUser[0];
    } catch (error) {
        throw new InternalServerError(handleError(error));
    }
}

export const update = async (id: string, user: UserInput) : Promise<User> => {
    try {
        const query = `
            UPDATE users SET name = $1, email = $2 WHERE id = $3 AND deleted_at IS NULL RETURNING name, email
        `;
        const updatedUser = await queryDatabase(query, [user.name, user.email, id]) as User[];

        return updatedUser[0];
    } catch (error) {
        throw new InternalServerError(handleError(error));
    }
}