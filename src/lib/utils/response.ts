export class ResFormmater {
    static success<T>(data: T, message: string, statusCode: number = 200) {
        return {
            success: true,
            statusCode,
            message,
            data,
        };
    }

    static failed(message: string, statusCode: number = 400) {
        return {
            success: false,
            statusCode,
            message,
        };
    }
}
