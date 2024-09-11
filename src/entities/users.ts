import { Meta } from "../utils/pagination"

export interface User {
    id: number
    name: string
    email: string
}

export interface UserInput {
    name: string
    email: string
    password: string
}

export interface UserOutput {
    id: number
    name: string
    email: string
}

export interface GetAllUsersResponse {
    data: UserOutput[]
    meta : Meta
}