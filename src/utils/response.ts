type ApiResponse<T> = {
    status: number;
    message: string;
    data?: T;
}

export const createSuccessResponse = <T>(data: T, message = 'Success'): ApiResponse<T> => ({
    status: 200,
    message,
    data
});

export const createErrorResponse = (message: string, status = 404): ApiResponse<null> => ({
    status,
    message
});