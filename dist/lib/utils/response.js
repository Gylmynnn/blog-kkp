export class ResFormmater {
    static success(data, message, statusCode = 200) {
        return {
            success: true,
            statusCode,
            message,
            data,
        };
    }
    static failed(message, statusCode = 400) {
        return {
            success: false,
            statusCode,
            message,
        };
    }
}
