import { Client, types  } from "pg";

const parseInteger = (value: string) => parseInt(value, 10);

types.setTypeParser(types.builtins.INT4, parseInteger);
types.setTypeParser(types.builtins.INT8, parseInteger);

const client = new Client({
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),  // default 5432 jika tidak ada
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

export const connectDatabase = async () => {
    try {
        await client.connect();
        console.log("Database connected");
    } catch (error) {
        console.log(process.env.DB_HOST);
        console.error("Error connecting to the database", error);
    }
}

export const disconnectDatabase = async () => {
    try {
        await client.end();
        console.log("Database disconnected");
    } catch (error) {
        console.error("Error disconnecting from the database", error);
    }
}

export const queryDatabase = async (query: string, params: any[] = []) => {
    try {
        const result = await client.query(query, params);
        return result.rows;
    } catch (error) {
        console.error("Error executing query", error);
        throw error;
    }
}